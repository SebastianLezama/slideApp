import React, { useState, useEffect } from "react";
import './App.css'
import  wp1  from './assets/river.jpg'
import  wp2  from './assets/wp2.jpg'
import  wp3  from './assets/wp3.jpg'
import  wp4  from './assets/wp4.jpg'
import  wp5  from './assets/wp5.jpg'
import  wp6  from './assets/wp6.jpg'
import  wp7  from './assets/wp7.jpg'
import  wp8  from './assets/wp8.jpg'
import  wp9  from './assets/wp9.jpg'

// import gapi from 'gapi-client';
import { gapi } from 'gapi-script';

function App() {
  // TODO make randomizer to img obj
  // TODO fetch from drive folder
  const [people, setPeople] = useState([
    {image: wp1},
    {image: wp2},
    {image: wp3},
    {image: wp4},
    {image: wp5},
    {image: wp6},
    {image: wp7},
    {image: wp8},
    {image: wp9},
]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const lastIndex = people.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, people]);

  
  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 9000);
    return () => clearInterval(slider);
  }, [index]);

  const API_KEY = import.meta.env.VITE_G_API_KEY2
  // const DISCOVERY_DOC = import.meta.env.DRIVE_ID
  const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';
  const CLIENT_ID = import.meta.env.VITE_CLIENT_ID
  const GOOGLE_ID = import.meta.env.GOOGLE_ID
  const SCOPES = 'https://www.googleapis.com/auth/drive.readonly';

  const getFotosFromDrive = async ( ) => {
    async function initializeGapiClient() {
      await gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        scope: SCOPES,
      }).then(async function() {
        return await gapi.client.request({
          path: SCOPES,
          discoveryDocs: DISCOVERY_DOC,
          
        });
    })
    .then(
      function () {
        tokenClient = google.accounts.oauth2.initTokenClient({
          client_id: CLIENT_ID,
          scope: SCOPES,
          // callback: '', // defined later
        });}
      // function (error) {}
    );
    }
    
    await gapi.load('client', initializeGapiClient);
  };

  useEffect(() => {

    getFotosFromDrive()
  
      

    
  }, [])

  // useEffect(() => {
  //   gapi.load('client:auth2', initClient);

  //   function initClient() {
  //     gapi.client.init({
  //       discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"],
  //       clientId: GOOGLE_ID,
  //       scope: 'https://www.googleapis.com/auth/drive.metadata.readonly'
  //     }).then(function () {
  //       // do stuff with loaded APIs
  //       console.log('it worked');
  //     });
  //   }
  
    
  // }, [])
  

  return (
    <section className="section">
      {/* <div className="title">
        <h2>
          <span>/</span>reviews
        </h2>
      </div> */}
      <div className="section-center">
        {people.map((person, personIndex) => {
          const { id, image, name } = person;
          let position = "nextSlide";
          if (personIndex === index) {
            position = "activeSlide";
          }
          if (
            personIndex === index - 1 ||
            (index === 0 && personIndex === people.length - 1)
          ) {
            position = "lastSlide";
          }
          return (
            <article key={id} className={position}>
              <img src={image} alt={name} className="person-img" />
              {/* <h4>{name}</h4>
              <p className="title">{title}</p>
              <p className="text">{quote}</p> */}
              {/* <FaQuoteRight className="icon" /> */}
            </article>
          );
        })}
        {/* <button className="prev" onClick={() => setIndex(index - 1)}>
          <FiChevronLeft />
        </button>
        <button className="next" onClick={() => setIndex(index + 1)}>
          <FiChevronRight />
        </button> */}
      </div>
    </section>
  );
}

export default App;
