import React, { useEffect, useState } from "react";
import LeaveForm from "./LeaveForm";
import {
  applyForLeave,
  getAllLeaveDetails,
  getEmployeeById,
  updateLeaveCount,
} from "../../service/API";

function LeaveManagement(props) {
  const [showLeaveForm, setShowLeaveForm] = useState(false);
  const [employee, setEmployee] = useState();
  const [leaveRequest, setLeaveRequest] = useState([]);

  const applyLeaveBtnHandler = () => {
    setShowLeaveForm(true);
  };

  const applyLeave = (leaveRequest) => {
    console.log("inside management apply leave");
    console.log("Leave Request:", leaveRequest);
    getEmployeeById(leaveRequest.empId, setEmployee);
    applyForLeave(leaveRequest);
    // setLeaveRequest(leaveRequest);
  };

  useEffect(() => {
    console.log("inside useEffect");
    if (employee !== undefined) {
      console.log("Triggerd update count");
      let updateLeaveBalance = [...employee];
      updateLeaveBalance.leaveBalance =
        employee.leaveBalance - leaveRequest.noOfDays;
      console.log("updateLeaveBalance: ", updateLeaveBalance);
      updateLeaveCount(updateLeaveBalance);
    }
  }, [employee]);

  let emp = props.employee;
  return (
    <>
      <h1>Leave Management System</h1>
      <h3>Employee name: {emp.name} </h3>
      <h3>Available Leaves: {emp.leaveBalance} </h3>
      <div>
        {!showLeaveForm && (
          <button onClick={applyLeaveBtnHandler}> Apply Leave</button>
        )}
      </div>
      <div>
        {showLeaveForm && <LeaveForm emp={emp} apply={applyLeave}></LeaveForm>}
      </div>
    </>
  );
}

export default LeaveManagement;
