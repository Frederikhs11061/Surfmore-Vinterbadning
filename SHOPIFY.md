# 🛍️ Shopify Theme Integration Guide

Denne guide hjælper dig med at arbejde med dit Shopify tema og tilføje Gear Match appen.

## 📋 Forudsætninger

1. **Shopify CLI installeret** (allerede installeret globalt)
2. **Autentificering** - Du skal være logget ind i Shopify CLI

## 🚀 Hurtig Start

### 1. Autentificer dig

```bash
npm run shopify:auth
```

Eller manuelt:
```bash
shopify auth login
```

**Note:** Den nye Shopify CLI vil spørge dig om hvilken store du vil bruge efter login. Vælg `frederikhoegh.myshopify.com`.

### 2. Se tilgængelige temaer

```bash
npm run shopify:list
```

Dette viser alle dine temaer (live, development, osv.)

### 3. Hent dit tema lokalt

```bash
npm run shopify:pull
```

Dette henter dit aktive tema til `./shopify-theme/` mappen.

**Alternativt:** Hent et specifikt tema:
```bash
shopify theme pull --path ./shopify-theme --theme [THEME_ID]
```

### 4. Tilføj Gear Match sektionen

```bash
chmod +x scripts/add-gear-match-section.sh
./scripts/add-gear-match-section.sh
```

Dette opretter en ny sektion fil: `shopify-theme/sections/gear-match.liquid`

### 5. Preview ændringer lokalt

```bash
npm run shopify:dev
```

Dette:
- Starter en lokal preview server
- Syncer ændringer automatisk
- Giver dig en preview URL

### 6. Push ændringer til Shopify

Når du er tilfreds med ændringerne:

```bash
npm run shopify:push
```

**⚠️ VIGTIGT:** Dette overskriver temaet på Shopify. Vælg om du vil pushe til:
- Development theme (anbefalet først)
- Live theme (kun når du er sikker)

## 📁 Projektstruktur

```
Surfmore/
├── shopify-theme/          # Dit Shopify tema (hentes lokalt)
│   ├── sections/           # Sektioner (fx gear-match.liquid)
│   ├── snippets/           # Snippets
│   ├── templates/          # Templates
│   └── ...
├── scripts/
│   ├── shopify-setup.sh    # Setup script
│   └── add-gear-match-section.sh  # Tilføj Gear Match sektion
├── shopify.theme.toml      # Shopify CLI konfiguration
└── ...
```

## 🎨 Tilføj Gear Match til dit tema

### Metode 1: Via Shopify Admin (Nem)

1. Gå til **Online Store** → **Themes** → **Customize**
2. Klik **Add section**
3. Vælg **Custom Liquid**
4. Indsæt denne kode:

```liquid
<div style="height: 1000px; width: 100%;">
  <iframe 
    src="https://surfmore-vinterbadning.vercel.app" 
    width="100%" 
    height="100%"
    style="border:none; display:block;"
    loading="lazy"
  ></iframe>
</div>
```

### Metode 2: Via Theme Files (Avanceret)

1. Hent temaet: `npm run shopify:pull`
2. Tilføj sektionen: `./scripts/add-gear-match-section.sh`
3. Preview: `npm run shopify:dev`
4. Push: `npm run shopify:push`

## 🔧 Tilgængelige Commands

| Command | Beskrivelse |
|---------|-------------|
| `npm run shopify:auth` | Log ind i Shopify CLI |
| `npm run shopify:list` | Vis alle temaer |
| `npm run shopify:pull` | Hent tema lokalt |
| `npm run shopify:push` | Push ændringer til Shopify |
| `npm run shopify:dev` | Start lokal preview server |
| `npm run shopify:info` | Vis tema information |

## 📝 Arbejde med tema-filer

### Oprette en ny sektion

1. Opret fil i `shopify-theme/sections/my-section.liquid`
2. Tilføj schema (se eksempel i `gear-match.liquid`)
3. Preview med `npm run shopify:dev`
4. Push med `npm run shopify:push`

### Redigere eksisterende sektioner

1. Find filen i `shopify-theme/sections/`
2. Rediger filen
3. Preview ændringer lokalt
4. Push når klar

## ⚠️ Vigtige Noter

- **Backup først:** Tag altid backup af dit live tema før store ændringer
- **Development theme:** Brug development theme til test først
- **Git:** Tema-filer er ignoreret i `.gitignore` (tilføj dem hvis du vil versionere dem)
- **App URL:** Opdater URL'en i sektionen hvis appen flytter

## 🐛 Troubleshooting

### "Not authenticated"
```bash
npm run shopify:auth
```

### "Theme directory not found"
```bash
npm run shopify:pull
```

### "Permission denied" på scripts
```bash
chmod +x scripts/*.sh
```

## 📚 Ressourcer

- [Shopify CLI Documentation](https://shopify.dev/docs/api/shopify-cli)
- [Theme Development](https://shopify.dev/docs/storefronts/themes)
- [Liquid Documentation](https://shopify.dev/docs/api/liquid)
