# Desi Monk Kitchen — Project Context for Claude

> This file is auto-loaded whenever Claude Code opens this project. It captures everything decided across earlier sessions so a fresh chat picks up without the user having to re-explain. Keep it updated when significant decisions or workflows change.

---

## 1. The user

- **Name on Git:** `crazyboysumit` (GitHub) · email `helloscort.com@gmail.com`
- **Role:** Solo founder of Desi Monk Kitchen — a small home cloud kitchen
- **Working environment:** Windows 11, VS Code with PowerShell terminal, XAMPP at `C:\xampp\htdocs\`, Chrome with at least one AI agent extension capable of automating browser flows
- **Skill profile:** Hands-on with terminal commands, GitHub PAT generation, Gemini, Vercel — not a frontend dev, but reviews UI carefully and pushes back when something looks wrong
- **Communication:** terse, action-oriented, often stream-of-consciousness; mixes English / Hindi / Kannada
- **Stated next phase:** Android app first, then iOS app, reusing the same brand and content

---

## 2. The business — Desi Monk Kitchen

| | |
|---|---|
| **Type** | Home-based cloud kitchen, single operator |
| **Address** | Rupena Agrahara, Bommanahalli, Bengaluru — 560068 |
| **Adjacent** | Silk Board, PROM (used for navigation references) |
| **Hours** | 12:00–3:30 PM lunch · 7:00–11:00 PM dinner · 7 days a week |
| **Free delivery zone** | 3 km radius — Silk Board, BTM 1 & 2, Bommanahalli, Viratnagar, HSR Sec 7, Madiwala, Hongasandra |
| **Outside 3 km** | Zomato + Swiggy (URLs not yet wired — `href="#"` placeholders) |
| **FSSAI** | Registered. License No. is a placeholder (`coming soon`) — user will fill in |
| **Min order for free delivery** | ₹150 |

**Brand voice:** small kitchen, real people, hand-cooked. Avoid corporate / chain-style copy. Reuse phrases: "honest food", "slow-simmered", "no shortcuts", "ghar jaisa", "small kitchen, big flavours".

### Brand kit
- **Mascot:** bald monk with glasses in saffron robes, juggling spice icons
- **Palette:** Saffron `#E8A93C` · Teal-green `#1F5249` · Chili red `#C8342A` · Monastic brown `#6B3416` on cream `#FBF6E9`
- **Type:** Fraunces (display serif) + Inter (body), via Google Fonts
- **Brand assets:** `assets/images/brand/` — 21 cropped variants. Header uses `logo-horizontal.png`. Favicons / app-icons / monk-illustration / spice icons all in this folder.
- **Original brand-kit source:** `Gemini_Generated_Image_s2ahjxs2ahjxs2ah.png` at project root (gitignored).

### Pricing — Budget tier (50% off launch displayed everywhere)
| Item | Quarter | Half | Full |
|---|---|---|---|
| Chicken curry | ₹120 | ₹220 | ₹400 |
| Mutton curry | ₹180 | ₹340 | ₹640 |
| Chapati | ₹15 / pc | ₹55 / 4 | ₹100 / 8 |

Combos: ₹150 (solo chicken) → ₹880 (Sunday Feast mutton). User explicitly chose Budget tier — area is price-sensitive.

---

## 3. Tech stack & current state

- **Stack:** plain static HTML / CSS / JS, no build step, no framework
- **Local path:** `C:\xampp\htdocs\desimonkkitchen.com`
- **GitHub repo:** https://github.com/crazyboysumit/desi-monk-kitchen.git on branch `main`
- **Local git config (per-repo, NOT global):** `user.name = crazyboysumit`, `user.email = helloscort.com@gmail.com`. Don't promote to global without asking.
- **Vercel:** vercel.json is in repo. Custom domain `desimonkkitchen.com` not yet pointed. Verify the user's actual Vercel state before assuming.

### File layout
```
desimonkkitchen.com/
├── index.html, menu.html, about.html, contact.html, delivery.html,
│   order.html, gallery.html, faq.html, terms.html, privacy.html,
│   refund.html, 404.html               (12 pages)
├── assets/
│   ├── css/style.css                   ~900 lines, full design system
│   ├── js/main.js                      mobile nav, scroll-reveal, menu tabs, word-cloud
│   └── images/
│       ├── brand/                      21 logo / favicon / icon variants (TRACKED)
│       └── food/                       26 food + lifestyle photos (TRACKED)
├── prompts/                            Gemini prompts, deployment prompts (GITIGNORED)
├── vercel.json, manifest.json, sitemap.xml, robots.txt   (TRACKED)
├── .htaccess                           Apache-only (GITIGNORED, not needed on Vercel)
├── .gitignore, .vercelignore
└── CLAUDE.md                           THIS FILE (TRACKED so it survives format)
```

