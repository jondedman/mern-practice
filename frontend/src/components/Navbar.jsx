// import {
//   FaFacebook,
//   FaThumbsUp,
//   FaCommentAlt,
//   FaShare,
//   FaFacebookMessenger,
//   FaBell,
//   FaUserFriends,
//   FaUserPlus,
//   FaUserMinus,
//   FaSearch,
//   FaPhotoVideo,
//   FaCog,
//   FaSignOutAlt,
//   FaEllipsisH,
//   FaUsers,
//   FaHome
// } from "react-icons/fa";

// const Navbar = () => {

//     return (

// <div className="navbar bg-base-100 shadow-sm">
//   <div className="flex-1 flex gap-2">

//         <FaFacebook className="text-blue-600 text-4xl" />
 
  
//     {/* <a className="btn btn-ghost text-xl">daisyUI</a> */}
//   </div>
//   <div className="flex gap-2">

//     <div className="flex border rounded-3xl items-center p-2">
//         <FaSearch className="text-gray-600 text-xl" />
//         <input type="text" placeholder="Search" className="w-24 md:w-auto border-none" />
//     </div>

//     <div className="dropdown dropdown-end">
//       <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
//         <div className="w-10 rounded-full">
//           <img
//             alt="Tailwind CSS Navbar component"
//             src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
//         </div>
//       </div>
//       <ul
//         tabIndex={0}
//         className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
//         <li>
//           <a className="justify-between">
//             Profile
//             <span className="badge">New</span>
//           </a>
//         </li>
//         <li><a>Settings</a></li>
//         <li><a>Logout</a></li>
//       </ul>
//     </div>
//   </div>
// </div>

//     )
// };


// import { Link } from "react-router-dom";

// function NavBar() {
//   return (
//     <nav className="flex gap-4">
//       <Link to="/signup">Sign Up</Link>
//       <Link to="/login">Log In</Link>
//     </nav>
//   );
// }


// export default NavBar;

import { Link, useLocation } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";

function NavBar() {
  const location = useLocation();
  const path = location.pathname;

  // for the image to work for cloudinary we probably need to return profilePicture from backend or change logic
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("user", user);
  

  return (
    <nav className="flex gap-4 items-center">
      {user ? (
        <>
          <img
  src={user.avatar ? user.avatar : user.profilePicture}
            // alt={user.fullname}
            className="w-8 h-8 rounded-full"
          />
          <span className="text-white">{user.fullname}</span>
          {path === "/posts" && <LogoutButton />}
        </>
      ) : (
        <>
          {path !== "/signup" && path !== "/posts" && (
            <Link to="/signup" className="btn bg-primary-content text-white">
              Sign Up
            </Link>
          )}
          {path !== "/login" && path !== "/posts" && (
            <Link to="/login" className="btn bg-primary-content text-white">
              Log In
            </Link>
          )}
        </>
      )}
    </nav>
  );
}

export default NavBar;

