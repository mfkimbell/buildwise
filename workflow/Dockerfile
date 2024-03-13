FROM node:14

WORKDIR /app

COPY package*.json ./
COPY tailwind.config.js ./
COPY tsconfig.json ./
COPY postcss.config.js ./

RUN npm install

COPY public /app/public
COPY src /app/src


RUN npm run build
RUN npm install --global serve

EXPOSE 3000

# CMD ["sleep","infinity"]
CMD ["serve", "-s", "build"]