<template>
  <div>
    <nav class="nav__container">
      <p>🎬 The Movie Search App</p>
    </nav>
  </div>
</template>
<script>
export default {
  name: 'NavBar'
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
</style>