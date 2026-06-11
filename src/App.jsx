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

/*
  IMPORTANT :
  Remplace les emails ci-dessous par les vrais emails Supabase de vos 3 comptes.
  Mikhael = admin : voit tout
  Josh / David = associés : voient principalement leurs leads
*/
const ADMIN_USERS = {
  "mikhaelmyara@gmail.com": { name: "Mikhael", role: "admin" },
  "yeoshouahaddad@yahoo.com": { name: "Josh", role: "admin" },
  "davidmyara12@gmail.com": { name: "David", role: "admin" },
};

const ASSOCIATES = ["Josh", "Mikhael", "David"];

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

  const go = (target) => {
    setPage(target);
    setMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-[#f7f8ff] text-slate-950">
      <Navbar page={page} go={go} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      {page === "home" && <HomePage go={go} />}
      {page === "simulation" && <SimulationPage go={go} />}
      {page === "admin" && <AdminPage />}
      {page === "contact" && <ContactPage />}
      {page === "legal" && <LegalPage go={go} />}
      {page === "privacy" && <PrivacyPage go={go} />}

      <Footer go={go} />
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
              Bénéficiez d'une
              <br />
              <span className="bg-gradient-to-r from-violet-300 to-blue-300 bg-clip-text text-transparent">pompe à chaleur</span>
            </h1>

            <div className="mt-8 space-y-4 text-xl font-semibold text-slate-200">
              <p>✅ Dispositif sécurisé par MaPrimeRénov'</p>
              <p>✅ Jusqu'à 17 000€ d'aides</p>
              <p>✅ Divisez par 3 vos factures de chauffage</p>
              <p>✅ Professionnels certifiés RGE</p>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-2 sm:gap-4">
              {[["17 000€", "Aides max."], ["2 min", "Simulation"], ["100%", "Gratuit"]].map(([big, small]) => (
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
      <ReviewsSection />

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
  const [data, setData] = useState({ household_size: 1, full_name: "", email: "", phone: "", preferred_date: "", preferred_time: "" });

  const current = steps[step];
  const selected = data[current.key];
  const progress = Math.round(((step + 1) / steps.length) * 100);
  const isPostalCodeValid = /^[0-9]{5}$/.test(data.city || "");
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email || "");
  const isPhoneValid = /^(?:(?:\+33|0033)[1-9](?:\d{2}){4}|0[1-9](?:\d{2}){4})$/.test((data.phone || "").replace(/\s/g, ""));
  const isContactValid = data.full_name.trim().length >= 2 && isEmailValid && isPhoneValid;
  const isAppointmentValid = data.preferred_date && data.preferred_time;
  const canContinue = current.type === "input" ? isPostalCodeValid : current.type === "contact" ? isContactValid : current.type === "appointment" ? isAppointmentValid : true;

  const submitLead = async (finalData = data) => {
    const eligibility = getEligibilityCategory(finalData);
    const finalLead = {
      ...finalData,
      preferred_date: finalData.preferred_date || null,
      preferred_time: finalData.preferred_time || null,
      call_status: finalData.wants_contact === "Non" ? "ne_veut_pas_etre_contacte" : "a_appeler",
    };

    const { error } = await supabase.from("leads").insert([{ ...finalLead, ...eligibility, household_size: String(finalData.household_size) }]);

    if (error) {
      console.error(error);
      alert(error.message);
      return;
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
          <span className="flex items-center gap-2"><ShieldCheck size={16} className="text-violet-300" /> 100% gratuit</span>
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
    return leads.filter((lead) => lead.assigned_to === currentUser.name);
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
            <Info icon={<MapPin />} text="France/Espagne" />
          </div>
        </div>

        <form className="rounded-[2rem] bg-white p-8 shadow-xl">
          <div className="grid gap-4">
            <input className="rounded-2xl border p-4" placeholder="Nom complet" />
            <input className="rounded-2xl border p-4" placeholder="Email" />
            <input type="tel" inputMode="numeric" autoComplete="tel" className="rounded-2xl border p-4" placeholder="Téléphone" />
            <textarea className="min-h-36 rounded-2xl border p-4" placeholder="Message" />
            <button className="rounded-2xl bg-gradient-to-r from-violet-600 to-blue-600 py-4 font-black text-white">Envoyer</button>
          </div>
        </form>
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
              "98,8% de nos clients sont satisfaits",
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

function ReviewsSection() {
  const reviews = [
    ["V", "Viviane F.", "Très satisfaite de la simulation. L’équipe est professionnelle et réactive. Je recommande vivement PrimUnion pour tous vos projets de rénovation."],
    ["M", "Lang J.", "Service impeccable du début à la fin. Contact super réactif et explications claires."],
    ["D", "Dalil A.", "Une semaine de la simulation à l’installation, tout s’est bien déroulé."],
  ];

  return (
    <section className="bg-slate-50 px-5 py-20">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-4xl font-black">Ce que nos clients pensent de nous :</h2>
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {reviews.map(([letter, name, text]) => (
            <div key={name} className="rounded-[2rem] bg-white p-8 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-blue-600 text-xl font-black text-white">{letter}</div>
                <div>
                  <p className="font-black">{name}</p>
                  <p className="text-yellow-400">★★★★★</p>
                </div>
              </div>
              <p className="mt-6 text-lg text-slate-600">{text}</p>
            </div>
          ))}
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
    <LegalLayout go={go} badge="Informations légales" title="Mentions légales" intro="Conformément à la loi pour la confiance dans l'économie numérique (LCEN), voici les informations relatives à l'éditeur et à l'hébergeur de ce site.">
      <LegalBlock title="1. Éditeur du site">
        <p>Le site PrimUnion est édité par <strong>Mikhael Myara</strong>.</p>
        <p>Contact : Mikhael Myara — mikhaelmyara@gmail.com — +34 657 398 227.</p>
      </LegalBlock>

      <LegalBlock title="2. Hébergeur">
        <p>Le site est hébergé par <strong>Vercel Inc.</strong>, 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.</p>
      </LegalBlock>

      <LegalBlock title="3. Activité">
        <p>PrimUnion est une plateforme de mise en relation et d'information dans le domaine de la rénovation énergétique.</p>
      </LegalBlock>

      <LegalBlock title="4. Propriété intellectuelle">
        <p>L'ensemble des contenus présents sur ce site est protégé par le droit de la propriété intellectuelle.</p>
      </LegalBlock>

      <LegalBlock title="5. Responsabilité">
        <p>Les estimations fournies par le simulateur sont données à titre indicatif.</p>
      </LegalBlock>

      <LegalBlock title="6. Droit applicable">
        <p>Les présentes mentions légales sont régies par le droit français.</p>
      </LegalBlock>
    </LegalLayout>
  );
}

function PrivacyPage({ go }) {
  return (
    <LegalLayout go={go} badge="Vos données personnelles" title="Politique de confidentialité" intro="PrimUnion accorde une grande importance à la protection de vos données.">
      <LegalBlock title="1. Responsable du traitement">
        <p>Le responsable du traitement des données est <strong>Mikhael Myara</strong>. Contact : mikhaelmyara@gmail.com</p>
      </LegalBlock>
      <LegalBlock title="2. Données collectées">
        <ul className="list-disc space-y-1 pl-6">
          <li>identité : nom, prénom ;</li>
          <li>coordonnées : email, téléphone, code postal ;</li>
          <li>informations logement et foyer.</li>
        </ul>
      </LegalBlock>
      <LegalBlock title="3. Finalités">
        <p>Vos données servent à réaliser votre simulation et à vous recontacter si vous l'acceptez.</p>
      </LegalBlock>
      <LegalBlock title="4. Vos droits">
        <p>Vous disposez d'un droit d'accès, de rectification, d'effacement, d'opposition et de portabilité.</p>
      </LegalBlock>
      <LegalBlock title="5. Sécurité">
        <p>PrimUnion met en œuvre des mesures de protection appropriées.</p>
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
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-slate-500">
          © 2018 – 2026 PrimUnion. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
