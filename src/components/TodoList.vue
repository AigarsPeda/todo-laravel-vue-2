<template>
  <div class="todo-list">
    <input
      type="text"
      class="todo-input"
      placeholder="What needs to be done?"
      v-model="newTodo"
      @keyup.enter="addTodo"
    />
    <div v-for="(todo, index) in todosFiltered" :key="todo.id">
      <TodoListItem :todo="todo" :index="index" :checkAll="!anyRemaining" />
    </div>
    <div class="extra-container">
      <TodoCheckAll />
      <TodoItemsRemaining />
    </div>
    <div class="extra-container">
      <TodoFiltered />
      <div>
        <transition name="fade">
          <TodoClearCompleted />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import TodoCheckAll from "./TodoCheckAll.vue";
import TodoClearCompleted from "./TodoClearCompleted.vue";
import TodoFiltered from "./TodoFiltered.vue";
import TodoItemsRemaining from "./TodoItemsRemaining.vue";
import TodoListItem from "./TodoListItem.vue";

export default {
  components: {
    TodoListItem,
    TodoItemsRemaining,
    TodoCheckAll,
    TodoClearCompleted,
    TodoFiltered
  },
  name: "TodoList",
  data() {
    return {
      newTodo: "",
      beforeEditCache: "",
      idForTodo: 4,
      filter: "all"
    };
  },
  computed: {
    remaining() {
      return this.$store.getters.remaining;
    },
    anyRemaining() {
      return this.$store.getters.anyRemaining;
    },
    todosFiltered() {
      return this.$store.getters.todosFiltered;
    },
    showClearCompletedButton() {
      return this.$store.getters.showClearCompletedButton;
    }
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim() === "") {
        return;
      }

      // calling mutation in store to add new todo
      this.$store.dispatch("addTodo", {
        id: this.idForTodo,
        title: this.newTodo
      });

      this.newTodo = "";
      this.idForTodo++;
    }
  }
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

  .extra-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    border-top: 1px solid lightgray;
    padding-top: 14px;
    margin-bottom: 14px;

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

    // CSS Transition
    .fade-enter-active,
    .fade-leave-active {
      transition: opacity 0.2s;
    }

    .fade-enter,
    .fade-leave-to {
      opacity: 0;
    }
  }
}
</style>
