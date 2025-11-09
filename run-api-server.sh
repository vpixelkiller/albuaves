#!/bin/bash

IPAPI="127.0.0.1"
PORTAPI="9191"

cd php/
php -S ${IPAPI}:${PORTAPI} 

exit 0