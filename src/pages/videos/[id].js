/** @format */

// pages/api/videos/[id].js (or equivalent)
import path from 'path';
import fs from 'fs';

export default function handler(req, res) {
  const { id } = req.query;
  const videoPath = path.join('path_to_videos_directory', `${id}.mp4`);

  if (!id) {
    res.status(400).json({ error: 'Missing id parameter' });
    return;
  }

  if (fs.existsSync(videoPath)) {
    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;
    const range = req.headers.range;

    res.setHeader('Content-Type', 'video/mp4');
    res.setHeader('Content-Length', fileSize);

    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunkSize = end - start + 1;
      const file = fs.createReadStream(videoPath, { start, end });
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': 'video/mp4',
      };

      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const file = fs.createReadStream(videoPath);
      res.writeHead(200, {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      });
      file.pipe(res);
    }
  } else {
    res.status(404).send('Video not found');
  }

  // Example scenario where t should have a status() method
  let t = {
    status: function () {
      return 'Status is good';
    },
  };

  // Check if t.status is callable before using it
  if (typeof t.status === 'function') {
    let currentStatus = t.status();
    console.log(currentStatus);
  } else {
    console.error('t.status is not a function');
  }
}
