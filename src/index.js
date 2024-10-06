import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import './styles/table.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { useState, useEffect } from 'react';



const root = ReactDOM.createRoot(document.getElementById('root'));


/*
const useScript = l => {
  useEffect(() => {
    const script = document.createElement('script');

    if (l.search[1] === '/') {
      var decoded = l.search.slice(1).split('&').map(function (s) {
        return s.replace(/~and~/g, '&')
      }).join('?');
      window.history.replaceState(null, null,
        l.pathname.slice(0, -1) + decoded + l.hash
      );



    }
  }
  )
};*/

/*
meta:{
  property:"og:title",
   content:"Projets persos"
},
meta:{
    property:"og:image",
    content:"chrome://branding/content/about-logo.png"
  }
  */
/*
<Helmet>
<title>Jub's project page</title>
<meta property="og:title" content="Jub Biography" />
<meta property="og:image" content="chrome://branding/content/about-logo.png"/>
</Helmet>
*/


root.render(


  <React.StrictMode>
      <App />
  </React.StrictMode>




);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
