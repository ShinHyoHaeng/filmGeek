
// THE BASE URL WHICH TRIGGERS IMAGES 
export const IMAGE_BASE_URL = 'http://image.tmdb.org/t/p/';

// THE BASE API URL
export const API_URL = 'https://api.themoviedb.org/3/';

// GET YOUR KEY FROM TMDB DEVELOPER API
// export const API_KEY = process.env.REACT_APP_TMDB_KEY;
export const API_KEY = 'a6c74ba86064a0231a49431cda85cafe';

// THE URL WHICH TRIGGERS SEARCH 
const SEARCH_BASE_URL = `${API_URL}search/multi?api_key=${API_KEY}&query=`;

// THE URL WHICH TRIGGERS POPULAR MOVIES 
const POPULAR_BASE_URL = `${API_URL}movie/popular?api_key=${API_KEY}`;

// UNFORTUNATELY TMDB LIMITS 20 RESULTS PER PAGE, SO RATINGS FILTER WILL BE
// LIMITED TO THAT JUST FOR DEMO.
const FILTER_BASE_URL = `${API_URL}movie/popular?api_key=${API_KEY}&page=2`;

// THE BASE URL WHICH TRIGGERS IMAGES 
// const IMAGE_BASE_URL = 'http://image.tmdb.org/t/p/';

// THE SIZE OF ALTERNATIVE BACKDROP IMAGES
const BACKDROP_SIZE = 'w1280';

// THE SIZE OF MOVIES POSTER IMAGES
const POSTER_SIZE = 'w500';