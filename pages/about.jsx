import React from 'react'
import Header from "../components/Header";

function about() {
  return (
    <div className="wrapper">
        <Header highlighted="About" />
        <main>
            <h1>Moovies</h1>
            <p>
                Hi. Welcome to Moovies! This is a live movie database website used to keep track of popular, newly released and upcoming films. You're also capable of adding movies to a favourites list, as well as creating a watchlist or review for your favourite film.
            </p>

            <h3>This product uses the TMDb API but is not endorsed or certified by TMDb.</h3>
            
            <div className="tmdb-logo">
                <img src="" alt="" />
            </div>
        </main>
        <footer>

        </footer>
    </div>
  )
}

export default about;
