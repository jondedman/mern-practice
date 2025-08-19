import dLogo from "../assets/d.png";
import NavBar from "../components/NavBar";

function Header() {
  return (
    <header className="bg-neutral text-white py-4 px-6 flex justify-between items-center">
      <h1 className="text-xl font-bold flex items-center gap-2">
        <img src={dLogo} alt="Logo" className="w-8 h-8" />
        dòómbook
      </h1>

      <NavBar />
    </header>
  );
}

export default Header;