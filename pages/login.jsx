import Header from "../components/Header";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { authUser } from "../atoms/profileAtom";
const Login = () => {
  const { data: session } = useSession();
  const [user, setUser] = useRecoilState(authUser);
  useEffect(() => {
    setUser(session);
  }, [session, setUser]);
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
