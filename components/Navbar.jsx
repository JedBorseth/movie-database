const Navbar = ({ highlighted }) => {
  return (
    <nav>
      <ul>
        <li className={highlighted === "home" ? "highlighted" : null}>Home</li>
        <li className={highlighted === "about" ? "highlighted" : null}>
          About
        </li>
        <li className={highlighted === "favorites" ? "highlighted" : null}>
          Favorites
        </li>
        <li className={highlighted === "login" ? "highlighted" : null}>
          <a href="./login">Login</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
