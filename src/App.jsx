import React, { useState, useEffect } from 'react';
    import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
    import axios from 'axios';

    const App = () => {
      const [accessToken, setAccessToken] = useState(null);
      const [storageInfo, setStorageInfo] = useState(null);

      const clientId = '52105631476-p3vv0ff1rq96io2pp13ms7n947hdfg69.apps.googleusercontent.com';

      useEffect(() => {
        if (accessToken) {
          fetchDriveStorageInfo(accessToken);
        }
      }, [accessToken]);

      const fetchDriveStorageInfo = async (token) => {
        try {
          const response = await axios.get(
            'https://www.googleapis.com/drive/v3/about?fields=storageQuota',
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setStorageInfo(response.data.storageQuota);
        } catch (error) {
          console.error('Error fetching storage info:', error);
        }
      };

      return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <h1>Google Drive Storage Info</h1>
          {!accessToken ? (
            <GoogleOAuthProvider clientId={clientId}>
              <GoogleLogin
                scope="https://www.googleapis.com/auth/drive.readonly"
                onSuccess={credentialResponse => {
                  setAccessToken(credentialResponse.credential);
                }}
                onError={() => {
                  console.log('Login Failed');
                }}
              />
            </GoogleOAuthProvider>
          ) : (
            <div>
              <h2>Storage Information</h2>
              {storageInfo ? (
                <div>
                  <p>Total Storage: {(storageInfo.limit / (1024 ** 3)).toFixed(2)} GB</p>
                  <p>Used Storage: {(storageInfo.usage / (1024 ** 3)).toFixed(2)} GB</p>
                </div>
              ) : (
                <p>Loading storage information...</p>
              )}
            </div>
          )}
        </div>
      );
    };

    export default App;
