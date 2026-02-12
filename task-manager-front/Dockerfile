FROM node:20-alpine
WORKDIR /app

COPY package.json package-lock.json* ./

COPY . .

RUN npm install

EXPOSE 4300

CMD ["npm", "start", "--", "--host=0.0.0.0"]