# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app files to the working directory
COPY . .

# Build the app
RUN npm run build

# Expose port 3000 for the app to listen on
EXPOSE 3000

# Command to run the app
CMD ["npm", "start"]