### Notable design decisions
- **Header:** `logo-horizontal.png` (full lockup with text), responsive scaling via clamp()
- **Hero:** monk illustration spinning in saffron ring + floating spice icons + cinematic feature banner below
- **Multilingual word-cloud section** between hero and feature strip — English, Hindi, Kannada food terms with subtle pulse + 5 rotators (inspired by box8.in)
- **Combo cards:** 16:10 photo header + tag overlay, hover-zoom on the image
- **Photo focal points:** images are tightly cropped at source, so plain `object-position: center` works everywhere
- **Mobile sticky bar:** Call + WhatsApp / Order at bottom of every page

### Placeholders the user will fill in (do NOT auto-fill without asking)
- `+91-XXXXX-XXXXX` — phone (used in 11+ places)
- `https://wa.me/91XXXXXXXXXX` — WhatsApp link
- `License No. coming soon` — FSSAI license number
- Zomato / Swiggy `href="#"` — partner URLs in nav, footer, order page, CTA banner
- Social media `href="#"` in footer

### Photo library inventory in `assets/images/food/`
- **Chicken:** chicken-curry, kadai-chicken, butter-chicken
- **Mutton:** mutton-curry, mutton-rogan
- **Breads/rice:** chapati, butter-naan, jeera-rice
- **Sides:** dal-tadka, raita, papad-salad, boiled-egg
- **Combos:** meal-combo-chicken, meal-combo-mutton, family-pack-chicken, family-pack-mutton, sunday-feast-chicken, sunday-feast-mutton
- **Lifestyle:** hero-curry-spread, kitchen-interior, sunday-feast (banner), sealed-packaging, delivery-rider, hand-ground-masala
- Plus several `*-wide.jpg` variants for future banners

### Git history snapshot (commits on origin/main as of last update)
1. `3603814` Initial deployment (64 files)
2. `7707a51` Add 4 missing photos (naan, masala, rider, packaging), remove dev placeholders
3. `d7cb593` Add 4 combo card photos: family packs and sunday feasts
4. `6279899` Replace family-pack-chicken.jpg with better composition

Run `git log --oneline origin/main` to confirm latest state.

---

## 4. Image pipeline — how photos go from Gemini to the site

The user generates photos at https://gemini.google.com → drops the PNG into `prompts/` → tells Claude "I've added the image". Claude:

1. Reads newest PNG(s) in `prompts/` to identify the dish/scene
2. Crops the bottom-right Gemini sparkle watermark using PowerShell `System.Drawing` (default region `x=80, y=80, w=1780, h=1780` from a 2048×2048 source)
3. Resizes to 1024×1024 JPG at quality 86 (~150–200 KB)
4. Saves to `assets/images/food/<descriptive-filename>.jpg`
5. Wires the image into the right HTML slot(s) — menu page card, gallery tile, etc.
6. Reports back which slot got which photo

### Reference PowerShell crop function
```powershell
Add-Type -AssemblyName System.Drawing
function Crop-And-Resize-ToJPG {
  param($srcPath, $outPath, $cropX, $cropY, $cropW, $cropH, $finalSize, $quality)
  $img = [System.Drawing.Image]::FromFile($srcPath)
  $cropRect = New-Object System.Drawing.Rectangle($cropX, $cropY, $cropW, $cropH)
  $cropped = New-Object System.Drawing.Bitmap($cropW, $cropH)
  $g1 = [System.Drawing.Graphics]::FromImage($cropped)
  $g1.DrawImage($img, (New-Object System.Drawing.Rectangle(0,0,$cropW,$cropH)), $cropRect, [System.Drawing.GraphicsUnit]::Pixel)
  $g1.Dispose()
  $final = New-Object System.Drawing.Bitmap($finalSize, $finalSize)
  $g2 = [System.Drawing.Graphics]::FromImage($final)
  $g2.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g2.SmoothingMode    = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $g2.PixelOffsetMode  = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $g2.DrawImage($cropped, 0, 0, $finalSize, $finalSize)
  $jpgEncoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
  $params = New-Object System.Drawing.Imaging.EncoderParameters(1)
  $params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]$quality)
  $final.Save($outPath, $jpgEncoder, $params)
  $g2.Dispose(); $final.Dispose(); $cropped.Dispose(); $img.Dispose()
}
```

### Hard rules (user has explicitly told us)
1. **Tight crops, dish fills the frame** — don't leave large empty backgrounds. Re-crop tighter if dish is in only one quadrant of the source.
2. **No duplicate photos across distinct cards** — every card on the menu page must show a unique image.
3. **Watermark must always be cropped out** — never ship the Gemini sparkle to production.
4. **Remove dev-facing distraction text** — placeholder labels like "📷 Photo here", "(Photos coming soon)", footer references to "Gemini prompts file" are NOT to appear on the live site. Form input `placeholder=""` attributes (legitimate UX hints) and content placeholders the user will fill (`+91-XXXXX-XXXXX`, "License No. coming soon") are fine to keep.

