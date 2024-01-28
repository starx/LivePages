ARG BASE_IMG=node:latest
FROM $BASE_IMG as base

# Container scripts
ARG CONFIG_PATH
COPY ${CONFIG_PATH}/scripts /usr/share/container-scripts
RUN chmod +x /usr/share/container-scripts/* 
ENV PATH "$PATH:/usr/share/container-scripts"

# Setting Working Directory
WORKDIR /usr/src/app

# Expose port
ENV PORT 3000
EXPOSE 3000

# Install express generator
RUN npm install -g express-generator

ARG APP_PATH
# Copy package.json and package-lock.json into the container
COPY ${APP_PATH}/package*.json ./

ARG APP_ENV
ENV APP_ENV $APP_ENV

# Prepare app (e.g. make dirs, install dependencies)
RUN "app_prep.sh"

# Copy rest of the code to container
COPY $APP_PATH .

CMD [ "app_start.sh" ]

FROM base as dev

RUN npm install -g nodemon 

FROM base as prod
