import { useState, useEffect, useRef, createContext, useContext } from "react";

const C = {
  bg: "#FFFFFF", bgCard: "#F7F6F3", bgElevated: "#EFEEE9", surface: "#E8E6E1",
  text: "#1A1A1A", textMuted: "#71706B", accent: "#C08B2D", accentHover: "#D49A33",
  white: "#FFF", border: "#E2E0DB", borderLight: "#D5D3CE", green: "#3D8A56", red: "#C44D3F",
  dark: "#1A1A1A",
};

const CartCtx = createContext();
function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const add = (product) => {
    setItems(prev => {
      const exists = prev.find(i => i.id === product.id);
      if (exists) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
  };
  const remove = (id) => setItems(prev => prev.filter(i => i.id !== id));
  const updateQty = (id, qty) => { if (qty < 1) return remove(id); setItems(prev => prev.map(i => i.id === id ? { ...i, qty } : i)); };
  const clear = () => setItems([]);
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);
  const count = items.reduce((s, i) => s + i.qty, 0);
  return <CartCtx.Provider value={{ items, add, remove, updateQty, clear, total, count }}>{children}</CartCtx.Provider>;
}
function useCart() { return useContext(CartCtx); }

const PRODUCTS = [
  { id: "gelb-vs", name: "SET GELB — BIS 5. SCHULJAHR", short: "Gelb bis 5. SJ", desc: "1 Holzkoffer mit 12 Teilerplatten und 12 Klammern. Kleinere Platten, optimiert für Volksschulpulte.", price: 241, tag: "VOLKSSCHULE", color: "#C08B2D" },
  { id: "gelb-ms", name: "SET GELB — AB 6. SCHULJAHR", short: "Gelb ab 6. SJ", desc: "1 Holzkoffer mit 12 Teilerplatten und 12 Klammern. Größere Platten für Mittelschul- und Gymnasialpulte.", price: 255, tag: "MITTELSCHULE+", color: "#C08B2D" },
  { id: "grau-ms", name: "SET GRAU — AB 6. SCHULJAHR", short: "Grau ab 6. SJ", desc: "1 Holzkoffer mit 12 Teilerplatten und 12 Klammern. Dezente graue Variante für höhere Schulen und Universitäten.", price: 255, tag: "HÖHERE SCHULEN", color: "#777" },
  { id: "klammer", name: "ERSATZKLAMMER", short: "Klammer (Ersatz)", desc: "Einzelne dauerelastische Ersatzklammer.", price: 5, tag: "ERSATZTEIL", color: "#C08B2D" },
  { id: "platte-klein", name: "ERSATZ-TEILERPLATTE KLEIN", short: "Platte klein", desc: "Einzelne Ersatz-Teilerplatte, kleinere Ausführung (bis 5. Schuljahr).", price: 12, tag: "ERSATZTEIL", color: "#C08B2D" },
  { id: "platte-gross", name: "ERSATZ-TEILERPLATTE GROSS", short: "Platte groß", desc: "Einzelne Ersatz-Teilerplatte, größere Ausführung (ab 6. Schuljahr).", price: 14, tag: "ERSATZTEIL", color: "#777" },
];

const NAV = [
  { id: "home", label: "START" },
  { id: "produkte", label: "SHOP" },
  { id: "grosshandel", label: "GROSSHANDEL" },
  { id: "galerie", label: "REFERENZEN" },
  { id: "kontakt", label: "KONTAKT" },
];

