import Document from '../../models/documents';
import { NextApiRequest, NextApiResponse} from 'next';

export default async function create(req: NextApiRequest, res: NextApiResponse) {
    try {
        
        const { notedata } = req.body;

        console.log(notedata);
        

        // create data
        const document = await Document.create({
            title: notedata.title,
            userId: notedata.userId,
            parentDocumentId: notedata.parentDocumentId,
            isArchived: false,
            isPublished: false
        }) 

        res.status(200).json({ message: 'create success'})
    } catch (error) {
        res.status(500).json({ message: `something error ${error}` })   
    }
}