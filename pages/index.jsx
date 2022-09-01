import Header from "../components/Header";
import MovieList from "../components/MovieList";
import Footer from "../components/Footer";

export default function Home() {

  return (
    <div className="wrapper">
      <Header highlighted="home" />
      <main>
        <MovieList />
      </main>
      <Footer />
    </div>
  );
}
