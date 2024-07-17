FROM node:22-alpine

WORKDIR /app

RUN apk update && apk add build-base python3

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 5173

CMD ["npm", "start"]
