import { getProviders, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { BsGithub } from "react-icons/bs";
import { AiFillGoogleCircle } from "react-icons/ai";
import Header from "../components/Header";
export default function Providers({ providers }) {
  const router = useRouter();
  const { data: session } = useSession();
  const login = (provider) => {
    signIn(provider.id);
  };
  useEffect(() => {
    if (session) {
      router.push("/");
    }
    console.log(providers);
  });
  return (
    <>
      <Header />
      <div className="login-providers">
        {Object.values(providers).map((provider) => (
          <div key={provider.name} className="provider">
            {provider.name === "GitHub" && (
              <BsGithub className="provider-icon" />
            )}
            {provider.name === "Google" && (
              <AiFillGoogleCircle className="provider-icon" />
            )}
            <button onClick={() => login(provider)}>
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
