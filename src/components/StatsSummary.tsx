import React from "react";
import { IonRow, IonCol } from "@ionic/react";
import Card from "./Card";
import "./StatsSummary.css";

interface StatsSummary {
  confirmed: number;
  deaths: number;
  recovered: number;
  containerClassName?: string;
  statClassName?: string;
}

const StatsSummary: React.FC<StatsSummary> = ({
  confirmed,
  deaths,
  recovered,
  containerClassName,
  statClassName,
}) => {
  return (
    <IonRow className={containerClassName}>
      <IonCol className={statClassName}>
        <Card
          className="statssummary__stats__stat statssummary__stats__stat--total"
          title="Total"
          description={(confirmed + deaths + recovered)?.toLocaleString()}
        />
      </IonCol>
      <IonCol className={statClassName}>
        <Card
          className="statssummary__stats__stat statssummary__stats__stat--confirmed"
          title="Confirmed"
          description={confirmed?.toLocaleString()}
        />
      </IonCol>

      <IonCol className={statClassName}>
        <Card
          className="statssummary__stats__stat statssummary__stats__stat--recovered"
          title="Recovered"
          description={recovered?.toLocaleString()}
        />
      </IonCol>

      <IonCol className={statClassName}>
        <Card
          className="statssummary__stats__stat statssummary__stats__stat--deaths"
          title="Deaths"
          description={deaths?.toLocaleString()}
        />
      </IonCol>
    </IonRow>
  );
};

export default StatsSummary;
