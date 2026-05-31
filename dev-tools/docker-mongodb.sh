
container_name='wind-in-mind-mongodb'


docker stop "$container_name" && docker rm "$container_name"
docker run -d --name "$container_name" -p 27017:27017 mongo:latest

echo "\nДатаБейс!)ы\n"