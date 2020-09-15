FROM node:10.13.0-alpine

#ENV
ENV NODE_ENV=development
ENV SERVER_PORT=8080

# ruN
WORKDIR /backend
COPY . /backend
RUN npm install && \
    npm run build
EXPOSE 8080
CMD ["npm", "start"]
