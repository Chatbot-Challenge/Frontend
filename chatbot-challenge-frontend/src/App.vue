<script setup>
import { RouterLink, RouterView } from 'vue-router'
import ListRooms from './components/ListRooms.vue'
</script>

<template>
  <header>
      <div class="wrapper">
          <div class="header">
          <h1>Chatbot Challenge</h1>
          <ul class="nav">
            <li>
              <RouterLink to="/">Escape Rooms</RouterLink>
              </li>
            <li>
              <RouterLink to="/about">About</RouterLink>
              </li>
          </ul>
          <p>&nbsp;</p>
          <p>&nbsp;</p>
        </div>
        <RouterView />

      </div>
  </header>

</template>

