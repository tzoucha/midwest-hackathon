import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonPage, IonRow, useIonLoading } from '@ionic/react';
import { useState } from 'react';
import { AUTH_CHANGE_EVENT } from '../services/auth.service';
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
    document.dispatchEvent(new Event(AUTH_CHANGE_EVENT))
  }
  return (<IonPage>
    <IonContent fullscreen>
      <IonGrid>
        <IonRow>
          <IonCol size='12'>
            <IonCard>
              <IonCardHeader  style={{textAlign: 'center'}}><h1>Sign in</h1></IonCardHeader>
              <IonCardContent>
                <IonInput value={username} placeholder="User Name" onIonChange={e => setUsername(e.detail.value!)} />
                <IonInput type='password' value={password} placeholder='Password' onIonChange={e => setPassword(e.detail.value!)} />
                <IonButton expand='full' shape='round' onClick={signIn}>Sign in</IonButton>
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