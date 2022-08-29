import React, { useEffect, useState } from "react";
import { FiMenu } from "react-icons/fi";
import Navbar from "./Navbar";
import Search from "./Search";

const Header = (props) => {
  const [mobile, setMobile] = useState(false);
  const [menu, setMenu] = useState(false);
  useEffect(() => {
    const mediaWatcher = window.matchMedia("(max-width: 639px)");
    setMobile(mediaWatcher.matches);
    function updateIsNarrowScreen(e) {
      setMobile(e.matches);
      if (!e.matches) {
        setMenu(false);
      }
    }
    mediaWatcher.addEventListener("change", updateIsNarrowScreen);
    return function cleanup() {
      mediaWatcher.removeEventListener("change", updateIsNarrowScreen);
    };
  }, []);
  return (
    <>
      <header>
        <img src="" alt="nomi movies logo" />
        {mobile ? (
          <div className="mobile-menu">
            <FiMenu
              onClick={() => {
                setMenu(!menu);
              }}
            />
          </div>
        ) : (
          <Navbar highlighted={props.highlighted} />
        )}

        <Search />
      </header>
      {menu ? <Navbar /> : null}
    </>
  );
};

export default Header;
