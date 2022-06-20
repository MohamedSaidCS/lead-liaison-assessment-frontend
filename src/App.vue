<template>
  <NavbarComponent/>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script setup>

import NavbarComponent from "@/components/NavbarComponent";
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
