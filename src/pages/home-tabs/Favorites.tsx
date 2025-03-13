import { 
  IonAlert,
  IonButton,
    IonButtons,
      IonContent, 
      IonHeader, 
      IonMenuButton, 
      IonPage, 
      IonTitle, 
      IonToolbar 
  } from '@ionic/react';
  
  const Favorites: React.FC = () => {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot='start'>
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle>Favorites</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
        <div style={{
                  display: 'flex',
                  flexDirection:'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop:'25%'
                 }}>
                  <>
                   <IonButton id="present-alert">Click Me</IonButton>
                   <IonAlert
                   trigger="present-alert"
                   header="A Short Title Is Best"
                   subHeader="A Sub Header Is Optional"
                    message="A message should be a short, complete sentence."
                   buttons={['Action']}
                   ></IonAlert>
                   </>
        </div>
        </IonContent>
      </IonPage>
    );
  };
  
  export default Favorites;