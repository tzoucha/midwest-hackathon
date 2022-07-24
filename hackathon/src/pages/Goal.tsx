import { IonAvatar, IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonModal, IonPage, IonProgressBar, IonRow, IonSegment, IonSegmentButton, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar, useIonLoading } from '@ionic/react';
import axios from 'axios';
import { person, call, settings } from 'ionicons/icons';
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router';
import { baseUrl } from '../services/http.service';
import { useServices } from '../services/providers';
import './pageStyles.css';

const Goal: React.FC = () => {
  const services = useServices();
  const [present, dismiss] = useIonLoading();
  let { goalUID } = useParams<any>();
  const [pocketInfo, setPocketInfo] = useState({ loading: true } as { loading?: boolean, data: any })
  const [tranView, setTranView] = useState('contributions')
  const [values, setValues] = useState({ loading: true } as { loading?: boolean, data?: any })
  const [readOnly, setReadOnly] = useState(true)
  const [friendSearch, setFriendSearch] = useState<string>("");
  const [friendsSearchResults, setFriendsSearchResults] = useState({ loading: true } as { loading?: boolean, data: any[] })
  const [leaderboard, setLeaderBoard] = useState({ loading: true } as { loading?: boolean, data: any[] })
  const addAFriendModalRef = useRef<HTMLIonModalElement>(null)
  useEffect(() => {
    if (goalUID) {
      (async () => {
        const pocket = (await axios.get(`${baseUrl}/accounts/details/${goalUID}`)).data
        setPocketInfo({ data: pocket })
        setValues({
          data:
          {
            ...pocket,
            goal: (pocket.goal).toLocaleString("en-US", { style: "currency", currency: "USD" }),
            endDate: (new Date(pocket.endDate)).toLocaleDateString([], { year: "numeric", month: "2-digit", day: "2-digit" })
          }
        })
      })()
    }
  }, [goalUID])
  const [transactionInfo, setTransactionInfo] = useState({ loading: true } as { loading?: boolean, data: any[] })
  useEffect(() => {
    (async () => {
      const transactions = (await axios.get(`${baseUrl}/transactions/${goalUID}`)).data
      setTransactionInfo({ data: transactions })
    })()
  }, [])
  return (pocketInfo?.data ?
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <img style={{ filter: 'invert(61%) sepia(74%) saturate(410%) hue-rotate(82deg) brightness(89%) contrast(81%)' }} src={process.env.PUBLIC_URL + '/assets/logo-header.png'} />
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
              <img style={{ filter: 'invert(61%) sepia(74%) saturate(410%) hue-rotate(82deg) brightness(89%) contrast(81%)' }} src={process.env.PUBLIC_URL + '/assets/logo-header.png'} />
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow>
            <IonCol size='12' style={{ textAlign: 'center' }}>
              <IonAvatar style={{ width: 'auto', height: 'auto' }}>
                <img style={{ border: `6px ${(pocketInfo.data.color || 'black')} solid` }} src={`${baseUrl}/profile-pic/${pocketInfo.data.picture}`} />
                {/* <IonButton color='light' style={{position: 'absolute', top: 0, right: 0}} onClick={() => filePicker.current?.click()}><IonIcon icon={createOutline} size='large' /></IonButton> */}
              </IonAvatar>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCard>
              <IonCardHeader style={{ backgroundColor: '#f4f5f8' }}><strong style={{ fontSize: 18 }}>{pocketInfo?.data.title}</strong></IonCardHeader>
              <IonCardContent>
                <p style={{ marginTop: 10 }}>{pocketInfo.data.description}</p>
                <IonGrid>
                  <IonRow>
                    <IonProgressBar value={(pocketInfo?.data.balance || 0) / (pocketInfo?.data.goal || 1)} style={{ 'opacity': '0.5', '--progress-background': pocketInfo?.data.color || 'black', '--background': '#f4f5f8', height: '15px', borderRadius: '5px', margin: 10 }}></IonProgressBar>
                    <IonCol size="6">
                      <IonItem>
                        <IonLabel position="stacked">Raised so far:</IonLabel>
                        <IonInput readonly={true} value={(pocketInfo.data.balance).toLocaleString("en-US", { style: "currency", currency: "USD" })}></IonInput>
                      </IonItem>
                      <IonItem>
                        <IonLabel position="stacked">Start date:</IonLabel>
                        <IonInput readonly={true} value={new Date(pocketInfo.data.startDate).toLocaleDateString([], { year: "numeric", month: "2-digit", day: "2-digit" })}></IonInput>
                      </IonItem>
                    </IonCol>
                    <IonCol size="6">
                      <IonItem>
                        <IonLabel position="stacked">Goal amount:</IonLabel>
                        <IonInput readonly={readOnly} value={values.data?.goal} onIonChange={(e) => setValues(vs => ({ data: { ...vs.data, goal: e.detail.value } }))}></IonInput>
                      </IonItem>
                      <IonItem>
                        <IonLabel position="stacked">End date:</IonLabel>
                        <IonInput readonly={readOnly} value={values.data?.endDate} onIonChange={(e) => setValues(vs => ({ data: { ...vs.data, endDate: e.detail.value } }))}></IonInput>
                      </IonItem>
                    </IonCol>
                  </IonRow>
                  {!readOnly && <IonRow>
                    <IonCol>
                      <IonButton type="button" style={{ width: '100%' }} onClick={async () => {
                        await present();
                        try {
                          const updatedValues = values.data
                          setValues({ loading: true })
                          var config = {
                            method: 'put',
                            url: `${baseUrl}/accounts/${goalUID}`,
                            data: {
                              id: services.authService.user?.id,
                              ...updatedValues,
                              balance: pocketInfo.data.balance,
                              goal: parseFloat(updatedValues.goal.replace(/[$,]/g, '')),
                              startDate: pocketInfo.data.startDate,
                              endDate: new Date(updatedValues.endDate).toISOString().split('T')[0]
                            }
                          };
                          // console.log("BODY", config.data)
                          const result = (await axios(config));
                          setPocketInfo({ data: result.data });
                          setValues({
                            data:
                            {
                              ...result.data,
                              goal: (result.data.goal).toLocaleString("en-US", { style: "currency", currency: "USD" }),
                              endDate: (new Date(result.data.endDate)).toLocaleDateString([], { year: "numeric", month: "2-digit", day: "2-digit" })
                            }
                          })
                          setReadOnly(true)
                        } catch (e) {
                          console.error(e);
                        }
                        dismiss();
                      }} color="primary">Save</IonButton></IonCol>
                    <IonCol><IonButton color="secondary" style={{ width: '100%' }} onClick={() => {
                      setValues({
                        data:
                        {
                          ...pocketInfo.data,
                          goal: (pocketInfo.data.goal).toLocaleString("en-US", { style: "currency", currency: "USD" }),
                          endDate: (new Date(pocketInfo.data.endDate)).toLocaleDateString([], { year: "numeric", month: "2-digit", day: "2-digit" })
                        }
                      })
                      setReadOnly(true)
                    }}>Cancel</IonButton></IonCol>
                  </IonRow>}
                </IonGrid>
              </IonCardContent>
            </IonCard>
          </IonRow>
          <IonRow>
            {readOnly && <IonCol size='4'>
              <IonButton style={{ '--border-color': pocketInfo.data.color || 'black', '--color': pocketInfo.data.color, '--background-activated': '#fff', '--color-activated': '#ccc' }} expand="block" shape="round" fill="outline"
                onClick={() => setReadOnly(false)}>Edit</IonButton>
            </IonCol>}
            <IonCol>
              <IonButton onClick={() => addAFriendModalRef.current?.present()} style={{ '--background': pocketInfo.data.color || 'black', '--background-activated': '#ccc' }} expand="block" shape="round">Invite Friend</IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonSegment onIonChange={(e) => setTranView(e.detail.value || '')} value={tranView}>
                <IonSegmentButton value='contributions'>
                  <IonLabel>Contributions</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value='leaderboard'>
                  <IonLabel>Leaderboard</IonLabel>
                </IonSegmentButton>
              </IonSegment>
            </IonCol>
          </IonRow>
          {tranView === 'contributions' && <IonList>
            {transactionInfo?.data && transactionInfo?.data.map((trans, index) =>
              <IonItem key={index}>
                <IonAvatar>
                  <img src={`${baseUrl}/profile-pic/${trans.profilePicture}`} />
                </IonAvatar>
                <IonLabel>
                  <IonGrid>
                    <IonRow>
                      <IonCol>
                        {trans.name || trans.description}
                      </IonCol>
                      <IonCol size='auto'>
                        <strong style={{ color: '#42b95c' }}>+{(trans.amount || 0).toLocaleString("en-US", { style: "currency", currency: "USD" })}</strong>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </IonLabel>
              </IonItem>
            )}
          </IonList>}
          {tranView === 'leaderboard' && <h1>LEADERBOARD HERE</h1>}
        </IonGrid>
        <IonModal ref={addAFriendModalRef}>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={() => addAFriendModalRef.current?.dismiss()}>Cancel</IonButton>
              </IonButtons>
              <IonTitle>Friends</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonItem style={{ marginBottom: "10px" }}>
              <IonLabel position="floating">Search</IonLabel>
              <IonInput debounce={250} value={friendSearch} onIonChange={async (e) => {
                await present()
                setFriendSearch(e.detail.value!)
                let response = (await axios.get(`${baseUrl}/customers/fullTextSearch?searchPhrase=${e.detail.value!}`)).data
                setFriendsSearchResults({ data: response });
                dismiss()
              }}></IonInput>
            </IonItem>
            {/* {friendsSearchResults?.data?.length == 0 ? 'No results' : <div>Fuck you</div>} */}
            {friendsSearchResults?.data &&
              <div style={{ margin: "10px" }}>
                <h3>Results</h3>
                <IonList >
                  {friendsSearchResults?.data?.map((result, index) =>
                      <IonItem key={index}>
                        <IonAvatar style={{ marginRight: "10px" }}>
                          <img src={`${baseUrl}/profile-pic/${result.profilePicture}`} />
                          {/* <img src={result.profilePicture} /> */}
                        </IonAvatar>
                        <IonLabel><h2>{result.firstName} {result.lastName}</h2></IonLabel>
                        <IonButton onClick={async () => {
                          present()
                          await axios.post(`${baseUrl}/invitations/account?toCustomer=${result.id}&accountId=${goalUID}`)
                          dismiss()
                          addAFriendModalRef.current?.dismiss()
                        }}>Add</IonButton>
                        {/* <IonLabel>{result.firstName}</IonLabel> */}
                      </IonItem>
                  )}

                </IonList>
              </div>
            }
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
    : <IonPage></IonPage>);
};

export default Goal;
