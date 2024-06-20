'use client';

import React from 'react';
import YouTube from 'react-youtube';

const Page: React.FC = () => {
  // YouTube video ID
  const videoId = 'mmuKT0m0-1k';

  // Options for react-youtube player
  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <div>
      <h1>Page with YouTube Video</h1>
      <YouTube videoId={videoId} opts={opts} />
    </div>
  );
};

export default Page;
