// import { Link } from "react-router-dom";

// import "./HomePage.css";

// export function HomePage() {
//   return (
//   <div className="home bg-[#632c3b] text-base-content min-h-screen w-full">
//    <div class="flex justify-center items-center h-screen">
//     <div>
//       <h1 className="text-white">Welcome to Dòómbook</h1>
//       <br></br>
//       <h2 className="text-white">The Anti-Social Network</h2>
//       <br></br>
//       <button className="btn bg-primary btn-wide">
//         <Link to="/signup" className="text-white">Sign Up</Link>
//       </button>
//       <br></br>
//       <br></br>
//       <button className="btn bg-primary btn-wide">
//         <Link to="/login" className="text-white">Log In</Link>
//       </button>
//     </div>
//    </div>
//   </div>
// );
// }


import { Link } from "react-router-dom";

import "./HomePage.css";

export function HomePage() {
  return (
    <div className="home bg-[#632c3b] text-base-content h-screen w-full overflow-hidden flex flex-col">
      <div className="flex justify-center items-center w-full h-full">
        <div className="text-center">
          <h1 className="text-white">Welcome to Dòómbook</h1>
          <br />
          <h2 className="text-white">The Anti-Social Network</h2>
          <br />
          <button className="btn bg-primary btn-wide">
            <Link to="/signup" className="text-white">Sign Up</Link>
          </button>
          <br />
          <br />
          <button className="btn bg-primary btn-wide">
            <Link to="/login" className="text-white">Log In</Link>
          </button>
        </div>
      </div>
    </div>
  );
}