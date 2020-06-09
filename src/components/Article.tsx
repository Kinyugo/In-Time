import React from "react";
import {
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonImg,
} from "@ionic/react";
import clsx from "clsx";
import moment from "moment";
import "./Article.css";

interface ArticleProps {
  className?: string;
  author?: string;
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
}
const Article: React.FC<ArticleProps> = ({
  className,
  author,
  title,
  description,
  url,
  urlToImage,
  publishedAt,
}) => {
  return (
    <IonCard className={clsx(["article", className])}>
      {urlToImage ? <IonImg src={urlToImage} alt={title}></IonImg> : null}

      <IonCardHeader>
        <IonCardTitle>
          <a className="article__title" href={url}>
            {title}
          </a>
        </IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonRow>
          <p className="article__description">{description}</p>
        </IonRow>

        <IonRow>
          <IonCol>
            <p className="article__metadata">{author}</p>
          </IonCol>
          <IonCol>
            <p className="article__metadata">
              {moment(publishedAt).format("MMMM Do YYYY")}
            </p>
          </IonCol>
        </IonRow>
      </IonCardContent>
    </IonCard>
  );
};

export default Article;
