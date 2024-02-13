import React from "react";
import { useState } from "react";
import Employee from "./Employee";
import Manager from "./Manager";

function Dashboard(props) {
  console.log("props in Employee", props);

  return (
    <div>
      {props.employee.type === "Manager" && (
        <Manager employee={props.employee}></Manager>
      )}
      {props.employee.type === "Employee" && (
        <Employee employee={props.employee}></Employee>
      )}
    </div>
  );
}

export default Dashboard;
