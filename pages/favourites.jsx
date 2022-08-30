import React from "react";
import Header from "../components/Header";
import useSupabase from "../hooks/useSupabase";

function favourites() {
  const getData = async () => {
    const supabase = await useSupabase();
    console.log(supabase);
    if (supabase) {
      const { data, error } = await supabase.from("*").select();
      console.log(error);
      console.log(data);
    }
  };
  getData();

  return (
    <div className="wrapper">
      <Header highlighted="favourites" />
      <main>
        {/* Title  */}
        <h1>Favourites</h1>
      </main>
      <footer></footer>
    </div>
  );
}

export default favourites;
