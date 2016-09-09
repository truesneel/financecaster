FROM fedora:latest

RUN dnf update -y
RUN dnf install -y nodejs

RUN mkdir /app /data; \
    useradd financecaster; \
    touch /data/config.ini; \
    chown financecaster /data/

ENV FC_CONFIG=/data/config.ini \
    FC_DB_SQLITE_PATH=/data/financecaster.sqlite

COPY node_modules app/node_modules
COPY src/ app/

EXPOSE 9001
USER financecaster

CMD cd /app && /usr/bin/node /app/server.js
