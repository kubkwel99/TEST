/** @format */

import express from 'express';
import next from 'next';
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Serve static files from the 'public' directory
  server.use(express.static('public'));

  // Route to serve videos
  server.get('/videos/:videoName', (req, res) => {
    const { videoName } = req.params;
    const videoPath = `./public/videos/${videoName}`;
    const videoFilePath = path.join(__dirname, videoPath);

    // Set the correct Content-Type header
    res.setHeader('Content-Type', 'video/mp4');

    // Check if the video file exists
    if (!fs.existsSync(videoFilePath)) {
      return res.status(404).send('Video not found');
    }

    // Get video file stats (size)
    const stat = fs.statSync(videoFilePath);
    const fileSize = stat.size;

    // Set headers
    const headers = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    };

    // Stream video file
    res.writeHead(200, headers);
    fs.createReadStream(videoFilePath).pipe(res);
  });

  // Default handler for all other requests
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  // Start server
  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});
