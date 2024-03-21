<script setup>
import { config } from '../../config'
</script>

<template>
    <h2>Choose your chatbot</h2>
    <div class="rooms">
      <template v-for="room in config.rooms">
        <a :href="'/room/' + room.id">{{ room.escape_room_name }}</a>
      </template>
    </div>
</template>

