cd "$(dirname "$0")"

docker build -t chatbot-challenge-frontend-arm64 .
img="vm014.qu.tu-berlin.de:6000/chatbot-challenge-frontend-arm64"
docker tag chatbot-challenge-frontend-arm64 $img
docker push $img

