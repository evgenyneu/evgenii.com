server {
  listen       80;
  listen  [::]:80;
  server_name  www.walktocircle.com;
  return       301 http://walktocircle.com$request_uri;
}

server {
  listen       80;
  listen  [::]:80;
  server_name  walktocircle.com;
  root         /home/ubuntu/web/walktocircle.com;
  access_log   /var/log/nginx/walktocircle.log combined;

  # static content
  location ~ \.(?:ico|jpg|css|png|js|swf|woff|eot|svg|ttf|gif)$ {
    access_log  off;
    log_not_found off;
    add_header  Pragma "public";
    add_header  Cache-Control "public";
    expires     7d;
  }

    listen [::]:443 ssl ipv6only=on; # managed by Certbot
    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/walktocircle.com/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/walktocircle.com/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

}

server {
    if ($host = walktocircle.com) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


  listen       80;
  listen  [::]:80;
  server_name  walktocircle.com;
    return 404; # managed by Certbot


}
