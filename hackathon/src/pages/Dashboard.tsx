import { IonAccordion, IonAccordionGroup, IonAvatar, IonButton, IonCard, IonCardContent, IonCardHeader, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonPage, IonProgressBar, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import axios from 'axios';
import { heartCircleOutline, addCircleOutline } from 'ionicons/icons';
import { useState, useEffect } from 'react';
import { baseUrl } from '../services/http.service';
import { useServices } from '../services/providers';


const Dashboard: React.FC = () => {
  const services = useServices();
  const [pocketInfo, setPocketInfo] = useState({loading: true} as {loading?: boolean, data: any[]})
  const [quarterlyPocketInfo, setQuarterlyPocketInfo] = useState({loading: true} as {loading?: boolean, data: any})
  useEffect(() => {
    (async () => {
      const pockets = (await axios.get(`${baseUrl}/accounts/${services.authService.user?.id}`)).data
      setPocketInfo({data: pockets})
    })()
  }, [])
  useEffect(() => {
    (async () => {
      const pocket = (await axios.get(`${baseUrl}/accounts/details/62dcb3e0e53d9f1a3c7e7498`)).data
      setQuarterlyPocketInfo({data: pocket})
    })()
  }, [])
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
          <img style={{filter: 'invert(61%) sepia(74%) saturate(410%) hue-rotate(82deg) brightness(89%) contrast(81%)'}} src={process.env.PUBLIC_URL + '/assets/logo-header.png'} />
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle>
              <img style={{filter: 'invert(61%) sepia(74%) saturate(410%) hue-rotate(82deg) brightness(89%) contrast(81%)'}} src={process.env.PUBLIC_URL + '/assets/logo-header.png'} />
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid style={{marginBottom: 100}}>
          <IonRow className="ion-align-items-center">
            <IonCol>
              <h1 className='darkGray' style={{textAlign: 'center'}}>Welcome, {services.authService.user?.firstName}!</h1>
              <p className='darkGray'>We are so glad you are using Pocket Change to help save for fun in your life! Get started by creating a pocket.</p>
            </IonCol>
          </IonRow>
          {quarterlyPocketInfo.data ? <IonAccordionGroup>
            <IonAccordion value="first">
              <IonItem slot="header" color="light">
                <IonGrid>
                  <IonRow className='ion-align-items-center'>
                    <IonCol size='auto'>
                      <IonIcon icon={heartCircleOutline} style={{fontSize:30, paddingTop:5, color: '#ed7b9e'}}></IonIcon>
                    </IonCol>
                    <IonCol>
                    <IonLabel className='darkGray'>
                      Featured Charity Pocket
                    </IonLabel>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonItem>
              <div slot="content">
                <IonCard style={{marginTop: 10, borderWidth: '2px 6px 4px 2px', borderStyle: 'solid', borderColor: quarterlyPocketInfo?.data.color, borderImage: 'initial', borderBottomRightRadius: '20%'}}>
                  <IonCardHeader style={{backgroundColor: '#f4f5f8'}}><strong style={{fontSize: 18}}>{quarterlyPocketInfo?.data.title}</strong></IonCardHeader>
                  <IonCardContent style={{paddingBottom:5}}>
                    <IonGrid>
                      <IonRow>
                        <IonCol size="2">
                          <img src="https://m.media-amazon.com/images/I/71cmEB9qAOL._AC_SL1500_.jpg"/>
                        </IonCol>
                        <IonCol>
                        <p style={{marginBottom:10}}>{quarterlyPocketInfo?.data.description}</p>
                        </IonCol>
                      </IonRow>
                      <IonRow>
                        <IonCol size='12'>
                          <IonProgressBar value={(quarterlyPocketInfo?.data.balance || 0) / (quarterlyPocketInfo?.data.goal || 1)} style={{'opacity': '0.5','--progress-background': quarterlyPocketInfo?.data.color || 'black', '--background': '#f4f5f8', height: '15px', borderRadius: '5px', marginTop: 10, marginBottom: 10}}></IonProgressBar>
                        </IonCol>
                        <IonCol style={{textAlign: 'right'}}><strong>{(quarterlyPocketInfo?.data.balance).toLocaleString("en-US", {style:"currency", currency:"USD"})}</strong> raised of {(quarterlyPocketInfo?.data.goal || 0).toLocaleString("en-US", {style:"currency", currency:"USD"})} goal</IonCol>
                      </IonRow>
                      <IonRow>
                        <IonCol style={{textAlign:'right'}}>
                          <IonButton style={{'--background':quarterlyPocketInfo?.data.color || 'black', '--background-activated':'#ccc'}} shape="round" expand="block" size='small' href={`/goal/${quarterlyPocketInfo?.data.id}`}>View Pocket</IonButton>
                        </IonCol>
                      </IonRow>
                    </IonGrid>
                  </IonCardContent>
                </IonCard>
              </div>
            </IonAccordion>
          </IonAccordionGroup> : <></>}
          <IonRow>
            <IonCol size='12'>
              <h2 className='darkGray' style={{marginBottom:5}}>Your Pocket(s)</h2>
            </IonCol>
          </IonRow>
          {pocketInfo.loading ? "LOADING" : pocketInfo.data.map((pocket) => 
            <IonRow key={pocket.id}>
              <IonCol>
                {/* Loop through cards for accounts */}
                  <IonCard style={{marginTop: 10, borderWidth: '2px 6px 4px 2px', borderStyle: 'solid', borderColor: pocket.color, borderImage: 'initial', borderBottomRightRadius: '20%'}}>
                    <IonCardHeader style={{backgroundColor: '#f4f5f8'}}><strong style={{fontSize: 18}}>{pocket.title}</strong></IonCardHeader>
                    <IonCardContent style={{paddingBottom:5}}>
                      <IonGrid>
                        <IonRow>
                          <IonCol size="12">
                          <IonItem lines='none'>
                            <IonAvatar slot="start">
                              <img src={`${baseUrl}/profile-pic/${pocket.picture}`} />
                            </IonAvatar>
                            <IonLabel>
                              <p style={{marginBottom:10}}>{pocket.description}</p>
                            </IonLabel>
                          </IonItem>
                          </IonCol>
                          <IonCol>
                          </IonCol>
                        </IonRow>
                        <IonRow>
                          <IonCol size='12'>
                            <IonProgressBar value={(pocket.balance || 0) / (pocket.goal || 1)} style={{'opacity': '0.5','--progress-background': pocket.color || 'black', '--background': '#f4f5f8', height: '15px', borderRadius: '5px', marginTop: 10, marginBottom: 10}}></IonProgressBar>
                          </IonCol>
                          <IonCol style={{textAlign: 'right'}}><strong>{(pocket.balance).toLocaleString("en-US", {style:"currency", currency:"USD"})}</strong> raised of {(pocket.goal || 0).toLocaleString("en-US", {style:"currency", currency:"USD"})} goal</IonCol>
                        </IonRow>
                        <IonRow>
                          <IonCol style={{textAlign:'right'}}>
                            <IonButton style={{'--background':pocket.color || 'black', '--background-activated':'#ccc'}} shape="round" expand="block" size='small' href={`/goal/${pocket.id}`}>View Pocket</IonButton>
                          </IonCol>
                        </IonRow>
                      </IonGrid>
                    </IonCardContent>
                  </IonCard>
              </IonCol>
            </IonRow>
          )}
        </IonGrid>
        <span style={{position: 'fixed', bottom: 0, width: '100%', backgroundColor: 'white'}}>
          <IonButton shape="round" style={{ margin: 16 }} routerLink="/create-goal" expand="block"><IonIcon slot="start" icon={addCircleOutline} /> Open New Pocket</IonButton>
        </span>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
