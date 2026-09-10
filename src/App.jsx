import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Link,
  NavLink,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import {
  ArrowRight,
  Asterisk,
  BadgeCheck,
  ChevronRight,
  CircleCheck,
  Clock3,
  Compass,
  HeartHandshake,
  Menu,
  MessageCircle,
  MoveRight,
  Phone,
  Plus,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  X,
} from "lucide-react";

import fund from "./public/Fund.png";

const API_URL = "/api";

const fallbackProstheses = [
  {
    id: 1,
    name: "Active One",
    short_description: "Лёгкий спортивный протез для активного образа жизни.",
    full_description:
      "Active One создан для тех, кто не привык останавливаться. Карбоновая конструкция, естественная амортизация и точная настройка помогают уверенно двигаться в городе, на прогулках и во время тренировок.",
    category: "legs",
    price: null,
    image: null,
  },
  {
    id: 2,
    name: "Neuro Hand",
    short_description: "Функциональный протез кисти с естественным хватом.",
    full_description:
      "Neuro Hand сочетает выразительный дизайн и технологичную механику. Пять режимов хвата и мягкое управление позволяют комфортно выполнять повседневные задачи.",
    category: "arms",
    price: null,
    image: null,
  },
  {
    id: 3,
    name: "Silhouette",
    short_description: "Анатомичная косметическая оболочка на заказ.",
    full_description:
      "Silhouette повторяет индивидуальную форму тела и помогает чувствовать себя уверенно в любой ситуации. Доступны разные оттенки и фактуры поверхности.",
    category: "cosmetic",
    price: null,
    image: null,
  },
  {
    id: 4,
    name: "Urban Step",
    short_description: "Надёжное решение для комфортного движения каждый день.",
    full_description:
      "Urban Step разработан для длительной ходьбы и насыщенного ритма жизни. Стабильная стопа и комфортная посадка уменьшают нагрузку и дарят свободу движения.",
    category: "legs",
    price: null,
    image: null,
  },
  {
    id: 5,
    name: "Precision Grip",
    short_description: "Точный протез предплечья для работы и творчества.",
    full_description:
      "Precision Grip помогает вернуть контроль над привычными действиями. Модульная конструкция адаптируется под разные задачи и легко дополняется аксессуарами.",
    category: "arms",
    price: null,
    image: null,
  },
  {
    id: 6,
    name: "Natural Form",
    short_description: "Деликатная персонализированная эстетика.",
    full_description:
      "Natural Form создаётся по индивидуальным меркам и учитывает особенности вашего тела. Лёгкие материалы и аккуратная детализация делают результат максимально естественным.",
    category: "cosmetic",
    price: null,
    image: null,
  },
];

const benefits = [
  {
    icon: Stethoscope,
    title: "Опыт и точность",
    text: "Подбираем решение на основе ваших задач, образа жизни и медицинских рекомендаций.",
  },
  {
    icon: HeartHandshake,
    title: "Забота рядом",
    text: "Остаёмся на связи после выдачи, чтобы вы быстро привыкли к новому ритму.",
  },
  {
    icon: Sparkles,
    title: "Современные материалы",
    text: "Работаем с надёжными технологиями, которые делают движение естественнее.",
  },
  {
    icon: ShieldCheck,
    title: "Гарантия уверенности",
    text: "Прозрачный процесс, понятные сроки и внимание к каждой детали.",
  },
];

function getCategoryLabel(category) {
  return (
    { legs: "Протезы ног", arms: "Протезы рук", cosmetic: "Косметические" }[
      category
    ] || "Протез"
  );
}

function App() {
  return (
    <BrowserRouter>
      <Site />
    </BrowserRouter>
  );
}

