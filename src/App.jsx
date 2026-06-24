import * as XLSX from "xlsx";
import { supabase } from "./lib/supabase";
import { useEffect, useMemo, useState } from "react";
import {
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Home,
  Euro,
} from "lucide-react";

const META_PIXEL_ID = "1021351157002707";

const ADMIN_USERS = {
  "mikhaelmyara@gmail.com": { name: "Mikhael", role: "admin" },
  "yeoshouahaddad@yahoo.com": { name: "Josh", role: "admin" },
  "davidmyara12@gmail.com": { name: "David", role: "admin" },

  "mikhelmyara@gmail.com": { name: "Ilan", role: "worker", campaign: "Ilan" },
};

const ASSOCIATES = ["Josh", "Mikhael", "David", "Ilan"];

const STATUS_LABELS = {
  a_appeler: "À appeler",
  appele: "Appelé",
  injoignable: "Injoignable",
  rappel_prevu: "Rappel prévu",
  demande_document: "Demande de document",
  termine: "Terminé",
  ne_veut_pas_etre_contacte: "Ne veut pas être contacté",
};

const STATUS_STYLES = {
  a_appeler: "bg-orange-100 text-orange-700",
  appele: "bg-green-100 text-green-700",
  injoignable: "bg-red-100 text-red-700",
  rappel_prevu: "bg-blue-100 text-blue-700",
  demande_document: "bg-purple-100 text-purple-700",
  termine: "bg-slate-900 text-white",
  ne_veut_pas_etre_contacte: "bg-slate-100 text-slate-600",
 
};

const PIPELINE_COLUMNS = [
  { key: "a_appeler", title: "Nouveau / À appeler" },
  { key: "rappel_prevu", title: "Rappel" },
  { key: "appele", title: "Appelé / Qualifié" },
  { key: "demande_document", title: "Documents demandés" },
  { key: "termine", title: "Terminé" },
];

export default function App() {
  const [page, setPage] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
const [cookieConsent, setCookieConsent] = useState(() => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("primunion_cookie_consent");
});
  const go = (target) => {
    setPage(target);
    setMenuOpen(false);
    window.scrollTo(0, 0);
  };
  
  const loadMetaPixel = () => {
  if (typeof window === "undefined") return;
  if (window.fbq) return;

  !(function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = "2.0";
    n.queue = [];
    t = b.createElement(e);
    t.async = true;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");

  window.fbq("init", META_PIXEL_ID);
  window.fbq("track", "PageView");
};

useEffect(() => {
  if (cookieConsent === "accepted") {
    loadMetaPixel();
  }
}, [cookieConsent]);

          return (
    <div className="min-h-screen bg-[#f7f8ff] text-slate-950">
      <Navbar page={page} go={go} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      {page === "home" && <HomePage go={go} />}
      {page === "simulation" && <SimulationPage go={go} />}
      {page === "admin" && <AdminPage />}
      {page === "contact" && <ContactPage />}
      {page === "legal" && <LegalPage go={go} />}
      {page === "privacy" && <PrivacyPage go={go} />}
      {page === "cgu" && <CguPage go={go} />}
      {page === "cookies" && <CookiesPage go={go} />}

      <Footer go={go} />
      {!cookieConsent && (
  <CookieBanner
    go={go}
    onAccept={() => {
      localStorage.setItem("primunion_cookie_consent", "accepted");
      setCookieConsent("accepted");
    }}
    onRefuse={() => {
      localStorage.setItem("primunion_cookie_consent", "refused");
      setCookieConsent("refused");
    }}
  />
)}
      
    </div>
  );
}



function Navbar({ page, go, menuOpen, setMenuOpen }) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#081d33]/95 text-white backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">
        <button onClick={() => go("home")} className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-blue-500 text-xl font-black text-white">P</div>
          <p className="text-2xl font-black">PrimUnion</p>
        </button>

        <div className="hidden items-center gap-8 font-semibold lg:flex">
          <button onClick={() => go("home")} className={page === "home" ? "text-violet-300" : ""}>Accueil</button>
          <button onClick={() => go("simulation")} className={page === "simulation" ? "text-violet-300" : ""}>Simulation</button>
          <button onClick={() => go("contact")} className={page === "contact" ? "text-violet-300" : ""}>Contact</button>
        </div>

        <button onClick={() => go("simulation")} className="hidden rounded-full bg-gradient-to-r from-violet-600 to-blue-600 px-6 py-3 font-black text-white shadow-lg lg:block">
          Simuler mes primes
        </button>

        <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden">
          {menuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {menuOpen && (
        <div className="border-t border-white/10 bg-[#081d33] px-5 py-4 lg:hidden">
          <div className="flex flex-col gap-4 font-bold">
            <button onClick={() => go("home")}>Accueil</button>
            <button onClick={() => go("simulation")}>Simulation</button>
            <button onClick={() => go("contact")}>Contact</button>
          </div>
        </div>
      )}
    </header>
  );
}

