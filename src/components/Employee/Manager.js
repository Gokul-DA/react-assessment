import { useEffect, useState } from "react";
import { updateLeaveStatus, getAllAppliedLeave } from "../../service/API";
import { LEAVE_STATUS } from "../../constants/LEAVE_STATUS";

function Manager(props) {
  const [allAppliedLeave, setAppliedLeave] = useState([]);
  const [approveLeaves, setApproveLeaves] = useState(false);

  useEffect(() => {
    console.log("manager loaded");
    getAllAppliedLeave(setAppliedLeave);
  }, []);

  useEffect(() => {
    console.log("Applied leave:", allAppliedLeave);
  }, [allAppliedLeave]);

  let employee = props.employee;

  const btnHandler = () => {
    setApproveLeaves(true);
  };

  const approveHandler = (id) => {
    let selectedLeave = allAppliedLeave.find((leave) => leave.id === id);
    selectedLeave.status = LEAVE_STATUS.APPROVED;
    console.log("status changed: ", selectedLeave);
    updateLeaveStatus(selectedLeave);
    getAllAppliedLeave(setAppliedLeave);
  };
  const denyHandler = (id) => {
    let selectedLeave = allAppliedLeave.find((leave) => leave.id === id);
    selectedLeave.status = LEAVE_STATUS.DENIED;
    console.log("status changed: ", selectedLeave);
    updateLeaveStatus(selectedLeave);
    getAllAppliedLeave(setAppliedLeave);
  };
  return (
    <>
      <h1>Dashboard</h1>
      <h3>Name: {employee.name}</h3>
      <h3>Employee Type: {employee.type}</h3>
      {allAppliedLeave.length > 0 ? (
        <p style={{ color: "red" }}>
          You have leaves to Approve{" "}
          {!approveLeaves && <button onClick={btnHandler}> Click here</button>}
        </p>
      ) : (
        <p style={{ color: "red" }}>You have approved all leaves </p>
      )}

      {approveLeaves && allAppliedLeave.length > 0 && (
        <>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Reason For Leave</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>No of Days</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {allAppliedLeave.map((leave) => {
                return (
                  <tr>
                    <td>{leave.empId}</td>
                    <td>{leave.reason}</td>
                    <td>{leave.leaveStartDate}</td>
                    <td>{leave.leaveEndDate}</td>
                    <td>{leave.noOfDays}</td>
                    <td>{leave.status}</td>
                    <td>
                      <button onClick={() => approveHandler(leave.id)}>
                        Approve
                      </button>
                      /
                      <button onClick={() => denyHandler(leave.id)}>
                        Deny
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}

      {/* <button onClick={applyForLeaveHandler}>ApplyForLeave</button> */}
    </>
  );
}
export default Manager;
