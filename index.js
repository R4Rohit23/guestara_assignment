const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
dotenv.config();

// Import routes
const categoryRoutes = require('./routes/categoryRoutes');
const subcategoryRoutes = require("./routes/subCategoryRoutes");
const itemRoutes = require('./routes/itemRoutes');

const app = express();
const port = 3000;

// MongoDB connection
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind('MongoDB connection error:'));

app.use(bodyParser.json());

// Use routes
app.use('/categories', categoryRoutes);
app.use('/subcategories', subcategoryRoutes);
app.use('/items', itemRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});