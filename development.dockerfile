FROM node:10.15-jessie
ARG NPM_TOKEN
WORKDIR /app
COPY . ./
RUN yarn
RUN rm .npmrc
CMD yarn start:docker
