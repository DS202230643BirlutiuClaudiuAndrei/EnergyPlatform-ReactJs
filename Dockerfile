# pull official base image
FROM node:14.1-alpine as builder

# set working directory
WORKDIR /app

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent 
# add app
COPY ./ /app/
# start app
RUN npm run build

# Bundle static assets with nginx
FROM nginx:1.21.0-alpine as production
COPY --from=react_build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

# Start nginx
EXPOSE 82
CMD ["nginx", "-g", "daemon off;"]