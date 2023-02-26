# FROM node:16

# WORKDIR /src

# COPY package*.json ./

# COPY .env ./

# RUN npm install 

# COPY . . 

# EXPOSE 3000
# EXPOSE 3306

# CMD ["npm", "start"]

FROM node:16

WORKDIR /src

COPY package.json .

COPY .env ./

RUN npm install

EXPOSE 3000

# CMD ["npm", "start"]
CMD /wait-for-it.sh db:3306 -- npm start

COPY . .