function Nav({ page, setPage }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { count } = useCart();
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 20); window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn); }, []);

  return (
    <>
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: scrolled ? "rgba(255,255,255,0.96)" : "transparent", backdropFilter: scrolled ? "blur(16px)" : "none", borderBottom: scrolled ? `1px solid ${C.border}` : "1px solid transparent", transition: "all 0.3s" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", height: 72, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button onClick={() => { setPage("home"); setOpen(false); }} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 12, padding: 0 }}>
            <div style={{ width: 40, height: 40, background: C.dark, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="3" y="2" width="6.5" height="18" fill="white" opacity="0.95"/><rect x="12.5" y="2" width="6.5" height="18" fill="white" opacity="0.55"/></svg>
            </div>
            <span style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: 26, color: C.text, letterSpacing: "0.05em" }}>PULTTEILER</span>
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <div className="desk-nav" style={{ display: "flex", gap: 4 }}>
              {NAV.map(n => (
                <button key={n.id} onClick={() => setPage(n.id)} style={{ background: page === n.id ? C.surface : "none", border: "none", cursor: "pointer", padding: "8px 16px", fontFamily: "'Inter Tight', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", color: page === n.id ? C.text : C.textMuted, transition: "all 0.2s" }}>{n.label}</button>
              ))}
            </div>
            <button onClick={() => setCartOpen(true)} style={{ background: "none", border: "none", cursor: "pointer", padding: "8px 12px", position: "relative" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.text} strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
              {count > 0 && <span style={{ position: "absolute", top: 2, right: 4, background: C.accent, color: C.white, width: 18, height: 18, borderRadius: "50%", fontSize: 10, fontWeight: 700, fontFamily: "'Inter Tight', sans-serif", display: "flex", alignItems: "center", justifyContent: "center" }}>{count}</span>}
            </button>
            <button onClick={() => setOpen(!open)} className="mob-btn" style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: 8 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" stroke={C.text} strokeWidth="2" fill="none">
                {open ? <><line x1="6" y1="6" x2="18" y2="18"/><line x1="6" y1="18" x2="18" y2="6"/></> : <><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/></>}
              </svg>
            </button>
          </div>
        </div>
        {open && (
          <div style={{ background: C.bg, borderBottom: `1px solid ${C.border}`, padding: "8px 32px 20px" }}>
            {NAV.map(n => (
              <button key={n.id} onClick={() => { setPage(n.id); setOpen(false); }} style={{ display: "block", width: "100%", textAlign: "left", background: page === n.id ? C.surface : "none", border: "none", cursor: "pointer", padding: "14px 16px", fontFamily: "'Inter Tight', sans-serif", fontSize: 13, fontWeight: 600, letterSpacing: "0.1em", color: page === n.id ? C.text : C.textMuted }}>{n.label}</button>
            ))}
          </div>
        )}
      </nav>
      {cartOpen && <CartSidebar onClose={() => setCartOpen(false)} setPage={setPage}/>}
    </>
  );
}

