#!/bin/sh

# Decrypt the file
mkdir $HOME/secrets
# --batch to prevent interactive command --yes to assume "yes" for questions
gpg --quiet --batch --yes --decrypt --passphrase="$DEV_CONFIG_PASSPHRASE" \
--output $HOME/secrets/config.dev.json client/config.dev.json.gpg