#!/bin/bash

export DEBIAN_FRONTEND=noninteractive

apt-get update
apt-get install -y apache2

mkdir -p /vagrant/.logs

cat > /etc/apache2/sites-available/000-default.conf << EOF
<VirtualHost *:80>
    DocumentRoot /vagrant

    <Directory /vagrant>
        Options -Indexes
        AllowOverride All
        Require all granted
        Header set Access-Control-Allow-Origin "*"
    </Directory>

    ErrorLog /vagrant/.logs/apache-error.log
    CustomLog /vagrant/.logs/apache-access.log combined
</VirtualHost>
EOF

a2enmod headers
systemctl restart apache2
