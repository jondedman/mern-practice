import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();

  function logOut() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return <button 
            className="btn bg-[#1A77F2] text-white border-[#005fd8]" 
            onClick={logOut}>
              Log out
        </button>;
}

export default LogoutButton;
