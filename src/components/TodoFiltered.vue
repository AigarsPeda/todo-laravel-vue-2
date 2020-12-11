<template>
  <div class="todo-filtered">
    <button :class="{ active: filter == 'all' }" @click="changeFilter('all')">
      All
    </button>
    <button
      :class="{ active: filter == 'active' }"
      @click="changeFilter('active')"
    >
      Active
    </button>
    <button
      :class="{ active: filter == 'completed' }"
      @click="changeFilter('completed')"
    >
      Completed
    </button>
  </div>
</template>

<script>
export default {
  name: "TodoFiltered",
  computed: {
    filter() {
      return this.$store.state.filter;
    }
  },
  methods: {
    changeFilter(filterStr) {
      this.$store.state.filter = filterStr;
    }
  }
};
</script>

<style lang="scss" scoped>
.todo-filtered {
  button {
    font-size: 14px;
    background-color: white;
    appearance: none;
    margin: 2px;
    border: 1px solid gray;
    cursor: pointer;

    &:hover {
      background: lightgreen;
    }

    &:focus {
      outline: none;
    }
  }

  .active {
    background: lightgreen;
  }
}
</style>
