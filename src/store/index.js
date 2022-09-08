import { createStore } from 'vuex'
import { search, searchSingleMovie } from '@/movie'

export default createStore({
  state: {
    movie: null,
    movieList: [],
    error: null,
    isLoading: false,
    totalResults: 1,
  },
  getters: {
  },
  mutations: {
    UPDATE_LIST(state, movieList){
      state.movieList = movieList
    },
    SET_ERROR(state, error){
      state.error = error
    },
    UPDATE_SINGLE_MOVIE(state, movie){
      state.movie = movie
    },
    SET_TOTAL_RESULTS(state, count){
      state.totalResults = parseInt(count)
    }
  },
  actions: {
    updateList(context, movieList){
      context.commit("UPDATE_LIST", movieList)
    },
    clearList(context){
      context.commit('UPDATE_LIST', [])
    },
    async getAllMovies(context, options){
      const {title, page} = options
      try {
        context.state.isLoading = true
        const response = await search(title, page)
        const data = response.data
        console.log(data)
        if (data.Response === "True") {
          const movieList = data.Search
          const resultCount = data.totalResults
          context.commit("SET_TOTAL_RESULTS", resultCount)
          context.commit('UPDATE_LIST', movieList)
          context.commit("SET_ERROR", null)
        }else{
          context.commit("SET_ERROR", data.Error)
          context.commit('UPDATE_LIST', [])
        }
      }catch(err){
        console.log("This is the error: ", err.error)
      }finally{
        context.state.isLoading = false
      }
    },
    async getSingleMovie(context, movieID){
      try {
        context.state.isLoading = true
        const response = await searchSingleMovie(movieID)
        const movie = response.data
        context.commit('UPDATE_SINGLE_MOVIE', movie)
      } catch(err) {
        console.log(err)
      } finally {
        context.state.isLoading = false
      }
    }
  },
  modules: {
  }
})
