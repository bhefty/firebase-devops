#!/bin/sh

# Decrypt the file
# --batch to prevent interactive command --yes to assume "yes" for questions
gpg --quiet --batch --yes --decrypt --passphrase="$ENV_PASSPHRASE" \
--output client/.env client/.$ENV_FILE_NAME.gpg