<template>
  <v-app>
    <Header />
    <div class="container">
      <router-view />
    </div>
    <Footer />
  </v-app>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default {
  name: "DefaultLayout",
  components: {
    Header,
    Footer,
  },
};
</script>

<style>
.container {
  padding-top: 64px;
  min-height: calc(100% - 64px);
  max-width: 1164px;
  margin: 0 auto;
}
@media screen and (max-width: 600px) {
  .container {
    padding-top: 56px;
    min-height: calc(100% - 56px);
  }
}
</style>
