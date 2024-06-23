FROM node:20.14-alpine3.19

WORKDIR /MEGASHID
COPY package*.json ./
RUN npm install 
COPY . .
ENV PORT=3000
EXPOSE ${PORT}
CMD ["node", "./server.js"]
