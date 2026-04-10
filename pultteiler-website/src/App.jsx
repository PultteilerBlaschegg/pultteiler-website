import { useState, useEffect, useRef, createContext, useContext } from "react";

const C = {
  bg: "#E4F0F0", bgCard: "#FFFFFF", bgElevated: "#EFF6F6", surface: "#D5E5E5",
  text: "#1A2A2A", textMuted: "#5A6B6B", accent: "#1A9E9E", accentHover: "#22B2B2",
  white: "#FFF", border: "#C5D8D8", borderLight: "#B5CACA", green: "#1A9E9E", red: "#C44D3F",
  dark: "#1A2A2A",
};

const CartCtx = createContext();
function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [region, setRegion] = useState("AT");
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
  const getPrice = (product) => region === "CH" ? (product.priceCH ?? product.priceAT) : product.priceAT;
  const total = items.reduce((s, i) => s + getPrice(i) * i.qty, 0);
  const count = items.reduce((s, i) => s + i.qty, 0);
  const setIds = SETS.map(s => s.id);
  const hasSet = items.some(i => setIds.includes(i.id));
  const shipping = region === "CH" ? 0 : (hasSet ? 0 : 8.70);
  return <CartCtx.Provider value={{ items, add, remove, updateQty, clear, total, count, region, setRegion, getPrice, shipping }}>{children}</CartCtx.Provider>;
}
function useCart() { return useContext(CartCtx); }

const loadEmailJS = () => {
  if (window.emailjs) return Promise.resolve();
  return new Promise((resolve) => {
    const s = document.createElement("script");
    s.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
    s.onload = () => { window.emailjs.init("xV1NC72BHupwuOiKH"); resolve(); };
    document.head.appendChild(s);
  });
};

const SETS = [
  { id: "gelb-vs", name: "SET GELB — BIS 5. SCHULJAHR", short: "Gelb bis 5. SJ", desc: "1 Holzkoffer mit 12 Teilerplatten (50×30 cm) und 12 Klammern. Empfohlen bis zum 5. Schuljahr.", priceAT: 241, priceCH: 238, tag: "", color: "#C08B2D", img: "/images/koffer-gelb.jpg" },
  { id: "gelb-ms", name: "SET GELB — AB 6. SCHULJAHR", short: "Gelb ab 6. SJ", desc: "1 Holzkoffer mit 12 Teilerplatten (50×40 cm) und 12 Klammern. Empfohlen ab dem 6. Schuljahr.", priceAT: 255, priceCH: 252, tag: "", color: "#C08B2D", img: "/images/koffer-gelb.jpg" },
  { id: "grau-ms", name: "SET GRAU — AB 6. SCHULJAHR", short: "Grau ab 6. SJ", desc: "1 Holzkoffer mit 12 Teilerplatten (50×40 cm) und 12 Klammern. Empfohlen ab dem 6. Schuljahr.", priceAT: 255, priceCH: 252, tag: "", color: "#777", img: "/images/koffer-grau.jpg" },
];

const PARTS = [
  { id: "klammer-2", name: "KLAMMER (2 STÜCK)", short: "2x Klammer", desc: "Hochwertige, dauerelastische Klammer im Doppelpack.", priceAT: 19.40, tag: "ERSATZTEIL", color: "#C08B2D", img: "/images/Klammer_1.png" },
  { id: "platte-a", name: "TEILERPLATTE A GELB — 50×30 CM", short: "Platte A gelb klein", desc: "Einzelne Ersatzplatte, bis 5. Schulstufe. Aus hochwertigem Kunststoff.", priceAT: 8.90, tag: "ERSATZTEIL", color: "#C08B2D", img: "/images/pultteiler_gelb.png" },
  { id: "platte-b-gelb", name: "TEILERPLATTE B GELB — 50×40 CM", short: "Platte B gelb groß", desc: "Einzelne Ersatzplatte, ab 5. Schulstufe. Aus hochwertigem Kunststoff.", priceAT: 9.90, tag: "ERSATZTEIL", color: "#C08B2D", img: "/images/pultteiler_gelb.png" },
  { id: "platte-b-grau", name: "TEILERPLATTE B GRAU — 50×40 CM", short: "Platte B grau groß", desc: "Einzelne Ersatzplatte, ab 5. Schulstufe. Aus hochwertigem Kunststoff.", priceAT: 9.90, tag: "ERSATZTEIL", color: "#777", img: "/images/pultteiler_grau.png" },
  { id: "koffer-leer", name: "KOFFER OHNE INHALT", short: "Holzkoffer leer", desc: "Leerer Holzkoffer als Ersatz. Material: Holz.", priceAT: 43.20, tag: "ERSATZTEIL", color: "#C08B2D", img: "/images/Koffer_1.png" },
];

const GALLERY = [
  { src: "/images/klassenzimmer.png", label: "KLASSENZIMMER IM EINSATZ", cat: "PRAXIS" },
  { src: "/images/meduni-innsbruck_2.jpeg", label: "MEDUNI INNSBRUCK — LABOR", cat: "HOCHSCHULE" },
  { src: "/images/pultteiler-einsatz.jpg", label: "EDV-RAUM MIT PULTTEILER", cat: "PRAXIS" },
  { src: "/images/meduni-innsbruck_1.jpeg", label: "MEDUNI INNSBRUCK — NAHAUFNAHME", cat: "HOCHSCHULE" },
  { src: "/images/pultteiler-uni.png", label: "UNIVERSITÄT HÖRSAAL", cat: "HOCHSCHULE" },
  { src: "/images/pultteiler-2.jpg", label: "PULTTEILER IM GROSSRAUM", cat: "REFERENZ" },
  { src: "/images/nahaufnahme.jpeg", label: "NAHAUFNAHME TRENNWÄNDE", cat: "DETAIL" },
];

const NAV = [
  { id: "home", label: "START" },
  { id: "produkte", label: "SHOP" },
  { id: "anleitung", label: "SO FUNKTIONIERT'S" },
  { id: "galerie", label: "REFERENZEN" },
  { id: "ueber-uns", label: "ÜBER UNS" },
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
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: scrolled ? C.bgCard : "transparent", borderBottom: scrolled ? `1px solid ${C.border}` : "1px solid transparent", transition: "all 0.3s" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", height: 72, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button onClick={() => { setPage("home"); setOpen(false); }} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 12, padding: 0 }}>
            <img src="/images/Klammer_2.png" alt="Pultteiler Klammer" style={{ width: 56, height: 56, objectFit: "contain", borderRadius: 4 }}/>
            <span style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: 26, color: C.text, letterSpacing: "0.05em" }}>PULTTEILER</span>
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <div className="desk-nav" style={{ display: "flex", gap: 4 }}>
              {NAV.map(n => <button key={n.id} onClick={() => setPage(n.id)} style={{ background: page === n.id ? C.surface : "none", border: "none", cursor: "pointer", padding: "8px 16px", fontFamily: "'Inter Tight', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", color: page === n.id ? C.text : C.textMuted, transition: "all 0.2s" }}>{n.label}</button>)}
            </div>
            <button onClick={() => setCartOpen(true)} style={{ background: "none", border: "none", cursor: "pointer", padding: "8px 12px", position: "relative" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.text} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>
              {count > 0 && <span style={{ position: "absolute", top: 2, right: 4, background: C.accent, color: C.white, width: 18, height: 18, borderRadius: "50%", fontSize: 10, fontWeight: 700, fontFamily: "'Inter Tight', sans-serif", display: "flex", alignItems: "center", justifyContent: "center" }}>{count}</span>}
            </button>
            <button onClick={() => setOpen(!open)} className="mob-btn" style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: 8 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" stroke={C.text} strokeWidth="2" fill="none">{open ? <><line x1="6" y1="6" x2="18" y2="18"/><line x1="6" y1="18" x2="18" y2="6"/></> : <><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/></>}</svg>
            </button>
          </div>
        </div>
        {open && <div style={{ background: C.bg, borderBottom: `1px solid ${C.border}`, padding: "8px 32px 20px" }}>{NAV.map(n => <button key={n.id} onClick={() => { setPage(n.id); setOpen(false); }} style={{ display: "block", width: "100%", textAlign: "left", background: page === n.id ? C.surface : "none", border: "none", cursor: "pointer", padding: "14px 16px", fontFamily: "'Inter Tight', sans-serif", fontSize: 13, fontWeight: 600, letterSpacing: "0.1em", color: page === n.id ? C.text : C.textMuted }}>{n.label}</button>)}</div>}
      </nav>
      {cartOpen && <CartSidebar onClose={() => setCartOpen(false)}/>}
    </>
  );
}

