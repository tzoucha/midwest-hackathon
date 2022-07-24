import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
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
import { ellipse, homeOutline, personCircleOutline, square, triangle } from 'ionicons/icons';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { useServices } from './services/providers';
import { useEffect, useState } from 'react';
import LoginPage from './pages/Login';
import { AUTH_CHANGE_EVENT } from './services/auth.service';
import Goal from './pages/Goal';

setupIonicReact({
  scrollAssist: false
});

const AuthChooser = () => {
  const services = useServices();
  const [isInitialized, setIsInitialized] = useState(false) 
  const [isAuthorized, setIsAuthorized] = useState(false)
  useEffect(() => {
    setIsInitialized(false);
    (async () => {
      await services.authService.initialize();
      setIsAuthorized(services.authService.isAuthorized())
      setIsInitialized(true);
    })()
  }, [services.authService]);
  useEffect(() => {
    const listener = () => {
      setIsAuthorized(services.authService.isAuthorized())
    }
    document.addEventListener(AUTH_CHANGE_EVENT, listener)
    return () => {
      document.removeEventListener(AUTH_CHANGE_EVENT, listener);
    }
  }, [])
  return (
    !isInitialized
    ? <IonLoading isOpen={true} />
    : isAuthorized
    ? <AuthedRoutes />
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
const AuthedRoutes = () => 
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
      <Redirect to="/dashboard" />
    </IonRouterOutlet>
    <IonTabBar slot="bottom">
      <IonTabButton tab="dashboard" href="/dashboard">
        <IonIcon icon={homeOutline} />
        <IonLabel>Dashboard</IonLabel>
      </IonTabButton>
      <IonTabButton tab="profile" href="/profile">
        <IonIcon icon={personCircleOutline} />
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

