import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Search from "../components/Search";
import { FiMenu } from "react-icons/fi";

export default function Home() {
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
    <div className="index-wrapper">
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
          <Navbar />
        )}

        <Search />
      </header>
      {menu ? <Navbar /> : null}
      <main></main>
      <footer></footer>
    </div>
  );
}
