<script setup>
import { RouterLink, RouterView } from 'vue-router'
import ListRooms from './components/ListRooms.vue'
</script>

<template>
  <div class="wrapper" v-if="$route.name == 'room'">
      <RouterView />
  </div>
  <div class="wrapper" v-else>
    <div class="content-box">
        <h1>Chatbots to Strengthen Democracy</h1>
        
        <ul class="nav">
          <li>
            <RouterLink to="/">Chatbots</RouterLink>
          </li>
          <li>
            <RouterLink to="/about">About us</RouterLink>
          </li>
          <li>
            <RouterLink to="/imprint_Data">Imprint and data privacy statement</RouterLink>
          </li>
        </ul>
        <p>&nbsp;</p>
      <RouterView />
    </div>
  </div>
</template>

