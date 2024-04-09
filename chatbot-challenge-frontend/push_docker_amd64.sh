cd "$(dirname "$0")"

docker build -t chatbot-challenge-frontend-amd64 --platform linux/amd64/v3 .
img="vm014.qu.tu-berlin.de:6000/chatbot-challenge-frontend-amd64"
docker tag chatbot-challenge-frontend-amd64 $img
docker push $img


