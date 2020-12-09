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
      <div>
        <label>
          <input
            type="checkbox"
            :checked="!anyRemaining"
            @change="checkAllTodos"
          />
          Check All
        </label>
      </div>
      <div>{{ remaining }} items left</div>
    </div>
    <div class="extra-container">
      <div>
        <button :class="{ active: filter === 'all' }" @click="filter = 'all'">
          All
        </button>
        <button
          :class="{ active: filter === 'active' }"
          @click="filter = 'active'"
        >
          Active
        </button>
        <button
          :class="{ active: filter === 'completed' }"
          @click="filter = 'completed'"
        >
          Completed
        </button>
      </div>
      <div>
        <transition name="fade">
          <button v-if="showClearCompletedButton" @click="clearCompleted">
            Clear Completed
          </button>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import TodoListItem from "./TodoListItem.vue";
export default {
  components: { TodoListItem },
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

    .active {
      background: lightgreen;
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
