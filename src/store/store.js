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
  }
});
