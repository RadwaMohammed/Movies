import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MovieContext from "./contexts/MoviesContext";
import PageCountContext from "./contexts/PageCountContext";
import MoviesList from "./pages/MoviesList";
import MovieDetails from "./pages/MovieDetails";
import NotFound from "./pages/NotFound";
import LoaderContext from "./contexts/LoaderContext";

function App() {
  const allMovies = useState([]);
  const allPagesCount = useState(0);
  const isLoading = useState(false);

  return (
    <LoaderContext.Provider value={isLoading}>
      <MovieContext.Provider value={allMovies}>
        <PageCountContext.Provider value={allPagesCount}>
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  <MoviesList movies={allMovies} pageCount={allPagesCount} />
                }
              />
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </PageCountContext.Provider>
      </MovieContext.Provider>
    </LoaderContext.Provider>
  );
}

export default App;