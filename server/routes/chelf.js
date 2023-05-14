const express = require("express");

const router = express.Router();

//database connection
const db = require("../ConnectDB");

router.get("/data/:email", (req, res) => {
  const { email } = req.params;
  //console.log(email);

  let getDataSQL = ` SELECT *  FROM dizinv.user, dizinv.teacher 
                     where user.id_user = teacher.id_user 
                     And email = '${email}' ;`;

  if (email) {
    db.query(getDataSQL, (err, result) => {
      if (err) {
        res.send({
          status: "FAILED",
        });
        return;
      }

      if (result) {
        //  console.log(result);
        const { department, module, status, groups, level, sceance } =
          result[0];

        res.send({
          status: "SUCCESS",
          data: { department, module, status, groups, level, sceance },
        });

        return;
      }
    });
  }
});

//use the department name to get the list of all teacger in that department
router.get("/emails/:department", (req, res) => {
  const { department } = req.params;

  let getTeacherSQL = ` SELECT email  FROM dizinv.user, dizinv.teacher 
                        where user.id_user = teacher.id_user 
                        And teacher.department = '${department}' ;`;

  if (department) {
    db.query(getTeacherSQL, (err, result) => {
      if (err) {
        res.send({
          status: "FAILED",
        });
        return;
      }

      if (result) {
        console.log(result);
        const emails = result.map((email) => ({
          value: email.email,
          label: email.email,
        }));

        res.send({ status: "SUCCESS", emails: emails });

        return;
      }
    });
  }
});

module.exports = router;
