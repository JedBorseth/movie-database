import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AiOutlineConsoleSql } from "react-icons/ai";
import Header from "../components/Header";
import useSupabase from "../hooks/useSupabase";

const Account = () => {
  const [bioInput, setBioInput] = useState(false);
  const [bioText, setBioText] = useState(null);
  const [bio, setBio] = useState(null);
  const [color, setColor] = useState("#ffffff");
  const { data: session } = useSession();
  const email = session?.user?.email;
  const supabase = useSupabase();
  const [time, setTime] = useState(null);
  const getTime = async () => {
    const { data: time, error } = await supabase
      .from("favorites")
      .select("time")
      .eq("user_email", email);
    if (time) {
      return time;
    }
  };
  const sendBio = async (bio) => {
    const { data, error } = await supabase
      .from("favorites")
      .update({ bio: bio })
      .eq("user_email", email);
  };
  const getBio = async () => {
    const { data, error } = await supabase
      .from("favorites")
      .select("bio")
      .eq("user_email", email);
    if (data) {
      return data;
    }
  };
  useEffect(() => {
    if (email) {
      getTime().then((time) => {
        setTime(time);
      });
      getBio().then((bio) => {
        setBio(bio);
      });
    }
  }, [email]);
  return (
    <div className="wrapper">
      <Header />
      <main className="account-page">
        {session && (
          <div>
            <Image
              src={session.user.image}
              alt="Profile Picture"
              width="100"
              height="100"
            />
            <h2>{session.user.name}</h2>
            {bio && (
              <span style={{ color: bio[0]?.bio?.color }}>
                {bio[0]?.bio?.text}{" "}
              </span>
            )}
            <p>
              First Login Time:
              {time && new Date(time[0].time).toLocaleString()}
            </p>
            <p>Email: {session.user.email}</p>
            {console.log(session.user.image)}
            <button
              onClick={() => {
                setBioInput(!bioInput);
              }}
            >
              Set Bio
            </button>
            {bioInput && (
              <form
                action=""
                onSubmit={(e) => {
                  e.preventDefault();
                  if (bioText?.length <= 18) {
                    sendBio({ text: bioText, color: color });
                  }
                }}
              >
                <input
                  type="text"
                  name="bio"
                  placeholder="New bio..."
                  maxLength="18"
                  onChange={(e) => {
                    setBioText(e.target.value);
                  }}
                />
                <input
                  type="color"
                  name="color"
                  defaultValue="#ffffff"
                  onChange={(e) => {
                    setColor(e.target.value);
                    console.log(color);
                  }}
                />
                <input type="submit" value="Submit" />
              </form>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Account;