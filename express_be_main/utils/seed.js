const { connectDB } = require('../data');
const User = require('../models/User');

const users = [
  { id: 1, name: 'user1' },
  { id: 2, name: 'user2' },
  { id: 3, name: 'user3' },
  { id: 4, name: 'user4' },
];

const seedDB = async () => {
  await connectDB();

  // Empty the collection
  await User.deleteMany({});

  // Insert new data
  await User.insertMany(users);

  console.log('Data Seeded!');
  process.exit();
};

seedDB().catch(err => {
  console.error(err);
  process.exit(1);
});
