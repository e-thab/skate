<template>
  <nav class="navbar" :class="{ 'full-screen': isFullScreen }">
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/events">Events</RouterLink>
    <RouterLink to="/bounty">Bounty</RouterLink>
    <RouterLink v-if="!activeUser.loggedIn" to="/login">Log in</RouterLink>
    <a v-else @click="logoutClick" style="cursor: pointer;">Log out</a>
    <!-- <span v-else>test</span> -->
  </nav>
</template>

<script setup lang="ts">
/**
 * @author Sinclair DeYoung 
 * @purpose Token system for logged in users to track them logged in on different pages
 * @date Apr 1, 2024
 */
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { activeUser } from '@/stores/activeUser';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'vue-router';

const router = useRouter()

const isFullScreen = ref(window.innerWidth >= 1026)

const handleResize = () => {
  isFullScreen.value = window.innerWidth >= 1026
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})

async function logoutClick() {
  if (confirm("Are you sure you want to log out?")) {
    // activeUser.logOut()
    const { error } = await supabase.auth.signOut()
      if (error) {
        console.error('Error logging out: ', error)
      } else {
        console.log("Logging out")
        router.push('/')
      }
  } else {
    console.log("Cancelling")
  }
}
</script>

<style scoped>
/* Nav component styles go here */
.navbar {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background-color: #333;
  color:white;
  padding: 10px;
  margin-top: 0;
  display: flex;
  place-items: center;
  justify-content: space-around;
  transition:
    background-color 0.3s,
    color 0.3s;
}

.navbar a {
  letter-spacing: 0.5px;
  font-weight: 500;
  color: inherit;
  background-color: transparent;
}
.navbar a:hover {
  text-shadow: 0px 0px 2px rgb(71, 240, 184, 0.6);
  color: rgba(13, 226, 180);
  text-decoration-color: darkcyan;
}
.navbar a.router-link-exact-active {
  text-shadow: 0px 0px 2px rgb(71, 240, 184, 0.6);
  color: rgba(13, 226, 180);
  text-decoration: rgb(50, 138, 160) wavy underline;
  text-underline-offset: 2px;
  text-decoration-skip-ink: none;
  text-decoration-thickness: 2px;
}

@media (max-width: 1024px) {
  .navbar {
    font-size: medium;
  }
}

@media (min-width: 1024px) {
  .navbar {
    font-size: larger;
  }
}
</style>
