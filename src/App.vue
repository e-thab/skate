<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router'
import NavBar from './components/NavBar.vue'
import { isLoggedIn } from '@/components/Auth'

const router = useRouter();

if(!isLoggedIn){
  router.push('/login');
}
</script>

<template>
  <div class="content-wrapper">
    <NavBar />
    <RouterView />
  </div>
</template>

<style>
</style>
