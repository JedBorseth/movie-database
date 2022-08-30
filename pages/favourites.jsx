import React from "react";
import Header from "../components/Header";
import useSupabase from "../hooks/useSupabase";
import { useSession } from "next-auth/react";
function favourites() {
  const { data: session } = useSession();
  if (session) {
    const email = session?.user?.email;
    const supabase = useSupabase();
    const getFavs = async () => {
      let { data: favorites, error } = await supabase
        .from("favorites")
        .select("favorites")
        .eq("user_email", email);
      // console.log(favorites[0].favorites);
      return favorites[0].favorites;
    };
    const setFavs = async (favorites) => {
      const { data, error } = await supabase
        .from("favorites")
        .update({ favorites: favorites })
        .eq("user_email", email);
    };
    const addFav = (newFav) => {
      getFavs().then((value) => {
        value.push(newFav);
        setFavs(value);
        console.log(value);
      });
    };
  }

  return (
    <div className="wrapper">
      <Header highlighted="favourites" />
      <main>
        {session ? (
          <h1 className="text-center">Favourites</h1>
        ) : (
          <h1 className="text-center">Sign In To Save Favorites</h1>
        )}
      </main>
      <footer></footer>
    </div>
  );
}

export default favourites;
