<template>
  <div class="todo-list">
    <input
      type="text"
      class="todo-input"
      placeholder="What needs to be done?"
      v-model="newTodo"
      @keyup.enter="addTodo"
    />
    <div v-for="(todo, index) in todos" :key="todo.id" class="todo-item">
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
}
</style>
