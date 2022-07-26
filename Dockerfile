FROM node:17-alpine

WORKDIR /app

COPY package.json .

RUN yarn

COPY . .

RUN yarn msw init public/ --save

EXPOSE 3000

CMD ["yarn", "start"]