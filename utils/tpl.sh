#!/bin/sh

scp <%= boardURL %><%= productName %>.zip <%= targetName %>@<%= targetIP %>:<%= targetURL %>

ssh <%= targetName %>@<%= targetIP %> << EOF

cd <%= targetURL %>

unzip -o <%= productName %>.zip

exit
EOF

