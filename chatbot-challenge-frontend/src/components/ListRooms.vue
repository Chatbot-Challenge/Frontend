<script setup>

function buildHTML(rooms){
  let parentDiv = document.getElementById("listrooms");

  for( var i=0; i<rooms["rooms"].length; i++){
    let room = rooms["rooms"][i];
    let html = document.createElement("a");
    html.setAttribute("href", "/room/" + room["id"]);
    html.innerHTML = room["escape_room_name"];
    parentDiv.appendChild(html);
  }
}

function listRooms(rooms){

  let urls = []
  for( var i=0; i<rooms["rooms"].length; i++ ){
    if( rooms["rooms"][i]["bot_base_url"] != undefined ){
      let url = rooms["rooms"][i]["bot_base_url"] + "/static/config.json" + "?r=" + Math.random();
      urls.push(fetch(url));
    }
  }

  Promise.all(urls)
    .then((responses) => Promise.all(responses.map((r) => r.json())))
    .then((jsons) => {
      var responseIndex = 0;
      for( var i=0; i<rooms["rooms"].length; i++ ){
        if( rooms["rooms"][i]["bot_base_url"] != undefined ){
          for (const [key, value] of Object.entries(jsons[responseIndex])) {
            rooms["rooms"][i][key] = value;
          }
          responseIndex += 1;
        }
      }
      buildHTML(rooms);
    })
    .catch((error) => console.error("An error occurred:", error));

    if(urls.length == 0){
      buildHTML(rooms);
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

