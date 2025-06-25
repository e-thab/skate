<template>
    <div class="bounty">
      <Bounty />
    </div>
  </template>
  
  <script setup lang="ts">
  import Bounty from '../components/Bounty.vue'
  const components = { Bounty }
  </script>
  
  <style>
  .bounty {
    min-height: calc(100vh - 60px);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  </style>
  