# Node image
FROM node:24

# working directory
WORKDIR /app

# package files
COPY package*.json ./

# install dependencies
RUN npm install

# copy project
COPY . .

# port
EXPOSE 3000

# start command
CMD ["npm", "start"]