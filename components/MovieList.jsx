import React, { useEffect, useState } from 'react'
import Movie from './Movie'

function MovieList (){
    const [movies, setMovies]= useState([])
    const featuredMovies = "https://api.themoviedb.org/3/discover/movie?api_key=565e5a5d8e336b7cee4dc5ea476e08f6&language=en-US&sort_by=popularity.desc"
    const imgPath=  "https://image.tmdb.org/t/p/w500/"
    
    //Change API link to Jed's, this is currently my API cause I forgot Jed's.
    useEffect(() => {
        const getMovies = async () => {
            const fetchAPI = await fetch(featuredMovies);
            const data = await fetchAPI.json();
            setMovies(data); 
            // console.log(movies)
        }
        getMovies();
    },[]);

   

    // Adding Favourites
        //State to hold an array of your favourite movies, we can also make this global perhaps, or send this as a prop to the favourite.jsx page.
        const [favourites, setFavourites] = useState([])

        //Function to actually add movies to the array, will add buttons to the movie posters to trigger this event.
        function addFavMovie (movie) {
            const favouriteList = [...favourites, movie]
            setFavourites(favouriteList);
        }

  return (
    <div className="movielist">
        {movies?.results?.map((movie)=> 
            (<div key={movie.id}>
                <div className="index-poster-img">
                    <img src={imgPath + movie?.poster_path} alt={movie?.title} />
                </div>
                <h2>{movie?.title}</h2>
                <div className="hidden">
                    <h3>{movie?.release_date}</h3>
                    <p>{(movie.vote_average)*10}%</p>
                    <p> {movie.overview}</p>
                </div>
             {/* {console.log(movie)}    */}
            </div>)
        )}
    </div>
  )
}

export default MovieList