<script>
import { config } from '../../config'

// show a single message
function displayMessage(msg, sender) {
  if (sender != "user" & sender != "bot") {
    console.error("bad sender " + sender);
  }

  let div = $("<div>")
    .addClass("chat_bubble")
    .addClass(sender)
    .appendTo($(".chat"))
    .html(msg);

  let name = "Game Master";
  if (sender == "user") {
    name = "You"
  }
  $("<div>")
    .addClass("name")
    .html(name)
    .prependTo(div);
}

var isLoadingChatMessage = false;

// send a message to rasa
function sendMessage(that) {
  let message = $(".messagebox").val();

  if( message.trim() == "" ){
    return;
  }

  if( isLoadingChatMessage ){
    return;
  }
  isLoadingChatMessage = true;
  let url = that.room["api-url"] + "/webhooks/rest/webhook";

  displayMessage(message, "user");
  let data = {
    "sender": "test_user",
    "message": message
  };

  $.ajax({
    url: url,
    type: 'POST',
    data: JSON.stringify(data),
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    async: false,
    success: function (result) {
      isLoadingChatMessage = false;
      $(".messagebox").val("");
      for (var i = 0; i < result.length; i++) {
        if (result[i]["text"] != "undefined") {
          displayMessage(result[i]["text"], "bot");
          window.scrollTo(0, document.body.scrollHeight);
        }
      }
    },
    error: function(result){
      isLoadingChatMessage = false;
      alert("error connecting to the server.");
    }
  });
}

export default {
  created() {
    this.room = null;
    for (var i = 0; i < config.rooms.length; i++) {
      if (config.rooms[i]["id"] == this.$route.params.roomId) {
        this.room = config.rooms[i];
      }
    }

    if (this.room != null) {
      if (this.room["background-image"] != undefined) {
        let path = "url(/public/background-images/" + this.room["background-image"] + ")";
        $("body").css("background-image", path);
      }
    }
    let that = this;

    $(document).ready(function () {

      // display welcome message
      displayMessage(that.room["welcome-message"], "bot");

      // listen to enter key on message input field
      $('.messagebox').keypress(function (e) {
        if (e.keyCode == 13) {
          sendMessage(that);
        }
      });

      // send button click function
      $(".send_button").click(function (e) {
        e.preventDefault();
        sendMessage(that);
      });

      $(".header").hide();
    });
  }
};
</script>

<template>
  <div class="chat">
    <div>
      <a href="/" class="close_room">
        <img src="/public/close.png" alt="x" />
      </a>
    </div>
  </div>
  <div class="separator"></div>
  <div class="input_area row footer">
    <input type="text" class="messagebox" placeholder="Type here what you want to do..." />
    <input type="button" value="Do" class="send_button" />
  </div>

</template>