function CartSidebar({ onClose }) {
  const { items, updateQty, remove, total, count } = useCart();
  const [orderSent, setOrderSent] = useState(false);
  const shipping = total >= 238 ? 0 : 8.70;
  const sendOrder = () => {
    const lines = items.map(i => `${i.qty}x ${i.short} — € ${(i.price * i.qty).toFixed(2)}`).join("%0A");
    const body = `Bestellung über pultteiler.eu%0A%0A${lines}%0A%0AZwischensumme: € ${total.toFixed(2)}%0AVersand: ${shipping === 0 ? "Kostenlos" : "€ " + shipping.toFixed(2)}%0AGesamtsumme: € ${(total + shipping).toFixed(2)}%0A%0ABitte um Rechnungslegung an:%0AName/Schule: %0AAdresse: %0AUID (falls vorhanden): `;
    window.open(`mailto:blaschegg@traunseenet.at?subject=Bestellung über pultteiler.eu&body=${body}`, "_self");
    setOrderSent(true);
  };

  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.3)", zIndex: 200 }}/>
      <div style={{ position: "fixed", top: 0, right: 0, bottom: 0, width: "min(440px, 90vw)", background: C.bg, borderLeft: `1px solid ${C.border}`, zIndex: 201, display: "flex", flexDirection: "column", boxShadow: "-8px 0 32px rgba(0,0,0,0.08)" }}>
        <div style={{ padding: "24px 28px", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: C.text, margin: 0 }}>WARENKORB <span style={{ color: C.textMuted, fontSize: 20 }}>({count})</span></h3>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: C.textMuted, fontSize: 24, padding: 4 }}>✕</button>
        </div>
        <div style={{ flex: 1, overflow: "auto", padding: "16px 28px" }}>
          {items.length === 0 ? (
            <div style={{ textAlign: "center", padding: "64px 0" }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={C.border} strokeWidth="1.5" style={{ marginBottom: 16 }}><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
              <p style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 14, color: C.textMuted }}>Ihr Warenkorb ist leer.</p>
            </div>
          ) : items.map(item => (
            <div key={item.id} style={{ borderBottom: `1px solid ${C.border}`, padding: "20px 0", display: "flex", gap: 16, alignItems: "flex-start" }}>
              <div style={{ width: 64, height: 64, background: C.bgCard, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <DividerSVG size={40} color={item.color}/>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 4 }}>{item.short}</div>
                <div style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 13, color: C.textMuted }}>€ {item.price.toFixed(2)} / Stk.</div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10 }}>
                  <button onClick={() => updateQty(item.id, item.qty - 1)} style={{ width: 28, height: 28, background: C.bgCard, border: `1px solid ${C.border}`, color: C.text, cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
                  <span style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 14, fontWeight: 600, color: C.text, minWidth: 20, textAlign: "center" }}>{item.qty}</span>
                  <button onClick={() => updateQty(item.id, item.qty + 1)} style={{ width: 28, height: 28, background: C.bgCard, border: `1px solid ${C.border}`, color: C.text, cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
                  <button onClick={() => remove(item.id)} style={{ background: "none", border: "none", cursor: "pointer", color: C.red, fontFamily: "'Inter Tight', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", marginLeft: "auto" }}>ENTFERNEN</button>
                </div>
              </div>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: C.text, flexShrink: 0 }}>€ {(item.price * item.qty).toFixed(2)}</div>
            </div>
          ))}
        </div>
        {items.length > 0 && (
          <div style={{ borderTop: `1px solid ${C.border}`, padding: "24px 28px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 13, color: C.textMuted }}>Zwischensumme</span>
              <span style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 14, color: C.text }}>€ {total.toFixed(2)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 13, color: C.textMuted }}>Versand (AT & DE)</span>
              <span style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 14, color: shipping === 0 ? C.green : C.text }}>{shipping === 0 ? "Kostenlos" : `€ ${shipping.toFixed(2)}`}</span>
            </div>
            {shipping > 0 && <p style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 11, color: C.accent, margin: "4px 0 12px" }}>Noch € {(238 - total).toFixed(2)} bis zum kostenlosen Versand</p>}
            <div style={{ display: "flex", justifyContent: "space-between", borderTop: `1px solid ${C.border}`, paddingTop: 16, marginTop: 8, marginBottom: 20 }}>
              <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: C.text }}>GESAMT</span>
              <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: C.accent }}>€ {(total + shipping).toFixed(2)}</span>
            </div>
            {orderSent ? (
              <div style={{ textAlign: "center", padding: "12px 0" }}>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, color: C.green }}>✓ E-MAIL GEÖFFNET</div>
                <p style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 13, color: C.textMuted }}>Senden Sie die vorausgefüllte E-Mail ab.</p>
              </div>
            ) : (
              <button onClick={sendOrder} style={{ width: "100%", background: C.dark, color: C.white, border: "none", padding: "16px", fontFamily: "'Inter Tight', sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", cursor: "pointer", transition: "background 0.2s" }}
                onMouseEnter={e => e.target.style.background = "#333"} onMouseLeave={e => e.target.style.background = C.dark}>
                BESTELLUNG PER E-MAIL SENDEN →
              </button>
            )}
            <p style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 11, color: C.textMuted, textAlign: "center", marginTop: 12 }}>Alle Preise inkl. MwSt. Zahlung per Rechnung.</p>
          </div>
        )}
      </div>
    </>
  );
}

