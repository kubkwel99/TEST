/** @format */

export default function handler(req, res) {
  const { format } = req.query;

  switch (format) {
    case 'json':
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json({ message: 'Hello from API in JSON format' });
      break;
    case 'xml':
      res.setHeader('Content-Type', 'application/xml');
      res.status(200).send('<message>Hello from API in XML format</message>');
      break;
    default:
      res.status(400).send('Invalid format specified');
  }
}
