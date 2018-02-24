server {
  listen       80;
  listen  [::]:80;
  server_name  www.aescrypto.com;
  return       301 http://aescrypto.com$request_uri;
}

server {
  server_name  aescrypto.com;
  root         /home/ubuntu/web/aescrypto.com;
  access_log   /var/log/nginx/aescrypto.log combined;

  # static content
  location ~ \.(?:ico|jpg|css|png|js|swf|woff|eot|svg|ttf|gif)$ {
    access_log  off;
    log_not_found off;
    add_header  Pragma "public";
    add_header  Cache-Control "public";
    expires     7d;
  }

    listen [::]:443 ssl; # managed by Certbot
    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/aescrypto.com/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/aescrypto.com/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

}


server {
    if ($host = aescrypto.com) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


  listen       80;
  listen  [::]:80;
  server_name  aescrypto.com;
    return 404; # managed by Certbot


}