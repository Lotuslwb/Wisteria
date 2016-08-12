#!/bin/sh

scp /home/appsvr/admin_merchant.zip appsvr@172.16.0.12:/home/appsvr/nginx/html/merchantcenter

ssh appsvr@172.16.0.12 << EOF
hostname

cd /home/appsvr/nginx/html/merchantcenter/

unzip -o admin_merchant.zip

exit
EOF

