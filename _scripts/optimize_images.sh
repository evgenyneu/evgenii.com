#!/bin/sh

#
# Optimizes PNG and JPG files in in the given directory and its subdirectories.
#
# 1. Removes metadata.
# 2. Performs lossless optimization of the image data.
#
# Example:
#
#    ./optimize_images.sh somedir/
#

BASEDIR=$(dirname $0)

$BASEDIR/optimize_pngs.sh $1
$BASEDIR/optimize_jpegs.sh $1

echo "Image optimization complete!"