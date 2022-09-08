<template>
  <div>
    <NavBar />
    <!-- <div v-for="s in getSingleMovie" :key="s">
      {{s}}
    </div> -->
    {{movie}}
    <div class="loader__container" v-if="isLoading">
      <div class="lds-dual-ring"></div>
    </div>
    <div class="movie__container" v-else>
      <div class="movie__image">
        <img :src=movie.Poster alt="movie_image">
      </div>
      <div class="movie__info">
        <button @click="goBack" class="back"><img src="@/assets/back.svg" alt="back">   Back</button>
        <p class="movie__title">{{movie.Title}}</p>
        <div class="type__year">
            <p class="type">{{movie.Type}}</p>
            <p class="dot"></p>
            <p>{{movie.Released}}</p>
        </div>
        <div class="movie__plot">
          <p class="plot">Plot: </p>
          <p class="plot__desc">
            {{movie.Plot}}
          </p>
        </div>
        <div class="actors__container">
          <p class="actors">Actors: </p>
          <p class="actors__list">
            {{movie.Actors}}
          </p>
        </div>
        <div class="genre__container">
          <p class="genre">Genre: </p>
            {{movie.Genre.split(',').join('')}}
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import router from '@/router';
import { mapState } from 'vuex';
import NavBar from './NavBar.vue';
export default {
    name: 'SingleMovieComponent',
    components: { NavBar },
    computed: {
      ...mapState(['movie', 'isLoading'])
    },
    methods: {
      fetchMovie(){
        const movieID = this.$route.params.movieID
        this.$store.dispatch('getSingleMovie', movieID)
      },
      goBack(){
        router.back()
      }
    },
    mounted(){
      console.log(this.movie)
      this.fetchMovie()
    }
}
</script>
<style>
  .movie__container{
    width: 731px;
    height: 429px;
    margin-left: auto;
    margin-right: auto;
    display: flex;
  }

  .movie__image img{
    height: 429px;
  }

  .back {
    padding: 5.5px 24px;
    width: 108px;
    height: 32px;
    border: 1px solid #C43838;
    border-radius: 50px;
    color: #C43838;
    background-color: transparent;
  }

  .movie__title{
    font-weight: 700;
    font-size: 40px;
    line-height: 52px;
    letter-spacing: -0.02em;
    color: #FFFFFF;
  }
  .movie__plot, .actors__container, .genre__container{
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }

  .actors__container, .genre__container {
    justify-content: normal;
  }

  .plot, .actors, .genre {
    font-weight: 400;
    font-size: 16px;
    line-height: 21px;
    color: #FFFFFF;
    margin-right: 12px;
  }

  .plot__desc, .actors__list{
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    color: rgba(255, 255, 255, 0.55);
  }

  .genre__list{
    padding: 8px 24px;
    width: 84px;
    height: 32px;
    background: #373636;
    border-radius: 50px;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: rgba(255, 255, 255, 0.4);
  }

</style>