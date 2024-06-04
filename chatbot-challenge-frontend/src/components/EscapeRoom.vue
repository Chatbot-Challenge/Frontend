<script>
import { v4 as uuidv4 } from 'uuid';

// show a single message
var isLoadingChatMessage = false;

export default {

  methods: {

    async init() {
      let that = this;
      this.room = null;

      let config = null;
      await fetch("/user-assets/config.json?r=" + Math.random())
        .then((response) => response.json())
        .then((json) => config = json);

      for (var i = 0; i < config.rooms.length; i++) {
        if (config.rooms[i]["id"] == this.$route.params.roomId) {
          this.room = config.rooms[i];
        }
      }

      let defaults = {
        "messagebox_caption": "Say something...",
        "send_button_caption": "Say",
        "explainer": ""
      }
      for (const [key, value] of Object.entries(defaults)) {
        if (this.room[key] == undefined) {
          this.room[key] = value;
        }
      }

      document.getElementById("explainer").innerHTML = that.room["explanation_text"];
      that.displayMessage(that.room["welcome-message"], "bot");

      document.getElementById("input_text").setAttribute("placeholder", this.room["messagebox_caption"]);
      document.getElementById("send_button").value = this.room["send_button_caption"];

      // initialize success dialog
      document.getElementById("success_dialog_text").innerHTML = that.room["success-message"];

      document.getElementById("success_continue").addEventListener("click", (event) => {
        that.hideSuccess();
        event.preventDefault();
      });
      document.getElementById("success_leave").addEventListener("click", (event) => {
        document.location.href = "/";
        event.preventDefault();
      });
      document.getElementById("success_restart").addEventListener("click", (event) => {
        document.location.reload();
        event.preventDefault();
      });
      this.dialogSucccesful = false;

      // example code how to add some messages on startup      
      // that.displayMessage("Climate change is a lie!", "bot");
      // that.displayMessage("Climate change is proven scientific evidence.", "user");
      // let messages = that.collect_messages();
      // that.chat_request(messages);            

      // listen to enter key on message input field
      $('.messagebox').keypress(function (e) {
        if (e.keyCode == 13) {
          that.sendMessage();
        }
      });

      // send button click function
      $(".send_button").click(function (e) {
        e.preventDefault();
        that.sendMessage();
      });
    },

    // parse previous conversation
    collect_request_data() {
      var messages = []
      var elements = document.getElementsByClassName("chat_bubble");
      [].forEach.call(elements, function (element) {

        var name_elem = element.getElementsByClassName("name")[0];
        var sender = name_elem.innerHTML.trim();
        if (sender == "You") sender = "User"
        // sender = element.getElementsByClassName("name")[0].innerHTML.trim();
        var msg = element.getElementsByClassName("message")[0].innerHTML.trim();
        messages.push({
          "sender": sender,
          "message": msg
        });
      });

      let request_data = {
        "messages": messages,
        "llm_parameters": this.room["llm_parameters"],
        "session_id": this.session_id,
        "chatbot": this.room["id"]
      }

      return request_data
    },

    async chat_request(messages) {
      // from here https://blog.pamelafox.org/2023/08/fetching-json-over-streaming-http.html
      let url = this.room["api_url"];
      
      let uid = this.$route.query.uid
      if(uid != undefined){
        url += "?uid=" + uid
      }

      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(messages),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      });

      if (!response.ok) {
        alert("Cannot connect to server");
        return;
      }

      const readableStream = response.body;
      const reader = readableStream.getReader();
      var runningText = "";
      this.displayMessage("", "bot");

      var output = document.getElementsByClassName("chat_bubble");
      output = output[output.length - 1];
      output = output.getElementsByClassName("message")[0];
      //messages_div = document.getElementById("messages");

      let header = null;
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        var text = new TextDecoder("utf-8").decode(value);
        const objects = text.split("\n");
        for (const obj of objects) {

          try {
            if (header == null && obj.substring(0,6) == "header") {
              header = -1;
              header = JSON.parse(obj.substring(7));
            } else {
              var s = obj.substring(5);
              let result = JSON.parse(s);
              runningText += result["token"]["text"];
              output.innerHTML = runningText;
              window.scrollTo(0, document.body.scrollHeight);
            }
          } catch (e) {
            // Not a valid JSON object
          }
        }
      }
      console.log(header);
      if (header != null && header != -1 && header["dialog_success"]) {
        this.displaySuccess();
      }
      isLoadingChatMessage = false;
    },

    displaySuccess() {
      if( this.dialogSucccesful ){
        return;
      }
      this.dialogSucccesful = true;
      this.createBalloons(30);
      document.getElementById("success_dialog").style.display = "block";
      document.getElementById("success_dialog_overlay").style.display = "block";
      document.getElementById("balloon-container").style.display = "flex";
    },

    hideSuccess(){
      document.getElementById("success_dialog").style.display = "none";
      document.getElementById("success_dialog_overlay").style.display = "none";
      document.getElementById("balloon-container").style.display = "none";
    },

    displayMessage(msg, sender) {
      if (sender != "user" & sender != "bot") {
        console.error("bad sender " + sender);
      }

      let div = $("<div>")
        .addClass("chat_bubble")
        .addClass(sender)
        .appendTo($(".chat"));

      $("<div>")
        .addClass("message")
        .html(msg)
        .prependTo(div);

      let name = "";
      if (sender == "user") {
        if (this.room["user_name"] != undefined) {
          name = this.room["user_name"];
        } else {
          name = "You";
        }
        if (this.room["user-avatar"] != undefined) {
          let img = $("<img/>")
            .attr("src", "/user-assets/" + this.room["user-avatar"])
            .addClass("avatar")
            .addClass("avatar-right")
            .appendTo(div)
        }
      } else {
        if (this.room["chatbot_name"] != undefined) {
          name = this.room["chatbot_name"];
        } else {
          name = "Game Master";
        }
        if (this.room["chatbot-avatar"] != undefined) {
          let img = $("<img/>")
            .attr("src", "/user-assets/" + this.room["chatbot-avatar"])
            .addClass("avatar")
            .addClass("avatar-left")
            .appendTo(div)
        }
      }
      $("<div>")
        .addClass("name")
        .html(name)
        .prependTo(div);


    },
    // send a message to the chat server
    sendMessage() {
      let message = $(".messagebox").val();
      $(".messagebox").val("");

      if (message.trim() == "") {
        return;
      }

      if (isLoadingChatMessage) {
        return;
      }
      isLoadingChatMessage = true;
      let url = this.room["api_url"] + "/api/chat";

      this.displayMessage(message, "user");

      let messages = this.collect_request_data()
      this.chat_request(messages);
    },

    // balloon code from https://codepen.io/Jemimaabu/pen/vYEYdOy
    getRandomStyles: function () {
      function random(num) {
        return Math.floor(Math.random() * num);
      };
      var r = random(255);
      var g = random(255);
      var b = random(255);
      var mt = random(200);
      var ml = random(50);
      var dur = random(5) + 5;
      return `
    background-color: rgba(${r},${g},${b},0.7);
    color: rgba(${r},${g},${b},0.7); 
    box-shadow: inset -7px -3px 10px rgba(${r - 10},${g - 10},${b - 10},0.7);
    margin: ${mt}px 0 0 ${ml}px;
    animation: float ${dur}s ease-in infinite
    `;
    },

    createBalloons: function (num) {
      const balloonContainer = document.getElementById("balloon-container");
      for (var i = num; i > 0; i--) {
        var balloon = document.createElement("div");
        balloon.className = "balloon";
        balloon.style.cssText = this.getRandomStyles();
        balloonContainer.append(balloon);
      }
    },

    removeBalloons: function () {
      const balloonContainer = document.getElementById("balloon-container");
      balloonContainer.style.opacity = 0;
      setTimeout(() => {
        balloonContainer.remove()
      }, 500)
    }

  },

  created() {
    this.session_id = uuidv4();

    if (this.room != null) {
      if (this.room["background-image"] != undefined) {
        //let path = require("/public/background-images/" + this.room["background-image"]);
        let path = "url(/user-assets/" + this.room["background-image"] + ")";
        $("body").css("background-image", path);
      }
    }

    let that = this;
    this.init();
    $(document).ready(function () {
      $(".header").hide();
      document.getElementById("input_text").focus();
    });
  },
};
</script>

<template>
  <div class="chat">
    <div>
      <a href="/" class="close_room">
        <img src="/public/close.png" alt="x" />
      </a>
    </div>
    <div class="explainer" id="explainer"></div>
  </div>
  <div class="separator"></div>
  <div class="input_area row footer">

    <input type="text" class="messagebox" id="input_text" />
    <input type="button" class="send_button" id="send_button" />
  </div>

  <div id="success_dialog_overlay"></div>
  <div id="balloon-container"></div>
  <div class="success_dialog" id="success_dialog">
    <div id="success_dialog_text"></div>
    <div class="buttons">
      <a href="#" id="success_continue">Continue chatting</a>
      <a href="#" id="success_leave">Leave dialog</a>
      <a href="#" id="success_restart">Restart dialog</a>
    </div>
  </div>

</template>
