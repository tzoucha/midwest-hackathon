import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCol, IonContent, IonGrid, IonImg, IonInput, IonItem, IonLabel, IonPage, IonRow, useIonLoading } from '@ionic/react';
import { useState } from 'react';
import { useServices } from '../services/providers';

export const LoginPage = () => {
  const services = useServices();
  const [present, dismiss] = useIonLoading();
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const signIn = async () => {
    await present('Signing in...')
    console.log("SIGN IN ATTEMPT", username, password)
    await services.authService.login(username, password);
    dismiss();
  }
  const signInOnEnter = (e: any) => {
    if(e.keyCode === 13) {
      signIn();
    }
  }
  return (<IonPage>
    <IonContent fullscreen>
      <IonGrid>
        <IonRow>
          <IonCol size='12'>
            <IonCard>
              {/* <IonCardHeader style={{textAlign: 'center'}}>
                <h1>Login</h1>
              </IonCardHeader> */}
              <IonCardHeader style={{backgroundColor: '#9997ea'}}>
                <IonImg style={{filter: 'brightness(0) invert(1)'}} src={process.env.PUBLIC_URL + '/assets/logo.png'} />
              </IonCardHeader>
              <IonCardContent>
                  <h1 style={{marginTop: 15}}>Login</h1>
                  <IonItem>
                    <IonLabel position="stacked">Username</IonLabel>
                    <IonInput value={username} placeholder="Username" onIonChange={e => setUsername(e.detail.value!)} onKeyUp={signInOnEnter}/>
                  </IonItem>
                  <IonItem>
                    <IonLabel position="stacked">Password</IonLabel>
                    <IonInput type='password' value={password} placeholder='Password' onIonChange={e => setPassword(e.detail.value!)} onKeyUp={signInOnEnter}/>
                  </IonItem>
                  <IonButton expand='full' shape='round' onClick={signIn}>Login</IonButton>
              </IonCardContent>
            </IonCard>
          </IonCol>
          <IonCol></IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  </IonPage>)
}

export default LoginPage;