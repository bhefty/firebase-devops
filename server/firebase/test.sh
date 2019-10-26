#!/bin/sh

for f in $(diff -Nqr functions/ functions-staging/ | awk '{print $4}' | cut -d'/' -f2-); do
  functionName=$(echo ${f%?????} | gsed -r 's/(\/)([a-z])/\U\2/g')
  echo $functionName
  # firebase deploy --only functions:${functionName}
done