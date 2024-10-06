import client from "@/lib/mongodb";

export default async(req, res) => {
    const county = req.query.county;

    const mongoClient = await client;
    let connectedClient = await mongoClient.connect();
    const db = connectedClient.db('Counties')

    const data = await db.collection(county).find({}).toArray();
    
    res.json(data)
}