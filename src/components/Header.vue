<!-- Header.vue -->
<template>
  <header>
    <div class="wrapper">
      <nav class="navbar" :class="{ 'full-screen': !showTitle }">
        <h2>
        <RouterLink to="/" class="button">Home</RouterLink>
        <RouterLink to="/login" class="button">Login</RouterLink>
        <RouterLink to="/profile" class="button">Profile</RouterLink>
        <RouterLink to="/events" class="button">Events</RouterLink>
        </h2>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
const showTitle = window.innerWidth >= 1024 // Adjust the breakpoint as needed
</script>

<style scoped>
/* Header component styles go here */
header {
  position: fixed;
  display: flex;
  place-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background-color: #333;
}
.button {
  color: white;
}
.button:hover {
  color: rgb(13, 226, 180);
  background-color: transparent;
}

.button:active {
  color: black;
}
.button:focus {
  color: dimgray;
}

.wrapper {
  max-width: 1024px; /* Set a max-width for the wrapper */
  margin: 0 auto; /* Center the wrapper */
  padding: 10px;
}

.full-screen {
  text-align: center;
}


@media (min-width: 30000px) {
  header {
    
  }

  .wrapper {
    /* margin-top: 18px; Adjust as needed */
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  .navbar {
    /* text-align: left; */
    /* margin-left: -1rem; */
    /* font-size: 1rem; */
    /* color: white; */
    /* padding: 1rem 0; */
    /* margin-top: 1rem; */
    color: blue;
  }
}

</style>
