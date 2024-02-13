import React, { useState } from "react";
import { useEffect } from "react";
import { getEmployeeById } from "../../service/API";

function Login(props) {
  const [employee, setEmployee] = useState([]);
  const [password, setPassword] = useState();
  const submitHandler = (event) => {
    event.preventDefault();
    let userId = event.target.userId.value;
    setPassword(event.target.password.value);
    getEmployeeById(userId, setEmployee);
  };

  useEffect(() => {
    console.log("UseEffect triggered: ", employee);
    setEmpDataAndRedirect();
  }, [employee]);

  const setEmpDataAndRedirect = () => {
    if (password !== undefined)
      if (password === employee.password) {
        props.setEmployee(employee);
        props.navigate("/dashboard");
        console.log("navigated");
      }
  };

  return (
    <div>
      <h1 className="display-1">Login Page</h1>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label
            className="label label-default"
            id="userIdLabel"
            htmlFor="userId"
          >
            Employee Id:
          </label>
          <input className="form-control" type="text" id="userId" />
        </div>
        <div className="form-group">
          <label id="passwordLabel" htmlFor="password">
            Password
          </label>
          <input className="form-control" type="password" id="password" />
        </div>
        <div className="form-group">
          <button className="btn btn-primary" type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
