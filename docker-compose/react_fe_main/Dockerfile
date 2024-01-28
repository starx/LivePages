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

ARG APP_PATH
# Copy package.json and package-lock.json (or yarn.lock) into the container
COPY $APP_PATH/package*.json ./

ARG APP_ENV
ENV APP_ENV $APP_ENV

# Prepare app (e.g. make dirs, install dependencies)
RUN "app_prep.sh"

# Copy rest of the code to container
COPY $APP_PATH .

CMD [ "app_start.sh" ]

FROM base as dev

FROM base as build

ARG REACT_APP_EXPRESS_BE_MAIN_FQDN
ENV REACT_APP_EXPRESS_BE_MAIN_FQDN $REACT_APP_EXPRESS_BE_MAIN_FQDN
RUN "app_build.sh"

# Serve the application using a lightweight web server
FROM nginx:alpine as prod
COPY --from=build /usr/src/app/build /usr/share/nginx/html
WORKDIR /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]