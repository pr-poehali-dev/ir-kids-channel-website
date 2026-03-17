import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

type Page = "home" | "live" | "schedule";

const SCHEDULE = [
  { time: "07:00", title: "Маша и Медведь", duration: 30, category: "мультфильм" },
  { time: "07:30", title: "Фиксики", duration: 25, category: "мультфильм" },
  { time: "07:55", title: "Смешарики", duration: 25, category: "мультфильм" },
  { time: "08:20", title: "Мультяшки с утра", duration: 40, category: "блок" },
  { time: "09:00", title: "Простоквашино", duration: 30, category: "мультфильм" },
  { time: "09:30", title: "Ну, погоди!", duration: 30, category: "мультфильм" },
  { time: "10:00", title: "Лунтик", duration: 25, category: "мультфильм" },
  { time: "10:25", title: "Три кота", duration: 25, category: "мультфильм" },
  { time: "10:50", title: "Барбоскины", duration: 25, category: "мультфильм" },
  { time: "11:15", title: "Тайна третьей планеты", duration: 65, category: "фильм" },
  { time: "12:20", title: "Обед с мультяшками", duration: 60, category: "блок" },
  { time: "13:20", title: "Котопёс", duration: 25, category: "мультфильм" },
  { time: "13:45", title: "Следствие ведут Колобки", duration: 25, category: "мультфильм" },
  { time: "14:10", title: "Чебурашка", duration: 25, category: "мультфильм" },
  { time: "14:35", title: "Малыш и Карлсон", duration: 55, category: "фильм" },
  { time: "15:30", title: "Тили-тили-тесто", duration: 30, category: "мультфильм" },
  { time: "16:00", title: "Вечерний мультпарад", duration: 90, category: "блок" },
  { time: "17:30", title: "Незнайка на Луне", duration: 45, category: "мультфильм" },
  { time: "18:15", title: "Дядя Фёдор", duration: 30, category: "мультфильм" },
  { time: "18:45", title: "Золотая антилопа", duration: 40, category: "фильм" },
  { time: "19:25", title: "Добрый вечер с Иром", duration: 35, category: "блок" },
  { time: "20:00", title: "Сказки на ночь", duration: 60, category: "блок" },
  { time: "21:00", title: "Ночные сказки", duration: 60, category: "блок" },
];

function getCurrentShowIndex(): number {
  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  for (let i = SCHEDULE.length - 1; i >= 0; i--) {
    const [h, m] = SCHEDULE[i].time.split(":").map(Number);
    if (nowMinutes >= h * 60 + m) return i;
  }
  return 0;
}

const categoryColors: Record<string, string> = {
  "мультфильм": "bg-ir-blue text-white",
  "блок": "bg-ir-purple text-white",
  "фильм": "bg-ir-orange text-white",
};

const FloatingDecor = () => (
  <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
    <div className="absolute top-16 left-8 text-4xl animate-float opacity-60">⭐</div>
    <div className="absolute top-32 right-16 text-3xl animate-float-slow opacity-50" style={{animationDelay:'1s'}}>🌟</div>
    <div className="absolute top-64 left-4 text-2xl animate-cloud-drift opacity-40">☁️</div>
    <div className="absolute bottom-40 right-8 text-3xl animate-float opacity-50" style={{animationDelay:'2s'}}>✨</div>
    <div className="absolute bottom-20 left-12 text-2xl animate-wiggle opacity-40" style={{animationDelay:'0.5s'}}>🌈</div>
    <div className="absolute top-1/2 right-4 text-xl animate-float-slow opacity-30" style={{animationDelay:'1.5s'}}>💫</div>
    <div className="absolute top-20 left-1/2 text-2xl animate-star-spin opacity-20">⭐</div>
  </div>
);

function LiveClock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const pad = (n: number) => n.toString().padStart(2, "0");
  return (
    <div className="flex items-center gap-2 bg-white/80 backdrop-blur rounded-2xl px-4 py-2 shadow-md border-2 border-ir-yellow">
      <span className="text-xl">🕐</span>
      <span className="font-baloo font-bold text-xl text-ir-purple">
        {pad(time.getHours())}:{pad(time.getMinutes())}:{pad(time.getSeconds())}
      </span>
    </div>
  );
}

