import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";

const User = () => {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <>
      {session?.user?.image ? (
        <div
          className="user"
          onClick={() => {
            router.push("/account");
          }}
        >
          <div className="user">
            <Image
              src={session?.user?.image}
              alt={session?.user?.name}
              width="100"
              height="100"
            />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default User;
