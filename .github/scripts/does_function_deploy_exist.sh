#!/bin/sh

# Check if FUNCTIONS_TO_DEPLOY has a value
string=$FUNCTIONS_TO_DEPLOY
if [[ $string == *"functions:"* ]]; then
  echo "true"
fi