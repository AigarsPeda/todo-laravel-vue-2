<template>
  <div class="todo-list">
    <input
      type="text"
      class="todo-input"
      placeholder="What needs to be done?"
      v-model="newTodo"
      @keyup.enter="addTodo"
    />
    <div
      v-for="(todo, index) in todosFiltered"
      :key="todo.id"
      class="todo-item"
    >
      <div class="todo-left">
        <input type="checkbox" v-model="todo.completed" />
        <!-- completed is a css class witch is conditional
        is added from todo.completed value and 
        todo-item-label is default css class -->
        <div
          v-if="!todo.editing"
          @dblclick="editTodo(todo)"
          :class="[{ completed: todo.completed }, 'todo-item-label']"
        >
          {{ todo.title }}
        </div>
        <input
          type="text"
          v-model="todo.title"
          class="todo-item-edit"
          v-else
          @blur="doneEdit(todo)"
          @keyup.enter="doneEdit(todo)"
          v-focus
          @keyup.esc="cancelEdit(todo)"
        />
      </div>
      <div class="remove-item" @click="removeTodo(index)">
        &times;
      </div>
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
export default {
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
  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      }
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
    editTodo(todo) {
      this.beforeEditCache = todo.title;
      todo.editing = true;
    },
    cancelEdit(todo) {
      todo.title = this.beforeEditCache;
      todo.editing = false;
    },
    doneEdit(todo) {
      if (todo.title.trim() === "") {
        todo.title = this.beforeEditCache;
      }
      todo.editing = false;
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
    },
    checkAllTodos() {
      this.todos.forEach((todo) => (todo.completed = event.target.checked));
    },
    clearCompleted() {
      this.todos = this.todos.filter((todo) => !todo.completed);
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

  .todo-item {
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .todo-left {
      display: flex;
      align-items: center;

      .completed {
        text-decoration: line-through;
        color: gray;
      }

      .todo-item-label {
        padding: 10px;
        border: 1px solid white;
        margin-left: 12px;
      }

      .todo-item-edit {
        font-size: 18px;
        color: #2c3e50;
        margin-left: 12px;
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        font-family: "Source Sans Pro", sans-serif;
      }
    }

    .remove-item {
      cursor: pointer;
      margin-left: 14px;

      &:hover {
        color: black;
      }
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
