import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import { login } from "../../services/authentication";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setError(""); 

    try {
      const token = await login(email, password);
      localStorage.setItem("token", token);
      navigate("/posts");
      console.log("JWT token:", token);

    } catch (err) {
      console.error(err);
      setError("Incorrect email or password");    
    }
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

 
  return (
    <div className="home bg-[#632c3b] text-base-content min-h-screen w-full flex flex-col">
      <Header showNav={true} />

      <main className="flex flex-col justify-center items-center flex-1 text-center space-y-6">
      <h2 className="text-white text-6xl font-bold">dòómbook</h2>
      <p className="text-white text-3xl font-semibold">Login</p>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm mx-auto">

        <div className="flex flex-col">
        <label htmlFor="email" className="text-white">Email:</label>
          <input
            id="email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            className="p-1 rounded"
          />
        </div>

        <div className="flex flex-col">
        <label htmlFor="password" className="text-white">Password:</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            className="p-1 rounded"
          />
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="flex justify-center">
        <input role="submit-button" id="submit" type="submit" value="Submit" className="btn bg-primary text-white flex justify-center"/>
      </div>

        </form>
      </main>

      <Footer />
    </div>
  );
}