function CartSidebar({ onClose }) {
  const { items, updateQty, remove, total, count, region, getPrice, shipping, clear } = useCart();
  const [step, setStep] = useState("cart");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [formValues, setFormValues] = useState({});
  const [confirmedOrderNr, setConfirmedOrderNr] = useState("");
  const inp = { width: "100%", padding: "12px 14px", background: C.bgCard, border: `1px solid ${C.border}`, fontFamily: "'Inter Tight', sans-serif", fontSize: 14, color: C.text, outline: "none", boxSizing: "border-box", transition: "border-color 0.2s", marginBottom: 12 };
  const regionLabel = region === "CH" ? "Schweiz (steuerfrei, inkl. Lieferung)" : "Österreich/Deutschland (inkl. MwSt)";

  const generateOrderNr = () => {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, "0");
    const d = String(now.getDate()).padStart(2, "0");
    const rand = String(Math.floor(Math.random() * 100)).padStart(2, "0");
    return `${y}${m}${d}${rand}`;
  };

  const orderSummaryForMailto = () => {
    const lines = items.map(i => `${i.qty}x ${i.name} — € ${(getPrice(i) * i.qty).toFixed(2)}`).join("\n");
    const shippingText = shipping === 0 ? "Kostenlos / inkl." : `€ ${shipping.toFixed(2)}`;
    const plzOrt = `${formValues["PLZ"] || ""} ${formValues["Ort"] || ""}`.trim();
    return `Region: ${regionLabel}\n\n${lines}\n\nVersand: ${shippingText}\nGesamtbetrag: € ${(total + shipping).toFixed(2)}\n\nRechnungsadresse:\n${formValues["Name / Schule"] || ""}\n${formValues["Ansprechperson"] || ""}\n${formValues["Adresse"] || ""}\n${plzOrt}\n${formValues["Land"] || ""}\nE-Mail: ${formValues["email"] || ""}\nTelefon: ${formValues["Telefon"] || "–"}`;
  };

  const goToKontrolle = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const vals = {};
    fd.forEach((v, k) => { if (!k.startsWith("_")) vals[k] = v; });
    setFormValues(vals);
    setStep("kontrolle");
  };

  const handleSubmit = async () => {
    setSending(true);
    setError("");

    const orderNr = generateOrderNr();
    const shippingText = shipping === 0 ? "Kostenlos / inkl." : `€ ${shipping.toFixed(2)}`;
    const bestellungText = items.map(i => `${i.qty}x ${i.name} — € ${(getPrice(i) * i.qty).toFixed(2)}`).join("\n");
    const plzOrt = `${formValues["PLZ"] || ""} ${formValues["Ort"] || ""}`.trim();
    const adresseText = [formValues["Name / Schule"], formValues["Ansprechperson"], formValues["Adresse"], plzOrt, formValues["Land"]].filter(Boolean).join("\n");

    const templateParams = {
      kunde_email: formValues["email"] || "",
      order_nr: orderNr,
      region: region === "CH" ? "Schweiz" : "Österreich / Deutschland",
      bestellung: bestellungText,
      versand: shippingText,
      gesamt: `€ ${(total + shipping).toFixed(2)}`,
      adresse: adresseText,
      telefon: formValues["Telefon"] || "–",
      uid: formValues["UID-Nummer"] || "–",
      einkaufergruppe: formValues["Einkäufergruppe"] || "–",
      anmerkungen: formValues["Anmerkungen"] || "–",
    };

    try {
      await loadEmailJS();
      await window.emailjs.send("service_cobcbsg", "template_7kke6e4", templateParams);
      try {
        await window.emailjs.send("service_cobcbsg", "template_ko0cjvs", templateParams);
      } catch (e) {
        console.warn("Kunden-E-Mail konnte nicht gesendet werden:", e);
      }
      setStep("confirmed");
      setConfirmedOrderNr(orderNr);
      clear();
    } catch (err) {
      setError("Bestellung konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt per E-Mail an blaschegg@traunseenet.at");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.3)", zIndex: 200 }}/>
      <div style={{ position: "fixed", top: 0, right: 0, bottom: 0, width: "min(440px, 90vw)", background: C.bg, borderLeft: `1px solid ${C.border}`, zIndex: 201, display: "flex", flexDirection: "column", boxShadow: "-8px 0 32px rgba(0,0,0,0.08)" }}>
        <div style={{ padding: "24px 28px", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: C.text, margin: 0 }}>
            {step === "cart" && <>WARENKORB <span style={{ color: C.textMuted, fontSize: 20 }}>({count})</span></>}
            {step === "checkout" && "BESTELLUNG"}
            {step === "kontrolle" && "KONTROLLE"}
            {step === "confirmed" && "BESTÄTIGUNG"}
          </h3>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: C.textMuted, fontSize: 24, padding: 4 }}>✕</button>
        </div>

        {step === "cart" && (<>
          <div style={{ flex: 1, overflow: "auto", padding: "16px 28px" }}>
            {items.length === 0 ? (
              <div style={{ textAlign: "center", padding: "64px 0" }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={C.border} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: 16 }}><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>
                <p style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 14, color: C.textMuted }}>Ihr Warenkorb ist leer.</p>
              </div>
            ) : items.map(item => (
              <div key={item.id} style={{ borderBottom: `1px solid ${C.border}`, padding: "20px 0", display: "flex", gap: 16, alignItems: "flex-start" }}>
                <div style={{ width: 64, height: 64, background: C.bgCard, border: `1px solid ${C.border}`, flexShrink: 0, overflow: "hidden" }}>
                  <img src={item.img} alt={item.short} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => e.target.style.display = "none"}/>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 4 }}>{item.short}</div>
                  <div style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 13, color: C.textMuted }}>€ {getPrice(item).toFixed(2)} / Stk.</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10 }}>
                    <button onClick={() => updateQty(item.id, item.qty - 1)} style={{ width: 28, height: 28, background: C.bgCard, border: `1px solid ${C.border}`, color: C.text, cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
                    <span style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 14, fontWeight: 600, color: C.text, minWidth: 20, textAlign: "center" }}>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)} style={{ width: 28, height: 28, background: C.bgCard, border: `1px solid ${C.border}`, color: C.text, cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
                    <button onClick={() => remove(item.id)} style={{ background: "none", border: "none", cursor: "pointer", color: C.red, fontFamily: "'Inter Tight', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", marginLeft: "auto" }}>ENTFERNEN</button>
                  </div>
                </div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: C.text, flexShrink: 0 }}>€ {(getPrice(item) * item.qty).toFixed(2)}</div>
              </div>
            ))}
          </div>
          {items.length > 0 && (
            <div style={{ borderTop: `1px solid ${C.border}`, padding: "24px 28px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}><span style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 13, color: C.textMuted }}>Zwischensumme</span><span style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 14, color: C.text }}>€ {total.toFixed(2)}</span></div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}><span style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 13, color: C.textMuted }}>Versand ({region === "CH" ? "CH" : "AT/DE"})</span><span style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 14, color: C.green }}>{region === "CH" ? "Inkl. Lieferung" : (shipping === 0 ? "Kostenlos" : `€ ${shipping.toFixed(2)}`)}</span></div>
              <div style={{ display: "flex", justifyContent: "space-between", borderTop: `1px solid ${C.border}`, paddingTop: 16, marginTop: 8, marginBottom: 20 }}><span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: C.text }}>GESAMT</span><span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: C.accent }}>€ {(total + shipping).toFixed(2)}</span></div>
              <button onClick={() => setStep("checkout")} style={{ width: "100%", background: C.dark, color: C.white, border: "none", padding: "16px", fontFamily: "'Inter Tight', sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", cursor: "pointer" }}>JETZT BESTELLEN →</button>
              <p style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 11, color: C.textMuted, textAlign: "center", marginTop: 12 }}>{region === "CH" ? "Steuerfrei, unverzollt, inkl. Lieferung." : "Alle Preise inkl. MwSt. Zahlung per Rechnung."}</p>
            </div>
          )}
        </>)}

        {step === "checkout" && (
          <div style={{ flex: 1, overflow: "auto", padding: "24px 28px" }}>
            <button onClick={() => setStep("cart")} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Inter Tight', sans-serif", fontSize: 12, color: C.accent, fontWeight: 600, letterSpacing: "0.08em", padding: 0, marginBottom: 20 }}>← ZURÜCK ZUM WARENKORB</button>
            <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, padding: "16px 20px", marginBottom: 24 }}>
              <div style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", color: C.textMuted, marginBottom: 10 }}>IHRE BESTELLUNG</div>
              {items.map(item => (
                <div key={item.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, fontFamily: "'Inter Tight', sans-serif", fontSize: 13 }}>
                  <span style={{ color: C.text }}>{item.qty}x {item.short}</span>
                  <span style={{ color: C.textMuted }}>€ {(getPrice(item) * item.qty).toFixed(2)}</span>
                </div>
              ))}
              <div style={{ borderTop: `1px solid ${C.border}`, marginTop: 10, paddingTop: 10, display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, color: C.text }}>GESAMT</span>
                <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, color: C.accent }}>€ {(total + shipping).toFixed(2)}</span>
              </div>
            </div>
            <div style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", color: C.textMuted, marginBottom: 12 }}>RECHNUNGSADRESSE</div>
            <form onSubmit={goToKontrolle}>
              <input type="text" name="Name / Schule" placeholder="Name oder Schulname *" required style={inp} onFocus={e => e.target.style.borderColor = C.accent} onBlur={e => e.target.style.borderColor = C.border}/>
              <input type="text" name="Ansprechperson" placeholder="Ansprechperson" style={inp} onFocus={e => e.target.style.borderColor = C.accent} onBlur={e => e.target.style.borderColor = C.border}/>
              <input type="text" name="Adresse" placeholder="Straße und Hausnummer *" required style={inp} onFocus={e => e.target.style.borderColor = C.accent} onBlur={e => e.target.style.borderColor = C.border}/>
              <div style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: 8 }}>
                <input type="text" name="PLZ" placeholder="PLZ *" required style={inp} onFocus={e => e.target.style.borderColor = C.accent} onBlur={e => e.target.style.borderColor = C.border}/>
                <input type="text" name="Ort" placeholder="Ort *" required style={inp} onFocus={e => e.target.style.borderColor = C.accent} onBlur={e => e.target.style.borderColor = C.border}/>
              </div>
              <input type="text" name="Land" placeholder="Land *" required defaultValue={region === "CH" ? "Schweiz" : "Österreich"} style={inp} onFocus={e => e.target.style.borderColor = C.accent} onBlur={e => e.target.style.borderColor = C.border}/>
              <input type="email" name="email" placeholder="E-Mail Adresse *" required style={inp} onFocus={e => e.target.style.borderColor = C.accent} onBlur={e => e.target.style.borderColor = C.border}/>
              <input type="tel" name="Telefon" placeholder="Telefonnummer (optional)" style={inp} onFocus={e => e.target.style.borderColor = C.accent} onBlur={e => e.target.style.borderColor = C.border}/>
              {region === "AT" && <input type="text" name="UID-Nummer" placeholder="UID-Nummer (optional, für steuerfreie Lieferung nach DE)" style={inp} onFocus={e => e.target.style.borderColor = C.accent} onBlur={e => e.target.style.borderColor = C.border}/>}
              <input type="text" name="Einkäufergruppe" placeholder="Einkäufergruppe (optional, für österr. Bundesschulen)" style={inp} onFocus={e => e.target.style.borderColor = C.accent} onBlur={e => e.target.style.borderColor = C.border}/>
              <textarea name="Anmerkungen" placeholder="Anmerkungen zur Bestellung (optional)" rows={3} style={{ ...inp, resize: "vertical" }} onFocus={e => e.target.style.borderColor = C.accent} onBlur={e => e.target.style.borderColor = C.border}/>
              <button type="submit" style={{ width: "100%", background: C.dark, color: C.white, border: "none", padding: "16px", fontFamily: "'Inter Tight', sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", cursor: "pointer", marginTop: 8 }}>
                WEITER ZUR KONTROLLE →
              </button>
              <p style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 11, color: C.textMuted, textAlign: "center", marginTop: 12 }}>Zahlung per Rechnung. Sie erhalten die Rechnung mit der Lieferung oder per E-Mail.</p>
            </form>
          </div>
        )}

        {step === "kontrolle" && (
          <div style={{ flex: 1, overflow: "auto", padding: "24px 28px" }}>
            <button onClick={() => { setStep("checkout"); setError(""); }} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Inter Tight', sans-serif", fontSize: 12, color: C.accent, fontWeight: 600, letterSpacing: "0.08em", padding: 0, marginBottom: 20 }}>← ZURÜCK ZUR EINGABE</button>
            <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, padding: "16px 20px", marginBottom: 16 }}>
              <div style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", color: C.textMuted, marginBottom: 10 }}>IHRE BESTELLUNG</div>
              {items.map(item => (
                <div key={item.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, fontFamily: "'Inter Tight', sans-serif", fontSize: 13 }}>
                  <span style={{ color: C.text }}>{item.qty}x {item.short}</span>
                  <span style={{ color: C.textMuted }}>€ {(getPrice(item) * item.qty).toFixed(2)}</span>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, fontFamily: "'Inter Tight', sans-serif", fontSize: 13 }}>
                <span style={{ color: C.textMuted }}>Versand</span>
                <span style={{ color: C.green }}>{shipping === 0 ? "Kostenlos / inkl." : `€ ${shipping.toFixed(2)}`}</span>
              </div>
              <div style={{ borderTop: `1px solid ${C.border}`, marginTop: 10, paddingTop: 10, display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, color: C.text }}>GESAMT</span>
                <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, color: C.accent }}>€ {(total + shipping).toFixed(2)}</span>
              </div>
            </div>
            <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, padding: "16px 20px", marginBottom: 24 }}>
              <div style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", color: C.textMuted, marginBottom: 10 }}>RECHNUNGSADRESSE</div>
              {[
                { label: "Name / Schule", key: "Name / Schule" },
                { label: "Ansprechperson", key: "Ansprechperson" },
                { label: "Adresse", key: "Adresse" },
                { label: "PLZ / Ort", key: "_plzort" },
                { label: "Land", key: "Land" },
                { label: "E-Mail", key: "email" },
                { label: "Telefon", key: "Telefon" },
                { label: "UID-Nummer", key: "UID-Nummer" },
                { label: "Einkäufergruppe", key: "Einkäufergruppe" },
                { label: "Anmerkungen", key: "Anmerkungen" },
              ].map(f => {
                const val = f.key === "_plzort" ? `${formValues["PLZ"] || ""} ${formValues["Ort"] || ""}`.trim() : formValues[f.key];
                if (!val) return null;
                return (
                  <div key={f.label} style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontFamily: "'Inter Tight', sans-serif", fontSize: 13, gap: 12 }}>
                    <span style={{ color: C.textMuted, flexShrink: 0 }}>{f.label}</span>
                    <span style={{ color: C.text, textAlign: "right" }}>{val}</span>
                  </div>
                );
              })}
            </div>
            <div style={{ background: `${C.accent}08`, border: `1px solid ${C.accent}25`, padding: "12px 16px", marginBottom: 16 }}>
              <p style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 10, color: C.textMuted, lineHeight: 1.6, margin: 0 }}>Mit dem Absenden der Bestellung bestätigen Sie, die <span style={{ color: C.accent, cursor: "pointer", textDecoration: "underline" }} onClick={() => window.open("#agb", "_blank")}>AGB</span> und <span style={{ color: C.accent, cursor: "pointer", textDecoration: "underline" }} onClick={() => window.open("#datenschutz", "_blank")}>Datenschutzerklärung</span> gelesen zu haben. Als Verbraucher haben Sie ein 14-tägiges Widerrufsrecht gem. § 11 FAGG.</p>
            </div>
            <button onClick={handleSubmit} disabled={sending} style={{ width: "100%", background: sending ? C.textMuted : C.dark, color: C.white, border: "none", padding: "16px", fontFamily: "'Inter Tight', sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", cursor: sending ? "wait" : "pointer" }}>
              {sending ? "WIRD GESENDET..." : "BESTELLUNG ABSENDEN →"}
            </button>
            <p style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 11, color: C.textMuted, textAlign: "center", marginTop: 12 }}>Zahlung per Rechnung. Sie erhalten die Rechnung mit der Lieferung oder per E-Mail.</p>
            {error && (
              <div style={{ background: "#FEF2F2", border: `1px solid ${C.red}`, padding: "14px 18px", marginTop: 16 }}>
                <div style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 13, color: C.red, lineHeight: 1.5 }}>{error}</div>
                <a href={`mailto:blaschegg@traunseenet.at?subject=${encodeURIComponent("Bestellung über pultteiler.eu")}&body=${encodeURIComponent(orderSummaryForMailto())}`} style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 12, color: C.red, fontWeight: 600, display: "inline-block", marginTop: 8 }}>
                  → Alternativ per E-Mail bestellen
                </a>
              </div>
            )}
          </div>
        )}

        {step === "confirmed" && (
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 28px" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 64, color: C.green, marginBottom: 8 }}>✓</div>
              <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: C.text, margin: "0 0 12px" }}>BESTELLUNG EINGEGANGEN</h3>
              {confirmedOrderNr && <p style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 12, color: C.accent, fontWeight: 600, letterSpacing: "0.08em", margin: "0 0 12px" }}>BESTELLNR. {confirmedOrderNr}</p>}
              <p style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 14, color: C.textMuted, lineHeight: 1.6, maxWidth: 300, margin: "0 auto 24px" }}>Vielen Dank für Ihre Bestellung! Wir haben Ihre Anfrage erhalten und melden uns in Kürze mit einer Bestätigung per E-Mail.</p>
              <button onClick={onClose} style={{ background: C.dark, color: C.white, border: "none", padding: "14px 32px", fontFamily: "'Inter Tight', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", cursor: "pointer" }}>WEITER EINKAUFEN</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

