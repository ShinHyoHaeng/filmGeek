import React, { Route, Routes } from 'react-router-dom';
import { Header, Footer } from './layout';
import { Search, Detail } from './pages'


const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/ShinHyoHaeng/react-tmdb2notion" element={<Search />} />
        <Route path="/" element={<Search />} />
        <Route path="/detail/:mediaType/:id" element={<Detail />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;