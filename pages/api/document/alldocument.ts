import Document from '../../models/documents';
import { NextApiRequest, NextApiResponse} from 'next';

export default async function alldocument(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { userId } = req.body
        
        // fetch document data
        const alldocumnet = await Document.findAll({ where: {userId: userId}})

        res.status(200).json({ data: alldocumnet })
    } catch (error) {
        res.status(500).json({ message: `something error ${error}` })
    }
}