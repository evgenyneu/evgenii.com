#!/bin/sh

jekyll build
rsync -rvz _site/ aws:web/evgenii.com