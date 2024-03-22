let config;

let default_llm_parameter = {
    "max_new_tokens": 100
}
config = {
    "rooms": [
        {
            "escape_room_name": "Climate Change Denier Bot",
            "chatbot_name": "Climate Change Denier",
            "messagebox_caption": "Say something",
            "send_button_caption": "Say",
            "user_name": "You",
            "id": "climate-change-denier",
            "background-image": "iceberg.jpg",
            "api_url": "http://localhost:5000",
            "welcome-message": "Climate change is a lie!",
            "llm_parameters": default_llm_parameter,
            "explanation_text": "Setting: This chatbot denies climate change. If you tell the chatbot that there is scientific evicence for climate change the mood will get angry."
        },
        {
            "escape_room_name": "I dont like turbans",
            "chatbot_name": "Chatbot",
            "messagebox_caption": "Say something",
            "send_button_caption": "Say",
            "user_name": "You",
            "id": "i-dont-like-turbans",
            "background-image": "village_pub.png",
            "api_url": "http://localhost:5000",
            "welcome-message": "They should take off their turbans when they come here! And then stop living lazily on our benefits and groping our wives!",
            "llm_parameters": default_llm_parameter,
            "explanation_text": "Setting: ...."
        },
    ]
};

export { config }



