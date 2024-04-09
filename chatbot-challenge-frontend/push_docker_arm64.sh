cd "$(dirname "$0")"

docker build -t csd-frontend-arm64 .
img="vm014.qu.tu-berlin.de:6000/csd-frontend-arm64"
docker tag csd-frontend-arm64 $img
docker push $img

