import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCol, IonContent, IonGrid, IonImg, IonInput, IonItem, IonLabel, IonPage, IonRow, useIonLoading } from '@ionic/react';
import { useState } from 'react';
import { useServices } from '../services/providers';

export const LoginPage = () => {
  const services = useServices();
  const [present, dismiss] = useIonLoading();
  const [username, setUsername] = useState('travis@milli-bank.com')
  const [password, setPassword] = useState('milli123')
  const signIn = async () => {
    await present('Signing in...')
    // console.log("SIGN IN ATTEMPT", username, password)
    await services.authService.login(username, password);
    dismiss();
  }
  const signInOnEnter = (e: any) => {
    if(e.keyCode === 13) {
      signIn();
    }
  }
  return (<IonPage>
    <IonContent fullscreen style={{height: '100%'}}>
      <IonGrid style={{height: '100%'}}>
        <IonRow className='ion-align-items-center' style={{height:'100%'}}>
          <IonCol size='12'>
            <IonCard>
              <IonCardHeader style={{backgroundColor: '#42b95c'}}>
                <img style={{filter: 'brightness(0) invert(1)'}} src={process.env.PUBLIC_URL + '/assets/logo.png'} />
              </IonCardHeader>
              <IonCardContent>
                  <h1 style={{marginTop: 15}}>Login</h1>
                  <IonItem>
                    <IonLabel position="floating">Username</IonLabel>
                    <IonInput value={username} onIonChange={e => setUsername(e.detail.value!)} onKeyUp={signInOnEnter}/>
                  </IonItem>
                  <IonItem style={{marginTop: 20}}>
                    <IonLabel position="floating">Password</IonLabel>
                    <IonInput type='password' value={password} onIonChange={e => setPassword(e.detail.value!)} onKeyUp={signInOnEnter}/>
                  </IonItem>
                  <IonButton style={{marginTop:55}} expand='block' shape="round" onClick={signIn}>Login</IonButton>
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  </IonPage>)
}

export default LoginPage;