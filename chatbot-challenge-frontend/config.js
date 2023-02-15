let config;

config = {
    "name": "hello world",
    "rooms": [
        {
            "name": "Under the sea",
            "id": "under-the-sea",
            "background-image": "under-the-sea.jpg",
            "api-url": "http://localhost:5005",
            "welcome-message": "You are under the sea."
        },
        {
            "name": "House of horrors",
            "id": "house-of-horrors",
            "api-url": "http://localhost:5005",
            "welcome-message": "You are in the horror house."
        },
        {
            "name": "Jazz Club",
            "id": "jazz-club",
            "api-url": "http://localhost:5005",
            "welcome-message": "You are in the Jazz Club escape room.",
            "background-image": "jazzclub.png",
        }
    ]
};

export { config }
