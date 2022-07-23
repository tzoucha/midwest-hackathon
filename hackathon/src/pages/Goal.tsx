import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonLabel, IonPage, IonRow, IonSegment, IonSegmentButton, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar } from '@ionic/react';
import { person, call, settings } from 'ionicons/icons';
import './pageStyles.css';

const Goal: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>App Logo Here</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonCol size='12'>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi finibus.</p>
              <h1>Goal Name</h1>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size='6'>Collected so far: 10000</IonCol>
            <IonCol size='6'>Goal amount: 1000000</IonCol>
            <IonCol size='6'>Start date: date here</IonCol>
            <IonCol size='6'>End date: date here</IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton expand="block">Block Button</IonButton>
              </IonCol>
            <IonCol>
            <IonButton expand="block">Block Button</IonButton>
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
  );
};

export default Goal;
