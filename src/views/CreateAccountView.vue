<template>
  <div class="create-account">
    <CreateAccountPage />
  </div>
</template>
  
<script setup lang="ts">
/**
 * @author Sinclair DeYoung 
 * @purpose Create account page view path
 * @date Apr 1, 2024
 */
import CreateAccountPage from '../components/CreateAccountPage.vue'
</script>
  
<style>
.create-account {
  min-height: calc(100vh - 60px);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>