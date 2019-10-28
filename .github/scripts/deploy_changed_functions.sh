#!/bin/sh

# Correctly format the FUNCTIONS_LIST var
appendFunction() {
  # Check if FUNCTIONS_LIST has a value
  if [ -z ${FUNCTIONS_LIST+x} ];
    # Set the first `functions:` statement
    then FUNCTIONS_LIST=functions:$1;
    # Append the `,functions:` statement
    else
      # Only need to append functions not yet added
      if [[ $FUNCTIONS_LIST != *"functions:$1"* ]]; then
        FUNCTIONS_LIST=$FUNCTIONS_LIST,functions:$1;
      fi
  fi
}


# Get a list of changed functions (ending in `.f.js`)
DIFF_FUNCTIONS=$(git diff --name-only origin/release/dev b0797c1fea7516f42fd6b663dd2c120fad6243dd | grep '\.f.\js$')

DIFF_HELPERS=$(git diff --name-only origin/release/dev b0797c1fea7516f42fd6b663dd2c120fad6243dd |
  awk '/hello\/util\.js|cron\/invoice\/handler\.js|lease\/renewal\.js|lease\/terminateLease\.js|lease\/sendRenewalDecisionNotification\.js|checkbook\/create\/check\.js/{print}' )

# For each function, get the camelcased name (hello/world.f.js becomes helloWorld)
for f in $(echo "${DIFF_FUNCTIONS}" | cut -d'/' -f4-); do
  functionName=$(echo ${f%?????} | sed -r 's/(\/)([a-z])/\U\2/g')

  # Add the function to the deploy list
  appendFunction $functionName
done

# For each helper function that was updated, get the function that relies on it to be updated
for f in $(echo "$DIFF_HELPERS" | cut -d'/' -f4-); do
  # Based on the helper, determine what functions need deployed
  if [ $f == 'cron/invoice/handler.js' ]
  then
    appendFunction propertyCreateWithLeaseSfh
    appendFunction propertyCreateWithLeaseMfh
    appendFunction propertyCreateWithLeaseCom
    appendFunction propertyUpdateWithLeaseSfh
    appendFunction propertyUpdateWithLeaseMfh
    appendFunction propertyUpdateWithLeaseCom
    appendFunction cronInvoicesCreateCentral
    appendFunction cronInvoicesCreateEastern
    appendFunction cronInvoicesCreateMountain
    appendFunction cronInvoicesCreatePacific
    appendFunction cronInvoicesCreateAlaskan
    appendFunction cronInvoicesCreateHawaiian
    appendFunction cronInvoicesUpdateCentral
    appendFunction cronInvoicesUpdateEastern
    appendFunction cronInvoicesUpdateMountain
    appendFunction cronInvoicesUpdatePacific
    appendFunction cronInvoicesUpdateAlaskan
    appendFunction cronInvoicesUpdateHawaiian
    appendFunction cronLeasesRenewalCentral
    appendFunction cronLeasesRenewalEastern
    appendFunction cronLeasesRenewalMountain
    appendFunction cronLeasesRenewalPacific
    appendFunction cronLeasesRenewalAlaskan
    appendFunction cronLeasesRenewalHawaiian

  elif [ $f == 'lease/renewal.js' ] || [ $f == 'cron/leases/renewal/renewalHandler.js' ]
  then
    appendFunction cronLeasesRenewalCentral
    appendFunction cronLeasesRenewalEastern
    appendFunction cronLeasesRenewalMountain
    appendFunction cronLeasesRenewalPacific
    appendFunction cronLeasesRenewalAlaskan
    appendFunction cronLeasesRenewalHawaiian

  elif [ $f == 'lease/terminateLease.js' ] || [ $f == 'cron/leases/terminate/terminateHandler.js' ]
  then
    appendFunction cronLeasesTerminateCentral
    appendFunction cronLeasesTerminateEastern
    appendFunction cronLeasesTerminateMountain
    appendFunction cronLeasesTerminatePacific
    appendFunction cronLeasesTerminateAlaskan
    appendFunction cronLeasesTerminateHawaiian

  elif [ $f == 'lease/sendRenewalDecisionNotification.js' ]
  then
    appendFunction cronLeasesRenewalNotice30
    appendFunction cronLeasesRenewalNotice60
    appendFunction cronLeasesRenewalNotice90

  elif [ $f == 'checkbook/create/check.js' ]
  then
    appendFunction cronLeasesRenewalNotice30
    appendFunction cronLeasesRenewalNotice60
    appendFunction cronLeasesRenewalNotice90
    
  elif [ $f == 'checkbook/create/check.js' ]
  then
    appendFunction checkbookCreateDigitalCheck
    appendFunction cronInvoicesCreateCentral
    appendFunction cronInvoicesCreateEastern
    appendFunction cronInvoicesCreateMountain
    appendFunction cronInvoicesCreatePacific
    appendFunction cronInvoicesCreateAlaskan
    appendFunction cronInvoicesCreateHawaiian
    appendFunction cronInvoicesUpdateCentral
    appendFunction cronInvoicesUpdateEastern
    appendFunction cronInvoicesUpdateMountain
    appendFunction cronInvoicesUpdatePacific
    appendFunction cronInvoicesUpdateAlaskan
    appendFunction cronInvoicesUpdateHawaiian

  elif [ $f == 'hello/util.js' ]
  then
    appendFunction helloWorld
  else
    echo "NOTHING"
  fi
done

# Check if there are any functions to deploy
if [ -z ${FUNCTIONS_LIST+x} ];
  # Return abort message to stop workflow
  then echo 'abort'
  # Return the functions to deploy
  else echo $FUNCTIONS_LIST
fi
