let config;

config = {
    "name": "hello world",
    "rooms": [
        {
            "escape_room_name": "Climate change bot",
            "chatbot_name": "Climate Change Denier",
            "user_name": "Testbot",
            "messagebox_caption": "Say something",
            "send_button_caption": "Say",
            "user_name": "You",
            "id": "climate-change-denier",
            "background-image": "wall.jpg",
            "api_url": "http://localhost:5000",
            "welcome-message": "Climate change is a lie!",
            "llm_parameters": {
                "max_new_tokens":40,
                "stop": [
                    "\n"
                ]
            }
        },
    ]
};

export { config }