function Footer({ setPage }) {
  return (
    <footer style={{ background: C.bg, color: C.text, padding: "72px 32px 40px", borderTop: `1px solid ${C.border}` }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 48 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <img src="/images/Klammer_2.png" alt="Pultteiler Klammer" style={{ width: 44, height: 44, objectFit: "contain", borderRadius: 4 }}/>
            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: C.text, letterSpacing: "0.05em" }}>PULTTEILER</span>
          </div>
          <p style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 13, color: C.textMuted, lineHeight: 1.7 }}>Direkt vom Hersteller. Der bewährte<br/>Pultteiler für Schultische —<br/>europaweit. Seit über 40 Jahren.</p>
        </div>
        <div>
          <h4 style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", color: C.textMuted, marginBottom: 20 }}>SEITEN</h4>
          {NAV.map(n => <button key={n.id} onClick={() => setPage(n.id)} style={{ display: "block", background: "none", border: "none", cursor: "pointer", fontFamily: "'Inter Tight', sans-serif", fontSize: 13, color: C.text, padding: "5px 0" }}>{n.label}</button>)}
        </div>
        <div>
          <h4 style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", color: C.textMuted, marginBottom: 20 }}>KONTAKT</h4>
          <p style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 13, color: C.text, lineHeight: 2 }}>Schulmittel Blaschegg<br/>Michael Blaschegg<br/>Stücklbachstraße 13, 4813 Altmünster<br/><a href="mailto:blaschegg@traunseenet.at" style={{ color: C.accent, textDecoration: "none" }}>blaschegg@traunseenet.at</a><br/>+43 (0) 676 935 40 33<br/>+43 (0) 699 129 613 70</p>
        </div>
      </div>
      <div style={{ maxWidth: 1280, margin: "48px auto 0", borderTop: `1px solid ${C.border}`, paddingTop: 24, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
        <span style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 12, color: C.textMuted }}>© {new Date().getFullYear()} Schulmittel Blaschegg</span>
        <div style={{ display: "flex", gap: 20 }}>
          {[{ id: "impressum", label: "Impressum" }, { id: "agb", label: "AGB" }, { id: "datenschutz", label: "Datenschutz" }].map(l => (
            <button key={l.id} onClick={() => setPage(l.id)} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Inter Tight', sans-serif", fontSize: 12, color: C.textMuted, padding: 0, textDecoration: "underline" }}>{l.label}</button>
          ))}
        </div>
      </div>
    </footer>
  );
}

function Reveal({ children, delay = 0 }) { const [v, setV] = useState(false); const ref = useRef(null); useEffect(() => { const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.12 }); if (ref.current) obs.observe(ref.current); return () => obs.disconnect(); }, []); return <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(20px)", transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s` }}>{children}</div>; }

function ScrollToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => { const fn = () => setShow(window.scrollY > 400); window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn); }, []);
  if (!show) return null;
  return <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{ position: "fixed", bottom: 24, right: 24, zIndex: 90, width: 44, height: 44, background: C.dark, color: C.white, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 12px rgba(0,0,0,0.15)", transition: "opacity 0.3s" }} aria-label="Nach oben"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 15l-6-6-6 6"/></svg></button>;
}
function Badge({ children, color = C.accent }) { return <span style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color, background: `${color}15`, padding: "5px 12px", display: "inline-block" }}>{children}</span>; }
function Heading({ overline, title, sub, align = "left" }) { return (<div style={{ textAlign: align, marginBottom: 56 }}>{overline && <div style={{ marginBottom: 16 }}><Badge>{overline}</Badge></div>}<h2 style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: "clamp(32px, 5vw, 56px)", color: C.text, margin: "0 0 16px", letterSpacing: "0.03em", lineHeight: 1, whiteSpace: "pre-line" }}>{title}</h2>{sub && <p style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 16, color: C.textMuted, maxWidth: align === "center" ? 560 : "none", margin: align === "center" ? "0 auto" : 0, lineHeight: 1.6 }}>{sub}</p>}</div>); }
function Btn({ children, onClick, variant = "primary", full = false }) { const p = variant === "primary"; return <button onClick={onClick} style={{ background: p ? C.dark : "transparent", color: p ? C.white : C.text, border: p ? "none" : `1.5px solid ${C.borderLight}`, padding: "14px 32px", fontFamily: "'Inter Tight', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", transition: "all 0.2s", width: full ? "100%" : "auto" }} onMouseEnter={e => { if (p) { e.target.style.background = "#333"; e.target.style.transform = "translateY(-2px)"; } else { e.target.style.borderColor = C.accent; e.target.style.color = C.accent; }}} onMouseLeave={e => { if (p) { e.target.style.background = C.dark; e.target.style.transform = "translateY(0)"; } else { e.target.style.borderColor = C.borderLight; e.target.style.color = C.text; }}}>{children}</button>; }

function RegionToggle() {
  const { region, setRegion, clear, count } = useCart();
  const toggle = (r) => {
    if (r === region) return;
    if (count > 0 && !window.confirm("Region wechseln? Ihr Warenkorb wird dabei geleert.")) return;
    clear(); setRegion(r);
  };
  return (
    <div style={{ display: "inline-flex", border: `1px solid ${C.border}`, marginBottom: 32 }}>
      {[{ id: "AT", label: "🇦🇹 🇩🇪  ÖSTERREICH & DEUTSCHLAND" }, { id: "CH", label: "🇨🇭  SCHWEIZ" }].map(r => (
        <button key={r.id} onClick={() => toggle(r.id)} style={{ padding: "12px 24px", fontFamily: "'Inter Tight', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", cursor: "pointer", border: "none", transition: "all 0.2s", background: region === r.id ? C.dark : "transparent", color: region === r.id ? C.white : C.textMuted }}>{r.label}</button>
      ))}
    </div>
  );
}

function AddToCartBtn({ product }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const handleAdd = () => { add(product); setAdded(true); setTimeout(() => setAdded(false), 1500); };
  return <button onClick={handleAdd} style={{ background: added ? C.green : C.dark, color: C.white, border: "none", padding: "12px 24px", fontFamily: "'Inter Tight', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", cursor: "pointer", transition: "all 0.3s", textTransform: "uppercase" }}>{added ? "✓ HINZUGEFÜGT" : "IN DEN WARENKORB"}</button>;
}

