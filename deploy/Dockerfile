FROM node:12.0 as builder

WORKDIR /usr/src/app

ARG API_URL

COPY . .

RUN yarn install
RUN yarn build

FROM nginx:stable-alpine

COPY --from=builder /usr/src/app/build /usr/share/nginx/html
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
