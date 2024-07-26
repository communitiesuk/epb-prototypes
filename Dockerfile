FROM node:20-slim

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# copying all the files from your file system to container file system
COPY package.json .

# copy other files as well
COPY ./ .

# install all dependencies
RUN npm install

#expose the port
EXPOSE 80 443

CMD ["npm", "run", "dev"]