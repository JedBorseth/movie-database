import { useSession } from "next-auth/react";

const User = () => {
  const { data: session } = useSession();
  console.log(session);
  return (
    <div className="user">
      <img src={session?.user?.image} alt={session?.user?.name} />
    </div>
  );
};

export default User;
