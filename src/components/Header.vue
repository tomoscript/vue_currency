<template>
  <div>
    <v-app-bar app>
      <div @click="toggleDrawer" v-if="isSmallScreen" class="menu__button">
        <v-icon>mdi-menu</v-icon>
      </div>
      <v-toolbar-title @click="goHome()" class="logo"> CurrencyExchange </v-toolbar-title>
      <v-spacer></v-spacer>
      <Navigation v-if="!isSmallScreen" />
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute disable-resize-watcher temporary>
      <Navigation type="drawer" @toggleDrawer="toggleDrawer" />
    </v-navigation-drawer>
  </div>
</template>

<script>
import Navigation from "@/components/Navigation";

export default {
  name: "HeaderComponent",
  components: {
    Navigation,
  },
  data() {
    return {
      drawer: false,
      isSmallScreen: window.innerWidth < 600,
    };
  },
  created() {
    window.addEventListener("resize", this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    handleResize() {
      this.isSmallScreen = window.innerWidth < 600;
    },
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
    goHome() {
      if (this.$route.path != "/") this.$router.push("/");
    },
  },
};
</script>

<style>
.menu__button {
  cursor: pointer;
  margin-right: 12px;
}
</style>
