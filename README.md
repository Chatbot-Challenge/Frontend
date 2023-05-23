# Chatbot Challenge Platform

This repository contains code for the chatbot challenge platform. It contains these folders:

* **chatbot-challenge-frontend** The frontend of the chatbot challenge.
* **escape-rooms** The escape rooms which are Rasa agents. This folder contains the definitions of these dialog agents.


## Installation
Fixed Versions for bot:
 * python `3.8.10`
 * rasa `3.4.2`

For local Frontend-test:
 * node-js (v20.2.0 ), npm ( 9.6.6)

 

### Install Rasa:

Please refer to the official Rasa documentation for installation instructions.

[https://rasa.com/docs/rasa/installation/installing-rasa-open-source/](https://rasa.com/docs/rasa/installation/installing-rasa-open-source/
)

Usually it makes sense to create a virtual environment for your python installation, such as [Conda](https://www.anaconda.com/). In this way you can have multiple different Python environemnts in parallel that do not interfere with each other, in case you need Python for another project also.

### Install Frontend:

First install nodejs and npm: https://nodejs.org/en/download/

```
git clone https://github.com/Chatbot-Challenge/Frontend.git
cd Frontend/chatbot-challenge-frontend/
npm install
```

## Start it

### Start a local Rasa server

We assume that you already trained a model. The -m parameter specifies the path to the trained model.

```sh
  cd <into-your-rasa-bot> 
  # or try out the example bot / that should work for you also
  cd Frontend/escape-rooms/example-bot
```
### Rasa  Server
* start **rasa server** 
* explicitly set port to `5005`
* make sure that api is available and reachable
```sh
rasa run \
    --enable-api  \
    --cors "*" \
    -p 5005
```
### Rasa Actions 
* in a second terminal
* start the **actions server**

```sh
rasa run actions
```

### Test with curl

 * check rasa server with `curl`
 * on **Linux** run : 
    ```sh
    curl -X POST -i http://0.0.0.0:5005/webhooks/rest/webhook -d '{"sender": "oha!", "message": "oha?"}'
    ```
 * on **Win$** run:
    ```sh
    curl -X POST -i http://localhost:5005/webhooks/rest/webhook -d  " { \"sender\":\"oha\" , \"message\": \"hi\" } "
    ```
  * you should see something like :
    ```json 
    [{"recipient_id":"oha","text":"You can interact with: cell"}]
    ```

### prepare frontend-config for local bot
* In `Frontend/chatbot-challenge-frontend/config`
add a new room to the list of rooms :´
* make sure that you use the same port as specified above (`rasa run -p 5005...`)
```js
config = {
    "name": "hello world",
    "rooms": [
        {
            "escape_room_name": "Lokal Demo",
            "chatbot_name": "local-bot",
            "user_name": "Oha Oha Oha",
            "messagebox_caption": "hmmm?...",
            "send_button_caption": "oha?",
            "user_name": "you",
            "id": "lokal",
            "background-image": "local-bot-background-image.jpg",
            "api_url": "http://localhost:5005",
            "welcome-message": "does it wörk?"
        },
      ...
      ]
    };
``` 
### Start the frontend

```
cd chatbot-challenge-frontend
npm run dev
```

Open `http://localhost:5173/` in your web browser to see the user interface.

## Configuration

chatbot-challenge-frontend/config.js contains the bot configuration. The configuration format is a JSON dictionary.

```
{
    "name": "Under the sea",
    "id": "under-the-sea",
    "background-image": "under-the-sea-background-image.jpg",
    "api-url": "http://localhost:5005",
    "welcome-message": "You are under the sea."
}
```

Here is a list of available configuration parameters:

| Parameter | Description | Required | Example Value |
|-----|-----|-----|-----|
| api_url | URL of the Rasa HTTP API | required | https://vm014.qu.tu-berlin.de/api5005 | 
| id | Unique ID of the escape room. Please derive this from your team name. | required | under-the-sea | 
| escape_room_name | Name of the escape room | required | Under the sea | 
| chatbot_name | Name of the chatbot that is displayed in the chat bubbles. | optional, default is "Game Master" | Neptun | 
| user_name | Name of the user that is displayed in the chat bubbles | optional, default is "You"| Erika Musterfrau | 
| messagebox_caption | Caption of the text input box in the chat window. | optional, default is "Type here what you want to do..." | Type here... | 
| send_button_caption | Caption of the send button in the chat | optional, default="Do" | Swim | 
| background-image | Name of the background image file in the folder public/background-images/. Please prefix with your id parameter to ensure that the filename is unique. | optional | under-the-sea.jpg | 
| welcome-message | First message of the chatbot when the user starts the game | optional | You are under the sea." |
