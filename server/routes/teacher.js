const express = require("express");

let { teacher } = require("../temp data/teachers");

const router = express.Router();

//database connection
const db = require("../ConnectDB");

router.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  // console.log(id);

  let getDataSQL = ` SELECT *  FROM dizinv.user, dizinv.teacher 
                     where user.id_user = teacher.id_user 
                     And user.id_user = '${id}' ;`;

  if (id) {
    db.query(getDataSQL, (err, result) => {
      if (err) {
        res.send({
          status: "FAILED",
        });
        return;
      }

      if (result) {
        //  console.log(result);
        const response = { ...result[0], password: "********" };
        res.send({
          status: "SUCCESS",
          person: response,
        });

        return;
      }
    });
  }
});

router.post("/update-profile", (req, res) => {
  const { newValues } = req.body;

  const { id_user, firstName, lastName, email } = newValues;
  const { password, phone, address, city } = newValues;

  let updateSQL = `UPDATE dizinv.user 
                  SET firstName = '${firstName}', lastName = '${lastName}', 
                  email = '${email}', address = '${address}', 
                  city = '${city}', phone = '${phone}' 
                  WHERE (id_user = '${id_user}');
  `;

  //.log(id_user);

  if (id_user) {
    db.query(updateSQL, (err, result) => {
      if (err) {
        res.send({
          status: "FAILED",
        });
        return;
      }

      if (result) {
        res.send({
          status: "SUCCESS",
        });

        return;
      }
    });
  }
});

module.exports = router;
