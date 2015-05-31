#!/bin/sh

#
# Optimizes *.jpg files in in the given directory and its subdirectories.
#
# 1. Removes metadata.
# 2. Performs lossless optimization of the image data.
#
# Example:
#
#    ./optimize_jpegs.sh somedir/
#

for jpg in `find $1 -name "*.jpg"`;
do
  echo "optimizing $jpg"
  jpegtran -copy none -outfile temp.jpg "$jpg"
  mv -f temp.jpg $jpg
done;