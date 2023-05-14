const express = require("express");


const router = express.Router();

//database connection
const db = require("../ConnectDB");

router.get("/data/:email", (req, res) => {
  const { email } = req.params;
  //console.log(email);

  let UserDataSql = `SELECT * FROM dizinv.user, dizinv.students 
  WHERE user.id_user = students.inscription
   And  user.email = '${email}' ;`;

  db.query(UserDataSql, (err, result) => {
    if (err) {
      //  console.log({ status: "FAILED", message: err.sqlMessage });
      res.send({ status: "FAILED", message: "error fetching data ..." });
      return;
    }
    if (result.length > 0) {
      let response = result.map((data) => {
        return { ...data, password: "****" };
      });
      // console.log({ status: "SUCCESS", result: response[0] });
      res.send({ status: "SUCCESS", result: response[0] });
      return;
    }

    res.send({ status: "FAILED", message: "error fetching data ..." });
    return;
  });
});

router.get("/profile/:email", (req, res) => {
  const { email } = req.params;
  console.log(email);

  let userSQL = `SELECT * FROM user, students 
   WHERE user.id_user = students.inscription
   AND user.email = '${email}';`;

  //find the persons data from the database

  db.query(userSQL, (err, result) => {
    if (err) {
      //  console.log({ status: "FAILED", message: err.sqlMessage });
      res.send({ status: "FAILED", message: "error fetching data ..." });
      return;
    }
    if (result.length > 0) {
      let response = result.map((data) => {
        return { ...data, password: "****" };
      });
      // console.log({ status: "SUCCESS", result: response[0] });
      res.send({ status: "SUCCESS", result: response[0] });
      return;
    }

    res.send({ status: "FAILED", message: "error fetching data ..." });
    return;
  });
});

//update student profile in the database
router.post("/update-profile", (req, res) => {
  const { newValues } = req.body;
  const { firstName, lastName, email, phone, address, city, inscription } =
    newValues;

  //console.log(firstName, lastName, email, phone, address, city, inscription); 

  let updateUserSQL = `UPDATE dizinv.user 
       SET firstName = '${firstName}', lastName = '${lastName}', email = '${email}', 
       address = '${address}', city = '${city}', phone = '${phone}' 
       WHERE (id_user = '${inscription}');`;

  db.query(updateUserSQL, (err, result) => {
    if (err) {
      //  console.log({ status: "FAILED", message: err.sqlMessage });
      res.send({
        status: "FAILED",
        message: "something went wrong try again !!",
      });
      return;
    }

    if (result) {
      res.send({ status: "SUCCESS", message: "Update Successfull" });
      return;
    }

    res.send({
      status: "FAILED",
      message: "something went wrong try again !!",
    });
    return;
  });
});

module.exports = router;
