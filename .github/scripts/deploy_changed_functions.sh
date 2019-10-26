#!/bin/sh

git diff --name-only origin/$SOURCE_BRANCH $CURRENT_COMMIT |
grep '\.f.\js$' |
for f in $(cut -d'/' -f4-); do
  functionName=$(echo ${f%?????} | gsed -r 's/(\/)([a-z])/\U\2/g')
  echo $functionName
  if [ -z ${DEPLOY_FUNCTIONS+x} ]; then DEPLOY_FUNCTIONS=functions:$functionName; else DEPLOY_FUNCTIONS=$DEPLOY_FUNCTIONS,functions:$functionName; fi
  # firebase deploy --only functions:${functionName}
done