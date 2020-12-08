FROM node:alpine AS build

RUN apk --no-cache add g++ gcc libgcc libstdc++ linux-headers make python

ADD package.json /tmp/package.json
RUN cd /tmp && yarn install
RUN mkdir -p /app && cp -a /tmp/node_modules /app/

WORKDIR /app
ADD . /app

RUN yarn build

COPY env.yaml /dist/env.yaml

FROM node:alpine

RUN apk --no-cache add g++ gcc libgcc libstdc++ linux-headers make python

# Información de metadata
LABEL cccg.app.Ucb-Service="Agente UCB" \ 
      maintainer="cg.cardenas.c@gmail.com" \
      version="1.0"

# Directorio de trabajo
WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=build /app/env.yaml .
COPY --from=build /app/package.json .

EXPOSE 5000

RUN yarn install --production

CMD [ "yarn", "serve" ]