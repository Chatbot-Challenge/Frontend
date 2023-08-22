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
        <h1>Chatbot Challenge</h1>
        
        <ul class="nav">
          <li>
            <RouterLink to="/">Escape Rooms</RouterLink>
          </li>
          <li>
            <RouterLink to="/about">&Uuml;ber uns</RouterLink>
          </li>
          <li>
            <RouterLink to="/imprint_Data">Impressum und Datenschutzerkl&auml;rung</RouterLink>
          </li>
        </ul>
        <p>&nbsp;</p>
      <RouterView />
    </div>
  </div>
</template>

