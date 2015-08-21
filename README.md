## evgenii.com

This repository contains my personal web site project: http://evgenii.com.

## Installation

    git clone git@github.com:evgenyneu/evgenii.com.git
    gem install jekyll


### Serve

    jekyll serve


### Build

    jekyll build

### Deploy

./_scripts/deploy.sh



### Optimize images

Runs lossless optimization on png and jpg images in the image directory.

```
brew install pngcrush
./_scripts/optimize_images.sh ./image
./_scripts/optimize_images.sh ./files
```


### Update javascript

```
npm install -g minifier
minify _includes/js/ -s ".min"
```

### Regenerate thumbnails for drawings

```
brew install imagemagic
./_scripts/regenerate_thumbnails.sh
```

### Autoprefix a CSS file

```
npm install --global postcss-cli autoprefixer
```

Create `browerslist` file with:

```
# Browsers that we support

> 1%
Last 2 versions
IE >= 8
```

Autoprefix CSS:

```
postcss --use autoprefixer *.css -d build/
```

## DNS configuration

### Arvixe configuration

DNS Servers:

ns1.abyssinian.arvixe.com
ns2.abyssinian.arvixe.com

### Home configuration

DNS Servers:

dns1.name-services.com
dns2.name-services.com
dns3.name-services.com
dns4.name-services.com

A Address: 59.167.177.118
AAAA Address: 2001:44b8:41d7:f900:20f:13ff:fe50:461


