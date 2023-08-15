FROM node:18-slim

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# copying all the files from your file system to container file system
COPY package.json .

# install all dependencies
RUN npm install

# copy oter files as well
COPY ./ .


#expose the port
EXPOSE 80 443

CMD ["npm", "run", "dev"]