import React, { useEffect, useState } from 'react'
import Movie from './Movie'

function MovieList (){
    const [movies, setMovies]= useState([])
    const featuredMovies = "https://api.themoviedb.org/3/discover/movie?api_key=565e5a5d8e336b7cee4dc5ea476e08f6&language=en-US&sort_by=popularity.desc"
    const apiURL = "https://api.themoviedb.org/3/movie/550?api_key=565e5a5d8e336b7cee4dc5ea476e08f6"
    const movieQuery = "https://api.themoviedb.org/3/movie/550?api_key=565e5a5d8e336b7cee4dc5ea476e08f6&query="
    
    //Change API link to Jed's, this is currently my API cause I forgot Jed's.
    const getMovie = async()=>{ 
        const fetchAPI = await fetch(apiURL);
        setMovies(await fetchAPI.json()); 
        console.log(fetchAPI)
    };

    useEffect(()=>{
        getMovie();
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
        
    </div>
  )
}

export default MovieList