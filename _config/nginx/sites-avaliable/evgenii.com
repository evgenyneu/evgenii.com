server {
  listen       80 default_server;
  listen  [::]:80 default_server;
  server_name  www.evgenii.com;
  return       301 http://evgenii.com$request_uri;
}

server {
  server_name  evgenii.com;
  root         /home/ubuntu/web/evgenii.com;
  error_page   404  /404.html;
  access_log   /var/log/nginx/evgenii.log combined;

  # static content
  location ~ \.(?:ico|jpg|css|png|js|swf|woff|eot|svg|ttf|gif)$ {
    access_log  off;
    log_not_found off;
    add_header  Pragma "public";
    add_header  Cache-Control "public";
    expires     7d;
  }

  # Redirects for pages that changed URLs
  location /projects/walk-to-circle-ios-game {
    rewrite ^/projects/walk-to-circle-ios-game(.*) http://$server_name/projects/walk-to-circle-for-android-and-ios/ permanent;
  }

    listen [::]:443 ssl; # managed by Certbot
    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/evgenii.com/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/evgenii.com/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

}

server {
    if ($host = evgenii.com) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


  listen       80;
  listen  [::]:80;
  server_name  evgenii.com;
    return 404; # managed by Certbot


}