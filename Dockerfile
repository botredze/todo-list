FROM node:18.12.1

WORKDIR /app

COPY ./package.json ./package-lock.json /app/

RUN npm install

COPY . /app/

EXPOSE 3000

CMD ["npm", "run", "start:dev"]