import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import axios from "axios";

//pages imported auth
import Login from "./pages/auth/Login";
import Forgot from "./pages/auth/Forgot";
import ResetPassword from "./pages/auth/ResetPassword";

//pages imported Admin
import Admin from "./pages/Admin";
import Dashboard from "./miniPages/admin/Dashboard";
import Teachers from "./miniPages/admin/Teachers";
import Profile from "./miniPages/admin/Profile";
import StudentListingSection from "./miniPages/admin/StudentListingSection";
import StudentListingSpeciality from "./miniPages/admin/StudentListingSpeciality";
import UserProfile from "./miniPages/admin/UserProfile";
import AdminModules from "./miniPages/admin/AdminModules";

//pages imported Teacher
import Teacher from "./pages/Teacher";
import TeacherHome from "./miniPages/teachers/TeacherHome";
import TeacherProfile from "./miniPages/teachers/TeacherProfile";
import AdminSchedules from "./miniPages/admin/AdminSchedules";

//pages imported chelf department
import ChelfDepartment from "./pages/ChelfDepartment";
import ChelfSession from "./miniPages/chelfDepartment/ChelfSession";
import ChelfDashBoard from "./miniPages/chelfDepartment/ChelfDashBoard";
import ChelfJustification from "./miniPages/chelfDepartment/ChelfJustification";
import TeacherSchedule from "./miniPages/teachers/TeacherSchedule";
import TeacherMainHome from "./miniPages/teachers/TeacherMainHome";
import TeacherManagePresence from "./miniPages/teachers/TeacherManagePresence";
import TeacherPresenceList from "./miniPages/teachers/TeacherPresenceList";

// student pages import
import Student from "./pages/Student";
import StudentHome from "./miniPages/students/StudentHome";
import StudentTimeTable from "./miniPages/students/StudentTimeTable";
import StudentProfile from "./miniPages/students/StudentProfile";
import TeacherExcludedStudents from "./miniPages/teachers/TeacherExcludedStudents";
import ChelfExcluded from "./miniPages/chelfDepartment/ChelfExcluded";
import StudentAbsenceJustification from "./miniPages/students/StudentAbsenceJustification";

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser({
      email: sessionStorage.getItem("email"),
      type: sessionStorage.getItem("type"),
      success: sessionStorage.getItem("success"),
    });
  }, []);

  return (
    <BrowserRouter>
      <>
        <Routes>
          {!user.success && (
            <>
              <Route
                exact
                path="/login"
                element={<Login setUser={setUser} />}
              />
              <Route exact path="/forgot" element={<Forgot />} />
              <Route
                exact
                path="/reset-password/:email/:token"
                element={<ResetPassword />}
              />
            </>
          )}
          {user.type === "admin" && (
            <Route path="/admin" element={<Admin />}>
              <Route exact path="dashboard" element={<Dashboard />} />
              <Route exact path="teacher" element={<Teachers />} />
              <Route exact path="profile" element={<Profile />} />
              <Route
                exact
                path="section/:id"
                element={<StudentListingSection />}
              />
              <Route
                exact
                path="speciality/:id"
                element={<StudentListingSpeciality />}
              />
              <Route exact path="user/:handler/:id" element={<UserProfile />} />
              <Route exact path="modules" element={<AdminModules />} />
              <Route exact path="schedules" element={<AdminSchedules />} />
            </Route>
          )}
          {user.type === "teacher" && (
            <Route path="/teacher" element={<Teacher />}>
              <Route exact path="" element={<TeacherMainHome />}>
                <Route exact path="home" element={<TeacherHome />} />
                <Route
                  exact
                  path="view-schedule"
                  element={<TeacherSchedule />}
                />
              </Route>
              <Route
                exact
                path="manage-presence"
                element={<TeacherManagePresence />}
              />
              <Route
                  exact
                  path="excluded-students"
                  element={<TeacherExcludedStudents />}
                />
              <Route
                exact
                path=":module/:sceance/:group"
                element={<TeacherPresenceList />}
              />
              <Route exact path="profile" element={<TeacherProfile />} />
            </Route>
          )}

          {user.type === "ChelfDepartment" && (
            <Route path="/teacher" element={<Teacher />}>
              <Route exact path="chelf" element={<ChelfDepartment />}>
                <Route exact path="dashboard" element={<ChelfDashBoard />} />
                <Route exact path="sessions" element={<ChelfSession />} />
                <Route exact path="excluded-students" element={<ChelfExcluded />} />
                <Route
                  exact
                  path="justification"
                  element={<ChelfJustification />}
                />
              </Route>
              <Route exact path="" element={<TeacherMainHome />}>
                <Route exact path="home" element={<TeacherHome />} />
                <Route
                  exact
                  path="view-schedule"
                  element={<TeacherSchedule />}
                />
                <Route
                  exact
                  path="manage-presence"
                  element={<TeacherManagePresence />}
                />
                <Route
                  exact
                  path="excluded-students"
                  element={<TeacherExcludedStudents />}
                />
                <Route
                  exact
                  path=":module/:sceance/:group"
                  element={<TeacherPresenceList />}
                />
              </Route>
              <Route exact path="profile" element={<TeacherProfile />} />
            </Route>
          )}
          {user.type === "student" && (
            <Route exact path="/student" element={<Student />} >
               <Route exact path="home" element={<StudentHome />} />
               <Route exact path="time-table" element={<StudentTimeTable />} />
               <Route exact path="profile" element={<StudentProfile />} />
               <Route exact path="absence-justification" element={<StudentAbsenceJustification />} />
            </Route>
          )}
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
