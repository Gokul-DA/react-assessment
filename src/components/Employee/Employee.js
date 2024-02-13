import { useEffect, useState } from "react";
import { getAllAppliedLeave, getAllLeaveDetails1 } from "../../service/API";
import { useNavigate } from "react-router-dom";

function Employee(props) {
  const navigate = useNavigate();
  const [allAppliedLeave, setAppliedLeave] = useState([]);
  const [appliedLeaveById, setAppliedLeaveById] = useState([]);
  let employee = props.employee;

  const applyForLeaveHandler = () => {
    navigate("/lms");
  };

  useEffect(() => {
    getAllLeaveDetails1(setAppliedLeave);
  }, []);

  useEffect(() => {
    let allLeavesById = allAppliedLeave.filter(
      (leave) => leave.empId === employee.id
    );
    console.log("leave by id : ", allLeavesById);
    setAppliedLeaveById(allLeavesById);
  }, [allAppliedLeave]);
  return (
    <>
      <h1 className="h1"> DashBoard</h1>
      <h3 className="h3">Name: {employee.name}</h3>
      <h3 className="h3">Employee Type: {employee.type}</h3>
      <button className="btn btn-primary" onClick={applyForLeaveHandler}>
        ApplyForLeave
      </button>

      <h2 className="display-2">Leave Details</h2>
      {appliedLeaveById.length > 0 && (
        <>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Reason For Leave</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>No of Days</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {appliedLeaveById.map((leave) => {
                return (
                  <tr>
                    <td>{leave.reason}</td>
                    <td>{leave.leaveStartDate}</td>
                    <td>{leave.leaveEndDate}</td>
                    <td>{leave.noOfDays}</td>
                    <td>{leave.status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}

export default Employee;
