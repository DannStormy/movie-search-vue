<template>
  <div>
    <nav class="nav__container">
      <p @click="goHome">🎬 The Movie Search App</p>
    </nav>
  </div>
</template>
<script>
import router from '@/router';

export default {
  name: 'NavBar',
  methods: {
    goHome(){
      router.push('/');
    }
  }
}
</script>
<style scoped>
    .nav__container{
      font-weight: 400;
      font-size: 16px;
      line-height: 21px;
      color: #FFFFFF;
      height: 64px;
      width: 100%;
      background: #313030;
      display: flex;
      align-items: center;
      justify-content: space-around;
    }

    nav p{
      font-weight: 500;
      font-size: 16px;
      line-height: 21px;
      cursor: pointer;
      transition: all 0.3s;
    }
    nav p:hover{
      transform: scale(1.2);
    }
</style>