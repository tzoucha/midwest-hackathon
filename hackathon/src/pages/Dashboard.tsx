import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profile Image Here</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow className="ion-align-items-center">
            <IonCol style={{textAlign: 'center'}}>
              <h1>Welcome</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size='12'>
              <h2>Accounts</h2>
            </IonCol>
            <IonCol>
              {/* Loop through cards for accounts */}
                <IonCard> 
                  <IonCardHeader>
                    <IonGrid>
                      <IonRow>
                        <IonCol>
                          Profile image
                        </IonCol>
                        <IonCol>
                          Amount / Goal
                        </IonCol>
                      </IonRow>
                    </IonGrid>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonGrid>
                      <IonRow>
                        <IonCol size='12'>
                          Account Name
                        </IonCol>
                        <IonCol size='12'>
                          Goal description
                        </IonCol>
                      </IonRow>
                      <IonRow>
                        <IonCol>Participant images</IonCol>
                        <IonCol>Arrow Icon</IonCol>
                      </IonRow>
                    </IonGrid>
                  </IonCardContent>
                </IonCard>
                <IonButton expand="block">Create New Shared Goal</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
