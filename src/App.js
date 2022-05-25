import React, { Route, Routes } from 'react-router-dom';
import { Header, Footer } from './layout'
import { Search, Detail } from './pages'


const App = () => {
  return (
    <div className="wrapper">
      <Header />
      <Routes>
        <Route  path="/" element={<Search />} />
        <Route path="/home" element={<Search />} />
        <Route path="/detail/:mediaType/:id" element={<Detail />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;