import axios from "axios";

const url = 'http://www.omdbapi.com/';
const key = 'fcc13d04';

function search(title, page=1){
  return axios.get(`${url}?apikey=${key}&s=${title}&page=${page}`);
}
function searchSingleMovie(titleID){
  return axios.get(`${url}?apikey=${key}&i=${titleID}`);
}

export {search, searchSingleMovie}