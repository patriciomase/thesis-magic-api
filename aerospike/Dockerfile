#
# Aerospike Server Dockerfile
#
# http://github.com/aerospike/aerospike-server.docker
#

FROM aerospike/aerospike-server

ADD aerospike.conf /etc/aerospike/aerospike.conf
VOLUME ["/opt/aerospike/data"]
EXPOSE 3000 3001 3002 3003

CMD ["/usr/bin/asd","--foreground"]
