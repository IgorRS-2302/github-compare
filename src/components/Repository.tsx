import { formatDistance, parseISO } from "date-fns";
import { FaStar, FaRegStar } from "react-icons/fa";

import "../styles/repository.scss";
import { DeleteRepository } from "./DeleteRepository";

interface RepositoryTypes {
  name: string;
  id: number;
  full_name: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  created_at: string;
  updated_at: string;
  language: string;
  isFavorite: boolean;
  owner: {
    login: string;
    avatar_url: string;
  };
  license: {
    name: string;
  };
}

interface RepositoryProps {
  repository: RepositoryTypes;
  deleteRepo: (id: number) => void;
  favoriteRepo: (id: number) => void;
}

export function Repository({ repository, deleteRepo, favoriteRepo }: RepositoryProps) {
  let lastCommit = formatDistance(new Date(), parseISO(repository.updated_at));
  let age = formatDistance(new Date(), parseISO(repository.created_at));

  return (
    <div className="repository">
      <div className="repoHeader">
        <img src={repository?.owner.avatar_url} alt="avatar" />
        <p className="repositoryName">{`${repository.owner.login}/${repository.name}`}</p>
        <div className="repoHeaderIcons">
          <button className="repoHeaderButtons" onClick={() => favoriteRepo(repository.id)}>
            {repository.isFavorite === true ? (
              <FaStar size="20px" />
            ) : (
              <FaRegStar size="20px" />
            )}
          </button>
          <DeleteRepository name={repository.full_name} id={repository.id} deleteRepo={deleteRepo} />
        </div>
      </div>
      <div className="repoContent">
        <li><span>Stars</span> {repository.stargazers_count}</li>
        <li><span>Forks</span> {repository.forks_count}</li>
        <li><span>Open Issues</span> {repository.open_issues_count}</li>
        <li><span>Age</span> {age} ago</li>
        <li><span>Last commit</span> {lastCommit} ago</li>
        <li><span>License </span>{repository?.license === null ? "N/A" : repository.license.name}</li>
        <li id="repoLanguage">{repository.language}</li>
      </div>
    </div>
  );
}
