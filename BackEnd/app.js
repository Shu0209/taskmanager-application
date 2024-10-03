const express = require('express')
const app = express()
const port = process.env.PORT||1000
require("dotenv").config();
require("./connections/conn")
const cors=require("cors");
app.use(express.json());
const UserAPI=require("./routes/user");
app.use(cors());
const TaskAPI=require("./routes/task")

app.use("/api/v1",UserAPI);
app.use("/api/v2",TaskAPI)

//localhost:1000/api/v1/sign-in

app.use('/', (req, res) => {
  res.send('Hello welcome to backend')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})