import { IonAvatar, IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage, IonProgressBar, IonRow, IonSegment, IonSegmentButton, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar } from '@ionic/react';
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
  const [tranView, setTranView] = useState('contributions')
  useEffect(() => {
    (async () => {
      const pocket = (await axios.get(`${baseUrl}/accounts/details/${goalUID}`)).data
      setPocketInfo({data: pocket})
    })()
  }, [])
  const [transactionInfo, setTransactionInfo] = useState({loading: true} as {loading?: boolean, data: any[]})
  useEffect(() => {
    (async () => {
      const transactions = (await axios.get(`${baseUrl}/transactions/${goalUID}`)).data
      setTransactionInfo({data: transactions})
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
              <img style={{width: '50%', borderRadius: '50%', border: `4px ${pocketInfo.data.color} solid`}} src={`${baseUrl}/profile-pic/${pocketInfo.data.picture}`}/>
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
              <IonSegment onIonChange={(e) => setTranView(e.detail.value || '') } value={tranView}>
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
                  <img src="https://m.media-amazon.com/images/I/71cmEB9qAOL._AC_SL1500_.jpg"/>
                </IonAvatar>
                <IonLabel>
                  <IonGrid>
                    <IonRow>
                      <IonCol>
                        First Name L.
                      </IonCol>
                      <IonCol size='auto'>
                        <strong style={{color:'#42b95c'}}>+{(trans.amount || 0).toLocaleString("en-US", {style:"currency", currency:"USD"})}</strong>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </IonLabel>
              </IonItem>
            )}
          </IonList>}
          {tranView === 'leaderboard' && <h1>LEADERBOARD HERE</h1>}
        </IonGrid>
      </IonContent>
    </IonPage>
  : <IonPage></IonPage>);
};

export default Goal;
