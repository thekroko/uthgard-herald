FROM nginx

COPY ./nginx/conf.d /etc/nginx/conf.d
COPY ./herald/dist /usr/share/nginx/html

EXPOSE 80
