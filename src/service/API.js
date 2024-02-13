import { LEAVE_STATUS } from "../constants/LEAVE_STATUS";
import crudAPI from "./crudAPI";

export const getEmployeeDetails = () => {
  crudAPI
    .get("/employees")
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      console.log("Error in /employees: ", err);
    });
};

export const getEmployeeById = (id, setEmployee) => {
  crudAPI
    .get("/employees?id=" + id)
    .then((res) => {
      console.log("getEmployeeById: ", res.data[0]);
      setEmployee(res.data[0]);
      // return res.data;
    })
    .catch((err) => {
      console.log("Error in /employees: ", err);
    });
};

export const updateLeaveCount = (updateLeave) => {
  crudAPI
    .put("/employees/" + updateLeave.id, updateLeave)
    .then((res) =>
      console.log("Updated the leave balance for ", updateLeave.id)
    )
    .catch((err) => console.log("Error while updating leave balance: ", err));
};

export const applyForLeave = (leaveRequest) => {
  crudAPI.post("/leaveDetails", leaveRequest);
};

export const getAllLeaveDetails = async () => {
  const response = await crudAPI.get("/leaveDetails");
  console.log("all leave details: ", response.data);
  return response.data;
};

export const getAllAppliedLeave = (setAppliedLeave) => {
  const response = crudAPI.get("/leaveDetails").then((res) => {
    let appliedLeave = res.data.filter(
      (leave) => leave.status === LEAVE_STATUS.APPLIED
    );
    setAppliedLeave(appliedLeave);
  });
  console.log("leave applied details: ", response.data);
};

export const getAllLeaveDetails1 = (setAppliedLeave) => {
  const response = crudAPI.get("/leaveDetails").then((res) => {
    setAppliedLeave(res.data);
  });
  console.log("leave details 1: ", response.data);
};

export const updateLeaveStatus = (leaveObject) => {
  crudAPI
    .put("/leaveDetails/" + leaveObject.id, leaveObject)
    .then((res) => console.log("Updated the leave status for ", leaveObject.id))
    .catch((err) => console.log("Error while updating leave status: ", err));
};
