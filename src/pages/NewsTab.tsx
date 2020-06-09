import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonLoading,
  IonList,
  IonListHeader,
} from "@ionic/react";
import axios, { AxiosResponse } from "axios";
import "./NewsTab.css";
import Article from "../components/Article";
import Card from "../components/Card";

interface IArticle {
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
}

const NEWS_API_BASE_URL: string = "https://newsapi.org/v2/top-headlines";
const NEWS_API_KEY: string = "712276661ae44659a3b510a4f374369c";

const NewsTab: React.FC = () => {
  const [showLoading, setShowLoading] = useState(true);
  const [articles, setArticles] = useState<IArticle[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response: AxiosResponse = await axios.get(
          `${NEWS_API_BASE_URL}?q=coronavirus&apikey=${NEWS_API_KEY}`
        );
        const {
          data: { articles },
        } = response;

        const parsedArticles = articles.map(
          ({
            author,
            title,
            description,
            url,
            urlToImage,
            publishedAt,
          }: IArticle): IArticle => ({
            author,
            title,
            description,
            url,
            urlToImage,
            publishedAt,
          })
        );

        setArticles(parsedArticles);
        setShowLoading(false);
      } catch (error) {
        setShowLoading(false);
        setArticles([]);
      }
    })();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>News</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="newstab__content">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">News</IonTitle>
          </IonToolbar>
        </IonHeader>
        {/* Loader */}
        <IonLoading
          isOpen={showLoading}
          onDidDismiss={() => setShowLoading(false)}
          message="Fetching articles..."
        />

        <IonList>
          <IonListHeader>
            <IonTitle>Latest Articles on CoronaVirus</IonTitle>
          </IonListHeader>
          {articles.length > 0 ? (
            articles.map(
              (
                { author, title, description, url, urlToImage, publishedAt },
                idx
              ) => (
                <Article
                  key={idx}
                  author={author}
                  title={title}
                  description={description}
                  url={url}
                  urlToImage={urlToImage}
                  publishedAt={publishedAt}
                />
              )
            )
          ) : (
            <Card
              imgSrc="https://cdn.pixabay.com/photo/2020/05/21/06/40/corona-5199344_960_720.jpg"
              title="No News"
              description="Sorry we could not fetch news at this time."
            />
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default NewsTab;
