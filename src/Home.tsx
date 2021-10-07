import { useEffect, useRef, useState } from "react";
import aituBridge from "@btsd/aitu-bridge";
import {
  IonApp,
  IonSlides,
  IonSlide,
  IonContent,
  IonText,
  IonToggle,  IonTabs, IonTabBar, IonTabButton, IonBadge, IonGrid
} from "@ionic/react";
import React from 'react';
import { calendar, personCircle, map, informationCircle } from 'ionicons/icons';
import { IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonButton } from '@ionic/react';
import { pin, wifi, wine, warning, walk } from 'ionicons/icons';
import {IonAvatar,IonCheckbox} from '@ionic/react';
import { useHistory } from "react-router-dom";
import {Route,Link} from "react-router-dom";
import Achievements from "./Achievements";

import "./App.css";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

import { IonRow, IonCol } from '@ionic/react';

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

interface ISlideContentProps {
  title: string;
  onClick: () => void;
  description: string;
  buttonTitle: string;
  imgSrc: string;
}

const SlideContent: React.FC<ISlideContentProps> = ({
  onClick,
  title,
  description,
  buttonTitle,
  imgSrc,
}) => {
  return (
    <>
      <img src={imgSrc} />
      <div className="slide-block">
        <IonText color="dark">
          <h2>{title}</h2>
        </IonText>
        <IonText>
          <sub>{description}</sub>
        </IonText>
      </div>
      <div className="slide-button">
        <IonButton expand="full" onClick={onClick}>
          {buttonTitle}
        </IonButton>
      </div>
    </>
  );
};

const Home: React.FC = () => {
  // Optional parameters to pass to the swiper instance.
  // See http://idangero.us/swiper/api/ for valid options.
  const slideOpts = {
    initialSlide: 0,
    speed: 400,
  };
  const slider = useRef<HTMLIonSlidesElement>(null);

  async function getMe() {
    try {
      const data = await aituBridge.getMe();
      setName(data.name);
    } catch (e) {
      // handle error
      console.log(e);
    }
  }

  useEffect(() => {
    if (aituBridge.isSupported()) {
      getMe();
    }
  }, []);

  const [name, setName] = useState("<username>");

  const handleButtonClick = () => {
    slider.current?.slideNext();
  }; 
  const history = useHistory();

  const [checked, setChecked] = useState(false);

  const[somecheck, getChecked] = useState(false);
  const[huycheck, retChecked] = useState(false);
  const redirectachiev = () =>{
    let path = `/achievements`; 
    history.push(path);
  }
  const redirectshop = () =>{
    let path = `/shop`; 
    history.push(path);
  }
  return (  
    <IonPage>

    <IonHeader>
        <IonAvatar>
        <img src="/assets/doom.jpg" />
    </IonAvatar>
      <IonToolbar>
        <IonTitle>{name}'s profile</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
    <IonCard>
        <IonCardHeader>
          <IonCardSubtitle>Daily task:</IonCardSubtitle>
          <IonCardTitle>Upload Video with #aitu</IonCardTitle>
          <IonItem>
            <IonCheckbox checked={checked} onIonChange={e => setChecked(e.detail.checked)} />
          </IonItem>
        </IonCardHeader>
      </IonCard>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Earn 100 likes</IonCardTitle>
          <IonItem>
            <IonCheckbox checked={somecheck} onIonChange={e => getChecked(e.detail.checked)} />
          </IonItem>
        </IonCardHeader>
      </IonCard>    <IonCard>
        <IonCardHeader>
          <IonCardTitle>Post 5 comments on our sponsor's account</IonCardTitle>
          <IonItem>
            <IonCheckbox checked={huycheck} onIonChange={e => retChecked(e.detail.checked)} />
          </IonItem>
        </IonCardHeader>
      </IonCard>
      <IonCard>
        <IonCardHeader>
          <IonCardSubtitle>Made tasks all time</IonCardSubtitle>
          <IonCardTitle>15</IonCardTitle>
        </IonCardHeader>
      </IonCard>
      <IonCard>
        <IonCardHeader>
          <IonCardSubtitle>Number of AiCoins</IonCardSubtitle>
          <IonCardTitle>1500</IonCardTitle>
        </IonCardHeader>
      </IonCard> 
 <IonCard>
 <IonRow>
        <IonCol><IonButton 
      color="success" 
      onClick={ () => redirectachiev() }
    >Achievements</IonButton></IonCol>
        <IonCol> <IonButton 
      color="success" 
      onClick={ () => redirectshop() }
   >Shop</IonButton> </IonCol>
      </IonRow> 
      </IonCard> 
    </IonContent>

    </IonPage>
 
  );
};

export default Home;
