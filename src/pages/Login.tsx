import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
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

const Login: React.FC = () => {
  const navigation = useIonRouter();

  const doLogin = () => {
    navigation.push('/it35-lab/app', 'forward', 'replace');
  }
  return (
    <><img-loaderg src="D:\dev\it35-lab\logo.gif"></img-loaderg><><>
      <IonInput label="Email" labelPlacement="floating" fill="outline" placeholder="Enter text" style={{ marginTop: '250px' }}></IonInput>

      <br />

      <IonInput label="Password" labelPlacement="floating" fill="outline" placeholder="Enter text"></IonInput>
    </><IonContent className='ion-padding'>
        <IonButton onClick={() => doLogin()} expand="full">
          Login
        </IonButton>
      </IonContent></></>
  );
};

export default Login;