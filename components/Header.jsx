import React, { useEffect, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { AiOutlineSearch } from "react-icons/ai";
import Navbar from "./Navbar";
import Search from "./Search";
import Image from "next/image";
import NomiLogo from "../public/images/nomi-logo-white.svg";
import User from "./User";

const Header = (props) => {
  const [search, setSearch] = useState(null);
  const [response, setResponse] = useState(null);
  const [mobile, setMobile] = useState(false);
  const [menu, setMenu] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);

  useEffect(() => {
    const mediaWatcher = window.matchMedia("(max-width: 639px)");
    setMobile(mediaWatcher.matches);
    function updateIsNarrowScreen(e) {
      setMobile(e.matches);
      setResponse("");
      if (!e.matches) {
        setMenu(false);
        setMobileSearch(false);
      }
    }
    mediaWatcher.addEventListener("change", updateIsNarrowScreen);
    return function cleanup() {
      mediaWatcher.removeEventListener("change", updateIsNarrowScreen);
    };
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (search?.length <= 0) {
      setResponse("");
      return;
    }
    if (!search) {
      setResponse("");
      return;
    }
    const fetchQuery = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=565e5a5d8e336b7cee4dc5ea476e08f6&query=${search}`
    );
    console.log(fetchQuery);
    fetchQuery.json().then((response) => {
      setResponse(response);
    });
  };

  function handleContent(e) {
    setSearch(e.target.value);
    if (e.target.value.length <= 0) {
      setResponse("");
    }
  }

  return (
    <>
      <header>
        <a href="./">
          <Image src={NomiLogo} alt="Nomi Movies Logo" width={75} height={75} />
        </a>
        {mobile ? (
          <div className="mobile-menu">
            <AiOutlineSearch
              onClick={() => {
                setMenu(false);
                setMobileSearch(!mobileSearch);
              }}
            />
            <FiMenu
              onClick={() => {
                setMobileSearch(false);
                setMenu(!menu);
              }}
            />
          </div>
        ) : (
          <Navbar highlighted={props.highlighted} />
        )}

        <Search handleSearch={handleSearch} handleContent={handleContent} />
        {response?.results && (
          <div className="search-results">
            <ul>
              {response.results.map((resp) => {
                return (
                  <li key={resp.id}>
                    <a href={`indiv?id=${resp.id}`}>{resp.title}</a>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
        <User />
      </header>
      {mobileSearch && (
        <Search
          handleSearch={handleSearch}
          handleContent={handleContent}
          mobile="true"
        />
      )}
      {menu && <Navbar />}
    </>
  );
};

export default Header;
