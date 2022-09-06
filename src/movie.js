import axios from "axios";

const url = 'http://www.omdbapi.com/';
const key = 'fcc13d04';

function search(title){
  return axios.get(`${url}?apikey=${key}&s=${title}`);
}

export {search}