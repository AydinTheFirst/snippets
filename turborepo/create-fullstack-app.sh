#!/bin/bash

# Exit on any error
set -e

read -p "This script will create a new fullstack app using Turbo. Do you want to continue? (y/n): " confirm
if [[ "$confirm" != "y" ]]; then
  echo "Aborting."
  exit 1
fi

# Read app name
if [ -z "$1" ]; then
  read -p "Enter the app name: " APP_NAME
else
  APP_NAME=$1
fi

# Ensure app name is valid
if [[ ! "$APP_NAME" =~ ^[a-zA-Z0-9_-]+$ ]]; then
  echo "Invalid app name. Only alphanumeric characters, dashes, and underscores are allowed."
  exit 1
fi

if [ -d "$APP_NAME" ]; then
  echo "Directory '$APP_NAME' already exists. Aborting."
  exit 1
fi

# Select package manager
echo "Select package manager:"
select pm in "pnpm" "yarn" "npm"; do
  case $pm in
    pnpm ) echo "Using pnpm"; break;;
    yarn ) echo "Using yarn"; break;;
    npm ) echo "Using npm"; break;;
    * ) echo "Invalid option. Please select 1, 2, or 3."; continue;;
  esac
done

# Create turborepo
echo "Creating a turborepo with $pm..."
if [ $pm == "pnpm" ]; then
  pnpm dlx create-turbo@latest $APP_NAME --example basic
elif [ $pm == "yarn" ]; then
  yarn dlx create-turbo@latest $APP_NAME --example basic 
else
  npx create-turbo@latest $APP_NAME --example basic
fi

# Navigate to the new repo
cd $APP_NAME

# Confirm deletion of apps and packages folders
read -p "This will clear the apps and packages folders. Are you sure? (y/n): " confirm
if [[ "$confirm" != "y" ]]; then
  echo "Aborting."
  exit 1
fi

# Clear apps folder and packages folder
echo "Removing existing apps and packages folders..."
rm -rf apps packages

# Clone templates
echo "Cloning templates..."
git clone https://github.com/AydinTheFirst/react-template.git apps/client
git clone https://github.com/AydinTheFirst/nestjs-template.git apps/server

# Clear .git folders
echo "Removing .git folders..."
rm -rf apps/client/.git apps/server/.git

# Install dependencies
echo "Installing dependencies using $pm..."
$pm install

# Done
echo "Done! 🚀 Your fullstack app '$APP_NAME' has been created."
