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
  const GOOGLE_ID = import.meta.env.VITE_GOOGLE_ID
  const SCOPES = 'https://www.googleapis.com/auth/drive.readonly';

  let tokenClient;
  let gapiInited = false;
  let gisInited = false;
  
      function gapiLoaded() {
        gapi.load('client', initializeGapiClient);
      }
      async function initializeGapiClient() {
        await gapi.client.init({
          apiKey: API_KEY,
          discoveryDocs: [DISCOVERY_DOC],
        });
        gapiInited = true;
        maybeEnableButtons();
      }
      function gisLoaded() {
        tokenClient = google.accounts.oauth2.initTokenClient({
          client_id: CLIENT_ID,
          scope: SCOPES,
          callback: '', // defined later
        });
        gisInited = true;
        maybeEnableButtons();
      }

      function handleAuthClick() {
        tokenClient.callback = async (resp) => {
          if (resp.error !== undefined) {
            throw (resp);
          }
          document.getElementById('signout_button').style.visibility = 'visible';
          document.getElementById('authorize_button').innerText = 'Refresh';
          await listFiles();
        };

        if (gapi.client.getToken() === null) {
          // Prompt the user to select a Google Account and ask for consent to share their data
          // when establishing a new session.
          tokenClient.requestAccessToken({prompt: 'consent'});
        } else {
          // Skip display of account chooser and consent dialog for an existing session.
          tokenClient.requestAccessToken({prompt: ''});
        }
    const auth = gapi.auth2.getAuthInstance();

      }

      /**
       *  Sign out the user upon button click.
       */
      function handleSignoutClick() {
        const token = gapi.client.getToken();
        if (token !== null) {
          google.accounts.oauth2.revoke(token.access_token);
          gapi.client.setToken('');
          document.getElementById('content').innerText = '';
          document.getElementById('authorize_button').innerText = 'Authorize';
          // document.getElementById('signout_button').style.visibility = 'hidden';
        }
      }

      /**
       * Print metadata for first 10 files.
       */
      async function listFiles() {
        let response;
        try {
          response = await gapi.client.drive.files.list({
            'pageSize': 10,
            'fields': 'files(id, name)',
          });
        } catch (err) {
          throw err
      }
    }

  const getFotosFromDrive = async ( ) => {
    async function initializeGapiClient() {
      await gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        scope: SCOPES,
      })
      // .then(async function() {
        //   gapiInited = true
        //   return await gapi.client.request({
        // discoveryDocs: DISCOVERY_DOC,
      //     path: SCOPES,
          
      //   });
      // })
    // .then(
    //   function () {
    //     tokenClient = google.accounts.oauth2.initTokenClient({
    //       client_id: CLIENT_ID,
    //       scope: SCOPES,
    //       // callback: '', // defined later
    //     });}
      
    //   );
    }
    
    await gapi.load('client', initializeGapiClient);
    const auth = gapi.auth2.getAuthInstance();
  };

  useEffect(() => {

    // getFotosFromDrive()
    gapiLoaded()
    gisLoaded()
    // handleAuthClick()
    listFiles()
  
      

    
  }, [])


  

  return (
    <>
      <section className="section">
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
                
              </article>
            );
          })}
        </div>
      </section>
        </>
  );
}

export default App;
