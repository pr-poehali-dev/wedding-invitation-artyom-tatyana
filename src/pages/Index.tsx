import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const WEDDING_DATE = new Date("2026-06-27T14:00:00");
const PHOTO_MAIN = "https://cdn.poehali.dev/projects/f53dbfb7-d727-42fe-9729-e895784092b3/bucket/d74d0554-3be4-4c72-a5e0-7dd0b33fdbe1.jpeg";
const PHOTO_HANDS = "https://cdn.poehali.dev/projects/f53dbfb7-d727-42fe-9729-e895784092b3/bucket/41426e30-1b13-4f02-a1e3-ae624b97a82d.jpeg";
const PHOTO_FUN = "https://cdn.poehali.dev/projects/f53dbfb7-d727-42fe-9729-e895784092b3/bucket/2d62fc34-695b-4f6b-8057-c772eba43b92.jpeg";

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

export default function Index() {
  const countdown = useCountdown(WEDDING_DATE);
  const [rsvp, setRsvp] = useState({
    name: "", attending: "", plusOne: "", plusOneName: "", drinks: [] as string[], food: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const toggleDrink = (drink: string) => {
    setRsvp(p => ({
      ...p,
      drinks: p.drinks.includes(drink) ? p.drinks.filter(d => d !== drink) : [...p.drinks, drink]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await fetch('https://functions.poehali.dev/79e9aeef-84a5-4fe1-8588-bd23d977c702', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rsvp),
      });
    } catch (err) { console.error(err); }
    setSending(false);
    setSubmitted(true);
  };

  const drinks = ["Шампанское", "Вино красное", "Вино белое", "Виски", "Ром", "Водка", "Безалкогольное"];

  const colors = {
    bg: "#fdf6f0",
    bgAlt: "#fff9f5",
    accent: "#c4856a",
    accentLight: "#e8c5b5",
    dark: "#2c1810",
    muted: "#8c6b5a",
    border: "#e8d5c8",
    white: "#ffffff",
  };

  const headingFont = "'Playfair Display', serif";
  const bodyFont = "'Raleway', sans-serif";

  return (
    <div style={{ backgroundColor: colors.bg, fontFamily: bodyFont, color: colors.dark, minHeight: "100vh" }}>

      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400;1,500&family=Raleway:wght@300;400;500;600&display=swap');
        html { scroll-behavior: smooth; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        display: "flex", justifyContent: "center", gap: "2.5rem",
        padding: "1rem 1.5rem",
        background: "rgba(253,246,240,0.96)",
        borderBottom: `1px solid ${colors.border}`,
        backdropFilter: "blur(8px)",
      }}>
        {[["Детали", "#details"], ["Фото", "#photos"], ["Дресс-код", "#dresscode"], ["RSVP", "#rsvp"]].map(([label, href]) => (
          <a key={href} href={href} className="hidden sm:inline" style={{
            fontFamily: bodyFont, fontSize: "0.65rem", letterSpacing: "0.3em",
            textTransform: "uppercase", color: colors.muted, textDecoration: "none",
          }}
            onMouseOver={e => (e.currentTarget.style.color = colors.accent)}
            onMouseOut={e => (e.currentTarget.style.color = colors.muted)}
          >{label}</a>
        ))}
        <a href="#rsvp" className="sm:hidden" style={{
          fontFamily: bodyFont, fontSize: "0.6rem", letterSpacing: "0.2em",
          textTransform: "uppercase", background: colors.accent, color: "#fff",
          padding: "0.4rem 1rem", textDecoration: "none", borderRadius: "2px",
        }}>RSVP</a>
      </nav>

      {/* ── HERO ── */}
      <section style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        textAlign: "center", padding: "8rem 1.5rem 5rem",
        background: `linear-gradient(180deg, ${colors.bgAlt} 0%, ${colors.bg} 100%)`,
      }}>
        {/* Decorative top line */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
          <div style={{ width: "60px", height: "1px", background: colors.accentLight }} />
          <span style={{ fontSize: "1.2rem", color: colors.accentLight }}>💍</span>
          <div style={{ width: "60px", height: "1px", background: colors.accentLight }} />
        </div>

        <p style={{
          fontFamily: bodyFont, fontSize: "0.65rem", letterSpacing: "0.4em",
          textTransform: "uppercase", color: colors.accent, marginBottom: "1.5rem",
        }}>
          приглашают вас на свадьбу
        </p>

        <h1 style={{
          fontFamily: headingFont,
          fontSize: "clamp(3.5rem, 12vw, 8rem)",
          fontWeight: 400, color: colors.dark,
          lineHeight: 1.05, letterSpacing: "0.02em",
          marginBottom: "0.5rem",
        }}>
          Артём
        </h1>
        <p style={{
          fontFamily: headingFont, fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
          fontStyle: "italic", color: colors.accent, marginBottom: "0.5rem",
        }}>и</p>
        <h1 style={{
          fontFamily: headingFont,
          fontSize: "clamp(3.5rem, 12vw, 8rem)",
          fontWeight: 400, color: colors.dark,
          lineHeight: 1.05, letterSpacing: "0.02em",
          marginBottom: "2.5rem",
        }}>
          Татьяна
        </h1>

        {/* Main photo polaroid style */}
        <div style={{
          background: colors.white, padding: "12px 12px 40px",
          boxShadow: "0 8px 40px rgba(44,24,16,0.12)",
          transform: "rotate(-1.5deg)", marginBottom: "3rem",
          maxWidth: "320px", width: "90%",
        }}>
          <img src={PHOTO_MAIN} alt="Артём и Татьяна" style={{
            width: "100%", height: "380px", objectFit: "cover",
            objectPosition: "top", display: "block",
          }} />
          <p style={{
            fontFamily: headingFont, fontStyle: "italic",
            color: colors.muted, fontSize: "1rem",
            textAlign: "center", marginTop: "12px",
          }}>Артём &amp; Татьяна</p>
        </div>

        <p style={{
          fontFamily: headingFont, fontSize: "clamp(1.1rem, 3vw, 1.5rem)",
          fontStyle: "italic", color: colors.muted, marginBottom: "3rem",
          letterSpacing: "0.05em",
        }}>27 июня 2026</p>

        {/* Countdown */}
        <div style={{ display: "flex", gap: "clamp(1.5rem, 4vw, 3.5rem)", marginBottom: "3rem" }}>
          {[
            { val: countdown.days, label: "дней" },
            { val: countdown.hours, label: "часов" },
            { val: countdown.minutes, label: "минут" },
            { val: countdown.seconds, label: "секунд" },
          ].map(({ val, label }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{
                fontFamily: headingFont, fontSize: "clamp(2rem, 6vw, 3.5rem)",
                fontWeight: 500, color: colors.accent, lineHeight: 1,
              }}>
                {String(val).padStart(2, "0")}
              </div>
              <div style={{
                fontSize: "0.55rem", letterSpacing: "0.3em",
                textTransform: "uppercase", color: colors.muted, marginTop: "0.4rem",
              }}>
                {label}
              </div>
            </div>
          ))}
        </div>

        <a href="#rsvp" style={{
          background: colors.accent, color: "#fff", border: "none",
          padding: "0.9rem 3rem", fontFamily: bodyFont,
          fontSize: "0.65rem", letterSpacing: "0.3em",
          textTransform: "uppercase", cursor: "pointer",
          textDecoration: "none", display: "inline-block",
          borderRadius: "2px", transition: "opacity 0.2s",
        }}
          onMouseOver={e => (e.currentTarget.style.opacity = "0.85")}
          onMouseOut={e => (e.currentTarget.style.opacity = "1")}
        >
          Подтвердить присутствие
        </a>

        <div style={{ marginTop: "3.5rem", color: colors.accentLight }}>
          <Icon name="ChevronDown" size={22} />
        </div>
      </section>

      {/* ── PHOTOS ── */}
      <section id="photos" style={{ padding: "6rem 1.5rem", background: colors.bgAlt }}>
        {/* Section header */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <p style={{ fontFamily: bodyFont, fontSize: "0.6rem", letterSpacing: "0.4em", textTransform: "uppercase", color: colors.accent, marginBottom: "0.75rem" }}>
            наши фотографии
          </p>
          <h2 style={{ fontFamily: headingFont, fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 400, color: colors.dark }}>
            Молодожёны
          </h2>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", justifyContent: "center", marginTop: "1.5rem" }}>
            <div style={{ width: "50px", height: "1px", background: colors.accentLight }} />
            <span style={{ color: colors.accent, fontSize: "0.8rem" }}>✦</span>
            <div style={{ width: "50px", height: "1px", background: colors.accentLight }} />
          </div>
        </div>

        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          {/* Two polaroids side by side */}
          <div style={{ display: "flex", gap: "2rem", justifyContent: "center", flexWrap: "wrap" }}>
            <div style={{
              background: colors.white, padding: "10px 10px 36px",
              boxShadow: "0 6px 30px rgba(44,24,16,0.1)",
              transform: "rotate(-2deg)", flex: "1", minWidth: "240px", maxWidth: "380px",
            }}>
              <img src={PHOTO_HANDS} alt="Руки молодожёнов" style={{
                width: "100%", height: "300px", objectFit: "cover", display: "block",
              }} />
              <p style={{ fontFamily: headingFont, fontStyle: "italic", color: colors.muted, fontSize: "0.85rem", textAlign: "center", marginTop: "10px" }}>
                вместе навсегда
              </p>
            </div>
            <div style={{
              background: colors.white, padding: "10px 10px 36px",
              boxShadow: "0 6px 30px rgba(44,24,16,0.1)",
              transform: "rotate(1.5deg)", flex: "1", minWidth: "240px", maxWidth: "380px",
            }}>
              <img src={PHOTO_FUN} alt="Артём и Татьяна" style={{
                width: "100%", height: "300px", objectFit: "cover", objectPosition: "top", display: "block",
              }} />
              <p style={{ fontFamily: headingFont, fontStyle: "italic", color: colors.muted, fontSize: "0.85rem", textAlign: "center", marginTop: "10px" }}>
                наша история
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── DETAILS ── */}
      <section id="details" style={{ padding: "6rem 1.5rem", background: colors.bg }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <p style={{ fontFamily: bodyFont, fontSize: "0.6rem", letterSpacing: "0.4em", textTransform: "uppercase", color: colors.accent, marginBottom: "0.75rem" }}>
            всё что нужно знать
          </p>
          <h2 style={{ fontFamily: headingFont, fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 400, color: colors.dark }}>
            Детали события
          </h2>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", justifyContent: "center", marginTop: "1.5rem" }}>
            <div style={{ width: "50px", height: "1px", background: colors.accentLight }} />
            <span style={{ color: colors.accent, fontSize: "0.8rem" }}>✦</span>
            <div style={{ width: "50px", height: "1px", background: colors.accentLight }} />
          </div>
        </div>

        <div style={{ maxWidth: "900px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem" }}>
          {[
            { icon: "Calendar", label: "Дата", value: "27 июня 2026", sub: "Суббота" },
            { icon: "Clock", label: "Время", value: "14:00 / 15:00", sub: "Сбор гостей · Церемония в 15:00" },
            { icon: "MapPin", label: "Место", value: "Шатёр Бриз · Солнечный Берег", sub: "Московская область, г.о. Мытищи" },
          ].map(({ icon, label, value, sub }) => (
            <div key={label} style={{
              background: colors.white, border: `1px solid ${colors.border}`,
              borderTop: `3px solid ${colors.accent}`,
              borderRadius: "2px", padding: "2rem", textAlign: "center",
            }}>
              <div style={{
                width: "48px", height: "48px",
                border: `1px solid ${colors.accentLight}`,
                borderRadius: "50%", display: "flex", alignItems: "center",
                justifyContent: "center", margin: "0 auto 1.25rem",
                background: colors.bgAlt,
              }}>
                <Icon name={icon} size={20} style={{ color: colors.accent }} />
              </div>
              <p style={{ fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: colors.accent, marginBottom: "0.5rem" }}>{label}</p>
              <p style={{ fontFamily: headingFont, fontSize: "1.2rem", color: colors.dark, fontWeight: 400, marginBottom: "0.25rem" }}>{value}</p>
              <p style={{ fontSize: "0.8rem", color: colors.muted }}>{sub}</p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <a href="https://yandex.ru/maps/org/solnechny_bereg/74953171641?si=xnm3y2na3jdtrk0q2167npj274"
            target="_blank" rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              border: `1px solid ${colors.accent}`, color: colors.accent,
              background: "transparent", padding: "0.75rem 2rem",
              fontFamily: bodyFont, fontSize: "0.65rem", letterSpacing: "0.2em",
              textTransform: "uppercase", textDecoration: "none", borderRadius: "2px",
              transition: "all 0.2s",
            }}
            onMouseOver={e => { e.currentTarget.style.background = colors.accent; e.currentTarget.style.color = "#fff"; }}
            onMouseOut={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = colors.accent; }}
          >
            <Icon name="Navigation" size={14} />
            Открыть маршрут на карте
          </a>
        </div>
      </section>

      {/* ── DRESS CODE ── */}
      <section id="dresscode" style={{ padding: "6rem 1.5rem", background: colors.bgAlt }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <p style={{ fontFamily: bodyFont, fontSize: "0.6rem", letterSpacing: "0.4em", textTransform: "uppercase", color: colors.accent, marginBottom: "0.75rem" }}>
            стиль вечера
          </p>
          <h2 style={{ fontFamily: headingFont, fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 400, color: colors.dark }}>
            Дресс-код
          </h2>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", justifyContent: "center", marginTop: "1.5rem" }}>
            <div style={{ width: "50px", height: "1px", background: colors.accentLight }} />
            <span style={{ color: colors.accent, fontSize: "0.8rem" }}>✦</span>
            <div style={{ width: "50px", height: "1px", background: colors.accentLight }} />
          </div>
        </div>

        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={{
            background: colors.white, border: `1px solid ${colors.border}`,
            borderRadius: "2px", padding: "2rem", textAlign: "center", marginBottom: "1.5rem",
            borderTop: `3px solid ${colors.accent}`,
          }}>
            <p style={{ fontFamily: headingFont, fontSize: "1.75rem", color: colors.dark, fontWeight: 400, fontStyle: "italic", marginBottom: "0.5rem" }}>
              Нежные пастельные тона
            </p>
            <p style={{ fontSize: "0.8rem", color: colors.muted, letterSpacing: "0.1em" }}>
              Formal / Black Tie Optional
            </p>
          </div>

          {/* Color palette */}
          <div style={{ background: colors.white, border: `1px solid ${colors.border}`, borderRadius: "2px", padding: "1.5rem", marginBottom: "1.5rem", textAlign: "center" }}>
            <p style={{ fontFamily: bodyFont, fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: colors.muted, marginBottom: "1rem" }}>
              Палитра цветов
            </p>
            <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
              {[
                { color: "#f2e4da", name: "Пудровый" },
                { color: "#d4b8c0", name: "Розовый" },
                { color: "#c4e0d4", name: "Мятный" },
                { color: "#d0c8e0", name: "Лавандовый" },
                { color: "#e8d8c0", name: "Бежевый" },
                { color: "#c8d8e8", name: "Голубой" },
              ].map(({ color, name }) => (
                <div key={name} style={{ textAlign: "center" }}>
                  <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: color, border: `1px solid ${colors.border}`, margin: "0 auto 0.35rem" }} />
                  <p style={{ fontSize: "0.6rem", color: colors.muted }}>{name}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            {[
              {
                icon: "👗", title: "Для неё",
                items: ["Вечернее или коктейльное платье", "Пастельные оттенки", "Элегантные туфли или босоножки"],
                warn: "Избегайте белого и айвори"
              },
              {
                icon: "🤵", title: "Для него",
                items: ["Классический костюм или смокинг", "Светлые или нейтральные тона", "Галстук или галстук-бабочка"],
                warn: ""
              }
            ].map(({ icon, title, items, warn }) => (
              <div key={title} style={{ background: colors.white, border: `1px solid ${colors.border}`, borderRadius: "2px", padding: "1.75rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem", borderBottom: `1px solid ${colors.border}`, paddingBottom: "1rem" }}>
                  <span style={{ fontSize: "1.5rem" }}>{icon}</span>
                  <h4 style={{ fontFamily: headingFont, fontSize: "1.25rem", color: colors.dark, fontWeight: 400 }}>{title}</h4>
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {items.map(item => (
                    <li key={item} style={{ fontSize: "0.85rem", color: colors.muted, lineHeight: 1.9, display: "flex", gap: "0.5rem" }}>
                      <span style={{ color: colors.accent, flexShrink: 0 }}>—</span>{item}
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

          <div style={{ background: colors.white, border: `1px solid ${colors.border}`, borderRadius: "2px", padding: "1.25rem", marginTop: "1.5rem", textAlign: "center" }}>
            <p style={{ fontSize: "0.875rem", color: colors.muted, lineHeight: 1.7 }}>
              💡 Рекомендуем дамам выбирать каблук не выше 5 см — церемония проходит на открытом воздухе с газоном
            </p>
          </div>
        </div>
      </section>

      {/* ── RSVP ── */}
      <section id="rsvp" style={{ padding: "6rem 1.5rem", background: colors.bg }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <p style={{ fontFamily: bodyFont, fontSize: "0.6rem", letterSpacing: "0.4em", textTransform: "uppercase", color: colors.accent, marginBottom: "0.75rem" }}>
            подтверждение
          </p>
          <h2 style={{ fontFamily: headingFont, fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 400, color: colors.dark }}>
            Дорогие гости
          </h2>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", justifyContent: "center", marginTop: "1.5rem" }}>
            <div style={{ width: "50px", height: "1px", background: colors.accentLight }} />
            <span style={{ color: colors.accent, fontSize: "0.8rem" }}>✦</span>
            <div style={{ width: "50px", height: "1px", background: colors.accentLight }} />
          </div>
          <p style={{ fontFamily: headingFont, fontStyle: "italic", fontSize: "1.05rem", color: colors.muted, marginTop: "1.25rem", maxWidth: "480px", margin: "1.25rem auto 0", lineHeight: 1.7 }}>
            Приглашаем вас разделить с нами радость особенного для нас события и стать частью нашей семейной истории!
          </p>
        </div>

        <div style={{ maxWidth: "540px", margin: "0 auto" }}>
          {submitted ? (
            <div style={{
              background: colors.white, border: `1px solid ${colors.border}`,
              borderTop: `3px solid ${colors.accent}`,
              borderRadius: "2px", padding: "4rem 2rem", textAlign: "center",
            }}>
              <p style={{ fontFamily: headingFont, fontSize: "2.5rem", color: colors.dark, fontWeight: 400, fontStyle: "italic", marginBottom: "0.75rem" }}>Спасибо!</p>
              <p style={{ fontSize: "0.9rem", color: colors.muted }}>Мы с нетерпением ждём встречи с вами</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{
              background: colors.white, border: `1px solid ${colors.border}`,
              borderTop: `3px solid ${colors.accent}`,
              borderRadius: "2px", padding: "2.5rem",
              display: "flex", flexDirection: "column", gap: "1.5rem",
            }}>
              {/* Name */}
              <div>
                <label style={{ display: "block", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: colors.muted, marginBottom: "0.5rem" }}>
                  Ваше имя *
                </label>
                <input
                  style={{
                    width: "100%", border: `1px solid ${colors.border}`, borderRadius: "2px",
                    padding: "0.75rem 1rem", fontFamily: bodyFont, fontSize: "0.9375rem",
                    color: colors.dark, background: colors.bgAlt, outline: "none",
                  }}
                  placeholder="Имя и фамилия" required value={rsvp.name}
                  onChange={e => setRsvp(p => ({ ...p, name: e.target.value }))} />
              </div>

              {/* Attending */}
              <div>
                <label style={{ display: "block", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: colors.muted, marginBottom: "0.75rem" }}>
                  Смогу присутствовать? *
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                  {[["yes", "Да, буду"], ["no", "К сожалению, нет"]].map(([val, label]) => (
                    <button key={val} type="button"
                      onClick={() => setRsvp(p => ({ ...p, attending: val }))}
                      style={{
                        padding: "0.75rem",
                        border: `1px solid ${rsvp.attending === val ? colors.accent : colors.border}`,
                        background: rsvp.attending === val ? colors.accent : colors.bgAlt,
                        color: rsvp.attending === val ? "#fff" : colors.muted,
                        fontFamily: bodyFont, fontSize: "0.8rem",
                        cursor: "pointer", borderRadius: "2px", transition: "all 0.2s",
                      }}>
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {rsvp.attending === "yes" && (<>
                {/* Plus one */}
                <div>
                  <label style={{ display: "block", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: colors.muted, marginBottom: "0.75rem" }}>
                    Придёте с сопровождающим?
                  </label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                    {[["yes", "Да, с парой"], ["no", "Приду один(а)"]].map(([val, label]) => (
                      <button key={val} type="button"
                        onClick={() => setRsvp(p => ({ ...p, plusOne: val }))}
                        style={{
                          padding: "0.75rem",
                          border: `1px solid ${rsvp.plusOne === val ? colors.accent : colors.border}`,
                          background: rsvp.plusOne === val ? colors.accent : colors.bgAlt,
                          color: rsvp.plusOne === val ? "#fff" : colors.muted,
                          fontFamily: bodyFont, fontSize: "0.8rem",
                          cursor: "pointer", borderRadius: "2px", transition: "all 0.2s",
                        }}>
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {rsvp.plusOne === "yes" && (
                  <div>
                    <label style={{ display: "block", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: colors.muted, marginBottom: "0.5rem" }}>
                      Имя сопровождающего
                    </label>
                    <input
                      style={{
                        width: "100%", border: `1px solid ${colors.border}`, borderRadius: "2px",
                        padding: "0.75rem 1rem", fontFamily: bodyFont, fontSize: "0.9375rem",
                        color: colors.dark, background: colors.bgAlt, outline: "none",
                      }}
                      placeholder="Имя вашего гостя" value={rsvp.plusOneName}
                      onChange={e => setRsvp(p => ({ ...p, plusOneName: e.target.value }))} />
                  </div>
                )}
              </>)}

              {/* Food */}
              <div>
                <label style={{ display: "block", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: colors.muted, marginBottom: "0.75rem" }}>
                  Предпочтения в еде
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                  {[["meat", "🥩 Мясо"], ["fish", "🐟 Рыба"]].map(([val, label]) => (
                    <button key={val} type="button"
                      onClick={() => setRsvp(p => ({ ...p, food: val }))}
                      style={{
                        padding: "0.75rem",
                        border: `1px solid ${rsvp.food === val ? colors.accent : colors.border}`,
                        background: rsvp.food === val ? colors.accent : colors.bgAlt,
                        color: rsvp.food === val ? "#fff" : colors.muted,
                        fontFamily: bodyFont, fontSize: "0.85rem",
                        cursor: "pointer", borderRadius: "2px", transition: "all 0.2s",
                      }}>
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Drinks */}
              <div>
                <label style={{ display: "block", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: colors.muted, marginBottom: "0.75rem" }}>
                  Предпочтения в напитках
                </label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {drinks.map(drink => (
                    <button key={drink} type="button" onClick={() => toggleDrink(drink)}
                      style={{
                        padding: "0.4rem 1rem",
                        border: `1px solid ${rsvp.drinks.includes(drink) ? colors.accent : colors.border}`,
                        background: rsvp.drinks.includes(drink) ? colors.accent : colors.bgAlt,
                        color: rsvp.drinks.includes(drink) ? "#fff" : colors.muted,
                        fontFamily: bodyFont, fontSize: "0.75rem",
                        cursor: "pointer", borderRadius: "2px", transition: "all 0.2s",
                      }}>
                      {drink}
                    </button>
                  ))}
                </div>
              </div>

              <button type="submit" style={{
                background: colors.accent, color: "#fff", border: "none",
                borderRadius: "2px", padding: "0.9rem 2.5rem",
                fontFamily: bodyFont, fontSize: "0.65rem",
                letterSpacing: "0.25em", textTransform: "uppercase",
                cursor: "pointer", width: "100%",
                opacity: sending ? 0.6 : 1,
              }} disabled={sending}>
                {sending ? 'Отправляем...' : 'Отправить ответ'}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        borderTop: `1px solid ${colors.border}`,
        padding: "4rem 1.5rem", textAlign: "center",
        background: colors.dark,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", justifyContent: "center", marginBottom: "1.5rem" }}>
          <div style={{ width: "40px", height: "1px", background: "rgba(255,255,255,0.2)" }} />
          <span style={{ fontSize: "1rem", opacity: 0.5 }}>💍</span>
          <div style={{ width: "40px", height: "1px", background: "rgba(255,255,255,0.2)" }} />
        </div>
        <p style={{ fontFamily: headingFont, fontSize: "2.25rem", fontWeight: 400, color: "#fff", fontStyle: "italic" }}>
          Артём &amp; Татьяна
        </p>
        <p style={{ fontSize: "0.6rem", letterSpacing: "0.4em", textTransform: "uppercase", color: colors.accentLight, marginTop: "0.75rem" }}>
          27 · 06 · 2026
        </p>
        <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.3)", marginTop: "2rem" }}>
          По вопросам: +7 (900) 000-00-00
        </p>
      </footer>
    </div>
  );
}
