#!/bin/sh

# Get a list of changed files (starting with client/)
DIFF_CLIENT_FILES=$(git diff --name-only origin/$SOURCE_BRANCH $CURRENT_COMMIT | grep '^client\/')

echo DIFF_CLIENT_FILES=$DIFF_CLIENT_FILES