function Header({ page, setPage }: { page: Page; setPage: (p: Page) => void }) {
  return (
    <header className="relative z-10 bg-white/90 backdrop-blur-sm shadow-md border-b-4 border-ir-yellow sticky top-0">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4 flex-wrap">
        <button onClick={() => setPage("home")} className="flex items-center gap-3 group">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-ir-pink to-ir-purple flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
            <span className="text-2xl">📺</span>
          </div>
          <div>
            <div className="font-baloo text-2xl font-extrabold leading-none" style={{color:'var(--ir-pink)'}}>Ир</div>
            <div className="text-xs font-nunito font-bold text-ir-purple leading-none">детский канал</div>
          </div>
        </button>

        <nav className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setPage("home")}
            className={`nav-btn text-sm ${page === "home" ? "bg-ir-pink text-white active" : "bg-ir-pink/10 text-ir-pink hover:bg-ir-pink/20"}`}
          >
            🏠 Главная
          </button>
          <button
            onClick={() => setPage("live")}
            className={`nav-btn text-sm ${page === "live" ? "bg-ir-blue text-white active" : "bg-ir-blue/10 text-ir-blue hover:bg-ir-blue/20"}`}
          >
            📡 Трансляция
          </button>
          <button
            onClick={() => setPage("schedule")}
            className={`nav-btn text-sm ${page === "schedule" ? "bg-ir-purple text-white active" : "bg-ir-purple/10 text-ir-purple hover:bg-ir-purple/20"}`}
          >
            📋 Программа
          </button>
        </nav>

        <LiveClock />
      </div>
    </header>
  );
}

