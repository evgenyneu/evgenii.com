server {
  listen       80;
  listen  [::]:80 ipv6only=on;
  server_name  www.evgenii.com;
  return       301 http://evgenii.com$request_uri;
}

server {
  listen       80;
  listen  [::]:80;
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
}