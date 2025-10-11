FROM node:22.20.0-alpine3.21 AS build
WORKDIR /app
COPY package*.json ./

RUN npm install
COPY . .

RUN npm run build

FROM nginx:alpine
RUN apk add npm
RUN npm install -g @import-meta-env/cli

WORKDIR /usr/share/nginx/html
RUN rm -rf ./*

COPY --from=build /app/dist .
COPY --from=build /app/.env.example .

ENV API_BASE_URL=""

ENTRYPOINT npx import-meta-env -x /usr/share/nginx/html/.env.example -p /usr/share/nginx/html/index.html && nginx -g 'daemon off;'