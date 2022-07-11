FROM node:14-slim

WORKDIR /code

COPY package.json package-lock.json ./
RUN npm install

COPY . .

ENV NODE_ENV $NODE_ENV
ENV VERSION "/api/v1"

EXPOSE $PORT

RUN npm run build-ddd
CMD ["node", "/code/dist/src/apps/{{TEMPLATE}}/backend/start"]
