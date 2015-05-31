#!/bin/sh

jekyll build
rsync -rvz _site/ pi:evgenii.com