// ─── Pages ───
function Home({ go }) {
  return (
    <div>
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "120px 32px 80px", background: C.bg, position: "relative", overflow: "hidden" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1, width: "100%" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 64, alignItems: "center" }} className="hero-g">
            <div>
              <Reveal><Badge>SEIT ÜBER 40 JAHREN — DIREKT VOM HERSTELLER</Badge></Reveal>
              <Reveal delay={0.1}><h1 style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: "clamp(48px, 7vw, 96px)", color: C.text, lineHeight: 0.95, margin: "24px 0 28px" }}><span style={{ color: "#A01830" }}>PULTTEILER</span><br/>FÜR <span style={{ color: "#F0C645" }}>SCHULTISCHE.</span><br/><span style={{ color: C.textMuted, fontSize: "0.6em" }}>KONZENTRATION BRINGT LERNERFOLG.</span></h1></Reveal>
              <Reveal delay={0.2}><p style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 17, color: C.textMuted, lineHeight: 1.7, maxWidth: 520, margin: "0 0 40px" }}>Der Pultteiler ist der bewährte Sichtschutz für Schultische bei schriftlichen Prüfungen — europaweit. Einfaches Stecksystem — Teilerplatte und Pultklammer sind schnell aufgebaut. Passend für alle gängigen Schultische mit einer Tischplattenstärke bis 3 cm.</p></Reveal>
              <Reveal delay={0.3}><div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}><Btn onClick={() => go("produkte")}>ZUM SHOP</Btn><Btn onClick={() => go("kontakt")} variant="secondary">KONTAKT AUFNEHMEN →</Btn></div></Reveal>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Reveal delay={0.1}><div className="hero-plates" style={{ display: "flex", gap: 12, justifyContent: "center" }}>
                <div style={{ width: 160, height: 100, background: "#F0C645", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 10, cursor: "default", boxShadow: "4px 6px 16px rgba(0,0,0,0.15)", transform: "rotate(-3deg)", border: "2px solid #D4AD2E" }}>
                  <span style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 10.5, fontWeight: 700, color: C.dark, lineHeight: 1.4, letterSpacing: "0.04em" }}>E-RECHNUNGEN<br/>FÜR BUNDES-<br/>SCHULEN<br/>MIT IHRER EKG</span>
                </div>
                <div style={{ width: 160, height: 100, background: "#F0C645", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 10, cursor: "default", boxShadow: "4px 6px 16px rgba(0,0,0,0.15)", transform: "rotate(2deg)", border: "2px solid #D4AD2E" }}>
                  <span style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 10.5, fontWeight: 700, color: C.dark, lineHeight: 1.4, letterSpacing: "0.04em" }}>MIT DEUTSCHER<br/>UID-NUMMER<br/>STEUERFREI</span>
                </div>
                <div style={{ width: 160, height: 100, background: "#F0C645", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 10, cursor: "default", boxShadow: "4px 6px 16px rgba(0,0,0,0.15)", transform: "rotate(-1deg)", border: "2px solid #D4AD2E" }}>
                  <span style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 10.5, fontWeight: 700, color: C.dark, lineHeight: 1.4, letterSpacing: "0.04em" }}>STEUERFREIE<br/>UNVERZOLLTE<br/>LIEFERUNG IN<br/>DIE SCHWEIZ</span>
                </div>
              </div></Reveal>
              <Reveal delay={0.15}><div style={{ overflow: "hidden", border: `1px solid ${C.border}`, background: C.bgCard }}><img src="/images/meduni-innsbruck_2.jpeg" alt="Meduni Innsbruck Labor" style={{ width: "100%", height: 170, objectFit: "cover", display: "block" }}/></div></Reveal>
              <Reveal delay={0.25}><div style={{ overflow: "hidden", border: `1px solid ${C.border}`, background: C.bgCard }}><img src="/images/klassenzimmer.png" alt="Klassenzimmer im Einsatz" style={{ width: "100%", height: 170, objectFit: "cover", display: "block" }}/></div></Reveal>
              <Reveal delay={0.35}><div style={{ overflow: "hidden", border: `1px solid ${C.border}`, background: C.bgCard }}><img src="/images/pultteiler-einsatz.jpg" alt="EDV-Raum mit Pultteiler" style={{ width: "100%", height: 170, objectFit: "cover", display: "block" }}/></div></Reveal>
            </div>
          </div>
        </div>
      </section>
      <section style={{ background: C.bgCard, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "48px 32px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 32 }}>
          {[
            { val: "40+", label: "JAHRE ERFAHRUNG", icon: null },
            { val: null, label: "LIEFERUNG EUROPAWEIT", icon: <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg> },
            { val: null, label: "E-RECHNUNGEN FÜR BUNDESSCHULEN", icon: <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg> },
            { val: "✓", label: "DIREKT VOM HERSTELLER", icon: null },
          ].map((m, i) => (
            <Reveal key={i} delay={i * 0.08}><div style={{ textAlign: "center", padding: "12px 0" }}><div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 48, color: C.accent, lineHeight: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>{m.icon || m.val}</div><div style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", color: C.textMuted, marginTop: 8 }}>{m.label}</div></div></Reveal>
          ))}
        </div>
      </section>
      <section style={{ padding: "96px 32px", background: C.bg }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <Heading overline="WARUM PULTTEILER" title="GRÜNDE FÜR DEN PULTTEILER"/>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 2 }}>
            {[
              { title: "FAIRE PRÜFUNGSBEDINGUNGEN", text: "Kein Abschreiben, keine Gruppenaufteilung. Alle Schüler schreiben gleichzeitig unter identischen Bedingungen." },
              { title: "STECKSYSTEM — KEIN WERKZEUG", text: "Die dauerelastische Klammer fixiert die Trennplatte schnell und einfach. Aufbau und Abbau gehen mühelos von der Hand." },
              { title: "ROBUST & LANGLEBIG", text: "Hochwertige Materialien für jahrelangen Dauereinsatz im Schulalltag. Ersatzteile einzeln nachbestellbar." },
              { title: "KOMPAKTER HOLZKOFFER", text: "12 komplette Pultteilsysteme pro Koffer. Leicht zu transportieren, stapelbar, platzsparend im Materialraum. Auf Anfrage sind auch Koffer mit mehr als 12 Teilern möglich." },
              { title: "EUROPAWEITER VERSAND", text: "Lieferung direkt vom Hersteller europaweit. Steuerfreie Lieferung nach DE mit UID-Nummer. Steuerfreie, unverzollte Lieferung in die Schweiz." },
              { title: "E-RECHNUNG FÜR BUNDESSCHULEN", text: "Wir versenden E-Rechnungen an Schulen des Bundes mit Ihrer EKG." },
            ].map((u, i) => (
              <Reveal key={i} delay={i * 0.06}><div style={{ background: C.bgCard, border: `1px solid ${C.border}`, padding: "36px 32px", transition: "all 0.3s", cursor: "default", height: "100%" }} onMouseEnter={e => { e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.background = C.bgElevated; }} onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = C.bgCard; }}>
                <h3 style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: "0.08em", color: C.text, margin: "0 0 10px" }}>{u.title}</h3>
                <p style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 14, color: C.textMuted, lineHeight: 1.65, margin: 0 }}>{u.text}</p>
              </div></Reveal>
            ))}
          </div>
        </div>
      </section>
      <section style={{ padding: "96px 32px", background: C.bgCard, borderTop: `1px solid ${C.border}` }}>
        <Reveal><div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <Heading overline="JETZT BESTELLEN" title="BEREIT FÜR IHRE BESTELLUNG?" align="center" sub="Bestellen Sie direkt über unseren Shop oder kontaktieren Sie uns für individuelle Angebote."/>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}><Btn onClick={() => go("produkte")}>ZUM SHOP</Btn><Btn onClick={() => go("kontakt")} variant="secondary">KONTAKT</Btn></div>
        </div></Reveal>
      </section>
    </div>
  );
}

