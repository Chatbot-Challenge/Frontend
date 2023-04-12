# Chatbot Challenge Platform

This repository contains code for the chatbot challenge platform. It contains these folders:

* **chatbot-challenge-frontend** The frontend of the chatbot challenge.
* **escape-rooms** The escape rooms which are Rasa agents. This folder contains the definitions of these dialog agents.
* **docker** Docker files to start the system. This does not work currently.

## Installation

### Install Rasa:

Please refer to the official Rasa documentation for installation instructions. We use Rasa 3.4.2.

[https://rasa.com/docs/rasa/installation/installing-rasa-open-source/](https://rasa.com/docs/rasa/installation/installing-rasa-open-source/
)

Please use Python 3.8.10 to ensure compatibility with our server. Usually it makes sense to create a virtual environment for your python installation, such as [conda](https://www.anaconda.com/). In this way you can have multiple different Python environemnts in parallel that do not interfere with each other, in case you need Python for another project also.

### Install Frontend:

First install nodejs and npm: https://nodejs.org/en/download/

```
git clone https://github.com/Chatbot-Challenge/Frontend.git
cd Frontend/chatbot-challenge-frontend/
npm install
```

## Start it

### Start a Rasa server

We assume that you already trained a model. The -m parameter specifies the path to the trained model.

```
rasa run \
    --enable-api  \
    --cors "*" \
    -m escape-rooms/rasa-default-bot/models/20230203-131843-strong-chino.tar.gz \
    -p 5005
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
    "background-image": "under-the-sea.jpg",
    "api-url": "http://localhost:5005",
    "welcome-message": "You are under the sea."
}
```

The fields are

* name: The name that will be displayed on the landing page of the website.
* id: The unique id of this bot. Must be URL safe, so best use only alpha numeric characters and hyphens.
* background-image: An optional background image
* api-url: The URL of the Rasa server
* welcome-message: The first message that will be displayed to the user.
