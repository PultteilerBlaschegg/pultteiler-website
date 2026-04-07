import { useState, useEffect, useRef } from "react";

const C = {
  bg: "#0C0C0C",
  bgCard: "#141414",
  bgElevated: "#1A1A1A",
  surface: "#222222",
  text: "#F0EDE8",
  textMuted: "#8A8580",
  accent: "#D4A03C",
  accentHover: "#E8B44A",
  white: "#FFFFFF",
  border: "#2A2A2A",
  borderLight: "#333",
  red: "#C44D3F",
  green: "#5A9E6F",
};

const NAV = [
  { id: "home", label: "START" },
  { id: "produkte", label: "PRODUKTE" },
  { id: "grosshandel", label: "GROSSHANDEL" },
  { id: "galerie", label: "REFERENZEN" },
  { id: "kontakt", label: "KONTAKT" },
];

function Nav({ page, setPage }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(12,12,12,0.96)" : "transparent",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      borderBottom: scrolled ? `1px solid ${C.border}` : "1px solid transparent",
      transition: "all 0.3s",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", height: 72, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <button onClick={() => { setPage("home"); setOpen(false); }} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 12, padding: 0 }}>
          <div style={{ width: 40, height: 40, background: C.accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <rect x="3" y="2" width="6.5" height="18" fill="white" opacity="0.95" />
              <rect x="12.5" y="2" width="6.5" height="18" fill="white" opacity="0.55" />
            </svg>
          </div>
          <span style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: 26, color: C.text, letterSpacing: "0.05em" }}>PULTTEILER</span>
        </button>

        <div style={{ display: "flex", gap: 4, alignItems: "center" }} className="desk-nav">
          {NAV.map(n => (
            <button key={n.id} onClick={() => setPage(n.id)} style={{
              background: page === n.id ? C.surface : "none", border: "none", cursor: "pointer",
              padding: "8px 16px", fontFamily: "'Inter Tight', sans-serif", fontSize: 11, fontWeight: 600,
              letterSpacing: "0.12em", color: page === n.id ? C.accent : C.textMuted, transition: "all 0.2s",
            }}>{n.label}</button>
          ))}
        </div>

        <button onClick={() => setOpen(!open)} className="mob-btn" style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: 8 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" stroke={C.text} strokeWidth="2" fill="none">
            {open ? <><line x1="6" y1="6" x2="18" y2="18"/><line x1="6" y1="18" x2="18" y2="6"/></> :
              <><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/></>}
          </svg>
        </button>
      </div>

      {open && (
        <div style={{ background: C.bg, borderBottom: `1px solid ${C.border}`, padding: "8px 32px 20px" }}>
          {NAV.map(n => (
            <button key={n.id} onClick={() => { setPage(n.id); setOpen(false); }} style={{
              display: "block", width: "100%", textAlign: "left", background: page === n.id ? C.surface : "none",
              border: "none", cursor: "pointer", padding: "14px 16px", fontFamily: "'Inter Tight', sans-serif",
              fontSize: 13, fontWeight: 600, letterSpacing: "0.1em", color: page === n.id ? C.accent : C.textMuted,
            }}>{n.label}</button>
          ))}
        </div>
      )}
    </nav>
  );
}

