/** @format */
// pages/video.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VideoPage = () => {
  const [apiMessage, setApiMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/hello?format=json');
        setApiMessage(response.data.message);
      } catch (error) {
        console.error('Error fetching API:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Video Page</h1>
      <p>API Response: {apiMessage}</p>
      {/* Video playback component or logic */}
    </div>
  );
};

export default VideoPage;
