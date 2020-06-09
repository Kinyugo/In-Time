import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
} from "@ionic/react";
import "./GuidelinesTab.css";
import Card from "../components/Card";

const GuidelinesTab: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Covid Guidelines</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="guidelinestab__content">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Covid Guidelines</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard className="guidelinestab__content__guideline">
          <iframe
            title="WHO"
            width="100%"
            height="200"
            src="https://www.youtube.com/embed/5jD2xd3Cv80"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </IonCard>
        <Card
          className="guidelinestab__content__guideline"
          imgSrc="assets/images/symptoms_overview.png"
          title="Symptoms Overview"
          description="Overview of the symptoms that a covid patient has."
        />

        <Card
          className="guidelinestab__content__guideline"
          imgSrc="assets/images/symptoms_explained.png"
          title="Symptoms Explained"
          description="In-depth explanation of covid symptoms."
        />

        <Card
          className="guidelinestab__content__guideline"
          imgSrc="assets/images/stress.jpg"
          title="Handling Covid Stress"
          description="Guidelines on how to handle stress related to covid."
        />

        <Card
          className="guidelinestab__content__guideline"
          imgSrc="assets/images/myths.jpeg"
          title="Covid Myths"
          description="Busting myths concerning covid."
        />
      </IonContent>
    </IonPage>
  );
};

export default GuidelinesTab;
