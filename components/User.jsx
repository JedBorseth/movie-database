import { authUser } from "../atoms/profileAtom";
import { useRecoilState } from "recoil";
import { useSession } from "next-auth/react";

const User = () => {
  const { data: session } = useSession();
  const [user, setUser] = useRecoilState(authUser);
  if (!user) {
    setUser(session);
  }
  console.log(session);
  console.log(user);
  return (
    <div className="user">
      <img src={user?.user?.image} alt="" />
    </div>
  );
};

export default User;
