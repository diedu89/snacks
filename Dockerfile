FROM node:9-alpine

RUN mkdir /app
WORKDIR /app
COPY app/package.json /app
RUN npm install

COPY app /app

EXPOSE 3000
ENV DEBUG=app:*
CMD ["npm", "start"]