function Produkte({ go }) {
  const { region, setRegion, getPrice, clear } = useCart();
  const [regionSelected, setRegionSelected] = useState(false);
  const selectRegion = (r) => { clear(); setRegion(r); setRegionSelected(true); };

  if (!regionSelected) return (
    <div style={{ paddingTop: 72 }}>
      <section style={{ minHeight: "80vh", display: "flex", alignItems: "center", padding: "80px 32px", background: `linear-gradient(135deg, ${C.bg} 0%, #D5EFEF 50%, #E8F4E8 100%)`, position: "relative", overflow: "hidden" }}>
        <img src="/images/Klammer_2.png" alt="" style={{ position: "absolute", top: 80, left: -10, width: 140, opacity: 0.12, transform: "rotate(-25deg)", filter: "sepia(1) saturate(3) hue-rotate(-30deg)" }}/>
        <img src="/images/Klammer_2.png" alt="" style={{ position: "absolute", top: 60, right: -20, width: 120, opacity: 0.12, transform: "rotate(20deg)", filter: "sepia(1) saturate(3) hue-rotate(-30deg)" }}/>
        <img src="/images/Klammer_2.png" alt="" style={{ position: "absolute", bottom: 40, left: 30, width: 110, opacity: 0.1, transform: "rotate(15deg)", filter: "sepia(1) saturate(3) hue-rotate(-30deg)" }}/>
        <img src="/images/Klammer_2.png" alt="" style={{ position: "absolute", bottom: 60, right: 40, width: 130, opacity: 0.1, transform: "rotate(-10deg)", filter: "sepia(1) saturate(3) hue-rotate(-30deg)" }}/>
        <img src="/images/Klammer_2.png" alt="" style={{ position: "absolute", top: 200, left: "20%", width: 90, opacity: 0.08, transform: "rotate(35deg)", filter: "sepia(1) saturate(3) hue-rotate(-30deg)" }}/>
        <img src="/images/Klammer_2.png" alt="" style={{ position: "absolute", top: 160, right: "18%", width: 100, opacity: 0.08, transform: "rotate(-18deg)", filter: "sepia(1) saturate(3) hue-rotate(-30deg)" }}/>
        <img src="/images/Klammer_2.png" alt="" style={{ position: "absolute", bottom: 150, left: "40%", width: 80, opacity: 0.06, transform: "rotate(8deg)", filter: "sepia(1) saturate(3) hue-rotate(-30deg)" }}/>
        <img src="/images/Klammer_2.png" alt="" style={{ position: "absolute", top: 350, right: "35%", width: 70, opacity: 0.07, transform: "rotate(-30deg)", filter: "sepia(1) saturate(3) hue-rotate(-30deg)" }}/>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <img src="/images/Klammer_2.png" alt="Pultteiler" style={{ width: 64, height: 64, objectFit: "contain", margin: "0 auto 16px", display: "block" }}/>
          <Heading overline="ONLINE-SHOP" title="ONLINESHOP" align="center"/>
          <div className="region-btns" style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => selectRegion("AT")} style={{ padding: "32px 40px", background: C.accent, border: "none", cursor: "pointer", transition: "all 0.2s", width: 260, boxShadow: "0 4px 16px rgba(26,158,158,0.3)" }} onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(26,158,158,0.4)"; }} onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(26,158,158,0.3)"; }}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: C.white, marginBottom: 4 }}>ÖSTERREICH & DEUTSCHLAND</div>
              <div style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.8)" }}>Preise inkl. MwSt und Lieferung</div>
            </button>
            <button onClick={() => selectRegion("CH")} style={{ padding: "32px 40px", background: C.accent, border: "none", cursor: "pointer", transition: "all 0.2s", width: 260, boxShadow: "0 4px 16px rgba(26,158,158,0.3)" }} onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(26,158,158,0.4)"; }} onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(26,158,158,0.3)"; }}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: C.white, marginBottom: 4 }}>SCHWEIZ</div>
              <div style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.8)" }}>Steuerfrei, unverzollt, inkl. Lieferung</div>
            </button>
          </div>
          <div style={{ display: "flex", justifyContent: "center", marginTop: 32 }}>
            <div onClick={() => go("kontakt")} style={{ width: 160, height: 100, background: C.accent, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 12, cursor: "pointer", boxShadow: "4px 6px 16px rgba(26,158,158,0.25)", transform: "rotate(-1deg)", border: `2px solid ${C.accentHover}`, transition: "transform 0.2s" }} onMouseEnter={e => e.currentTarget.style.transform = "rotate(-1deg) scale(1.05)"} onMouseLeave={e => e.currentTarget.style.transform = "rotate(-1deg)"}>
              <span style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 11, fontWeight: 700, color: C.white, lineHeight: 1.4, letterSpacing: "0.04em" }}>ANDERE LÄNDER<br/>AUF ANFRAGE</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <div style={{ paddingTop: 72 }}>
      <section style={{ padding: "80px 32px 96px", background: C.bg }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <button onClick={() => setRegionSelected(false)} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Inter Tight', sans-serif", fontSize: 14, color: C.accent, fontWeight: 700, letterSpacing: "0.08em", padding: 0, marginBottom: 32 }}>← ZURÜCK ZUR AUSWAHL</button>
          <Heading overline="ONLINE-SHOP" title="PRODUKTE" sub={region === "CH" ? "" : "Alle Preise inkl. MwSt und Lieferung für Österreich und Deutschland."}/>
          {region === "AT" && <Reveal><div className="shop-plates" style={{ display: "flex", gap: 16, marginBottom: 32, flexWrap: "wrap" }}>
            <div style={{ width: 160, height: 100, background: "#F0C645", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 12, cursor: "default", boxShadow: "4px 6px 16px rgba(0,0,0,0.15)", transform: "rotate(-3deg)", border: "2px solid #D4AD2E" }}>
              <span style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 11, fontWeight: 700, color: C.dark, lineHeight: 1.4, letterSpacing: "0.04em" }}>E-RECHNUNGEN<br/>FÜR BUNDES-<br/>SCHULEN<br/>MIT IHRER EKG</span>
            </div>
            <div style={{ width: 160, height: 100, background: "#F0C645", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 12, cursor: "default", boxShadow: "4px 6px 16px rgba(0,0,0,0.15)", transform: "rotate(2deg)", border: "2px solid #D4AD2E" }}>
              <span style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 11, fontWeight: 700, color: C.dark, lineHeight: 1.4, letterSpacing: "0.04em" }}>MIT DEUTSCHER<br/>UID-NUMMER<br/>STEUERFREI</span>
            </div>
          </div></Reveal>}
          {region === "CH" && <Reveal><div className="shop-plates" style={{ display: "flex", gap: 16, marginBottom: 32, flexWrap: "wrap" }}>
            <div style={{ width: 160, height: 100, background: "#F0C645", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 12, cursor: "default", boxShadow: "4px 6px 16px rgba(0,0,0,0.15)", transform: "rotate(-2deg)", border: "2px solid #D4AD2E" }}>
              <span style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 10, fontWeight: 700, color: C.dark, lineHeight: 1.4, letterSpacing: "0.04em" }}>STEUERFREIE<br/>UNVERZOLLTE<br/>LIEFERUNG IN<br/>DIE SCHWEIZ</span>
            </div>
            <div style={{ width: 160, height: 100, background: "#F0C645", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 12, cursor: "default", boxShadow: "4px 6px 16px rgba(0,0,0,0.15)", transform: "rotate(2deg)", border: "2px solid #D4AD2E" }}>
              <span style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 12, fontWeight: 700, color: C.dark, lineHeight: 1.4, letterSpacing: "0.04em" }}>LIEFERUNG<br/>INKLUSIVE</span>
            </div>
          </div></Reveal>}
          <div style={{ display: "flex", flexDirection: "column", gap: 2, marginBottom: 48 }}>
            {SETS.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.1}>
                <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, display: "grid", gridTemplateColumns: "260px 1fr", overflow: "hidden", transition: "border-color 0.3s" }} className="prod-card" onMouseEnter={e => e.currentTarget.style.borderColor = C.accent} onMouseLeave={e => e.currentTarget.style.borderColor = C.border}>
                  <div style={{ borderRight: `1px solid ${C.border}`, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", padding: 16, background: C.bgElevated }}><img src={p.img} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "contain", maxHeight: 200, display: "block" }}/></div>
                  <div style={{ padding: "28px 32px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    {p.tag && <Badge color={p.color === "#777" ? "#777" : C.accent}>{p.tag}</Badge>}
                    <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 26, color: C.text, margin: "12px 0 8px" }}>{p.name}</h3>
                    <p style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 14, color: C.textMuted, lineHeight: 1.6, margin: "0 0 20px" }}>{p.desc}</p>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
                      <div><span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 36, color: C.text }}>€ {getPrice(p).toFixed(2)}</span><span style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 11, color: C.textMuted, marginLeft: 8 }}>{region === "CH" ? "STEUERFREI, INKL. LIEFERUNG" : "INKL. MWST & LIEFERUNG"}</span></div>
                      <AddToCartBtn product={p}/>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          {region === "AT" && (
            <>
              <Heading overline="ERSATZTEILE" title="EINZELTEILE NACHBESTELLEN" sub="Alle Ersatzteile inkl. MwSt für Österreich und Deutschland. Versandkosten: € 8,70."/>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {PARTS.map((p, i) => (
                  <Reveal key={p.id} delay={i * 0.08}>
                    <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, padding: 0, transition: "border-color 0.3s", overflow: "hidden" }} onMouseEnter={e => e.currentTarget.style.borderColor = C.accent} onMouseLeave={e => e.currentTarget.style.borderColor = C.border}>
                      {p.img && <div style={{ background: C.bgElevated, borderBottom: `1px solid ${C.border}`, padding: 16, display: "flex", alignItems: "center", justifyContent: "center", height: 160, overflow: "hidden" }}>
                        <img src={p.img} alt={p.name} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", display: "block", transform: p.zoom ? `scale(${p.zoom})` : "none" }}/>
                      </div>}
                      <div style={{ padding: "20px 24px 28px" }}>
                      <Badge>{p.tag}</Badge>
                      <h4 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: C.text, margin: "10px 0 6px" }}>{p.name}</h4>
                      <p style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 13, color: C.textMuted, lineHeight: 1.5, margin: "0 0 20px" }}>{p.desc}</p>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: C.text }}>€ {p.priceAT.toFixed(2)}</span>
                        <AddToCartBtn product={p}/>
                      </div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </>
          )}
          <Reveal delay={0.2}>
            <div style={{ marginTop: 32, background: `${C.green}08`, border: `1px solid ${C.green}25`, padding: "24px 28px", display: "flex", gap: 12, alignItems: "flex-start" }}>
              <div style={{ width: 32, height: 32, background: `${C.green}15`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8l3.5 3.5L13 5" stroke={C.green} strokeWidth="2" strokeLinecap="square"/></svg>
              </div>
              <div>
                <h4 style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: "0.06em", color: C.text, margin: "0 0 6px" }}>VERSAND & ZAHLUNG</h4>
                {region === "CH" ? (
                  <p style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 13, color: C.textMuted, lineHeight: 1.6, margin: 0 }}>Schweiz: <span style={{ color: C.green, fontWeight: 600 }}>Lieferung inklusive</span>. Unverzollte Lieferung, steuerfrei. Zahlung per Rechnung. Ersatzteile auf Anfrage.</p>
                ) : (
                  <p style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 13, color: C.textMuted, lineHeight: 1.6, margin: 0 }}>AT & DE: <span style={{ color: C.green, fontWeight: 600 }}>Kostenloser Versand bei Koffer-Bestellungen</span>. Ersatzteile: € 8,70 Versand. Zahlung per Rechnung. Steuerfreie Lieferung nach DE mit UID. E-Rechnungen für österr. Bundesschulen.</p>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

function Galerie() {
  const [lightbox, setLightbox] = useState(null);
  return (
    <div style={{ paddingTop: 72 }}>
      <section style={{ padding: "80px 32px 96px", background: C.bg }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Heading overline="REFERENZEN" title="DER PULTTEILER IM EINSATZ" sub="Von der Volksschule bis zur Universität — Eindrücke aus dem Schulalltag." align="center"/>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 2 }}>
            {GALLERY.map((r, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div onClick={() => setLightbox(r)} style={{ background: C.bgCard, border: `1px solid ${C.border}`, aspectRatio: "16/10", position: "relative", overflow: "hidden", cursor: "pointer", transition: "border-color 0.3s" }} onMouseEnter={e => e.currentTarget.style.borderColor = C.accent} onMouseLeave={e => e.currentTarget.style.borderColor = C.border}>
                  <img src={r.src} alt={r.label} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}/>
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "12px 20px", background: C.bgCard, borderTop: `1px solid ${C.border}` }}>
                    <div style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 13, fontWeight: 600, color: C.accent, letterSpacing: "0.04em" }}>{r.label}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      {lightbox && (
        <div onClick={() => setLightbox(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", padding: 24 }}>
          <button onClick={() => setLightbox(null)} style={{ position: "absolute", top: 24, right: 32, background: "none", border: "none", color: "#fff", fontSize: 32, cursor: "pointer", zIndex: 301 }}>✕</button>
          <img src={lightbox.src} alt={lightbox.label} style={{ maxWidth: "90vw", maxHeight: "85vh", objectFit: "contain", display: "block" }}/>
          <div style={{ position: "absolute", bottom: 32, left: 0, right: 0, textAlign: "center" }}>
            <span style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 14, fontWeight: 600, color: "#fff", letterSpacing: "0.06em", background: "rgba(0,0,0,0.5)", padding: "8px 20px" }}>{lightbox.label}</span>
          </div>
        </div>
      )}
    </div>
  );
}

function Kontakt() {
  const [sent, setSent] = useState(false);
  const [contactSending, setContactSending] = useState(false);
  const [contactError, setContactError] = useState("");
  const inp = { width: "100%", padding: "14px 16px", background: C.bgCard, border: `1px solid ${C.border}`, fontFamily: "'Inter Tight', sans-serif", fontSize: 14, color: C.text, outline: "none", boxSizing: "border-box", transition: "border-color 0.2s" };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactSending(true);
    setContactError("");

    const fd = new FormData(e.target);
    const data = {};
    fd.forEach((v, k) => { data[k] = v; });

    try {
      await loadEmailJS();
      await window.emailjs.send("service_cobcbsg", "template_7kke6e4", {
        kunde_email: data["email"] || "",
        order_nr: "KONTAKT",
        region: "Kontaktanfrage",
        bestellung: data["Nachricht"] || "",
        versand: "–",
        gesamt: "–",
        adresse: data["Name"] || "",
        telefon: "–",
        uid: "–",
        einkaufergruppe: "–",
        anmerkungen: "Kontaktanfrage über pultteiler.eu",
      });
      setSent(true);
    } catch (err) {
      setContactError("Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder schreiben Sie uns direkt an blaschegg@traunseenet.at");
    } finally {
      setContactSending(false);
    }
  };

  return (
    <div style={{ paddingTop: 72 }}>
      <section style={{ padding: "80px 32px 96px", background: C.bg }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <Heading overline="KONTAKT" title="WIR SIND FÜR SIE DA" align="center"/>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }} className="contact-g">
            <Reveal><div style={{ background: C.bgCard, border: `1px solid ${C.border}`, padding: "40px 36px", height: "100%" }}>
              <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: C.text, margin: "0 0 32px" }}>SCHULMITTEL BLASCHEGG</h3>
              {[{ icon: "●", label: "ANSPRECHPARTNER", val: "Michael Blaschegg" }, { icon: "⌂", label: "ADRESSE", val: "Stücklbachstraße 13, 4813 Altmünster" }, { icon: "✉", label: "E-MAIL", val: "blaschegg@traunseenet.at", href: "mailto:blaschegg@traunseenet.at" }, { icon: "☎", label: "TELEFON", val: "+43 (0) 676 935 40 33\n+43 (0) 699 129 613 70", href: "tel:+436769354033" }, { icon: "◆", label: "UID-NUMMER", val: "ATU37758404" }, { icon: "▣", label: "UNTERNEHMENSREGISTER", val: "R013F6512, BH Gmunden" }, { icon: "€", label: "BANKVERBINDUNG ÖSTERREICH", val: "IBAN: AT88 3451 0000 0202 6441 · BIC: RZOOAT2L510" }, { icon: "€", label: "BANKVERBINDUNG DEUTSCHLAND", val: "IBAN: DE22 7105 0000 0000 1254 68 · BIC: BYLADEM1BGL" }].map((c, i) => (
                <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start", marginBottom: 28 }}>
                  <div style={{ width: 36, height: 36, background: `${C.accent}12`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: C.accent, fontSize: 14 }}>{c.icon}</div>
                  <div><div style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", color: C.textMuted, marginBottom: 4 }}>{c.label}</div>{c.href ? <a href={c.href} style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 15, color: C.accent, textDecoration: "none", whiteSpace: "pre-line" }}>{c.val}</a> : <div style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 15, color: C.text, whiteSpace: "pre-line" }}>{c.val}</div>}</div>
                </div>
              ))}
            </div></Reveal>
            <Reveal delay={0.1}><div style={{ background: C.bgCard, border: `1px solid ${C.border}`, padding: "40px 36px" }}>
              {sent ? (
                <div style={{ textAlign: "center", padding: "64px 0" }}><div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 48, color: C.green }}>✓</div><h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: C.text, margin: "12px 0 8px" }}>NACHRICHT GESENDET</h3><p style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 14, color: C.textMuted }}>Wir melden uns in Kürze.</p></div>
              ) : (
                <><h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, color: C.text, margin: "0 0 28px" }}>NACHRICHT SENDEN</h3>
                <form onSubmit={handleContactSubmit}>
                  {[{ label: "NAME / INSTITUTION", ph: "Ihr Name oder Schulname", type: "text", name: "Name" }, { label: "E-MAIL", ph: "ihre@email.at", type: "email", name: "email" }].map((f, i) => (
                    <div key={i} style={{ marginBottom: 16 }}><label style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", color: C.textMuted, display: "block", marginBottom: 8 }}>{f.label}</label><input type={f.type} name={f.name} placeholder={f.ph} required style={inp} onFocus={e => e.target.style.borderColor = C.accent} onBlur={e => e.target.style.borderColor = C.border}/></div>
                  ))}
                  <div style={{ marginBottom: 24 }}><label style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", color: C.textMuted, display: "block", marginBottom: 8 }}>NACHRICHT</label><textarea rows={5} name="Nachricht" placeholder="Ihre Nachricht oder Bestellanfrage..." required style={{ ...inp, resize: "vertical" }} onFocus={e => e.target.style.borderColor = C.accent} onBlur={e => e.target.style.borderColor = C.border}/></div>
                  <Btn onClick={() => {}} full>{contactSending ? "WIRD GESENDET..." : "NACHRICHT SENDEN →"}</Btn>
                  {contactError && (
                    <div style={{ background: "#FEF2F2", border: `1px solid ${C.red}`, padding: "12px 16px", marginTop: 12 }}>
                      <div style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 13, color: C.red, lineHeight: 1.5 }}>{contactError}</div>
                    </div>
                  )}
                </form>
                </>
              )}
            </div></Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}

