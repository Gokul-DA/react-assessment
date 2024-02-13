import React, { useState } from "react";
import { useEffect, useDispatch } from "react";
import { getEmployeeById, getEmployeeDetails } from "../../service/API";

function Login(props) {
  const [employee, setEmployee] = useState();
  const [isEmpValid, setisEmpValid] = useState(Boolean);

  const submitHandler = (event) => {
    event.preventDefault();
    let userId = event.target.userId.value;
    let password = event.target.password.value;
    getEmployeeById(userId, setEmployee);
  };

  useEffect(() => {
    console.log("UseEffect triggered: ", employee);
    setEmpDataAndRedirect();
  }, [employee]);

  const setEmpDataAndRedirect = () => {
    if (employee != undefined) {
      props.setEmployee(employee);
      props.navigate("/dashboard");
      console.log("navigated");
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={submitHandler}>
        <label id="userIdLabel" htmlFor="userId">
          Employee Id:
        </label>
        <input type="text" id="userId" />
        <br></br>
        <label id="passwordLabel" htmlFor="password">
          Password
        </label>
        <input type="password" id="password" />

        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