function HomePage({ go }) {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-[#081d33] via-[#132b5c] to-[#140b2d] text-white">
        <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-violet-500/25 blur-3xl" />
        <div className="absolute -right-24 bottom-20 h-72 w-72 rounded-full bg-blue-500/25 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:py-20">
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-violet-300/30 bg-white/10 px-5 py-2 text-sm font-bold text-violet-100">
              <span className="h-2 w-2 rounded-full bg-violet-300" />
              Jusqu’à 17 000€ de primes gouvernementales
            </div>

            <h1 className="text-4xl font-black leading-tight sm:text-5xl md:text-6xl">
Réduisez vos factures

<br />

<span className="bg-gradient-to-r from-violet-300 to-blue-300 bg-clip-text text-transparent">

avec une rénovation énergétique financée par les aides

</span>            </h1>

            <div className="mt-8 space-y-4 text-xl font-semibold text-slate-200">
              <p>✅ Dispositif sécurisé par MaPrimeRénov'</p>
              <p>✅ Jusqu'à 17 000€ d'aides</p>
              <p>✅ Divisez par 3 vos factures de chauffage</p>
              <p>✅ Professionnels certifiés RGE</p>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-2 sm:gap-4">
              {[["17 000€", "Aides max."], ["2 min", "Simulation"], ["100%", "Installation reussie"]].map(([big, small]) => (
                <div key={big} className="min-w-0 rounded-2xl bg-white/10 p-3 text-center backdrop-blur sm:p-5">
                  <p className="break-words text-2xl font-black leading-tight sm:text-3xl">{big}</p>
                  <p className="text-sm text-slate-300">{small}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mx-auto w-full max-w-[620px] rounded-[2rem] bg-white/10 p-8 shadow-2xl backdrop-blur-xl">
            <div className="rounded-[1.7rem] bg-white p-8 text-slate-950">
              <p className="text-sm font-black uppercase text-violet-600">Simulation gratuite</p>
              <h2 className="mt-3 text-4xl font-black text-[#08243a]">Découvrez vos aides en quelques clics</h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">Répondez à quelques questions sur votre logement et recevez une estimation adaptée à votre situation.</p>
              <button onClick={() => go("simulation")} className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-blue-600 py-4 font-black text-white">
                Lancer la simulation <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="grid gap-6 md:grid-cols-3">
          <Card icon={<Euro />} title="Aides financières" text="Estimation simple de vos primes selon votre situation." />
          <Card icon={<Home />} title="Logement" text="Maison ou appartement, nous adaptons la simulation." />
          <Card icon={<ShieldCheck />} title="Accompagnement" text="Un parcours clair, sérieux et sécurisé." />
        </div>
      </section>

      <WhySection />
      <PartnersSection />
      <ProjectStepsSection go={go} />
      <FranceMapSection />

      <section className="bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-16 text-center text-white">
        <h2 className="text-3xl font-black md:text-4xl">Testez votre éligibilité et découvrez vos aides</h2>
        <button onClick={() => go("simulation")} className="mt-8 rounded-full bg-white px-10 py-4 font-black text-violet-700">
          Simuler votre éligibilité →
        </button>
      </section>
    </>
  );
}

function isIleDeFrancePostalCode(postalCode) {
  const code = String(postalCode || "").slice(0, 2);
  return ["75", "77", "78", "91", "92", "93", "94", "95"].includes(code);
}

function getEligibilityCategory({ city, household_size, tax_income }) {
  const household = Number(household_size || 1);
  const isIdf = isIleDeFrancePostalCode(city);
  const bareme = {
    idf: {
      veryModest: [23768, 34884, 41893, 48914, 55961],
      modest: [28933, 42463, 51000, 59549, 68123],
      intermediate: [40404, 59394, 71060, 83637, 95758],
      extra: { veryModest: 7038, modest: 8568, intermediate: 12122 },
    },
    other: {
      veryModest: [17173, 25115, 30206, 35285, 40388],
      modest: [22015, 32197, 38719, 45234, 51775],
      intermediate: [30844, 45340, 54592, 63844, 73098],
      extra: { veryModest: 5094, modest: 6525, intermediate: 9254 },
    },
  };
  const zone = isIdf ? bareme.idf : bareme.other;
  const getLimit = (type) => (household <= 5 ? zone[type][household - 1] : zone[type][4] + (household - 5) * zone.extra[type]);
  const ranges = { "Jusqu'à 25 714 €": 25714, "De 25 714 € à 32 985 €": 32985, "De 32 985 € à 46 182 €": 46182, "Plus de 46 182 €": 999999 };
  const income = ranges[tax_income] || 999999;
  if (income <= getLimit("veryModest")) return { eligibility_category: "tres_modeste", lead_color: "purple" };
  if (income <= getLimit("modest")) return { eligibility_category: "modeste", lead_color: "blue" };
  if (income <= getLimit("intermediate")) return { eligibility_category: "intermediaire", lead_color: "yellow" };
  return { eligibility_category: "aise", lead_color: "gray" };
}

function SimulationPage({ go }) {
  const params = new URLSearchParams(window.location.search);
const campaign = params.get("campaign");
  const steps = [
    { type: "choice", key: "owner_status", title: "Concernant votre logement, vous êtes ?", hint: "Cette information conditionne les aides auxquelles vous avez droit.", options: [{ label: "Propriétaire", emoji: "🏠", desc: "J'occupe ou je loue mon bien" }, { label: "Locataire", emoji: "🔑", desc: "Je loue mon logement" }] },
    { type: "choice", key: "housing_type", title: "Quel est votre type de logement ?", options: [{ label: "Maison", emoji: "🏡", desc: "Maison individuelle" }, { label: "Appartement", emoji: "🏢", desc: "En immeuble collectif" }] },
    { type: "choice", key: "heating_type", title: "Votre système de chauffage actuel ?", hint: "Plus votre chauffage est ancien, plus vos aides peuvent être élevées.", options: [{ label: "Gaz", emoji: "🔥" }, { label: "Fioul", emoji: "🛢️" }, { label: "Électrique", emoji: "⚡" }, { label: "Autres", emoji: "♻️" }] },
    { type: "choice", key: "heating_bill", title: "Montant annuel de votre facture de chauffage ?", options: [{ label: "Moins de 1 250€" }, { label: "De 1 250€ à 1 500€" }, { label: "De 1 500€ à 2 000€" }, { label: "Plus de 2 000€" }] },
    { type: "choice", key: "aid_amount_choice", title: "Voulez-vous connaître votre montant d'aide ?", options: [{ label: "Je souhaite avoir le montant de ma prime", emoji: "💰" }, { label: "Je ne souhaite pas confier mes revenus", emoji: "🔒" }] },
    { type: "input", key: "city", title: "Votre code postal ?", placeholder: "Ex : 75001" },
    { type: "counter", key: "household_size", title: "Combien de personnes composent votre foyer ?" },
    { type: "choice", key: "tax_income", title: "Revenu fiscal de référence", subtitle: "Avis d'imposition 2025 — revenus 2024", options: [{ label: "Jusqu'à 25 714 €" }, { label: "De 25 714 € à 32 985 €" }, { label: "De 32 985 € à 46 182 €" }, { label: "Plus de 46 182 €" }] },
    { type: "contact", key: "contact", title: "Recevez votre estimation personnalisée" },
    { type: "choice", key: "wants_contact", title: "Voulez-vous être contacté par un de nos collaborateurs ?", options: [{ label: "Oui", emoji: "📞", desc: "Je choisis une date et une heure" }, { label: "Non", emoji: "❌", desc: "Je veux seulement envoyer ma demande" }] },
    { type: "appointment", key: "appointment", title: "Choisissez votre date et heure préférées" },
  ];

  const encouragements = ["C'est parti, ça prend moins de 2 minutes 👍", "Parfait, continuons !", "Super, vous avancez bien 🔥", "Plus que quelques questions…", "On y est presque !", "Dernière ligne droite 🚀", "Encore un effort…", "Avant-dernière étape !", "Votre estimation est prête 🎉", "Dernière question !", "Choisissez votre créneau 📅"];

  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState("forward");
  const [showSuccess, setShowSuccess] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);
  const [data, setData] = useState({ household_size: 1, full_name: "", email: "", phone: "", preferred_date: "", preferred_time: "" });

  const current = steps[step];
  const selected = data[current.key];
  const progress = Math.round(((step + 1) / steps.length) * 100);
  const isPostalCodeValid = /^[0-9]{5}$/.test(data.city || "");
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email || "");
  const isPhoneValid = /^(?:(?:\+33|0033)[1-9](?:\d{2}){4}|0[1-9](?:\d{2}){4})$/.test((data.phone || "").replace(/\s/g, ""));
  const isContactValid = data.full_name.trim().length >= 2 && isEmailValid && isPhoneValid && consentChecked;
  const isAppointmentValid = data.preferred_date && data.preferred_time;
  const canContinue = current.type === "input" ? isPostalCodeValid : current.type === "contact" ? isContactValid : current.type === "appointment" ? isAppointmentValid : true;

  const submitLead = async (finalData = data) => {
    const eligibility = getEligibilityCategory(finalData);
    const finalLead = {
      ...finalData,
      preferred_date: finalData.preferred_date || null,
      preferred_time: finalData.preferred_time || null,
      call_status: finalData.wants_contact === "Non" ? "ne_veut_pas_etre_contacte" : "a_appeler",
      rgpd_consent: true,
      rgpd_consent_date: new Date().toISOString(),
    };

    const { error } = await supabase.from("leads").insert([
  {
    ...finalLead,
    ...eligibility,
    household_size: String(finalData.household_size),
    campaign_source: campaign || null,
    assigned_to: campaign
      ? campaign.charAt(0).toUpperCase() + campaign.slice(1)
      : null,
  },
]);
if (error) {
  console.error(error);
  alert(error.message);
  return;
}
if (typeof window !== "undefined" && window.fbq) {

  window.fbq("trackCustom", "PrimUnionLead");

  console.log("PrimUnionLead envoyé à Meta");

}

    setShowSuccess(true);
    setStep(0);
    window.scrollTo(0, 0);
    setData({ household_size: 1, full_name: "", email: "", phone: "", preferred_date: "", preferred_time: "" });
  };

  const next = async () => {
    if (!canContinue) return;
    setDirection("forward");
    if (step < steps.length - 1) return setStep(step + 1);
    await submitLead();
  };

  const back = () => {
    setDirection("back");
    setStep(Math.max(0, step - 1));
  };

  const choose = (value) => {
    const updatedData = { ...data, [current.key]: value };
    setData(updatedData);
    setDirection("forward");

    if (current.key === "wants_contact" && value === "Non") {
      setTimeout(() => submitLead(updatedData), 250);
      return;
    }

    setTimeout(() => {
      if (step < steps.length - 1) setStep(step + 1);
    }, 250);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#081d33] via-[#132b5c] to-[#140b2d] px-4 py-10">
      <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-violet-500/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-blue-500/25 blur-3xl" />

      <style>{`
        @keyframes pu-slide-in-right { from { opacity: 0; transform: translateX(28px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes pu-slide-in-left { from { opacity: 0; transform: translateX(-28px); } to { opacity: 1; transform: translateX(0); } }
        .pu-step-forward { animation: pu-slide-in-right .35s cubic-bezier(.22,1,.36,1) both; }
        .pu-step-back { animation: pu-slide-in-left .35s cubic-bezier(.22,1,.36,1) both; }
      `}</style>

      <div className="relative mx-auto w-full max-w-3xl">
        <div className="mb-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-bold text-violet-100/90">
          <span className="flex items-center gap-2"><ShieldCheck size={16} className="text-violet-300" /> 100% Installations reussies</span>
          <span className="flex items-center gap-2"><CheckCircle size={16} className="text-violet-300" /> Sans engagement</span>
          <span className="flex items-center gap-2"><Sparkles size={16} className="text-violet-300" /> Réponse en 2 min</span>
        </div>

        <div className="overflow-hidden rounded-[1.5rem] bg-white p-5 shadow-2xl ring-1 ring-black/5 sm:p-6 md:rounded-[2.5rem] md:p-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 text-base font-black text-white">P</div>
              <span className="text-lg font-black text-[#08243a]">PrimUnion</span>
            </div>
            <span className="rounded-full bg-violet-50 px-4 py-1.5 text-sm font-black text-violet-700">{progress}%</span>
          </div>

          <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full rounded-full bg-gradient-to-r from-violet-600 to-blue-600 transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>

          <div className="mt-2.5 flex items-center justify-between text-sm font-bold">
            <span className="text-violet-600">{encouragements[step]}</span>
            <span className="text-slate-400">Étape {step + 1} / {steps.length}</span>
          </div>

          <div key={step} className={direction === "forward" ? "pu-step-forward" : "pu-step-back"}>
            <h2 className="mt-7 break-words text-2xl font-black leading-tight text-[#08243a] sm:text-3xl">{current.title}</h2>

            {current.subtitle && <p className="mt-2 text-base font-bold text-slate-400">{current.subtitle}</p>}
            {current.hint && <p className="mt-3 flex items-start gap-2 rounded-2xl bg-blue-50 p-3 text-sm font-semibold text-blue-700"><span>💡</span> {current.hint}</p>}

            {current.type === "choice" && (
              <div className={`mt-7 grid gap-4 ${current.options.length > 3 ? "sm:grid-cols-2" : "md:grid-cols-2"}`}>
                {current.options.map((option) => {
                  const isSel = selected === option.label;
                  return (
                    <button key={option.label} onClick={() => choose(option.label)} className={`group relative flex items-center gap-4 rounded-2xl border-2 p-5 text-left transition-all ${isSel ? "border-violet-600 bg-violet-50 shadow-lg shadow-violet-200/60" : "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-violet-400 hover:shadow-md"}`}>
                      {option.emoji && <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-3xl ${isSel ? "bg-white" : "bg-slate-50 group-hover:bg-violet-100"}`}>{option.emoji}</span>}
                      <span className="flex-1">
                        <span className="block text-lg font-black text-[#08243a]">{option.label}</span>
                        {option.desc && <span className="mt-0.5 block text-sm font-semibold text-slate-400">{option.desc}</span>}
                      </span>
                      <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 ${isSel ? "border-violet-600 bg-violet-600 text-white" : "border-slate-300 text-transparent"}`}>
                        <CheckCircle size={16} />
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {current.type === "input" && (
              <div className="mt-7">
                <div className="relative">
                  <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-2xl">📍</span>
                  <input
                    value={data[current.key] || ""}
                    onChange={(e) => setData({ ...data, [current.key]: e.target.value.replace(/\D/g, "").slice(0, 5) })}
                    placeholder={current.placeholder}
                    inputMode="numeric"
                    className={`w-full rounded-3xl border-2 p-5 pl-14 text-xl font-bold outline-none ${isPostalCodeValid || !data[current.key] ? "border-slate-200 focus:border-violet-500" : "border-red-500"}`}
                  />
                </div>
                {data[current.key] && !isPostalCodeValid && <p className="mt-3 font-bold text-red-500">Entre un code postal français valide à 5 chiffres.</p>}
                <ContinueButton disabled={!canContinue} onClick={next} />
              </div>
            )}

            {current.type === "counter" && (
              <div className="mt-9">
                <div className="flex items-center justify-center gap-6">
                  <button onClick={() => setData({ ...data, household_size: Math.max(1, data.household_size - 1) })} className="flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-slate-200 text-3xl font-black text-slate-500">−</button>
                  <div className="text-center">
                    <div className="flex h-28 w-28 items-center justify-center rounded-3xl bg-gradient-to-br from-violet-600 to-blue-600 text-6xl font-black text-white shadow-lg shadow-violet-200">{data.household_size}</div>
                    <p className="mt-3 font-bold text-slate-400">personne{data.household_size > 1 ? "s" : ""}</p>
                  </div>
                  <button onClick={() => setData({ ...data, household_size: data.household_size + 1 })} className="flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-slate-200 text-3xl font-black text-slate-500">+</button>
                </div>
                <ContinueButton disabled={false} onClick={next} />
              </div>
            )}

            {current.type === "contact" && (
              <div className="mt-7">
                <div className="mb-6 flex items-center gap-4 rounded-2xl bg-gradient-to-r from-violet-600 to-blue-600 p-5 text-white">
                  <span className="text-4xl">🎉</span>
                  <div>
                    <p className="text-lg font-black">Votre estimation est prête !</p>
                    <p className="text-sm font-semibold text-violet-100">Indiquez où l'envoyer, c'est gratuit et sans engagement.</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <FieldInput value={data.full_name} onChange={(v) => setData({ ...data, full_name: v })} placeholder="Nom et prénom *" icon="👤" />
                  <FieldInput value={data.email} onChange={(v) => setData({ ...data, email: v })} placeholder="Adresse email *" icon="✉️" type="email" error={data.email && !isEmailValid ? "Email invalide." : ""} />
                  <FieldInput value={data.phone} onChange={(v) => setData({ ...data, phone: v })} placeholder="Numéro de téléphone *" icon="📞" type="tel" error={data.phone && !isPhoneValid ? "Numéro français invalide. Exemple : 0612345678" : ""} />
                </div>

              <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-2xl border-2 border-slate-200 p-4 transition hover:border-violet-400">
                  <input
                    type="checkbox"
                    checked={consentChecked}
                    onChange={(e) => setConsentChecked(e.target.checked)}
                    className="mt-0.5 h-5 w-5 shrink-0 accent-violet-600"
                  />
                  <span className="text-sm font-semibold leading-6 text-slate-600">
                    J'accepte que PrimUnion collecte et traite mes données personnelles (nom, email, téléphone, informations logement) pour réaliser ma simulation et me recontacter. Conformément au RGPD, je peux retirer mon consentement à tout moment en écrivant à <strong>mikhaelmyara@gmail.com</strong>. *
                  </span>
                </label>



                <button disabled={!canContinue} onClick={next} className={`mt-6 flex w-full items-center justify-center gap-2 rounded-2xl py-5 text-lg font-black transition ${canContinue ? "bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-lg shadow-violet-200" : "cursor-not-allowed bg-slate-200 text-slate-400"}`}>
                  Recevoir mon estimation <ArrowRight size={20} />
                </button>

                <p className="mt-4 flex items-center justify-center gap-2 text-sm font-bold text-slate-400">
                  <ShieldCheck size={16} /> Données protégées · Aucun engagement
                </p>
              </div>
            )}

            {current.type === "appointment" && (
              <div className="mt-7 space-y-4">
                <div>
                  <label className="mb-2 block font-black text-[#08243a]">Choisissez une date</label>
                  <input type="date" value={data.preferred_date} onChange={(e) => setData({ ...data, preferred_date: e.target.value })} className="block w-full min-w-0 max-w-full appearance-none rounded-2xl border-2 border-slate-200 bg-white p-4 text-base font-bold text-[#08243a] outline-none focus:border-violet-500 sm:p-5 sm:text-lg" />
                </div>

                <div>
                  <label className="mb-2 block font-black text-[#08243a]">Choisissez une heure</label>
                  <select value={data.preferred_time} onChange={(e) => setData({ ...data, preferred_time: e.target.value })} className="w-full max-w-full rounded-2xl border-2 border-slate-200 bg-white p-4 text-base font-bold text-[#08243a] outline-none focus:border-violet-500 sm:p-5 sm:text-lg">
                    <option value="">Sélectionner une heure</option>
                    {["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00"].map((hour) => (
                      <option key={hour} value={hour}>{hour}</option>
                    ))}
                  </select>
                </div>

                <button disabled={!canContinue} onClick={() => submitLead()} className={`flex w-full items-center justify-center gap-2 rounded-2xl py-5 text-lg font-black transition ${canContinue ? "bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-lg shadow-violet-200" : "cursor-not-allowed bg-slate-200 text-slate-400"}`}>
                  Valider ma demande <ArrowRight size={20} />
                </button>
              </div>
            )}
          </div>

          {step > 0 && (
            <div className="mt-8 border-t border-slate-100 pt-5">
              <button onClick={back} className="text-sm font-black text-slate-400 transition hover:text-violet-600">
                ← Revenir à l'étape précédente
              </button>
            </div>
          )}
        </div>

        <p className="mt-6 text-center text-sm font-semibold text-violet-100/70">
          Déjà plus de 12 000 foyers accompagnés · Professionnels certifiés RGE
        </p>
      </div>

      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-[2rem] bg-white p-8 text-center shadow-2xl">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-blue-600 text-5xl text-white shadow-xl">✓</div>
            <h2 className="mt-6 text-3xl font-black text-[#08243a]">Merci 🎉</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Votre demande a bien été envoyée.
              <br />
              Un conseiller PrimUnion reviendra vers vous rapidement avec vos aides disponibles.
            </p>
            <button onClick={() => { setShowSuccess(false); go("home"); }} className="mt-8 w-full rounded-2xl bg-gradient-to-r from-violet-600 to-blue-600 py-4 text-lg font-black text-white shadow-lg">
              Retour à l’accueil
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

function ContinueButton({ disabled, onClick }) {
  return (
    <button disabled={disabled} onClick={onClick} className={`mt-7 flex w-full items-center justify-center gap-2 rounded-2xl py-5 text-lg font-black transition ${disabled ? "cursor-not-allowed bg-slate-200 text-slate-400" : "bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-lg shadow-violet-200 hover:brightness-110 active:scale-[.99]"}`}>
      Continuer <ArrowRight size={20} />
    </button>
  );
}

function FieldInput({ value, onChange, placeholder, icon, type = "text", error = "" }) {
  return (
    <div>
      <div className="relative">
        <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-xl">{icon}</span>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(type === "tel" ? e.target.value.replace(/[^0-9+\s]/g, "") : e.target.value)}
          placeholder={placeholder}
          inputMode={type === "tel" ? "numeric" : undefined}
          autoComplete={type === "tel" ? "tel" : undefined}
          className={`w-full rounded-2xl border-2 py-4 pl-14 pr-5 text-base font-bold text-[#08243a] outline-none transition ${error ? "border-red-500 focus:border-red-500" : "border-slate-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-100"}`}
        />
      </div>
      {error && <p className="mt-2 font-bold text-red-500">{error}</p>}
    </div>
  );
}

function AdminPage() {
  const [selectedLeadIds, setSelectedLeadIds] = useState([]);
  const [selectedLead, setSelectedLead] = useState(null);
  const [columnWidths, setColumnWidths] = useState({
  selection: 70,
  nom: 180,
  telephone: 170,
  email: 240,
  revenus: 180,
  cp: 100,
  categorie: 150,
  assigne: 170,
  statut: 170,
  rappel: 140,
  date: 140,
});
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [statusFilter, setStatusFilter] = useState("");
  const [associateFilter, setAssociateFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortMode, setSortMode] = useState("newest");
  const [viewMode, setViewMode] = useState("table");

  const isAdmin = currentUser?.role === "admin";

  const getUserFromSession = (sessionValue) => {
    const emailValue = sessionValue?.user?.email?.toLowerCase();
    return ADMIN_USERS[emailValue] || null;
  };

  const loginAdmin = async (e) => {
    e.preventDefault();
    setLoginError("");

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setLoginError("Email ou mot de passe incorrect.");
      return;
    }

    const allowedUser = getUserFromSession(data.session);

    if (!allowedUser) {
      await supabase.auth.signOut();
      setLoginError("Accès refusé. Cet email n'est pas autorisé pour l'espace partenaire.");
      return;
    }

    setCurrentUser(allowedUser);
    setSession(data.session);
  };

  const loadLeads = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      alert("Erreur chargement leads");
    } else {
      setLeads(data || []);
    }

    setLoading(false);
  };

  const updateLead = async (lead, silent = false) => {
    const { error } = await supabase
      .from("leads")
      .update({
        call_status: lead.call_status || "a_appeler",
        assigned_to: lead.assigned_to || null,
        internal_note: lead.internal_note || null,
        reminder_date: lead.reminder_date || null,
        last_called_at: lead.call_status === "appele" ? new Date().toISOString() : lead.last_called_at || null,
      })
      .eq("id", lead.id);

    if (error) {
      console.error(error);
      alert("Erreur sauvegarde");
      return;
    }

    if (!silent) alert("Lead sauvegardé ✅");
    loadLeads();
  };

  const changeLead = (id, field, value) => {
    setLeads((prev) => prev.map((lead) => (lead.id === id ? { ...lead, [field]: value } : lead)));
    setSelectedLead((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const quickUpdateLead = async (lead, field, value) => {
    const updated = { ...lead, [field]: value };
    changeLead(lead.id, field, value);
    await updateLead(updated, true);
  };
  const toggleLeadSelection = (id) => {
  setSelectedLeadIds((prev) =>
    prev.includes(id) ? prev.filter((leadId) => leadId !== id) : [...prev, id]
  );
};

const deleteSelectedLeads = async () => {
  if (selectedLeadIds.length === 0) return;

  const confirmed = window.confirm(
    `Supprimer ${selectedLeadIds.length} lead(s) ? Cette action est définitive.`
  );

  if (!confirmed) return;

  const { error } = await supabase
    .from("leads")
    .delete()
    .in("id", selectedLeadIds);

  if (error) {
    console.error(error);
    alert("Erreur suppression leads");
    return;
  }

  setSelectedLeadIds([]);
  loadLeads();
};

  useEffect(() => {
    const initAuth = async () => {
      const { data } = await supabase.auth.getSession();
      const allowedUser = getUserFromSession(data.session);

      if (data.session && !allowedUser) {
        await supabase.auth.signOut();
        setSession(null);
        setCurrentUser(null);
        return;
      }

      setSession(data.session);
      setCurrentUser(allowedUser);
    };

    initAuth();

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, nextSession) => {
      const allowedUser = getUserFromSession(nextSession);

      if (nextSession && !allowedUser) {
        await supabase.auth.signOut();
        setSession(null);
        setCurrentUser(null);
        return;
      }

      setSession(nextSession);
      setCurrentUser(allowedUser);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session && currentUser) loadLeads();
  }, [session, currentUser]);

  const today = new Date().toISOString().slice(0, 10);
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const visibleBaseLeads = useMemo(() => {
  if (!currentUser) return [];

  if (currentUser.role === "admin") return leads;

  return leads.filter(
    (lead) =>
      lead.campaign_source?.toLowerCase() ===
      currentUser.campaign?.toLowerCase()
  );
}, [leads, currentUser]);

  const filteredLeads = useMemo(() => {
    return visibleBaseLeads
      .filter((lead) => {
        const statusMatch = statusFilter ? lead.call_status === statusFilter : true;

        const associateMatch =
          associateFilter === "__unassigned__"
            ? !lead.assigned_to
            : associateFilter
            ? lead.assigned_to === associateFilter
            : true;

        const q = searchQuery.trim().toLowerCase();
        const searchMatch = q
          ? [lead.full_name, lead.phone, lead.email, lead.city, lead.tax_income, lead.assigned_to]
              .filter(Boolean)
              .some((value) => String(value).toLowerCase().includes(q))
          : true;

        return statusMatch && associateMatch && searchMatch;
      })
      .sort((a, b) => {
        if (sortMode === "oldest") return new Date(a.created_at) - new Date(b.created_at);
        if (sortMode === "name") return String(a.full_name || "").localeCompare(String(b.full_name || ""));
        if (sortMode === "associate") return String(a.assigned_to || "zzz").localeCompare(String(b.assigned_to || "zzz"));
        if (sortMode === "reminder") {
          const da = a.reminder_date ? new Date(a.reminder_date) : new Date("2999-12-31");
          const db = b.reminder_date ? new Date(b.reminder_date) : new Date("2999-12-31");
          return da - db;
        }
        return new Date(b.created_at) - new Date(a.created_at);
      });
  }, [visibleBaseLeads, statusFilter, associateFilter, searchQuery, sortMode]);

  const remindersToday = visibleBaseLeads.filter((lead) => lead.reminder_date === today && lead.call_status !== "termine");
  const overdueReminders = visibleBaseLeads.filter((lead) => lead.reminder_date && lead.reminder_date < today && lead.call_status !== "termine");

  const associateStats = ASSOCIATES.map((name) => ({
    name,
    count: leads.filter((lead) => lead.assigned_to === name).length,
    reminders: leads.filter((lead) => lead.assigned_to === name && lead.reminder_date === today && lead.call_status !== "termine").length,
  }));

  const stats = {
    total: visibleBaseLeads.length,
    today: visibleBaseLeads.filter((lead) => String(lead.created_at || "").slice(0, 10) === today).length,
    week: visibleBaseLeads.filter((lead) => new Date(lead.created_at) >= sevenDaysAgo).length,
    called: visibleBaseLeads.filter((lead) => lead.call_status === "appele").length,
    unassigned: visibleBaseLeads.filter((lead) => !lead.assigned_to).length,
    remindersToday: remindersToday.length,
    overdue: overdueReminders.length,
  };

  const calledRate = stats.total ? Math.round((stats.called / stats.total) * 100) : 0;
  const unassignedRate = stats.total ? Math.round((stats.unassigned / stats.total) * 100) : 0;

  const notifications = useMemo(() => {
    const list = [];

    if (remindersToday.length > 0) {
      list.push(`${remindersToday.length} rappel(s) aujourd’hui`);
    }

    if (overdueReminders.length > 0) {
      list.push(`${overdueReminders.length} rappel(s) en retard`);
    }

    if (!isAdmin) {
      const assignedCount = visibleBaseLeads.length;
      list.push(`${assignedCount} lead(s) assigné(s) à ${currentUser?.name}`);
    } else {
      const unassignedCount = leads.filter((lead) => !lead.assigned_to).length;
      if (unassignedCount > 0) list.push(`${unassignedCount} lead(s) non assigné(s)`);
    }

    return list;
  }, [remindersToday.length, overdueReminders.length, visibleBaseLeads.length, leads, isAdmin, currentUser]);

 const exportExcel = () => {
  const rows = filteredLeads.map((lead) => ({
    Nom: lead.full_name || "",
    Téléphone: lead.phone || "",
    Email: lead.email || "",
    "Code postal": lead.city || "",
    Revenus: lead.tax_income || "",
    Catégorie: lead.eligibility_category || "",
    "Assigné à": lead.assigned_to || "Non assigné",
    Statut: STATUS_LABELS[lead.call_status] || "À appeler",
    Rappel: lead.reminder_date || "",
    Date: lead.created_at
      ? new Date(lead.created_at).toLocaleDateString("fr-FR")
      : "",
    Note: lead.internal_note || "",
  }));

  const worksheet = XLSX.utils.json_to_sheet(rows);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Leads");

  XLSX.writeFile(workbook, `leads-primunion-${today}.xlsx`);
};



  if (selectedLead) {
    return (
      <LeadDetailsPage
        lead={selectedLead}
        onBack={() => setSelectedLead(null)}
        onChange={changeLead}
        onSave={updateLead}
        onQuickUpdate={quickUpdateLead}
        statusLabels={STATUS_LABELS}
        statusStyles={STATUS_STYLES}
        associates={ASSOCIATES}
        currentUser={currentUser}
      />
    );
  }


const startResize = (column, e) => {
  e.preventDefault();

  const startX = e.clientX;
  const startWidth = columnWidths[column];

  const onMouseMove = (moveEvent) => {
    const newWidth = startWidth + (moveEvent.clientX - startX);

    setColumnWidths((prev) => ({
      ...prev,
      [column]: Math.max(newWidth, 60),
    }));
  };

  const onMouseUp = () => {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  };

  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
};
  if (!session || !currentUser) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-[#081d33] via-[#132b5c] to-[#140b2d] px-5 py-20">
        <div className="mx-auto max-w-md rounded-[2rem] bg-white p-8 shadow-2xl">
          <h1 className="text-3xl font-black text-[#08243a]">Connexion partenaire</h1>
          <p className="mt-3 text-slate-600">Connecte-toi pour accéder au CRM PrimUnion.</p>

          <form onSubmit={loginAdmin} className="mt-8 space-y-4">
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-2xl border-2 border-slate-200 p-4 font-bold outline-none focus:border-violet-500" />
            <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-2xl border-2 border-slate-200 p-4 font-bold outline-none focus:border-violet-500" />
            {loginError && <p className="font-bold text-red-500">{loginError}</p>}
            <button className="w-full rounded-2xl bg-gradient-to-r from-violet-600 to-blue-600 py-4 font-black text-white">Se connecter</button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f8ff] px-4 py-8 md:px-5">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="font-black text-violet-700">
              CRM PrimUnion · {currentUser.name} {isAdmin ? "(admin)" : "(associé)"}
            </p>
            <h1 className="mt-2 text-3xl font-black text-[#08243a] md:text-4xl">
              {isAdmin ? "Suivi global des leads" : "Mes leads"}
            </h1>
            <p className="mt-2 text-slate-600">
              Rappels, filtres, assignation, pipeline et export.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button onClick={loadLeads} className="rounded-2xl bg-white px-5 py-3 font-black text-slate-700 shadow ring-1 ring-slate-100">Rafraîchir</button>
            <button onClick={exportExcel} className="rounded-2xl bg-white px-5 py-3 font-black text-violet-700 shadow ring-1 ring-violet-100">Exporter Excel</button>
            {isAdmin && selectedLeadIds.length > 0 && (
  <button
    onClick={deleteSelectedLeads}
    className="rounded-2xl bg-red-600 px-5 py-3 font-black text-white shadow"
  >
    Supprimer {selectedLeadIds.length} lead(s)
  </button>
)}
            <button onClick={() => supabase.auth.signOut()} className="rounded-2xl bg-slate-900 px-5 py-3 font-black text-white">Se déconnecter</button>
          </div>
        </div>

        {loading ? (
          <div className="rounded-3xl bg-white p-10 text-center font-black shadow">Chargement des leads...</div>
        ) : leads.length === 0 ? (
          <div className="rounded-3xl bg-white p-10 text-center font-black shadow">Aucun lead pour le moment.</div>
        ) : (
          <>
            {notifications.length > 0 && (
              <div className="mb-5 rounded-[1.5rem] border border-orange-100 bg-orange-50 p-4">
                <p className="font-black text-orange-800">Notifications</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {notifications.map((item) => (
                    <span key={item} className="rounded-full bg-white px-3 py-1 text-sm font-black text-orange-700 shadow-sm">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-7">
              <StatCard label="Total" value={stats.total} />
              <StatCard label="Aujourd’hui" value={stats.today} />
              <StatCard label="7 derniers jours" value={stats.week} />
              <StatCard label="Appelés" value={`${calledRate}%`} />
              <StatCard label="Non assignés" value={`${unassignedRate}%`} />
              <StatCard label="Rappels aujourd’hui" value={stats.remindersToday} />
              <StatCard label="En retard" value={stats.overdue} danger={stats.overdue > 0} />
            </div>

            {isAdmin && (
              <div className="mb-5 grid gap-3 md:grid-cols-3">
                {associateStats.map((item) => (
                  <div key={item.name} className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
                    <p className="text-xs font-black uppercase tracking-wide text-slate-400">{item.name}</p>
                    <p className="mt-1 text-3xl font-black text-[#08243a]">{item.count}</p>
                    <p className="mt-1 text-sm font-bold text-slate-500">{item.reminders} rappel(s) aujourd’hui</p>
                  </div>
                ))}
              </div>
            )}

            <div className="mb-5 grid gap-3 rounded-[1.5rem] bg-white p-4 shadow-sm ring-1 ring-slate-100 md:grid-cols-[1fr_190px_190px_190px_160px]">
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher nom, téléphone, email, code postal..."
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold outline-none focus:border-violet-500"
              />

              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold outline-none focus:border-violet-500">
                <option value="">Tous les statuts</option>
                {Object.entries(STATUS_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>

              {isAdmin ? (
                <select value={associateFilter} onChange={(e) => setAssociateFilter(e.target.value)} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold outline-none focus:border-violet-500">
                  <option value="">Tous les associés</option>
                  <option value="__unassigned__">Non assigné</option>
                  {ASSOCIATES.map((name) => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                </select>
              ) : (
                <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-black text-slate-500">
                  Assigné à {currentUser.name}
                </div>
              )}

              <select value={sortMode} onChange={(e) => setSortMode(e.target.value)} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold outline-none focus:border-violet-500">
                <option value="newest">Plus récents</option>
                <option value="oldest">Plus anciens</option>
                <option value="reminder">Rappels prioritaires</option>
                <option value="associate">Par associé</option>
                <option value="name">Nom A-Z</option>
              </select>

              <select value={viewMode} onChange={(e) => setViewMode(e.target.value)} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold outline-none focus:border-violet-500">
                <option value="table">Tableau</option>
                <option value="pipeline">Pipeline</option>
              </select>
            </div>

            {viewMode === "pipeline" ? (
              <PipelineView leads={filteredLeads} setSelectedLead={setSelectedLead} onQuickUpdate={quickUpdateLead} isAdmin={isAdmin} />
            ) : (
              <div className="overflow-hidden rounded-[2rem] bg-white shadow-xl ring-1 ring-slate-100">
                <div className="border-b border-slate-100 px-5 py-4 text-sm font-black text-slate-500">
                  {filteredLeads.length} résultat(s)
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[1120px] border-collapse text-left text-[13px]">
                    <thead className="bg-slate-50 text-[11px] uppercase tracking-wide text-slate-500">
                      <tr>
                        <th
                            className="relative px-4 py-3"
                            style={{ width: columnWidths.nom }}
                          >
                            Sélection

                            <div
                              onMouseDown={(e) => startResize("nom", e)}
                              className="absolute right-0 top-0 h-full w-2 cursor-col-resize"
                            />
                          </th>
                        <th
                            className="relative px-4 py-3"
                            style={{ width: columnWidths.nom }}
                          >
                            Nom

                            <div
                              onMouseDown={(e) => startResize("nom", e)}
                              className="absolute right-0 top-0 h-full w-2 cursor-col-resize"
                            />
                          </th>
                        <th
  className="relative px-4 py-3"
  style={{ width: columnWidths.nom }}
>
  Téléphone

  <div
    onMouseDown={(e) => startResize("nom", e)}
    className="absolute right-0 top-0 h-full w-2 cursor-col-resize"
  />
</th>
                        <th
  className="relative px-4 py-3"
  style={{ width: columnWidths.nom }}
>
  Email

  <div
    onMouseDown={(e) => startResize("nom", e)}
    className="absolute right-0 top-0 h-full w-2 cursor-col-resize"
  />
</th>
                        <th
  className="relative px-4 py-3"
  style={{ width: columnWidths.nom }}
>
  Revenus

  <div
    onMouseDown={(e) => startResize("nom", e)}
    className="absolute right-0 top-0 h-full w-2 cursor-col-resize"
  />
</th>
                        <th
  className="relative px-4 py-3"
  style={{ width: columnWidths.nom }}
>
  CP

  <div
    onMouseDown={(e) => startResize("nom", e)}
    className="absolute right-0 top-0 h-full w-2 cursor-col-resize"
  />
</th>
                        <th
  className="relative px-4 py-3"
  style={{ width: columnWidths.nom }}
>
  Catégorie

  <div
    onMouseDown={(e) => startResize("nom", e)}
    className="absolute right-0 top-0 h-full w-2 cursor-col-resize"
  />
</th>
                        <th
  className="relative px-4 py-3"
  style={{ width: columnWidths.nom }}
>
  Assigné à

  <div
    onMouseDown={(e) => startResize("nom", e)}
    className="absolute right-0 top-0 h-full w-2 cursor-col-resize"
  />
</th>
                        <th
  className="relative px-4 py-3"
  style={{ width: columnWidths.nom }}
>
  Statut

  <div
    onMouseDown={(e) => startResize("nom", e)}
    className="absolute right-0 top-0 h-full w-2 cursor-col-resize"
  />
</th>
                        <th
  className="relative px-4 py-3"
  style={{ width: columnWidths.nom }}
>
  Rappel

  <div
    onMouseDown={(e) => startResize("nom", e)}
    className="absolute right-0 top-0 h-full w-2 cursor-col-resize"
  />
</th>
                        <th
  className="relative px-4 py-3"
  style={{ width: columnWidths.nom }}
>
  Date

  <div
    onMouseDown={(e) => startResize("nom", e)}
    className="absolute right-0 top-0 h-full w-2 cursor-col-resize"
  />
</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                      {filteredLeads.map((lead) => (
                        <tr key={lead.id} onClick={() => setSelectedLead(lead)} className="cursor-pointer transition hover:bg-violet-50">
                          <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                            <input
                              type="checkbox"
                              checked={selectedLeadIds.includes(lead.id)}
                              onChange={() => toggleLeadSelection(lead.id)}
                              className="h-4 w-4 accent-violet-600"
                            />
                          </td>
                          
                          <td className="max-w-[160px] px-4 py-3 font-black text-[#08243a]">
                            <span className="line-clamp-2">{lead.full_name || "Sans nom"}</span>
                          </td>

                          <td className="whitespace-nowrap px-4 py-3 font-semibold text-slate-600" onClick={(e) => e.stopPropagation()}>
                            {lead.phone ? <a className="text-violet-700 hover:underline" href={`tel:${lead.phone}`}>{lead.phone}</a> : "-"}
                          </td>

                          <td className="max-w-[190px] truncate px-4 py-3 font-semibold text-slate-500" onClick={(e) => e.stopPropagation()}>
                            {lead.email ? <a className="text-violet-700 hover:underline" href={`mailto:${lead.email}`}>{lead.email}</a> : "-"}
                          </td>

                          <td className="max-w-[150px] px-4 py-3 font-semibold text-slate-600">
                            <span className="line-clamp-2">{lead.tax_income || "-"}</span>
                          </td>

                          <td className="whitespace-nowrap px-4 py-3 font-semibold text-slate-600">{lead.city || "-"}</td>
                          <td className="px-4 py-3"><CategoryBadge category={lead.eligibility_category} /></td>

                          <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                            {isAdmin ? (
                              <select
                                value={lead.assigned_to || ""}
                                onChange={(e) => quickUpdateLead(lead, "assigned_to", e.target.value)}
                                className="w-32 rounded-xl border border-slate-200 bg-white px-2 py-1.5 text-xs font-bold outline-none focus:border-violet-500"
                              >
                                <option value="">Non assigné</option>
                                {ASSOCIATES.map((name) => <option key={name} value={name}>{name}</option>)}
                              </select>
                            ) : (
                              <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-black text-violet-700">{lead.assigned_to || "-"}</span>
                            )}
                          </td>

                          <td className="px-4 py-3">
                            <StatusBadge status={lead.call_status} />
                          </td>

                          <td className={`whitespace-nowrap px-4 py-3 font-bold ${lead.reminder_date && lead.reminder_date < today && lead.call_status !== "termine" ? "text-red-600" : "text-slate-500"}`}>
                            {lead.reminder_date ? new Date(lead.reminder_date).toLocaleDateString("fr-FR") : "-"}
                          </td>

                          <td className="whitespace-nowrap px-4 py-3 font-bold text-slate-400">
                            {lead.created_at ? new Date(lead.created_at).toLocaleDateString("fr-FR") : "-"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}

function PipelineView({ leads, setSelectedLead, onQuickUpdate, isAdmin }) {
  return (
    <div className="grid gap-4 lg:grid-cols-4">
      {PIPELINE_COLUMNS.map((column) => {
        const columnLeads = leads.filter((lead) => {
          if (column.key === "a_appeler") {
            return !lead.call_status || lead.call_status === "a_appeler";
          }
          return lead.call_status === column.key;
        });

        return (
          <div key={column.key} className="rounded-[1.5rem] bg-white p-4 shadow-sm ring-1 ring-slate-100">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-black text-[#08243a]">{column.title}</h3>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-600">{columnLeads.length}</span>
            </div>

            <div className="space-y-3">
              {columnLeads.length === 0 ? (
                <div className="rounded-2xl bg-slate-50 p-4 text-sm font-bold text-slate-400">Aucun lead</div>
              ) : (
                columnLeads.map((lead) => (
                  <div key={lead.id} onClick={() => setSelectedLead(lead)} className="cursor-pointer rounded-2xl border border-slate-100 p-4 transition hover:border-violet-200 hover:bg-violet-50">
                    <p className="font-black text-[#08243a]">{lead.full_name || "Sans nom"}</p>
                    <p className="mt-1 text-sm font-bold text-slate-500">{lead.phone || "-"}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <CategoryBadge category={lead.eligibility_category} />
                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-black text-slate-600">{lead.assigned_to || "Non assigné"}</span>
                    </div>

                    {isAdmin && (
                      <select
                        value={lead.call_status || "a_appeler"}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => onQuickUpdate(lead, "call_status", e.target.value)}
                        className="mt-3 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold outline-none focus:border-violet-500"
                      >
                        {Object.entries(STATUS_LABELS).map(([key, label]) => (
                          <option key={key} value={key}>{label}</option>
                        ))}
                      </select>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function LeadDetailsPage({ lead, onBack, onChange, onSave, onQuickUpdate, statusLabels, statusStyles, associates, currentUser }) {

  const isAdmin = currentUser?.role === "admin";

  if (!lead) {

    return null;

  }
  return (
    <main className="min-h-screen bg-[#f7f8ff] px-4 py-6">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <button onClick={onBack} className="rounded-2xl bg-white px-5 py-3 font-black text-slate-600 shadow">← Retour aux leads</button>
          <button onClick={() => onSave(lead)} className="rounded-2xl bg-gradient-to-r from-violet-600 to-blue-600 px-8 py-4 font-black text-white shadow-lg">Sauvegarder</button>
        </div>

        <div className="rounded-[2rem] bg-white p-5 shadow-xl">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
            <div>
              <p className="font-black text-violet-700">Fiche lead</p>
              <h1 className="mt-1 text-3xl font-black text-[#08243a] md:text-4xl">{lead.full_name || "Sans nom"}</h1>
              <div className="mt-3 flex flex-wrap gap-2">
                <CategoryBadge category={lead.eligibility_category} />
                <StatusBadge status={lead.call_status} />
                <span className="rounded-full bg-violet-50 px-3 py-1 text-sm font-black text-violet-700">{lead.assigned_to || "Non assigné"}</span>
              </div>
            </div>
          </div>

          <div className="mt-5 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
            <InfoBox label="Téléphone" value={lead.phone} isPhone />
            <InfoBox label="Email" value={lead.email} isEmail />
            <InfoBox label="Code postal" value={lead.city} />
            <InfoBox label="Personnes" value={lead.household_size} />
            <InfoBox label="Revenus" value={lead.tax_income} />
            <InfoBox label="Catégorie" value={lead.eligibility_category} />
            <InfoBox label="Statut logement" value={lead.owner_status} />
            <InfoBox label="Type logement" value={lead.housing_type} />
            <InfoBox label="Chauffage" value={lead.heating_type} />
            <InfoBox label="Facture chauffage" value={lead.heating_bill} />
            <InfoBox label="Contact souhaité" value={lead.wants_contact} />
            <InfoBox label="Créé le" value={lead.created_at ? new Date(lead.created_at).toLocaleDateString("fr-FR") : "-"} />
            <InfoBox label="Date préférée" value={lead.preferred_date} />
            <InfoBox label="Heure préférée" value={lead.preferred_time} />
            <InfoBox label="Dernier appel" value={lead.last_called_at ? new Date(lead.last_called_at).toLocaleDateString("fr-FR") : "-"} />
          </div>

          <div className="mt-5 grid gap-3 text-sm md:grid-cols-3">
            <div>
              <label className="font-black text-[#08243a]">Assigné à</label>
              {isAdmin ? (
                <select value={lead.assigned_to || ""} onChange={(e) => onChange(lead.id, "assigned_to", e.target.value)} className="mt-2 w-full rounded-2xl border-2 border-slate-200 p-3 font-bold outline-none focus:border-violet-500">
                  <option value="">Non assigné</option>
                  {associates.map((name) => <option key={name} value={name}>{name}</option>)}
                </select>
              ) : (
                <div className="mt-2 rounded-2xl bg-slate-50 p-3 font-black text-slate-500">{lead.assigned_to || "-"}</div>
              )}
            </div>

            <div>
              <label className="font-black text-[#08243a]">Statut d’appel</label>
              <select value={lead.call_status || "a_appeler"} onChange={(e) => onChange(lead.id, "call_status", e.target.value)} className="mt-2 w-full rounded-2xl border-2 border-slate-200 p-3 font-bold outline-none focus:border-violet-500">
                {Object.entries(statusLabels).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
              </select>
            </div>

            <div>
              <label className="font-black text-[#08243a]">Date de rappel</label>
              <input type="date" value={lead.reminder_date || ""} onChange={(e) => onChange(lead.id, "reminder_date", e.target.value)} className="mt-2 block w-full min-w-0 max-w-full appearance-none rounded-2xl border-2 border-slate-200 bg-white p-3 font-bold outline-none focus:border-violet-500" />
            </div>
          </div>

          <div className="mt-5">
            <label className="font-black text-[#08243a]">Notes internes</label>
            <textarea value={lead.internal_note || ""} onChange={(e) => onChange(lead.id, "internal_note", e.target.value)} placeholder="Ex : client intéressé, rappeler demain, demande devis, hésitation..." className="mt-2 min-h-28 w-full rounded-2xl border-2 border-slate-200 p-4 font-semibold outline-none focus:border-violet-500" />
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            {Object.entries(statusLabels).map(([key, label]) => (
              <button
                key={key}
                onClick={() => onQuickUpdate(lead, "call_status", key)}
                className={`rounded-full px-4 py-2 text-sm font-black ${statusStyles[key] || "bg-slate-100 text-slate-600"}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

function StatCard({ label, value, danger = false }) {
  return (
    <div className={`rounded-2xl bg-white p-4 shadow-sm ring-1 ${danger ? "ring-red-100" : "ring-slate-100"}`}>
      <p className="text-xs font-black uppercase tracking-wide text-slate-400">{label}</p>
      <p className={`mt-1 text-3xl font-black ${danger ? "text-red-600" : "text-[#08243a]"}`}>{value}</p>
    </div>
  );
}

function StatusBadge({ status }) {
  return (
    <span className={`inline-flex max-w-[170px] rounded-full px-2.5 py-1 text-xs font-black ${STATUS_STYLES[status] || "bg-slate-100 text-slate-600"}`}>
      {STATUS_LABELS[status] || "À appeler"}
    </span>
  );
}

function CategoryBadge({ category }) {
  const map = {
    tres_modeste: { label: "Très modeste", className: "bg-purple-100 text-purple-700" },
    modeste: { label: "Modeste", className: "bg-blue-100 text-blue-700" },
    intermediaire: { label: "Intermédiaire", className: "bg-yellow-100 text-yellow-700" },
    aise: { label: "Aisé", className: "bg-slate-100 text-slate-700" },
  };

  const item = map[category] || { label: "Non classé", className: "bg-slate-100 text-slate-500" };

  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-black ${item.className}`}>{item.label}</span>;
}

function InfoBox({ label, value, isPhone = false, isEmail = false }) {
  return (
    <div className="rounded-xl bg-slate-50 p-3">
      <p className="text-[10px] font-black uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-1 break-words text-sm font-bold text-[#08243a]">
        {isPhone && value ? <a className="text-violet-700 hover:underline" href={`tel:${value}`}>{value}</a> : isEmail && value ? <a className="text-violet-700 hover:underline" href={`mailto:${value}`}>{value}</a> : value || "-"}
      </p>
    </div>
  );
}

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "", consent: false });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const isValid = form.name.trim().length >= 2
    && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    && form.message.trim().length >= 10
    && form.consent;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return;
    setSending(true);
    setError("");
    const { error: dbError } = await supabase.from("contact_messages").insert([{
      full_name: form.name,
      email: form.email,
      phone: form.phone || null,
      message: form.message,
      rgpd_consent: true,
      rgpd_consent_date: new Date().toISOString(),
    }]);
    setSending(false);
    if (dbError) {
      setError("Une erreur est survenue. Veuillez nous écrire directement à mikhaelmyara@gmail.com");
      return;
    }
    setSubmitted(true);
  };
  return (
    <main className="mx-auto max-w-7xl px-5 py-20">
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <p className="font-black text-violet-700">Contact</p>
          <h1 className="mt-3 text-5xl font-black">Parlons de votre projet</h1>
          <p className="mt-5 text-lg text-slate-600">Une question ? Envoyez-nous un message.</p>
          <div className="mt-10 space-y-5">
            <Info icon={<Phone />} text="+34 657 398 227" />
            <Info icon={<Mail />} text="mikhaelmyara@gmail.com" />
            <Info icon={<MapPin />} text="France / Espagne" />
          </div>
        </div>
      {submitted ? (
          <div className="flex items-center justify-center rounded-[2rem] bg-white p-8 shadow-xl">
            <div className="text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-blue-600 text-4xl text-white">✓</div>
              <h2 className="mt-6 text-2xl font-black text-[#08243a]">Message envoyé !</h2>
              <p className="mt-3 text-slate-600">Nous vous répondrons dans les plus brefs délais.</p>
            </div>
        
        
      </div>
      ) : (
        <form onSubmit={handleSubmit} className="rounded-[2rem] bg-white p-8 shadow-xl">
            <div className="grid gap-4">
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="rounded-2xl border-2 border-slate-200 p-4 font-bold outline-none focus:border-violet-500" placeholder="Nom complet *" required />
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="rounded-2xl border-2 border-slate-200 p-4 font-bold outline-none focus:border-violet-500" placeholder="Adresse email *" required />
              <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/[^0-9+\s]/g, "") })} inputMode="numeric" autoComplete="tel" className="rounded-2xl border-2 border-slate-200 p-4 font-bold outline-none focus:border-violet-500" placeholder="Téléphone (optionnel)" />
              <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="min-h-36 rounded-2xl border-2 border-slate-200 p-4 font-bold outline-none focus:border-violet-500" placeholder="Votre message *" required />
              <label className="flex cursor-pointer items-start gap-3">
                <input type="checkbox" checked={form.consent} onChange={(e) => setForm({ ...form, consent: e.target.checked })} className="mt-1 h-4 w-4 accent-violet-600" />
                <span className="text-sm font-semibold text-slate-500">
                  J'accepte que PrimUnion utilise mes données pour traiter ma demande, conformément à la <button type="button" onClick={() => window.location.hash = "privacy"} className="text-violet-600 underline">politique de confidentialité</button>. *
                </span>
              </label>
              {error && <p className="rounded-xl bg-red-50 p-3 text-sm font-bold text-red-600">{error}</p>}
              <button type="submit" disabled={!isValid || sending} className={`rounded-2xl py-4 font-black text-white transition ${isValid && !sending ? "bg-gradient-to-r from-violet-600 to-blue-600 shadow-lg" : "cursor-not-allowed bg-slate-200 text-slate-400"}`}>
                {sending ? "Envoi en cours…" : "Envoyer le message"}
              </button>
            </div>
          </form>
        )}
              </div>
    </main>
  );
}

function WhySection() {
  return (
    <section className="bg-gradient-to-br from-[#110b2e] via-[#18265f] to-[#08111f] px-5 py-20 text-white">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <div>
          <h2 className="text-4xl font-black md:text-5xl">Pourquoi passer par PrimUnion ?</h2>
          <p className="mt-4 text-xl font-bold">La garantie d’un accompagnement sérieux</p>
          <div className="mt-8 space-y-5 text-lg text-slate-200">
            {[
              "Bénéficiez d’aides possibles pour financer votre projet",
              "Une équipe disponible étape par étape",
              "Un parcours simple, rapide et adapté",
              "Des artisans et partenaires certifiés RGE",
            ].map((item) => (
              <div key={item} className="flex gap-4">
                <CheckCircle className="shrink-0 text-violet-300" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex h-80 items-center justify-center rounded-[2rem] bg-white/10 p-8 shadow-2xl">
          <div className="text-center">
            <div className="text-8xl">🏠</div>
            <p className="mt-5 text-2xl font-black">Installation & rénovation</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function PartnersSection() {
  const partners = [
    { name: "EDF", logo: "/logos/edf.png" },
    { name: "SynerCiel", logo: "/logos/synerciel.png" },
    { name: "CAPEB", logo: "/logos/capeb.png" },
    { name: "France Rénov", logo: "/logos/france-renov.png" },
    { name: "RTL", logo: "/logos/rtl.png" },
    { name: "ENGIE", logo: "/logos/engie.png" },
  ];

  return (
    <section className="bg-white px-5 py-20">
      <div className="mx-auto max-w-7xl text-center">
        <h2 className="text-4xl font-black text-[#08243a]">Nos partenaires</h2>
        <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-violet-600 to-blue-600" />

        <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
          {partners.map((partner) => (
            <div key={partner.name} className="flex h-32 items-center justify-center rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <img src={partner.logo} alt={partner.name} className="max-h-16 w-auto object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectStepsSection({ go }) {
  const steps = [
    { title: "Une offre claire", text: "Chaque maison est différente. Nous estimons vos travaux ainsi que les aides disponibles pour votre projet." },
    { title: "Des aides estimées", text: "PrimUnion sécurise vos aides CEE et MaPrimeRénov’ dès la signature du devis, avec une déduction immédiate sur le montant total de vos travaux." },
    { title: "Un suivi intégral", text: "PrimUnion vous accompagne de A à Z : rendez-vous téléphoniques, démarches administratives, suivi des primes, facturation et finalisation des travaux." },
    { title: "Une solution adaptée", text: "PrimUnion s’appuie sur un réseau de partenaires certifiés pour assurer la réception du chantier et garantir la conformité des travaux réalisés." },
  ];

  return (
    <section className="bg-[#f7f8ff] px-5 py-20">
      <div className="mx-auto max-w-7xl text-center">
        <h2 className="text-4xl font-black md:text-5xl">Votre projet de rénovation énergétique <span className="text-violet-600">clé en main</span></h2>
        <div className="mt-16 grid gap-8 md:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.title}>
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-blue-600 text-3xl font-black text-white">{index + 1}</div>
              <h3 className="mt-8 text-xl font-black">{step.title}</h3>
              <p className="mt-4 text-slate-600">{step.text}</p>
            </div>
          ))}
        </div>
        <button onClick={() => go("simulation")} className="mt-14 rounded-2xl bg-gradient-to-r from-violet-600 to-blue-600 px-10 py-4 font-black text-white">Démarrer mon projet →</button>
      </div>
    </section>
  );
}

function FranceMapSection() {
  return (
    <section className="bg-white px-5 py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="font-black uppercase tracking-wide text-violet-700">
            Présence nationale
          </p>

          <h2 className="mt-4 text-4xl font-black leading-tight text-[#08243a] md:text-5xl">
            PrimUnion accompagne des foyers partout en France
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Grâce à notre réseau de partenaires certifiés RGE, nous intervenons partout en France pour vous aider à concrétiser votre projet de rénovation énergétique, de l’estimation des aides jusqu’à l’installation.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="rounded-2xl border border-slate-100 bg-white p-4 text-center shadow-sm">
              <p className="text-3xl font-black text-violet-700">Toutes</p>
              <p className="text-sm font-bold text-slate-500">Les zones déjà accompagnées</p>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-white p-4 text-center shadow-sm">
              <p className="text-3xl font-black text-blue-700">100%</p>
              <p className="text-sm font-bold text-slate-500">France métropolitaine</p>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-white p-4 text-center shadow-sm">
              <p className="text-3xl font-black text-emerald-700">RGE</p>
              <p className="text-sm font-bold text-slate-500">Partenaires certifiés</p>
            </div>
          </div>

          <div className="mt-8 rounded-2xl bg-gradient-to-r from-violet-50 to-blue-50 p-5 font-semibold text-[#08243a]">
            Un réseau fiable de professionnels qualifiés pour des travaux en toute sérénité.
          </div>
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-xl">
          <img
            src="/france-map.png"
            alt="Carte de France PrimUnion"
            className="h-auto w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

function Card({ icon, title, text }) {
  return (
    <div className="rounded-[2rem] bg-white p-8 shadow-xl">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">{icon}</div>
      <h3 className="text-2xl font-black">{title}</h3>
      <p className="mt-3 text-slate-600">{text}</p>
    </div>
  );
}

function Info({ icon, text }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm">
      <div className="text-violet-700">{icon}</div>
      <p className="font-bold">{text}</p>
    </div>
  );
}

function LegalLayout({ go, badge, title, intro, children }) {
  return (
    <main className="bg-[#f7f8ff]">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#081d33] via-[#132b5c] to-[#140b2d] px-5 py-16 text-white">
        <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-violet-500/25 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-blue-500/25 blur-3xl" />
        <div className="relative mx-auto max-w-4xl">
          <button onClick={() => go("home")} className="text-sm font-bold text-violet-200 transition hover:text-white">← Retour à l'accueil</button>
          <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-violet-300/30 bg-white/10 px-4 py-1.5 text-sm font-bold text-violet-100">{badge}</p>
          <h1 className="mt-5 text-4xl font-black md:text-5xl">{title}</h1>
          {intro && <p className="mt-4 max-w-2xl text-lg text-slate-200">{intro}</p>}
        </div>
      </section>

      <section className="px-5 py-14">
        <div className="mx-auto max-w-4xl rounded-[2rem] bg-white p-7 shadow-xl ring-1 ring-black/5 md:p-12">
          <div className="space-y-9">{children}</div>
          <div className="mt-12 border-t border-slate-100 pt-6">
            <p className="text-sm font-semibold text-slate-400">
              Dernière mise à jour : {new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

function LegalBlock({ title, children }) {
  return (
    <div>
      <h2 className="text-xl font-black text-[#08243a] md:text-2xl">{title}</h2>
      <div className="mt-3 space-y-3 text-base leading-7 text-slate-600">{children}</div>
    </div>
  );
}

function LegalPage({ go }) {
  return (
<LegalLayout go={go} badge="Informations légales" title="Mentions légales" intro="Conformément à la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique (LCEN), voici les informations relatives à l'éditeur et à l'hébergeur du site primunion.vercel.app">      
<LegalBlock title="1. Éditeur du site">
        <p><strong>Raison sociale :</strong> PrimUnion — exploitation en nom propre</p>
        <p><strong>Responsable de la publication :</strong> Mikhael Myara</p>
        <p><strong>Adresse :</strong> France / Espagne</p>
        <p><strong>Email :</strong> mikhaelmyara@gmail.com</p>
        <p><strong>Téléphone :</strong> +34 657 398 227</p>
        <p className="mt-2 rounded-xl bg-blue-50 p-3 text-sm font-semibold text-blue-700">
          PrimUnion est une plateforme marketing de mise en relation dans le domaine de la rénovation énergétique. Elle n'intervient pas directement dans la réalisation des travaux mais oriente les particuliers vers des partenaires certifiés RGE.
        </p>
      </LegalBlock>
      
      <LegalBlock title="2. Hébergement"> 
        <p><strong>Hébergeur frontend :</strong> Vercel Inc., 340 Pine Street Suite 900, San Francisco, CA 94104, États-Unis. Site : vercel.com</p>
        <p><strong>Base de données :</strong> Supabase, Inc., 970 Toa Payoh North, #07-04, Singapore 318992. Données stockées sur des serveurs situés dans l'Union européenne (région eu-west-1). Site : supabase.com</p>
      </LegalBlock>

      <LegalBlock title="3. Activité">
        <p>PrimUnion propose :</p>
        <ul className="list-disc space-y-1 pl-6">
          <li>Un simulateur d'éligibilité aux aides à la rénovation énergétique (MaPrimeRénov', CEE) ;</li>
          <li>Une mise en relation entre particuliers et professionnels certifiés RGE ;</li>
          <li>Un accompagnement dans les démarches administratives liées à l'obtention d'aides.</li>
        </ul>
        <p>Les estimations produites par le simulateur sont <strong>indicatives</strong> et ne constituent pas un engagement contractuel. Les montants réels peuvent varier selon la situation individuelle, les plafonds en vigueur et les décisions des organismes compétents (ANAH, ADEME).</p>      </LegalBlock>

      <LegalBlock title="4. Propriété intellectuelle">
<p>L'ensemble des éléments constitutifs du site (textes, visuels, logo, architecture, code source) est protégé par le droit de la propriété intellectuelle français et international.</p>
        <p>Toute reproduction, représentation, modification, publication ou adaptation, totale ou partielle, sans autorisation écrite préalable de PrimUnion, est strictement interdite sous peine de poursuites judiciaires.</p>      </LegalBlock>

<LegalBlock title="5. Liens hypertextes">
        <p>Le site peut contenir des liens vers des sites tiers. PrimUnion ne saurait être responsable du contenu de ces sites, ni des pratiques de confidentialité qui y sont appliquées.</p>      </LegalBlock>

 <LegalBlock title="6. Limitation de responsabilité">
        <p>PrimUnion s'efforce d'assurer l'exactitude des informations diffusées sur le site. Cependant, PrimUnion ne saurait être tenu responsable :</p>
        <ul className="list-disc space-y-1 pl-6">
          <li>Des erreurs ou omissions dans le contenu ;</li>
          <li>Des interruptions temporaires d'accès au site ;</li>
          <li>Des décisions prises par l'utilisateur sur la base des estimations indicatives fournies ;</li>
          <li>De tout dommage résultant d'une intrusion frauduleuse d'un tiers ayant entraîné une modification des données.</li>
        </ul>      </LegalBlock>
        <LegalBlock title="7. Protection des données personnelles">
        <p>Le traitement des données personnelles collectées sur ce site est régi par la <button onClick={() => go("privacy")} className="font-black text-violet-700 underline">Politique de confidentialité</button> disponible sur ce site. PrimUnion respecte le Règlement Général sur la Protection des Données (RGPD — Règlement UE 2016/679) et la loi Informatique et Libertés n° 78-17 du 6 janvier 1978 modifiée.</p>
      </LegalBlock>

      <LegalBlock title="8. Cookies">
        <p>Ce site utilise des cookies et traceurs. Pour en savoir plus, consultez notre <button onClick={() => go("cookies")} className="font-black text-violet-700 underline">Politique de gestion des cookies</button>.</p>
      </LegalBlock>

      <LegalBlock title="9. Droit applicable et juridiction compétente">
        <p>Les présentes mentions légales sont régies par le droit français. En cas de litige, et après tentative de résolution amiable, les tribunaux français seront seuls compétents.</p>
      </LegalBlock>
    </LegalLayout>
  );
}

function PrivacyPage({ go }) {
  return (
    <LegalLayout go={go} badge="Vos données personnelles" title="Politique de confidentialité" intro="PrimUnion s'engage à protéger votre vie privée et à traiter vos données personnelles conformément au Règlement Général sur la Protection des Données (RGPD — UE 2016/679) et à la loi Informatique et Libertés.">

      <LegalBlock title="1. Responsable du traitement">
        <p><strong>Identité :</strong> Mikhael Myara, exploitant de PrimUnion</p>
        <p><strong>Email :</strong> mikhaelmyara@gmail.com</p>
        <p><strong>Téléphone :</strong> +34 657 398 227</p>
        <p className="mt-2 rounded-xl bg-violet-50 p-3 text-sm font-semibold text-violet-700">
          Pour toute demande relative à vos données personnelles, contactez-nous à l'adresse ci-dessus en précisant l'objet « Demande RGPD ».
        </p>
      </LegalBlock>

      <LegalBlock title="2. Données collectées et finalités">
        <p>Nous collectons vos données uniquement dans les cas suivants :</p>

        <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="p-3 text-left font-black text-slate-700">Données</th>
                <th className="p-3 text-left font-black text-slate-700">Finalité</th>
                <th className="p-3 text-left font-black text-slate-700">Base légale</th>
                <th className="p-3 text-left font-black text-slate-700">Durée</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="p-3 font-semibold">Nom, email, téléphone, code postal, composition du foyer, revenus fiscaux, informations logement</td>
                <td className="p-3 text-slate-600">Réalisation de la simulation d'éligibilité aux aides à la rénovation et prise de contact commerciale</td>
                <td className="p-3 text-slate-600">Consentement (art. 6.1.a RGPD) — case cochée obligatoire dans le formulaire</td>
                <td className="p-3 text-slate-600">3 ans à compter de la collecte, sauf demande de suppression anticipée</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Nom, email, téléphone (optionnel), message</td>
                <td className="p-3 text-slate-600">Traitement des demandes de contact envoyées via le formulaire</td>
                <td className="p-3 text-slate-600">Consentement (art. 6.1.a RGPD)</td>
                <td className="p-3 text-slate-600">1 an à compter de la dernière interaction</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Données de navigation (cookies analytiques / traceurs Meta Pixel)</td>
                <td className="p-3 text-slate-600">Mesure d'audience et optimisation des campagnes publicitaires Meta (Facebook/Instagram)</td>
                <td className="p-3 text-slate-600">Consentement (art. 6.1.a RGPD) — bandeau cookies</td>
                <td className="p-3 text-slate-600">13 mois maximum</td>
              </tr>
            </tbody>
          </table>
        </div>
      </LegalBlock>

      <LegalBlock title="3. Destinataires des données">
        <p>Vos données sont destinées exclusivement à :</p>
        <ul className="list-disc space-y-2 pl-6">
          <li><strong>L'équipe interne PrimUnion</strong> — pour le traitement de votre dossier et la prise de contact ;</li>
          <li><strong>Supabase, Inc.</strong> — prestataire d'hébergement de base de données. Les données sont hébergées sur des serveurs situés dans l'Union européenne (région eu-west). Supabase est conforme au RGPD. <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="text-violet-600 underline">Politique de confidentialité Supabase</a> ;</li>
          <li><strong>Meta Platforms Ireland Ltd.</strong> — uniquement si vous avez accepté les cookies analytiques. Les données transférées via le Meta Pixel sont régies par le Privacy Shield et les Clauses Contractuelles Types (CCT) approuvées par la Commission européenne ;</li>
          <li><strong>Partenaires installateurs RGE</strong> — votre dossier peut être transmis à des partenaires certifiés RGE pour établir un devis, uniquement avec votre accord exprès lors d'un échange téléphonique.</li>
        </ul>
        <p><strong>Vos données ne sont jamais vendues à des tiers.</strong></p>
      </LegalBlock>

      <LegalBlock title="4. Transferts hors Union européenne">
        <p>Vercel Inc. (hébergeur frontend) est une société américaine. Les transferts sont encadrés par les Clauses Contractuelles Types (CCT) de la Commission européenne et les dispositions du Data Privacy Framework UE-États-Unis.</p>
        <p>Meta Platforms Ireland Ltd. peut transférer des données aux États-Unis dans le cadre du Data Privacy Framework.</p>
        <p>Supabase héberge les données de vos formulaires exclusivement en Union européenne.</p>
      </LegalBlock>

      <LegalBlock title="5. Vos droits (RGPD)">
        <p>Conformément aux articles 15 à 22 du RGPD, vous disposez des droits suivants :</p>
        <ul className="list-disc space-y-2 pl-6">
          <li><strong>Droit d'accès</strong> — obtenir une copie de vos données personnelles ;</li>
          <li><strong>Droit de rectification</strong> — corriger des données inexactes ou incomplètes ;</li>
          <li><strong>Droit à l'effacement</strong> («&nbsp;droit à l'oubli&nbsp;») — demander la suppression de vos données ;</li>
          <li><strong>Droit d'opposition</strong> — vous opposer au traitement de vos données à des fins de prospection commerciale ;</li>
          <li><strong>Droit à la limitation du traitement</strong> — demander la suspension temporaire du traitement ;</li>
          <li><strong>Droit à la portabilité</strong> — recevoir vos données dans un format structuré et lisible par machine ;</li>
          <li><strong>Droit de retrait du consentement</strong> — retirer votre consentement à tout moment, sans que cela remette en cause la licéité du traitement effectué avant ce retrait.</li>
        </ul>
        <p className="mt-4 rounded-xl bg-green-50 p-4 font-semibold text-green-800">
          Pour exercer l'un de ces droits, écrivez à <strong>mikhaelmyara@gmail.com</strong> en indiquant l'objet « Demande RGPD » et en joignant une copie de votre pièce d'identité. Délai de réponse : 30 jours maximum.
        </p>
        <p>Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation auprès de la <strong>CNIL</strong> (Commission Nationale de l'Informatique et des Libertés) : <a href="https://www.cnil.fr/fr/plaintes" target="_blank" rel="noopener noreferrer" className="text-violet-600 underline">cnil.fr/fr/plaintes</a>.</p>
      </LegalBlock>

      <LegalBlock title="6. Cookies et traceurs">
        <p>Un traceur est toute technologie permettant d'accéder à des informations stockées sur votre terminal (cookies, pixels, local storage, etc.).</p>

        <p className="font-bold">Cookies strictement nécessaires (aucun consentement requis)</p>
        <ul className="list-disc space-y-1 pl-6">
          <li><code className="rounded bg-slate-100 px-1">primunion_cookie_consent</code> — mémorise votre choix de consentement aux cookies. Durée : 13 mois.</li>
        </ul>

        <p className="mt-3 font-bold">Cookies analytiques / publicitaires (consentement requis)</p>
        <ul className="list-disc space-y-1 pl-6">
          <li><strong>Meta Pixel (fbp, fbc)</strong> — traceur publicitaire permettant de mesurer l'efficacité des campagnes Meta (Facebook/Instagram) et d'optimiser le ciblage publicitaire. Chargé uniquement après votre consentement explicite. Durée : 90 jours. Émetteur : Meta Platforms Ireland Ltd.</li>
        </ul>

        <p className="mt-3">Vous pouvez à tout moment modifier vos préférences via le bouton <strong>« Gérer mes cookies »</strong> en bas de page, ou en supprimant les données de votre navigateur (paramètres &gt; confidentialité).</p>
      </LegalBlock>

      <LegalBlock title="7. Sécurité des données">
        <p>PrimUnion met en œuvre les mesures techniques et organisationnelles suivantes pour protéger vos données :</p>
        <ul className="list-disc space-y-1 pl-6">
          <li>Chiffrement des données en transit (HTTPS/TLS) ;</li>
          <li>Accès à la base de données restreint aux utilisateurs authentifiés via Supabase Auth ;</li>
          <li>Politique de contrôle d'accès (Row Level Security) sur la base de données ;</li>
          <li>Accès administrateur protégé par email + mot de passe ;</li>
          <li>Aucun stockage de données de paiement (aucune transaction financière sur ce site).</li>
        </ul>
      </LegalBlock>

      <LegalBlock title="8. Mineurs">
        <p>Ce site est destiné aux adultes (propriétaires ou locataires majeurs). PrimUnion ne collecte pas sciemment de données personnelles concernant des personnes de moins de 18 ans.</p>
      </LegalBlock>

      <LegalBlock title="9. Modifications de la politique">
        <p>PrimUnion se réserve le droit de modifier la présente politique de confidentialité à tout moment. La date de dernière mise à jour est indiquée en bas de ce document. En continuant à utiliser le site après une modification, vous acceptez la politique mise à jour.</p>
      </LegalBlock>
    </LegalLayout>
  );
}

function CookieBanner({ onAccept, onRefuse, go }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-[#081d33]/97 px-5 py-5 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex-1">
          <p className="font-black text-white">🍪 Gestion des cookies</p>
          <p className="mt-1 text-sm font-semibold text-slate-300">
            Ce site utilise le Meta Pixel (traceur publicitaire) pour mesurer l'efficacité de nos campagnes. Ces cookies ne seront activés qu'avec votre consentement.{" "}
            <button onClick={() => go("cookies")} className="text-violet-300 underline">En savoir plus</button>
          </p>
        </div>
        <div className="flex shrink-0 gap-3">
          <button onClick={onRefuse} className="rounded-2xl border border-white/20 px-6 py-3 text-sm font-black text-white transition hover:bg-white/10">
            Refuser
          </button>
          <button onClick={onAccept} className="rounded-2xl bg-gradient-to-r from-violet-600 to-blue-600 px-6 py-3 text-sm font-black text-white shadow-lg transition hover:brightness-110">
            Accepter les cookies
          </button>
        </div>
      </div>
    </div>
  );
}

function CguPage({ go }) {
  return (
    <LegalLayout go={go} badge="Conditions d'utilisation" title="Conditions Générales d'Utilisation" intro="Les présentes Conditions Générales d'Utilisation (CGU) régissent l'accès et l'utilisation du site PrimUnion. En utilisant ce site, vous acceptez les présentes CGU sans réserve.">

      <LegalBlock title="1. Objet">
        <p>PrimUnion est un service en ligne gratuit permettant aux particuliers résidant en France métropolitaine d'évaluer leur éligibilité aux aides à la rénovation énergétique (MaPrimeRénov', CEE, aides locales) et d'être mis en relation avec des professionnels certifiés RGE.</p>
        <p className="rounded-xl bg-orange-50 p-3 text-sm font-semibold text-orange-800">
          ⚠️ PrimUnion est une plateforme marketing de mise en relation. Elle ne garantit pas l'obtention des aides citées, qui dépendent de critères définis par l'ANAH et l'ADEME. Les montants affichés sont des estimations indicatives.
        </p>
      </LegalBlock>

      <LegalBlock title="2. Accès au service">
        <p>L'accès au simulateur est gratuit, sans inscription préalable, et ouvert à toute personne majeure résidant en France. Le service est disponible 24h/24 et 7j/7, sous réserve d'interruptions pour maintenance.</p>
        <p>PrimUnion se réserve le droit de modifier, suspendre ou interrompre tout ou partie du service à tout moment sans préavis.</p>
      </LegalBlock>

      <LegalBlock title="3. Utilisation du simulateur">
        <p>Le simulateur est conçu pour fournir une estimation personnalisée de vos droits aux aides à la rénovation énergétique. En l'utilisant, vous vous engagez à :</p>
        <ul className="list-disc space-y-1 pl-6">
          <li>Fournir des informations exactes et sincères ;</li>
          <li>Ne pas utiliser le service à des fins frauduleuses ou contraires à l'ordre public ;</li>
          <li>Ne pas tenter de pirater, altérer ou surcharger les infrastructures du service ;</li>
          <li>Ne pas utiliser le service pour collecter des informations sur d'autres utilisateurs.</li>
        </ul>
      </LegalBlock>

      <LegalBlock title="4. Nature des estimations">
        <p>Les montants d'aides affichés sont calculés sur la base des barèmes en vigueur au moment de la simulation (barème MaPrimeRénov' 2025). Ils ne constituent en aucun cas :</p>
        <ul className="list-disc space-y-1 pl-6">
          <li>Un engagement de la part de PrimUnion, de l'ANAH, de l'ADEME ou de tout autre organisme ;</li>
          <li>Un contrat ou une promesse de prestation ;</li>
          <li>Un conseil juridique ou fiscal.</li>
        </ul>
        <p>L'obtention effective des aides est conditionnée à la conformité de votre dossier aux exigences des organismes attributeurs.</p>
      </LegalBlock>

      <LegalBlock title="5. Données personnelles">
        <p>La collecte et le traitement de vos données personnelles sont régis par notre <button onClick={() => go("privacy")} className="font-black text-violet-700 underline">Politique de confidentialité</button>. En soumettant vos informations via le simulateur, vous consentez expressément au traitement de vos données aux fins décrites dans cette politique.</p>
      </LegalBlock>

      <LegalBlock title="6. Propriété intellectuelle">
        <p>Tous les droits de propriété intellectuelle relatifs au site, aux outils, aux contenus et à la marque PrimUnion sont réservés. Aucune reproduction, même partielle, n'est autorisée sans accord écrit préalable.</p>
      </LegalBlock>

      <LegalBlock title="7. Responsabilité">
        <p>PrimUnion ne saurait être tenu responsable :</p>
        <ul className="list-disc space-y-1 pl-6">
          <li>Du refus ou de la réduction d'une aide par les organismes compétents ;</li>
          <li>Des actions ou omissions des partenaires installateurs RGE ;</li>
          <li>De toute perte financière liée à une décision prise sur la base des estimations indicatives ;</li>
          <li>Des interruptions techniques du service.</li>
        </ul>
      </LegalBlock>

      <LegalBlock title="8. Modification des CGU">
        <p>PrimUnion se réserve le droit de modifier les présentes CGU à tout moment. La poursuite de l'utilisation du site après modification vaut acceptation des nouvelles CGU. La date de mise à jour est indiquée ci-dessous.</p>
      </LegalBlock>

      <LegalBlock title="9. Droit applicable">
        <p>Les présentes CGU sont soumises au droit français. Tout litige sera soumis à la juridiction des tribunaux français compétents, après tentative de résolution amiable.</p>
        <p>En cas de litige de consommation, vous pouvez recourir à la médiation conformément à l'article L.616-1 du Code de la consommation ou à la plateforme européenne de règlement en ligne des litiges : <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-violet-600 underline">ec.europa.eu/consumers/odr</a>.</p>
      </LegalBlock>
    </LegalLayout>
  );
}

function CookiesPage({ go }) {
  const currentConsent = localStorage.getItem("primunion_cookie_consent");

  const handleReset = () => {
    localStorage.removeItem("primunion_cookie_consent");
    window.location.reload();
  };

  return (
    <LegalLayout go={go} badge="Gestion des cookies" title="Politique de gestion des cookies" intro="Cette page vous informe sur les cookies et traceurs utilisés sur PrimUnion et vous permet de gérer vos préférences conformément à la réglementation RGPD et aux recommandations de la CNIL.">

      <LegalBlock title="1. Qu'est-ce qu'un cookie ?">
        <p>Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, smartphone, tablette) lors de votre visite sur un site web. Il permet au site de mémoriser certaines informations comme vos préférences ou votre parcours de navigation.</p>
        <p>Les traceurs englobent aussi les pixels espions, le stockage local (localStorage), les empreintes de navigateur, etc.</p>
      </LegalBlock>

      <LegalBlock title="2. Cookies utilisés sur PrimUnion">
        <div className="overflow-hidden rounded-2xl border border-slate-200">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="p-3 text-left font-black text-slate-700">Nom</th>
                <th className="p-3 text-left font-black text-slate-700">Type</th>
                <th className="p-3 text-left font-black text-slate-700">Finalité</th>
                <th className="p-3 text-left font-black text-slate-700">Durée</th>
                <th className="p-3 text-left font-black text-slate-700">Consentement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="p-3"><code className="rounded bg-slate-100 px-1 text-xs">primunion_cookie_consent</code></td>
                <td className="p-3 text-slate-600">Fonctionnel</td>
                <td className="p-3 text-slate-600">Mémoriser votre choix de consentement cookies</td>
                <td className="p-3 text-slate-600">13 mois</td>
                <td className="p-3"><span className="rounded-full bg-green-100 px-2 py-1 text-xs font-black text-green-700">Non requis</span></td>
              </tr>
              <tr>
                <td className="p-3"><code className="rounded bg-slate-100 px-1 text-xs">_fbp</code>, <code className="rounded bg-slate-100 px-1 text-xs">_fbc</code></td>
                <td className="p-3 text-slate-600">Publicitaire (Meta)</td>
                <td className="p-3 text-slate-600">Mesure des conversions et ciblage publicitaire sur Facebook/Instagram</td>
                <td className="p-3 text-slate-600">90 jours</td>
                <td className="p-3"><span className="rounded-full bg-orange-100 px-2 py-1 text-xs font-black text-orange-700">Requis</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </LegalBlock>

      <LegalBlock title="3. Gérer vos préférences">
        <p>Votre choix actuel : <strong className={currentConsent === "accepted" ? "text-green-600" : currentConsent === "refused" ? "text-red-600" : "text-slate-500"}>
          {currentConsent === "accepted" ? "Cookies publicitaires acceptés" : currentConsent === "refused" ? "Cookies publicitaires refusés" : "Aucun choix enregistré"}
        </strong></p>

        <button onClick={handleReset} className="mt-4 rounded-2xl border-2 border-violet-600 px-6 py-3 font-black text-violet-700 transition hover:bg-violet-50">
          Réinitialiser mes préférences de cookies
        </button>
        <p className="mt-2 text-sm text-slate-500">Cela rechargera la page et affichera à nouveau le bandeau de consentement.</p>
      </LegalBlock>

      <LegalBlock title="4. Désactiver les cookies via votre navigateur">
        <p>Vous pouvez également configurer votre navigateur pour bloquer les cookies :</p>
        <ul className="list-disc space-y-1 pl-6">
          <li><strong>Chrome :</strong> Paramètres &gt; Confidentialité et sécurité &gt; Cookies</li>
          <li><strong>Firefox :</strong> Options &gt; Vie privée et sécurité &gt; Protection renforcée</li>
          <li><strong>Safari :</strong> Préférences &gt; Confidentialité &gt; Bloquer tous les cookies</li>
          <li><strong>Edge :</strong> Paramètres &gt; Cookies et autorisations de site</li>
        </ul>
        <p>Attention : le blocage de certains cookies peut affecter le fonctionnement du site.</p>
      </LegalBlock>

      <LegalBlock title="5. Opposition au Meta Pixel">
        <p>Pour vous opposer spécifiquement au traceur Meta Pixel, vous pouvez :</p>
        <ul className="list-disc space-y-1 pl-6">
          <li>Utiliser l'outil de désactivation de Meta : <a href="https://www.facebook.com/help/568137493302217" target="_blank" rel="noopener noreferrer" className="text-violet-600 underline">facebook.com/help/568137493302217</a> ;</li>
          <li>Installer l'extension navigateur Facebook Pixel Helper Opt-Out ;</li>
          <li>Refuser les cookies publicitaires via notre bandeau.</li>
        </ul>
      </LegalBlock>

      <LegalBlock title="6. Contact">
        <p>Pour toute question relative aux cookies : <strong>mikhaelmyara@gmail.com</strong></p>
        <p>Autorité de contrôle : <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-violet-600 underline">CNIL — cnil.fr</a></p>
      </LegalBlock>
    </LegalLayout>
  );
}


function Footer({ go }) {
  return (
    <footer className="bg-[#081d33] px-5 py-12 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-8 md:flex-row">
          <div className="max-w-sm">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-blue-500 text-xl font-black text-white">P</div>
              <p className="text-2xl font-black">PrimUnion</p>
            </div>
            <p className="mt-3 text-slate-400">
  Plateforme marketing rénovation énergétique.<br />
  Partenaires et installateurs certifiés RGE.
</p>
          </div>

          <div className="flex flex-col gap-3 font-bold text-slate-300">
            <p className="text-sm uppercase tracking-wide text-slate-500">Navigation</p>
            <button onClick={() => go("admin")} className="text-left text-slate-500 transition hover:text-white">Espace partenaire</button>
            <button onClick={() => go("home")} className="text-left transition hover:text-white">Accueil</button>
            <button onClick={() => go("simulation")} className="text-left transition hover:text-white">Simulation</button>
            <button onClick={() => go("contact")} className="text-left transition hover:text-white">Contact</button>
          </div>

          <div className="flex flex-col gap-3 font-bold text-slate-300">
            <p className="text-sm uppercase tracking-wide text-slate-500">Informations légales</p>
            <button onClick={() => go("legal")} className="text-left transition hover:text-white">Mentions légales</button>
            <button onClick={() => go("privacy")} className="text-left transition hover:text-white">Politique de confidentialité</button>
            <button onClick={() => go("cgu")} className="text-left transition hover:text-white">CGU</button>
            <button onClick={() => go("cookies")} className="text-left transition hover:text-white">Gestion des cookies</button>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-slate-500">
          © 2018 – 2026 PrimUnion. Tous droits réservés.
           <span className="mx-2">·</span>
          <button onClick={() => go("privacy")} className="transition hover:text-slate-300">Confidentialité</button>
          <span className="mx-2">·</span>
          <button onClick={() => go("cgu")} className="transition hover:text-slate-300">CGU</button>
          <span className="mx-2">·</span>
          <button onClick={() => go("cookies")} className="transition hover:text-slate-300">Cookies</button>
        </div>
      </div>
    </footer>
  );
}
