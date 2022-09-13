import Header from "../components/Header";
import MovieList from "../components/MovieList";
import Footer from "../components/Footer";
import { useQuery } from "@tanstack/react-query";
import {
  QueryClient,
  QueryClientProvider,
  ReactQueryDevTools,
} from "@tanstack/react-query";
const queryClient = new QueryClient();
export default function Home() {
  return (
    <div className="wrapper">
      <Header highlighted="home" />
      <main>
        <QueryClientProvider client={queryClient}>
          <MovieList />
        </QueryClientProvider>
      </main>
      <Footer />
    </div>
  );
}
