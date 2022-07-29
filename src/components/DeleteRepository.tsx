import { useState } from "react";
import { CgTrash, CgClose } from "react-icons/cg";
import { AiFillWarning } from "react-icons/ai";
import Backdrop from "@mui/material/Backdrop";

import "../styles/deleteRepository.scss";

interface DeleteRepoProps {
  deleteRepo: (id: number) => void;
  name: string;
  id: number;
}

export function DeleteRepository({name, id, deleteRepo}: DeleteRepoProps) {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div>
      <button className="repoHeaderButtons" onClick={handleToggle}>
        <CgTrash size="20px" />
      </button>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <div className="deleteRepo">
          <div className="deleteHeader">
            <h2>
              <AiFillWarning size="20px" /> Delete repository
            </h2>
            <button className="closeButton" onClick={handleClose}>
              <CgClose size="28px" />
            </button>
          </div>
          <div className="deleteConfirm">
            <p>Are you sure to delete the <span>{name}</span> repository?</p>
          </div>
          <div className="deleteButtons">
            <button id="deleteCancelButton" onClick={handleClose}>
              Cancel
            </button>
            <button id="deleteButton" onClick={() => deleteRepo(id)}>Delete</button>
          </div>
        </div>
      </Backdrop>
    </div>
  );
}
