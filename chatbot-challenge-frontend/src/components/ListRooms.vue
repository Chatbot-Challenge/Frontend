<script setup>

function listRooms(rooms){
  let parentDiv = document.getElementById("listrooms");

  for( var i=0; i<rooms["rooms"].length; i++){
    let room = rooms["rooms"][i];
    let html = document.createElement("a");
    html.setAttribute("href", "/room/" + room["id"]);
    html.innerHTML = room["escape_room_name"];
    parentDiv.appendChild(html);
  }
}

fetch("/user-assets/config.json?r=" + Math.random())
  .then((response) => response.json())
  .then((json) => listRooms(json));


</script>

<template>
    <h2>Choose your chatbot</h2>
    <div class="rooms" id="listrooms">
    <!--  <template v-for="room in config.rooms">
        <a :href="'/room/' + room.id">{{ room.escape_room_name }}</a>
      </template>-->
    </div>
</template>

