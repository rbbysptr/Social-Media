
// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// const uri = "mongodb+srv://fsjs2024:MMsb0i8ZnnAQk8iv@cluster0.jmlesxp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

// // Create a new client and connect to MongoDB
// const client = new MongoClient(uri);

// async function run() {
//     try {
//         // Connect to the "insertDB" database and access its "haiku" collection
//         const database = client.db("phase-3");
//         const postCollection = database.collection("Users");

//         // Create a document to insert
//         // const doc = {
//         //     content: "Record of a Shriveled Datum",
//         //     tags: "No bytes, no problem. Just insert a document, in MongoDB",
//         //     imgUrl: "https://example.com",
//         //     authorId: 2,
//         //     comments: "ga ngerti ya ampun",
//         //     likes:"fanny"
//         // }
//         // Insert the defined document into the "haiku" collection
//         // const result = await postCollection.insertOne(doc);
//         //cari berdasarkan id
//         // const result = await postCollection.findOne({
//             //     _id: new ObjectId("6631f170375f650fc928f479")
//         // });
//         //findAll semua data
//         const result = await postCollection.find().toArray();
//         //update data
//         // const result = await postCollection.updateOne({
//         //     _id: new ObjectId("6632159e2370e48d6833092b")
//         // }, {
//         //     $set: {
//         //         content:"obx"
//         //     }
//         // });
//         //delete
//         // const query = { content:"obx" };
//         // const result = await postCollection.deleteOne(query);
//             console.log(result)

//         // Print the ID of the inserted document
//         console.log(`A document was inserted with the _id: ${result.insertedId}`);
//     } finally {
//         // Close the MongoDB client connection
//         await client.close();
//     }
// }
// // Run the function and handle any errors
// run().catch(console.dir);
