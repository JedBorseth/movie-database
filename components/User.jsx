import { useSession } from "next-auth/react";
import Image from "next/image";

const User = () => {
  const { data: session } = useSession();
  return (
    <div className="user">
      {session?.user?.image ? (
        <Image
          src={session?.user?.image}
          alt={session?.user?.name}
          width="100"
          height="100"
        />
      ) : null}
    </div>
  );
};

export default User;
