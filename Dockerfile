FROM node:16

WORKDIR /src

COPY package*.json ./

COPY .env ./

RUN npm install 

COPY . . 

EXPOSE 3306
EXPOSE 3000

CMD ["npm", "start"]