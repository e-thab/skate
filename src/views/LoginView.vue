<template>
  <div class="login">
    <LoginPage />
  </div>
</template>

<script setup lang="ts">
/**
 * @author Sinclair DeYoung 
 * @purpose Login page view path
 * @date Apr 1, 2024
 */
import LoginPage from '../components/LoginPage.vue'
const components = { LoginPage }
</script>

<style>
.login {
  min-height: calc(100vh - 60px);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
