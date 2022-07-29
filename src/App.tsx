import { useMemo, useState } from "react";
import { Navbar } from "./components/Navbar"
import { RepositoryList } from "./components/RepositoryList";
import {isBefore, isAfter } from "date-fns"

import "./styles/global.scss";

export interface RepositoryTypes {
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

function App() {
  const [repositories, setRepositories] = useState<RepositoryTypes[]>([]);
  const [filterTerm, setFilterTerm] = useState("");
  const [searchInputValue, setSearchInputValue] = useState("");

  const filteredRepositories = useMemo(() => {
    let filtered = repositories

    if (filterTerm === "isFavorite") {
      filtered = repositories.filter(repository => repository.isFavorite);
    }

    if (filterTerm === "stars") {
      filtered = repositories.sort((a, b) => {
        return b.stargazers_count - a.stargazers_count;
      })
    }

    if (filterTerm === "forks") {
      filtered = repositories.sort((a, b) => {
        return b.forks_count - a.forks_count;
      })
    }

    if (filterTerm === "issues") {
      filtered = repositories.sort((a, b) => {
        return b.open_issues_count - a.open_issues_count;
      })
    }

    if (filterTerm === "age") {
      filtered = repositories.sort((a, b) => {
        if (isBefore(new  Date(a.created_at), new Date(b.created_at))) return 1;

        if (isAfter(new  Date(a.created_at), new Date(b.created_at))) return -1;

        return 0;
      })
    }

    if (filterTerm === "lastCommit") {
      filtered = repositories.sort((a, b) => {
        if (isBefore(new  Date(a.updated_at), new Date(b.updated_at))) return 1;

        if (isAfter(new  Date(a.updated_at), new Date(b.updated_at))) return -1;

        return 0;
      })
    }

    if (searchInputValue) {
      filtered = filtered.filter(repo => repo.name.toLowerCase().includes(searchInputValue.toLowerCase()))
    }

    return filtered
  }, [repositories, filterTerm, searchInputValue])

  function getRepository(repo: RepositoryTypes) {
    setRepositories((arr) => [...arr, {...repo, isFavorite: false}]);
  }

  function deleteRepository(id: number) {
    setRepositories(repositories.filter(repo => repo.id !== id))
  }

  function favoriteRepository(id: number) {
    setRepositories(repositories.map((repo) => repo.id === id ? {...repo, isFavorite: !repo.isFavorite} : repo))
  }

  function updateFilterTerm(term: string) {
    setFilterTerm(term)
  }

  return (
    <div className="App">
      <Navbar 
        addRepo={getRepository} 
        updateFilterTerm={updateFilterTerm}
        searchInputValue={searchInputValue}
        updateInputValue={setSearchInputValue}
      />
      {repositories && 
        <RepositoryList 
          repositories={filteredRepositories} 
          deleteRepo={deleteRepository}
          favoriteRepo={favoriteRepository}
        />}
    </div>
  );
}

export default App;
