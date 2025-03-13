import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonList,
  IonMenuButton,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from '@ionic/react';
import React from 'react';
import { logoIonic } from 'ionicons/icons';


const Login: React.FC = () => {
  const navigation = useIonRouter();

  const doLogin = () => {
    navigation.push('/it35-lab/app', 'forward', 'replace');
  }
  const doRegister = () => {
    navigation.push('/it35-lab/pages/Register', 'forward', 'replace');
  }
  return (
   <IonPage>
    <IonContent className='ion-padding'>
        <div style={{
          display: 'flex',
          flexDirection:'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop:'10%'
         }}>
          <IonAvatar
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '150px',
              height: '150px',
              borderRadius: '50%', 
              overflow: 'hidden' 
            }}
          >
             <IonIcon 
              icon={logoIonic}
              color='primary'
              style={{ fontSize: '150px', color: '#6c757d' }} 
            />
          </IonAvatar>
      <IonInput label="Email" labelPlacement="floating" fill="outline" placeholder="Enter text" style={{ marginTop: '50px' }}></IonInput>

      <br/>

      <IonInput label="Password" labelPlacement="floating" fill="outline" placeholder="Enter text"></IonInput>
      </div>
          <IonButton onClick={() => doLogin()} expand="full">
            Login
          </IonButton>
          <IonButton onClick={() => doRegister()} expand="full">
            Register
          </IonButton>
       </IonContent>
    </IonPage>
  );
};

export default Login;