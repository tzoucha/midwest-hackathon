import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
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
import Goal from './pages/Goal';

setupIonicReact();

const AuthChooser = () => {
  const services = useServices();
  const [isAuthorized, setIsAuthorized] = useState(false)
  useEffect(() => {
    (async () => {
      await services.authService.initialize();
      setIsAuthorized(services.authService.isAuthorized())
    })()
  }, [services.authService]);
  return (isAuthorized
    ? <AuthedRoutes />
    : <input type='button' value='LOGIN' onClick={() => setIsAuthorized(true)}/>)
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
    <Route exact path="/">
      <Redirect to="/dashboard" />
    </Route>
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

