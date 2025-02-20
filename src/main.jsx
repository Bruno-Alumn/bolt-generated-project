import React from 'react';
    import ReactDOM from 'react-dom/client';
    import App from './App.jsx';
    import './index.css';
    import { GoogleOAuthProvider } from '@react-oauth/google';

    const clientId = '52105631476-p3vv0ff1rq96io2pp13ms7n947hdfg69.apps.googleusercontent.com';

    ReactDOM.createRoot(document.getElementById('root')).render(
      <React.StrictMode>
        <GoogleOAuthProvider clientId={clientId}>
          <App />
        </GoogleOAuthProvider>
      </React.StrictMode>
    );
