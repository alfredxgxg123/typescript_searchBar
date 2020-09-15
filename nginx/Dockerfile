FROM nginx
RUN rm /etc/nginx/conf.d/default.conf
COPY n.conf /etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx/conf.d/
COPY nginx.conf /etc/nginx/sites-available/nginx.conf
RUN mkdir -p /etc/nginx/sites-enabled/\
    && ln -s /etc/nginx/sites-available/nginx.conf /etc/nginx/sites-enabled/