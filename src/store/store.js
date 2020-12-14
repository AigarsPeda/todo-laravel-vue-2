import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
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
  },
  getters: {
    remaining(state) {
      return state.todos.filter((todo) => !todo.completed).length;
    },
    // if getter refers to another getter you should pass
    // it as argument
    anyRemaining(state, getters) {
      return getters.remaining !== 0;
    },
    todosFiltered(state) {
      if (state.filter === "active") {
        return state.todos.filter((todo) => !todo.completed);
      } else if (state.filter === "completed") {
        return state.todos.filter((todo) => todo.completed);
      } else {
        return state.todos;
      }
    },
    showClearCompletedButton(state) {
      return state.todos.filter((todo) => todo.completed).length > 0;
    }
  },
  mutations: {
    addTodo(state, todo) {
      state.todos.push({
        id: todo.id,
        title: todo.title,
        completed: todo.completed,
        editing: todo.completed
      });
    },
    clearCompleted(state) {
      state.todos = state.todos.filter((todo) => !todo.completed);
    },
    updateFilter(state, filter) {
      state.filter = filter;
    },
    checkAll(state, event) {
      state.todos.forEach((todo) => (todo.completed = event.target.checked));
    },
    removeTodo(state, id) {
      const index = state.todos.findIndex((item) => item.id === id);
      state.todos.splice(index, 1);
    },
    updateTodo(state, todo) {
      // find todos index in todos array in store
      const index = state.todos.findIndex((item) => {
        return item.id === todo.id;
      });

      state.todos.splice(index, 1, todo);
    }
  },
  actions: {
    addTodo(context, todo) {
      // simulating ajax call to api
      setTimeout(() => {
        context.commit("addTodo", todo);
      }, 1000);
    },
    clearCompleted(context) {
      context.commit("clearCompleted");
    },
    updateFilter(context, filter) {
      context.commit("updateFilter", filter);
    },
    checkAll(context, event) {
      context.commit("checkAll", event);
    },
    removeTodo(context, id) {
      context.commit("removeTodo", id);
    },
    updateTodo(context, todo) {
      context.commit("updateTodo", todo);
    }
  }
});
