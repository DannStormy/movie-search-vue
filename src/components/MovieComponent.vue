<template>
  <div>
    <form @submit.prevent="searchMovie" class="form__container">
      <input type="text" placeholder="Movie title" v-model="title">
      <button type="button">Search</button>
    </form>
    <div class="movies">
      <div class="movieList" v-for="movie in movieList" :key="movie.imdbID">
        <img :src="movie.Poster" alt="movie-image">
        <p>{{movie.Title}}</p>
        <p>{{movie.Type}}</p>
        <p>{{movie.Year}}</p>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';
export default {
  name: 'MovieComponent',
  data: () => ({
    title: ''
  }),
  methods: {
    searchMovie(){
      this.getAllMovies(this.title)
    },
    ...mapActions(['updateList', 'getAllMovies', 'clearList'])
  },
  computed: {
    ...mapState(['movieList'])
  },
  mounted(){
    this.clearList()
  }
}
</script>
<style>

</style>