import React from "react";
import {
  IonItem,
  IonLabel,
  IonNote,
  IonThumbnail,
  IonTitle,
} from "@ionic/react";
import "./CountryCard.css";

interface ICountryCard {
  className?: string;
  alpha2Code: string;
  name: string;
  stats: {
    confirmed: number;
    deaths: number;
    recovered: number;
  };
}

const CountryCard: React.FC<ICountryCard> = ({
  className,
  alpha2Code,
  name,
  stats,
}) => {
  const { confirmed, deaths, recovered } = stats;

  return (
    <IonItem className={className}>
      <IonThumbnail slot="start">
        <img
          src={`https://www.countryflags.io/${alpha2Code}/flat/32.png`}
          alt={alpha2Code}
        />
      </IonThumbnail>
      <IonLabel>
        <IonTitle>{name}</IonTitle>
        <div className="countrycard__stats">
          <p className="countrycard__stats__stat">
            Confirmed: {confirmed?.toLocaleString()}
          </p>
          <p className="countrycard__stats__stat">
            Deaths: {deaths?.toLocaleString()}
          </p>
          <p className="countrycard__stats__stat">
            Recovered: {recovered?.toLocaleString()}
          </p>
        </div>
      </IonLabel>
      <IonNote
        slot="end"
        color="primary"
        title="Total"
        className="countrycard__stats__total"
      >
        {(confirmed + deaths + recovered)?.toLocaleString()}
      </IonNote>
    </IonItem>
  );
};

export default CountryCard;
