#!/bin/sh

bundle exec jekyll build
rsync -rvz _site/ aws:web/evgenii.com
