// ============================================================
// DATENSCHUTZERKLÄRUNG — Replace the existing Datenschutz() function
// ============================================================

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

            <h2 style={h}>5. KONTAKTFORMULAR</h2>
            <p style={s}>
              Wenn Sie uns über das Kontaktformular auf der Website eine Nachricht senden, werden Ihre Angaben (Name, E-Mail-Adresse, Nachricht) an den Dienst <strong>FormSubmit.co</strong> übermittelt und von dort per E-Mail an uns weitergeleitet. Die Verarbeitung Ihrer Daten erfolgt zum Zweck der Bearbeitung Ihrer Anfrage auf Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) bzw. unseres berechtigten Interesses an der Beantwortung Ihrer Anfrage (Art. 6 Abs. 1 lit. f DSGVO). Ihre Daten werden ausschließlich zur Bearbeitung Ihrer Anfrage verwendet und nach Abschluss der Bearbeitung für sechs Monate gespeichert, sofern keine gesetzlichen Aufbewahrungspflichten bestehen.
            </p>

            <h2 style={h}>6. BESTELLFORMULAR</h2>
            <p style={s}>
              Wenn Sie eine Bestellung über unseren Online-Shop aufgeben, werden die von Ihnen angegebenen Daten (Name/Schule, Ansprechperson, Adresse, E-Mail, Telefonnummer, UID-Nummer, Einkäufergruppe, Anmerkungen) über den Dienst <strong>EmailJS</strong> (EmailJS, Inc.) an uns übermittelt. Die Verarbeitung dieser Daten ist zur Durchführung vorvertraglicher Maßnahmen und zur Vertragserfüllung erforderlich (Art. 6 Abs. 1 lit. b DSGVO). Ihre Bestelldaten werden für die Dauer der gesetzlichen Aufbewahrungspflichten (in der Regel sieben Jahre gem. § 132 BAO) gespeichert.
            </p>

            <h2 style={h}>7. EXTERNE INHALTE UND CDN</h2>
            <p style={s}>
              Zur Bereitstellung bestimmter Funktionen werden Inhalte von externen Servern geladen. Konkret wird die Bibliothek EmailJS über das Content Delivery Network <strong>jsdelivr</strong> (cdn.jsdelivr.net) eingebunden. Beim Laden dieser Ressourcen wird Ihre IP-Adresse an den jeweiligen Anbieter übermittelt. Die Verarbeitung erfolgt auf Grundlage unseres berechtigten Interesses an der Bereitstellung der Bestellfunktion (Art. 6 Abs. 1 lit. f DSGVO).
            </p>

            <h2 style={h}>8. COOKIES</h2>
            <p style={s}>
              Diese Website verwendet <strong>keine Cookies</strong>, die über das technisch Notwendige hinausgehen. Es werden keine Analyse-, Marketing- oder Tracking-Cookies eingesetzt. Eine gesonderte Einwilligung über einen Cookie-Banner ist daher nicht erforderlich.
            </p>

            <h2 style={h}>9. KEINE ANALYSE- UND TRACKING-TOOLS</h2>
            <p style={s}>
              Wir setzen auf dieser Website <strong>keine Webanalyse-Tools</strong> wie Google Analytics, Matomo oder ähnliche Dienste ein. Es erfolgt kein Tracking Ihres Nutzungsverhaltens.
            </p>

            <h2 style={h}>10. DATENWEITERGABE AN DRITTE</h2>
            <p style={s}>
              Eine Weitergabe Ihrer personenbezogenen Daten an Dritte erfolgt nur, soweit dies zur Vertragserfüllung erforderlich ist (z.B. an Paketdienstleister für den Versand Ihrer Bestellung) oder eine gesetzliche Verpflichtung besteht. Im Einzelnen nutzen wir folgende Auftragsverarbeiter:
            </p>
            {bullet("Vercel Inc. (Hosting)")}
            {bullet("Google Ireland Ltd. (Google Fonts)")}
            {bullet("FormSubmit.co (Kontaktformular)")}
            {bullet("EmailJS, Inc. (Bestellabwicklung per E-Mail)")}

            <h2 style={h}>11. DATENÜBERMITTLUNG IN DRITTLÄNDER</h2>
            <p style={s}>
              Durch die Nutzung der oben genannten Dienste kann es zu einer Übermittlung personenbezogener Daten in die USA kommen. Soweit die jeweiligen Anbieter am EU-U.S. Data Privacy Framework teilnehmen, ist ein angemessenes Datenschutzniveau gewährleistet. Im Übrigen erfolgt die Übermittlung auf Grundlage von Standardvertragsklauseln (Art. 46 Abs. 2 lit. c DSGVO).
            </p>

            <h2 style={h}>12. IHRE RECHTE</h2>
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

            <h2 style={h}>13. BESCHWERDERECHT</h2>
            <p style={s}>
              Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren. Die zuständige Aufsichtsbehörde in Österreich ist:
            </p>
            <p style={s}>
              <strong>Österreichische Datenschutzbehörde</strong><br />
              Barichgasse 40–42, 1030 Wien<br />
              E-Mail: dsb@dsb.gv.at<br />
              Website: <a href="https://www.dsb.gv.at" target="_blank" rel="noopener noreferrer" style={{ color: C.accent, textDecoration: "none" }}>www.dsb.gv.at</a>
            </p>

            <h2 style={h}>14. AKTUALITÄT DIESER DATENSCHUTZERKLÄRUNG</h2>
            <p style={{ ...s, marginBottom: 0 }}>
              Diese Datenschutzerklärung ist aktuell gültig (Stand: April 2026). Durch die Weiterentwicklung unserer Website oder aufgrund geänderter gesetzlicher oder behördlicher Vorgaben kann es notwendig werden, diese Datenschutzerklärung anzupassen.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}


// ============================================================
// AGB — Replace the existing Agb() function
// ============================================================

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
