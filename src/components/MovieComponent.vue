<template>
  <div class="container">
    <NavBar />
    <form @submit.prevent="searchMovie(1)" class="form__container">
      <input type="text" placeholder="Enter movie title..." v-model="title" required>
      <button type="submit">Search</button>
    </form>
    <div class="loader__container" v-if="isLoading">
      <div class="lds-dual-ring"></div>
    </div>
    <div class="error__container">
      <p class="error">{{error}}</p>
    </div>
    <div class="image__div" v-if="movieList.length === 0 && !isLoading">
      <img class="img" src="@/assets/Group15.png" alt="image">
    </div>
    <div class="movies" v-if="!isLoading">
      <div class="movieList" v-for="movie in movieList" :key="movie.imdbID">
        <div class="movie__details">
          <div class="not__found" @click="getMovieID(movie.imdbID)" v-if="movie.Poster === 'N/A'"></div>
          <img @click="getMovieID(movie.imdbID)" :src="movie.Poster" alt="movie-image" v-else>
          <p class="title">{{movie.Title}}</p>
          <div class="type__year">
            <p class="type">{{movie.Type}}</p>
            <p class="dot"></p>
            <p>{{movie.Year}}</p>
          </div>
      </div>
    </div>
    </div>
    <div class="pages" v-if="movieList.length > 0">
        <div :class="['page', {'active': page === currentPage}]" v-for="page in allPages" :key="page" @click="currentPage = page">
          {{page}}
        </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';
import NavBar from './NavBar.vue';
export default {
    name: "MovieComponent",
    data: () => ({
        title: "",
        currentPage: 1
    }),
    methods: {
        searchMovie(page) {
          if (page) {
            this.currentPage = page
          }
            const options = {
              title: this.title,
              page: this.currentPage
            }
            this.getAllMovies(options);
            this.$router.replace({query : {movieName: this.title}})
        },
        getMovieID(movieID){
          this.$router.push(`${movieID}`)
        },
        ...mapActions(["updateList", "getAllMovies", "clearList"])
    },
    computed: {
        ...mapState(["movieList", "isLoading", 'totalResults', 'error']),
        allPages(){
          return Math.ceil(this.totalResults / 10);
        }
    },
    mounted() {
        this.clearList();
        //update route once component is mounted
        this.title = this.$route.query.movieName
        //run searchMovie if title is present onMount
        if (this.title) {
          this.searchMovie()
        }
    },
    watch: {
      //call searchMovie if page changes
      currentPage(){
        this.searchMovie()
      }
    },
    components: { NavBar }
}
</script>
<style>
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body{
    background-color: #242222;
    background-image: url("@/assets/new-york-27538071.svg");
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position:bottom;
  }
  .form__container{
    width: 507px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 30px;
    position: sticky;
    z-index: 1;
    top: 30px;
  }
  .form__container input{
    background: #313030;
    border-radius: 92px;
    width: 100%;
    padding: 20px;
    border: none;
    font-weight: 400;
    font-size: 16px;
    color: rgba(255, 255, 255, 0.5);
    outline: none;
  }
  .form__container input:focus{
    outline: 1px solid #C53939;
  }
  .form__container button{
    margin-left: -125px;
    margin-right: 5px;
    width: 112px;
    height: 44px;
    background: #C53939;
    color: white;
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.15);
    border-radius: 68px;
    border: none;
    cursor: pointer;
  }
  .image__div{
    text-align: center;
    margin-top: 30px;
  }
  .movies{
    margin-left: auto;
    margin-right: auto;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 1128px;
    margin-top: 30px;
  }
  .movie__details{
    margin-bottom: 20px;
    cursor: pointer;
  }

  .movieList{
    width: 200px;
  }
  .movieList img, .not__found{
    width: 200px;
    height: 298.78px;
    margin-bottom: 13px;
    -moz-transition: all 0.3s;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
  }
  .not__found {
    background-color: grey;
  }
  .movieList img:hover {
    transform: scale(1.1);
  }
  .not__found:hover {
    transform: scale(1.1);
  }
  .title{
    font-weight: 700;
    font-size: 16px;
    line-height: 21px;
    color: #FFFFFF;
    margin-bottom: 3px;
  }
  .dot{
    width: 3px;
    height: 3px;
    background-color: rgba(255, 255, 255, 0.55);
  }
  .type{
    text-transform: capitalize;
  }
  .type__year{
    display: flex;
    width: 160px;
    justify-content: space-between;
    align-items: center;
    font-weight: 400;
    font-size: 16px;
    line-height: 21px;
    color: rgba(255, 255, 255, 0.55);
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
  .lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
  }
  .loader__container{
    width: 100px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 50px;
  }
  .lds-dual-ring:after {
    content: " ";
    display: block;
    width: 64px;
    height: 64px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid #fff;
    border-color: #fff transparent #fff transparent;
    animation: lds-dual-ring 1.2s linear infinite;
  }
  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
}
  .pages {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    padding: 20px;
    margin: 30px 0;
    width: 300px;
    overflow-y: scroll;
    margin-left: auto;
    margin-right: auto;
  }
  .page{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    padding: 20px;
    cursor: pointer;
    color: white;
  }
  .active{
      background: #C53939
  }
  .error__container{
    text-align: center;
    font-size: 20px;
    color: #C53939;
    margin-top: 20px;
  }
  @media screen and (max-width: 768px) {
    .movies {
      width: 100%;
      justify-content: center;
    }
    .form__container{
      width: 100%;
      padding: 10px;
    }
    .pages{
      justify-content: stretch;
    }
    .image__div{
      width: 100%;
    }
    .image__div img{
      max-width:100%;
      max-height:100%;
    }
  }
</style>