### HTML wiring patterns
- **Square dish card:** `<div class="photo" data-prompt="..."><img src="assets/images/food/X.jpg" alt="..." loading="lazy"><span class="badge">...</span><span class="veg ..."></span></div>`
- **Combo card:** `<div class="combo"><div class="photo"><img src="..." alt="..." loading="lazy"><span class="tag">...</span></div><h3>...</h3>...</div>`
- **Gallery tile:** `<div class="gallery-item" data-prompt="..."><img src="..." alt="..." loading="lazy"><div class="label">...</div></div>`
- **Feature banner:** `<div class="feature-banner reveal"><div class="fb-photo"><img></div><div class="fb-text">...</div></div>` (`.reverse` flips photo to right)
- **Full-width feast banner:** `<div class="feast-banner"><img><div class="fb-overlay"><h2>...</h2></div></div>`

---

## 5. External systems & credentials

### GitHub
- Repo: https://github.com/crazyboysumit/desi-monk-kitchen.git on `main`
- Auth flow: user generates PAT at https://github.com/settings/tokens (scope: `repo` only, 90-day expiry), pastes in chat. Claude pushes via inline-URL (`git push https://USER:TOKEN@github.com/...`) so token never lands in `.git/config`. **Always tell user to revoke the token after use.** Assume any previously-shared PAT is now invalid in a new session.

### Vercel
- vercel.json is in repo, ready for import
- Two paths to deploy: (A) user pastes a token from https://vercel.com/account/tokens and Claude runs `npx vercel --token=<TOKEN> --yes --prod`, OR (B) user does the 3-click GitHub-import flow on vercel.com themselves
- Custom domain `desimonkkitchen.com` not yet pointed at Vercel — DNS records (A `@ → 76.76.21.21` + CNAME `www → cname.vercel-dns.com`) need to be added at the registrar after Vercel surfaces the values

### Gemini
- Used for photo generation (Imagen) and likely video generation
- Output: 2048×2048 PNG with bottom-right sparkle watermark
- User pastes Claude's prompt into the Gemini app, generates 2–3 variants, picks the best, drops in `prompts/`

### Domain registrar
- Registrar for desimonkkitchen.com is unconfirmed — ask the user before assuming GoDaddy / Hostinger / Namecheap / etc.

---

## 6. Communication preferences

- **Separate prompt files for delegated work:** when the user has to do something in another tool (Gemini, Chrome AI agent for OAuth/Vercel/DNS), write a standalone `*.md` in `prompts/` AND show the prompt inline. User opens prompts in VS Code and copies them.
- **Naming:** kebab-case, ending in `-prompt.md` or `-help.md`. Examples: `vercel-deployment-prompt.md`, `combo-meal-images-prompts.md`, `chicken-family-pack-redo-prompt.md`.
- **Be honest about environment limits.** When Claude can't run an interactive flow, say so directly and offer two paths (token-based automation OR a Chrome AI agent prompt). Don't fake attempts.
- **Don't auto-fill placeholder values** the user is aware of (`+91-XXXXX-XXXXX`, "License No. coming soon", Zomato/Swiggy URLs) — they want to review the real values before they go in.
- **Reply formatting:** direct answers, tables for comparison, brief end-of-turn summary with "what's next" line. No long preambles. No verbose summaries of just-completed work — show the diff/result briefly.

---

## 7. Future / pending work

### Website
- ✅ All 12 pages built and pushed to GitHub
- ✅ All food / brand / combo / lifestyle photos wired in
- ✅ Multilingual word-cloud section
- ✅ Vercel config ready
- ⏳ Vercel deployment + custom domain DNS (user choosing path A or B)
- ⏳ Replace placeholder phone / WhatsApp / FSSAI license / Zomato-Swiggy URLs / social URLs

### Next phase — Android then iOS apps
User has stated they want to build mobile apps after the website is fully deployed. Platform / architecture decisions (native vs cross-platform, backend vs static, distribution method) have not been made yet — ask before assuming.

Reusable from this project:
- All brand assets in `assets/images/brand/` (especially the app-icon variants and 192/512 PWA icons)
- All food photos in `assets/images/food/` (1024×1024 JPG, watermark-free)
- Menu structure, copy, FAQ text from the 12 HTML pages
- Brand colours, typography, content rules from this file

If the apps live in a different folder, this CLAUDE.md should be referenced by the user for context — Claude memory is per-folder.
