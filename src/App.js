import { useState, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom';
import { Header, Footer } from './layout'
import { Search, Detail } from './pages'

const App = () => {
  const [language, setLanguage] = useState('ko-KR');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  return (
    <div className="wrapper">
      <Suspense fallback='loading'>
        <Header setLanguage={setLanguage} language={language} query={query} page={page} />
        <Routes>  
            <Route path="/" element={<Search language={language} setQuery={setQuery} setPage={setPage} query={query} page={page}/>} />
            <Route path="/home" element={<Search language={language} setQuery={setQuery} setPage={setPage} query={query} page={page} />} />
            <Route path="/detail/:mediaType/:id" element={<Detail language={language} query={query}  page={page} />} />
        </Routes>
        <Footer />
      </Suspense>
    </div>
  );
};

export default App;