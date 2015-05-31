server {
  listen       80;
  listen  [::]:80;
  server_name  emilysaaen.com www.emilysaaen.com;
  rewrite ^ http://emilysaaen.bandcamp.com/ redirect;
}