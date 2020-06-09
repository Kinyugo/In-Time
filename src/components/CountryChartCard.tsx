import React from "react";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
} from "@ionic/react";
import clsx from "clsx";
import "./CountryChartCard.css";

interface CountryChartCardProps {
  className?: string;
  title: string;
}

const CountryChartCard: React.FC<CountryChartCardProps> = ({
  className,
  title,
  children,
}) => {
  return (
    <IonCard className={clsx(["countrychartcard", className])}>
      <IonCardContent>
        <IonCardHeader>
          <IonCardTitle>{title}</IonCardTitle>
        </IonCardHeader>
        {children}
      </IonCardContent>
    </IonCard>
  );
};

export default CountryChartCard;
