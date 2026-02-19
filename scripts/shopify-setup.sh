#!/bin/bash

# Shopify Theme Setup Script
# This script helps you set up and work with your Shopify theme

set -e

THEME_DIR="./shopify-theme"

echo "🌊 Surfmore Shopify Theme Setup"
echo "================================"
echo ""

# Check if Shopify CLI is installed
if ! command -v shopify &> /dev/null; then
    echo "❌ Shopify CLI is not installed."
    echo "Installing Shopify CLI..."
    npm install -g @shopify/cli
fi

# Check if authenticated
echo "Checking authentication..."
if ! shopify theme list &> /dev/null; then
    echo "⚠️  Not authenticated. Please run:"
    echo "   npm run shopify:auth"
    echo ""
    echo "Or run this command manually:"
    echo "   shopify auth login"
    echo ""
    echo "After login, select your store: frederikhoegh.myshopify.com"
    exit 1
fi

echo "✅ Authenticated!"
echo ""

# List available themes
echo "📋 Available themes:"
shopify theme list
echo ""

# Ask if user wants to pull a theme
read -p "Do you want to pull/download a theme? (y/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    read -p "Enter theme ID (or press Enter to use development theme): " THEME_ID
    
    if [ -z "$THEME_ID" ]; then
        echo "Pulling development theme..."
        shopify theme pull --path $THEME_DIR --development
    else
        echo "Pulling theme $THEME_ID..."
        shopify theme pull --path $THEME_DIR --theme $THEME_ID
    fi
    
    echo ""
    echo "✅ Theme downloaded to $THEME_DIR"
    echo ""
    echo "You can now:"
    echo "  - Edit files in $THEME_DIR"
    echo "  - Run 'npm run shopify:dev' to preview changes"
    echo "  - Run 'npm run shopify:push' to push changes back"
fi
