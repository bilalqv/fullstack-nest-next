# Use a Node.js base image
FROM node:21

# Set the working directory inside the container
WORKDIR /nest-app

# Copy package.json and package-lock.json to the working directory
COPY package.json .

# Install project dependencies
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
    then npm install; \
    else npm install --only=production; \
    fi

# Copy the rest of the application files to the working directory
COPY . .

# Expose the port the app runs on
ENV PORT=3003
EXPOSE $PORT

# Command to start the application
CMD ["npm", "run", "start:dev"]