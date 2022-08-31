import React from "react";
import Header from "../components/Header";
function indiv({ title, poster_path, description, cast_pic, cast_name }) {
  return (
    <div className="wrapper">
      <Header highlighted="indiv" />
      <main>
        {/* Title  */}
        <h1>{title}</h1>
        {/* Movie Details  */}
        <section>
          {/* Movie Poster  */}
          <div className="movie-poster">
            <img src={IMG_API + poster_path} alt={title} />
          </div>

          {/* Movie description  */}
          <div className="movie-dscrp-div">
            <h2>Description</h2>
            <p className="move-dscrp">{description}</p>
          </div>
          {/* Cast details  */}
          <div className="cast">
            <div>
              <h2>Cast</h2>
              <button>View All</button>
            </div>

            {/* Cast 1  */}
            <div className="cast-info">
              <img src={cast_pic} alt={cast_name} className="cast-member" />
            </div>
            <p>{cast_name}</p>
            {/* Cast 2  */}

            <div className="cast-info">
              <img src={cast_pic} alt={cast_name} className="cast-member" />
            </div>
            <p>{cast_name}</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default indiv;
