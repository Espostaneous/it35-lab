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
  useIonRouter
} from '@ionic/react';

const Login: React.FC = () => {
  const navigation = useIonRouter();

  const doLogin = () => {
    navigation.push('/it35-lab/app', 'forward', 'replace');
  }
  return (
    <IonPage>
    <><IonList>
      <IonItem>
        <IonInput labelPlacement="floating" 
        value="hi@ionic.io">
          <div slot="label">
            Email <IonText color="danger">(Required)</IonText>
          </div>
        </IonInput>
      </IonItem>
    </IonList><IonContent className='ion-padding'>
        <IonButton onClick={() => doLogin()} expand="full">
          Login
        </IonButton>
      </IonContent></>
    </IonPage>
  );
};

export default Login;