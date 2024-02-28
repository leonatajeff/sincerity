import { NextApiRequest, NextApiResponse } from 'next';

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const formData = req.body;
  // Process the form data (e.g., save it to a database)
  console.log('Received form data:', formData);

  // Send a response indicating that the form data was received
  return res.status(200).json({ message: 'Form data received' });
}