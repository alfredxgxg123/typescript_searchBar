FROM node:10.13.0-alpine
# ruN
WORKDIR /frontend
COPY . /frontend
RUN yarn install
CMD ["yarn", "build"]
EXPOSE 3000