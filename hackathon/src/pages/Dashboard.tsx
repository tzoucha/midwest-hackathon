import { IonAccordion, IonAccordionGroup, IonButton, IonCard, IonCardContent, IonCardHeader, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonPage, IonProgressBar, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { addCircleOutline, heartCircleOutline, homeOutline } from 'ionicons/icons';
import './pageStyles.css';

const Dashboard: React.FC = () => {
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
        <IonGrid>
          <IonRow className="ion-align-items-center">
            <IonCol>
              <h1 className='darkGray' style={{textAlign: 'center'}}>Welcome, Damen!</h1>
              <p className='darkGray'>We are so glad you are using Pocket Change to help save for fun in your life! Get started by <a href="/create-goal">creating a pocket</a>.</p>
            </IonCol>
          </IonRow>
          <IonAccordionGroup>
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
                <IonCard>
                  <IonCardHeader style={{backgroundColor: '#e8e8e8'}}><strong style={{fontSize: 18}}>Wounded Warriors Project</strong></IonCardHeader>
                  <IonCardContent style={{paddingBottom:5}}>
                    <IonGrid>
                      <IonRow>
                        <IonCol size="3">
                          <img src="https://m.media-amazon.com/images/I/71cmEB9qAOL._AC_SL1500_.jpg"/>
                        </IonCol>
                        <IonCol>
                        <p style={{marginBottom:10}}> Quarterly Charity Pocket, PC will will match all contributions until goal is fulfilled.</p>
                        </IonCol>
                      </IonRow>
                      <IonRow>
                        <IonCol size='12'>
                          <IonProgressBar value={0.15} style={{'--background': '#f4f5f8'}}></IonProgressBar>
                        </IonCol>
                        <IonCol style={{textAlign: 'right'}}>$10,459 raised out of $69,420 goal</IonCol>
                      </IonRow>
                      <IonRow>
                        <IonCol style={{textAlign:'right'}}>
                          <IonButton fill='outline' size='small' shape="round">View Pocket</IonButton>
                        </IonCol>
                      </IonRow>
                    </IonGrid>
                  </IonCardContent>
                </IonCard>
              </div>
            </IonAccordion>
          </IonAccordionGroup>
          <IonRow>
            <IonCol size='12'>
              <h2 className='darkGray' style={{marginBottom:5}}>Your Pockets</h2>
            </IonCol>
            <IonCol>
              {/* Loop through cards for accounts */}
                <IonCard style={{marginTop: 10,  border:'2px pink solid', borderRightWidth:'6px',borderBottomWidth:'4px'}}>
                  <IonCardHeader style={{backgroundColor: '#f4f5f8'}}><strong style={{fontSize: 18}}>Pocket Name</strong></IonCardHeader>
                  <IonCardContent style={{paddingBottom:5}}>
                    <IonGrid>
                      <IonRow>
                        <IonCol size="2">
                          <img src="https://m.media-amazon.com/images/I/71cmEB9qAOL._AC_SL1500_.jpg"/>
                        </IonCol>
                        <IonCol>
                        <p style={{marginBottom:10}}> Pocket description...</p>
                        </IonCol>
                      </IonRow>
                      <IonRow>
                        <IonCol size='12'>
                          <IonProgressBar value={0.15} style={{'--progress-background': 'pink', '--background': '#f4f5f8'}}></IonProgressBar>
                        </IonCol>
                        <IonCol style={{textAlign: 'right'}}>$0 raised out of $0,000 goal</IonCol>
                      </IonRow>
                      <IonRow>
                        <IonCol style={{textAlign:'right'}}>
                          <IonButton style={{'--background':'pink', '--background-activated':'#ccc'}} shape="round" expand="block" size='small'>View Pocket</IonButton>
                        </IonCol>
                      </IonRow>
                    </IonGrid>
                  </IonCardContent>
                </IonCard>
                <IonButton expand="block" shape="round" href="/create-goal"><IonIcon slot="start" icon={addCircleOutline} /> Open New Pocket</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
