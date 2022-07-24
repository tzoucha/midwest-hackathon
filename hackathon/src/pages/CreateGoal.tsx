import { IonAvatar, IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCardSubtitle, IonContent, IonDatetime, IonFabButton, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from "@ionic/react"
import axios from "axios"
import { pencilOutline } from "ionicons/icons"
import { useRef, useState } from "react"
import { CirclePicker } from 'react-color'
import { baseUrl } from "../services/http.service"
import { useServices } from "../services/providers"

export const CreateGoal = () => {
  const services = useServices()
  const [values, setValues] = useState({} as {
    image?: {
      file?: File,
      dataUrl?: string
    }
    title?: string, 
    description?: string, 
    color?: string,
    goal?: number, 
    endDate?: string | number 
  })
  const [error, setError] = useState(null as any)
  const ionValueProps = (name: string) => ({value: values[name as Exclude<keyof typeof values, 'image'>], onIonChange: (e: any) => setValues(vs => ({...vs, [name]: e.detail.value}))})
  const submit = async () => {
    const {image, ...nonImageProps} = values;
    const body = {
      ...nonImageProps,
      customerIds: [],
      balance: 0,
      primaryOwnerCustomerId: services.authService.user?.id,
      startDate: new Date().toISOString().split('T')[0],
      endDate: values.endDate ? new Date(values.endDate).toISOString().split('T')[0] : undefined,
    }
    try {
      const result = (await axios.post(`${baseUrl}/accounts`, body)).data
      if(image?.file) {
        var data = new FormData();
        data.append('image', image.file);
        data.append('id', result.id || '');
        data.append('customer', 'false');
        var config = {
          method: 'post',
          url: `${baseUrl}/profile-pic`,
          headers: {
            'content-type': 'multipart/form-data'
          },
          data: data
        };
        try {
          const result = (await axios(config)).data;
          console.log("Updated account image", result)
        } catch (e) {
          console.error(e);
        }
      }
      
      window.location.href = '/dashboard'
    } catch(e: any) {
      console.error(e);
      setError('Error creating Goal')
    }

  }
  const filePicker = useRef<HTMLInputElement>(null)
  return (<IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Create Pocket</IonTitle>
        <IonButtons slot="start">
          <IonBackButton />
        </IonButtons>
      </IonToolbar>
    </IonHeader>
    <IonContent fullscreen>
      <IonHeader collapse="condense">
        <IonToolbar>
          <IonTitle size="large">Create Pocket</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonCard style={{marginBottom: 100}}>
        <IonCardContent>
          <IonList>
            <IonItem>
              <IonCardSubtitle>
                <IonAvatar style={{ width: 'auto', height: 'auto' }}>
                  <img src={values.image?.dataUrl || `${process.env.PUBLIC_URL}/assets/logo-header.png`} />
                  <IonFabButton color='secondary' style={{ position: 'absolute', top: 0, right: 0 }} onClick={() => filePicker.current?.click()}><IonIcon icon={pencilOutline} /></IonFabButton>
                </IonAvatar>
              </IonCardSubtitle>
              <input type="file" style={{ display: 'none' }} ref={filePicker} onChange={async (e) => {
                const file = e.target.files?.[0]
                if(file) {
                  const dataUrl = await new Promise<string>((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = function() {
                      resolve(reader.result as string)
                    }
                    reader.readAsDataURL(file)
                  })
                  setValues(vs => ({...vs, image: {file, dataUrl}}));
                } else {
                  console.error("No file selected");
                }
              }} />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Title</IonLabel>
              <IonInput {...ionValueProps('title')} />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Description</IonLabel>
              <IonInput {...ionValueProps('description')} />
            </IonItem>
            {/* TODO - PICTURE */}
            <IonItem>
              <IonLabel position="floating">Goal</IonLabel>
              <IonInput type='number' {...ionValueProps('goal')} />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">End Date</IonLabel>
              <IonDatetime presentation="date" {...ionValueProps('endDate') as any} />
            </IonItem>
            <IonItem className='ion-align-items-center' style={{marginBottom: 10}}>
              <IonLabel position="stacked">Color</IonLabel>
              <div style={{marginBottom: 10}}>
              <CirclePicker colors={["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#ff9800"]} onChange={(color) => setValues(vs => ({...vs, color: color.hex}))}/>
              </div>
            </IonItem>
            {error && <IonItem slot="error" style={{color: 'red'}}>
              {error?.message || error}
            </IonItem>}
          </IonList>
        </IonCardContent>
      </IonCard>
      <span style={{position: 'fixed', bottom: 0, width: '100%', backgroundColor: 'white', zIndex: 15000}}>
        <IonButton shape="round" style={{ margin: 16 }} onClick={submit} expand="block">Create Goal</IonButton>
      </span>
    </IonContent>
  </IonPage>)
}