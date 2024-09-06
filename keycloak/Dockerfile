# Install curl for healthcheck
FROM registry.access.redhat.com/ubi9 AS ubi-micro-build
RUN mkdir -p /mnt/rootfs
RUN dnf install --installroot /mnt/rootfs curl --releasever 9 --setopt install_weak_deps=false --nodocs -y; dnf --installroot /mnt/rootfs clean all

# Install keycloak
FROM quay.io/keycloak/keycloak:23.0
COPY --from=ubi-micro-build /mnt/rootfs /

# Enable health and metrics support
ENV KC_HEALTH_ENABLED=true
ENV KC_METRICS_ENABLED=true

# Configure a database vendor
ENV KC_DB=postgres

WORKDIR /opt/keycloak

# Install start script
USER root
COPY ./scripts/kcWithAutoImport.sh /opt/keycloak/bin/kcWithAutoImport.sh
RUN chmod +x /opt/keycloak/bin/kcWithAutoImport.sh && chown 1000:root /opt/keycloak/bin/kcWithAutoImport.sh

USER 1000

RUN /opt/keycloak/bin/kc.sh build --db=postgres
RUN /opt/keycloak/bin/kc.sh show-config

ENTRYPOINT [ "/opt/keycloak/bin/kcWithAutoImport.sh" ]
