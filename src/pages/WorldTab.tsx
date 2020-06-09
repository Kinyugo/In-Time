import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonLoading,
  IonCard,
  IonList,
  IonListHeader,
} from "@ionic/react";
import { Pie } from "react-chartjs-2";
import axios from "axios";
import Card from "../components/Card";
import alpha3ToAlpha2JSON from "../data/alpha3_to_alpha2.json";
import alpha3ToNameJSON from "../data/alpha3_to_name.json";
import "./WorldTab.css";
import CountryCard from "../components/CountryCard";
import HealthTips from "../components/HealthTips";
import StatsSummary from "../components/StatsSummary";

interface ICaseCount {
  confirmed: number;
  deaths: number;
  recovered: number;
}

interface IGlobalCount extends ICaseCount {}

interface ICountry {
  country: ICaseCount;
}

const compareConfirmed = (a: Object, b: Object) => {
  const { confirmed: aConfirmed } = Object.values(a)[0];
  const { confirmed: bConfirmed } = Object.values(b)[0];

  if (aConfirmed > bConfirmed) {
    return -1;
  } else if (aConfirmed < bConfirmed) {
    return 1;
  } else {
    return 0;
  }
};

// @ts-ignore
const alpha3ToAlpha2 = (alpha3) => alpha3ToAlpha2JSON[alpha3];
// @ts-ignore
const alpha3ToName = (alpha3) => alpha3ToNameJSON[alpha3];

const WorldTab: React.FC = () => {
  const [showLoading, setShowLoading] = useState(true);

  const [data, setData] = useState<IGlobalCount>({
    confirmed: 0,
    deaths: 0,
    recovered: 0,
  });

  useEffect(() => {
    // Fetch data from API
    (async () => {
      const response: any = await axios("https://covidapi.info/api/v1/global");
      const {
        data: { result },
      } = response;

      setData(result);
      setShowLoading(false);
    })();
  }, []);

  const [countryWiseData, setCountryWiseData] = useState<ICountry[]>([]);

  useEffect(() => {
    (async () => {
      const response = await axios(
        "https://covidapi.info/api/v1/global/latest"
      );
      const {
        data: { result },
      } = response;

      const sortedResults = result.sort(compareConfirmed);

      setCountryWiseData(sortedResults);
    })();
  }, []);

  const { confirmed, deaths, recovered } = data;

  const GlobalCasesPieChart = {
    labels: ["Confirmed", "Recovered", "Deaths"],
    datasets: [
      {
        label: "Covid-19",
        backgroundColor: ["#4399f5", "#37EA61", "#f34943"],
        hoverBackgroundColor: ["#007BFF", "$127729", "#FF073A"],
        data: [confirmed, recovered, deaths],
      },
    ],
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>World Stats</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="worldtab__content">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">World Stats</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonLoading
          isOpen={showLoading}
          onDidDismiss={() => setShowLoading(false)}
          message={"Fetching data..."}
          duration={5000}
        />

        {/* Global summary */}
        <StatsSummary
          confirmed={confirmed}
          deaths={deaths}
          recovered={recovered}
          containerClassName={"worldtab__content__global"}
        />

        {/* Global summary pie chart */}
        <IonCard class="worldtab__content__pie-chart">
          <Pie
            data={GlobalCasesPieChart}
            options={{
              legend: {
                display: true,
                position: "bottom",
              },
              plugins: {
                datalabels: {
                  anchor: "end",
                  clamp: "true",
                  align: "bottom",
                  color: "black",
                  labels: {
                    title: {
                      font: {
                        weight: "bold",
                      },
                    },
                  },
                },
              },
            }}
          />
        </IonCard>

        {/* Health tips */}

        <HealthTips
          containerClassName="worldtab__content__slides"
          slideClassName="worldtab__content__slides__slide"
        />

        {/* Countries list */}

        <IonList className="worldtab__content__countries">
          <IonListHeader>
            <Card
              className="worldtab__content__countries__header"
              imgSrc="https://cdn.pixabay.com/photo/2020/04/08/18/35/coronavirus-5018466_960_720.png"
              title="Country Stats"
              description="Statistics from each country"
            />
          </IonListHeader>
          {countryWiseData.map((item, idx) => (
            <CountryCard
              className="worldtab__content__countries__country"
              key={idx}
              alpha2Code={alpha3ToAlpha2(Object.keys(item)[0])}
              name={alpha3ToName(Object.keys(item)[0])}
              stats={Object.values(item)[0]}
            />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default WorldTab;
