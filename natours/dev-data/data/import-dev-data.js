const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const Tour = require('./../../models/tourModel');
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB)
  .then((con) => {
    console.log(con.connections);
    console.log('DB connection successful!');
  })
  .catch((err) => {
    console.err('DB connection error:', err);
  });

// READ JSON FILE
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'),
);

// IMPORT DATA FROM DATABASE
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data import  successfully loaded');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE DATA FROM DATABASE
const deleteData = async () => {
  try {
    await Tour.deleteMany(); // Added await here
    console.log('Data Delete  successfully ');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
