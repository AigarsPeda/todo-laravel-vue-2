<template>
  <div>
    <label>
      <input type="checkbox" :checked="!anyRemaining" @change="checkAll" />
      Check All
    </label>
  </div>
</template>

<script>
export default {
  name: "TodoCheckAll",
  computed: {
    anyRemaining() {
      return this.$store.getters.anyRemaining;
    }
  },
  methods: {
    checkAll() {
      // this.$store.commit("checkAll", event);
      this.$store.dispatch("checkAll", event);
    }
  }
};
</script>
