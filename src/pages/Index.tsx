import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const WEDDING_DATE = new Date("2026-06-27T14:00:00");
const PHOTO_MAIN = "https://cdn.poehali.dev/projects/f53dbfb7-d727-42fe-9729-e895784092b3/bucket/2d62fc34-695b-4f6b-8057-c772eba43b92.jpeg";
const PHOTO_HANDS = "https://cdn.poehali.dev/projects/f53dbfb7-d727-42fe-9729-e895784092b3/bucket/41426e30-1b13-4f02-a1e3-ae624b97a82d.jpeg";
const PHOTO_FUN = "https://cdn.poehali.dev/projects/f53dbfb7-d727-42fe-9729-e895784092b3/bucket/d74d0554-3be4-4c72-a5e0-7dd0b33fdbe1.jpeg";

function useCountdown(target: Date) {
  const calc = () => {
    const diff = target.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

const Divider = () => (
  <div className="flex items-center gap-4 my-10 max-w-sm mx-auto">
    <div className="flex-1 h-px bg-gray-300" />
    <span style={{ color: "#b8986a", fontSize: "1rem" }}>✦</span>
    <div className="flex-1 h-px bg-gray-300" />
  </div>
);

const SectionLabel = ({ text }: { text: string }) => (
  <p style={{
    fontFamily: "'Raleway', sans-serif",
    fontSize: "0.7rem",
    letterSpacing: "0.3em",
    textTransform: "uppercase",
    color: "#b8986a",
    textAlign: "center",
    marginBottom: "0.75rem"
  }}>{text}</p>
);

const SectionHeading = ({ label, title }: { label: string; title: string }) => (
  <div className="text-center mb-14">
    <SectionLabel text={label} />
    <h2 style={{
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: "clamp(2rem, 4vw, 3rem)",
      fontWeight: 400,
      color: "#1a1a1a",
      letterSpacing: "0.03em",
    }}>{title}</h2>
    <Divider />
  </div>
);

export default function Index() {
  const countdown = useCountdown(WEDDING_DATE);
  const [rsvp, setRsvp] = useState({
    name: "", attending: "", plusOne: "", plusOneName: "", drinks: [] as string[]
  });
  const [submitted, setSubmitted] = useState(false);

  const toggleDrink = (drink: string) => {
    setRsvp(p => ({
      ...p,
      drinks: p.drinks.includes(drink) ? p.drinks.filter(d => d !== drink) : [...p.drinks, drink]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const drinks = ["Шампанское", "Вино красное", "Вино белое", "Виски", "Ром", "Водка", "Безалкогольное"];

  const S = {
    page: {
      backgroundColor: "#ffffff",
      fontFamily: "'Raleway', sans-serif",
      color: "#1a1a1a",
    } as React.CSSProperties,
    nav: {
      position: "fixed" as const,
      top: 0, left: 0, right: 0,
      zIndex: 50,
      display: "flex",
      justifyContent: "center",
      gap: "2.5rem",
      padding: "1rem 1.5rem",
      background: "rgba(255,255,255,0.97)",
      borderBottom: "1px solid #e8e0d5",
    },
    navLink: {
      fontFamily: "'Raleway', sans-serif",
      fontSize: "0.7rem",
      letterSpacing: "0.25em",
      textTransform: "uppercase" as const,
      color: "#555",
      textDecoration: "none",
    },
    section: {
      padding: "5rem 1.5rem",
    },
    sectionAlt: {
      padding: "5rem 1.5rem",
      backgroundColor: "#fafaf8",
    },
    card: {
      background: "#fff",
      border: "1px solid #e8e0d5",
      borderRadius: "4px",
      padding: "2rem",
    },
    input: {
      width: "100%",
      border: "1px solid #d0c8bf",
      borderRadius: "2px",
      padding: "0.75rem 1rem",
      fontFamily: "'Raleway', sans-serif",
      fontSize: "0.9375rem",
      color: "#1a1a1a",
      background: "#fff",
      outline: "none",
    },
    btnPrimary: {
      background: "#1a1a1a",
      color: "#fff",
      border: "none",
      borderRadius: "2px",
      padding: "0.875rem 2.5rem",
      fontFamily: "'Raleway', sans-serif",
      fontSize: "0.7rem",
      letterSpacing: "0.2em",
      textTransform: "uppercase" as const,
      cursor: "pointer",
      width: "100%",
    },
    btnOutline: {
      background: "transparent",
      color: "#1a1a1a",
      border: "1px solid #1a1a1a",
      borderRadius: "2px",
      padding: "0.75rem 2rem",
      fontFamily: "'Raleway', sans-serif",
      fontSize: "0.7rem",
      letterSpacing: "0.2em",
      textTransform: "uppercase" as const,
      cursor: "pointer",
      display: "inline-flex",
      alignItems: "center",
      gap: "0.5rem",
      textDecoration: "none",
      color2: "#1a1a1a",
    },
  };

  return (
    <div style={S.page}>

      {/* ── NAV ── */}
      <nav style={S.nav}>
        {[["Детали", "#details"], ["Фото", "#photos"], ["Дресс-код", "#dresscode"], ["RSVP", "#rsvp"]].map(([label, href]) => (
          <a key={href} href={href} style={S.navLink} className="hidden sm:inline hover:opacity-50 transition-opacity">{label}</a>
        ))}
        <a href="#rsvp" className="sm:hidden" style={{ ...S.navLink, background: "#1a1a1a", color: "#fff", padding: "0.4rem 1rem" }}>RSVP</a>
      </nav>

      {/* ── HERO ── */}
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "8rem 1.5rem 4rem" }}>
        <SectionLabel text="приглашают вас на свадьбу" />

        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(4rem, 14vw, 10rem)",
          fontWeight: 300,
          color: "#1a1a1a",
          lineHeight: 0.95,
          letterSpacing: "0.01em",
          margin: "1.5rem 0",
        }}>
          Артём<br />
          <span style={{ color: "#b8986a", fontStyle: "italic" }}>&amp;</span><br />
          Татьяна
        </h1>

        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "1.25rem",
          color: "#888",
          fontStyle: "italic",
          letterSpacing: "0.1em",
          marginBottom: "3rem",
        }}>27 июня 2026</p>

        {/* Countdown */}
        <div style={{ display: "flex", gap: "3rem", marginBottom: "3rem" }}>
          {[
            { val: countdown.days, label: "дней" },
            { val: countdown.hours, label: "часов" },
            { val: countdown.minutes, label: "минут" },
            { val: countdown.seconds, label: "секунд" },
          ].map(({ val, label }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 300, color: "#1a1a1a", lineHeight: 1 }}>
                {String(val).padStart(2, "0")}
              </div>
              <div style={{ fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#aaa", marginTop: "0.4rem" }}>
                {label}
              </div>
            </div>
          ))}
        </div>

        <a href="#rsvp" style={{ ...S.btnPrimary, width: "auto", display: "inline-block", textDecoration: "none" }}>
          Подтвердить присутствие
        </a>

        <div style={{ marginTop: "4rem", color: "#ccc" }}>
          <Icon name="ChevronDown" size={24} />
        </div>
      </section>

      {/* ── PHOTOS ── */}
      <section id="photos" style={S.sectionAlt}>
        <SectionHeading label="наши фотографии" title="Молодожёны" />
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <div style={{ borderRadius: "2px", overflow: "hidden", marginBottom: "8px", position: "relative" }}>
            <img src={PHOTO_MAIN} alt="Артём и Татьяна" style={{ width: "100%", maxHeight: "600px", objectFit: "cover", objectPosition: "top", display: "block" }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "2.5rem", textAlign: "center", background: "linear-gradient(to top, rgba(0,0,0,0.55), transparent)" }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", color: "#fff", fontSize: "2rem", fontWeight: 300, fontStyle: "italic" }}>Артём &amp; Татьяна</p>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase" }}>27 · 06 · 2026</p>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
            <div style={{ borderRadius: "2px", overflow: "hidden" }}>
              <img src={PHOTO_HANDS} alt="Руки молодожёнов" style={{ width: "100%", height: "320px", objectFit: "cover", display: "block" }} />
            </div>
            <div style={{ borderRadius: "2px", overflow: "hidden" }}>
              <img src={PHOTO_FUN} alt="Артём и Татьяна" style={{ width: "100%", height: "320px", objectFit: "cover", objectPosition: "top", display: "block" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── DETAILS ── */}
      <section id="details" style={S.section}>
        <SectionHeading label="всё что нужно знать" title="Детали события" />
        <div style={{ maxWidth: "900px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem" }}>
          {[
            { icon: "Calendar", label: "Дата", value: "27 июня 2026", sub: "Суббота" },
            { icon: "Clock", label: "Время", value: "14:00 / 15:00", sub: "Сбор гостей · Церемония в 15:00" },
            { icon: "MapPin", label: "Место", value: "Шатёр Бриз · Солнечный Берег", sub: "Московская область, г.о. Мытищи" },
          ].map(({ icon, label, value, sub }) => (
            <div key={label} style={{ ...S.card, textAlign: "center" }}>
              <div style={{ width: "48px", height: "48px", border: "1px solid #e8e0d5", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.25rem" }}>
                <Icon name={icon} size={20} style={{ color: "#b8986a" }} />
              </div>
              <p style={{ fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#b8986a", marginBottom: "0.5rem" }}>{label}</p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", color: "#1a1a1a", fontWeight: 400, marginBottom: "0.25rem" }}>{value}</p>
              <p style={{ fontSize: "0.8rem", color: "#888" }}>{sub}</p>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <a href="https://yandex.ru/maps/org/solnechny_bereg/74953171641?si=xnm3y2na3jdtrk0q2167npj274"
            target="_blank" rel="noopener noreferrer"
            style={{ ...S.btnOutline, color: "#1a1a1a" }}>
            <Icon name="Navigation" size={14} />
            Открыть маршрут на карте
          </a>
        </div>
      </section>

      {/* ── DRESS CODE ── */}
      <section id="dresscode" style={S.sectionAlt}>
        <SectionHeading label="стиль вечера" title="Дресс-код" />
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ ...S.card, textAlign: "center", marginBottom: "1.5rem", borderTop: "3px solid #b8986a" }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.75rem", color: "#1a1a1a", fontWeight: 400, marginBottom: "0.5rem" }}>
              Нежные пастельные тона
            </p>
            <p style={{ fontSize: "0.8rem", color: "#888", letterSpacing: "0.1em" }}>
              Formal / Black Tie Optional
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            {[
              {
                icon: "👗", title: "Для неё",
                items: ["Вечернее или коктейльное платье", "Пастельные оттенки: пудровый, мятный, лавандовый", "Элегантные туфли или босоножки"],
                warn: "Избегайте белого и айвори"
              },
              {
                icon: "🤵", title: "Для него",
                items: ["Классический костюм или смокинг", "Светлые или нейтральные тона", "Галстук или галстук-бабочка", "Классические туфли"],
                warn: ""
              }
            ].map(({ icon, title, items, warn }) => (
              <div key={title} style={S.card}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem", borderBottom: "1px solid #e8e0d5", paddingBottom: "1rem" }}>
                  <span style={{ fontSize: "1.5rem" }}>{icon}</span>
                  <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", color: "#1a1a1a", fontWeight: 400 }}>{title}</h4>
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {items.map(item => (
                    <li key={item} style={{ fontSize: "0.875rem", color: "#444", lineHeight: 1.9, display: "flex", gap: "0.5rem" }}>
                      <span style={{ color: "#b8986a", flexShrink: 0 }}>—</span>{item}
                    </li>
                  ))}
                  {warn && (
                    <li style={{ fontSize: "0.8rem", color: "#c0392b", marginTop: "0.75rem", display: "flex", gap: "0.5rem" }}>
                      <span style={{ flexShrink: 0 }}>✗</span>{warn}
                    </li>
                  )}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ ...S.card, marginTop: "1.5rem", background: "#fafaf8" }}>
            <p style={{ fontSize: "0.875rem", color: "#555", textAlign: "center", lineHeight: 1.7 }}>
              💡 Рекомендуем дамам выбирать каблук не выше 5 см — церемония проходит на открытом воздухе с газоном
            </p>
          </div>
        </div>
      </section>

      {/* ── RSVP ── */}
      <section id="rsvp" style={S.section}>
        <SectionHeading label="подтверждение" title="Форма RSVP" />
        <div style={{ maxWidth: "560px", margin: "0 auto" }}>
          {submitted ? (
            <div style={{ ...S.card, textAlign: "center", padding: "4rem 2rem", borderTop: "3px solid #b8986a" }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.5rem", color: "#1a1a1a", fontWeight: 300, marginBottom: "0.75rem" }}>Спасибо</p>
              <p style={{ fontSize: "0.9rem", color: "#888" }}>Мы с нетерпением ждём встречи с вами</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ ...S.card, display: "flex", flexDirection: "column", gap: "1.5rem", borderTop: "3px solid #b8986a" }}>
              {/* Name */}
              <div>
                <label style={{ display: "block", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#888", marginBottom: "0.5rem" }}>
                  Ваше имя *
                </label>
                <input style={S.input} placeholder="Имя и фамилия" required value={rsvp.name}
                  onChange={e => setRsvp(p => ({ ...p, name: e.target.value }))} />
              </div>

              {/* Attending */}
              <div>
                <label style={{ display: "block", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#888", marginBottom: "0.75rem" }}>
                  Смогу присутствовать? *
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                  {[["yes", "Да, буду"], ["no", "К сожалению, нет"]].map(([val, label]) => (
                    <button key={val} type="button"
                      onClick={() => setRsvp(p => ({ ...p, attending: val }))}
                      style={{
                        padding: "0.75rem",
                        border: "1px solid",
                        borderColor: rsvp.attending === val ? "#1a1a1a" : "#d0c8bf",
                        background: rsvp.attending === val ? "#1a1a1a" : "#fff",
                        color: rsvp.attending === val ? "#fff" : "#555",
                        fontFamily: "'Raleway', sans-serif",
                        fontSize: "0.8rem",
                        cursor: "pointer",
                        borderRadius: "2px",
                        transition: "all 0.2s",
                      }}>
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {rsvp.attending === "yes" && (<>
                {/* Plus one */}
                <div>
                  <label style={{ display: "block", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#888", marginBottom: "0.75rem" }}>
                    Придёте с сопровождающим?
                  </label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                    {[["yes", "Да, с парой"], ["no", "Приду один(а)"]].map(([val, label]) => (
                      <button key={val} type="button"
                        onClick={() => setRsvp(p => ({ ...p, plusOne: val }))}
                        style={{
                          padding: "0.75rem",
                          border: "1px solid",
                          borderColor: rsvp.plusOne === val ? "#1a1a1a" : "#d0c8bf",
                          background: rsvp.plusOne === val ? "#1a1a1a" : "#fff",
                          color: rsvp.plusOne === val ? "#fff" : "#555",
                          fontFamily: "'Raleway', sans-serif",
                          fontSize: "0.8rem",
                          cursor: "pointer",
                          borderRadius: "2px",
                          transition: "all 0.2s",
                        }}>
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {rsvp.plusOne === "yes" && (
                  <div>
                    <label style={{ display: "block", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#888", marginBottom: "0.5rem" }}>
                      Имя сопровождающего
                    </label>
                    <input style={S.input} placeholder="Имя вашего гостя" value={rsvp.plusOneName}
                      onChange={e => setRsvp(p => ({ ...p, plusOneName: e.target.value }))} />
                  </div>
                )}

                {/* Drinks */}
                <div>
                  <label style={{ display: "block", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#888", marginBottom: "0.75rem" }}>
                    Предпочтения в напитках
                  </label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                    {drinks.map(drink => (
                      <button key={drink} type="button" onClick={() => toggleDrink(drink)}
                        style={{
                          padding: "0.4rem 1rem",
                          border: "1px solid",
                          borderColor: rsvp.drinks.includes(drink) ? "#b8986a" : "#d0c8bf",
                          background: rsvp.drinks.includes(drink) ? "#b8986a" : "#fff",
                          color: rsvp.drinks.includes(drink) ? "#fff" : "#555",
                          fontFamily: "'Raleway', sans-serif",
                          fontSize: "0.75rem",
                          cursor: "pointer",
                          borderRadius: "2px",
                          transition: "all 0.2s",
                        }}>
                        {drink}
                      </button>
                    ))}
                  </div>
                </div>
              </>)}

              <button type="submit" style={S.btnPrimary}>Отправить ответ</button>
            </form>
          )}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: "1px solid #e8e0d5", padding: "3rem 1.5rem", textAlign: "center" }}>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 300, color: "#1a1a1a", fontStyle: "italic" }}>
          Артём &amp; Татьяна
        </p>
        <p style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#b8986a", marginTop: "0.5rem" }}>
          27 · 06 · 2026
        </p>
        <p style={{ fontSize: "0.75rem", color: "#aaa", marginTop: "1.5rem" }}>
          По вопросам: +7 (900) 000-00-00
        </p>
      </footer>
    </div>
  );
}