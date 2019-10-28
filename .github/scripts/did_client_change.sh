#!/bin/sh

# Get a list of changed files (starting with `client/`)
DIFF_FILES=$(git diff --name-only origin/$SOURCE_BRANCH $CURRENT_COMMIT |
  grep '^client\/' |
  grep -v '\.gitignore$'
)

if [ -n "$DIFF_FILES" ];
  # Return "true" - changes detected in `client/`
  then echo true
  # Return "false" - no changes in `client/`
  else echo 'false'
fi
