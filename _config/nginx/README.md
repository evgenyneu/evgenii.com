# nginx setup instructions

### Change the nginx.conf

### Add the configs to site-available directory

### Create simlink for the sites

sudo ln -s /etc/nginx/sites-available/walktocircle.com /etc/nginx/sites-enabled/walktocircle.com

### Test config and reload the web server

nginx -t
nginx -s reload