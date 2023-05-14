const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

const admin = require("./routes/admin");
const teacher = require("./routes/teacher");
const chelf = require("./routes/chelf");
const student = require("./routes/student");
const auth = require("./routes/auth");
const forgot = require("./routes/forgot");
const managePresence = require("./routes/managePresence")

app.use(cors());
//parse json
app.use(express.json());
//parse from data
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "public"));

//routes uses and imports
app.use("/", auth);
app.use("/", forgot);
app.use("/api/admin", admin);
app.use("/api/teacher", teacher);  
app.use("/api/chelf", chelf);
app.use("/api/student", student);
app.use("/api/managePresence", managePresence);

app.listen(5000, () => {
  console.log("server running on port 5000 ....");
});
