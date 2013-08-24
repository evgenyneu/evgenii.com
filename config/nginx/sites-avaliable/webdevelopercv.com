server {
  listen        80;
  listen   [::]:80;
  server_name   webdevelopercv.com www.webdevelopercv.com;
  rewrite ^     http://evgenii.com permanent;
}