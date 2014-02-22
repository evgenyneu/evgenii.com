server {
  listen       80 default_server;
  listen  [::]:80 default_server ipv6only=on;
  server_name  evgenii.com;
  root         /home/pi/evgenii.com;
  error_page   404  /404.html;

  # static content
  location ~ \.(?:ico|jpg|css|png|js|swf|woff|eot|svg|ttf|gif)$ {
    access_log  off;
    log_not_found off;
    add_header  Pragma "public";
    add_header  Cache-Control "public";
    expires     30d;
  }
}

server {
  listen       80;
  server_name  www.evgenii.com;
  return       301 http://evgenii.com$request_uri;
}