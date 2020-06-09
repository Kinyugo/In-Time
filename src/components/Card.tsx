import React from "react";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonImg,
} from "@ionic/react";
import clsx from "clsx";
import "./Card.css";

interface CardProps {
  className?: string;
  imgSrc?: string;
  title: string;
  description: string;
}

const Card: React.FC<CardProps> = ({
  className,
  imgSrc,
  title,
  description,
  children,
}) => {
  return (
    <IonCard className={clsx(["card", className])}>
      {imgSrc ? <IonImg src={imgSrc}></IonImg> : null}

      <IonCardContent>
        <IonCardHeader>
          <IonCardTitle>{title}</IonCardTitle>
        </IonCardHeader>
        <p className="card__content__description">{description}</p>
        {children}
      </IonCardContent>
    </IonCard>
  );
};

export default Card;
