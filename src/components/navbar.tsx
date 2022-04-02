import { FaGithub, FaCaretDown, FaSearch, FaRegStar } from "react-icons/fa";
import { BsCircleHalf, BsGridFill, BsPlusLg } from "react-icons/bs";

import "../styles/navbar.scss";

export function Navbar() {
  return (
    <nav className="nav">
      <FaGithub className="icons" size="24px" />
      <p>Github Compare</p>
      <div className="filter">
        <p>Filter and order</p>
        <FaCaretDown className="icons" />
      </div>
      <input
        type="text"
        name="search"
        className="search"
        placeholder="Search"
      />
      <button type="submit" className="searchButton">
        <FaSearch className="icons" size="16px" />
      </button>
      <div className="iconButtons">
        <button className="icons">
          <FaRegStar size="18px" />
        </button>
        <button className="icons">
          <BsCircleHalf style={{ transform: "rotate(180deg)" }} size="18px" />
        </button>
        <button className="icons">
          <BsGridFill size="18px" />
        </button>
      </div>
      <button className="addRepo">
        <BsPlusLg size="18px" color="white" />
      </button>
    </nav>
  );
}
