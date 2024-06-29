# images-ai

Browse through a collection of imaginative and visually stunning images generated DALL-E AI

<img width="1437" alt="Screen Shot 2023-03-30 at 01 12 27" src="https://github.com/rianmandala/images-ai/assets/60568628/2d8c23a4-5a46-4883-bcda-1219f757687c">

## Tech use

- DALL-E AI
- Claudinary
- Firebase auth
- Mongo DB
- Express
- React js
- Ant design
- Tailwind css

## Usage

### Env Variables

Create a .env file in then root and add the following

```
PORT = 4000

OPENAI_API_KEY = Your open AI API KEY

MONGODB_URL = your mongo DB URL

CLAUDINARY_CLAUD_NAME = your claudinary name
CLAUDINARY_API_KEY = your claudinary api key
CLAUDINARY_API_SECRET = your claudinary api secret
```

### Firebase auth

replace firebase.config with your own config

### Install Dependencies (client & server)

```
install client and server => npm run build in root project
or you can install individually:
cd server => npm install
cd client => npm install
```

### Run

```
# Run client & server
npm run dev

# Run server only
npm run server

# Run client only
npm run client
```

## Build & Deploy

```
# Create frontend prod build
cd frontend
npm run build
```
