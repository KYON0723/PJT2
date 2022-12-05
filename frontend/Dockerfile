#Dockerfile


# nginx가 제공을 해줄 빌드 파일들을 생성하는 코드
# node 12 version, build file
FROM node:12 as builder
#working dir as /app
WORKDIR /app
# copy package.json/ package.lock.json
COPY ./package*.json ./
# cmd: npm install
RUN npm install
#copy local file
COPY . .
# build
RUN npm run build


FROM nginx
EXPOSE 3001
# 로컬에 있는 default.conf 파일을 도커 /etc/nginx/conf.d/default.conf로 복사
COPY ./default.conf /etc/nginx/conf.d/default.conf
# 위에서 생성한 build 파일을 /usr/share/nginx/html로 복사
COPY --from=builder /app/build  /usr/share/nginx/html