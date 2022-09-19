import { useEffect } from "react";

const Navbar = ({ highlighted }) => {
  useEffect(() => {
    if (highlighted && !highlighted == "indiv") {
      document.title = `Nomi - ${
        highlighted[0].toUpperCase() + highlighted.substr(1)
      }`;
    } else {
      document.title = "Nomi Movies";
    }
  });
  return (
    <nav>
      <ul>
        <li className={highlighted === "home" ? "highlighted" : null}>
          {" "}
          <a href="./">Home</a>
        </li>
        <li className={highlighted === "about" ? "highlighted" : null}>
          <a href="./about">About</a>
        </li>
        <li className={highlighted === "favorites" ? "highlighted" : null}>
          <a href="./favourites">Favourites</a>
        </li>
        <li className={highlighted === "login" ? "highlighted" : null}>
          <a href="./login">Login</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
