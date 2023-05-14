const express = require("express");

const router = express.Router();

//database connection 
const db = require("../ConnectDB"); 

router.post("/login", (req, res) => { 
  const { email, password } = req.body;
  console.log(email, password);

  let authSQL = `SELECT email, password, type, id_user, firstName
                   FROM dizinv.user
                   where user.email = '${email}'
                   And user.password = '${password}'`;

  if (email && password) {
    db.query(authSQL, (err, result) => {
      if (err) {
        res.send({
          status: "FAILED",
          message: "no user with this email and password",
        });
        return;
      }

      if (result.length > 0) {
       // console.log(result);
        res.send({
          status: "SUCCESS",
          result: { ...result, password: "****" },
        });
        return;
      } else {
        res.send({
          status: "FAILED",
          message: "no user with this email and password",
        });
        return;
      }
    });
  } else {
    res.send({
      message: "enter email and password",
      status: "FAILED",
    });
    return;
  }
});

module.exports = router;
