const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://nnicolopez:Ri8fbF.6sYSv9.T@nodejs-course.mwzwalm.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

module.exports = client.db("nodejs-course");
