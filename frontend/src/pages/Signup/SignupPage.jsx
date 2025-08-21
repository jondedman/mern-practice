// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// import { signup } from "../../services/authentication";

// export function SignupPage() {
//   const [fullname, setFullname] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   async function handleSubmit(event) {
//     event.preventDefault();
//     setError("");
//     try {
//       await signup(fullname, email, password);
//       navigate("/login");
//     } catch (err) {
//       console.error(err);
//       setError("Invalid email or password. Please try again.");
//     }
//   }

//   function handleFullnameChange(event) {
//     setFullname(event.target.value);
//   }

//   function handleEmailChange(event) {
//     setEmail(event.target.value);
//   }

//   function handlePasswordChange(event) {
//     setPassword(event.target.value);
//   }

//   return (
//     <>
//       <h2>Signup</h2>
//       {error && <div style={{ color: "red" }}>{error}</div>} {/* Show error */}
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="fullname">Full Name:</label>
//         <input
//           placeholder="Full Name"
//           id="fullname"
//           type="text"
//           value={fullname}
//           onChange={handleFullnameChange}
//         />
//         <label htmlFor="email">Email:</label>
//         <input
//           placeholder="Email"
//           id="email"
//           type="text"
//           value={email}
//           onChange={handleEmailChange}
//         />
//         <label htmlFor="password">Password:</label>
//         <input
//           placeholder="Password"
//           id="password"
//           type="password"
//           value={password}
//           onChange={handlePasswordChange}
//         />
//         <input role="submit-button" id="submit" type="submit" value="Submit" />
//       </form>
//     </>
//   );
// }



// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { signup } from "../../services/authentication";

// export function SignupPage() {
//   const [fullname, setFullname] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [fullnameError, setFullnameError] = useState("");
//   const [emailError, setEmailError] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   const [generalError, setGeneralError] = useState("");
//   const navigate = useNavigate();

//   function validate() {
//     let valid = true;
//     setFullnameError("");
//     setEmailError("");
//     setPasswordError("");
//     setGeneralError("");

//     if (!fullname.trim()) {
//       setFullnameError("Full name is required.");
//       valid = false;
//     }

//     // Simple email regex for demonstration
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//       setEmailError("Please enter a valid email address.");
//       valid = false;
//     }

//     // Password: min 6 chars, at least one symbol ! @ $ % &
//     if (
//       password.length < 6 ||
//       !/[!@$%&]/.test(password)
//     ) {
//       setPasswordError(
//         "Password must be at least 6 characters and include one symbol: ! @ $ % &"
//       );
//       valid = false;
//     }

//     return valid;
//   }

//   async function handleSubmit(event) {
//     event.preventDefault();
//     if (!validate()) return;
//     try {
//       await signup(fullname, email, password);
//       navigate("/login");
//     } catch (err) {
//       console.error(err);
//       setGeneralError("Signup failed. Please try again.");
//     }
//   }

//   return (
//     <>
//       <h1>Dòómbook</h1>
//       <h2>Signup</h2>
//       {generalError && <div style={{ color: "red" }}>{generalError}</div>}
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="fullname">Full Name:</label>
//         <input
//           placeholder="Full Name"
//           id="fullname"
//           type="text"
//           value={fullname}
//           onChange={e => setFullname(e.target.value)}
//         />
//         {fullnameError && <div style={{ color: "red" }}>{fullnameError}</div>}

//         <label htmlFor="email">Email:</label>
//         <input
//           placeholder="Email"
//           id="email"
//           type="text"
//           value={email}
//           onChange={e => setEmail(e.target.value)}
//         />
//         {emailError && <div style={{ color: "red" }}>{emailError}</div>}

//         <label htmlFor="password">Password:</label>
//         <input
//           placeholder="Password"
//           id="password"
//           type="password"
//           value={password}
//           onChange={e => setPassword(e.target.value)}
//         />
//         {passwordError && <div style={{ color: "red" }}>{passwordError}</div>}

//         <input role="submit-button" id="submit" type="submit" value="Submit" />
//       </form>
//     </>
//   );
// }



import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../../services/authentication";
import { InputField } from "../../components/InputField";
import UploadWidget from "../../components/UploadWidget";
import dLogo from "../../assets/d.png";

export function SignupPage() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [fullnameError, setFullnameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [imageUrl, setImageUrl] = useState("");


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
      await signup(fullname, email, password, imageUrl);
      navigate("/login");
    } catch (err) {
      console.error(err);
      setGeneralError("Signup failed. Please try again.");
    }
  }

  return (
    
    <div className="home bg-[#632c3b] text-base-content min-h-screen w-full flex flex-col">
      
      {/* Header */}
      <header className="bg-neutral text-white py-4 px-6 flex justify-between items-center">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <img src={dLogo} alt="Logo" className="w-8 h-8" />
            dòómbook
          </h1>
          <nav className="flex gap-4">
            {/* Add navigation links here if needed */}
          </nav>
      </header>
      
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

              <UploadWidget setImageUrl={setImageUrl} />
              {imageUrl && (
  <div className="mb-4">
    <img src={imageUrl} alt="Profile preview" className="w-24 h-24 rounded-full object-cover" />
  </div>
)}


              <button type="submit" className="btn bg-primary btn-wide text-white">
                Submit
              </button>

            </form>
          </div>
        </main>

      <footer className="bg-neutral text-white py-4 text-center">
        <p>MERN 'n' BURN {new Date().getFullYear()} © All rights reserved.</p>
      </footer>

    </div>  
  );
}
