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
      <TodoListItem
        :index="index"
        :todo="todo"
        :checkAll="!anyRemaining"
        @removedTodo="removeTodo"
        @finishEdit="finishEdit"
      />
    </div>
    <div class="extra-container">
      <TodoCheckAll
        :anyRemaining="anyRemaining"
        @checkAllChanged="checkAllTodos"
      />
      <TodoItemsRemaining :remaining="remaining" />
    </div>
    <div class="extra-container">
      <TodoFiltered @filterChanged="filterChanged" :filter="filter" />
      <div>
        <transition name="fade">
          <TodoClearCompleted
            :showClearCompletedButton="showClearCompletedButton"
            @clearCompletedTodos="clearCompleted"
          />
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
      filter: "all",
      todos: [
        {
          id: 1,
          title: "Finish VUE todo list",
          completed: false,
          editing: false
        },
        {
          id: 2,
          title: "Add DB",
          completed: false,
          editing: false
        },
        {
          id: 3,
          title: "Add Auth",
          completed: false,
          editing: false
        }
      ]
    };
  },
  computed: {
    remaining() {
      return this.todos.filter((todo) => !todo.completed).length;
    },
    anyRemaining() {
      return this.remaining !== 0;
    },
    todosFiltered() {
      if (this.filter === "active") {
        return this.todos.filter((todo) => !todo.completed);
      } else if (this.filter === "completed") {
        return this.todos.filter((todo) => todo.completed);
      } else {
        return this.todos;
      }
    },
    showClearCompletedButton() {
      return this.todos.filter((todo) => todo.completed).length > 0;
    }
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim() === "") {
        return;
      }
      this.todos.push({
        id: this.idForTodo,
        title: this.newTodo,
        completed: false
      });
      this.newTodo = "";
      this.idForTodo++;
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
    },
    checkAllTodos() {
      this.todos.forEach((todo) => (todo.completed = event.target.checked));
    },
    clearCompleted() {
      this.todos = this.todos.filter((todo) => !todo.completed);
    },
    finishEdit(data) {
      this.todos.splice(data.index, 1, data.todo);
    },
    filterChanged(filter) {
      this.filter = filter;
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
