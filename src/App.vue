<template>
  <div id="app" class="container">
    <img alt="Vue logo" src="./assets/logo.png" class="logo" />
    <TodoList />
  </div>
</template>

<script>
import TodoList from "./components/TodoList.vue";

export default {
  name: "App",
  components: {
    TodoList
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700;1,900&display=swap");

* {
  font-family: "Source Sans Pro", sans-serif;
  box-sizing: border-box;
}

#app {
  color: #2c3e50;
  margin-top: 60px;
  font-size: 18px;
}

.container {
  max-width: 600px;
  margin: 0 auto;

  .logo {
    display: block;
    margin: 20px auto;
    height: 75px;
  }
}
</style>
