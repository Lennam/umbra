FROM node:10.16.0-apline
LABEL maintainer="leenam"
LABEL mail="ameeo@foxmail.com"
RUN mkdir -p /home/umbra
WORKDIR /home/umbra 
RUN npm i yarn -g
EXPOSE 3000
CMD yarn && yarn start