const express = require("express");

const router = express.Router();
 
//database connection
const db = require("../ConnectDB");

//password generator
const generator = require("generate-password");

router.get("/dashboard", (req, res) => {
  res.send(users);
});

//getting a list of students by there levels (DB)
router.get("/students/:level", (req, res) => {
  let parameter = req.params.level;

  //console.log(parameter)

  if (parameter === "licence1") {
    parameter = "Licence 1";
  } else if (parameter === "licence2") {
    parameter = "Licence 2";
  } else if (parameter === "licence3") {
    parameter = "Licence 3";
  } else if (parameter === "master1") {
    parameter = "Master 1";
  } else if (parameter === "master2") {
    parameter = "Master 2";
  } else {
  }

  let getUserSQL = ` SELECT * FROM dizinv.user, dizinv.students 
                    where user.id_user = students.inscription
                    and students.level = '${parameter}' ;`;

  if (parameter) {
    db.query(getUserSQL, (err, result) => {
      if (err) {
        res.send({ status: "FAILED" });
        return;
      }
      if (result) {
        let response = result.map((data) => {
          return { ...data, password: "****" };
        });
        res.status(200).send({ status: "SUCCESS", result: response });
      }
    });
  } else {
    res.send({ status: "FAILED" });
    return;
  }
});

//geting the admin profile (DB)
router.get("/profile/:email", (req, res) => {
  const { email } = req.params;
  // console.log(email);

  let adminProfileSQL = ` SELECT * 
                        FROM dizinv.user, dizinv.admin
                        where email = 'admin@gmail.com'`;

  if (email) {
    db.query(adminProfileSQL, (err, result) => {
      if (err) {
        res.send({
          status: "FAILED",
          message: "something went wrong, Try again !!",
        });
        return;
      }
      if (result) {
        // console.log({ ...result[0], password: "****" })
        res.send({
          status: "SUCCESS",
          result: { ...result[0], password: "*********" },
        });
        return;
      }
    });
  } else {
    res.send({
      status: "FAILED",
      message: "something went wrong, Try again !!",
    });
    return;
  }
});

