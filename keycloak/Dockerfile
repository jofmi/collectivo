FROM registry.access.redhat.com/ubi9 AS ubi-micro-build
RUN mkdir -p /mnt/rootfs
RUN dnf install --installroot /mnt/rootfs curl --releasever 9 --setopt install_weak_deps=false --nodocs -y; dnf --installroot /mnt/rootfs clean all


FROM quay.io/keycloak/keycloak:22.0.1
COPY --from=ubi-micro-build /mnt/rootfs /
WORKDIR /opt/keycloak
COPY ./import/* /opt/keycloak/data/import/
# for demonstration purposes only, please make sure to use proper certificates in production instead
RUN /opt/keycloak/bin/kc.sh import --dir /opt/keycloak/data/import
ENV ROOT_LOGLEVEL=ALL
ENV KEYCLOAK_LOGLEVEL=DEBUG
ENV KC_HEALTH_ENABLED=true
RUN /opt/keycloak/bin/kc.sh build

# change these values to point to a running postgres instance
CMD [ "start-dev --import-realm --health-enabled true" ]