function Footer({ setPage }) {
  return (
    <footer style={{ background: C.dark, color: "#CCC", padding: "72px 32px 40px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 48 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <div style={{ width: 32, height: 32, background: C.accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="18" height="18" viewBox="0 0 22 22" fill="none"><rect x="3" y="2" width="6.5" height="18" fill="white" opacity="0.95"/><rect x="12.5" y="2" width="6.5" height="18" fill="white" opacity="0.55"/></svg>
            </div>
            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: "#EEE", letterSpacing: "0.05em" }}>PULTTEILER</span>
          </div>
          <p style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 13, color: "#888", lineHeight: 1.7 }}>Direkt vom Hersteller. Der bewährte<br/>Sichtschutz für den Bildungssektor<br/>in AT, DE und CH. Seit über 40 Jahren.</p>
        </div>
        <div>
          <h4 style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", color: "#666", marginBottom: 20 }}>SEITEN</h4>
          {NAV.map(n => <button key={n.id} onClick={() => setPage(n.id)} style={{ display: "block", background: "none", border: "none", cursor: "pointer", fontFamily: "'Inter Tight', sans-serif", fontSize: 13, color: "#777", padding: "5px 0" }}>{n.label}</button>)}
        </div>
        <div>
          <h4 style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", color: "#666", marginBottom: 20 }}>KONTAKT</h4>
          <p style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 13, color: "#777", lineHeight: 2 }}>Schulmittel Blaschegg<br/>Michael Blaschegg<br/><a href="mailto:blaschegg@traunseenet.at" style={{ color: C.accent, textDecoration: "none" }}>blaschegg@traunseenet.at</a><br/>+43 (0) 699 129 613 70</p>
        </div>
      </div>
      <div style={{ maxWidth: 1280, margin: "48px auto 0", borderTop: "1px solid #333", paddingTop: 24, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <span style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 12, color: "#555" }}>© {new Date().getFullYear()} Schulmittel Blaschegg</span>
        <span style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 12, color: "#555" }}>UID: ATU37758404</span>
      </div>
    </footer>
  );
}

function Reveal({ children, delay = 0 }) {
  const [v, setV] = useState(false);
  const ref = useRef(null);
  useEffect(() => { const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.12 }); if (ref.current) obs.observe(ref.current); return () => obs.disconnect(); }, []);
  return <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(20px)", transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s` }}>{children}</div>;
}

function Badge({ children, color = C.accent }) {
  return <span style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color, background: `${color}15`, padding: "5px 12px", display: "inline-block" }}>{children}</span>;
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
  const p = variant === "primary";
  return (
    <button onClick={onClick} style={{ background: p ? C.dark : "transparent", color: p ? C.white : C.text, border: p ? "none" : `1.5px solid ${C.borderLight}`, padding: "14px 32px", fontFamily: "'Inter Tight', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", transition: "all 0.2s", width: full ? "100%" : "auto" }}
      onMouseEnter={e => { if (p) { e.target.style.background = "#333"; e.target.style.transform = "translateY(-2px)"; } else { e.target.style.borderColor = C.accent; e.target.style.color = C.accent; } }}
      onMouseLeave={e => { if (p) { e.target.style.background = C.dark; e.target.style.transform = "translateY(0)"; } else { e.target.style.borderColor = C.borderLight; e.target.style.color = C.text; } }}>{children}</button>
  );
}

function DividerSVG({ size = 160, color = C.accent }) {
  return (
    <svg width={size} height={size} viewBox="0 0 160 160" fill="none">
      <rect x="16" y="105" width="128" height="8" fill={`${color}30`}/>
      <rect x="30" y="28" width="42" height="77" stroke={color} strokeWidth="2" fill={`${color}12`}/>
      <rect x="88" y="28" width="42" height="77" stroke={color} strokeWidth="1.5" strokeDasharray="5 3" fill={`${color}08`}/>
      <path d="M70 100v18h20v-18" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="square"/>
    </svg>
  );
}

function AddToCartBtn({ product }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const handleAdd = () => { add(product); setAdded(true); setTimeout(() => setAdded(false), 1500); };
  return (
    <button onClick={handleAdd} style={{ background: added ? C.green : C.dark, color: C.white, border: "none", padding: "12px 24px", fontFamily: "'Inter Tight', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", cursor: "pointer", transition: "all 0.3s", textTransform: "uppercase" }}>
      {added ? "✓ HINZUGEFÜGT" : "IN DEN WARENKORB"}
    </button>
  );
}

