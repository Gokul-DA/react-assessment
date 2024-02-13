import React, { useEffect, useState } from "react";
import { LEAVE_STATUS } from "../../constants/LEAVE_STATUS";
import { getAllLeaveDetails } from "../../service/API";
import { useNavigate } from "react-router-dom";

function LeaveForm(props) {
  const navigate = useNavigate();
  const [reason, setReason] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");

  const reasonChange = (e) => {
    setReason(e.target.value);
  };
  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
    // Clear the end date if it's before the selected start date
    if (new Date(e.target.value) > new Date(endDate)) {
      setEndDate("");
    }
  };

  useEffect(() => {
    setError("");
  }, [reason, startDate, endDate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reason) {
      setError("Reason cannot be empty");
      return;
    }
    if (!startDate && !endDate) {
      setError("Please select start and end dates");
      return;
    }
    let numberOfDays = calculateDays();
    if (numberOfDays > props.emp.leaveBalance) {
      setError("You don't have enough leave to apply");
    } else {
      let leaveRequest = {
        // id: getNextLeaveId(),
        empId: props.emp.id,
        leaveStartDate: new Date(startDate),
        leaveEndDate: new Date(endDate),
        noOfDays: numberOfDays,
        reason: reason,
        status: LEAVE_STATUS.APPLIED,
      };
      props.apply(leaveRequest);
      navigate("/dashboard");
    }
  };

  const calculateDays = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const differenceInTime = end.getTime() - start.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    console.log("differenceInDays: ", differenceInDays);
    return differenceInDays;
  };

  const getNextLeaveId = () => {
    const maxId = 0;
    getAllLeaveDetails()
      .then((data) => {
        console.log("Fetched leave details: ", data);
        maxId = data.reduce(
          (max, leave) => (leave.id > max ? leave.id : max),
          -Infinity
        );
      })
      .catch((error) => {
        console.error("Error fetching leave details: ", error);
      });

    return +maxId + 1;
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Reason for Leave:</label>
      <input type="text" id="reason" value={reason} onChange={reasonChange} />
      <br />
      <label>Start Date:</label>
      <input type="date" value={startDate} onChange={handleStartDateChange} />
      <br />
      <label>End Date :</label>
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        min={startDate} // Set the minimum allowed date to the selected start date
      />
      <br />
      {error && <div style={{ color: "red" }}>{error}</div>}
      <button type="submit">Apply Leave</button>
    </form>
  );
}

export default LeaveForm;
