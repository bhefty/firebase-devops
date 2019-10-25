workflow "Deploy to Firebase (Dev)" {
  on = "push"
  resolves = ["Deploy"]
}

# Only run on `release/dev` branch
action "Dev Release" {
  uses = "actions/bin/filter@master"
  args = "branch release/dev"
}

# Decrypt environment variables
action "Decrypt" {
  needs = "Dev Release"
  args = "./.github/scripts/decrypt_env.sh"
}

# `npm ci`
action "Install" {
  needs = "Decrypt"
  uses = "actions/npm@master"
  args = "ci"
}

# `npm run build`
action "Build" {
  needs = "Install"
  uses = "actions/npm@master"
  args = "run build"
}

# `firebase deploy`
action "Deploy" {
  needs = ["Build"]
  uses = "natemoo-re/action-firebase@master"
  args = "deploy"
  secrets = ["FIREBASE_TOKEN"]
}