// ─── Pages ───
function Home({ go }) {
  return (
    <div>
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "120px 32px 80px", background: C.bg, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(${C.border} 1px, transparent 1px)`, backgroundSize: "40px 40px", opacity: 0.5 }}/>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 4, background: `linear-gradient(180deg, transparent 20%, ${C.accent} 50%, transparent 80%)` }}/>
        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1, width: "100%" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 64, alignItems: "center" }} className="hero-g">
            <div>
              <Reveal><Badge>SEIT ÜBER 40 JAHREN — DIREKT VOM HERSTELLER</Badge></Reveal>
              <Reveal delay={0.1}>
                <h1 style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: "clamp(48px, 7vw, 96px)", color: C.text, lineHeight: 0.95, margin: "24px 0 28px", letterSpacing: "0.02em" }}>
                  SICHTSCHUTZ<br/><span style={{ color: C.accent }}>FÜR SCHULEN.</span><br/><span style={{ color: C.textMuted, fontSize: "0.6em" }}>DIREKT VOM HERSTELLER.</span>
                </h1>
              </Reveal>
              <Reveal delay={0.2}>
                <p style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 17, color: C.textMuted, lineHeight: 1.7, maxWidth: 520, margin: "0 0 40px", borderLeft: `3px solid ${C.accent}`, paddingLeft: 20 }}>
                  Der Pultteiler ist der Standard-Sichtschutz für schriftliche Prüfungen an Schulen in Österreich, Deutschland und der Schweiz. Einfaches Stecksystem, robuste Verarbeitung, faire Großhandelskonditionen.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                  <Btn onClick={() => go("produkte")}>ZUM SHOP</Btn>
                  <Btn onClick={() => go("grosshandel")} variant="secondary">GROSSHANDEL ANFRAGEN →</Btn>
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.2}>
              <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, padding: 56, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <DividerSVG size={240}/>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section style={{ background: C.bgCard, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "48px 32px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 32 }}>
          {[{ val: "500+", label: "SCHULEN BELIEFERT" }, { val: "40+", label: "JAHRE ERFAHRUNG" }, { val: "3", label: "LÄNDER: AT · DE · CH" }, { val: "0 €", label: "VERSAND AB 238 €" }].map((m, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div style={{ textAlign: "center", padding: "12px 0" }}>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 48, color: C.accent, lineHeight: 1 }}>{m.val}</div>
                <div style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", color: C.textMuted, marginTop: 8 }}>{m.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section style={{ padding: "96px 32px", background: C.bg }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <Heading overline="WARUM PULTTEILER" title="SECHS GRÜNDE FÜR DEN BRANCHENSTANDARD"/>
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
                  <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 36, color: `${C.accent}40`, lineHeight: 1 }}>{u.num}</span>
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
            <Heading overline="JETZT BESTELLEN" title={"BEREIT FÜR\nGROSSBESTELLUNG?"} align="center" sub="Kontaktieren Sie uns für Staffelpreise, Musterkoffer und individuelle Angebote für Schulträger und Bildungseinrichtungen."/>
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

function Produkte() {
  const sets = PRODUCTS.filter(p => !p.tag.includes("ERSATZ"));
  const parts = PRODUCTS.filter(p => p.tag.includes("ERSATZ"));
  return (
    <div style={{ paddingTop: 72 }}>
      <section style={{ padding: "80px 32px 96px", background: C.bg }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Heading overline="ONLINE-SHOP" title="PRODUKTE & PREISE" sub="Alle Preise inkl. MwSt. Legen Sie Produkte in den Warenkorb und bestellen Sie bequem per E-Mail."/>
          <div style={{ display: "flex", flexDirection: "column", gap: 2, marginBottom: 48 }}>
            {sets.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.1}>
                <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, display: "grid", gridTemplateColumns: "220px 1fr", overflow: "hidden", transition: "border-color 0.3s" }} className="prod-card"
                  onMouseEnter={e => e.currentTarget.style.borderColor = C.accent} onMouseLeave={e => e.currentTarget.style.borderColor = C.border}>
                  <div style={{ background: `${p.color}0A`, display: "flex", alignItems: "center", justifyContent: "center", padding: 24, borderRight: `1px solid ${C.border}` }}>
                    <DividerSVG color={p.color} size={140}/>
                  </div>
                  <div style={{ padding: "28px 32px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <Badge color={p.color === "#777" ? "#777" : C.accent}>{p.tag}</Badge>
                    <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 26, color: C.text, margin: "12px 0 8px" }}>{p.name}</h3>
                    <p style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 14, color: C.textMuted, lineHeight: 1.6, margin: "0 0 20px" }}>{p.desc}</p>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
                      <div><span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 36, color: C.text }}>€ {p.price.toFixed(2)}</span><span style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 11, color: C.textMuted, marginLeft: 8, letterSpacing: "0.05em" }}>INKL. MWST</span></div>
                      <AddToCartBtn product={p}/>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Heading overline="ERSATZTEILE" title="EINZELTEILE NACHBESTELLEN" sub="Klammern und Teilerplatten einzeln erhältlich — auch zur Reparatur."/>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 2 }}>
            {parts.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.08}>
                <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, padding: "28px 24px", transition: "border-color 0.3s" }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = C.accent} onMouseLeave={e => e.currentTarget.style.borderColor = C.border}>
                  <Badge>{p.tag}</Badge>
                  <h4 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: C.text, margin: "10px 0 6px" }}>{p.name}</h4>
                  <p style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 13, color: C.textMuted, lineHeight: 1.5, margin: "0 0 20px" }}>{p.desc}</p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: C.text }}>€ {p.price.toFixed(2)}</span>
                    <AddToCartBtn product={p}/>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <div style={{ marginTop: 32, background: `${C.green}08`, border: `1px solid ${C.green}25`, padding: "24px 28px", display: "flex", gap: 12, alignItems: "flex-start" }}>
              <div style={{ width: 32, height: 32, background: `${C.green}15`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8l3.5 3.5L13 5" stroke={C.green} strokeWidth="2" strokeLinecap="square"/></svg>
              </div>
              <div>
                <h4 style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: "0.06em", color: C.text, margin: "0 0 6px" }}>VERSAND & ZAHLUNG</h4>
                <p style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 13, color: C.textMuted, lineHeight: 1.6, margin: 0 }}>AT & DE: € 8,70 — <span style={{ color: C.green, fontWeight: 600 }}>kostenlos ab € 238</span>. Schweiz: € 32 — kostenlos ab € 238. Zahlung per Rechnung. Steuerfreie Lieferung nach DE mit UID.</p>
              </div>
            </div>
          </Reveal>
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
          <Heading overline="B2B & GROSSHANDEL" title={"KONDITIONEN FÜR\nSCHULTRÄGER & HÄNDLER"} sub="Faire Staffelpreise, schnelle Lieferung und persönliche Betreuung für Großbestellungen."/>
          <Reveal>
            <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, overflow: "hidden", marginBottom: 2 }}>
              <div style={{ padding: "20px 32px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 12 }}><Badge>STAFFELPREISE</Badge><span style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 13, color: C.textMuted }}>— Mengenrabatte auf Anfrage</span></div>
              <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'Inter Tight', sans-serif" }}>
                <thead><tr style={{ borderBottom: `1px solid ${C.border}` }}>{["MENGE", "EINZELPREIS (CA.)", "VERSAND", "VORTEIL"].map((h, i) => <th key={i} style={{ padding: "14px 24px", textAlign: "left", fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", color: C.textMuted }}>{h}</th>)}</tr></thead>
                <tbody>
                  {[{ qty: "1 Koffer", price: "€ 241–255", ship: "€ 8,70", b: "—" }, { qty: "2–5 Koffer", price: "Auf Anfrage", ship: "Kostenlos", b: "Mengenrabatt" }, { qty: "6–20 Koffer", price: "Auf Anfrage", ship: "Kostenlos", b: "Staffelpreis" }, { qty: "20+ Koffer", price: "Auf Anfrage", ship: "Kostenlos", b: "Sonderkonditionen" }].map((r, i) => (
                    <tr key={i} style={{ borderBottom: i < 3 ? `1px solid ${C.border}` : "none" }}>
                      <td style={{ padding: "16px 24px", fontSize: 14, fontWeight: 600, color: C.text }}>{r.qty}</td>
                      <td style={{ padding: "16px 24px", fontSize: 14, color: C.textMuted }}>{r.price}</td>
                      <td style={{ padding: "16px 24px", fontSize: 14, color: r.ship === "Kostenlos" ? C.green : C.textMuted, fontWeight: r.ship === "Kostenlos" ? 600 : 400 }}>{r.ship}</td>
                      <td style={{ padding: "16px 24px", fontSize: 14, color: r.b !== "—" ? C.accent : C.textMuted, fontWeight: r.b !== "—" ? 600 : 400 }}>{r.b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 2 }}>
            {[{ title: "SCHULTRÄGER & GEMEINDEN", text: "Ausstattung mehrerer Schulen auf einmal. Individuelle Angebote für komplette Schulbezirke." }, { title: "BILDUNGSMEDIENHÄNDLER", text: "Attraktive Händlerkonditionen. Lieferung direkt ab Werk an Ihre Kunden oder Ihr Lager." }, { title: "UNIVERSITÄTEN & HOCHSCHULEN", text: "Graue Variante für Hörsäle. Teststellung eines Musterkoffers auf Anfrage möglich." }].map((b, i) => (
              <Reveal key={i} delay={i * 0.1}><div style={{ background: C.bgCard, border: `1px solid ${C.border}`, padding: "32px 28px", height: "100%" }}>
                <h4 style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", color: C.accent, margin: "0 0 10px" }}>{b.title}</h4>
                <p style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 14, color: C.textMuted, lineHeight: 1.6, margin: 0 }}>{b.text}</p>
              </div></Reveal>
            ))}
          </div>
          <Reveal delay={0.3}>
            <div style={{ marginTop: 48, background: C.dark, padding: "48px 40px", textAlign: "center" }}>
              <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, color: C.white, margin: "0 0 12px" }}>INDIVIDUELLES ANGEBOT ANFORDERN</h3>
              <p style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 14, color: "#AAA", margin: "0 0 28px" }}>Nennen Sie uns Ihre gewünschte Stückzahl — wir erstellen Ihnen ein maßgeschneidertes Angebot.</p>
              <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
                <a href="mailto:blaschegg@traunseenet.at?subject=Großhandelsanfrage" style={{ textDecoration: "none" }}><button style={{ background: C.accent, color: C.white, border: "none", padding: "14px 32px", fontFamily: "'Inter Tight', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", cursor: "pointer" }}>PER E-MAIL ANFRAGEN</button></a>
                <a href="tel:+4369912961370" style={{ textDecoration: "none" }}><button style={{ background: "transparent", color: C.white, border: "1.5px solid #555", padding: "14px 32px", fontFamily: "'Inter Tight', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", cursor: "pointer" }}>ANRUFEN: +43 699 129 613 70</button></a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

function Galerie() {
  const refs = [{ label: "KLASSENZIMMER IM EINSATZ", cat: "PRAXIS" }, { label: "HOLZKOFFER GEÖFFNET", cat: "PRODUKT" }, { label: "KLAMMER-DETAIL", cat: "DETAIL" }, { label: "VOLKSSCHULE OBERÖSTERREICH", cat: "REFERENZ" }, { label: "TRANSPARENTE VARIANTE", cat: "PRODUKT" }, { label: "UNIVERSITÄT HÖRSAAL", cat: "HOCHSCHULE" }, { label: "GRAUE VARIANTE", cat: "PRODUKT" }, { label: "REALSCHULE ST. URSULA", cat: "REFERENZ" }, { label: "SETUP IN 30 SEKUNDEN", cat: "PRAXIS" }];
  return (
    <div style={{ paddingTop: 72 }}>
      <section style={{ padding: "80px 32px 96px", background: C.bg }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Heading overline="REFERENZEN" title="DER PULTTEILER IM EINSATZ" sub="Von der Volksschule bis zur Universität — Eindrücke aus dem Schulalltag." align="center"/>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 2 }}>
            {refs.map((r, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, aspectRatio: "16/10", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", cursor: "pointer", transition: "border-color 0.3s" }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = C.accent} onMouseLeave={e => e.currentTarget.style.borderColor = C.border}>
                  <DividerSVG color={C.textMuted} size={100}/>
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "32px 20px 16px", background: "linear-gradient(transparent, rgba(255,255,255,0.95))" }}>
                    <Badge>{r.cat}</Badge>
                    <div style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 13, fontWeight: 600, color: C.text, marginTop: 6, letterSpacing: "0.04em" }}>{r.label}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.3}><p style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 13, color: C.textMuted, textAlign: "center", marginTop: 40, fontStyle: "italic" }}>Platzhalter — ersetzen Sie diese mit echten Produktfotos.</p></Reveal>
        </div>
      </section>
    </div>
  );
}

function Kontakt() {
  const [sent, setSent] = useState(false);
  const inp = { width: "100%", padding: "14px 16px", background: C.bgCard, border: `1px solid ${C.border}`, fontFamily: "'Inter Tight', sans-serif", fontSize: 14, color: C.text, outline: "none", boxSizing: "border-box", transition: "border-color 0.2s" };
  return (
    <div style={{ paddingTop: 72 }}>
      <section style={{ padding: "80px 32px 96px", background: C.bg }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <Heading overline="KONTAKT" title="WIR SIND FÜR SIE DA" align="center"/>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }} className="contact-g">
            <Reveal>
              <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, padding: "40px 36px", height: "100%" }}>
                <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: C.text, margin: "0 0 32px" }}>SCHULMITTEL BLASCHEGG</h3>
                {[{ icon: "●", label: "ANSPRECHPARTNER", val: "Michael Blaschegg" }, { icon: "✉", label: "E-MAIL", val: "blaschegg@traunseenet.at", href: "mailto:blaschegg@traunseenet.at" }, { icon: "☎", label: "TELEFON", val: "+43 (0) 699 129 613 70", href: "tel:+4369912961370" }, { icon: "◆", label: "UID-NUMMER", val: "ATU37758404" }].map((c, i) => (
                  <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start", marginBottom: 28 }}>
                    <div style={{ width: 36, height: 36, background: `${C.accent}12`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: C.accent, fontSize: 14 }}>{c.icon}</div>
                    <div>
                      <div style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", color: C.textMuted, marginBottom: 4 }}>{c.label}</div>
                      {c.href ? <a href={c.href} style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 15, color: C.accent, textDecoration: "none" }}>{c.val}</a> : <div style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 15, color: C.text }}>{c.val}</div>}
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
                    <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, color: C.text, margin: "0 0 28px" }}>NACHRICHT SENDEN</h3>
                    {[{ label: "NAME / INSTITUTION", ph: "Ihr Name oder Schulname", type: "text" }, { label: "E-MAIL", ph: "ihre@email.at", type: "email" }].map((f, i) => (
                      <div key={i} style={{ marginBottom: 16 }}>
                        <label style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", color: C.textMuted, display: "block", marginBottom: 8 }}>{f.label}</label>
                        <input type={f.type} placeholder={f.ph} style={inp} onFocus={e => e.target.style.borderColor = C.accent} onBlur={e => e.target.style.borderColor = C.border}/>
                      </div>
                    ))}
                    <div style={{ marginBottom: 24 }}>
                      <label style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", color: C.textMuted, display: "block", marginBottom: 8 }}>NACHRICHT</label>
                      <textarea rows={5} placeholder="Ihre Nachricht oder Bestellanfrage..." style={{ ...inp, resize: "vertical" }} onFocus={e => e.target.style.borderColor = C.accent} onBlur={e => e.target.style.borderColor = C.border}/>
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
    <CartProvider>
      <div style={{ background: C.bg, minHeight: "100vh", color: C.text }}>
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter+Tight:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
        <style>{`
          *, *::before, *::after { box-sizing: border-box; }
          body { margin: 0; background: ${C.bg}; }
          ::selection { background: ${C.accent}; color: ${C.white}; }
          @media (max-width: 768px) {
            .desk-nav { display: none !important; }
            .mob-btn { display: block !important; }
            .hero-g, .prod-card, .contact-g, .info-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
        <Nav page={page} setPage={go}/>
        {page === "home" && <Home go={go}/>}
        {page === "produkte" && <Produkte go={go}/>}
        {page === "grosshandel" && <Grosshandel go={go}/>}
        {page === "galerie" && <Galerie/>}
        {page === "kontakt" && <Kontakt/>}
        <Footer setPage={go}/>
      </div>
    </CartProvider>
  );
}
