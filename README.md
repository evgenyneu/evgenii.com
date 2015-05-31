## evgenii.com

My personal web site.

## Installation


    git clone git@github.com:evgenyneu/evgenii.com.git


### Deploy

./_scripts/deploy.sh

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


