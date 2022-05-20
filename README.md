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


## License

The content and the source code of evgenii.com is released under a [Creative Commons Attribution 4.0 International License](http://creativecommons.org/licenses/by/4.0/).

