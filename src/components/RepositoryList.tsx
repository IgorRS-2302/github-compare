import { RepositoryTypes } from "../App";
import { Repository } from "./Repository";

import "../styles/repositoryList.scss";

interface RepositoryListProps {
  repositories: RepositoryTypes[];
  deleteRepo: (id: number) => void;
  favoriteRepo: (id: number) => void;
}

export function RepositoryList({ repositories, deleteRepo, favoriteRepo }: RepositoryListProps) {
  return (
    <>
      {repositories.length === 0 && (
        <>
          <div className="emptyList">
            <div className="emptyListPlaceholder">
              <img src="/images/DatasetemptyIcon.svg" alt="" />
              <h3>There is still nothing here</h3>
              <p>Add some repositories by clicking add new repository</p>
            </div>
          </div>
        </>
      )}

      {repositories.length > 0 && (
        <div className="listContainer">
          <div className="repositoryList">
            {repositories.map((repo) => (
              <Repository 
                repository={repo} 
                key={repo.id} 
                deleteRepo={deleteRepo} 
                favoriteRepo={favoriteRepo}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
