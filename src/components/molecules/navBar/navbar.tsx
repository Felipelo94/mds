import { useNavbarContext } from "../../../context/navbarContext";
import "./navbar.scss";
import { FaSearch } from "react-icons/fa";

export const Navbar = () => {
  const { setValue } = useNavbarContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className="navbar">
      <img alt="app-logo" src="/icon.svg" className="navbar__image" />
      <div className="navbar__search">
        <FaSearch />
        <input
          type="text"
          placeholder="You're looking for something?"
          onChange={handleChange}
          className="navbar__input"
        />
      </div>
    </div>
  );
};
