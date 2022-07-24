import {
  IonApp,
  IonBadge,
  IonIcon,
  IonLabel,
  IonLoading,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { homeOutline, invertModeOutline, personCircleOutline } from 'ionicons/icons';
import { Redirect, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/display.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';

/* Theme variables */
import { useEffect, useState } from 'react';
import { CreateGoal } from './pages/CreateGoal';
import Goal from './pages/Goal';
import LoginPage from './pages/Login';
import { AUTH_CHANGE_EVENT } from './services/auth.service';
import { useServices } from './services/providers';
import './theme/variables.css';
import axios from 'axios';
import { baseUrl } from './services/http.service';

setupIonicReact({
  scrollAssist: false
});

const AuthChooser = () => {
  const services = useServices();
  const [isInitialized, setIsInitialized] = useState(false) 
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [invitations, setInvitations] = useState({ loading: true } as { loading?: boolean, data: any[] })
  useEffect(() => {
    setIsInitialized(false);
    (async () => {
      await services.authService.initialize();
      setIsAuthorized(services.authService.isAuthorized())
      setIsInitialized(true);
    })()
  }, [services.authService]);

  useEffect(() => {
    (async () => {
      const pocketInvitations = (await axios.get(`${baseUrl}/invitations/${services.authService.user?.id}`)).data
      const response = (await Promise.all(pocketInvitations.map(async (invite: any) => {
        try {
          let call = await axios.get(`${baseUrl}/${invite.type === "FRIEND" ? "customers" : "accounts/details"}/${invite.fromId}`)
          return { ...call.data, sentDate: invite.sentDateTime, inviteId: invite.id, type: invite.type }
        } catch (e) {
          return null
        }
      }))).filter(k => k)
      console.log("HERE", response)
      setInvitations({ data: response })
    })()
  }, [])
  useEffect(() => {
    const listener = () => {
      setIsAuthorized(services.authService.isAuthorized())
    }
    document.addEventListener(AUTH_CHANGE_EVENT, listener)
    return () => {
      document.removeEventListener(AUTH_CHANGE_EVENT, listener);
    }
  }, [services.authService])
  return (
    !isInitialized
    ? <IonLoading isOpen={true} />
    : isAuthorized
    ? <AuthedRoutes invitations={invitations} />
    : <UnauthedRoutes />)
}

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <AuthChooser />
    </IonReactRouter>
  </IonApp>
);

export default App;
const getBadge = (type:any, invitations:any) => {
  let length = invitations.data?.filter((k: any) => k.type === type).length
  return length > 0 ? <IonBadge>{length}</IonBadge> : <></>
}
const AuthedRoutes = ({invitations}: {invitations:any}) => 
  <IonTabs>
    <IonRouterOutlet>
      <Route exact path="/dashboard">
        <Dashboard />
      </Route>
      <Route exact path="/profile">
        <Profile />
      </Route>
      <Route exact path="/goal/:goalUID">
        <Goal />
      </Route>
      <Route exact path="/create-goal">
        <CreateGoal />
      </Route>
      <Redirect to="/dashboard" />
    </IonRouterOutlet>
    <IonTabBar slot="bottom">
      <IonTabButton tab="dashboard" href="/dashboard">
        <IonIcon icon={homeOutline} />

        {getBadge("ACCOUNT", invitations)}
        <IonLabel>Dashboard</IonLabel>
      </IonTabButton>
      <IonTabButton tab="profile" href="/profile">
        <IonIcon icon={personCircleOutline} />
        {getBadge("FRIEND", invitations)}
        <IonLabel>Profile</IonLabel>
      </IonTabButton>
    </IonTabBar>
  </IonTabs>;

const UnauthedRoutes = () => {
  return (
    <IonRouterOutlet>
      <Route exact path="/login">
        <LoginPage />
      </Route>
      <Redirect to="/login" />
    </IonRouterOutlet>
  )
}

