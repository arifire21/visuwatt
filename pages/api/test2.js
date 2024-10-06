import clientPromise from "@/lib/mongodb";

export default async(req, res) => {
    const mongoClient = await clientPromise;

    const data = await mongoClient.db().collection('Broward').find().toArray()

    res.status(200).json(JSON.parse(JSON.stringify(data)));
}