FROM node:lts-alpine as build

WORKDIR /app

ARG VITE_BASE_URL

ENV VITE_BASE_URL=$VITE_BASE_URL

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /app/dist /bin/www
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]