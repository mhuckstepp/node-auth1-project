import { useState } from "react";
import axios from "axios";

function url(path) {
  return process.env.NODE_ENV === "development"
    ? `http://localhost:5000${path}`
    : path;
}

function Register() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const changeHandler = (e) => {
    const { value, name } = e.target;
    setForm({ ...form, [name]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post(url("/api/auth/register"), form)
      .then((response) => {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };

  return (
    <div className="Register">
      <h1>Register Form</h1>

      <form onSubmit={submitHandler}>
        <label>
          {" "}
          username
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={changeHandler}
          />
        </label>
        <label>
          Password
          <input
            type="text"
            name="password"
            value={form.password}
            onChange={changeHandler}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Register;
