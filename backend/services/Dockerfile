# Base image
FROM node:18-alpine

# Enable Corepack to manage Yarn versions (This comes with Node.js 16.9 and later)
RUN corepack enable

# Create app directory
WORKDIR /app/backend/services

COPY ./backend/services/package.json ./
COPY ./backend/services/yarn.lock ./

# Install app dependencies
# RUN yarn run sls:installProd
# This will allow updating the lockfile if needed
RUN yarn install  

# Bundle app source
COPY ./backend/services .

ENV NODE_ENV production
RUN yarn add @nestjs/cli@9.0.0 --dev && yarn run build && yarn remove @nestjs/cli && yarn cache clean

# Start the server using the production build
CMD [ "node", "dist/main.js" ]