function Ticker() {
  const currentIdx = getCurrentShowIndex();
  const shows = SCHEDULE.slice(currentIdx, currentIdx + 6);
  return (
    <div className="bg-gradient-to-r from-ir-pink to-ir-purple text-white py-2 overflow-hidden relative z-10">
      <div className="flex items-center">
        <div className="flex-shrink-0 bg-white/20 px-4 py-0.5 font-baloo font-bold text-sm mr-4 rounded-r-full">
          СЕЙЧАС В ЭФИРЕ
        </div>
        <div className="overflow-hidden flex-1">
          <div className="animate-ticker whitespace-nowrap font-nunito font-semibold text-sm">
            {shows.map((s, i) => (
              <span key={i} className="mr-12">🎬 {s.time} — {s.title}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function HomePage({ setPage }: { setPage: (p: Page) => void }) {
  const currentIdx = getCurrentShowIndex();
  const current = SCHEDULE[currentIdx];
  const next = SCHEDULE[currentIdx + 1];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 relative z-10">
      {/* Hero */}
      <div className="relative rounded-3xl overflow-hidden mb-8 shadow-xl border-4 border-ir-yellow">
        <img
          src="https://cdn.poehali.dev/projects/febd10f1-af71-4826-8fe5-484204f7a2ab/files/c4718eec-43bb-414e-ab95-9dea64f34995.jpg"
          alt="Телеканал Ир"
          className="w-full h-72 md:h-96 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ir-purple/80 via-ir-pink/50 to-transparent flex items-center p-8">
          <div>
            <div className="inline-block bg-ir-yellow text-ir-purple font-baloo font-extrabold text-sm px-4 py-1 rounded-full mb-3 animate-bounce-in">
              ✨ Добро пожаловать!
            </div>
            <h1 className="font-baloo font-extrabold text-4xl md:text-6xl text-white leading-tight mb-3">
              Телеканал<br/>
              <span className="text-ir-yellow drop-shadow-lg">Ир</span>
            </h1>
            <p className="text-white/90 font-nunito font-semibold text-lg mb-5">
              Добрые российские мультики для детей 🌈
            </p>
            <button
              onClick={() => setPage("live")}
              className="bg-ir-pink hover:bg-pink-600 text-white font-baloo font-bold text-lg px-8 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all"
            >
              ▶ Смотреть сейчас
            </button>
          </div>
        </div>
        <div className="absolute top-4 right-4 bg-red-500 text-white font-baloo font-bold text-sm px-3 py-1.5 rounded-full animate-live-pulse flex items-center gap-2">
          <span className="w-2 h-2 bg-white rounded-full inline-block"></span>
          ПРЯМОЙ ЭФИР
        </div>
      </div>

      {/* Now & Next */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <div className="cartoon-card bg-gradient-to-br from-ir-pink/10 to-white p-6 border-2 border-ir-pink/30">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-ir-pink text-white text-xs font-bold px-3 py-1 rounded-full">▶ СЕЙЧАС</span>
            <span className="text-ir-pink font-baloo font-bold text-lg">{current.time}</span>
          </div>
          <h3 className="font-baloo font-extrabold text-2xl text-foreground mb-1">{current.title}</h3>
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${categoryColors[current.category] || 'bg-gray-200'}`}>
            {current.category}
          </span>
        </div>

        <div className="cartoon-card bg-gradient-to-br from-ir-blue/10 to-white p-6 border-2 border-ir-blue/30">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-ir-blue text-white text-xs font-bold px-3 py-1 rounded-full">⏭ ДАЛЕЕ</span>
            {next && <span className="text-ir-blue font-baloo font-bold text-lg">{next.time}</span>}
          </div>
          {next ? (
            <>
              <h3 className="font-baloo font-extrabold text-2xl text-foreground mb-1">{next.title}</h3>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${categoryColors[next.category] || 'bg-gray-200'}`}>
                {next.category}
              </span>
            </>
          ) : (
            <p className="text-muted-foreground font-nunito">Конец эфира на сегодня</p>
          )}
        </div>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {[
          { icon: "📺", color: "bg-ir-pink", title: "Прямой эфир", desc: "Смотри телеканал Ир онлайн в любое время", action: () => setPage("live"), label: "Смотреть", btnColor: "bg-ir-pink" },
          { icon: "📋", color: "bg-ir-purple", title: "Программа передач", desc: "Полное расписание на сегодня — ни одного мультика не пропустишь!", action: () => setPage("schedule"), label: "Расписание", btnColor: "bg-ir-purple" },
          { icon: "🌟", color: "bg-ir-yellow", title: "Любимые герои", desc: "Маша, Чебурашка, Лунтик и другие добрые персонажи ждут тебя!", action: () => {}, label: "Подробнее", btnColor: "bg-ir-orange" },
        ].map((item, i) => (
          <div key={i} className="cartoon-card bg-white p-6 text-center border-2 border-gray-100">
            <div className={`${item.color} w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 shadow-md`}>
              {item.icon}
            </div>
            <h3 className="font-baloo font-extrabold text-xl text-foreground mb-2">{item.title}</h3>
            <p className="text-muted-foreground font-nunito text-sm mb-4">{item.desc}</p>
            <button
              onClick={item.action}
              className={`${item.btnColor} text-white font-baloo font-bold text-sm px-5 py-2 rounded-xl hover:opacity-90 hover:scale-105 transition-all`}
            >
              {item.label}
            </button>
          </div>
        ))}
      </div>

      {/* Schedule preview */}
      <div className="cartoon-card bg-white p-6 border-2 border-ir-purple/20">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-baloo font-extrabold text-2xl text-ir-purple">📅 Программа на сегодня</h2>
          <button onClick={() => setPage("schedule")} className="text-ir-pink font-nunito font-bold text-sm hover:underline flex items-center gap-1">
            Вся программа <Icon name="ArrowRight" size={14} />
          </button>
        </div>
        <div className="space-y-2">
          {SCHEDULE.slice(currentIdx, currentIdx + 5).map((item, i) => (
            <div key={i} className={`flex items-center gap-3 p-3 rounded-xl ${i === 0 ? 'bg-ir-pink/10 border-2 border-ir-pink/30' : 'hover:bg-gray-50'}`}>
              <span className={`font-baloo font-bold text-sm w-14 ${i === 0 ? 'text-ir-pink' : 'text-muted-foreground'}`}>{item.time}</span>
              {i === 0 && <span className="w-2 h-2 bg-ir-pink rounded-full animate-pulse flex-shrink-0"></span>}
              <span className={`font-nunito font-semibold flex-1 ${i === 0 ? 'text-foreground font-bold' : 'text-foreground'}`}>{item.title}</span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${categoryColors[item.category] || 'bg-gray-200'}`}>{item.category}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LivePage() {
  const currentIdx = getCurrentShowIndex();
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 relative z-10">
      <div className="text-center mb-6">
        <h1 className="font-baloo font-extrabold text-4xl text-ir-pink mb-2">📡 Прямая трансляция</h1>
        <p className="font-nunito text-muted-foreground text-lg">Смотри телеканал Карусель в прямом эфире</p>
      </div>

      <div className="cartoon-card overflow-hidden mb-6 border-4 border-ir-yellow shadow-2xl bg-black">
        <div className="relative" style={{paddingTop: '56.25%'}}>
          <iframe
            src="https://smotrim.ru/embed/channel/70"
            className="absolute inset-0 w-full h-full"
            allow="autoplay; fullscreen"
            allowFullScreen
            title="Карусель — прямой эфир"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="cartoon-card bg-white p-5 border-2 border-ir-pink/20 text-center">
          <div className="text-3xl mb-2">🎬</div>
          <p className="font-baloo font-extrabold text-ir-pink text-lg">В эфире</p>
          <p className="font-nunito font-semibold text-foreground text-sm">{SCHEDULE[currentIdx].title}</p>
        </div>
        <div className="cartoon-card bg-white p-5 border-2 border-ir-blue/20 text-center">
          <div className="text-3xl mb-2">🌟</div>
          <p className="font-baloo font-extrabold text-ir-blue text-lg">Качество</p>
          <p className="font-nunito font-semibold text-foreground text-sm">HD 720p</p>
        </div>
        <div className="cartoon-card bg-white p-5 border-2 border-ir-green/20 text-center">
          <div className="text-3xl mb-2">🔊</div>
          <p className="font-baloo font-extrabold text-ir-green text-lg">Звук</p>
          <p className="font-nunito font-semibold text-foreground text-sm">Стерео</p>
        </div>
      </div>
    </div>
  );
}

function SchedulePage() {
  const currentIdx = getCurrentShowIndex();
  const [filter, setFilter] = useState<string>("все");

  const categories = ["все", "мультфильм", "фильм", "блок"];
  const filtered = filter === "все" ? SCHEDULE : SCHEDULE.filter(s => s.category === filter);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 relative z-10">
      <div className="text-center mb-6">
        <h1 className="font-baloo font-extrabold text-4xl text-ir-purple mb-2">📋 Программа передач</h1>
        <p className="font-nunito text-muted-foreground">
          Расписание на сегодня, {new Date().toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' })}
        </p>
      </div>

      <div className="flex gap-2 flex-wrap justify-center mb-6">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`nav-btn text-sm capitalize ${filter === cat ? 'bg-ir-purple text-white active' : 'bg-ir-purple/10 text-ir-purple hover:bg-ir-purple/20'}`}
          >
            {cat === "все" ? "🎭 Все" : cat === "мультфильм" ? "🎨 Мультфильмы" : cat === "фильм" ? "🎬 Фильмы" : "🎪 Блоки"}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map((item, i) => {
          const realIdx = SCHEDULE.indexOf(item);
          const isCurrent = realIdx === currentIdx;
          const isPast = realIdx < currentIdx;
          return (
            <div
              key={i}
              className={`flex items-center gap-3 p-4 rounded-2xl transition-all border-2 ${
                isCurrent
                  ? 'bg-gradient-to-r from-ir-pink/15 to-ir-purple/10 border-ir-pink shadow-md'
                  : isPast
                  ? 'bg-gray-50 border-transparent opacity-60'
                  : 'bg-white border-transparent hover:border-ir-yellow/50 hover:bg-ir-yellow/5'
              }`}
            >
              {isCurrent && (
                <span className="w-3 h-3 bg-ir-pink rounded-full animate-pulse flex-shrink-0"></span>
              )}
              <span className={`font-baloo font-bold text-base w-14 flex-shrink-0 ${isCurrent ? 'text-ir-pink' : isPast ? 'text-gray-400' : 'text-ir-purple'}`}>
                {item.time}
              </span>
              <div className="flex-1 min-w-0">
                <p className={`font-nunito font-bold truncate ${isCurrent ? 'text-foreground text-lg' : isPast ? 'text-gray-400' : 'text-foreground'}`}>
                  {item.title}
                </p>
                {isCurrent && <p className="text-ir-pink text-xs font-semibold font-nunito mt-0.5">Идёт сейчас</p>}
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-muted-foreground font-nunito text-xs">{item.duration} мин</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${categoryColors[item.category] || 'bg-gray-200'}`}>
                  {item.category}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="relative z-10 mt-16 bg-gradient-to-r from-ir-purple to-ir-pink text-white">
      <div className="max-w-6xl mx-auto px-4 py-8 text-center">
        <div className="text-4xl mb-3">📺</div>
        <h3 className="font-baloo font-extrabold text-2xl mb-1">Телеканал Ир</h3>
        <p className="font-nunito text-white/80 text-sm mb-4">Добрые российские мультфильмы для детей</p>
        <div className="flex justify-center gap-4 text-white/60 font-nunito text-sm">
          <span>© 2024 Телеканал Ир</span>
          <span>•</span>
          <span>Все права защищены</span>
        </div>
      </div>
    </footer>
  );
}

export default function Index() {
  const [page, setPage] = useState<Page>("home");

  return (
    <div className="min-h-screen bg-background stars-bg font-nunito">
      <FloatingDecor />
      <Header page={page} setPage={setPage} />
      <Ticker />
      <main>
        {page === "home" && <HomePage setPage={setPage} />}
        {page === "live" && <LivePage />}
        {page === "schedule" && <SchedulePage />}
      </main>
      <Footer />
    </div>
  );
}