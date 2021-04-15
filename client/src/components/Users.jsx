import { useState } from "react";
import axios from "axios";

function Users() {
  const [users, setUsers] = useState([]);

  const getUsers = () => {
    axios
      .get("/api/users/")
      .then((response) => {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };

  return (
    <div className="Users">
      <h1>Users Form</h1>
      <button onClick={getUsers}>get users</button>
      {}
    </div>
  );
}

export default Users;
