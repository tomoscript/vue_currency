<template>
  <v-footer dark padless class="pt-2">
    <v-card-text class="white--text">
      &copy; {{ new Date().getFullYear() }} — <strong> Rudi Hartomo </strong>
    </v-card-text>
  </v-footer>
</template>

<script>
export default {
  name: "FooterComponent",
};
</script>

<style scoped></style>
