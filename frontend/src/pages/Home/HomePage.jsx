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


// import { Link } from "react-router-dom";

// import "./HomePage.css";

// export function HomePage() {
//   return (
//     <div className="home bg-[#632c3b] text-base-content h-screen w-full overflow-hidden flex flex-col">
//       <div className="flex justify-center items-center w-full h-full">
//         <div className="text-center">
//           <h1 className="text-white">Welcome to Dòómbook</h1>
//           <br />
//           <h2 className="text-white">The Anti-Social Network</h2>
//           <br />
//           <button className="btn bg-primary btn-wide">
//             <Link to="/signup" className="text-white">Sign Up</Link>
//           </button>
//           <br />
//           <br />
//           <button className="btn bg-primary btn-wide">
//             <Link to="/login" className="text-white">Log In</Link>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


// code changes below makes the whole button element a clickable link (rather than just the word) - Also makes the position of text and button responsive

import { Link } from "react-router-dom";
import "./HomePage.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export function HomePage() {
  return (

    <div className="home bg-base-content text-base-content min-h-screen w-full flex flex-col">
      <Header showNav={false}/>

      {/* Main Content */}
      <main className="flex flex-col justify-center items-center flex-1 text-center space-y-6">
        <h2 className="text-white text-6xl font-bold">Welcome to dòómbook</h2>
        <p className="text-white text-3xl font-semibold">The Anti-Social Network</p>

        <div className="flex flex-col items-center gap-4">
          <Link to="/signup" className="btn bg-primary btn-wide text-white">
            Sign Up
          </Link>
          <Link to="/login" className="btn bg-primary btn-wide text-white">
            Log In
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}