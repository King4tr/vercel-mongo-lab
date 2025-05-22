const { MongoClient } = require('mongodb');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).send('Only POST allowed');

  const { name, email } = req.body;
  const uri = process.env.MONGODB_URI;

  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('studentsDB');
    const users = db.collection('users');
    await users.insertOne({ name, email, timestamp: new Date() });

    res.status(200).json({ message: 'User added successfully' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    await client.close();
  }
};
