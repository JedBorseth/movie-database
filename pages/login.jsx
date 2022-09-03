import Header from "../components/Header";
import Footer from "../components/Footer";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react";
import Image from "next/image";
import NomiLogo from "../public/images/nomi-logo-white.svg";
import MovieLogo from "../public/images/tmdb-logo.svg";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";

const Login = () => {
  const { data: session } = useSession();
  return (
    <div className="wrapper">
      <Header highlighted="login" />
      <main className="login">
        <Image src={NomiLogo} alt="Nomi Movies Logo" width={175} height={175} />
        <h1 className="login-header">Sign In</h1>
        <p>Please Sign In With Your GitHub or Google Account</p>
        {session ? (
          <Button
            onClick={() => {
              signOut();
            }}
            variant="contained"
            endIcon={<LoginIcon />}
            className="login-button"
          >
            Sign Out
          </Button>
        ) : (
          <Button
            onClick={() => {
              signIn();
            }}
            variant="contained"
            endIcon={<LoginIcon />}
            className="login-button"
          >
            Sign In
          </Button>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Login;
