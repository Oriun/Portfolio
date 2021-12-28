FROM node:17-alpine as BUILD

ARG REACT_APP_API_BASE
ENV REACT_APP_API_BASE $REACT_APP_API_BASE

WORKDIR /app

COPY ./package.json ./package.json

RUN yarn

RUN npx browserslist@latest --update-db

COPY ./ ./

RUN yarn build

FROM nginx:1.20-alpine

COPY --from=BUILD /app/build /var/www

COPY ./nginx.conf /etc/nginx/nginx.conf

EXPOSE 80