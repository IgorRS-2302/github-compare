import { useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import Popover from "@mui/material/Popover";

import "../styles/filterRepositories.scss";

interface FilterRepositoriesProps {
  updateFilterTerm: (term: string) => void;
}

export function FilterRepositories({updateFilterTerm}: FilterRepositoriesProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <button className="filter" onClick={handleClick}>
        Filter and order
        <FaCaretDown className="icons" />
      </button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        className="popover-filter-paper"
      >
        <div className="popover-filter">
          <li><span>Order by</span></li>
          <button onClick={() => updateFilterTerm("stars")}>Stars</button>
          <button onClick={() => updateFilterTerm("forks")}>Forks</button>
          <button onClick={() => updateFilterTerm("issues")}>Open issues</button>
          <button onClick={() => updateFilterTerm("age")}>Age</button>
          <button onClick={() => updateFilterTerm("lastCommit")}>Last commit</button>
        </div>
      </Popover>
    </>
  );
}
