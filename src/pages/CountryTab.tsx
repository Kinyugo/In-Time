import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonLoading,
  IonSelect,
  IonSelectOption,
  IonRow,
  IonCol,
} from "@ionic/react";
import { Plugins, GeolocationPosition } from "@capacitor/core";
import axios from "axios";
import moment from "moment";
import { Doughnut, Bar } from "react-chartjs-2";
import nameToAlpha3JSON from "../data/name_to_alpha3.json";
import alpha3ToNameJSON from "../data/alpha3_to_name.json";
import alpha3ToAlpha2JSON from "../data/alpha3_to_alpha2.json";
import "./CountryTab.css";
import StatsSummary from "../components/StatsSummary";
import CountryChartCard from "../components/CountryChartCard";
import Card from "../components/Card";

interface ICases {
  confirmed: number;
  deaths: number;
  recovered: number;
}

interface ICountryData extends ICases {}
interface ICountryTimeSeries extends ICases {
  date: string;
}

const GEOLOCATION_KEY = "6ca718ae4bfc76";
const GEOLOCATION_URL = "https://us1.locationiq.com/v1/reverse.php";

const { Storage, Geolocation } = Plugins;

//@ts-ignore
const nameToAlpha3 = (name) => nameToAlpha3JSON[name];
//@ts-ignore
const alpha3ToName = (alpha3) => alpha3ToNameJSON[alpha3];
//@ts-ignore
const alpha3ToAlpha2 = (alpha3) => alpha3ToAlpha2JSON[alpha3];

const compareNames = (a: string[], b: string[]): number => {
  const firstCountryName = a[1];
  const secondCountryName = b[1];
  if (firstCountryName > secondCountryName) {
    return 1;
  } else if (firstCountryName < secondCountryName) {
    return -1;
  } else {
    return 0;
  }
};
const sortedAlpha3CountryData = Object.entries(alpha3ToNameJSON).sort(
  compareNames
);

