import React from "react";
import { IonSlides, IonSlide } from "@ionic/react";
import Card from "./Card";

interface IHealthTips {
  containerClassName: string;
  slideClassName: string;
}

const slideOpts = {
  initialSlide: 1,
  slideShadows: true,
  loop: true,
  autoplay: true,
};

const HealthTips: React.FC<IHealthTips> = ({
  containerClassName,
  slideClassName,
}) => {
  return (
    <IonSlides className={containerClassName} options={slideOpts}>
      <IonSlide className={slideClassName}>
        <Card
          imgSrc="https://cdn.pixabay.com/photo/2020/05/10/05/16/covid-19-5152341_960_720.jpg"
          title="Social Distancing"
          description="Maintain at least 1 metre (3 feet) distance between yourself and other persons."
        />
      </IonSlide>

      <IonSlide className={slideClassName}>
        <Card
          imgSrc="https://cdn.pixabay.com/photo/2020/03/26/22/57/hand-sanitizer-4972049_960_720.png"
          title="Sanitization"
          description="Regularly and thoroughly clean your hands with an alcohol-based hand rub or wash them with soap and water."
        />
      </IonSlide>

      <IonSlide className={slideClassName}>
        <Card
          imgSrc="https://cdn.pixabay.com/photo/2018/08/07/21/57/fever-3590869_960_720.jpg"
          title="Health Care"
          description="If you have fever, cough and difficulty breathing, seek medical care early."
        />
      </IonSlide>

      <IonSlide className={slideClassName}>
        <Card
          imgSrc="https://cdn.pixabay.com/photo/2017/03/27/01/52/mask-2177087_960_720.png"
          title="Social Behaviour"
          description="Wear a mask at all times while in public."
        />
      </IonSlide>

      <IonSlide className={slideClassName}>
        <Card
          imgSrc="https://cdn.pixabay.com/photo/2020/03/27/15/33/virus-4973943_960_720.jpg"
          title="Self Care"
          description="Avoid touching eyes, nose and mouth. #StayHomeStaySafe"
        />
      </IonSlide>

      <IonSlide className={slideClassName}>
        <Card
          imgSrc="https://cdn.pixabay.com/photo/2020/02/10/08/42/virus-4835736_960_720.jpg"
          title="Information"
          description="WHO Health Alert brings COVID-19 facts to billions via WhatsApp."
        />
      </IonSlide>
    </IonSlides>
  );
};

export default HealthTips;
