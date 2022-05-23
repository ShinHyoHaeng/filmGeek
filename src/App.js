import { Route, Routes } from 'react-router-dom';
import { Search, Detail } from './pages'


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Search />} />
      <Route path="/detail" element={<Detail />} />
    </Routes>
  );
};

export default App;