import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import useSupabase from "../hooks/useSupabase";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Footer from "../components/Footer";
import Link from "next/link";
import LikeBtn from "../components/LikeBtn";
const Favourites = () => {
  const [listFavourites, setListFavourites] = useState();
  const { data: session } = useSession();
  const email = session?.user?.email;
  const supabase = useSupabase();
  const getFavs = async () => {
    const { data: favorites, error } = await supabase
      .from("favorites")
      .select("favorites")
      .eq("user_email", email);
    if (favorites) {
      return favorites[0]?.favorites;
    }
  };
  const setFavs = async (favorites) => {
    const { data, error } = await supabase
      .from("favorites")
      .update({ favorites: favorites })
      .eq("user_email", email);
  };
  const newUser = async (email) => {
    const { data, error } = await supabase
      .from("favorites")
      .insert([{ user_email: email, favorites: [] }]);
    if (error) {
      console.error(error.details);
    }
  };
  const addFav = (newFav) => {
    getFavs().then((value) => {
      let checkDb = true;
      for (let i = 0; i < value?.length; i++) {
        if (value[i].id === newFav.id) {
          checkDb = false;
        }
      }
      if (checkDb) {
        value.push(newFav);
        setFavs(value);
      } else {
        console.error(`movie id's must be unique, found ${newFav.id} in db`);
      }
    });
  };
  const checkUsers = async () => {
    const { data: email, error } = await supabase
      .from("favorites")
      .select("user_email");
    if (email) {
      let check = true;
      email.forEach((account) => {
        if (account.user_email === session.user.email) {
          check = false;
        }
      });
      return check;
    }
  };

  useEffect(() => {
    if (email) {
      getFavs().then((value) => {
        setListFavourites(value);
      });
      checkUsers().then((check) => {
        if (check) {
          newUser(email);
        }
      });
    }
  }, [email]);
  return (
    <div className="wrapper">
      <Header highlighted="favorites" />
      <main>
        {session !== null ? (
          <div className="favorites">
            {listFavourites
              ? listFavourites.map((movie) => {
                  return (
                    <div key={movie.id} className="favorites-movie">
                      <Link
                        href={{
                          pathname: "./indiv",
                          query: {
                            id: movie.id,
                          },
                        }}
                      >
                        <div>
                          <Image
                            src={movie.movieImgURL}
                            width="260"
                            height="400"
                            alt={movie.overview}
                          />
                        </div>
                      </Link>
                      <LikeBtn id={movie.id} favList={listFavourites} />
                      <h2>{movie.movieTitle}</h2>
                    </div>
                  );
                })
              : null}
          </div>
        ) : (
          <h1 className="favourites-header">
            Sign In to Access Your Favorites
          </h1>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Favourites;
