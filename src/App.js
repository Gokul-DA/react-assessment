import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import CommonEmployee from "./components/Employee/Dashboard";
import Login from "./components/Login/Login";
import React, { useState } from "react";
import LeaveManagement from "./components/LeaveManagement/LeaveMangement";
import Employee from "./components/Employee/Employee";
import Dashboard from "./components/Employee/Dashboard";
import Manager from "./components/Employee/Manager";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function App() {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({});

  console.log("employee setted: ", employee);
  return (
    <>
      <Routes>
        {/* <Route path='/' element={<>{navigate('/login')}</>}></Route> */}
        <Route
          path="/login"
          element={<Login navigate={navigate} setEmployee={setEmployee} />}
        ></Route>
        <Route
          path="/dashboard"
          element={<Dashboard employee={employee} navigate={navigate} />}
        ></Route>
        {/* <Route
          path="/employee"
          element={<Employee employee={employee} navigate={navigate} />}
        ></Route>
        <Route
          path="/manager"
          element={<Manager employee={employee} navigate={navigate} />}
        ></Route> */}
        <Route
          path="/lms"
          element={<LeaveManagement employee={employee} />}
        ></Route>
        <Route
          path="*"
          element={
            <>
              <h1>Page Not Found</h1>
            </>
          }
        ></Route>
      </Routes>
    </>
  );
}

export default App;
