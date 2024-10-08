import client from "@/lib/connect";

export default async(req, res) => {
    const county = req.query.county;

    try {
        const mongoClient = await client;
        let connectedClient = await mongoClient.connect();
        const db = connectedClient.db('Counties')

        const data = await db.collection(county).find({}).toArray();
        
        res.status(200).json(data)

        connectedClient.close();
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error retrieving record!' })
    }

}