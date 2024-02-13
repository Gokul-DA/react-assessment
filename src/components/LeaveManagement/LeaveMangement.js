import React, { useState } from "react";
import LeaveForm from "./LeaveForm";
import { applyForLeave, getAllLeaveDetails } from "../../service/API";

function LeaveManagement(props) {
  const [showLeaveForm, setShowLeaveForm] = useState(false);

  const applyLeaveBtnHandler = () => {
    setShowLeaveForm(true);
  };

  const applyLeave = (leaveRequest) => {
    console.log("Leave REquest:", leaveRequest);
    applyForLeave(leaveRequest);
  };

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
