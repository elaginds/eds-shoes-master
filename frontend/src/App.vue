<!--https://visme.co/blog/wp-content/uploads/2016/09/website17-1024x512.jpg-->

<template>
  <nav>
    <router-link to="/">Карточки</router-link>
    <span class="divide-stick"> | </span>
    <router-link to="/add">Добавить</router-link>
    <span class="divide-stick"> | </span>
    <router-link to="/categories">Категории</router-link>
  </nav>

  <div class="menu-div"></div>

  <router-view/>
</template>

<style lang="scss">
@import "./styles/variables";
@import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600;700&display=swap');

body {
  background-color: $variables-background-primary;
  margin: 0;
}

#app {
  //font-family: Avenir, Helvetica, Arial, sans-serif;
  font-family: 'Comfortaa', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  position: fixed;
  padding: 30px 0;
  width: 100%;
  background-color: $variables-background-primary;
  z-index: 1;

  .divide-stick {
    color: $variables-text-primary;
  }

  a {
    font-weight: bold;
    color: $variables-text-primary;

    &.router-link-exact-active {
      color: $variables-text-secondary;
    }
  }
}

.menu-div {
  height: 90px;
}

</style>
<script setup>
</script>