function Footer({ setPage }) {
  return (
    <footer style={{ background: C.bg, borderTop: `1px solid ${C.border}`, padding: "72px 32px 40px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 48 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <div style={{ width: 32, height: 32, background: C.accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="18" height="18" viewBox="0 0 22 22" fill="none">
                <rect x="3" y="2" width="6.5" height="18" fill="white" opacity="0.95" />
                <rect x="12.5" y="2" width="6.5" height="18" fill="white" opacity="0.55" />
              </svg>
            </div>
            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: C.text, letterSpacing: "0.05em" }}>PULTTEILER</span>
          </div>
          <p style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 13, color: C.textMuted, lineHeight: 1.7 }}>
            Direkt vom Hersteller. Der bewährte<br />Sichtschutz für den Bildungssektor<br />in AT, DE und CH.
          </p>
        </div>
        <div>
          <h4 style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", color: C.textMuted, marginBottom: 20 }}>SEITEN</h4>
          {NAV.map(n => (
            <button key={n.id} onClick={() => setPage(n.id)} style={{ display: "block", background: "none", border: "none", cursor: "pointer", fontFamily: "'Inter Tight', sans-serif", fontSize: 13, color: "#555", padding: "5px 0" }}>{n.label}</button>
          ))}
        </div>
        <div>
          <h4 style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", color: C.textMuted, marginBottom: 20 }}>KONTAKT</h4>
          <p style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 13, color: "#555", lineHeight: 2 }}>
            Schulmittel Blaschegg<br />Michael Blaschegg<br />
            <a href="mailto:blaschegg@traunseenet.at" style={{ color: C.accent, textDecoration: "none" }}>blaschegg@traunseenet.at</a><br />
            +43 (0) 699 129 613 70
          </p>
        </div>
      </div>
      <div style={{ maxWidth: 1280, margin: "48px auto 0", borderTop: `1px solid ${C.border}`, paddingTop: 24, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <span style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 12, color: "#444" }}>© {new Date().getFullYear()} Schulmittel Blaschegg</span>
        <span style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 12, color: "#444" }}>UID: ATU37758404</span>
      </div>
    </footer>
  );
}

function Reveal({ children, delay = 0 }) {
  const [v, setV] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.12 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(20px)", transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s` }}>
      {children}
    </div>
  );
}

function Badge({ children, color = C.accent }) {
  return (
    <span style={{
      fontFamily: "'Inter Tight', sans-serif", fontSize: 10, fontWeight: 700,
      letterSpacing: "0.14em", textTransform: "uppercase", color: color,
      background: `${color}18`, padding: "5px 12px", display: "inline-block",
    }}>{children}</span>
  );
}

function Heading({ overline, title, sub, align = "left" }) {
  return (
    <div style={{ textAlign: align, marginBottom: 56 }}>
      {overline && <div style={{ marginBottom: 16 }}><Badge>{overline}</Badge></div>}
      <h2 style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: "clamp(32px, 5vw, 56px)", color: C.text, margin: "0 0 16px", letterSpacing: "0.03em", lineHeight: 1, whiteSpace: "pre-line" }}>{title}</h2>
      {sub && <p style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 16, color: C.textMuted, maxWidth: align === "center" ? 560 : "none", margin: align === "center" ? "0 auto" : 0, lineHeight: 1.6 }}>{sub}</p>}
    </div>
  );
}

function Btn({ children, onClick, variant = "primary", full = false }) {
  const isPrimary = variant === "primary";
  return (
    <button onClick={onClick} style={{
      background: isPrimary ? C.accent : "transparent",
      color: isPrimary ? C.bg : C.text,
      border: isPrimary ? "none" : `1.5px solid ${C.borderLight}`,
      padding: "14px 32px", fontFamily: "'Inter Tight', sans-serif",
      fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
      cursor: "pointer", transition: "all 0.2s", width: full ? "100%" : "auto",
    }}
    onMouseEnter={e => {
      if (isPrimary) { e.target.style.background = C.accentHover; e.target.style.transform = "translateY(-2px)"; }
      else { e.target.style.borderColor = C.accent; e.target.style.color = C.accent; }
    }}
    onMouseLeave={e => {
      if (isPrimary) { e.target.style.background = C.accent; e.target.style.transform = "translateY(0)"; }
      else { e.target.style.borderColor = C.borderLight; e.target.style.color = C.text; }
    }}>{children}</button>
  );
}

function DividerSVG({ size = 160, color = C.accent }) {
  return (
    <svg width={size} height={size} viewBox="0 0 160 160" fill="none">
      <rect x="16" y="105" width="128" height="8" fill={`${color}30`} />
      <rect x="30" y="28" width="42" height="77" stroke={color} strokeWidth="2" fill={`${color}10`} />
      <rect x="88" y="28" width="42" height="77" stroke={color} strokeWidth="1.5" strokeDasharray="5 3" fill={`${color}06`} />
      <path d="M70 100v18h20v-18" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="square" />
    </svg>
  );
}

