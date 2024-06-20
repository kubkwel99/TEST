/** @format */

// pages/portfolio.tsx

import React from 'react';
import { GetStaticProps } from 'next';
import { Video } from '@/types'; // Example alias setup
import videosData from '@/public/videos.json';

interface PortfolioProps {
  videos: Video[];
}

const PortfolioPage: React.FC<PortfolioProps> = ({ videos }) => {
  return (
    <div>
      <h1>Portfolio</h1>
      {videos.map((video) => (
        <div key={video.id}>
          <h2>{video.title}</h2>
          <p>{video.description}</p>
          <video controls>
            <source
              src={video.videoUrl}
              type='video/mp4'
            />
            Your browser does not support the video tag.
          </video>
        </div>
      ))}
    </div>
  );
};

export const getStaticProps: GetStaticProps<PortfolioProps> = async () => {
  // Fetch data from JSON file (simulate fetching videosData)
  const videos: Video[] = videosData;

  return {
    props: {
      videos,
    },
  };
};

export default PortfolioPage;
