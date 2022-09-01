import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";

const User = () => {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <>
    <div
      className="user"
      onClick={() => {
        router.push("/account");
      }}
    >
      {session?.user?.image ? (
        <div className="user">
          <Image
            src={session?.user?.image}
            alt={session?.user?.name}
            width="100"
            height="100"
          />
        </div>
      ) : null}
    </>
  );
};

export default User;
