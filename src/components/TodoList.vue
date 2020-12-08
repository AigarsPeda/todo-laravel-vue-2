<template>
  <div class="todo-list">
    <input
      type="text"
      class="todo-input"
      placeholder="What needs to be done?"
    />
  </div>
</template>

<script>
export default {
  name: "TodoList"
};
</script>

<style lang="scss" scoped>
.todo-list {
  .todo-input {
    width: 100%;
    padding: 10px 18px;
    font-size: 18px;
    margin-bottom: 16px;

    &:focus {
      outline: 0;
    }
  }
}
</style>
