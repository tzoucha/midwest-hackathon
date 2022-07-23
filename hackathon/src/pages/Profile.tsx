import React, { createRef, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonButton, IonImg, IonInput, IonItemOption, IonItemSliding, IonItemOptions, IonList } from '@ionic/react';
import { IonNote } from '@ionic/react';

import { trash, checkbox } from 'ionicons/icons';
import './pageStyles.css';

const Profile: React.FC = () => {

  const pendingInvites = [{
    name: "One Piece",
    description: "Anime (Oda Sama) Charity"
  }, {
    name: "Allegaeon",
    description: "Band Jar"
  }, {
    name: "God Of War Ragnarok",
    description: "Game Charity"
  }]
  const bio = ["This is the place where I rest my bones",
    "And the river that cleanses me runs alone",
    "To be there again where my spirit longs",
    "And sleep in the soil forevermore"]
  const [name, setName] = useState<string>("Travis Zoucha");
  const [email, setEmail] = useState<string>("TheBestEngineer@gmail.com");
  const [address, setAddress] = useState<string>("19622 Gail Ave Omaha, NE 68135");
  const [phone, setPhone] = useState<string>("5317774149");
  const [readOnly, setReadOnly] = useState<boolean>(true)
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Profile</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard>
          <IonCardHeader>
            <IonCardSubtitle><IonImg src={process.env.PUBLIC_URL + '/profile_pic.jpeg'} /></IonCardSubtitle>
            <IonCardTitle>{name}</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <IonItem style={{ marginBottom: "10px" }}>
              <IonLabel position="floating">Email</IonLabel>
              <IonInput readonly={readOnly} value={email} onIonChange={e => setEmail(e.detail.value!)}></IonInput>
            </IonItem>
            <IonItem style={{ marginBottom: "10px" }}>
              <IonLabel position="floating">Address</IonLabel>
              <IonInput readonly={readOnly} value={address} onIonChange={e => setAddress(e.detail.value!)}></IonInput>
            </IonItem>
            <IonItem style={{ marginBottom: "10px" }}>
              <IonLabel position="floating">Phone</IonLabel>
              <IonInput readonly={readOnly} pattern="tel" value={phone} onIonChange={e => setPhone(e.detail.value!)}></IonInput>
            </IonItem>
            <div style={{ marginBottom: "10px", paddingLeft: "10px" }}>
              {bio.map(k => <p>{k}</p>)}
            </div>
            {readOnly ?
              <IonButton onClick={() => setReadOnly(!readOnly)} expand="block">Edit Profile</IonButton> :
              <>
                <IonButton onClick={() => setReadOnly(true)} color="primary">Save</IonButton>
                <IonButton onClick={() => setReadOnly(true)} color="secondary">Cancel</IonButton>
              </>
            }
            {/* ÷<IonButton onClick={() => setReadOnly(!readOnly)}expand="block">Edit Profile</IonButton> */}
          </IonCardContent>
        </IonCard>
        {/* <h2>Pending Invites</h2> */}
        <IonCard>
          <IonCardHeader>
            {/* <IonCardSubtitle><IonImg src={process.env.PUBLIC_URL + '/profile_pic.jpeg'} /></IonCardSubtitle> */}
            <IonCardTitle>Pending Invites</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList>

              {pendingInvites.map(invite => {
                const slidingItem = createRef<HTMLIonItemSlidingElement>()
                return <>
                  <IonItemSliding ref={slidingItem}>
                    <IonItem onClick={() => slidingItem.current?.open("end")}>
                      <IonLabel>
                        <h2>{invite.name}</h2>
                        <p>{invite.description}</p>
                      </IonLabel>
                      <IonNote slot="end">
                        10:45 AM
                      </IonNote>
                    </IonItem>
                    <IonItemOptions side="end">
                      <IonItemOption color="danger">
                        <IonIcon slot="icon-only" icon={trash} />
                      </IonItemOption>
                      <IonItemOption>
                        <IonIcon slot="icon-only" icon={checkbox} />
                      </IonItemOption>
                    </IonItemOptions>
                  </IonItemSliding>
                </>
              }
              )}

            </IonList>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
