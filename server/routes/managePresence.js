const express = require("express");

const router = express.Router();

//database connection
const db = require("../ConnectDB");

//get the list of dates in the database
router.get("/get-dates/:module/:sceance/:group", (req, res) => {
  const { module, sceance, group } = req.params;
  //console.log(module, sceance, group);

  let sql = `SELECT date, id_session FROM sessions WHERE sceance = ? AND student_group = ? AND moduleName = ? `;

  db.query(sql, [`${sceance}`, `${group}`, `${module}`], (err, result) => {
    if (err) {
      res.send({ status: "FAILED", message: err.sqlMessage });
    }
    if (result.length > 0) {
      const results = result.map((date) => {
        // console.log(date)
        const convert = new Date(date.date).toLocaleDateString();
        return { value: convert, label: convert, id_session: date.id_session };
      });
      // console.log(results)
      res.send({ status: "SUCCESS", results: results });
      return;
    } else {
      res.send({ status: "SUCCESS", results: result });
      return;
    }
  });
});

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//serious note: you need to find a way to route the session to the get list of presence

//get the list of presence with the chosen date  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
router.post("/get-list-presence", (req, res) => {
  const { date, group, module, sceance, level, department } = req.body;
  console.log(date, group, module, sceance, department);

  if (date) {
    const dateSplit = date.split("/");
    const converted = dateSplit[2] + "-" + dateSplit[1] + "-" + dateSplit[0];
    //console.log(converted);

    let mainSql = `SELECT distinct firstName, lastName, id_user, students.student_group, students.level, null as id_absence, sessions.id_session 
    FROM dizinv.students, dizinv.user, dizinv.sessions  
    where user.id_user = students.inscription
    And sessions.date = '${converted}'
    AND sessions.student_group = '${group}'
    AND sessions.sceance = '${sceance}' 
    And sessions.level = '${level}'
    And sessions.moduleName = '${module}'
    And students.department = '${department}'
    And students.student_group = '${group}' 
    And students.level = '${level}'
    And students.inscription NOT IN (select inscription_no from dizinv.absence, dizinv.sessions 
                                      where sessions.id_session = absence.id_session 
                                      And sessions.date = '${converted}'
                                      And sessions.department ='${department}'
                                      AND sessions.student_group = '${group}'
                                      AND sessions.sceance = '${sceance}'
                                      And sessions.level = '${level}'
                                      And sessions.moduleName = '${module}')
    UNION
    select distinct firstName, lastName, inscription_no, student_group, level, absence.id_absence, absence.id_session
    from dizinv.absence, dizinv.sessions, dizinv.user
    where sessions.id_session = absence.id_session 
    And user.id_user = absence.inscription_no  
    And sessions.date = '${converted}'
    AND sessions.student_group = '${group}'
    And sessions.department ='${department}'
    AND sessions.sceance = '${sceance}'
    And sessions.moduleName = '${module}'
    ;  `;

    //list of absent and present students
    db.query(mainSql, (err, result) => {
      if (err) {
        res.send({
          status: "FAILED",
          message: "Something went wrong while fetching data, try again!!",
        });
        return;
      }

      if (result.length > 0) {
        const main = result.map((data) => {
          return { ...data, date: date, sceance: sceance };
        });
        //  console.log(main);
        res.send({ status: "SUCCESS", results: main });
        return;
      } else {
        res.send({ status: "SUCCESS", results: result });
        return;
      }
    });
  }
});

//Update a presentiel status >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
router.post("/update-presentiel", (req, res) => {
  const { id_absence, id_session, id_user, newID } = req.body.values;

  //console.log(id_absence, id_session, id_user, newID);

  let AbsentSQL = `INSERT INTO dizinv.absence (id_absence, id_session, inscription_no) VALUES (?, ?, ?); `;
  let PresentSQL = `DELETE FROM dizinv.absence WHERE (id_absence = '${id_absence}');`;

  if (id_absence === null) {
    // add to absence table
    db.query(
      AbsentSQL,
      [`${newID}`, `${id_session}`, `${id_user}`],
      (err, result) => {
        if (err) {
          res.send({
            status: "FAILED",
            message: "Something went wrong, try again!!",
          });
          //console.log({ status: "FAILED", message: err.sqlMessage });
        }
        if (result) {
          // console.log(result);
          res.send({
            status: "SUCCESS",
          });
          return;
        }
      }
    );
  } else {
    //delet from absence table
    db.query(PresentSQL, (err, result) => {
      if (err) {
        res.send({
          status: "FAILED",
          message: "Something went wrong, try again!!",
        });
        //console.log({ status: "FAILED", message: err.sqlMessage });
      }
      if (result) {
        // console.log(result);
        res.send({
          status: "SUCCESS",
        });
        return;
      }
    });
  }
});

