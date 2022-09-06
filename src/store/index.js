import { createStore } from 'vuex'
import { search } from '@/movie'

export default createStore({
  state: {
    movieList: [],
    error: null
  },
  getters: {
  },
  mutations: {
    UPDATE_LIST(state, movieList){
      state.movieList = movieList
    },
    SET_ERROR(state, error){
      state.error = error.message
    }
  },
  actions: {
    updateList(context, movieList){
      context.commit("UPDATE_LIST", movieList)
    },
    clearList(context){
      context.commit('UPDATE_LIST', [])
    },
    async getAllMovies(context, title){
      try {
        const response = await search(title)
        const data = response.data
        if (data.Response === "True") {
          const movieList = data.Search
          context.commit('UPDATE_LIST', movieList)
        }else{
          context.commit('UPDATE_LIST', [])
        }
      }catch(err){
        console.log(err)
      }
    }
  },
  modules: {
  }
})
