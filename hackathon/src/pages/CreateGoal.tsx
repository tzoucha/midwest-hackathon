import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonContent, IonDatetime, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from "@ionic/react"
import axios from "axios"
import { useState } from "react"
import { CirclePicker } from 'react-color'
import { baseUrl } from "../services/http.service"
import { useServices } from "../services/providers"

export const CreateGoal = () => {
  const services = useServices()
  const [values, setValues] = useState({} as {
    title?: string, 
    description?: string, 
    color?: string,
    goal?: number, 
    endDate?: string | number 
  })
  const [error, setError] = useState(null as any)
  const ionValueProps = (name: string) => ({value: values[name as keyof typeof values], onIonChange: (e: any) => setValues(vs => ({...vs, [name]: e.detail.value}))})
  const submit = async () => {
    const body = {
      ...values,
      customerIds: [],
      balance: 0,
      primaryOwnerAccountId: services.authService.user?.id,
      startDate: new Date().toISOString().split('T')[0],
      endDate: values.endDate ? new Date(values.endDate).toISOString().split('T')[0] : undefined
    }
    try {
      await axios.post(`${baseUrl}/accounts`, body)
      window.location.href = '/dashboard'
    } catch(e: any) {
      console.error(e);
      setError('Error creating Goal')
    }

  }
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
      <IonCard>
        <IonCardContent>
          <IonList>
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
              <CirclePicker onChange={(color) => setValues(vs => ({...vs, color: color.hex}))}/>
              </div>
            </IonItem>
            <IonButton style={{ marginLeft: 16, marginRight: 16}} onClick={submit} expand="block">Create Goal</IonButton>
            {error && <IonItem slot="error" style={{color: 'red'}}>
              {error?.message || error}
            </IonItem>}
          </IonList>
        </IonCardContent>
      </IonCard>
    </IonContent>
  </IonPage>)
}