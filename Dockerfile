FROM node:10.16.0-alpine
LABEL maintainer="leenam"
LABEL mail="ameeo@foxmail.com"
RUN mkdir -p /home/umbra
WORKDIR /home/umbra 
RUN apk --no-cache add --virtual builds-deps build-base python
COPY ./package.json .
RUN npm i yarn -g
RUN yarn
COPY ./ ./
EXPOSE 3000
CMD ["yarn", "start"]