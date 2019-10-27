#!/bin/sh

# Get a list of changed functions (ending in `.f.js`)
DIFFS=$(git diff --name-only origin/$SOURCE_BRANCH $CURRENT_COMMIT | grep '\.f.\js$')

# For each function, get the camelcased name (hello/world.f.js becomes helloWorld)
for f in $(echo "${DIFFS}" | cut -d'/' -f4-); do
  functionName=$(echo ${f%?????} | sed -r 's/(\/)([a-z])/\U\2/g')

  # Check if FUNCTIONS_LIST has a value
  if [ -z ${FUNCTIONS_LIST+x} ];
    # Set the first `functions:` statement
    then FUNCTIONS_LIST=functions:$functionName;
    # Append the `,functions:` statement
    else FUNCTIONS_LIST=$FUNCTIONS_LIST,functions:$functionName;
  fi
done

# Check if there are any functions to deploy
if [ -z ${FUNCTIONS_LIST+x} ];
  # Return abort message to stop workflow
  then echo 'abort'
  # Return the functions to deploy
  else echo $FUNCTIONS_LIST
fi