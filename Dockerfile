FROM node:9-alpine

RUN mkdir /home/node/app
WORKDIR /home/node/app
COPY app/package.json .
RUN npm install
COPY app .

RUN chown node:node . -R

EXPOSE 3000
ENV DEBUG=app:*
CMD ["npm", "start"]