//Create a new session in the database  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
router.post("/create-session", (req, res) => {
  const { SessionID, module, group, sceance, level } = req.body.values;
  const { department, date, timeStamp, sectionSpeciality } = req.body.values;

  //console.log(SessionID, module, group, sceance, level);
  //console.log(department, date, timeStamp, sectionSpeciality);

  /// check if section or speciality exits
  if (sectionSpeciality === undefined) {
    res.send({ status: "FAILED", message: "Provid Section or Speciality!!" });
    return;
  }

  const dateSplit = date.split("/");
  const converted = dateSplit[2] + "-" + dateSplit[1] + "-" + dateSplit[0];
  //console.log(converted);

  let sessionSQL = `INSERT INTO dizinv.sessions     
                   (id_session, moduleName, student_group, sceance, timestamp, date, section_speciality, level, department) 
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`;

  // add to absence table
  db.query(
    sessionSQL,
    [
      `${SessionID}`,
      `${module}`,
      `${group}`,
      `${sceance}`,
      `${timeStamp}`,
      `${converted}`,
      `${sectionSpeciality}`,
      `${level}`,
      `${department}`,
    ],
    (err, result) => {
      if (err) {
        res.send({
          status: "FAILED",
          message: "Something went wrong, try again!!",
        });
        //console.log({ status: "FAILED", message: err.sqlMessage });
      }
      if (result) {
        // console.log(result);
        res.send({
          status: "SUCCESS",
          message: {
            SessionID,
            date,
            group,
            sceance,
            level,
            sectionSpeciality,
          },
        });
        return;
      }
    }
  );
});

//deleting session and all the absence of that session in the database  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
router.get("/delete-session/:id", (req, res) => {
  const { id } = req.params;
  //console.log(id);

  let deleteAabsenceSql = `DELETE FROM dizinv.absence WHERE (id_session = '${id}')`;
  let deleteSessionSql = `DELETE FROM dizinv.sessions WHERE (id_session = '${id}')`;

  db.query(deleteAabsenceSql, (err, result) => {
    if (err) {
      // res.send({
      //   status: "FAILED",
      //   message: "Something went wrong, try again!!",
      // });
      console.log({ status: "FAILED", message: err.sqlMessage });
      return;
    }
    if (result) {
      db.query(deleteSessionSql, (err, result) => {
        if (err) {
          // res.send({
          //   status: "FAILED",
          //   message: "Something went wrong, try again!!",
          // });
          console.log({ status: "FAILED", message: err.sqlMessage });
          return;
        }

        if (result) {
          // console.log(result);
          res.send({
            status: "SUCCESS",
            message: "session deleted successfully",
          });
          return;
        }
      });
    }
  });
});

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// working on the list of excluded students here

//finding excluded student for the teacher of a module (DB)
router.get("/excluded-students/:module/:group", (req, res) => {
  const { module, group } = req.params;
  //console.log(module, group);

  //converting the groups into an array
  const queryGroups = group.split(",");
  //console.log(queryGroups);

  let excludedSQL = `select student_group, moduleName, inscription_no, id_user, department, group_concat( concat_ws(' / ', sceance, date) separator ' , ') dates, level, firstName, lastName 
                     from dizinv.sessions, dizinv.absence, dizinv.user
                     where sessions.id_session = absence.id_session
                     And user.id_user = absence.inscription_no
                     and sessions.moduleName = '${module}'
                     and sessions.student_group in ('${queryGroups[0]}', '${queryGroups[1]}', '${queryGroups[2]}', '${queryGroups[3]}')
                     And absence.isJustified IS NULL OR absence.isJustified = ''
                     group by inscription_no
                     having count(*) >= 3 ;`;

  db.query(excludedSQL, (err, result) => {
    if (err) {
      res.send({ status: "FAILED", message: err.sqlMessage });
    }
    if (result) {
      const results = result.map((data) => {
        // console.log(data);
        return { ...data };
      });
      // console.log(results);
      res.send({ status: "SUCCESS", results: results });
      return;
    } else {
      res.send({ status: "SUCCESS", results: result });
      return;
    }
  });
});

//finding excluded student for the chelf department (DB)
router.get("/chelf-excluded/:module", (req, res) => {
  const { module } = req.params;
  console.log(module);

  let excludedSQL = `select student_group, moduleName, inscription_no, id_user, department, group_concat( concat_ws(' / ', sceance, date) separator ' , ') dates, level, firstName, lastName 
                     from dizinv.sessions, dizinv.absence, dizinv.user
                     where sessions.id_session = absence.id_session
                     And user.id_user = absence.inscription_no
                     and sessions.moduleName = '${module}'
                     And absence.isJustified IS NULL OR absence.isJustified = ''
                     group by inscription_no
                     having count(*) >= 3 ;`;

  db.query(excludedSQL, (err, result) => {
    if (err) {
      res.send({ status: "FAILED", message: err.sqlMessage });
    }
    if (result) {
      const results = result.map((data) => {
        //console.log(data);
        return { ...data };
      });
      // console.log(results);
      res.send({ status: "SUCCESS", results: results });
      return;
    } else {
      res.send({ status: "SUCCESS", results: result });
      return;
    }
  });
});

//get the list of module of a particular department (DB)
router.get("/modules/:department", (req, res) => {
  const { department } = req.params;
  console.log(department);

  let getModuleSQL = `SELECT * FROM dizinv.modules where department = '${department}';`;

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
      const response = result.map((module) => ({
        value: module.module_name,
        label: module.module_name,
      }));
      res.send({ status: "SUCCESS", results: response });
      return;
    }
  });
});

module.exports = router;
