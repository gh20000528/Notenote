import Document from '../../models/documents';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function getSidebar(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { userId, parentDocumentId } = req.body; 


        // fetch document data
        const alldocumnet = await Document.findAll({
            where: {
                userId: userId,
                parentDocument: parentDocumentId || null, 
            },
            order: [['id', 'DESC']]
        })

        // filter without parents document
        const documentWithOutParent = alldocumnet.filter(doc => doc.parentDocument === null);


        res.status(200).json({ data: documentWithOutParent });
    } catch (error) {
        res.status(500).json({ message: `Something went wrong: ${error}` });
    }
}