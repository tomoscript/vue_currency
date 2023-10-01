<template>
  <v-list class="navigation">
    <div v-if="type === 'drawer'" @click="toggleDrawer" class="close__drawer">
      <v-icon>mdi-close</v-icon>
    </div>
    <v-list-item @click="navigateTo('home')">
      <v-list-item-title>Home</v-list-item-title>
    </v-list-item>
    <v-list-item @click="navigateTo('currency')">
      <v-list-item-title>Currency</v-list-item-title>
    </v-list-item>
    <v-list-item @click="navigateTo('country')">
      <v-list-item-title>Country</v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  name: "NavigationVue",
  data() {
    return {
      isLoggedIn: false,
    };
  },
  props: {
    type: {
      type: String,
      default: "",
    },
  },
  methods: {
    login() {
      this.isLoggedIn = true;
    },
    logout() {
      this.isLoggedIn = false;
    },
    navigateTo(page) {
      this.drawer = false;
      if (this.$route.name !== `${page}`) this.$router.push({ name: page });
    },
    toggleDrawer() {
      this.$emit("toggleDrawer");
    },
  },
};
</script>

<style scoped>
.navigation {
  display: flex;
  position: relative;
  background-color: transparent;
}
.close__drawer {
  display: flex;
  cursor: pointer;
  user-select: none;
  justify-content: end;
  padding: 0 16px;
}
@media only screen and (max-width: 600px) {
  .navigation {
    flex-direction: column;
  }
}
</style>
