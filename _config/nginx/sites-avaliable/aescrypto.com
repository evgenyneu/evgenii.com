server {
  listen       80;
  listen  [::]:80;
  server_name  www.aescrypto.com;
  return       301 http://aescrypto.com$request_uri;
}

server {
  listen       80;
  listen  [::]:80;
  server_name  aescrypto.com;
  root         /home/pi/aescrypto.com;
  access_log   /var/log/nginx/aescrypto.log combined;

  # static content
  location ~ \.(?:ico|jpg|css|png|js|swf|woff|eot|svg|ttf|gif)$ {
    access_log  off;
    log_not_found off;
    add_header  Pragma "public";
    add_header  Cache-Control "public";
    expires     30d;
  }
}