const express = require("express");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const replace = require("replace-in-file");

const db = require("../ConnectDB");

const JWT_SECRET = "i love my mum the most.....";

const router = express.Router();

//this is for sending email and we have a middleware i.e send
router.post("/forgot", send, (req, res) => {});

function send(req, res, next) {
  const { email } = req.body;

  let checkEmail = ` SELECT email, password, type FROM dizinv.user where user.email = '${email}' ;`;

  if (email) {
    db.query(checkEmail, (err, result) => {
      if (err) {
        res.send({ status: "NON" });
        console.log("err");
        return;
      }

      if (result.length <= 0) {
        res.send({ status: "NON" });
        return;
      } else {
        //console.log(result)
        //user exists so we create a one time link valid for 10 mins
        const secret = JWT_SECRET + result[0].password;
        const payload = {
          email: result[0].email,
          type: result[0].type,
        };

        const token = jwt.sign(payload, secret, { expiresIn: "10m" });

        //generating a link
        const link = `http://localhost:3000/reset-password/${result[0].email}/${token}`;

        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "ndubuisi.eze@univ-constantine2.dz",
            pass: "Fh5Am1Vw4",
          },
          tls: {
            rejectUnauthorized: false,
          },
        });

        //things to change initially before sending
        const Before = {
          files: "./public/index.html",
          from: /TheLinkToReplaceFromToken/g, //regex to regcognice what to change
          to: link,
        };

        //things to chage finally after sending
        const After = {
          files: "./public/index.html",
          from: link, //string to regcognice what to change
          to: "TheLinkToReplaceFromToken",
        };

        //change the file to be sent to the user and reverts it back to original
        replace(Before)
          .then((changedFiles) => {
            const file = changedFiles[0].file;
            fs.readFile(file, null, (err, data) => {
              if (err) {
                res.send({ status: "FAILED" });
                return console.log(err);
              }

              let details = {
                from: "ndubuisi.eze@univ-constantine2.dz",
                to: email,
                subject: "DizInv Password Reset",
                html: data,
              };

              transporter.sendMail(details, (err, info) => {
                if (err) {
                  console.log(err);
                  res.send({ status: "FAILED" });
                  return;
                }
                if (info) {
                  //change file back to the original i.e TheLinkToReplaceFromToken
                  replace(After)
                    .then((changedFiles) => {
                      console.log(changedFiles);
                      res.send({ status: "SUCCESS" });
                    })
                    .catch((err) => {
                      res.send({ status: "FAILED" });
                      return;
                    });
                }
              });
            });
          })
          .catch((err) => {
            console.log(err);
            res.send({ status: "FAILED" });
            return;
          })
          .finally(() => {
            //note this finally is to make sure to change the file
            replace(After)
              .then((changedFiles) => {
                console.log(changedFiles);
              })
              .catch((err) => {
                console.log({ status: "FAILED" });
              });
          });
      }
    });
  }
}

//check and verify link immediatly component mounts
router.get("/reset-password/:email/:token", (req, res) => {
  const { email, token } = req.params;

  let checkEmail = ` SELECT email, password, type FROM dizinv.user where user.email = '${email}' ;`;

  if (email) {
    db.query(checkEmail, (err, result) => {
      if (err) {
        res.send({ status: "NON" });
        console.log("err");
        return;
      }

      if (result.length <= 0) {
        res.send({ status: "NON" });
        return;
      } else {
        //we have a user with this email
        const secret = JWT_SECRET + result[0].password;
        try {
          const payload = jwt.verify(token, secret);
          res.send({ status: "SUCCESS" });
        } catch (error) {
          console.log(error.message);
          res.send({ status: "NON" });
        }
      }
    });
  }
});

router.post("/reset-password/:email/:token", (req, res) => {
  const { email, token } = req.params;
  const { password, confirmPassword } = req.body;

  if (password != confirmPassword) {
    res.send({ status: "PASS" });
    return;
  }

  let checkEmail = ` SELECT email, password, type FROM dizinv.user where user.email = '${email}' ;`;

  if (email) {
    db.query(checkEmail, (err, result) => {
      if (err) {
        res.send({ status: "NON" });
        console.log("err");
        return;
      }

      if (result.length <= 0) {
        res.send({ status: "NON" });
        return;
      } else {
        const secret = JWT_SECRET + result[0].password;
        try {
          const payload = jwt.verify(token, secret);

          let changePassSQL = `UPDATE dizinv.user SET user.password = '${password}' 
                               WHERE (user.email = '${email}');
          `;

          db.query(changePassSQL, (err, result) => {
            if (err) {
              res.send({ status: "NON" });
              console.log("err");
              return;
            }

            if (result) {
              res.send({ status: "SUCCESS" });
            }
          });
        } catch (error) {
          console.log(error.message);
          res.send({ status: "NON" });
        }
      }
    });
  }
});

module.exports = router;
