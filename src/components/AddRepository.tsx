import { useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { MdError } from "react-icons/md";
import { RepositoryTypes } from "../App";
import axios from "axios";
import Popover from "@mui/material/Popover";

import "../styles/addRepository.scss";

interface AddRepoProps {
  addRepo: (repo: RepositoryTypes) => void;
}

export function AddRepository({ addRepo }: AddRepoProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [searchRepository, setSearchRepository] = useState("");
  const [isError, setIsError] = useState(false);

  function AddRepo() {
    axios({
      method: "GET",
      url: `https:api.github.com/repos/${searchRepository}`,
    })
      .then((res) => {
        addRepo(res.data);
        setIsError(false);
      })
      .catch((err) => {
        setIsError(true);
        console.log(err);
      });
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setIsError(false);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <button className="addRepo" onClick={handleClick}>
        <BsPlusLg size="18px" color="white" />
      </button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        className="popover-paper"
      >
        <div className="popover-container">
          <div className="popover-content">
            <h3>New repository</h3>
            <p>
              Repository <span>*</span>
            </p>
            <input
              type="text"
              name="Add Repository"
              onChange={(e) => setSearchRepository(e.target.value)}
            />
          </div>
          {isError && (
            <div className="popover-error">
              <MdError color="" />
              This is an API-feedback-error
            </div>
          )}
          <div className="popover-buttons">
            <button className="popover-cancel" onClick={handleClose}>
              Cancel
            </button>
            <button className="popover-add" onClick={AddRepo}>
              Add
            </button>
          </div>
        </div>
      </Popover>
    </>
  );
}
