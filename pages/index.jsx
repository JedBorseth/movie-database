import Header from "../components/Header";
import MovieList from "../components/MovieList";


export default function Home() {

  return (
    <div className="wrapper">
      <Header highlighted="home" />
      <main>
        <MovieList />
      </main>
      <footer></footer>
    </div>
  );
}
