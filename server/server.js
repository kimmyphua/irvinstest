const express = require('express')
require('./lib/mongodb')
const app = express()
require('dotenv').config()
const path = require('path');
const { graphqlHTTP } = require("express-graphql");
const schema = require("./graphql/schema/index");
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.resolve(__dirname, 'build')));



app.use("/api", require('./routes/item.routes'))
app.use(
    "/graphql",
    graphqlHTTP({
      schema,
      graphiql: true,
    })
  );
  
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});
app.listen(process.env.PORT || 8000, () => console.log(`running on 8000`))