const CountryTab: React.FC = () => {
  const [showLoading, setShowLoading] = useState(true);

  const [selectedCountry, setSelectedCountry] = useState<string>("KEN");

  useEffect(() => {
    setShowLoading(true);
    (async () => {
      try {
        const currentLocationInfo: GeolocationPosition = await Geolocation.getCurrentPosition();
        const {
          coords: { latitude, longitude },
        } = currentLocationInfo;

        const response = await axios.get(
          `${GEOLOCATION_URL}?key=${GEOLOCATION_KEY}&lat=${latitude}&lon=${longitude}&format=json`
        );
        const {
          data: {
            address: { country },
          },
        } = response;

        const countryCode = nameToAlpha3(country);

        setSelectedCountry(countryCode);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  Storage.set({ key: "selectedCountry", value: selectedCountry });

  const [countryData, setCountryData] = useState<ICountryData>({
    confirmed: 0,
    deaths: 0,
    recovered: 0,
  });

  useEffect(() => {
    (async () => {
      try {
        const { value } = await Storage.get({ key: "selectedCountry" });
        const countryToSearch = value || selectedCountry;

        const response = await axios.get(
          `https://covidapi.info/api/v1/country/${countryToSearch}/latest`
        );
        const {
          data: { result },
        } = response;

        //@ts-ignore
        const parsedCountryData: ICountryData = Object.values(result)[0];

        console.log({ parsedCountryData });

        setCountryData(parsedCountryData);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [selectedCountry]);

  const [countryTimeSeriesData, setCountryTimeSeriesData] = useState<
    ICountryTimeSeries[]
  >();

  useEffect(() => {
    (async () => {
      try {
        const todaysDate = moment().format("YYYY-MM-DD");
        const startDate = moment().subtract(7, "days").format("YYYY-MM-DD");

        const response = await axios.get(
          `https://covidapi.info/api/v1/country/${selectedCountry}/timeseries/${startDate}/${todaysDate}`
        );
        const {
          data: { result },
        } = response;

        setCountryTimeSeriesData(result);
        setShowLoading(false);
      } catch (error) {
        console.log(error);
        setShowLoading(false);
      }
    })();
  }, [selectedCountry]);

  const { confirmed, deaths, recovered } = countryData;
  const countryDoughnutChartCfg = {
    labels: ["Confirmed", "Recovered", "Deaths"],
    datasets: [
      {
        labels: {
          render: "value",
        },
        backgroundColor: ["#4399F6", "#37EA61", "#F34943"],
        hoverBackgroundColor: ["#007bff", "#127729", "#ff073a"],
        data: [confirmed, recovered, deaths],
      },
    ],
  };

  const timeSeriesDates =
    countryTimeSeriesData?.map(({ date }) => moment(date).format("MMMM Do")) ||
    [];
  const timeSeriesConfirmed =
    countryTimeSeriesData?.map(({ confirmed }) => confirmed) || [];
  const timeSeriesDeaths =
    countryTimeSeriesData?.map(({ deaths }) => deaths) || [];
  const timeSeriesRecovered =
    countryTimeSeriesData?.map(({ recovered }) => recovered) || [];
  const countryBarChartCfg = {
    labels: [...timeSeriesDates],
    datasets: [
      {
        label: "Confirmed",
        backgroundColor: "#4399F6",
        borderColor: "#007bff",
        borderWidth: 1,
        data: [...timeSeriesConfirmed],
      },
      {
        label: "Recovered",
        backgroundColor: "#37EA61",
        borderColor: "#127729",
        borderWidth: 1,
        data: [...timeSeriesRecovered],
      },
      {
        label: "Deaths",
        backgroundColor: "#F34943",
        borderColor: "#FF073A",
        borderWidth: 1,
        data: [...timeSeriesDeaths],
      },
    ],
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonRow class="ion-align-items-center">
            <IonCol col-4>
              <IonTitle>{selectedCountry} Stats</IonTitle>
            </IonCol>
            <IonCol col-8>
              <IonSelect
                className="countrytab__toolbar__country"
                value={selectedCountry}
                okText="Okay"
                cancelText="Dismiss"
                onIonChange={(e) => setSelectedCountry(e.detail.value)}
              >
                {sortedAlpha3CountryData.map(([alpha3Code, countryName]) => (
                  <IonSelectOption key={alpha3Code} value={alpha3Code}>
                    {countryName}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonCol>
          </IonRow>
        </IonToolbar>
      </IonHeader>

      <IonContent className="countrytab__content">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Country Stats</IonTitle>
          </IonToolbar>
        </IonHeader>

        {/* Loader */}

        <IonLoading
          isOpen={showLoading}
          onDidDismiss={() => setShowLoading(false)}
          message={"Fetching country data..."}
        />

        <div className="countrytab__content__stats">
          {/* Description */}

          <Card
            imgSrc={`http://flagpedia.net/data/flags/normal/${alpha3ToAlpha2(
              selectedCountry
            )?.toLowerCase()}.png`}
            className="countrytab__content__description"
            title={alpha3ToName(selectedCountry)}
            description={`Statistics for ${alpha3ToName(
              selectedCountry
            )} both latest and for the past week.`}
          />

          {/* Country Summary */}

          <StatsSummary
            confirmed={confirmed}
            recovered={recovered}
            deaths={deaths}
          />

          {/* Doughnut Chart */}
          <CountryChartCard title="Latest statistics">
            <Doughnut
              data={countryDoughnutChartCfg}
              options={{
                legend: {
                  display: true,
                  position: "right",
                },
                plugins: {
                  datalabels: {
                    anchor: "bottom",
                    clamp: "true",
                    align: "end",
                    color: "black",
                    labels: {
                      title: {
                        font: {
                          weight: "bold",
                          size: 10,
                        },
                      },
                    },
                  },
                },
              }}
            />
          </CountryChartCard>

          {/* Bar Chart */}
          <Bar
            data={countryBarChartCfg}
            options={{
              scales: {
                xAxes: [
                  {
                    stacked: true,
                  },
                ],
                yAxes: [
                  {
                    stacked: true,
                  },
                ],
              },
              title: {
                display: true,
                text: "Cases in the current week",
                fontSize: 20,
              },
              legend: {
                display: true,
                position: "bottom",
              },
              plugins: {
                datalabels: { display: false },
              },
            }}
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default CountryTab;
