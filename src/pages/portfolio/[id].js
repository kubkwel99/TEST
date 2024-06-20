'use client';
import React from 'react';
import ReactPlayer from 'react-player';

const VideoPage = ({ videoId }) => {
  const videoUrl = `/api/videos/${videoId}`;

  return (
    <div>
      <h1>Video Page</h1>
      <ReactPlayer url={videoUrl} controls />
    </div>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.params;
  return {
    props: {
      videoId: id,
    },
  };
}

export default VideoPage;
