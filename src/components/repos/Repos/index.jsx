import React from "react";
import PropTypes from "prop-types";
import RepoItem from "../RepoItem";

function Repos(props) {
  return (
    <div>
      {props.repos.map((repo) => (
        <RepoItem repo={repo} key={repo.id} />
      ))}
    </div>
  );
}

Repos.propTypes = {
  repo: PropTypes.object.isRequired,
};

export default Repos;
