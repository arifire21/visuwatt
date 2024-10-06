import client from "@/lib/mongodb";

export default async(req, res) => {
    // try {
    const mongoClient = await client;
    // console.log('MGO CLIENT')
    // console.log(mongoClient)
    let connectedClient = await mongoClient.connect();
    // console.log('connectedCLIENT')
    // console.log(connectedClient)
    const db = connectedClient.db('Counties')

    // console.log(db)
    console.log('hi')

    const data = await db.collection('Broward')
        .find({})
        .toArray();
    
    res.json(data)
    // res.status(200).json({test:'test'})
}
    // const movies = await db
    //     .collection(movies)
    //     .find({})
    //     .limit(10)
    //     .toArray();

    // res.json(movies);
    // }   catch(e) {
    //     console.log(e)
    // }

    // Get a list of 50 posts
// router.get("/", async (req, res) => {
//     let collection = await db.collection("posts");
//     let results = await collection.find({})
//       .limit(50)
//       .toArray();
//     res.send(results).status(200);
//   });