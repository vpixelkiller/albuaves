#!/bin/bash

IPAPI="127.0.0.1"
PORTAPI="9191"

cd "$(dirname "$0")"
php -S ${IPAPI}:${PORTAPI} -t .

exit 0