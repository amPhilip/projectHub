const express = require('express')
require('dotenv').config();
const { graphqlHTTP } = require('express-graphql');
//const { buildSchema } = require('graphql');
const schema = require('./Schema/schema.js');
const colors = require('colors');
const connectDB = require('./config/db.js')
const app = express();
const PORT = process.env.PORT || 5000;

//MONGODB connection
connectDB();

//app.use -sect
app.use('/graphql', graphqlHTTP({
    schema: schema,
    //rootValue: root,
    graphiql: process.env.NODE_ENV === 'development',
  }));


app.listen(PORT, () =>{
    console.log(`Server is Running on Port ${PORT}: connected😁`)
})