//updating Admin profile (DB)
router.post("/update-profile", (req, res) => {
  const { values, id } = req.body;
  const { firstName, lastName, email, address, city, phone } = values;
  //   console.log(id, values);

  let adminProfileSQL = `UPDATE dizinv.user 
                        SET firstName = '${firstName}', lastName = '${lastName}', email = '${email}', 
                        address = '${address}', city = '${city}',
                        phone = '${phone}'
                        WHERE (user.id_user = '${id}');`;

  if (values) {
    db.query(adminProfileSQL, (err, result) => {
      if (err) {
        console.log("kkkk");
        res.send({
          status: "FAILED",
          message: "something went wrong, Try again !!",
        });
        console.log({
          message: err.message,
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
  } else {
    res.send({
      status: "FAILED",
      message: "something went wrong, Try again !!",
    });
    return;
  }
});

//getting user profile with theere id both teacher and students (DB)
router.get("/user-profile/:handler/:id", (req, res) => {
  const { handler, id } = req.params;
  console.log(handler, id);

  let userStudentSQL = ` SELECT * FROM dizinv.user, dizinv.students
                  where user.id_user = students.inscription
                  and inscription = '${id}'
                  ;`;

  let userTeacherSQL = ` SELECT * FROM dizinv.user, dizinv.teacher
                        where user.id_user = teacher.id_user
                        and teacher.id_user = '${id}'
                  ;`;

  if (handler === "student") {
    db.query(userStudentSQL, (err, result) => {
      if (err) {
        res.send({ status: "FAILED" });
        return;
      }
      if (result) {
        let response = result.map((data) => {
          return { ...data, password: "****" };
        });
        res.status(200).send({ status: "SUCCESS", result: response });
      }
    });
  }
  if (handler === "teacher") {
    db.query(userTeacherSQL, (err, result) => {
      if (err) {
        res.send({ status: "FAILED" });
        return;
      }
      if (result) {
        let response = result.map((data) => {
          const obj = {
            ...data,
            password: "********",
            id: data.id_user,
            groups: JSON.parse(data.groups),
            sceance: JSON.parse(data.sceance),
          };
          // console.log(obj);
          return obj;
        });
        res.status(200).send({ status: "SUCCESS", result: response });
      }
    });
  }
});

//updating Student profile by admin (DB)
router.post("/update-profile/student", (req, res) => {
  const { values, id } = req.body; 

  const { firstName, lastName, email, phone, address, city } = values;
  const { inscription, section_speciality, group } = values;

  // console.log(id, values);

  let adminProfileSQL = `UPDATE dizinv.user 
                        SET firstName = '${firstName}', lastName = '${lastName}', email = '${email}', 
                        address = '${address}', city = '${city}',
                        phone = '${phone}'
                        WHERE (user.id_user = '${id}');`;

  if (values) {
    db.query(adminProfileSQL, (err, result) => {
      if (err) {
        console.log("kkkk");
        res.send({
          status: "FAILED",
          message: "something went wrong, Try again !!",
        });
        // console.log({
        //   message: err.message,
        // });
        return;
      }
      if (result) {
        res.send({
          status: "SUCCESS",
        });
        return;
      }
    });
  } else {
    res.send({
      status: "FAILED",
      message: "something went wrong, Try again !!",
    });
    return;
  }
});

//deleting a user both teacher and students (DB)
router.delete("/delete/:handler/:id", (req, res) => {
  const { handler, id } = req.params;
  console.log(handler, id);

  //delete students fromt he students table
  let deleteStudentSQL1 = `DELETE FROM dizinv.students WHERE (students.inscription = '${id}');`;
  //delete teacher from the tecaheers table
  let deleteTeacherSQL1 = `DELETE FROM dizinv.teacher WHERE (teacher.id_user = '${id}');`;
  // deletes both teacher and student in the user table
  let deleteUserSQL = `DELETE FROM dizinv.user WHERE (user.id_user = '${id}');`;

  // deleting students
  if (handler === "student") {
    //deleting from student table first before the user table because the id is a foregine key to the user table
    db.query(deleteStudentSQL1, (err, result) => {
      if (err) {
        res.send({
          status: "FAILED",
          message: "something went wrong, Try again!!",
        });
        return;
      }
      if (result) {
        //now deleting from the user table after succefully deleting from student table
        db.query(deleteUserSQL, (err, result) => {
          if (err) {
            res.send({
              status: "FAILED",
              message: "something went wrong, Try again!!",
            });
            return;
          }
          if (result) {
            res.send({
              status: "SUCCESS",
              message: "User deleted succefully",
            });
            return;
          }
        });
      }
    });
  }

  //deleting teacher
  if (handler === "teacher") {
    //deleting from teacher table first before the user table because the id is a foregine key to the user table
    db.query(deleteTeacherSQL1, (err, result) => {
      if (err) {
        res.send({
          status: "FAILED",
          message: "something went wrong, Try again!!",
        });
        return;
      }
      if (result) {
        //now deleting from the user table after succefully deleting from student table
        db.query(deleteUserSQL, (err, result) => {
          if (err) {
            res.send({
              status: "FAILED",
              message: "something went wrong, Try again!!",
            });
            return;
          }
          if (result) {
            res.send({
              status: "SUCCESS",
              message: "User deleted succefully",
            });
          }
        });
      }
    });
  }
});

//route to add a new student (DB)
router.post("/add-new-student", (req, res) => {
  const { values } = req.body;
  // console.log(values);

  const { firstName, lastName, email, phone, address, city } = values;
  const { level, inscription, section_speciality, department, group } = values;

  const password = generator.generate({
    length: 10,
    lowercase: true,
    uppercase: false,
    numbers: false,
    symbols: false,
  });
  // const ins = generator.generate({
  //   length: 10,
  //   lowercase: false,
  //   uppercase: true,
  //   numbers: true,
  //   symbols: false,
  // });

  let addStudentUserSQL = `INSERT INTO dizinv.user 
                      (id_user, firstName, lastName, email, address, city, password, phone, type) 
                      VALUES ('${inscription}', '${firstName}', '${lastName}', '${email}', '${address}', 
                      '${city}', '${password}', '${phone}', 'student');`;

  let addStudentTableSQL = `INSERT INTO dizinv.students 
                          (inscription, department, level, student_group, section_speciality) 
                          VALUES ('${inscription}', '${department}', '${level}', '${group}', '${section_speciality}');
  `;

  if (values) {
    db.query(addStudentUserSQL, (err, result) => {
      if (err) {
        res.send({ status: "FAILED" });
        return;
      }
      if (result) {
        db.query(addStudentTableSQL, (err, result) => {
          if (err) {
            res.send({
              status: "FAILED",
              message: "could not add to student table",
            });
            return;
          }
          if (result) {
            res.status(200).send({ status: "SUCCESS" });
            return;
          }
        });
      }
    });
  } else {
    //if it reacheses here
    res.send({ status: "FAILED" });
    return;
  }
});

//route to add a new teacher (DB)
router.post("/add-new-teacher", (req, res) => {
  const { data } = req.body;
  console.log(data);

  const { id, firstName, lastName, email, phone } = data;
  const { address, city, password } = data;
  const { level, status, module, department, groups, sceance } = data;

  let groupString = JSON.stringify(groups);
  let sceanceString = JSON.stringify(sceance);

  //console.log(groupString, sceanceString, department);

  let addTeacherUserSQL = `INSERT INTO dizinv.user 
                          (user.id_user, user.firstName, user.lastName, user.email, user.address, user.city, user.password, user.phone, user.type) 
                          VALUES ('${id}', '${firstName}', '${lastName}', '${email}', '${address}', 
                          '${city}', '${password}', '${phone}', '${status}');`;

  let addTeacherTableSQL = `INSERT INTO dizinv.teacher
                           (teacher.id_user, teacher.department, teacher.groups, teacher.module, teacher.level, teacher.sceance, teacher.status) 
                           VALUES ('${id}', '${department}', '${groupString}' , '${module}', '${level}', '${sceanceString}', '${status}');`;

  if (data) {
    db.query(addTeacherUserSQL, (err, result) => {
      if (err) {
        console.log(err.message);
        res.send({ status: "FAILED" });
        return;
      }
      if (result) {
        db.query(addTeacherTableSQL, (err, result) => {
          if (err) {
            console.log(err);
            res.send({
              status: "FAILED",
            });
            return;
          }
          if (result) {
            res.send({ status: "SUCCESS" });
            return;
          }
        });
      }
    });
  } else {
    //if it reacheses here
    res.send({ status: "FAILED" });
    return;
  }
});

router.get("/schedule/:level", (req, res) => {
  const { level } = req.params;

  // console.log(level);

  let getSCheduleSQL = `SELECT schedules.schema
                       FROM dizinv.schedules 
                       where schedules.schedule_level = '${level}' ;`;

  if (level) {
    db.query(getSCheduleSQL, (err, result) => {
      if (err) {
        console.log(err);
        res.send({
          status: "FAILD",
          message: "something went wrong while geting the schedule",
        });
        return;
      }
      if (result) {
        let schema_obj = JSON.parse(result[0].schema);
        // console.log(schema_obj)
        //check if there is a schedule or not
        if (schema_obj) {
          res.send({ status: "SUCCESS", result: schema_obj });
        } else {
          res.send({ status: "SUCCESS", result: {} });
        }
        return;
      }
    });
  }
});

router.post("/schedule", (req, res) => {
  const { schema, level } = req.body;

  let schema_json = JSON.stringify(schema);
  // console.log(schema_json, level);

  let scheduleSQL = `UPDATE dizinv.schedules 
                     SET schedules.schema = '${schema_json}' 
                     WHERE (schedules.schedule_level = '${level}');`;

  if (schema_json) {
    db.query(scheduleSQL, (err, result) => {
      if (err) {
        console.log(err);
        res.send({ status: "FAILD" });
        return;
      }
      if (result) {
        res.send({ status: "SUCCESS" });
        return;
      }
    });
  }
});


//getting all the teachers by the admin (DB)
router.get("/get-teachers", (req, res) => {
  let getTeacherSQL = `SELECT * FROM dizinv.user, dizinv.teacher
                       where user.id_user = teacher.id_user`;

  db.query(getTeacherSQL, (err, result) => {
    if (err) {
      res.send({
        status: "FAILED",
        message: "something went wrong fetching data, Try again!!",
      });
      return;
    }
    if (result) {
      let response = result.map((data) => {
        const obj = {
          ...data,
          password: "********",
          id: data.id_user,
          groups: JSON.parse(data.groups),
          sceance: JSON.parse(data.sceance),
        };
        // Sconsole.log(obj);
        return obj;
      });
      //console.log(response)
      res.send({ status: "SUCCESS", result: response });
    }
  });
});

//get list of modules for adding teachers options
router.get("/modules/teacher-form-option", (req, res) => {
  let getModuleSQL = `SELECT * FROM dizinv.modules;`;

  db.query(getModuleSQL, (err, result) => {
    if (err) {
      res.send({
        status: "FAILED",
        message: "Something went wrong fetching Modules",
      });
      return;
    }
    if (result) {
      // console.log(result);
      const moduleList = result.map((module) => ({
        value: `${module.module_name}`,
        label: `${module.module_code} - ${module.module_name} (${module.department})`,
      }));
      res.send({ status: "SUCCESS", result: moduleList });
      return;
    }
  });
});

//api for modules>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//getting all modules (DB)
router.get("/modules", (req, res) => {
  let getModuleSQL = `SELECT * FROM dizinv.modules;`;

  db.query(getModuleSQL, (err, result) => {
    if (err) {
      res.send({
        status: "FAILED",
        message: "Something went wrong fetching Modules",
      });
      return;
    }
    if (result) {
      // console.log(result);
      res.send({ status: "SUCCESS", result: result });
      return;
    }
  });
});

//deleting modules (DB)
router.delete("/delete-module/:id", (req, res) => {
  const { id } = req.params;
  // console.log(id);

  let deletModuleSQL = `DELETE FROM dizinv.modules WHERE (id_modules = '${id}');`;

  if (id) {
    db.query(deletModuleSQL, (err, result) => {
      if (err) {
        res.send({
          status: "FAILED",
          message: "Something went wrong, Try again",
        });
        return;
      }
      if (result) {
        res.send({ status: "SUCCESS", message: "Module Deleted succefully!!" });
        return;
      }
    });
  }
});

//adding and edithing  modules  (DB)
router.post("/add-module", (req, res) => {
  const { module, mood } = req.body;
  //console.log(module, mood);

  const { id, code, name, department, level } = module;

  let addModuleSQL = `INSERT INTO dizinv.modules 
                      (id_modules, module_code, module_name, department, level) 
                      VALUES ('${id}', '${code}', '${name}', '${department}', '${level}');`;

  let UpdateModuleSQL = `UPDATE dizinv.modules
                         SET module_code = '${code}', module_name = '${name}',
                         department = '${department}', level = '${level}' 
                         WHERE (id_modules = '${id}');`;

  if (module && mood === "add") {
    db.query(addModuleSQL, (err, result) => {
      if (err) {
        res.send({
          status: "FAILED",
          message: "Something went wrong, Try again",
        });
        return;
      }
      if (result) {
        res.send({ status: "SUCCESS", message: "Module Added succefully!!" });
        return;
      }
    });
  }

  if (module && mood === "edit") {
    db.query(UpdateModuleSQL, (err, result) => {
      if (err) {
        res.send({
          status: "FAILED",
          message: "Something went wrong, Try again",
        });
        return;
      }
      if (result) {
        res.send({ status: "SUCCESS", message: "Module Edited succefully!!" });
        return;
      }
    });
  }
});

module.exports = router;
