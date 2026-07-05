server {
  listen       80;
  listen  [::]:80;
  server_name  aescrypto.com www.aescrypto.com;
  return       301 https://evgenii.com/aescrypto/;
}

server {
  server_name  aescrypto.com www.aescrypto.com;
  listen [::]:443 ssl;
  listen 443 ssl;
  ssl_certificate /etc/letsencrypt/live/aescrypto.com/fullchain.pem; # managed by Certbot
  ssl_certificate_key /etc/letsencrypt/live/aescrypto.com/privkey.pem; # managed by Certbot
  include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
  ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
  return 301 https://evgenii.com/aescrypto/;
}
