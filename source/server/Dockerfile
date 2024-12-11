FROM node:20

WORKDIR /app

COPY package*.json ./
COPY .env* ./

RUN npm install

COPY dist /app/dist

CMD [ "npm", "run", "serve" ]