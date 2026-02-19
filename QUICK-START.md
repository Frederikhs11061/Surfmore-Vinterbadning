# 🚀 Hurtig Start Guide - Shopify Tema

## Step 1: Autentificer dig (VIGTIGT - Gør dette først!)

Åbn din **egen terminal** (ikke i Cursor) og kør:

```bash
cd /Users/frederikhs1106/Surfmore
npm run shopify:auth
```

**Eller direkte:**
```bash
shopify auth login
```

Dette vil spørge dig om hvilken store du vil bruge efter login.

Dette vil:
- Åbne en browser
- Spørge om du vil logge ind
- Autentificere dig med Shopify

**✅ Når det er færdigt, skal du se en bekræftelse i terminalen.**

---

## Step 2: Tjek at det virker

```bash
npm run shopify:list
```

Du skal se en liste over dine temaer (Live, Development, osv.)

---

## Step 3: Hent dit tema

```bash
npm run shopify:pull
```

Dette henter dit aktive tema til `./shopify-theme/` mappen.

**Hvis du vil hente et specifikt tema:**
```bash
shopify theme pull --store frederikhoegh.myshopify.com --path ./shopify-theme --theme [THEME_ID]
```

---

## Step 4: Tilføj Gear Match sektionen

```bash
./scripts/add-gear-match-section.sh
```

Dette opretter `shopify-theme/sections/gear-match.liquid`

---

## Step 5: Preview lokalt (valgfrit)

```bash
npm run shopify:dev
```

Dette starter en lokal server hvor du kan se ændringerne.

---

## Step 6: Push til Shopify

Når du er klar:

```bash
npm run shopify:push
```

**⚠️ VIGTIGT:** Vælg om du vil pushe til:
- Development theme (anbefalet - til test)
- Live theme (kun når du er sikker)

---

## ❓ Hvad hvis noget går galt?

### "Not authenticated"
→ Kør Step 1 igen (`npm run shopify:auth`)

### "Theme directory not found"  
→ Kør Step 3 (`npm run shopify:pull`)

### "Permission denied" på scripts
→ Kør: `chmod +x scripts/*.sh`

### Kommandoer virker ikke i Cursor terminal
→ Brug din egen terminal (Terminal.app på Mac) i stedet

---

## 📝 Hvad skal du gøre nu?

1. **Åbn din egen terminal** (ikke Cursor's terminal)
2. **Kør:** `cd /Users/frederikhs1106/Surfmore`
3. **Kør:** `npm run shopify:auth`
4. **Følg instruktionerne** i browseren
5. **Kom tilbage** når autentificeringen er færdig!
