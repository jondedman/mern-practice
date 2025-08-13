import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { signup } from "../../services/authentication";

export function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  ///
  const [fullname, setFullname] = useState("")
  ///
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
/// Handles validation - all fields must be required 
    if (!email.trim() || !password.trim() || !fullname.trim()) {
      alert("All fields are required.");
      return;
    }
///
    try {
      await signup(email, password, fullname);
      navigate("/login");
    } catch (err) {
      console.error(err);
      navigate("/signup");
    }
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

///
  function handleFullnameChange(event) {
    setFullname(event.target.value);
  }
  ///

  return (
    <>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="text"
          value={email}
          onChange={handleEmailChange}
        />
        <label htmlFor="password">Password:</label>
        <input
          placeholder="Password"
          id="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        {/* /// */}
        <label htmlFor="password">Full Name:</label>
        <input
          placeholder="Full name"
          id="fullname"
          type="text"
          value={fullname}
          onChange={handleFullnameChange}
        />
        {/* /// */}
        

        <input role="submit-button" id="submit" type="submit" value="Submit" />
      </form>
    </>
  );
}
