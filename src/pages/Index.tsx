import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const WEDDING_DATE = new Date("2026-06-27T14:00:00");
const COUPLE_IMAGE = "https://cdn.poehali.dev/projects/f53dbfb7-d727-42fe-9729-e895784092b3/files/9283ecf9-da07-46a6-80cc-60d82ada7f11.jpg";

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

const Petal = ({ style }: { style: React.CSSProperties }) => (
  <div className="petal" style={style}>🌸</div>
);

const FloralDivider = () => (
  <div className="flex items-center gap-3 my-8 max-w-xs mx-auto">
    <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, var(--gold))" }} />
    <span style={{ color: "var(--rose)", fontSize: "1.25rem" }}>❀</span>
    <div className="flex-1 h-px" style={{ background: "linear-gradient(to left, transparent, var(--gold))" }} />
  </div>
);

const SectionTitle = ({ pre, title }: { pre: string; title: string }) => (
  <div className="text-center mb-12">
    <p className="section-subtitle">{pre}</p>
    <h2 className="section-title">{title}</h2>
    <FloralDivider />
  </div>
);

export default function Index() {
  const countdown = useCountdown(WEDDING_DATE);
  const [rsvp, setRsvp] = useState({
    name: "", attending: "", plusOne: "", plusOneName: "", drinks: [] as string[], notes: ""
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

  const petals = Array.from({ length: 8 }, (_, i) => ({
    left: `${10 + i * 12}%`,
    animationDuration: `${8 + i * 1.5}s`,
    animationDelay: `${i * 1.2}s`,
    fontSize: `${0.8 + (i % 3) * 0.3}rem`,
  }));

  const drinks = ["Красное вино", "Белое вино", "Шампанское", "Виски", "Коктейли", "Безалкогольное"];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--cream)", fontFamily: "'Raleway', sans-serif" }}>
      {/* Falling petals */}
      {petals.map((s, i) => <Petal key={i} style={s} />)}

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center gap-6 py-4 text-xs tracking-widest uppercase"
        style={{ background: "rgba(253,248,243,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(201,169,110,0.15)", color: "var(--rose)" }}>
        {[["Детали", "#details"], ["Фото", "#photos"], ["Дресс-код", "#dresscode"], ["RSVP", "#rsvp"]].map(([label, href]) => (
          <a key={href} href={href} className="hover:opacity-60 transition-opacity hidden sm:inline">{label}</a>
        ))}
        <a href="#rsvp" className="sm:hidden btn-wedding py-1 px-4 text-xs">RSVP</a>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full opacity-20 blur-3xl"
            style={{ background: "radial-gradient(circle, var(--blush), transparent)" }} />
          <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full opacity-20 blur-3xl"
            style={{ background: "radial-gradient(circle, var(--blush), transparent)" }} />
        </div>

        <p className="section-subtitle animate-fade-in" style={{ animationDelay: "0.2s", opacity: 0 }}>
          приглашают вас на свадьбу
        </p>

        <h1 className="font-cormorant animate-fade-in-up animate-delay-400"
          style={{ fontSize: "clamp(3.5rem, 12vw, 8rem)", fontWeight: 300, color: "var(--deep)", lineHeight: 1.05, letterSpacing: "0.02em", opacity: 0 }}>
          Артём<br />
          <span style={{ color: "var(--rose)", fontStyle: "italic" }}>&amp;</span><br />
          Татьяна
        </h1>

        <p className="font-cormorant animate-fade-in animate-delay-600 mt-4"
          style={{ fontSize: "1.5rem", color: "var(--gold)", fontStyle: "italic", opacity: 0 }}>
          27 июня 2026
        </p>

        {/* Countdown */}
        <div className="flex gap-6 sm:gap-10 mt-10 animate-fade-in animate-delay-800" style={{ opacity: 0 }}>
          {[
            { val: countdown.days, label: "дней" },
            { val: countdown.hours, label: "часов" },
            { val: countdown.minutes, label: "минут" },
            { val: countdown.seconds, label: "секунд" },
          ].map(({ val, label }) => (
            <div key={label} className="text-center">
              <div className="font-cormorant" style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)", color: "var(--deep)", fontWeight: 300, lineHeight: 1 }}>
                {String(val).padStart(2, "0")}
              </div>
              <div style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--rose)", marginTop: "0.25rem" }}>
                {label}
              </div>
            </div>
          ))}
        </div>

        <a href="#rsvp" className="btn-wedding mt-12 inline-block animate-fade-in animate-delay-800" style={{ opacity: 0 }}>
          Подтвердить присутствие
        </a>

        <div className="absolute bottom-8 animate-float" style={{ color: "var(--rose)", opacity: 0.5 }}>
          <Icon name="ChevronDown" size={28} />
        </div>
      </section>

      {/* ── COUPLE PHOTO ── */}
      <section id="photos" className="wedding-section">
        <SectionTitle pre="фотография" title="Молодожёны" />
        <div className="max-w-2xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl animate-fade-in-up"
            style={{ border: "6px solid white", boxShadow: "0 20px 60px rgba(74,46,53,0.15)" }}>
            <img src={COUPLE_IMAGE} alt="Артём и Татьяна" className="w-full object-cover" style={{ maxHeight: "600px" }} />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-center"
              style={{ background: "linear-gradient(to top, rgba(74,46,53,0.7), transparent)" }}>
              <p className="font-cormorant text-white" style={{ fontSize: "2rem", fontWeight: 300, fontStyle: "italic" }}>
                Артём &amp; Татьяна
              </p>
              <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.8rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                27 июня 2026
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── EVENT DETAILS ── */}
      <section id="details" className="wedding-section" style={{ backgroundColor: "rgba(242,212,215,0.15)" }}>
        <SectionTitle pre="всё что нужно знать" title="Детали события" />
        <div className="max-w-4xl mx-auto grid sm:grid-cols-3 gap-6">
          {[
            { icon: "Calendar", label: "Дата", value: "27 июня 2026", sub: "Суббота" },
            { icon: "Clock", label: "Время", value: "14:00 / 15:00", sub: "Сбор гостей · Церемония в 15:00" },
            { icon: "MapPin", label: "Место", value: "Шатёр Бриз · Солнечный Берег", sub: "Московская область, г.о. Мытищи" },
          ].map(({ icon, label, value, sub }) => (
            <div key={label} className="wedding-card text-center">
              <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, var(--blush), white)" }}>
                <Icon name={icon} size={22} style={{ color: "var(--rose)" }} />
              </div>
              <p style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "0.5rem" }}>{label}</p>
              <p className="font-cormorant" style={{ fontSize: "1.4rem", color: "var(--deep)", fontWeight: 400 }}>{value}</p>
              <p style={{ fontSize: "0.85rem", color: "var(--rose)", marginTop: "0.25rem" }}>{sub}</p>
            </div>
          ))}
        </div>

        {/* Map link */}
        <div className="text-center mt-8">
          <a
            href="https://yandex.ru/maps/org/solnechny_bereg/74953171641?si=xnm3y2na3jdtrk0q2167npj274"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-wedding inline-flex items-center gap-2"
          >
            <Icon name="Navigation" size={16} />
            Открыть маршрут на карте
          </a>
        </div>
      </section>

      {/* ── DRESS CODE ── */}
      <section id="dresscode" className="wedding-section">
        <SectionTitle pre="стиль вечера" title="Дресс-код" />
        <div className="max-w-3xl mx-auto">
          <div className="wedding-card text-center mb-8">
            <div className="text-5xl mb-4">🎀</div>
            <h3 className="font-cormorant mb-2" style={{ fontSize: "2rem", color: "var(--deep)", fontWeight: 300 }}>
              Нежные пастельные тона
            </h3>
            <p style={{ color: "var(--rose)", fontSize: "0.875rem", letterSpacing: "0.1em" }}>
              Элегантный дресс-код — Formal / Black Tie Optional
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="wedding-card">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">👗</span>
                <h4 className="font-cormorant" style={{ fontSize: "1.4rem", color: "var(--deep)" }}>Для неё</h4>
              </div>
              <ul className="space-y-2" style={{ color: "var(--deep)", fontSize: "0.9rem", lineHeight: 1.8 }}>
                <li>✦ Вечернее или коктейльное платье</li>
                <li>✦ Пастельные оттенки: пудровый, мятный, лавандовый</li>
                <li>✦ Элегантные туфли или босоножки</li>
                <li style={{ color: "var(--rose)" }}>✗ Избегайте белого и айвори</li>
              </ul>
            </div>
            <div className="wedding-card">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">🤵</span>
                <h4 className="font-cormorant" style={{ fontSize: "1.4rem", color: "var(--deep)" }}>Для него</h4>
              </div>
              <ul className="space-y-2" style={{ color: "var(--deep)", fontSize: "0.9rem", lineHeight: 1.8 }}>
                <li>✦ Классический костюм или смокинг</li>
                <li>✦ Светлые или нейтральные тона</li>
                <li>✦ Галстук или галстук-бабочка</li>
                <li>✦ Классические туфли</li>
              </ul>
            </div>
          </div>

          <div className="wedding-card mt-6 text-center" style={{ background: "rgba(242,212,215,0.3)" }}>
            <p className="font-cormorant" style={{ fontSize: "1.1rem", color: "var(--deep)", fontStyle: "italic" }}>
              💡 Рекомендуем дамам выбирать каблук не выше 5 см — церемония проходит на открытом воздухе с газоном
            </p>
          </div>
        </div>
      </section>

      {/* ── RSVP ── */}
      <section id="rsvp" className="wedding-section" style={{ backgroundColor: "rgba(242,212,215,0.15)" }}>
        <SectionTitle pre="подтверждение" title="Форма RSVP" />
        <div className="max-w-xl mx-auto">
          {submitted ? (
            <div className="wedding-card text-center py-16 animate-fade-in">
              <div className="text-6xl mb-4">🌸</div>
              <h3 className="font-cormorant mb-2" style={{ fontSize: "2rem", color: "var(--deep)" }}>Спасибо!</h3>
              <p style={{ color: "var(--rose)" }}>Мы с нетерпением ждём встречи с вами на нашем празднике</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="wedding-card space-y-5">
              {/* Name */}
              <div>
                <label className="block mb-2" style={{ fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--rose)" }}>
                  Ваше имя *
                </label>
                <input
                  className="wedding-input"
                  placeholder="Имя и фамилия"
                  required
                  value={rsvp.name}
                  onChange={e => setRsvp(p => ({ ...p, name: e.target.value }))}
                />
              </div>

              {/* Attending */}
              <div>
                <label className="block mb-3" style={{ fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--rose)" }}>
                  Смогу присутствовать? *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[["yes", "🥂 Да, буду!"], ["no", "😔 К сожалению, нет"]].map(([val, label]) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setRsvp(p => ({ ...p, attending: val }))}
                      className="py-3 px-4 rounded-xl text-sm transition-all"
                      style={{
                        border: "1.5px solid",
                        borderColor: rsvp.attending === val ? "var(--rose)" : "rgba(201,169,110,0.3)",
                        background: rsvp.attending === val ? "var(--rose)" : "transparent",
                        color: rsvp.attending === val ? "white" : "var(--deep)",
                        fontFamily: "'Raleway', sans-serif",
                        cursor: "pointer",
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {rsvp.attending === "yes" && (
                <>
                  {/* Plus one */}
                  <div>
                    <label className="block mb-3" style={{ fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--rose)" }}>
                      Придёте с сопровождающим?
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {[["yes", "Да, с парой"], ["no", "Приду один(а)"]].map(([val, label]) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setRsvp(p => ({ ...p, plusOne: val }))}
                          className="py-3 px-4 rounded-xl text-sm transition-all"
                          style={{
                            border: "1.5px solid",
                            borderColor: rsvp.plusOne === val ? "var(--rose)" : "rgba(201,169,110,0.3)",
                            background: rsvp.plusOne === val ? "var(--rose)" : "transparent",
                            color: rsvp.plusOne === val ? "white" : "var(--deep)",
                            fontFamily: "'Raleway', sans-serif",
                            cursor: "pointer",
                          }}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {rsvp.plusOne === "yes" && (
                    <div>
                      <label className="block mb-2" style={{ fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--rose)" }}>
                        Имя сопровождающего
                      </label>
                      <input
                        className="wedding-input"
                        placeholder="Имя вашего гостя"
                        value={rsvp.plusOneName}
                        onChange={e => setRsvp(p => ({ ...p, plusOneName: e.target.value }))}
                      />
                    </div>
                  )}

                  {/* Drinks */}
                  <div>
                    <label className="block mb-3" style={{ fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--rose)" }}>
                      Предпочтения в напитках
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {drinks.map(drink => (
                        <button
                          key={drink}
                          type="button"
                          onClick={() => toggleDrink(drink)}
                          className="py-2 px-4 rounded-full text-sm transition-all"
                          style={{
                            border: "1.5px solid",
                            borderColor: rsvp.drinks.includes(drink) ? "var(--gold)" : "rgba(201,169,110,0.3)",
                            background: rsvp.drinks.includes(drink) ? "rgba(201,169,110,0.15)" : "transparent",
                            color: rsvp.drinks.includes(drink) ? "var(--gold)" : "var(--deep)",
                            fontFamily: "'Raleway', sans-serif",
                            cursor: "pointer",
                          }}
                        >
                          {drink}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Notes */}
              <div>
                <label className="block mb-2" style={{ fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--rose)" }}>
                  Пожелания и аллергии
                </label>
                <textarea
                  className="wedding-input"
                  placeholder="Диетические предпочтения, аллергии или особые пожелания..."
                  rows={3}
                  style={{ resize: "none" }}
                  value={rsvp.notes}
                  onChange={e => setRsvp(p => ({ ...p, notes: e.target.value }))}
                />
              </div>

              <button type="submit" className="btn-wedding w-full mt-2">
                Отправить ответ
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-16 text-center px-6" style={{ borderTop: "1px solid rgba(201,169,110,0.2)" }}>
        <p className="font-cormorant" style={{ fontSize: "2.5rem", color: "var(--deep)", fontWeight: 300, fontStyle: "italic" }}>
          Артём &amp; Татьяна
        </p>
        <p style={{ color: "var(--gold)", fontSize: "0.8rem", letterSpacing: "0.2em", textTransform: "uppercase", marginTop: "0.5rem" }}>
          27 · 06 · 2026
        </p>
        <div className="mt-6 text-2xl">🌸 💍 🌸</div>
        <p className="mt-6" style={{ fontSize: "0.75rem", color: "var(--rose)", opacity: 0.6 }}>
          По вопросам: +7 (900) 000-00-00
        </p>
      </footer>
    </div>
  );
}