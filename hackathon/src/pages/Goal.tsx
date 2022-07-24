import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonLabel, IonPage, IonProgressBar, IonRow, IonSegment, IonSegmentButton, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar } from '@ionic/react';
import axios from 'axios';
import { person, call, settings } from 'ionicons/icons';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { baseUrl } from '../services/http.service';
import { useServices } from '../services/providers';
import './pageStyles.css';

const Goal: React.FC = () => {
  let {goalUID} = useParams<any>();
  const [pocketInfo, setPocketInfo] = useState({loading: true} as {loading?: boolean, data: any})
  useEffect(() => {
    (async () => {
      const pocket = (await axios.get(`${baseUrl}/accounts/details/${goalUID}`)).data
      setPocketInfo({data: pocket})
    })()
  }, [])
  return ( pocketInfo?.data ?
    <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>
        <img style={{filter: 'invert(61%) sepia(74%) saturate(410%) hue-rotate(82deg) brightness(89%) contrast(81%)'}} src={process.env.PUBLIC_URL + '/assets/logo-header.png'} />
        </IonTitle>
        <IonButtons slot="start">
          <IonBackButton />
        </IonButtons>
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
        <IonGrid>
          <IonRow>
            <IonCol size='12' style={{textAlign: 'center'}}>
              <img style={{width: '50%', borderRadius: '50%', border: `4px ${pocketInfo.data.color} solid`}} src="https://m.media-amazon.com/images/I/71cmEB9qAOL._AC_SL1500_.jpg"/>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCard>
              <IonCardHeader style={{backgroundColor: '#f4f5f8'}}><strong style={{fontSize: 18}}>{pocketInfo?.data.title}</strong></IonCardHeader>
              <IonCardContent>
                <p style={{marginTop:10}}>{pocketInfo.data.description}</p>
                <IonGrid>
                  <IonRow>
                    <IonProgressBar value={(pocketInfo?.data.balance || 0) / (pocketInfo?.data.goal || 1)} style={{'--progress-background': pocketInfo?.data.color || 'black', '--background': '#f4f5f8',height: '20px', borderRadius: '10px', margin: 10}}></IonProgressBar>
                    <IonCol size='6'>Raised so far:<br/> <strong>{(pocketInfo.data.balance).toLocaleString("en-US", {style:"currency", currency:"USD"})}</strong></IonCol>
                    <IonCol size='6'>Goal amount:<br/> <strong>{(pocketInfo.data.goal).toLocaleString("en-US", {style:"currency", currency:"USD"})}</strong></IonCol>
                    <IonCol size='6'>Start date:<br/> <strong>{new Date(pocketInfo.data.startDate).toLocaleDateString([], {year: "numeric",month: "2-digit",day: "2-digit"})}</strong></IonCol>
                    <IonCol size='6'>End date:<br/> <strong>{(new Date(pocketInfo.data.endDate)).toLocaleDateString([],{year: "numeric",month: "2-digit",day: "2-digit"})}</strong></IonCol>
                  </IonRow>
                </IonGrid>
              </IonCardContent>
            </IonCard>
          </IonRow>
          <IonRow>
            <IonCol size='4'>
              <IonButton style={{'--border-color':pocketInfo.data.color || 'black', '--color':pocketInfo.data.color, '--background-activated':'#fff', '--color-activated':'#ccc' }} expand="block" shape="round" fill="outline">Edit</IonButton>
              </IonCol>
            <IonCol>
              <IonButton style={{'--background':pocketInfo.data.color || 'black', '--background-activated':'#ccc'}} expand="block" shape="round">Invite Friend</IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonSegment onIonChange={(e) => console.log(`${e.detail.value} segment selected`)}>
                <IonSegmentButton value="Contributions">
                  <IonLabel>Contributions</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="Participants">
                  <IonLabel>Participants</IonLabel>
                </IonSegmentButton>
              </IonSegment>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonCard>
                <IonCardContent>
                  <IonGrid>
                    <IonRow>
                      <IonCol>
                        Contributor Name
                      </IonCol>
                      <IonCol>
                        Amount
                      </IonCol>
                    </IonRow>
                    <IonRow>
                      <IonCol>
                        Contribution timestamp
                      </IonCol>
                      <IonCol>
                        Icon Arrow
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonCard>
                <IonCardContent>
                  <IonGrid>
                    <IonRow>
                      <IonCol>
                        User Profile Pic
                      </IonCol>
                      <IonCol>
                        <IonGrid>
                          <IonRow>
                            <IonCol>
                              Full Name
                            </IonCol>
                            <IonCol>
                              Total contributions
                            </IonCol>
                          </IonRow>
                        </IonGrid>
                      </IonCol>
                      <IonCol>
                        Icon Arrow
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  : <IonPage></IonPage>);
};

export default Goal;
