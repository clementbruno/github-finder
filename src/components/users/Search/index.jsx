import React, { useState, useContext } from "react";
import GithubContext from "../../../context/github/githubContext";
import AlertContext from "../../../context/alert/AlertContext";

function Search(props) {
  const [text, setText] = useState("");
  const { searchUsers, clearUsers, users } = useContext(GithubContext);
  const { setAlert } = useContext(AlertContext);
  const showClear = users.length > 0;

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text === "") {
      setAlert("Please enter something", "light");
    } else {
      searchUsers(text);
      setText("");
    }
  };

  const handleClearBtnClick = (e) => {
    clearUsers();
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          type="text"
          name="text"
          placeholder="Search Users..."
          value={text}
        />
        <input
          type="submit"
          value="Search"
          className="btn btn-dark btn-block"
        />
      </form>
      {showClear && (
        <button
          className="btn btn-light btn-block"
          onClick={handleClearBtnClick}
        >
          Clear
        </button>
      )}
    </div>
  );
}

export default Search;
