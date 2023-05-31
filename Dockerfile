FROM node:14.16.0
WORKDIR /app
COPY package.json /app
COPY . /app
RUN npm install
CMD npm start