FROM openjdk:8-jdk-alpine
ARG JAR_FILE=build/libs/ieng-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar

#time Setting for alpine
ENV TZ=Asia/Seoul
RUN apk --no-cache add tzdata && \
    cp /usr/share/zoneinfo/$TZ /etc/localtime && \
    echo $TZ > /etc/timezone \
    apk del tzdata

ENTRYPOINT ["java","-jar","/app.jar"]
