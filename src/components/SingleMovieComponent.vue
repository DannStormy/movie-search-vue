<template>
  <div>
    <NavBar />
    <!-- <div v-for="s in getSingleMovie" :key="s">
      {{s}}
    </div> -->
    {{movie}}
    <div @click="goBack" class="back">Back</div>
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
      ...mapState(['movie'])
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
      this.fetchMovie()
    }
}
</script>
<style lang="">

</style>