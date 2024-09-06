#!/bin/bash

IMPORT_FLAG_FILE=/opt/keycloak/imported/imported.flag

if [[ -z "${KEYCLOAK_IMPORT}" ]]; then
  echo "Skipping Import (KEYCLOAK_IMPORT not used)"
else
  if test -f "$IMPORT_FLAG_FILE"; then
      echo "Skipping Import (already imported)"
  else
      echo "Import initial config: $KEYCLOAK_IMPORT)"
      /opt/keycloak/bin/kc.sh import --file "$KEYCLOAK_IMPORT"
      touch "$IMPORT_FLAG_FILE"
  fi
fi

echo "Starting Keycloak ... "
/opt/keycloak/bin/kc.sh start --optimized --proxy edge "$@"