// ─── Pages ───

function Home({ go }) {
  return (
    <div>
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "120px 32px 80px", background: C.bg, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${C.border} 1px, transparent 1px), linear-gradient(90deg, ${C.border} 1px, transparent 1px)`, backgroundSize: "80px 80px", opacity: 0.3 }} />
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 4, background: `linear-gradient(180deg, transparent 20%, ${C.accent} 50%, transparent 80%)` }} />
        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1, width: "100%" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 64, alignItems: "center" }} className="hero-g">
            <div>
              <Reveal><Badge>DIREKT VOM HERSTELLER — SEIT ÜBER 10 JAHREN</Badge></Reveal>
              <Reveal delay={0.1}>
                <h1 style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: "clamp(48px, 7vw, 96px)", color: C.text, lineHeight: 0.95, margin: "24px 0 28px", letterSpacing: "0.02em" }}>
                  SICHTSCHUTZ<br /><span style={{ color: C.accent }}>FÜR SCHULEN.</span><br /><span style={{ color: C.textMuted, fontSize: "0.6em" }}>DIREKT & FAIR.</span>
                </h1>
              </Reveal>
              <Reveal delay={0.2}>
                <p style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 17, color: C.textMuted, lineHeight: 1.7, maxWidth: 520, margin: "0 0 40px", borderLeft: `3px solid ${C.accent}`, paddingLeft: 20 }}>
                  Der Pultteiler ist der Standard-Sichtschutz für schriftliche Prüfungen an Schulen in Österreich, Deutschland und der Schweiz. Einfaches Stecksystem, robuste Verarbeitung, faire Großhandelskonditionen.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                  <Btn onClick={() => go("grosshandel")}>GROSSHANDEL ANFRAGEN</Btn>
                  <Btn onClick={() => go("produkte")} variant="secondary">PRODUKTE ANSEHEN →</Btn>
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.2}>
              <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, padding: 56, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <DividerSVG size={240} />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section style={{ background: C.bgCard, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "48px 32px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 32 }}>
          {[
            { val: "500+", label: "SCHULEN BELIEFERT" },
            { val: "12", label: "SETS PRO KOFFER" },
            { val: "3", label: "LÄNDER: AT · DE · CH" },
            { val: "0 €", label: "VERSAND AB 238 €" },
          ].map((m, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div style={{ textAlign: "center", padding: "12px 0" }}>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 48, color: C.accent, letterSpacing: "0.02em", lineHeight: 1 }}>{m.val}</div>
                <div style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", color: C.textMuted, marginTop: 8 }}>{m.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section style={{ padding: "96px 32px", background: C.bg }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <Heading overline="WARUM PULTTEILER" title="SECHS GRÜNDE FÜR DEN BRANCHENSTANDARD" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 2 }}>
            {[
              { num: "01", title: "FAIRE PRÜFUNGSBEDINGUNGEN", text: "Kein Abschreiben, keine Gruppenaufteilung. Alle Schüler schreiben gleichzeitig unter identischen Bedingungen." },
              { num: "02", title: "STECKSYSTEM — KEIN WERKZEUG", text: "Die dauerelastische Klammer fixiert die Trennplatte in Sekunden. Aufbau und Abbau in unter einer Minute." },
              { num: "03", title: "ROBUST & LANGLEBIG", text: "Hochwertige Materialien für jahrelangen Dauereinsatz im Schulalltag. Ersatzteile einzeln nachbestellbar." },
              { num: "04", title: "KOMPAKTER HOLZKOFFER", text: "12 komplette Pultteilsysteme pro Koffer. Leicht zu transportieren, stapelbar, platzsparend im Materialraum." },
              { num: "05", title: "KOSTENLOSER VERSAND AB 238 €", text: "Frei Haus in Österreich und Deutschland ab einem Koffer. Steuerfreie Lieferung nach DE mit UID-Nummer." },
              { num: "06", title: "E-RECHNUNG FÜR BUNDESSCHULEN", text: "Österreichische Bundesschulen erhalten E-Rechnungen. Einkäufergruppe im Bestellvorgang hinterlegbar." },
            ].map((u, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, padding: "36px 32px", transition: "all 0.3s", cursor: "default", height: "100%" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.background = C.bgElevated; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = C.bgCard; }}>
                  <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 36, color: `${C.accent}40`, letterSpacing: "0.02em", lineHeight: 1 }}>{u.num}</span>
                  <h3 style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: "0.08em", color: C.text, margin: "12px 0 10px" }}>{u.title}</h3>
                  <p style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 14, color: C.textMuted, lineHeight: 1.65, margin: 0 }}>{u.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "96px 32px", background: C.bgCard, borderTop: `1px solid ${C.border}` }}>
        <Reveal>
          <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
            <Heading overline="JETZT BESTELLEN" title={"BEREIT FÜR\nGROSSBESTELLUNG?"} align="center" sub="Kontaktieren Sie uns für Staffelpreise, Musterkoffer und individuelle Angebote für Schulträger und Bildungseinrichtungen." />
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <Btn onClick={() => go("grosshandel")}>ANGEBOT ANFORDERN</Btn>
              <Btn onClick={() => go("kontakt")} variant="secondary">KONTAKT</Btn>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

function Produkte({ go }) {
  const items = [
    { name: "SET GELB — BIS 5. SCHULJAHR", desc: "1 Holzkoffer mit 12 Teilerplatten und 12 Klammern. Kleinere Platten, optimiert für Volksschulpulte.", price: "241,00", tag: "VOLKSSCHULE", color: "#D4A843" },
    { name: "SET GELB — AB 6. SCHULJAHR", desc: "1 Holzkoffer mit 12 Teilerplatten und 12 Klammern. Größere Platten für Mittelschul- und Gymnasialpulte.", price: "255,00", tag: "MITTELSCHULE+", color: "#D4A843" },
    { name: "SET GRAU — AB 6. SCHULJAHR", desc: "1 Holzkoffer mit 12 Teilerplatten und 12 Klammern. Dezente graue Variante für höhere Schulen und Universitäten.", price: "255,00", tag: "HÖHERE SCHULEN", color: "#8B8B8B" },
  ];

  return (
    <div style={{ paddingTop: 72 }}>
      <section style={{ padding: "80px 32px 96px", background: C.bg }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Heading overline="SORTIMENT" title="PRODUKTE & PREISE" sub="Alle Preise inkl. MwSt. Jedes Set beinhaltet 12 komplette Pultteilsysteme im Holzkoffer." />
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {items.map((p, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, display: "grid", gridTemplateColumns: "240px 1fr", overflow: "hidden", transition: "border-color 0.3s" }}
                  className="prod-card"
                  onMouseEnter={e => e.currentTarget.style.borderColor = C.accent}
                  onMouseLeave={e => e.currentTarget.style.borderColor = C.border}>
                  <div style={{ background: `${p.color}10`, display: "flex", alignItems: "center", justifyContent: "center", padding: 32, borderRight: `1px solid ${C.border}` }}>
                    <DividerSVG color={p.color} size={150} />
                  </div>
                  <div style={{ padding: "32px 36px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <Badge color={p.color === "#8B8B8B" ? "#888" : C.accent}>{p.tag}</Badge>
                    <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: C.text, margin: "14px 0 10px", letterSpacing: "0.03em" }}>{p.name}</h3>
                    <p style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 14, color: C.textMuted, lineHeight: 1.6, margin: "0 0 24px" }}>{p.desc}</p>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
                      <div>
                        <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 40, color: C.text, letterSpacing: "0.02em" }}>€ {p.price}</span>
                        <span style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 11, color: C.textMuted, marginLeft: 8, letterSpacing: "0.05em" }}>INKL. MWST</span>
                      </div>
                      <Btn onClick={() => go("kontakt")}>ANFRAGEN</Btn>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, marginTop: 2 }} className="info-grid">
            <Reveal delay={0.2}>
              <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, padding: "28px 32px", height: "100%" }}>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div style={{ width: 32, height: 32, background: `${C.green}20`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8l3.5 3.5L13 5" stroke={C.green} strokeWidth="2" strokeLinecap="square"/></svg>
                  </div>
                  <div>
                    <h4 style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: "0.06em", color: C.text, margin: "0 0 6px" }}>VERSAND</h4>
                    <p style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 13, color: C.textMuted, lineHeight: 1.6, margin: 0 }}>AT & DE: € 8,70 — <span style={{ color: C.green }}>kostenlos ab € 238</span>. Schweiz: € 32 — kostenlos ab € 238. Steuerfreie Lieferung nach DE mit UID.</p>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.25}>
              <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, padding: "28px 32px", height: "100%" }}>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div style={{ width: 32, height: 32, background: `${C.accent}20`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke={C.accent} strokeWidth="1.5"/><line x1="8" y1="5" x2="8" y2="8.5" stroke={C.accent} strokeWidth="1.5" strokeLinecap="square"/><circle cx="8" cy="11" r="0.8" fill={C.accent}/></svg>
                  </div>
                  <div>
                    <h4 style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: "0.06em", color: C.text, margin: "0 0 6px" }}>ERSATZTEILE</h4>
                    <p style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 13, color: C.textMuted, lineHeight: 1.6, margin: 0 }}>Klammern und Teilerplatten einzeln nachbestellbar. Kontaktieren Sie uns bei Reparaturbedarf.</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}

function Grosshandel({ go }) {
  return (
    <div style={{ paddingTop: 72 }}>
      <section style={{ padding: "80px 32px 96px", background: C.bg }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Heading overline="B2B & GROSSHANDEL" title={"KONDITIONEN FÜR\nSCHULTRÄGER & HÄNDLER"} sub="Faire Staffelpreise, schnelle Lieferung und persönliche Betreuung für Großbestellungen." />

          <Reveal>
            <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, overflow: "hidden", marginBottom: 2 }}>
              <div style={{ padding: "20px 32px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 12 }}>
                <Badge>STAFFELPREISE</Badge>
                <span style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 13, color: C.textMuted }}>— Mengenrabatte auf Anfrage</span>
              </div>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'Inter Tight', sans-serif" }}>
                  <thead>
                    <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                      {["MENGE", "EINZELPREIS (CA.)", "VERSAND", "VORTEIL"].map((h, i) => (
                        <th key={i} style={{ padding: "14px 24px", textAlign: "left", fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", color: C.textMuted }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { qty: "1 Koffer", price: "€ 241–255", ship: "€ 8,70", benefit: "—" },
                      { qty: "2–5 Koffer", price: "Auf Anfrage", ship: "Kostenlos", benefit: "Mengenrabatt" },
                      { qty: "6–20 Koffer", price: "Auf Anfrage", ship: "Kostenlos", benefit: "Staffelpreis" },
                      { qty: "20+ Koffer", price: "Auf Anfrage", ship: "Kostenlos", benefit: "Sonderkonditionen" },
                    ].map((r, i) => (
                      <tr key={i} style={{ borderBottom: i < 3 ? `1px solid ${C.border}` : "none" }}>
                        <td style={{ padding: "16px 24px", fontSize: 14, fontWeight: 600, color: C.text }}>{r.qty}</td>
                        <td style={{ padding: "16px 24px", fontSize: 14, color: C.textMuted }}>{r.price}</td>
                        <td style={{ padding: "16px 24px", fontSize: 14, color: r.ship === "Kostenlos" ? C.green : C.textMuted }}>{r.ship}</td>
                        <td style={{ padding: "16px 24px", fontSize: 14, color: r.benefit !== "—" ? C.accent : C.textMuted }}>{r.benefit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 2 }}>
            {[
              { title: "SCHULTRÄGER & GEMEINDEN", text: "Ausstattung mehrerer Schulen auf einmal. Individuelle Angebote für komplette Schulbezirke." },
              { title: "BILDUNGSMEDIENHÄNDLER", text: "Attraktive Händlerkonditionen. Lieferung direkt ab Werk an Ihre Kunden oder Ihr Lager." },
              { title: "UNIVERSITÄTEN & HOCHSCHULEN", text: "Graue Variante für Hörsäle. Teststellung eines Musterkoffers auf Anfrage möglich." },
            ].map((b, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, padding: "32px 28px", height: "100%" }}>
                  <h4 style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", color: C.accent, margin: "0 0 10px" }}>{b.title}</h4>
                  <p style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 14, color: C.textMuted, lineHeight: 1.6, margin: 0 }}>{b.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3}>
            <div style={{ marginTop: 48, background: C.bgElevated, border: `1px solid ${C.accent}40`, padding: "48px 40px", textAlign: "center" }}>
              <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, color: C.text, margin: "0 0 12px", letterSpacing: "0.03em" }}>INDIVIDUELLES ANGEBOT ANFORDERN</h3>
              <p style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 14, color: C.textMuted, margin: "0 0 28px" }}>Nennen Sie uns Ihre gewünschte Stückzahl — wir erstellen Ihnen ein maßgeschneidertes Angebot.</p>
              <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
                <a href="mailto:blaschegg@traunseenet.at?subject=Großhandelsanfrage" style={{ textDecoration: "none" }}>
                  <Btn>PER E-MAIL ANFRAGEN</Btn>
                </a>
                <a href="tel:+4369912961370" style={{ textDecoration: "none" }}>
                  <Btn variant="secondary">ANRUFEN: +43 699 129 613 70</Btn>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

function Galerie() {
  const refs = [
    { label: "KLASSENZIMMER IM EINSATZ", cat: "PRAXIS" },
    { label: "HOLZKOFFER GEÖFFNET", cat: "PRODUKT" },
    { label: "KLAMMER-DETAIL", cat: "DETAIL" },
    { label: "VOLKSSCHULE OBERÖSTERREICH", cat: "REFERENZ" },
    { label: "TRANSPARENTE VARIANTE", cat: "PRODUKT" },
    { label: "UNIVERSITÄT HÖRSAAL", cat: "HOCHSCHULE" },
    { label: "GRAUE VARIANTE", cat: "PRODUKT" },
    { label: "REALSCHULE ST. URSULA", cat: "REFERENZ" },
    { label: "SETUP IN 30 SEKUNDEN", cat: "PRAXIS" },
  ];

  return (
    <div style={{ paddingTop: 72 }}>
      <section style={{ padding: "80px 32px 96px", background: C.bg }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Heading overline="REFERENZEN" title="DER PULTTEILER IM EINSATZ" sub="Von der Volksschule bis zur Universität — Eindrücke aus dem Schulalltag." align="center" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 2 }}>
            {refs.map((r, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div style={{
                  background: C.bgCard, border: `1px solid ${C.border}`, aspectRatio: "16/10",
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                  position: "relative", overflow: "hidden", cursor: "pointer", transition: "border-color 0.3s",
                }} onMouseEnter={e => e.currentTarget.style.borderColor = C.accent}
                   onMouseLeave={e => e.currentTarget.style.borderColor = C.border}>
                  <DividerSVG color={C.textMuted} size={100} />
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "32px 20px 16px", background: `linear-gradient(transparent, ${C.bg})` }}>
                    <Badge>{r.cat}</Badge>
                    <div style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 13, fontWeight: 600, color: C.text, marginTop: 6, letterSpacing: "0.04em" }}>{r.label}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.3}>
            <p style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 13, color: C.textMuted, textAlign: "center", marginTop: 40, lineHeight: 1.6, fontStyle: "italic" }}>
              Platzhalter — ersetzen Sie diese mit echten Produktfotos.
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

function Kontakt() {
  const [sent, setSent] = useState(false);
  const inp = {
    width: "100%", padding: "14px 16px", background: C.bgElevated, border: `1px solid ${C.border}`,
    fontFamily: "'Inter Tight', sans-serif", fontSize: 14, color: C.text, outline: "none",
    boxSizing: "border-box", transition: "border-color 0.2s",
  };

  return (
    <div style={{ paddingTop: 72 }}>
      <section style={{ padding: "80px 32px 96px", background: C.bg }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <Heading overline="KONTAKT" title="WIR SIND FÜR SIE DA" align="center" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }} className="contact-g">
            <Reveal>
              <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, padding: "40px 36px", height: "100%" }}>
                <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: C.text, margin: "0 0 32px", letterSpacing: "0.03em" }}>SCHULMITTEL BLASCHEGG</h3>
                {[
                  { icon: "●", label: "ANSPRECHPARTNER", val: "Michael Blaschegg" },
                  { icon: "✉", label: "E-MAIL", val: "blaschegg@traunseenet.at", href: "mailto:blaschegg@traunseenet.at" },
                  { icon: "☎", label: "TELEFON", val: "+43 (0) 699 129 613 70", href: "tel:+4369912961370" },
                  { icon: "◆", label: "UID-NUMMER", val: "ATU37758404" },
                ].map((c, i) => (
                  <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start", marginBottom: 28 }}>
                    <div style={{ width: 36, height: 36, background: `${C.accent}15`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: C.accent, fontSize: 14 }}>{c.icon}</div>
                    <div>
                      <div style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", color: C.textMuted, marginBottom: 4 }}>{c.label}</div>
                      {c.href ? <a href={c.href} style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 15, color: C.accent, textDecoration: "none" }}>{c.val}</a>
                        : <div style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 15, color: C.text }}>{c.val}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, padding: "40px 36px" }}>
                {sent ? (
                  <div style={{ textAlign: "center", padding: "64px 0" }}>
                    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 48, color: C.green }}>✓</div>
                    <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: C.text, margin: "12px 0 8px" }}>NACHRICHT GESENDET</h3>
                    <p style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 14, color: C.textMuted }}>Wir melden uns in Kürze bei Ihnen.</p>
                  </div>
                ) : (
                  <>
                    <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, color: C.text, margin: "0 0 28px", letterSpacing: "0.03em" }}>NACHRICHT SENDEN</h3>
                    {[
                      { label: "NAME / INSTITUTION", ph: "Ihr Name oder Schulname", type: "text" },
                      { label: "E-MAIL", ph: "ihre@email.at", type: "email" },
                    ].map((f, i) => (
                      <div key={i} style={{ marginBottom: 16 }}>
                        <label style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", color: C.textMuted, display: "block", marginBottom: 8 }}>{f.label}</label>
                        <input type={f.type} placeholder={f.ph} style={inp}
                          onFocus={e => e.target.style.borderColor = C.accent}
                          onBlur={e => e.target.style.borderColor = C.border} />
                      </div>
                    ))}
                    <div style={{ marginBottom: 24 }}>
                      <label style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", color: C.textMuted, display: "block", marginBottom: 8 }}>NACHRICHT</label>
                      <textarea rows={5} placeholder="Ihre Nachricht oder Bestellanfrage..." style={{ ...inp, resize: "vertical" }}
                        onFocus={e => e.target.style.borderColor = C.accent}
                        onBlur={e => e.target.style.borderColor = C.border} />
                    </div>
                    <Btn onClick={() => setSent(true)} full>NACHRICHT SENDEN →</Btn>
                  </>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  const go = (p) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); };

  return (
    <div style={{ background: C.bg, minHeight: "100vh", color: C.text }}>
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter+Tight:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }
        body { margin: 0; background: ${C.bg}; }
        ::selection { background: ${C.accent}; color: ${C.bg}; }
        @media (max-width: 768px) {
          .desk-nav { display: none !important; }
          .mob-btn { display: block !important; }
          .hero-g, .prod-card, .contact-g, .info-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <Nav page={page} setPage={go} />
      {page === "home" && <Home go={go} />}
      {page === "produkte" && <Produkte go={go} />}
      {page === "grosshandel" && <Grosshandel go={go} />}
      {page === "galerie" && <Galerie />}
      {page === "kontakt" && <Kontakt />}
      <Footer setPage={go} />
    </div>
  );
}
