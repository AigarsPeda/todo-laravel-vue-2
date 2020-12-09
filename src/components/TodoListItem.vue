<template>
  <div class="todo-item">
    <div class="todo-left">
      <input type="checkbox" v-model="completed" @change="doneEdit" />
      <!-- completed is a css class witch is conditional
        is added from todo.completed value and 
        todo-item-label is default css class -->
      <div
        v-if="!editing"
        @dblclick="editTodo"
        :class="[{ completed: completed }, 'todo-item-label']"
      >
        {{ title }}
      </div>
      <input
        type="text"
        v-model="title"
        class="todo-item-edit"
        v-else
        @blur="doneEdit"
        @keyup.enter="doneEdit"
        v-focus
        @keyup.esc="cancelEdit"
      />
    </div>
    <div class="remove-item" @click="removeTodo(index)">
      &times;
    </div>
  </div>
</template>

<script>
export default {
  name: "TodoListItem",
  props: {
    todo: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    checkAll: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      id: this.todo.id,
      title: this.todo.title,
      completed: this.todo.completed,
      editing: this.todo.editing,
      beforeEditCache: ""
    };
  },
  watch: {
    checkAll() {
      this.completed = this.checkAll ? true : this.todo.completed;
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
    removeTodo(index) {
      this.$emit("removedTodo", index);
    },
    editTodo() {
      this.beforeEditCache = this.title;
      this.editing = true;
    },
    cancelEdit() {
      this.title = this.beforeEditCache;
      this.editing = false;
    },
    doneEdit() {
      if (this.title.trim() === "") {
        this.title = this.beforeEditCache;
      }
      this.editing = false;
      // passing data to parent component
      this.$emit("finishEdit", {
        index: this.index,
        todo: {
          id: this.id,
          title: this.title,
          completed: this.completed,
          editing: this.editing
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
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
</style>
