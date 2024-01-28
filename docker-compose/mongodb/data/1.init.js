db = db.getSiblingDB('mern_db');

db.createUser({
  user: 'dbuser',
  pwd: 'dbuserpass',
  roles: [
    {
      role: 'readWrite',
      db: 'mern_db',
    },
  ],
});

db.createCollection('users');
db.users.insertOne({ id: 1, name: 'user1' });
db.users.insertOne({ id: 2, name: 'user2' });
db.users.insertOne({ id: 3, name: 'user3' });
db.users.insertOne({ id: 99, name: 'user99' });
