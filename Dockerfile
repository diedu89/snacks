FROM node:6-alpine

RUN mkdir /home/node/app
WORKDIR /home/node/app
COPY app/package.json .
RUN npm install
COPY app .

RUN chown node:node . -R

EXPOSE 3000
ENV DEBUG=app:*
USER node

CMD ["npm", "run", "dev"]