function Anleitung({ go }) {
  return (
    <div style={{ paddingTop: 72 }}>
      <section style={{ padding: "80px 32px 96px", background: C.bg }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Heading overline="AUFBAUANLEITUNG" title={"SO FUNKTIONIERT DER PULTTEILER\nAUFBAU IN 3 SCHRITTEN"} sub="Teilerplatte und Pultklammer — in wenigen Handgriffen aufgestellt." align="center"/>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Reveal delay={0.1}>
              <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, padding: "40px 36px", transition: "border-color 0.3s" }} onMouseEnter={e => e.currentTarget.style.borderColor = C.accent} onMouseLeave={e => e.currentTarget.style.borderColor = C.border}>
                <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 48, color: C.accent, lineHeight: 1 }}>SCHRITT 01</span>
                <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: C.text, margin: "12px 0 16px" }}>KLAMMER AUFSTECKEN</h2>
                <p style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 15, color: C.textMuted, lineHeight: 1.7, margin: 0 }}>Stecken Sie die Klammer aus dauerelastischem Kunststoff einfach auf die Tischkante. Sie passt auf alle gängigen Schultische mit einer Tischplattenstärke bis 3 cm — auch auf Schrägtische.</p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, padding: "40px 36px", transition: "border-color 0.3s" }} onMouseEnter={e => e.currentTarget.style.borderColor = C.accent} onMouseLeave={e => e.currentTarget.style.borderColor = C.border}>
                <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 48, color: C.accent, lineHeight: 1 }}>SCHRITT 02</span>
                <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: C.text, margin: "12px 0 16px" }}>TEILERPLATTE EINSETZEN</h2>
                <p style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 15, color: C.textMuted, lineHeight: 1.7, margin: 0 }}>Setzen Sie die Teilerplatte in die Klammer ein. Die Platte rastet sicher ein und steht sofort stabil.</p>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, display: "grid", gridTemplateColumns: "1.2fr 1fr", overflow: "hidden", transition: "border-color 0.3s" }} className="prod-card" onMouseEnter={e => e.currentTarget.style.borderColor = C.accent} onMouseLeave={e => e.currentTarget.style.borderColor = C.border}>
                <div style={{ padding: "40px 36px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 48, color: C.accent, lineHeight: 1 }}>SCHRITT 03</span>
                  <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: C.text, margin: "12px 0 16px" }}>FERTIG — KONZENTRIERT ARBEITEN</h2>
                  <p style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 15, color: C.textMuted, lineHeight: 1.7, margin: 0 }}>Der Pultteiler steht stabil und schafft einen eigenen, abgeschirmten Arbeitsplatz. Nach der Prüfung einfach abnehmen und zurück in den Holzkoffer.</p>
                </div>
                <div style={{ background: C.bgElevated, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", padding: 16, minHeight: 240 }}>
                  <img src="/images/koffer-gelb.jpg" alt="Holzkoffer mit Pultteilern" style={{ width: "100%", height: "100%", objectFit: "contain", maxHeight: 240, display: "block" }}/>
                </div>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.35}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, marginTop: 2 }} className="contact-g">
              <div style={{ background: `${C.green}08`, border: `1px solid ${C.green}25`, padding: "32px 28px", display: "flex", gap: 14, alignItems: "flex-start" }}>
                <div style={{ width: 32, height: 32, background: `${C.green}15`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8l3.5 3.5L13 5" stroke={C.green} strokeWidth="2" strokeLinecap="square"/></svg>
                </div>
                <p style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 14, color: C.textMuted, lineHeight: 1.65, margin: 0 }}>Passt auf alle gängigen Schultische mit einer Tischplattenstärke bis 3 cm. Die Klammer aus dauerelastischem Kunststoff hinterlässt keine Spuren am Tisch.</p>
              </div>
              <div style={{ background: `${C.green}08`, border: `1px solid ${C.green}25`, padding: "32px 28px", display: "flex", gap: 14, alignItems: "flex-start" }}>
                <div style={{ width: 32, height: 32, background: `${C.green}15`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8l3.5 3.5L13 5" stroke={C.green} strokeWidth="2" strokeLinecap="square"/></svg>
                </div>
                <p style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 14, color: C.textMuted, lineHeight: 1.65, margin: 0 }}>Nach dem Einsatz kommen alle Pultteiler zurück in den mitgelieferten Holzkoffer — platzsparend und sofort bereit für den nächsten Einsatz.</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.4}>
            <div style={{ marginTop: 56, textAlign: "center" }}>
              <p style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 16, color: C.textMuted, marginBottom: 24 }}>Überzeugt? Bestellen Sie den Pultteiler direkt vom Hersteller.</p>
              <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}><Btn onClick={() => go("produkte")}>ZUM SHOP</Btn><Btn onClick={() => go("kontakt")} variant="secondary">KONTAKT AUFNEHMEN →</Btn></div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

function UeberUns({ go }) {
  return (
    <div style={{ paddingTop: 72 }}>
      <section style={{ padding: "80px 32px 96px", background: C.bg }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <Heading overline="ÜBER UNS" title={"SCHULMITTEL BLASCHEGG\nAUS ALTMÜNSTER AM TRAUNSEE"} sub="Direkt vom Hersteller — seit über 40 Jahren für Schulen — europaweit."/>
          <Reveal>
            <div style={{ border: `1px solid ${C.border}`, overflow: "hidden", marginBottom: 2, background: C.bgCard }}>
              <img src="/images/meduni-innsbruck_2.jpeg" alt="Pultteiler im Einsatz an der Medizinischen Universität Innsbruck" style={{ width: "100%", height: "auto", display: "block", objectFit: "contain" }}/>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, padding: "48px 40px", marginBottom: 2 }}>
              <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: C.text, margin: "0 0 24px" }}>DIE IDEE HINTER DEM PULTTEILER</h2>
              <p style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 15, color: C.textMuted, lineHeight: 1.75, margin: "0 0 20px" }}>Michael Blaschegg war selbst Lehrer — und kennt die Herausforderungen im Schulalltag aus erster Hand. Tag für Tag werden an unseren Schulen Schularbeiten, informelle Tests, Kontrollarbeiten und Diktate abgehalten. Bei diesen Arbeiten wollen unsere Schüler konzentriert, ungestört und ruhig ihre Leistung zeigen.</p>
              <p style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 15, color: C.textMuted, lineHeight: 1.75, margin: "0 0 20px" }}>Aus dieser Erfahrung heraus entstand der Pultteiler — eine stabile Trennwand für Schultische, die sowohl Arbeitserleichterung für den Lehrer als auch Unterstützung für die Schüler ist.</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, padding: "48px 40px", marginBottom: 2 }}>
              <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: C.text, margin: "0 0 24px" }}>WARUM DER PULTTEILER FUNKTIONIERT</h2>
              <p style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 15, color: C.textMuted, lineHeight: 1.75, margin: "0 0 20px" }}>Es ist nicht mehr notwendig, die Klasse bei einer schriftlichen Lernzielkontrolle in verschiedene Gruppen zu unterteilen — die Möglichkeit der gerechten Benotung ist durch den Sichtschutz garantiert. Vorbesprechung, Nachbesprechung und Verbesserung der Arbeiten erledigt die Klasse gemeinsam.</p>
              <p style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 15, color: C.textMuted, lineHeight: 1.75, margin: "0 0 20px" }}>Das Wandern in einen größeren Klassenraum mit einzelnen Pulten ist nicht mehr notwendig. Die Schüler fühlen sich in der gewohnten Umgebung ihres Klassenraums bei Arbeiten am wohlsten.</p>
              <p style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 15, color: C.textMuted, lineHeight: 1.75, margin: 0 }}>Der stabile Pultteiler schafft Ordnung und einen eigenen Arbeitsplatz. Die Schüler werden von ihren Sitznachbarn nicht abgelenkt, sie können konzentriert ihre Aufgaben erledigen. Die Klammer aus hochwertigem, dauerelastischem Kunststoff ermöglicht einen sicheren Stand der Trennplatte und ist rasch aufgesteckt.</p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, padding: "48px 40px", marginBottom: 2 }}>
              <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: C.text, margin: "0 0 24px" }}>AN SCHULEN BELIEBT</h2>
              <p style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 15, color: C.textMuted, lineHeight: 1.75, margin: "0 0 20px" }}>Schon viele Schulen in Österreich und Deutschland sind begeistert von dieser Arbeitshilfe. Der Pultteiler wird an Volksschulen, Mittelschulen, Gymnasien und Hochschulen gleichermaßen eingesetzt — überall dort, wo schriftliche Prüfungen zum Schulalltag gehören.</p>
              <p style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 15, color: C.textMuted, lineHeight: 1.75, margin: 0 }}>Gefertigt wird <strong>direkt in Altmünster am Traunsee</strong> — und von dort europaweit an Schulen geliefert.</p>
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <div style={{ marginTop: 48, textAlign: "center" }}>
              <p style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 15, color: C.textMuted, marginBottom: 24 }}>Fragen zum Pultteiler? Wir sind gerne für Sie da.</p>
              <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}><Btn onClick={() => go("produkte")}>ZUM SHOP</Btn><Btn onClick={() => go("kontakt")} variant="secondary">KONTAKT AUFNEHMEN →</Btn></div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

