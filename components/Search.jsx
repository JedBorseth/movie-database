import { AiOutlineSearch } from "react-icons/ai";
import { useState } from "react";

const Search = ({ handleSearch, handleContent, mobile }) => {
  return (
    <div className={`${!mobile && "search"}`}>
      <form
        onSubmit={(e) => {
          {
            handleSearch(e);
          }
        }}
      >
        <button type="submit">
          <AiOutlineSearch className="search-icon" />
        </button>
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => {
            handleContent(e);
          }}
        />
      </form>
    </div>
  );
};

export default Search;
