// next.config.mjs

const nextConfig = {
  async headers() {
    return [
      {
        source: '/videos/:path*',  // Adjust this path based on where your videos are located
        headers: [
          {
            key: 'Content-Type',
            value: 'video/mp4', // Adjust MIME type based on your video format
          },
          
        ],
        
      },
    ];
  },
};

export default nextConfig;
