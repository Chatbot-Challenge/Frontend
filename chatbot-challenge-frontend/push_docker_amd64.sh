cd "$(dirname "$0")"

docker build -t csd-frontend-amd64 --platform linux/amd64/v3 .
img="localhost:6000/csd-frontend-amd64"
docker tag csd-frontend-amd64 $img
docker push $img


