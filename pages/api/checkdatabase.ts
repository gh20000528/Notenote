import sequelize from '../../lib/db';
import { NextApiRequest, NextApiResponse} from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    res.status(200).json({ message: 'Connection established' });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    res.status(500).json({ message: 'Connection error' });
  }
}