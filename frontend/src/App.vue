<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>

  <header>
    <h1>e-commerce</h1>
    <h2>Home</h2>
  </header>

  <RouterView />  

</template>

<style>
/* Estilos básicos para que no se vea todo pegado */
nav { padding: 20px; background: #f4f4f4; margin-bottom: 20px; }
main { padding: 20px; }
</style>
