import { useState } from "react";
import { FaGithub, FaSearch, FaRegStar, FaStar } from "react-icons/fa";
import { BsCircleHalf, BsGridFill } from "react-icons/bs";
import { AddRepository } from "./AddRepository";
import { FilterRepositories } from "./FilterRepositories";
import { RepositoryTypes } from "../App";

import "../styles/navbar.scss";

interface NavbarProps {
  addRepo: (repo: RepositoryTypes) => void;
  updateFilterTerm: (term: string) => void;
  updateInputValue: (search: string) => void;
  searchInputValue: string;
}

export function Navbar({ addRepo, updateFilterTerm, searchInputValue, updateInputValue }: NavbarProps) {
  const [favorites, setFavorites] = useState(false);

  function filterFavorites() {
    updateFilterTerm("")

    if (favorites === false) {
      updateFilterTerm("isFavorite");      
    }
    setFavorites(!favorites);
  }

  return (
    <nav className="nav">
      <div className="navContent">
        <FaGithub className="icons" size="24px" />
        <p>Github Compare</p>
        <FilterRepositories updateFilterTerm={updateFilterTerm} />
        <input
          type="text"
          name="search"
          className="search"
          placeholder="Search"
          value={searchInputValue}
          onChange={(e) => updateInputValue(e.target.value)}
        />
        <div className="searchButton">
          <FaSearch className="icons" size="16px" />
        </div>
        <div className="iconButtons">
          <button className="icons" onClick={filterFavorites}>
            {favorites === true ? <FaStar size="18px" /> : <FaRegStar size="18px" />}
          </button>
          <button className="icons">
            <BsCircleHalf style={{ transform: "rotate(180deg)" }} size="18px" />
          </button>
          <button className="icons">
            <BsGridFill size="18px" />
          </button>
          <AddRepository addRepo={addRepo} />
        </div>
      </div>
    </nav>
  );
}
