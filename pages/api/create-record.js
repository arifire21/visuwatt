import db from '@/lib/mongodb'
export default async (req, res) => {
  try {
    //REPLACE WITH FIELDS WE ARE USING
    const { name, to, quantity, description, externalUrl, unlockTime, targetBalance, timestamp } = req.body
    const collection = db.collection('COLLECTION NAME HERE')

    // Create a unique index on the 'to' field (ETH address)
    // * REMOVED THIS - better to create keys manually, or via the db,
    // so it's not repeated with every api call
    // await collection.createIndex({ to: 1 }, { unique: true })

    //REPLACE WITH FIELDS WE ARE USING
    const result = await collection.insertOne({
      to,
      name,
      quantity,
      description,
      externalUrl,
      unlockTime,
      targetBalance,
      timestamp,
    })
    if (result.insertedId) {
      const insertedDocument = {
        _id: result.insertedId, // Use the insertedId as the document's _id
        ...req.body, // Include the rest of the document data
      }
      res.status(201).json({ message: 'Record created successfully', data: insertedDocument })
    } else {
      res.status(500).json({ message: 'Error creating record' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error creating record' })
  }
}