#!/bin/sh

# Check if var has a value
string=$var
if [[ $string == *"functions:"* ]]; then
  echo "true"; else
  echo "false"
fi