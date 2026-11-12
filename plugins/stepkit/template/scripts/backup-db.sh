#!/usr/bin/env bash
# Kopia zapasowa bazy na serwerze. Uruchamiana codziennie przez cron, zostawia 7 ostatnich kopii.
set -euo pipefail
cd "$(dirname "$0")/.."
BACKUP_DIR="${BACKUP_DIR:-$HOME/backups}"
KEEP="${KEEP:-7}"
mkdir -p "$BACKUP_DIR"
set -a; source .env; set +a
FILE="$BACKUP_DIR/db-$(date +%Y-%m-%d_%H%M).sql.gz"
docker compose -f docker-compose.prod.yml exec -T mysql \
  mysqldump -u root -p"$MYSQL_ROOT_PASSWORD" --single-transaction --routines "$DB_NAME" | gzip > "$FILE"
ls -1t "$BACKUP_DIR"/db-*.sql.gz | tail -n +$((KEEP + 1)) | xargs -r rm --
echo "Kopia: $FILE"