function Impressum() {
  const s = { fontFamily: "'Inter Tight', sans-serif", fontSize: 15, color: C.textMuted, lineHeight: 1.75, margin: "0 0 20px" };
  const h = { fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, color: C.text, margin: "40px 0 16px" };
  return (
    <div style={{ paddingTop: 72 }}>
      <section style={{ padding: "80px 32px 96px", background: C.bg }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <Heading overline="RECHTLICHES" title="IMPRESSUM"/>
          <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, padding: "48px 40px" }}>
            <h2 style={{ ...h, marginTop: 0 }}>ANGABEN GEM. § 5 ECG</h2>
            <p style={s}><strong>Schulmittel Blaschegg</strong><br/>Michael Blaschegg<br/>Herstellung von sonstigen Kunststoffwaren a.n.g.</p>
            <h2 style={h}>FIRMENSITZ</h2>
            <p style={s}>Stücklbachstraße 13<br/>4813 Altmünster<br/>Österreich</p>
            <h2 style={h}>KONTAKTDATEN</h2>
            <p style={s}>E-Mail: <a href="mailto:blaschegg@traunseenet.at" style={{ color: C.accent, textDecoration: "none" }}>blaschegg@traunseenet.at</a><br/>Telefon:<br/>+43 (0) 676 935 40 33<br/>+43 (0) 699 129 613 70</p>
            <h2 style={h}>UNTERNEHMENSDATEN</h2>
            <p style={s}>Umsatzsteueridentifikationsnummer: ATU37758404<br/>Unternehmensregister: R013F6512<br/>Gewerbebehörde: BH Gmunden<br/>Mitglied der Wirtschaftskammer Österreich</p>
            <h2 style={h}>BANKVERBINDUNGEN</h2>
            <p style={s}><strong>Österreich:</strong><br/>IBAN: AT88 3451 0000 0202 6441<br/>BIC: RZOOAT2L510</p>
            <p style={s}><strong>Deutschland:</strong><br/>IBAN: DE22 7105 0000 0000 1254 68<br/>BIC: BYLADEM1BGL</p>
          </div>
        </div>
      </section>
    </div>
  );
}

