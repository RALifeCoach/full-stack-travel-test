# Start from node base image
FROM  node

# All subsequent commands will now be run from inside this folder
RUN mkdir -p /toptal-server
WORKDIR /toptal-server
# Copy all the code in the local directory into the container’s working directory
COPY ./ ./

# Install dependencies (Make sure to add node_modules to your .dockerignore
# in case you accidentally install locally.)
RUN npm install
# If you are building your code for production
# RUN npm install --only=production

EXPOSE 3010
