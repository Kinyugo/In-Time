import React from "react";
import {
  IonList,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon,
} from "@ionic/react";

import Card from "../components/Card";

import "./HelpTab.css";
import {
  callOutline,
  mailOutline,
  logoWhatsapp,
  walletOutline,
} from "ionicons/icons";

const HelpTab: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Help</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="helptab__content">
        <IonList className="helptab__content__contacts">
          <Card
            className="helptab__content__contact"
            title="Phone"
            description="Call WHO helpline number"
          >
            <IonButton color="dark" href="tel:+41-22-7912111">
              <IonIcon slot="start" icon={callOutline} />
              Call
            </IonButton>
          </Card>

          <Card
            className="helptab__content__contact"
            title="Email"
            description="Email WHO Team"
          >
            <IonButton color="warning" href="mailto:mediainquiries@who.int">
              <IonIcon slot="start" icon={mailOutline} />
              Email
            </IonButton>
          </Card>

          <Card
            className="helptab__content__contact"
            title="WhatsApp"
            description="Text 'Hi' to WHO helpdesk"
          >
            <IonButton
              color="success"
              href="https://api.whatsapp.com/send?phone=41798931892&text=hi&source=&data="
            >
              <IonIcon slot="start" icon={logoWhatsapp} />
              WhatsApp
            </IonButton>
          </Card>

          <Card
            className="helptab__content__contact"
            title="Donations"
            description="Donate via WHO website"
          >
            <IonButton
              color="primary"
              href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/donate"
            >
              <IonIcon slot="start" icon={walletOutline} />
              Donate
            </IonButton>
          </Card>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default HelpTab;
