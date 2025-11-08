# Full Stack Deployment

this is for the app with backend frontent and deployment on hostinger

## Server is as Backend

``npm init -y`` // for installation  
- update type module // to use as import not require
`npm i express cors`
- 'script': 'node index.js'


## Client is as Frontend
`npm create vite@latest .`

## Proxy VS CORS
when frontend communicate with backend on same domain and same port
CORS is the error when domain or port are diffenents

#### Proxy
settings on the frontend config traget the server url {only for dev mode}

    proxy:{
        "/api":{
            target:"http:localhost:4000",
            crossOrigin:true
        }
    }
    update use "/api/message"

#### CORS
```
app.use(cors({
    origin: ['http://localhost:5174', 'http://localhost:5173', 'http://localhost:3000'], // Add prod urls when deploying
    methods: ['GET', 'POST'], // Specify allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
    credentials: true, // Enable cookies and credentials
}));
```

## Docker Backend

   create new file Dockerfile

```
FROM node:22-alpine  
WORKDIR /app  
COPY package*.json ./  
RUN npm install
COPY . .
EXPOSE 4000
CMD ["npm", "start"]
```
Build and Run
Build `dcoker buildx build -t express-server .`
Run `docker run -p 4000:4000 express-server` 

Port binding issue Fixed

```
app.listen(PORT, "0.0.0.0",() => console.log(`Server is running on PORT ${PORT}`))
```

## Docker Frontend
To run the frontend commands
```
# Build stage
FROM node:22-alpine AS BUILD
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:22-alpine
WORKDIR /app
RUN npm install -g serve // Install serve to serve static files
COPY --from=BUILD /app/dist ./dist
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"] // Serve the static files on port 3000

```

## Docker Compose
create docler-compose.yml // to run the single file to run both backend and frontend

```
# Build stage
FROM node:22-alpine AS BUILD
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:22-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=BUILD /app/dist ./dist
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"] 

```

To run the Docker compose.yml
```docker compose up```
 
### Github
git map with folder...

```
git add .
git commit -m "message"
git remode ...
git push
```

### VPS (Hostinger)

VPS machine 
- ip address // 
-- webserver (caddy/nginx)
-- manage > terminal/SSH

`sudo apt update -y`
```
supt apt install git -y
git --version
cd /home/ubuntu
git clone gitprojectpath
cd folder to compose.yml
cd chmod +x docker-compose.yml // to get the excutable permissions
docker compose up --build
```

check the ip  
check the api  
check the domain/host  

docker ubuntu install (doc.docker.com)
 - install using apt repo
 - run the commands

`docker --version`