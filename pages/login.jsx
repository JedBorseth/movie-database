import Header from "../components/Header";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react";
const Login = () => {
  const { data: session } = useSession();
  return (
    <div className="wrapper">
      <Header highlighted="login" />
      <main className="login">
        {session ? (
          <button
            onClick={() => {
              signOut();
            }}
          >
            Sign Out
          </button>
        ) : (
          <button
            onClick={() => {
              signIn();
            }}
          >
            Sign In
          </button>
        )}
      </main>
    </div>
  );
};

export default Login;
