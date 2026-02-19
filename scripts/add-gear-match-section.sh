#!/bin/bash

# Script to add Gear Match section to Shopify theme
# This creates a new section file for the Gear Match app

set -e

THEME_DIR="./shopify-theme"
SECTION_DIR="$THEME_DIR/sections"
SECTION_FILE="$SECTION_DIR/gear-match.liquid"
APP_URL="${1:-https://surfmore-vinterbadning.vercel.app}"

echo "🌊 Adding Gear Match Section to Shopify Theme"
echo "============================================="
echo ""

# Check if theme directory exists
if [ ! -d "$THEME_DIR" ]; then
    echo "❌ Theme directory not found: $THEME_DIR"
    echo "Please run 'npm run shopify:pull' first to download your theme"
    exit 1
fi

# Create sections directory if it doesn't exist
mkdir -p "$SECTION_DIR"

# Create the section file
cat > "$SECTION_FILE" << 'EOF'
{% comment %}
  Gear Match Section
  Interactive winter bathing gear configurator
{% endcomment %}

{% schema %}
{
  "name": "Gear Match",
  "tag": "section",
  "class": "gear-match-section",
  "settings": [
    {
      "type": "text",
      "id": "app_url",
      "label": "App URL",
      "default": "https://surfmore-vinterbadning.vercel.app",
      "info": "URL to the Gear Match app"
    },
    {
      "type": "range",
      "id": "height",
      "label": "Section Height",
      "min": 600,
      "max": 1200,
      "step": 50,
      "default": 1000,
      "unit": "px",
      "info": "Height of the iframe container"
    },
    {
      "type": "checkbox",
      "id": "show_border",
      "label": "Show Border",
      "default": false
    }
  ],
  "presets": [
    {
      "name": "Gear Match"
    }
  ]
}
{% endschema %}

<style>
  .gear-match-section {
    width: 100%;
    margin: 0;
    padding: 0;
  }
  
  .gear-match-container {
    width: 100%;
    height: {{ section.settings.height }}px;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
  
  .gear-match-iframe {
    width: 100%;
    height: 100%;
    border: none;
    display: block;
    {% if section.settings.show_border %}
      border: 1px solid rgba(0, 0, 0, 0.1);
    {% endif %}
  }
</style>

<div class="gear-match-section">
  <div class="gear-match-container">
    <iframe 
      class="gear-match-iframe"
      src="{{ section.settings.app_url }}"
      loading="lazy"
      title="Surfmore Gear Match - Find dit vinterbadning udstyr"
      allow="fullscreen"
    ></iframe>
  </div>
</div>
EOF

echo "✅ Created section file: $SECTION_FILE"
echo ""
echo "The section includes:"
echo "  - Configurable app URL"
echo "  - Adjustable height (600-1200px)"
echo "  - Optional border"
echo ""
echo "Next steps:"
echo "  1. Review the section file: $SECTION_FILE"
echo "  2. Run 'npm run shopify:dev' to preview changes"
echo "  3. Run 'npm run shopify:push' to push to your theme"
echo ""
echo "To add this section in Shopify Admin:"
echo "  1. Go to Online Store > Themes > Customize"
echo "  2. Click 'Add section'"
echo "  3. Find 'Gear Match' in the list"
echo "  4. Configure the settings (URL, height, etc.)"
