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
                   header="Dis Tab Incomplete"
                   subHeader="If u reading dis, then u a dumbass"
                    message="Have a nice day, come back in a later time"
                   buttons={['Ok, Thank You']}
                   ></IonAlert>
                   </>
        </div>
        </IonContent>
      </IonPage>
    );
  };
  
  export default Favorites;