function Agb() {
  const s = { fontFamily: "'Inter Tight', sans-serif", fontSize: 15, color: C.textMuted, lineHeight: 1.75, margin: "0 0 20px" };
  const h = { fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, color: C.text, margin: "40px 0 16px" };

  return (
    <div style={{ paddingTop: 72 }}>
      <section style={{ padding: "80px 32px 96px", background: C.bg }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <Heading overline="RECHTLICHES" title="ALLGEMEINE GESCHÄFTSBEDINGUNGEN" />
          <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, padding: "48px 40px" }}>

            <h2 style={{ ...h, marginTop: 0 }}>§ 1 GELTUNGSBEREICH</h2>
            <p style={s}>
              Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Bestellungen, die über den Online-Shop auf pultteiler.eu an Schulmittel Blaschegg, Michael Blaschegg, Stücklbachstraße 13, 4813 Altmünster, Österreich (im Folgenden „Verkäufer") gerichtet werden. Abweichende Bedingungen des Käufers werden nicht anerkannt, es sei denn, der Verkäufer stimmt ihrer Geltung ausdrücklich schriftlich zu.
            </p>

            <h2 style={h}>§ 2 VERTRAGSABSCHLUSS</h2>
            <p style={s}>
              Die Darstellung der Produkte im Online-Shop stellt kein rechtlich bindendes Angebot, sondern eine unverbindliche Einladung zur Bestellung (invitatio ad offerendum) dar. Mit dem Absenden einer Bestellung gibt der Käufer ein verbindliches Angebot zum Kauf der im Warenkorb enthaltenen Produkte ab. Der Kaufvertrag kommt erst mit der Auftragsbestätigung per E-Mail durch den Verkäufer zustande.
            </p>

            <h2 style={h}>§ 3 PREISE UND ZAHLUNG</h2>
            <p style={s}>
              Alle angegebenen Preise für Lieferungen nach Österreich und Deutschland verstehen sich inklusive der gesetzlichen Umsatzsteuer. Für Lieferungen in die Schweiz gelten die im Shop ausgewiesenen steuerfreien Preise (unverzollt). Preisänderungen und Irrtümer vorbehalten.
            </p>
            <p style={s}>
              Die Zahlung erfolgt per Rechnung. Die Rechnung wird mit der Lieferung beigelegt oder per E-Mail zugestellt. Die Zahlungsfrist beträgt 14 Tage ab Rechnungsdatum, sofern nicht anders vereinbart.
            </p>

            <h2 style={h}>§ 4 LIEFERUNG UND VERSAND</h2>
            <p style={s}>
              Die Lieferung erfolgt an die vom Käufer angegebene Lieferadresse. Der Versand innerhalb von Österreich und Deutschland ist bei Bestellung eines Koffer-Sets kostenlos. Bei Bestellungen von Ersatzteilen (ohne Koffer-Set) fallen Versandkosten in Höhe von € 8,70 an. Lieferungen in die Schweiz erfolgen inklusive Lieferung, steuerfrei und unverzollt. Der Käufer trägt allfällige Zollgebühren.
            </p>
            <p style={s}>
              Die Lieferzeit beträgt in der Regel 5–10 Werktage. Abweichende Lieferzeiten werden im Einzelfall kommuniziert. Im Fall von Lieferverzögerungen wird der Käufer unverzüglich informiert.
            </p>

            <h2 style={h}>§ 5 WIDERRUFSRECHT FÜR VERBRAUCHER</h2>
            <p style={s}>
              Verbraucher im Sinne des Konsumentenschutzgesetzes (KSchG) haben das Recht, den Vertrag innerhalb von 14 Tagen ohne Angabe von Gründen zu widerrufen (§ 11 FAGG). Die Widerrufsfrist beginnt ab dem Tag, an dem der Käufer oder ein von ihm benannter Dritter die Ware in Besitz genommen hat.
            </p>
            <p style={s}>
              Um das Widerrufsrecht auszuüben, ist der Verkäufer mittels einer eindeutigen Erklärung (z.B. per E-Mail an <a href="mailto:blaschegg@traunseenet.at" style={{ color: C.accent, textDecoration: "none" }}>blaschegg@traunseenet.at</a>) über den Entschluss zum Widerruf zu informieren.
            </p>
            <p style={s}>
              Im Falle eines wirksamen Widerrufs sind die beiderseits empfangenen Leistungen zurückzugewähren. Die Ware ist unverzüglich und spätestens binnen 14 Tagen ab dem Tag, an dem die Mitteilung über den Widerruf erfolgt ist, an den Verkäufer zurückzusenden. Die unmittelbaren Kosten der Rücksendung trägt der Käufer. Der Verkäufer erstattet den Kaufpreis unverzüglich, spätestens binnen 14 Tagen ab Erhalt der Widerrufserklärung. Der Verkäufer kann die Rückzahlung verweigern, bis die Ware zurückgelangt ist oder der Käufer den Nachweis erbracht hat, dass die Ware abgesendet wurde.
            </p>

            <h2 style={h}>§ 6 EIGENTUMSVORBEHALT</h2>
            <p style={s}>
              Die gelieferte Ware bleibt bis zur vollständigen Bezahlung des Kaufpreises Eigentum des Verkäufers.
            </p>

            <h2 style={h}>§ 7 GEWÄHRLEISTUNG</h2>
            <p style={s}>
              Es gelten die gesetzlichen Gewährleistungsbestimmungen. Die Gewährleistungsfrist beträgt zwei Jahre ab Übergabe der Ware an den Käufer (§ 933 ABGB). Für Unternehmer beträgt die Gewährleistungsfrist ein Jahr, sofern nicht anders vereinbart.
            </p>

            <h2 style={h}>§ 8 HAFTUNG</h2>
            <p style={s}>
              Die Haftung des Verkäufers für leichte Fahrlässigkeit ist ausgeschlossen, soweit gesetzlich zulässig. Dies gilt nicht für Personenschäden oder für Verbrauchergeschäfte, bei denen zwingende gesetzliche Bestimmungen einer Haftungsbeschränkung entgegenstehen. Die Haftung für Folgeschäden und entgangenen Gewinn ist, soweit gesetzlich zulässig, ausgeschlossen.
            </p>

            <h2 style={h}>§ 9 STEUERFREIE LIEFERUNG</h2>
            <p style={s}>
              Bei Lieferungen nach Deutschland kann auf Angabe einer gültigen UID-Nummer eine steuerfreie innergemeinschaftliche Lieferung erfolgen. Der Käufer ist für die Richtigkeit der angegebenen UID-Nummer verantwortlich. Für österreichische Bundesschulen besteht die Möglichkeit der E-Rechnung; die Einkäufergruppe kann bei der Bestellung angegeben werden.
            </p>

            <h2 style={h}>§ 10 ANWENDBARES RECHT UND GERICHTSSTAND</h2>
            <p style={s}>
              Es gilt ausschließlich österreichisches Recht unter Ausschluss des UN-Kaufrechts (CISG). Für Verbraucher gelten ergänzend die zwingenden Bestimmungen des Rechts am Wohnsitz des Verbrauchers, sofern diese einen weitergehenden Schutz bieten.
            </p>
            <p style={s}>
              Gerichtsstand für alle Streitigkeiten aus oder im Zusammenhang mit einem Vertrag ist das sachlich zuständige Gericht in Gmunden, Österreich. Für Verbraucher mit Wohnsitz in der EU gilt der Gerichtsstand am Wohnsitz des Verbrauchers.
            </p>

            <h2 style={h}>§ 11 SCHLUSSBESTIMMUNGEN</h2>
            <p style={{ ...s, marginBottom: 0 }}>
              Sollten einzelne Bestimmungen dieser AGB unwirksam oder undurchführbar sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt. An die Stelle der unwirksamen oder undurchführbaren Bestimmung tritt diejenige wirksame Regelung, deren Wirkungen der wirtschaftlichen Zielsetzung am nächsten kommen. Stand: April 2026.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function Datenschutz() {
  const s = { fontFamily: "'Inter Tight', sans-serif", fontSize: 15, color: C.textMuted, lineHeight: 1.75, margin: "0 0 20px" };
  const h = { fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, color: C.text, margin: "40px 0 16px" };
  const li = { fontFamily: "'Inter Tight', sans-serif", fontSize: 14, color: C.textMuted, lineHeight: 1.75, margin: "0 0 8px", paddingLeft: 16, position: "relative" };
  const bullet = (text) => <p style={li}>— {text}</p>;

  return (
    <div style={{ paddingTop: 72 }}>
      <section style={{ padding: "80px 32px 96px", background: C.bg }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <Heading overline="RECHTLICHES" title="DATENSCHUTZERKLÄRUNG" />
          <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, padding: "48px 40px" }}>

            <h2 style={{ ...h, marginTop: 0 }}>1. VERANTWORTLICHER</h2>
            <p style={s}>
              Schulmittel Blaschegg<br />
              Michael Blaschegg<br />
              Stücklbachstraße 13, 4813 Altmünster, Österreich<br />
              E-Mail: <a href="mailto:blaschegg@traunseenet.at" style={{ color: C.accent, textDecoration: "none" }}>blaschegg@traunseenet.at</a><br />
              Telefon: +43 (0) 676 935 40 33
            </p>

            <h2 style={h}>2. ALLGEMEINES ZUR DATENVERARBEITUNG</h2>
            <p style={s}>
              Der Schutz Ihrer personenbezogenen Daten ist uns ein wichtiges Anliegen. Diese Datenschutzerklärung informiert Sie darüber, welche personenbezogenen Daten wir im Zusammenhang mit dem Betrieb unserer Website pultteiler.eu erheben, zu welchem Zweck wir sie verarbeiten, auf welcher Rechtsgrundlage dies geschieht und welche Rechte Ihnen zustehen.
            </p>

            <h2 style={h}>3. HOSTING</h2>
            <p style={s}>
              Diese Website wird bei <strong>Vercel Inc.</strong> (440 N Barranca Ave #4133, Covina, CA 91723, USA) gehostet. Beim Aufruf unserer Website werden automatisch Informationen durch den Browser an den Server von Vercel übermittelt. Dies umfasst insbesondere:
            </p>
            {bullet("IP-Adresse des anfragenden Geräts")}
            {bullet("Datum und Uhrzeit des Zugriffs")}
            {bullet("Name und URL der abgerufenen Seite")}
            {bullet("Übertragene Datenmenge")}
            {bullet("Browsertyp und Browserversion")}
            {bullet("Betriebssystem")}
            <p style={{ ...s, marginTop: 16 }}>
              Die Verarbeitung erfolgt auf Grundlage unseres berechtigten Interesses an der Bereitstellung und Sicherheit der Website (Art. 6 Abs. 1 lit. f DSGVO). Vercel nimmt am EU-U.S. Data Privacy Framework teil, sodass ein angemessenes Datenschutzniveau für die Datenübermittlung in die USA gewährleistet ist. Weitere Informationen finden Sie unter <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" style={{ color: C.accent, textDecoration: "none" }}>vercel.com/legal/privacy-policy</a>.
            </p>

            <h2 style={h}>4. GOOGLE FONTS</h2>
            <p style={s}>
              Diese Website nutzt zur einheitlichen Darstellung von Schriftarten sogenannte Google Fonts, bereitgestellt von <strong>Google Ireland Ltd.</strong> (Gordon House, Barrow Street, Dublin 4, Irland). Beim Aufruf einer Seite lädt Ihr Browser die benötigten Schriftarten direkt von Google-Servern. Dabei wird Ihre IP-Adresse an Google übermittelt. Die Verarbeitung erfolgt auf Grundlage unseres berechtigten Interesses an einer technisch einwandfreien und ansprechenden Darstellung der Website (Art. 6 Abs. 1 lit. f DSGVO). Weitere Informationen finden Sie unter <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: C.accent, textDecoration: "none" }}>policies.google.com/privacy</a>.
            </p>

            <h2 style={h}>5. KONTAKT- UND BESTELLFORMULAR</h2>
            <p style={s}>
              Wenn Sie uns über das Kontaktformular eine Nachricht senden oder eine Bestellung über unseren Online-Shop aufgeben, werden die von Ihnen angegebenen Daten über den Dienst <strong>EmailJS</strong> (EmailJS, Inc.) an uns übermittelt. Die Verarbeitung Ihrer Kontaktdaten erfolgt auf Grundlage Ihres berechtigten Interesses an der Beantwortung Ihrer Anfrage (Art. 6 Abs. 1 lit. f DSGVO). Die Verarbeitung Ihrer Bestelldaten ist zur Durchführung vorvertraglicher Maßnahmen und zur Vertragserfüllung erforderlich (Art. 6 Abs. 1 lit. b DSGVO). Bestelldaten werden für die Dauer der gesetzlichen Aufbewahrungspflichten (in der Regel sieben Jahre gem. § 132 BAO) gespeichert. Kontaktanfragen werden nach Abschluss der Bearbeitung für sechs Monate gespeichert, sofern keine gesetzlichen Aufbewahrungspflichten bestehen.
            </p>

            <h2 style={h}>6. EXTERNE INHALTE UND CDN</h2>
            <p style={s}>
              Zur Bereitstellung bestimmter Funktionen werden Inhalte von externen Servern geladen. Konkret wird die Bibliothek EmailJS über das Content Delivery Network <strong>jsdelivr</strong> (cdn.jsdelivr.net) eingebunden. Beim Laden dieser Ressourcen wird Ihre IP-Adresse an den jeweiligen Anbieter übermittelt. Die Verarbeitung erfolgt auf Grundlage unseres berechtigten Interesses an der Bereitstellung der Bestellfunktion (Art. 6 Abs. 1 lit. f DSGVO).
            </p>

            <h2 style={h}>7. COOKIES</h2>
            <p style={s}>
              Diese Website verwendet <strong>keine Cookies</strong>, die über das technisch Notwendige hinausgehen. Es werden keine Analyse-, Marketing- oder Tracking-Cookies eingesetzt. Eine gesonderte Einwilligung über einen Cookie-Banner ist daher nicht erforderlich.
            </p>

            <h2 style={h}>8. KEINE ANALYSE- UND TRACKING-TOOLS</h2>
            <p style={s}>
              Wir setzen auf dieser Website <strong>keine Webanalyse-Tools</strong> wie Google Analytics, Matomo oder ähnliche Dienste ein. Es erfolgt kein Tracking Ihres Nutzungsverhaltens.
            </p>

            <h2 style={h}>9. DATENWEITERGABE AN DRITTE</h2>
            <p style={s}>
              Eine Weitergabe Ihrer personenbezogenen Daten an Dritte erfolgt nur, soweit dies zur Vertragserfüllung erforderlich ist (z.B. an Paketdienstleister für den Versand Ihrer Bestellung) oder eine gesetzliche Verpflichtung besteht. Im Einzelnen nutzen wir folgende Auftragsverarbeiter:
            </p>
            {bullet("Vercel Inc. (Hosting)")}
            {bullet("Google Ireland Ltd. (Google Fonts)")}
            {bullet("EmailJS, Inc. (Kontakt- und Bestellabwicklung per E-Mail)")}

            <h2 style={h}>10. DATENÜBERMITTLUNG IN DRITTLÄNDER</h2>
            <p style={s}>
              Durch die Nutzung der oben genannten Dienste kann es zu einer Übermittlung personenbezogener Daten in die USA kommen. Soweit die jeweiligen Anbieter am EU-U.S. Data Privacy Framework teilnehmen, ist ein angemessenes Datenschutzniveau gewährleistet. Im Übrigen erfolgt die Übermittlung auf Grundlage von Standardvertragsklauseln (Art. 46 Abs. 2 lit. c DSGVO).
            </p>

            <h2 style={h}>11. IHRE RECHTE</h2>
            <p style={s}>
              Sie haben gegenüber dem Verantwortlichen folgende Rechte hinsichtlich Ihrer personenbezogenen Daten:
            </p>
            {bullet("Recht auf Auskunft (Art. 15 DSGVO)")}
            {bullet("Recht auf Berichtigung (Art. 16 DSGVO)")}
            {bullet("Recht auf Löschung (Art. 17 DSGVO)")}
            {bullet("Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)")}
            {bullet("Recht auf Datenübertragbarkeit (Art. 20 DSGVO)")}
            {bullet("Widerspruchsrecht gegen die Verarbeitung (Art. 21 DSGVO)")}
            {bullet("Recht auf Widerruf erteilter Einwilligungen (Art. 7 Abs. 3 DSGVO)")}
            <p style={{ ...s, marginTop: 16 }}>
              Zur Ausübung Ihrer Rechte wenden Sie sich bitte per E-Mail an <a href="mailto:blaschegg@traunseenet.at" style={{ color: C.accent, textDecoration: "none" }}>blaschegg@traunseenet.at</a>.
            </p>

            <h2 style={h}>12. BESCHWERDERECHT</h2>
            <p style={s}>
              Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren. Die zuständige Aufsichtsbehörde in Österreich ist:
            </p>
            <p style={s}>
              <strong>Österreichische Datenschutzbehörde</strong><br />
              Barichgasse 40–42, 1030 Wien<br />
              E-Mail: dsb@dsb.gv.at<br />
              Website: <a href="https://www.dsb.gv.at" target="_blank" rel="noopener noreferrer" style={{ color: C.accent, textDecoration: "none" }}>www.dsb.gv.at</a>
            </p>

            <h2 style={h}>13. AKTUALITÄT DIESER DATENSCHUTZERKLÄRUNG</h2>
            <p style={{ ...s, marginBottom: 0 }}>
              Diese Datenschutzerklärung ist aktuell gültig (Stand: April 2026). Durch die Weiterentwicklung unserer Website oder aufgrund geänderter gesetzlicher oder behördlicher Vorgaben kann es notwendig werden, diese Datenschutzerklärung anzupassen.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  const [shopKey, setShopKey] = useState(0);
  const go = (p) => { if (p === "produkte") setShopKey(k => k + 1); setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); };

  useEffect(() => {
    const titles = { home: "Pultteiler — Der bewährte Sichtschutz für Schultische", produkte: "Produkte & Preise — Pultteiler", anleitung: "So funktioniert's — Pultteiler", galerie: "Referenzen — Pultteiler", "ueber-uns": "Über uns — Pultteiler", kontakt: "Kontakt — Pultteiler", impressum: "Impressum — Pultteiler", agb: "AGB — Pultteiler", datenschutz: "Datenschutz — Pultteiler" };
    document.title = titles[page] || "Pultteiler";
  }, [page]);

  useEffect(() => {
    if (!document.querySelector('meta[name="description"]')) {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = "Der Pultteiler ist der bewährte Sichtschutz für Schultische bei schriftlichen Prüfungen — europaweit. Einfaches Stecksystem, direkt vom Hersteller. Seit über 40 Jahren.";
      document.head.appendChild(meta);
    }
    if (!document.querySelector('link[rel="icon"]')) {
      const link = document.createElement("link");
      link.rel = "icon";
      link.href = "/images/Klammer_2.png";
      document.head.appendChild(link);
    }
  }, []);
  return (
    <CartProvider>
      <div style={{ background: C.bg, minHeight: "100vh", color: C.text }}>
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter+Tight:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
        <style>{`*, *::before, *::after { box-sizing: border-box; } body { margin: 0; background: ${C.bg}; } ::selection { background: ${C.accent}; color: ${C.white}; } @media (max-width: 768px) { .desk-nav { display: none !important; } .mob-btn { display: block !important; } .hero-g, .prod-card, .contact-g { grid-template-columns: 1fr !important; } .hero-circle { display: none !important; } .hero-plates { flex-wrap: wrap !important; justify-content: center !important; } .hero-plates > div { width: 130px !important; height: 85px !important; } .hero-plates span { font-size: 9px !important; } .region-btns { flex-direction: column !important; align-items: center !important; } .region-btns button { width: 100% !important; max-width: 320px !important; } .shop-plates { flex-wrap: wrap !important; } .shop-plates > div { width: 140px !important; height: 90px !important; } }`}</style>
        <Nav page={page} setPage={go}/>
        {page === "home" && <Home go={go}/>}
        {page === "produkte" && <Produkte key={shopKey} go={go}/>}
        {page === "anleitung" && <Anleitung go={go}/>}
        {page === "galerie" && <Galerie/>}
        {page === "ueber-uns" && <UeberUns go={go}/>}
        {page === "kontakt" && <Kontakt/>}
        {page === "impressum" && <Impressum/>}
        {page === "agb" && <Agb/>}
        {page === "datenschutz" && <Datenschutz/>}
        <Footer setPage={go}/>
        <ScrollToTop/>
      </div>
    </CartProvider>
  );
}
