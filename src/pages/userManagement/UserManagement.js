import React from "react";
import { Form } from "react-router-dom";
import BatchCreation from "../../components/userManagement/BatchCreation";

function UserManagement() {
  return (
    <Form>
      <BatchCreation />
    </Form>
  );
}

export default UserManagement;
