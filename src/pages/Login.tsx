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
    <><>
      <IonInput label="Email" labelPlacement="floating" fill="outline" placeholder="Enter text"></IonInput>

      <br />

      <IonInput label="Password" labelPlacement="floating" fill="outline" placeholder="Enter text"></IonInput>
    </><IonContent className='ion-padding'>
        <IonButton onClick={() => doLogin()} expand="full">
          Login
        </IonButton>
      </IonContent></>
  );
};

export default Login;