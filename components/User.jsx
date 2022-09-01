import { useSession } from "next-auth/react";
import Image from "next/image";

const User = () => {
  const { data: session } = useSession();
  return (
    <>
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
