FROM node:16

WORKDIR /app

# ENV APP_ROOT=/app

COPY ./package.json .
RUN npm i
COPY ./src ./src

CMD [ "npm", "run", "start" ]