<script setup>
import { config } from '../../config'
</script>

<template>
  <h2>Choose your escape room</h2>
  <p>&nbsp;</p>
  <div class="rooms">
    <template v-for="room in config.rooms">
      <a :href="'/room/' + room.id">{{ room.name }}</a>
    </template>
  </div>
</template>

