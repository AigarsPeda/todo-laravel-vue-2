<template>
  <div class="todo-filtered">
    <button :class="{ active: filter == 'all' }" @click="updateFilter('all')">
      All
    </button>
    <button
      :class="{ active: filter == 'active' }"
      @click="updateFilter('active')"
    >
      Active
    </button>
    <button
      :class="{ active: filter == 'completed' }"
      @click="updateFilter('completed')"
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
    updateFilter(filterStr) {
      // this.$store.commit("updateFilter", filterStr);
      this.$store.dispatch("updateFilter", filterStr);
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
