import React, { useReducer } from "react";
import GithubContext from "./githubContext";
import GithubReducer from "./githubReducer";
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS,
} from "../types";

let githubClientId;
let githubClientSecret;

if (process.env.NODE_ENV !== "production") {
  githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
  githubClientId = process.env.GITHUB_CLIENT_ID;
  githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

console.log(process.env);

function GithubState(props) {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  async function searchUsers(text) {
    setLoading();
    const users = await fetch(
      `https://api.github.com/search/users?q=${text}&client_id=${githubClientId}&client_secret=${githubClientSecret}`
    )
      .then((resp) => resp.json())
      .then((data) => data.items);

    dispatch({ type: SEARCH_USERS, payload: users });
  }

  function setLoading() {
    dispatch({ type: SET_LOADING });
  }

  function clearUsers() {
    dispatch({ type: CLEAR_USERS });
  }

  async function getUser(username) {
    setLoading();

    const user = await fetch(
      `https://api.github.com/users/${username}?client_id=${githubClientId}&client_secret=${githubClientSecret}`
    ).then((resp) => resp.json());

    dispatch({ type: GET_USER, payload: user });
  }

  async function getUserRepos(username) {
    setLoading();

    const repos = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`
    ).then((resp) => resp.json());

    dispatch({ type: GET_REPOS, payload: repos });
  }

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        getUser,
        setLoading,
        searchUsers,
        getUserRepos,
        clearUsers,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
}

export default GithubState;
