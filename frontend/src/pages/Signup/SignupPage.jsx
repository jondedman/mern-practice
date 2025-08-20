import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../../services/authentication";
import { InputField } from "../../components/InputField";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export function SignupPage() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [fullnameError, setFullnameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");

  const navigate = useNavigate();

  function validate() {
    let valid = true;
    setFullnameError("");
    setEmailError("");
    setPasswordError("");
    setGeneralError("");

    if (!fullname.trim()) {
      setFullnameError("Full name is required.");
      valid = false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Please enter a valid email address.");
      valid = false;
    }

    if (password.length < 6 || !/[!@$%&]/.test(password)) {
      setPasswordError("Password must be at least 6 characters and include one symbol: ! @ $ % &");
      valid = false;
    }

    return valid;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!validate()) return;

    try {
      await signup(fullname, email, password);
      navigate("/login");
    } catch (err) {
      console.error(err);
      setGeneralError("Signup failed. Please try again.");
    }
  }

  return (
    
    <div className="home bg-[#632c3b] text-base-content min-h-screen w-full flex flex-col">
      <Header showNav={true}/>
      
        <main className="flex-grow">
          <div className="bg-base-100 max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-4">dòómbook</h1>
            <h2 className="text-xl font-semibold mb-6">Signup</h2>

            {generalError && (
              <div className="text-red-500 mb-4">{generalError}</div>
            )}

            <form onSubmit={handleSubmit}>
              <InputField
                id="fullname"
                label="Full Name"
                value={fullname}
                onChange={e => setFullname(e.target.value)}
                placeholder="Full Name"
                error={fullnameError}
              />

              <InputField
                id="email"
                label="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email"
                error={emailError}
              />

              <InputField
                id="password"
                label="Password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
                error={passwordError}
              />

              <button type="submit" className="btn bg-primary btn-wide text-white">
                Submit
              </button>

            </form>
          </div>
        </main>
        
    <Footer />
    </div>  
  );
}
