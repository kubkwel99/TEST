import path from 'path';


export default function handler(req, res) {
  // Check if id parameter exists in req.query
  if (!req.query || !req.query.id) {
    res.status(400).send('Missing id parameter');
    return;
  }
  
  const { id } = req.query;
  const videoPath = path.join('path_to_videos_directory', `${id}.mp4`);

  // Check if the file exists
  if (fs.existsSync(videoPath)) {
    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;
    const range = req.headers.range;

    // Set headers for content length and type
    res.setHeader('Content-Type', 'video/mp4');
    res.setHeader('Content-Length', fileSize);

    // If range header is provided, serve partial content
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
}
