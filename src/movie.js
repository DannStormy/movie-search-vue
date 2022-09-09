import axios from "axios";

const url = 'https://www.omdbapi.com/';
const key = process.env.VUE_APP_API_KEY;

function search(title, page=1){
  return axios.get(`${url}?apikey=${key}&s=${title}&page=${page}`);
}
function searchSingleMovie(titleID){
  return axios.get(`${url}?apikey=${key}&i=${titleID}`);
}

export {search, searchSingleMovie}