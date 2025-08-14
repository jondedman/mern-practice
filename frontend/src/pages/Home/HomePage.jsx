import { Link } from "react-router-dom";

import "./HomePage.css";

export function HomePage() {
  return (
  <div className="home">
   <div class="flex justify-center items-center h-screen">
    <div>
      <h1>Welcome to Dòómbook</h1>
      <br></br>
      <h2>The Anti-Social Network</h2>
      <br></br>
      <button className="btn bg-secondary">
        <Link to="/signup" className="text-white">Sign Up</Link>
      </button>
      <br></br>
      <br></br>
      <button className="btn bg-secondary">
        <Link to="/login" className="text-white">Log In</Link>
      </button>
    </div>
   </div>
  </div>
);
}

