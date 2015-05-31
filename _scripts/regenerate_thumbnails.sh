#!/bin/sh

cd image/drawings
mkdir -p thumbnails
mogrify  -format jpg -strip  -quality 80 -path thumbnails -thumbnail 300x400 *.jpg