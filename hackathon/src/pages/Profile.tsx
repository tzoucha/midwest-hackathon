import React, { createRef, useEffect, useRef, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonButton, IonImg, IonInput, IonItemOption, IonItemSliding, IonItemOptions, IonList, IonButtons, IonModal, useIonLoading, IonAvatar } from '@ionic/react';
import { IonNote } from '@ionic/react';

import { trash, checkbox, pencilOutline, createOutline } from 'ionicons/icons';
import './pageStyles.css';
import { useServices } from '../services/providers';
import { baseUrl } from '../services/http.service';
import axios from 'axios';

const Profile: React.FC = () => {
  const services = useServices();
  const [present, dismiss] = useIonLoading();
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
  const [pic, setPic] = useState<string>(`${services.authService.user?.profilePicture}`)
  const [firstName, setFirstName] = useState<string>(services.authService.user?.firstName || "")
  const [lastName, setLastName] = useState<string>(services.authService.user?.lastName || "")
  // const [name, setName] = useState<string>(`${services.authService.user?.firstName} ${services.authService?.user?.lastName}`);
  const [email, setEmail] = useState<string>(services.authService.user?.emailAddress || '');
  const [address, setAddress] = useState<string>(services.authService.user?.addressLine1 || '');
  const [city, setCity] = useState<string>(services.authService.user?.city || '');
  const [state, setState] = useState<string>(services.authService.user?.state || '');
  const [phone, setPhone] = useState<string>(services.authService.user?.phoneNumber || '');
  const [readOnly, setReadOnly] = useState<boolean>(true)
  const filePicker = useRef<HTMLInputElement>(null)
  const [friendSearch, setFriendSearch] = useState<string>("");
  const [invitations, setInvitations] = useState({ loading: true } as { loading?: boolean, data: any[] })
  const [friendsSearchResults, setFriendsSearchResults] = useState({ loading: true } as { loading?: boolean, data: any[] })

  useEffect(() => {
    (async () => {
      const pocketInvitations = (await axios.get(`${baseUrl}/invitations/${services.authService.user?.id}/ACCOUNT`)).data
      const response = await Promise.all(pocketInvitations.map(async (invite: any) => {
        let call = await axios.get(`${baseUrl}/accounts/details/${invite.fromId}`)
        return { ...call.data, sentDate: invite.sentDateTime, inviteId: invite.id }
      }))
      setInvitations({ data: response })
    })()
  }, [])

  const addAFriendModalRef = useRef<HTMLIonModalElement>(null)

  const convertISOStringToMonthDay = (date: any) => {
    const tempDate = new Date(date).toString().split(' ');
    const formattedDate = `${tempDate[1]} ${+tempDate[2]}`;
    return formattedDate;
  };

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
            <IonCardSubtitle>
              <IonAvatar style={{ width: 'auto', height: 'auto' }}>
                <img src={`${baseUrl}/profile-pic/${pic}`} />
                <IonButton color='light' style={{ position: 'absolute', top: 0, right: 0 }} onClick={() => filePicker.current?.click()}><IonIcon icon={createOutline} size='large' /></IonButton>
              </IonAvatar>
            </IonCardSubtitle>
            <input type="file" style={{ display: 'none' }} ref={filePicker} onChange={async (e) => {
              const file = e.target.files?.[0]
              if (file) {
                present();
                var data = new FormData();
                data.append('image', file);
                data.append('id', services.authService.user?.id || '');
                data.append('customer', 'true');
                var config = {
                  method: 'post',
                  url: `${baseUrl}/profile-pic`,
                  headers: {
                    'content-type': 'multipart/form-data'
                  },
                  data: data
                };

                try {
                  const result = (await axios(config)).data;
                  (services.authService.user as any).profilePicture = result.items[0].id
                  await services.authService.updateUser();
                  setPic(services.authService.user?.profilePicture || '')
                } catch (e) {
                  console.error(e);
                }
                dismiss()
              }
            }} />
          </IonCardHeader>

          <IonCardContent>
            <IonCardTitle>
              {readOnly ? <span style={{ width: '100%', textAlign: 'center' }}>{firstName} {lastName}</span> :
                <>
                  <IonItem style={{ marginBottom: "10px" }}>
                    <IonLabel position="floating">First Name</IonLabel>
                    <IonInput readonly={readOnly} value={firstName} onIonChange={e => setFirstName(e.detail.value!)}></IonInput>
                  </IonItem>
                  <IonItem style={{ marginBottom: "10px" }}>
                    <IonLabel position="floating">Last Name</IonLabel>
                    <IonInput readonly={readOnly} value={lastName} onIonChange={e => setLastName(e.detail.value!)}></IonInput>
                  </IonItem>
                </>
              }
            </IonCardTitle>
            <IonItem style={{ marginBottom: "10px" }}>
              <IonLabel position="floating">Email</IonLabel>
              <IonInput readonly={readOnly} value={email} onIonChange={e => setEmail(e.detail.value!)}></IonInput>
            </IonItem>
            <IonItem style={{ marginBottom: "10px" }}>
              <IonLabel position="floating">Address</IonLabel>
              <IonInput readonly={readOnly} value={address} onIonChange={e => setAddress(e.detail.value!)}></IonInput>
            </IonItem>
            <IonItem style={{ marginBottom: "10px" }}>
              <IonLabel position="floating">City</IonLabel>
              <IonInput readonly={readOnly} value={city} onIonChange={e => setCity(e.detail.value!)}></IonInput>
            </IonItem>
            <IonItem style={{ marginBottom: "10px" }}>
              <IonLabel position="floating">State</IonLabel>
              <IonInput readonly={readOnly} value={state} onIonChange={e => setState(e.detail.value!)}></IonInput>
            </IonItem>
            <IonItem style={{ marginBottom: "10px" }}>
              <IonLabel position="floating">Phone</IonLabel>
              <IonInput readonly={readOnly} pattern="tel" value={phone} onIonChange={e => setPhone(e.detail.value!)}></IonInput>
            </IonItem>
            <div style={{ marginBottom: "10px", paddingLeft: "10px" }}>
              {bio.map((k, i) => <p key={i}>{k}</p>)}
            </div>
            {readOnly ?
              <IonButton onClick={() => setReadOnly(!readOnly)} expand="block">Edit Profile</IonButton> :
              <>
                <IonButton onClick={async () => {
                  present();
                  var config = {
                    method: 'put',
                    url: `${baseUrl}/customers/${services.authService.user?.id}`,
                    data: {
                      id: services.authService.user?.id,
                      firstName: firstName,
                      lastName: lastName,
                      emailAddress: email,
                      addressLine1: address,
                      city: city,
                      state: state,
                      phoneNumber: phone,

                    }
                  };
                  const result = (await axios(config)).data;
                  setReadOnly(true)
                  dismiss();
                }} color="primary">Save</IonButton>
                <IonButton onClick={() => setReadOnly(true)} color="secondary">Cancel</IonButton>
              </>
            }
            {/* ÷<IonButton onClick={() => setReadOnly(!readOnly)}expand="block">Edit Profile</IonButton> */}
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Add a Friend</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonButton onClick={() => addAFriendModalRef.current?.present()} expand="block">Add a Friend</IonButton>
            <IonModal ref={addAFriendModalRef}>
              <IonHeader>
                <IonToolbar>
                  <IonButtons slot="start">
                    <IonButton onClick={() => addAFriendModalRef.current?.dismiss()}>Cancel</IonButton>
                  </IonButtons>
                  <IonTitle>Welcome</IonTitle>
                  <IonButtons slot="end">
                    <IonButton strong={true} onClick={() => { console.log("CONFIRM ADD FRIEND") }}>
                      Confirm
                    </IonButton>
                  </IonButtons>
                </IonToolbar>
              </IonHeader>
              <IonContent className="ion-padding">
                <IonItem style={{ marginBottom: "10px" }}>
                  <IonLabel position="floating">Search</IonLabel>
                  <IonInput value={friendSearch} onIonChange={e => setFriendSearch(e.detail.value!)}></IonInput>
                </IonItem>
                {/* {friendsSearchResults?.data?.length == 0 ? 'No results' : <div>Fuck you</div>} */}
              </IonContent>
            </IonModal>
          </IonCardContent>
        </IonCard>
        {/* <h2>Pending Invites</h2> */}
        <IonCard>
          <IonCardHeader>
            {/* <IonCardSubtitle><IonImg src={process.env.PUBLIC_URL + '/profile_pic.jpeg'} /></IonCardSubtitle> */}
            <IonCardTitle>Pending Invites</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            {invitations.data &&
              <IonList>

                {invitations.data.map((invite, index) => {
                  const slidingItem = createRef<HTMLIonItemSlidingElement>()
                  return (
                    <IonItemSliding ref={slidingItem} key={index}>
                      <IonItem onClick={() => slidingItem.current?.open("end")}>
                        <IonLabel>
                          <h2>{invite.title}</h2>
                          <p>{invite.description}</p>
                        </IonLabel>
                        <IonNote slot="end">
                          {convertISOStringToMonthDay(invite.sentDate)}
                        </IonNote>
                      </IonItem>
                      <IonItemOptions side="end">
                        <IonItemOption color="danger" onClick={async () => {
                          await axios.delete(`${baseUrl}/invitations/${invite.inviteId}`)
                          setInvitations((invitations) => ({ data: invitations.data.filter(i => i.inviteId != invite.inviteId) }))
                        }}>
                          <IonIcon slot="icon-only" icon={trash} />
                        </IonItemOption>
                        <IonItemOption onClick={async () => {
                          await axios.post(`${baseUrl}/invitations/${invite.inviteId}`)
                          setInvitations((invitations) => ({ data: invitations.data.filter(i => i.inviteId != invite.inviteId) }))
                        }}>
                          <IonIcon slot="icon-only" icon={checkbox} />
                        </IonItemOption>
                      </IonItemOptions>
                    </IonItemSliding>
                  )
                }
                )}

              </IonList>
            }
          </IonCardContent>
        </IonCard>
        
        <IonButton style={{ marginLeft: 16, marginRight: 16 }} onClick={() => services.authService.logout()} expand="block">Sign out</IonButton>
        <IonButton style={{ marginLeft: 16, marginRight: 16 }}>Contact Us</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
