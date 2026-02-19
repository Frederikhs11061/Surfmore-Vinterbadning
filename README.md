# 🌊 Surfmore Gear Match

En interaktiv mini-konfigurator der hjælper kunder med at finde det rigtige udstyr til vinterbadning. Bygget med Next.js og klar til integration i Shopify via Custom Liquid.

## 🚀 Features

- **Interaktiv quiz**: 4 spørgsmål der afdækker kundens behov
- **Personlige anbefalinger**: Baseret på svar, får kunden produkter anbefalet
- **Bundle-forslag**: Automatisk generering af bundle-forslag til upsell
- **Moderne UX**: Smuk, responsiv design med animations
- **Shopify-ready**: Klar til iframe-integration i Shopify

## 📦 Produkter i systemet

### Essentielt udstyr (altid anbefalet):
- Neopren-sko
- Badeponcho
- Drybag
- Mikrofiberhåndklæde

### Ekstra produkter (anbefales baseret på svar):
- Neopren-handsker
- Neopren-hue

## 🛠️ Teknisk Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **React 18**

## 📋 Installation

```bash
# Installer dependencies
npm install

# Kør development server
npm run dev

# Build til production
npm run build

# Start production server
npm start
```

Appen kører på [http://localhost:3000](http://localhost:3000)

## 🔒 Sikkerhed

Appen er konfigureret med sikkerhedsheaders der tillader iframe-embedding i Shopify:

- `X-Frame-Options: ALLOWALL` - Tillader embedding i iframes
- `Content-Security-Policy: frame-ancestors` - Begrænser til Shopify-domæner

## 🛍️ Shopify Integration

### Trin 1: Deploy på Vercel

1. Push koden til GitHub
2. Opret et nyt projekt på [Vercel](https://vercel.com)
3. Forbind GitHub repository
4. Deploy

### Trin 2: Få public URL

Efter deployment får du en URL som: `https://surfmore-gear-match.vercel.app`

### Trin 3: Indsæt i Shopify

1. Gå til **Shopify Admin** → **Online Store** → **Themes**
2. Klik på **Customize** på dit aktive theme
3. Tilføj en ny sektion: **Add section** → **Custom Liquid**
4. Indsæt følgende kode:

```liquid
<div style="height: 1000px; width: 100%;">
  <iframe 
    src="https://din-app.vercel.app" 
    width="100%" 
    height="100%"
    style="border:none; display:block;"
    loading="lazy"
  ></iframe>
</div>
```

**Vigtigt**: Erstat `https://din-app.vercel.app` med din faktiske Vercel URL.

**Note**: Appen er nu konfigureret til at fylde hele højden dynamisk uden scrolling. Indholdet tilpasser sig automatisk til den tilgængelige højde. Du kan justere højden ved at ændre `height: 1000px` i div'en til det der passer bedst til din sektion (fx 900px, 1000px, 1100px).

## 🎨 Tilpasning

### Farver

Farver kan tilpasses i `tailwind.config.ts`:

```typescript
colors: {
  surfmore: {
    blue: "#0066CC",
    dark: "#003366",
    light: "#E6F2FF",
  },
}
```

### Spørgsmål og produkter

Rediger `components/GearMatchConfigurator.tsx` for at:
- Tilføje/fjerne spørgsmål
- Ændre produkter og anbefalinger
- Justere logikken for produktanbefalinger

## 📱 Responsive Design

Appen er fuldt responsiv og virker på:
- Desktop
- Tablet
- Mobil

## 🔄 Fremtidige forbedringer

- [ ] Integration med Shopify API til at hente produkter dynamisk
- [ ] Tracking af konverteringer (Google Analytics, Facebook Pixel)
- [ ] A/B testing af spørgsmål
- [ ] Email capture før resultater
- [ ] Social sharing af resultater
- [ ] Multi-language support

## 📄 License

Privat projekt for Surfmore.dk
npm run dev
