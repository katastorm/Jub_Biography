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

<>
<script type="text/javascript">
      // Single Page Apps for GitHub Pages
      // MIT License
      // https://github.com/rafgraph/spa-github-pages
      // This script checks to see if a redirect is present in the query string,
      // converts it back into the correct url and adds it to the
      // browser's history using window.history.replaceState(...),
      // which won't cause the browser to attempt to load the new url.
      // When the single page app is loaded further down in this file,
      // the correct url will be waiting in the browser's history for
      // the single page app to route accordingly.
      {(function(l) {
        if (l.search[1] === '/' ) {
          var decoded = l.search.slice(1).split('&').map(function(s) { 
            return s.replace(/~and~/g, '&')
          }).join('?');
          window.history.replaceState(null, null,
              l.pathname.slice(0, -1) + decoded + l.hash
          );
        }
      }(window.location))}
    </script>


  <React.StrictMode>
      <App />
  </React.StrictMode>

</>


);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
