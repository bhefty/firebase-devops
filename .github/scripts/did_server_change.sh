#!/bin/sh

# Get a list of changed files (starting with `server/`)
DIFF_FILES=$(git diff --name-only origin/$SOURCE_BRANCH $CURRENT_COMMIT |
  grep '^server\/' |
  grep -v '\.gitignore$'
)

if [ -n "$DIFF_FILES" ];
  # Return "true" - changes detected in `server/`
  then echo true
  # Return "false" - no changes in `server/`
  else echo 'false'
fi
