# Pultteiler Website

Moderne Website für pultteiler.eu — Sichtschutz für Schulen.

## Lokale Entwicklung

```bash
npm install
npm run dev
```

Öffne http://localhost:5173

## Deployment auf Vercel

### Option A: Über GitHub (empfohlen)

1. Erstelle ein GitHub-Repository und pushe diesen Code
2. Gehe zu https://vercel.com und logge dich mit GitHub ein
3. Klicke "Add New Project" → wähle dein Repository
4. Vercel erkennt Vite automatisch — klicke "Deploy"
5. Fertig! Deine Seite ist live.

### Option B: Direkt per CLI

```bash
npm install -g vercel
vercel
```

## Domain verbinden (pultteiler.eu)

1. In Vercel: Settings → Domains → "pultteiler.eu" eingeben
2. Vercel zeigt dir DNS-Einstellungen an (A-Record oder CNAME)
3. Bei deinem Domain-Registrar diese DNS-Einstellungen eintragen
4. Warte 5–30 Minuten auf DNS-Propagation
5. Webnode-Abo kündigen, sobald alles läuft
