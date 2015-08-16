#!/bin/sh

jekyll build
# rsync -rvz _site/ pi:evgenii.com
rsync -rvz _site/ arvixe:public_html/evgenii.com