function Site() {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <div className="min-h-screen bg-[#f5f6f5] text-[#2d2d2d]">
      <header className="fixed inset-x-0 top-0 z-40 border-b border-black/[0.06] bg-[#f5f6f5]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-[1240px] items-center justify-between px-5 lg:px-8">
          <Link
            to="/"
            className="group flex items-center gap-3"
            onClick={() => setMobileOpen(false)}
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-[#5cedb8] text-[#174b3d] transition-transform group-hover:rotate-6">
              <Asterisk size={23} strokeWidth={2.8} />
            </span>
            <span className="text-[17px] font-bold tracking-[-0.03em]">
              Робо-решения<span className="text-[#43c99d]">.</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-8 md:flex">
            <NavItem to="/">Главная</NavItem>
            <NavItem to="/catalog">Каталог</NavItem>
            <NavItem to="/about">О компании</NavItem>
            <NavItem to="/contacts">Контакты</NavItem>
          </nav>
          <Link
            to="/contacts"
            className="hidden items-center gap-2 rounded-full bg-[#2d2d2d] px-5 py-3 text-[13px] font-semibold text-white transition hover:bg-[#174b3d] sm:flex"
          >
            Оставить заявку <ArrowRight size={15} />
          </Link>
          <button
            className="rounded-xl p-2 md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Меню"
          >
            {mobileOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
        {mobileOpen && (
          <div className="border-t border-black/[0.06] bg-[#f5f6f5] px-5 py-5 md:hidden">
            <div className="flex flex-col gap-5">
              <NavItem to="/" onClick={() => setMobileOpen(false)}>
                Главная
              </NavItem>
              <NavItem to="/catalog" onClick={() => setMobileOpen(false)}>
                Каталог
              </NavItem>
              <NavItem to="/about" onClick={() => setMobileOpen(false)}>
                О компании
              </NavItem>
              <NavItem to="/contacts" onClick={() => setMobileOpen(false)}>
                Контакты
              </NavItem>
              <Link
                to="/contacts"
                onClick={() => setMobileOpen(false)}
                className="flex w-fit items-center gap-2 rounded-full bg-[#2d2d2d] px-5 py-3 text-sm font-semibold text-white"
              >
                Оставить заявку <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        )}
      </header>
      <main className="pt-[76px]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/about" element={<About />} />
          <Route path="/contacts" element={<Contacts />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function NavItem({ to, children, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `text-sm font-medium transition hover:text-[#28a87d] ${isActive ? "text-[#16936b]" : "text-[#6f7572]"}`
      }
    >
      {children}
    </NavLink>
  );
}

function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#e1e8e4]">
        <div className="absolute -right-20 -top-24 h-[480px] w-[480px] rounded-full bg-[#5cedb8]/25 blur-3xl" />
        <div className="mx-auto grid min-h-[660px] max-w-[1240px] items-center gap-12 px-5 py-20 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:py-24">
          <div className="relative z-10 animate-fade-in">
            <div className="mb-7 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#248e6d]">
              <span className="h-2 w-2 rounded-full bg-[#5cedb8]" />{" "}
              Пространство движения
            </div>
            <h1 className="max-w-[670px] text-[clamp(44px,6vw,80px)] font-semibold leading-[.98] tracking-[-0.065em] text-[#25302c]">
              Движение —<br />
              <span className="text-[#36b58b]">это свобода</span>
            </h1>
            <p className="mt-8 max-w-[470px] text-[17px] leading-8 text-[#5b6863]">
              Создаём современные протезы, которые помогают жить активно,
              уверенно и в своём ритме
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/catalog"
                className="flex items-center gap-3 rounded-full bg-[#5cedb8] px-6 py-4 text-sm font-bold text-[#174b3d] shadow-[0_12px_30px_rgba(65,181,142,.18)] transition hover:-translate-y-0.5 hover:bg-[#47dca9]"
              >
                Смотреть каталог <MoveRight size={18} />
              </Link>
              <Link
                to="/about"
                className="flex items-center gap-2 px-2 py-3 text-sm font-semibold text-[#58645f] transition hover:text-[#168c68]"
              >
                Узнать о нас <ChevronRight size={16} />
              </Link>
            </div>
          </div>
          <div className="relative flex min-h-[390px] items-center justify-center lg:min-h-[500px]">
            <div className="absolute h-[320px] w-[320px] rounded-full border border-[#5cedb8]/50 lg:h-[440px] lg:w-[440px]" />
            <div className="absolute h-[255px] w-[255px] rounded-full bg-[#c6d7d0] lg:h-[350px] lg:w-[350px]" />
            <div className="relative flex h-[270px] w-[180px] items-center justify-center rounded-[100px_100px_30px_30px] bg-gradient-to-br from-[#fcfffd] via-[#d7e6df] to-[#91afa2] shadow-[20px_25px_55px_rgba(55,86,74,.22)] lg:h-[395px] lg:w-[265px]">
              <div className="absolute bottom-[-125px] h-[160px] w-[82px] rounded-b-[45px] rounded-t-[15px] bg-gradient-to-br from-[#9db9ac] to-[#56796c] shadow-lg lg:bottom-[-155px] lg:h-[200px] lg:w-[120px]" />
              <div className="absolute left-1/2 top-[18%] h-8 w-[54px] -translate-x-1/2 rounded-full bg-white/50 blur-sm" />
            </div>
            <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/70 bg-white/75 px-4 py-2 text-[11px] font-semibold text-[#4a6258] backdrop-blur">
              Индивидуальный подход{" "}
              <CircleCheck size={14} className="text-[#26ae83]" />
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-[1240px] px-5 py-24 lg:px-8">
        <div className="mb-12 flex flex-col gap-5">
          <div className="sponsor flex items-center gap-6">
            <div>
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[#35ae86]">
                Платформа университетского технологического предпринимательства
              </p>
              <p className="max-w-[300px] text-sm leading-6 text-[#6d7773]">
                Проект реализован при поддержке Фонда содействия инновациям в
                рамках программы "Студентческий стартап" мероприятия "Платформа
                университетского технологического предпринимательства"
                федерального проекта "Технологии"
              </p>
            </div>
            <img
              src={fund}
              alt="Партнёры"
              className="h-28 w-auto flex-shrink-0 rounded-2xl object-contain sm:h-36 lg:h-48"
            />
          </div>
          <div>
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[#35ae86]">
              Наш подход
            </p>
            <h2 className="text-4xl font-semibold tracking-[-.05em] sm:text-5xl">
              Почему Робо-решения<span className="text-[#5cedb8]"></span>
            </h2>
          </div>
          <p className="max-w-[340px] text-sm leading-6 text-[#6d7773]">
            Мы объединяем медицинскую экспертизу, технологичность и человеческое
            отношение
          </p>
        </div>
        <div className="grid gap-px overflow-hidden rounded-3xl bg-[#d8dfdc] md:grid-cols-2 lg:grid-cols-4">
          {benefits.map(({ icon: Icon, title, text }, i) => (
            <div
              key={title}
              className="bg-[#f5f6f5] p-7 transition hover:bg-white"
            >
              <div className="mb-12 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#d8f8eb] text-[#299e79]">
                <Icon size={21} />
              </div>
              <span className="text-[11px] font-bold text-[#9aa49f]">
                0{i + 1}
              </span>
              <h3 className="mt-3 text-lg font-semibold">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#717b77]">{text}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="mx-5 mb-24 overflow-hidden rounded-[28px] bg-[#2d2d2d] lg:mx-auto lg:max-w-[1240px]">
        <div className="grid items-center gap-10 px-7 py-12 sm:px-12 lg:grid-cols-[1fr_auto] lg:px-16 lg:py-16">
          <div>
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-[#5cedb8]">
              Есть вопросы?
            </p>
            <h2 className="max-w-[540px] text-3xl font-semibold leading-tight tracking-[-.04em] text-white sm:text-4xl">
              Давайте найдём решение,
              <br />
              которое подойдёт именно вам
            </h2>
          </div>
          <Link
            to="/contacts"
            className="flex w-fit items-center gap-3 rounded-full bg-[#5cedb8] px-6 py-4 text-sm font-bold text-[#174b3d] transition hover:bg-[#fff]"
          >
            Связаться с нами <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </>
  );
}

function Catalog() {
  const [items, setItems] = useState(fallbackProstheses);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`${API_URL}/prostheses/`)
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => setItems(data.length ? data : fallbackProstheses))
      .catch(() => setItems(fallbackProstheses))
      .finally(() => setLoading(false));
  }, []);
  return (
    <section className="mx-auto max-w-[1240px] px-5 py-16 lg:px-8 lg:py-24">
      <div className="mb-12 max-w-[650px]">
        <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-[#35ae86]">
          Каталог решений
        </p>
        <h1 className="text-5xl font-semibold leading-[1.02] tracking-[-.06em] sm:text-7xl">
          Найдите своё
          <br />
          <span className="text-[#35b88e]">движение</span>
        </h1>
        <p className="mt-6 max-w-[480px] text-base leading-7 text-[#6d7773]">
          Каждый протез создаётся, чтобы стать естественной частью вашей жизни.
          Выберите направление — мы расскажем подробнее.
        </p>
      </div>
      <div className="mb-7 flex items-center justify-between border-b border-[#dce3df] pb-4 text-sm text-[#7b8581]">
        <span>
          {loading
            ? "Загружаем решения…"
            : `${items.length} решений в каталоге`}
        </span>
        <span className="hidden items-center gap-2 sm:flex">
          <span className="h-2 w-2 rounded-full bg-[#5cedb8]" /> Доступна
          консультация
        </span>
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <ProductCard
            key={item.id}
            item={item}
            index={index}
            onClick={() => setSelected(item)}
          />
        ))}
      </div>
      {selected && (
        <ProductModal item={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}

function ProductCard({ item, index, onClick }) {
  return (
    <button
      onClick={onClick}
      className="group text-left animate-fade-in"
      style={{ animationDelay: `${index * 70}ms` }}
    >
      <div className="relative mb-4 flex h-[270px] items-center justify-center overflow-hidden rounded-[24px] bg-[#e2ebe6] transition duration-300 group-hover:scale-[1.015] group-hover:bg-[#d7e8df]">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <ProductVisual category={item.category} />
        )}
        <span className="absolute left-4 top-4 rounded-full bg-white/80 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#5f7069] backdrop-blur">
          {getCategoryLabel(item.category)}
        </span>
        <span className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#2d2d2d] shadow-sm transition group-hover:bg-[#5cedb8] group-hover:text-[#174b3d]">
          <Plus size={18} />
        </span>
      </div>
      <h3 className="text-xl font-semibold tracking-[-.03em]">{item.name}</h3>
      <p className="mt-2 max-w-[300px] text-sm leading-6 text-[#707b76]">
        {item.short_description}
      </p>
    </button>
  );
}

function ProductVisual({ category }) {
  return (
    <div
      className={`relative flex h-full w-full items-center justify-center ${category === "arms" ? "bg-[#dceae4]" : category === "cosmetic" ? "bg-[#e8e1dd]" : "bg-[#e0ebe5]"}`}
    >
      <div
        className={`relative ${category === "arms" ? "h-[170px] w-[100px] rounded-[55px_55px_25px_25px] bg-gradient-to-b from-[#f9fbf9] to-[#849f92]" : category === "cosmetic" ? "h-[185px] w-[110px] rounded-[50%_50%_25px_25px] bg-gradient-to-br from-[#efd5c7] to-[#ad8270]" : "h-[190px] w-[96px] rounded-[50px_50px_20px_20px] bg-gradient-to-br from-[#f5faf6] to-[#719487]"}`}
      >
        <div className="absolute bottom-[-55px] left-1/2 h-[75px] w-12 -translate-x-1/2 rounded-b-2xl bg-gradient-to-b from-[#91aa9e] to-[#526e63]" />
      </div>
    </div>
  );
}

function ProductModal({ item, onClose }) {
  const navigate = useNavigate();
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#15231e]/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-[800px] overflow-y-auto rounded-[28px] bg-[#f5f6f5] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative grid md:grid-cols-[.85fr_1.15fr]">
          <div className="flex min-h-[270px] items-center justify-center bg-[#dfeae5] md:min-h-[500px]">
            {item.image ? (
              <img
                src={item.image}
                alt={item.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <ProductVisual category={item.category} />
            )}
          </div>
          <div className="p-7 sm:p-10">
            <button
              onClick={onClose}
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-[#58635e] transition hover:bg-[#5cedb8]"
            >
              <X size={17} />
            </button>
            <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#30a980]">
              {getCategoryLabel(item.category)}
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-.05em]">
              {item.name}
            </h2>
            <p className="mt-6 text-[15px] leading-7 text-[#68736e]">
              {item.full_description}
            </p>
            {item.price && (
              <p className="mt-7 text-2xl font-semibold">{item.price} ₽</p>
            )}
            <div className="mt-9 border-t border-[#dce3df] pt-7">
              <p className="mb-4 text-xs text-[#76817c]">
                Хотите узнать, подходит ли это решение именно вам?
              </p>
              <button
                onClick={() => {
                  onClose();
                  navigate("/contacts");
                }}
                className="flex w-full items-center justify-center gap-3 rounded-full bg-[#2d2d2d] px-5 py-4 text-sm font-bold text-white transition hover:bg-[#174b3d]"
              >
                Оставить заявку <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function About() {
  return (
    <section className="mx-auto max-w-[1240px] px-5 py-16 lg:px-8 lg:py-24">
      <div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
        <div>
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[.18em] text-[#35ae86]">
            О компании
          </p>
          <h1 className="text-5xl font-semibold leading-[1.02] tracking-[-.06em] sm:text-7xl">
            Человечность
            <br />
            <span className="text-[#35b88e]">в каждом шаге</span>
          </h1>
        </div>
        <p className="max-w-[470px] text-base leading-8 text-[#68746e]">
          Робо-решения — это место, где технологии встречаются с вниманием. Мы
          верим, что хороший протез — не просто медицинское изделие, а
          инструмент для возвращения к любимым делам
        </p>
      </div>
      <div className="mt-16 grid gap-5 md:grid-cols-2">
        <div className="flex min-h-[360px] items-end rounded-[28px] border border-[#d8e1dc] bg-[#e1eae5] p-8">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[.16em] text-[#699181]">
              Наша философия
            </span>
            <p className="mt-4 max-w-[320px] text-2xl font-semibold leading-tight tracking-[-.04em] text-[#395248]">
              Слушать. Понимать. Помогать двигаться дальше.
            </p>
          </div>
        </div>
        <div className="flex min-h-[360px] items-end rounded-[28px] border border-[#d7d7d5] bg-[#e9e8e5] p-8">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[.16em] text-[#938f88]">
              Будущее рядом
            </span>
            <p className="mt-4 max-w-[320px] text-2xl font-semibold leading-tight tracking-[-.04em] text-[#5d5b57]">
              Место для вашей истории и будущих фотографий.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-16 grid gap-5 border-t border-[#dce3df] pt-12 sm:grid-cols-3">
        <Stat value="10+" label="лет создаём решения" />
        <Stat value="800" label="людей доверились нам" />
        <Stat value="24/7" label="остаёмся на связи" />
      </div>
    </section>
  );
}
function Stat({ value, label }) {
  return (
    <div>
      <p className="text-4xl font-semibold tracking-[-.05em] text-[#2f4b40]">
        {value}
      </p>
      <p className="mt-2 text-sm text-[#78827d]">{label}</p>
    </div>
  );
}

function Contacts() {
  return (
    <section className="mx-auto max-w-[1240px] px-5 py-16 lg:px-8 lg:py-24">
      <div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
        <div>
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[.18em] text-[#35ae86]">
            Контакты
          </p>
          <h1 className="text-5xl font-semibold leading-[1.02] tracking-[-.06em] sm:text-7xl">
            Появились вопросы?
            <br />
            <span className="text-[#35b88e]">Напишите нам</span>
          </h1>
          <p className="mt-7 max-w-[370px] text-base leading-7 text-[#6d7773]">
            Напишите нам на почту или позвоните — мы всегда на связи
          </p>
        </div>

        <div className="rounded-[28px] bg-white p-7 shadow-[0_15px_50px_rgba(45,61,53,.06)] sm:p-10">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-[-.04em]">
                Свяжитесь с нами
              </h2>
              <p className="mt-2 text-sm text-[#7b8581]">
                Ответим в течение рабочего дня
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#d8f8eb] text-[#279e78]">
              <MessageCircle size={21} />
            </div>
          </div>

          <div className="space-y-6 text-[#2d2d2d]">
            <div className="flex items-start gap-4">
              <Phone size={20} className="mt-0.5 text-[#5cedb8]" />
              <div>
                <p className="text-sm font-semibold">Телефон</p>
                <a
                  href="tel:+78005553535"
                  className="text-base hover:text-[#2ca77f] transition"
                >
                  8 800 555-35-35
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MessageCircle size={20} className="mt-0.5 text-[#5cedb8]" />
              <div>
                <p className="text-sm font-semibold">Email</p>
                <a
                  href="mailto:hello@forma.pro"
                  className="text-base hover:text-[#2ca77f] transition"
                >
                  hello@forma.pro
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Compass size={20} className="mt-0.5 text-[#5cedb8]" />
              <div>
                <p className="text-sm font-semibold">Адрес</p>
                <p className="text-base">г. Москва, ул. Примерная, д. 1</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Clock3 size={20} className="mt-0.5 text-[#5cedb8]" />
              <div>
                <p className="text-sm font-semibold">Часы работы</p>
                <p className="text-base">Пн–Пт: 9:00 – 21:00</p>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-[#dce3df] pt-6 text-center text-sm text-[#6d7773]">
            <p>Ждём вашего сообщения или звонка!</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[#dce3df] bg-[#eef2ef]">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-7 px-5 py-10 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#5cedb8] text-[#174b3d]">
            <Asterisk size={20} />
          </span>
          <span className="font-bold">
            Робо-решения<span className="text-[#43c99d]">.</span>
          </span>
        </Link>
        <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs text-[#7a8580]">
          <Link to="/catalog" className="transition hover:text-[#219871]">
            Каталог
          </Link>
          <Link to="/about" className="transition hover:text-[#219871]">
            О компании
          </Link>
          <Link to="/contacts" className="transition hover:text-[#219871]">
            Контакты
          </Link>
        </div>
        <p className="text-xs text-[#9aa39f]">
          © 2026 Робо-решения. Движение — это свобода.
        </p>
      </div>
    </footer>
  );
}

export default App;
