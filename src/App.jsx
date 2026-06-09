import { supabase } from "./lib/supabase";
import { useEffect, useState } from "react";
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
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-blue-500 text-xl font-black text-white">
            P
          </div>
          <p className="text-2xl font-black">PrimUnion</p>
        </button>

        <div className="hidden items-center gap-8 font-semibold lg:flex">
          
          <button onClick={() => go("home")} className={page === "home" ? "text-violet-300" : ""}>
            Accueil
          </button>
          <button onClick={() => go("simulation")} className={page === "simulation" ? "text-violet-300" : ""}>
            Simulation
          </button>
          <button onClick={() => go("contact")} className={page === "contact" ? "text-violet-300" : ""}>
            Contact
          </button>
          
        </div>

        <button
          onClick={() => go("simulation")}
          className="hidden rounded-full bg-gradient-to-r from-violet-600 to-blue-600 px-6 py-3 font-black text-white shadow-lg lg:block"
        >
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
              <span className="bg-gradient-to-r from-violet-300 to-blue-300 bg-clip-text text-transparent">
                pompe à chaleur
              </span>
            </h1>

            <div className="mt-8 space-y-4 text-xl font-semibold text-slate-200">
              <p>✅ Dispositif sécurisé par MaPrimeRénov'</p>
              <p>✅ Jusqu'à 17 000€ d'aides</p>
              <p>✅ Divisez par 3 vos factures de chauffage</p>
              <p>✅ Professionnels certifiés RGE</p>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-2 sm:gap-4">
              {[
  ["17 000€", "Aides max."],
  ["2 min", "Simulation"],
  ["100%", "Gratuit"],
].map(([big, small]) => (
                <div key={big} className="min-w-0 rounded-2xl bg-white/10 p-3 text-center backdrop-blur sm:p-5">
                  <p className="break-words text-2xl font-black leading-tight sm:text-3xl">{big}</p>
                  <p className="text-sm text-slate-300">{small}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mx-auto w-full max-w-[620px] rounded-[2rem] bg-white/10 p-8 shadow-2xl backdrop-blur-xl">
  <div className="rounded-[1.7rem] bg-white p-8 text-slate-950">
    <p className="text-sm font-black uppercase text-violet-600">
      Simulation gratuite
    </p>

    <h2 className="mt-3 text-4xl font-black text-[#08243a]">
      Découvrez vos aides en quelques clics
    </h2>

    <p className="mt-5 text-lg leading-8 text-slate-600">
      Répondez à quelques questions sur votre logement et recevez une estimation adaptée à votre situation.
    </p>

    <button
      onClick={() => go("simulation")}
      className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-blue-600 py-4 font-black text-white"
    >
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
        <h2 className="text-3xl font-black md:text-4xl">
          Testez votre éligibilité et découvrez vos aides
        </h2>
        <button
          onClick={() => go("simulation")}
          className="mt-8 rounded-full bg-white px-10 py-4 font-black text-violet-700"
        >
          Simuler votre éligibilité →
        </button>
      </section>
    </>
  );
}

function MiniSimulationCard({ go }) {
  return (
    <div className="mx-auto w-full max-w-[690px] rounded-[1.8rem] bg-white p-6 text-slate-950 shadow-2xl md:p-8">
      <h2 className="text-center text-2xl font-black text-[#08243a]">
        Calculer le montant de vos primes
      </h2>

      <div className="mt-6 flex items-center justify-center gap-3">
        {["🏠", "🏡", "⚡", "📄", "📍", "👤"].map((icon, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full text-lg ${
                index === 0 ? "bg-[#08243a] text-white ring-4 ring-slate-200" : "bg-slate-100"
              }`}
            >
              {icon}
            </div>
            {index < 5 && <div className="hidden h-1 w-8 rounded-full bg-slate-200 md:block" />}
          </div>
        ))}
      </div>

      <div className="mt-6 h-2 rounded-full bg-slate-100">
        <div className="h-full w-[12%] rounded-full bg-gradient-to-r from-violet-600 to-blue-600" />
      </div>

      <p className="mt-3 text-right text-sm font-bold text-slate-400">Étape 1 / 9</p>

      <h3 className="mt-6 text-center text-lg font-black text-slate-700">
        Concernant votre logement, vous êtes ?
      </h3>

      <div className="mt-6 grid grid-cols-2 gap-5">
        {[
          ["🏠", "Propriétaire"],
          ["🔑", "Locataire"],
        ].map(([emoji, label]) => (
          <button
            key={label}
            onClick={() => go("simulation")}
            className="rounded-2xl border-2 border-slate-200 p-6 text-center transition hover:border-violet-500 hover:bg-violet-50"
          >
            <div className="text-5xl">{emoji}</div>
            <p className="mt-4 text-lg font-black text-slate-700">{label}</p>
            <div className="mx-auto mt-3 h-6 w-6 rounded-full border-2 border-slate-300" />
          </button>
        ))}
      </div>
    </div>
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
      extra: {
        veryModest: 7038,
        modest: 8568,
        intermediate: 12122,
      },
    },
    other: {
      veryModest: [17173, 25115, 30206, 35285, 40388],
      modest: [22015, 32197, 38719, 45234, 51775],
      intermediate: [30844, 45340, 54592, 63844, 73098],
      extra: {
        veryModest: 5094,
        modest: 6525,
        intermediate: 9254,
      },
    },
  };

  const zone = isIdf ? bareme.idf : bareme.other;

  const getLimit = (type) => {
    if (household <= 5) return zone[type][household - 1];
    return zone[type][4] + (household - 5) * zone.extra[type];
  };

  const ranges = {
    "Jusqu'à 25 714 €": 25714,
    "De 25 714 € à 32 985 €": 32985,
    "De 32 985 € à 46 182 €": 46182,
    "Plus de 46 182 €": 999999,
  };

  const income = ranges[tax_income] || 999999;

  if (income <= getLimit("veryModest")) {
    return {
      eligibility_category: "tres_modeste",
      lead_color: "purple",
    };
  }

  if (income <= getLimit("modest")) {
    return {
      eligibility_category: "modeste",
      lead_color: "blue",
    };
  }

  if (income <= getLimit("intermediate")) {
    return {
      eligibility_category: "intermediaire",
      lead_color: "yellow",
    };
  }

  return {
    eligibility_category: "aise",
    lead_color: "gray",
  };
}

function SimulationPage({ go }) {
  const steps = [
    {
      type: "choice",
      key: "owner_status",
      title: "Concernant votre logement, vous êtes ?",
      hint: "Cette information conditionne les aides auxquelles vous avez droit.",
      options: [
        { label: "Propriétaire", emoji: "🏠", desc: "J'occupe ou je loue mon bien" },
        { label: "Locataire", emoji: "🔑", desc: "Je loue mon logement" },
      ],
    },
    {
      type: "choice",
      key: "housing_type",
      title: "Quel est votre type de logement ?",
      options: [
        { label: "Maison", emoji: "🏡", desc: "Maison individuelle" },
        { label: "Appartement", emoji: "🏢", desc: "En immeuble collectif" },
      ],
    },
    {
      type: "choice",
      key: "heating_type",
      title: "Votre système de chauffage actuel ?",
      hint: "Plus votre chauffage est ancien, plus vos aides peuvent être élevées.",
      options: [
        { label: "Gaz", emoji: "🔥" },
        { label: "Fioul", emoji: "🛢️" },
        { label: "Électrique", emoji: "⚡" },
        { label: "Autres", emoji: "♻️" },
      ],
    },
    {
      type: "choice",
      key: "heating_bill",
      title: "Montant annuel de votre facture de chauffage ?",
      options: [
        { label: "Moins de 1 250€" },
        { label: "De 1 250€ à 1 500€" },
        { label: "De 1 500€ à 2 000€" },
        { label: "Plus de 2 000€" },
      ],
    },
    {
      type: "choice",
      key: "aid_amount_choice",
      title: "Voulez-vous connaître votre montant d'aide ?",
      options: [
        { label: "Je souhaite avoir le montant de ma prime", emoji: "💰" },
        { label: "Je ne souhaite pas confier mes revenus", emoji: "🔒" },
      ],
    },
    {
      type: "input",
      key: "city",
      title: "Votre code postal ?",
      placeholder: "Ex : 75001",
    },
    {
      type: "counter",
      key: "household_size",
      title: "Combien de personnes composent votre foyer ?",
    },
    {
      type: "choice",
      key: "tax_income",
      title: "Revenu fiscal de référence",
      subtitle: "Avis d'imposition 2025 — revenus 2024",
      options: [
        { label: "Jusqu'à 25 714 €" },
        { label: "De 25 714 € à 32 985 €" },
        { label: "De 32 985 € à 46 182 €" },
        { label: "Plus de 46 182 €" },
      ],
    },
    {
      type: "contact",
      key: "contact",
      title: "Recevez votre estimation personnalisée",
    },
    {
      type: "choice",
      key: "wants_contact",
      title: "Voulez-vous être contacté par un de nos collaborateurs ?",
      options: [
        { label: "Oui", emoji: "📞", desc: "Je choisis une date et une heure" },
        { label: "Non", emoji: "❌", desc: "Je veux seulement envoyer ma demande" },
      ],
    },
    {
      type: "appointment",
      key: "appointment",
      title: "Choisissez votre date et heure préférées",
    },
  ];

  const encouragements = [
    "C'est parti, ça prend moins de 2 minutes 👍",
    "Parfait, continuons !",
    "Super, vous avancez bien 🔥",
    "Plus que quelques questions…",
    "On y est presque !",
    "Dernière ligne droite 🚀",
    "Encore un effort…",
    "Avant-dernière étape !",
    "Votre estimation est prête 🎉",
    "Dernière question !",
    "Choisissez votre créneau 📅",
  ];

  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState("forward");
  const [showSuccess, setShowSuccess] = useState(false);
  const [data, setData] = useState({
    household_size: 1,
    full_name: "",
    email: "",
    phone: "",
    preferred_date: "",
    preferred_time: "",
  });

  const current = steps[step];
  const selected = data[current.key];
  const progress = Math.round(((step + 1) / steps.length) * 100);

  const isPostalCodeValid = /^[0-9]{5}$/.test(data.city || "");
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email || "");
  const isPhoneValid = /^(?:(?:\+33|0033)[1-9](?:\d{2}){4}|0[1-9](?:\d{2}){4})$/.test(
    (data.phone || "").replace(/\s/g, "")
  );

  const isContactValid =
    data.full_name.trim().length >= 2 && isEmailValid && isPhoneValid;

  const isAppointmentValid = data.preferred_date && data.preferred_time;

  const canContinue =
    current.type === "input"
      ? isPostalCodeValid
      : current.type === "contact"
      ? isContactValid
      : current.type === "appointment"
      ? isAppointmentValid
      : true;

      const submitLead = async (finalData = data) => {
        const eligibility = getEligibilityCategory(finalData);

        const finalLead = {
        ...finalData,
        preferred_date: finalData.preferred_date || null,
        preferred_time: finalData.preferred_time || null,
        call_status:
          finalData.wants_contact === "Non"
            ? "ne_veut_pas_etre_contacte"
            : "a_appeler",
      };

        const { error } = await supabase.from("leads").insert([
          {
            ...finalLead,
            ...eligibility,
            household_size: String(finalData.household_size),
          },
        ]);

        if (error) {
          console.error(error);
        alert(error.message); 
          return;
        }

        setShowSuccess(true);

        setStep(0);

        window.scrollTo(0, 0);

        setData({
          household_size: 1,
          full_name: "",
          email: "",
          phone: "",
          preferred_date: "",
          preferred_time: "",
        });
      };

        const next = async () => {
          if (!canContinue) return;

          setDirection("forward");

          if (step < steps.length - 1) {
            setStep(step + 1);
            return;
          }

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

<div className="overflow-hidden rounded-[1.5rem] bg-white p-5 shadow-2xl ring-1 ring-black/5 sm:p-6 md:rounded-[2.5rem] md:p-10">          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 text-base font-black text-white">
                P
              </div>
              <span className="text-lg font-black text-[#08243a]">PrimUnion</span>
            </div>

            <span className="rounded-full bg-violet-50 px-4 py-1.5 text-sm font-black text-violet-700">
              {progress}%
            </span>
          </div>

          <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-violet-600 to-blue-600 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="mt-2.5 flex items-center justify-between text-sm font-bold">
            <span className="text-violet-600">{encouragements[step]}</span>
            <span className="text-slate-400">Étape {step + 1} / {steps.length}</span>
          </div>

          <div key={step} className={direction === "forward" ? "pu-step-forward" : "pu-step-back"}>
          <h2 className="mt-7 break-words text-2xl font-black leading-tight text-[#08243a] sm:text-3xl">              {current.title}
            </h2>

            {current.subtitle && (
              <p className="mt-2 text-base font-bold text-slate-400">
                {current.subtitle}
              </p>
            )}

            {current.hint && (
              <p className="mt-3 flex items-start gap-2 rounded-2xl bg-blue-50 p-3 text-sm font-semibold text-blue-700">
                <span>💡</span> {current.hint}
              </p>
            )}

            {current.type === "choice" && (
              <div className={`mt-7 grid gap-4 ${current.options.length > 3 ? "sm:grid-cols-2" : "md:grid-cols-2"}`}>
                {current.options.map((option) => {
                  const isSel = selected === option.label;

                  return (
                    <button
                      key={option.label}
                      onClick={() => choose(option.label)}
                      className={`group relative flex items-center gap-4 rounded-2xl border-2 p-5 text-left transition-all ${
                        isSel
                          ? "border-violet-600 bg-violet-50 shadow-lg shadow-violet-200/60"
                          : "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-violet-400 hover:shadow-md"
                      }`}
                    >
                      {option.emoji && (
                        <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-3xl ${isSel ? "bg-white" : "bg-slate-50 group-hover:bg-violet-100"}`}>
                          {option.emoji}
                        </span>
                      )}

                      <span className="flex-1">
                        <span className="block text-lg font-black text-[#08243a]">
                          {option.label}
                        </span>
                        {option.desc && (
                          <span className="mt-0.5 block text-sm font-semibold text-slate-400">
                            {option.desc}
                          </span>
                        )}
                      </span>

                      <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 ${
                        isSel ? "border-violet-600 bg-violet-600 text-white" : "border-slate-300 text-transparent"
                      }`}>
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
                  <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-2xl">
                    📍
                  </span>

                  <input
                    value={data[current.key] || ""}
                    onChange={(e) =>
                      setData({ ...data, [current.key]: e.target.value.replace(/\D/g, "").slice(0, 5) })
                    }
                    placeholder={current.placeholder}
                    className={`w-full rounded-3xl border-2 p-5 pl-14 text-xl font-bold outline-none ${
                      isPostalCodeValid || !data[current.key]
                        ? "border-slate-200 focus:border-violet-500"
                        : "border-red-500"
                    }`}
                  />
                </div>

                {data[current.key] && !isPostalCodeValid && (
                  <p className="mt-3 font-bold text-red-500">
                    Entre un code postal français valide à 5 chiffres.
                  </p>
                )}

                <ContinueButton disabled={!canContinue} onClick={next} />
              </div>
            )}

            {current.type === "counter" && (
              <div className="mt-9">
                <div className="flex items-center justify-center gap-6">
                  <button
                    onClick={() =>
                      setData({
                        ...data,
                        household_size: Math.max(1, data.household_size - 1),
                      })
                    }
                    className="flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-slate-200 text-3xl font-black text-slate-500"
                  >
                    −
                  </button>

                  <div className="text-center">
                    <div className="flex h-28 w-28 items-center justify-center rounded-3xl bg-gradient-to-br from-violet-600 to-blue-600 text-6xl font-black text-white shadow-lg shadow-violet-200">
                      {data.household_size}
                    </div>

                    <p className="mt-3 font-bold text-slate-400">
                      personne{data.household_size > 1 ? "s" : ""}
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      setData({
                        ...data,
                        household_size: data.household_size + 1,
                      })
                    }
                    className="flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-slate-200 text-3xl font-black text-slate-500"
                  >
                    +
                  </button>
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
                    <p className="text-sm font-semibold text-violet-100">
                      Indiquez où l'envoyer, c'est gratuit et sans engagement.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <FieldInput
                    value={data.full_name}
                    onChange={(v) => setData({ ...data, full_name: v })}
                    placeholder="Nom et prénom *"
                    icon="👤"
                  />

                  <FieldInput
                    value={data.email}
                    onChange={(v) => setData({ ...data, email: v })}
                    placeholder="Adresse email *"
                    icon="✉️"
                    type="email"
                    error={data.email && !isEmailValid ? "Email invalide." : ""}
                  />

                  <FieldInput
                    value={data.phone}
                    onChange={(v) => setData({ ...data, phone: v })}
                    placeholder="Numéro de téléphone *"
                    icon="📞"
                    type="tel"
                    error={
                      data.phone && !isPhoneValid
                        ? "Numéro français invalide. Exemple : 0612345678"
                        : ""
                    }
                  />
                </div>

                <button
                  disabled={!canContinue}
                  onClick={next}
                  className={`mt-6 flex w-full items-center justify-center gap-2 rounded-2xl py-5 text-lg font-black transition ${
                    canContinue
                      ? "bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-lg shadow-violet-200"
                      : "cursor-not-allowed bg-slate-200 text-slate-400"
                  }`}
                >
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
      <label className="mb-2 block font-black text-[#08243a]">
        Choisissez une date
      </label>

      <input
        type="date"
        value={data.preferred_date}
        onChange={(e) =>
          setData({ ...data, preferred_date: e.target.value })
        }
        className="block w-full min-w-0 max-w-full appearance-none rounded-2xl border-2 border-slate-200 bg-white p-4 text-base font-bold text-[#08243a] outline-none focus:border-violet-500 sm:p-5 sm:text-lg"
      />
    </div>

    <div>
      <label className="mb-2 block font-black text-[#08243a]">
        Choisissez une heure
      </label>

      <select
        value={data.preferred_time}
        onChange={(e) =>
          setData({ ...data, preferred_time: e.target.value })
        }
className="w-full max-w-full rounded-2xl border-2 border-slate-200 bg-white p-4 text-base font-bold text-[#08243a] outline-none focus:border-violet-500 sm:p-5 sm:text-lg" >
        <option value="">Sélectionner une heure</option>

        <option value="08:00">08:00</option>
        <option value="08:30">08:30</option>
        <option value="09:00">09:00</option>
        <option value="09:30">09:30</option>
        <option value="10:00">10:00</option>
        <option value="10:30">10:30</option>
        <option value="11:00">11:00</option>
        <option value="11:30">11:30</option>
        <option value="12:00">12:00</option>
        <option value="12:30">12:30</option>
        <option value="13:00">13:00</option>
        <option value="13:30">13:30</option>
        <option value="14:00">14:00</option>
        <option value="14:30">14:30</option>
        <option value="15:00">15:00</option>
        <option value="15:30">15:30</option>
        <option value="16:00">16:00</option>
        <option value="16:30">16:30</option>
        <option value="17:00">17:00</option>
        <option value="17:30">17:30</option>
        <option value="18:00">18:00</option>
      </select>
    </div>

    <button
      disabled={!canContinue}
      onClick={() => submitLead()}
      className={`flex w-full items-center justify-center gap-2 rounded-2xl py-5 text-lg font-black transition ${
        canContinue
          ? "bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-lg shadow-violet-200"
          : "cursor-not-allowed bg-slate-200 text-slate-400"
      }`}
    >
      Valider ma demande <ArrowRight size={20} />
    </button>
  </div>
)}
          </div>

          {step > 0 && (
            <div className="mt-8 border-t border-slate-100 pt-5">
              <button
                onClick={back}
                className="text-sm font-black text-slate-400 transition hover:text-violet-600"
              >
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
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
    <div className="w-full max-w-md rounded-[2rem] bg-white p-8 text-center shadow-2xl animate-[pu-pop_.3s_ease]">
      
      <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-blue-600 text-5xl text-white shadow-xl">
        ✓
      </div>

      <h2 className="mt-6 text-3xl font-black text-[#08243a]">
        Merci 🎉
      </h2>

      <p className="mt-4 text-lg leading-8 text-slate-600">
        Votre demande a bien été envoyée.
        <br />
        Un conseiller PrimUnion reviendra vers vous rapidement avec vos aides disponibles.
      </p>

      <button
        onClick={() => {

  setShowSuccess(false);

  go("home");

}}
        className="mt-8 w-full rounded-2xl bg-gradient-to-r from-violet-600 to-blue-600 py-4 text-lg font-black text-white shadow-lg"
      >
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
    <button
      disabled={disabled}
      onClick={onClick}
      className={`mt-7 flex w-full items-center justify-center gap-2 rounded-2xl py-5 text-lg font-black transition ${
        disabled
          ? "cursor-not-allowed bg-slate-200 text-slate-400"
          : "bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-lg shadow-violet-200 hover:brightness-110 active:scale-[.99]"
      }`}
    >
      Continuer <ArrowRight size={20} />
    </button>
  );
}

function FieldInput({ value, onChange, placeholder, icon, type = "text", error = "" }) {
  return (
    <div>
      <div className="relative">
        <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-xl">
          {icon}
        </span>

        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          inputMode={type === "tel" ? "numeric" : undefined}
          autoComplete={type === "tel" ? "tel" : undefined}
          className={`w-full rounded-2xl border-2 py-4 pl-14 pr-5 text-base font-bold text-[#08243a] outline-none transition ${
            error
              ? "border-red-500 focus:border-red-500"
              : "border-slate-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
          }`}
        />
      </div>

      {error && (
        <p className="mt-2 font-bold text-red-500">
          {error}
        </p>
      )}
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
            <Info icon={<Phone />} text="01 23 45 67 89" />
            <Info icon={<Mail />} text="contact@primunion.fr" />
            <Info icon={<MapPin />} text="France" />
          </div>
        </div>

        <form className="rounded-[2rem] bg-white p-8 shadow-xl">
          <div className="grid gap-4">
            <input className="rounded-2xl border p-4" placeholder="Nom complet" />
            <input className="rounded-2xl border p-4" placeholder="Email" />
            <input
  type="tel"
  inputMode="numeric"
  autoComplete="tel"
  className="rounded-2xl border p-4"
  placeholder="Téléphone"
/>
            <textarea className="min-h-36 rounded-2xl border p-4" placeholder="Message" />
            <button className="rounded-2xl bg-gradient-to-r from-violet-600 to-blue-600 py-4 font-black text-white">
              Envoyer
            </button>
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
        <h2 className="text-4xl font-black text-[#08243a]">
          Nos partenaires
        </h2>

        <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-violet-600 to-blue-600" />

        <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="flex h-32 items-center justify-center rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-h-16 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectStepsSection({ go }) {
  const steps = [
    {
      title: "Une offre claire",
      text: "Chaque maison est différente. Nous estimons vos travaux ainsi que les aides disponibles pour votre projet.",
    },
    {
      title: "Des aides estimées",
      text: "PrimUnion sécurise vos aides CEE et MaPrimeRénov’ dès la signature du devis, avec une déduction immédiate sur le montant total de vos travaux.",
    },
    {
      title: "Un suivi intégral",
      text: "PrimUnion vous accompagne de A à Z : rendez-vous téléphoniques, démarches administratives, suivi des primes, facturation et finalisation des travaux.",
    },
    {
      title: "Une solution adaptée",
      text: "PrimUnion s’appuie sur un réseau de partenaires certifiés pour assurer la réception du chantier et garantir la conformité des travaux réalisés.",
    },
  ];

  return (
    <section className="bg-[#f7f8ff] px-5 py-20">
      <div className="mx-auto max-w-7xl text-center">
        <h2 className="text-4xl font-black md:text-5xl">
          Votre projet de rénovation énergétique <span className="text-violet-600">clé en main</span>
        </h2>
        <div className="mt-16 grid gap-8 md:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.title}>
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-blue-600 text-3xl font-black text-white">
                {index + 1}
              </div>
              <h3 className="mt-8 text-xl font-black">{step.title}</h3>
              <p className="mt-4 text-slate-600">{step.text}</p>
            </div>
          ))}
        </div>
        <button onClick={() => go("simulation")} className="mt-14 rounded-2xl bg-gradient-to-r from-violet-600 to-blue-600 px-10 py-4 font-black text-white">
          Démarrer mon projet →
        </button>
      </div>
    </section>
  );
}

function ReviewsSection() {
  const reviews = [
    ["V", "Valerie F.", "Très satisfaite de la simulation. L’équipe est professionnelle et réactive."],
    ["M", "Marques J.", "Service impeccable du début à la fin. Contact rapide et explications claires."],
    ["D", "Dalil A.", "PrimUnion m’a bien guidé dans ma demande."],
  ];

  return (
    <section className="bg-slate-50 px-5 py-20">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-4xl font-black">Ce que nos clients pensent de nous :</h2>
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {reviews.map(([letter, name, text]) => (
            <div key={name} className="rounded-[2rem] bg-white p-8 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-blue-600 text-xl font-black text-white">
                  {letter}
                </div>
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

function Step({ icon, title, text }) {
  return (
    <div className="flex gap-4 rounded-3xl bg-slate-50 p-5">
      <div className="text-violet-600">{icon}</div>
      <div>
        <h3 className="font-black">{title}</h3>
        <p className="text-slate-600">{text}</p>
      </div>
    </div>
  );
}

function Card({ icon, title, text }) {
  return (
    <div className="rounded-[2rem] bg-white p-8 shadow-xl">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
        {icon}
      </div>
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
      {/* En-tête foncé cohérent avec le reste du site */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#081d33] via-[#132b5c] to-[#140b2d] px-5 py-16 text-white">
        <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-violet-500/25 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-blue-500/25 blur-3xl" />
        <div className="relative mx-auto max-w-4xl">
          <button onClick={() => go("home")} className="text-sm font-bold text-violet-200 transition hover:text-white">
            ← Retour à l'accueil
          </button>
          <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-violet-300/30 bg-white/10 px-4 py-1.5 text-sm font-bold text-violet-100">
            {badge}
          </p>
          <h1 className="mt-5 text-4xl font-black md:text-5xl">{title}</h1>
          {intro && <p className="mt-4 max-w-2xl text-lg text-slate-200">{intro}</p>}
        </div>
      </section>

      {/* Contenu */}
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
    <LegalLayout
      go={go}
      badge="Informations légales"
      title="Mentions légales"
      intro="Conformément à la loi pour la confiance dans l'économie numérique (LCEN), voici les informations relatives à l'éditeur et à l'hébergeur de ce site."
    >
      <LegalBlock title="1. Éditeur du site">
        <p>
          Le site PrimUnion est édité par <strong>[Raison sociale]</strong>, [forme juridique]
          au capital de [montant] €, immatriculée au RCS de [ville] sous le numéro
          <strong> [n° SIRET / RCS]</strong>.
        </p>
        <p>Siège social : [adresse complète].</p>
        <p>Numéro de TVA intracommunautaire : [n° TVA].</p>
        <p>Directeur de la publication : [nom du responsable].</p>
        <p>Contact : contact@primunion.fr — 01 23 45 67 89.</p>
      </LegalBlock>

      <LegalBlock title="2. Hébergeur">
        <p>
          Le site est hébergé par <strong>[Nom de l'hébergeur]</strong>, [adresse de l'hébergeur],
          téléphone : [téléphone de l'hébergeur].
        </p>
      </LegalBlock>

      <LegalBlock title="3. Activité">
        <p>
          PrimUnion est une plateforme de mise en relation et d'information dans le domaine de la
          rénovation énergétique. Le site permet de réaliser une simulation gratuite et sans
          engagement afin d'estimer les aides financières mobilisables, puis d'être mis en relation
          avec des professionnels certifiés RGE.
        </p>
      </LegalBlock>

      <LegalBlock title="4. Propriété intellectuelle">
        <p>
          L'ensemble des contenus présents sur ce site (textes, logos, images, graphismes, structure)
          est protégé par le droit de la propriété intellectuelle et reste la propriété de PrimUnion ou
          de ses partenaires. Toute reproduction ou représentation, totale ou partielle, sans
          autorisation écrite préalable, est interdite.
        </p>
        <p>
          Les marques et logos des partenaires affichés sur le site appartiennent à leurs titulaires
          respectifs et sont utilisés à titre informatif.
        </p>
      </LegalBlock>

      <LegalBlock title="5. Responsabilité">
        <p>
          Les estimations fournies par le simulateur sont données à titre indicatif et ne constituent
          en aucun cas un engagement contractuel ni une garantie d'obtention des aides. Les montants
          réels dépendent de l'instruction des dossiers par les organismes compétents.
        </p>
        <p>
          PrimUnion s'efforce d'assurer l'exactitude des informations diffusées mais ne saurait être
          tenue responsable des erreurs, omissions ou d'une indisponibilité temporaire du site.
        </p>
      </LegalBlock>

      <LegalBlock title="6. Liens hypertextes">
        <p>
          Le site peut contenir des liens vers des sites tiers. PrimUnion n'exerce aucun contrôle sur
          ces sites et décline toute responsabilité quant à leur contenu.
        </p>
      </LegalBlock>

      <LegalBlock title="7. Droit applicable">
        <p>
          Les présentes mentions légales sont régies par le droit français. En cas de litige, et à
          défaut de résolution amiable, les tribunaux français seront seuls compétents.
        </p>
      </LegalBlock>
    </LegalLayout>
  );
}

function PrivacyPage({ go }) {
  return (
    <LegalLayout
      go={go}
      badge="Vos données personnelles"
      title="Politique de confidentialité"
      intro="PrimUnion accorde une grande importance à la protection de vos données. Cette politique explique quelles données nous collectons, pourquoi, et quels sont vos droits, conformément au RGPD."
    >
      <LegalBlock title="1. Responsable du traitement">
        <p>
          Le responsable du traitement des données est <strong>[Raison sociale]</strong>, dont le siège
          social est situé [adresse complète]. Pour toute question relative à vos données, vous pouvez
          écrire à : contact@primunion.fr.
        </p>
      </LegalBlock>

      <LegalBlock title="2. Données collectées">
        <p>Dans le cadre de la simulation et de la mise en relation, nous pouvons collecter :</p>
        <ul className="list-disc space-y-1 pl-6">
          <li>des données d'identité : nom, prénom ;</li>
          <li>des coordonnées : adresse email, numéro de téléphone, ville ou code postal ;</li>
          <li>des informations sur votre logement : statut, type, chauffage, facture ;</li>
          <li>des informations sur votre foyer : composition, tranche de revenu fiscal ;</li>
          <li>des données techniques de navigation (cookies, voir section 7).</li>
        </ul>
      </LegalBlock>

      <LegalBlock title="3. Finalités et base légale">
        <p>Vos données sont traitées pour les finalités suivantes :</p>
        <ul className="list-disc space-y-1 pl-6">
          <li>réaliser votre simulation d'aides (exécution de mesures précontractuelles) ;</li>
          <li>vous mettre en relation avec des professionnels certifiés RGE (votre consentement) ;</li>
          <li>vous recontacter au sujet de votre demande (intérêt légitime) ;</li>
          <li>améliorer nos services et respecter nos obligations légales.</li>
        </ul>
      </LegalBlock>

      <LegalBlock title="4. Destinataires des données">
        <p>
          Vos données sont destinées aux équipes de PrimUnion et, avec votre accord, à nos partenaires
          installateurs certifiés RGE en charge de votre projet. Elles ne sont jamais vendues à des tiers.
        </p>
      </LegalBlock>

      <LegalBlock title="5. Durée de conservation">
        <p>
          Vos données sont conservées pendant la durée nécessaire au traitement de votre demande, puis
          archivées ou supprimées conformément aux durées légales applicables (généralement 3 ans à
          compter du dernier contact pour les données prospects).
        </p>
      </LegalBlock>

      <LegalBlock title="6. Vos droits">
        <p>
          Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, d'effacement, de
          limitation, d'opposition et de portabilité de vos données, ainsi que du droit de retirer votre
          consentement à tout moment.
        </p>
        <p>
          Pour exercer ces droits, contactez-nous à contact@primunion.fr. Vous pouvez également
          introduire une réclamation auprès de la CNIL (www.cnil.fr).
        </p>
      </LegalBlock>

      <LegalBlock title="7. Cookies">
        <p>
          Le site peut utiliser des cookies pour assurer son bon fonctionnement et mesurer son audience.
          Vous pouvez configurer votre navigateur pour refuser les cookies non essentiels. Le refus de
          certains cookies peut affecter votre expérience de navigation.
        </p>
      </LegalBlock>

      <LegalBlock title="8. Sécurité">
        <p>
          PrimUnion met en œuvre des mesures techniques et organisationnelles appropriées afin de
          protéger vos données contre tout accès, altération ou divulgation non autorisés.
        </p>
      </LegalBlock>
    </LegalLayout>
  );
}

function AdminPage() {
  
  const [selectedLead, setSelectedLead] = useState(null);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [associateFilter, setAssociateFilter] = useState("");

  const loginAdmin = async (e) => {
    e.preventDefault();
    setLoginError("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setLoginError("Email ou mot de passe incorrect.");
      return;
    }

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

  const updateLead = async (lead) => {
    const { error } = await supabase
      .from("leads")
      .update({
        call_status: lead.call_status,
        assigned_to: lead.assigned_to || null,
        internal_note: lead.internal_note,
        reminder_date: lead.reminder_date || null,
        last_called_at:
          lead.call_status === "appele"
            ? new Date().toISOString()
            : lead.last_called_at,
      })
      .eq("id", lead.id);

    if (error) {
      console.error(error);
      alert("Erreur sauvegarde");
      return;
    }

    alert("Lead sauvegardé ✅");
    loadLeads();
  };

  const changeLead = (id, field, value) => {
  setLeads((prev) =>
    prev.map((lead) =>
      lead.id === id ? { ...lead, [field]: value } : lead
    )
  );

  setSelectedLead((prev) =>
    prev ? { ...prev, [field]: value } : prev
  );
};

  useEffect(() => {
    const initAuth = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };

    initAuth();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (session) {
      loadLeads();
    }
  }, [session]);

  const statusLabels = {
    a_appeler: "À appeler",
    appele: "Appelé",
    injoignable: "Injoignable",
    rappel_prevu: "Rappel prévu",
    termine: "Terminé",
    ne_veut_pas_etre_contacte: "Ne veut pas être contacté",
  };
  const associates = ["Josh", "Mikhael", "David"];

  const filteredLeads = leads.filter((lead) => {
  const statusMatch = statusFilter ? lead.call_status === statusFilter : true;

  const associateMatch =
    associateFilter === "__unassigned__"
      ? !lead.assigned_to
      : associateFilter
      ? lead.assigned_to === associateFilter
      : true;

  return statusMatch && associateMatch;
});

  if (!session) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-[#081d33] via-[#132b5c] to-[#140b2d] px-5 py-20">
        <div className="mx-auto max-w-md rounded-[2rem] bg-white p-8 shadow-2xl">
          <h1 className="text-3xl font-black text-[#08243a]">
            Connexion admin
          </h1>

          <p className="mt-3 text-slate-600">
            Connecte-toi pour accéder aux leads PrimUnion.
          </p>

          <form onSubmit={loginAdmin} className="mt-8 space-y-4">
            <input
              type="email"
              placeholder="Email admin"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl border-2 border-slate-200 p-4 font-bold outline-none focus:border-violet-500"
            />

            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border-2 border-slate-200 p-4 font-bold outline-none focus:border-violet-500"
            />

            {loginError && (
              <p className="font-bold text-red-500">{loginError}</p>
            )}

            <button className="w-full rounded-2xl bg-gradient-to-r from-violet-600 to-blue-600 py-4 font-black text-white">
              Se connecter
            </button>
          </form>
        </div>
      </main>
    );
  }
  if (selectedLead) {
  return (
    <LeadDetailsPage
  lead={selectedLead}
  onBack={() => setSelectedLead(null)}
  onChange={changeLead}
  onSave={updateLead}
  statusLabels={statusLabels}
  associates={associates}
/>
  );
}

  return (
    <main className="min-h-screen bg-[#f7f8ff] px-5 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div>
            <p className="font-black text-violet-700">CRM PrimUnion</p>
            <h1 className="mt-2 text-4xl font-black text-[#08243a]">
              Suivi des leads
            </h1>
            <p className="mt-3 text-slate-600">
              Appels, notes internes, rappels et suivi client.
            </p>
          </div>

          <button
            onClick={() => supabase.auth.signOut()}
            className="rounded-2xl bg-slate-900 px-6 py-3 font-black text-white"
          >
            Se déconnecter
          </button>
        </div>

        {loading ? (
  <div className="rounded-3xl bg-white p-10 text-center font-black shadow">
    Chargement des leads...
  </div>
) : leads.length === 0 ? (
  <div className="rounded-3xl bg-white p-10 text-center font-black shadow">
    Aucun lead pour le moment.
  </div>
) : (
  <>
    <div className="mb-6 flex flex-col gap-4 rounded-[1.5rem] bg-white p-4 shadow-sm ring-1 ring-slate-100 md:flex-row">
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold outline-none focus:border-violet-500 md:w-56"
      >
        <option value="">Tous les statuts</option>
        <option value="a_appeler">À appeler</option>
        <option value="appele">Appelé</option>
        <option value="injoignable">Injoignable</option>
        <option value="rappel_prevu">Rappel prévu</option>
        <option value="termine">Terminé</option>
        <option value="ne_veut_pas_etre_contacte">Ne veut pas être contacté</option>
      </select>

      <select
        value={associateFilter}
        onChange={(e) => setAssociateFilter(e.target.value)}
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold outline-none focus:border-violet-500 md:w-56"
      >
        <option value="">Tous les associés</option>
        <option value="__unassigned__">Non assigné</option>
        {associates.map((name) => (
          <option key={name} value={name}>{name}</option>
        ))}
      </select>
    </div>

    <div className="overflow-hidden rounded-[2rem] bg-white shadow-xl ring-1 ring-slate-100">
    <div className="overflow-x-auto">
      <table className="w-full min-w-[1100px] border-collapse text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-5 py-4">Nom</th>
            <th className="px-5 py-4">Téléphone</th>
            <th className="px-5 py-4">Revenus</th>
            <th className="px-5 py-4">Habite</th>
            <th className="px-5 py-4">Catégorie</th>
            <th className="px-5 py-4">Assigné à</th>
            <th className="px-5 py-4">Statut</th>
            <th className="px-5 py-4">Date</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {filteredLeads.map((lead) => (
            <tr
              key={lead.id}
              onClick={() => setSelectedLead(lead)}
              className="cursor-pointer transition hover:bg-violet-50"
            >
              <td className="px-4 py-3 text-sm font-bold text-[#08243a]">
                {lead.full_name || "Sans nom"}
              </td>

              <td className="px-4 py-3 text-sm font-medium text-slate-600">
                {lead.phone || "-"}
              </td>

              <td className="px-4 py-3 text-sm font-medium text-slate-600">
                {lead.tax_income || "-"}
              </td>

              <td className="px-4 py-3 text-sm font-medium text-slate-600">
                {lead.city || "-"}
              </td>

              <td className="px-4 py-3">
                <CategoryBadge category={lead.eligibility_category} />
              </td>

              <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                <select
                  value={lead.assigned_to || ""}
                  onChange={(e) => {
                    changeLead(lead.id, "assigned_to", e.target.value);
                    updateLead({ ...lead, assigned_to: e.target.value });
                  }}
                  className="rounded-xl border border-slate-200 bg-white px-2 py-1.5 text-xs font-semibold outline-none focus:border-violet-500"
                >
                  <option value="">Non assigné</option>
                  {associates.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </td>

              <td className="px-4 py-3">
                <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-black text-slate-600">
                  {statusLabels[lead.call_status] || "À appeler"}
                </span>
              </td>

              <td className="px-4 py-3 text-sm font-bold text-slate-400">
                {new Date(lead.created_at).toLocaleDateString("fr-FR")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>

  </>

)}
      </div>
    </main>
  );
}

function CategoryBadge({ category }) {
  const map = {
    tres_modeste: {
      label: "Très modeste",
      className: "bg-purple-100 text-purple-700",
    },
    modeste: {
      label: "Modeste",
      className: "bg-blue-100 text-blue-700",
    },
    intermediaire: {
      label: "Intermédiaire",
      className: "bg-yellow-100 text-yellow-700",
    },
    aise: {
      label: "Aisé",
      className: "bg-slate-100 text-slate-700",
    },
  };

  const item = map[category] || {
    label: "Non classé",
    className: "bg-slate-100 text-slate-500",
  };

  return (
    <span className={`rounded-full px-2.5 py-1 text-xs font-black ${item.className}`}>
      {item.label}
    </span>
  );
}

function LeadDetailsPage({ lead, onBack, onChange, onSave, statusLabels, associates }) {
  return (
    <main className="min-h-screen bg-[#f7f8ff] px-5 py-10">
      <div className="mx-auto max-w-5xl">
        <button
          onClick={onBack}
          className="mb-6 rounded-2xl bg-white px-5 py-3 font-black text-slate-600 shadow"
        >
          ← Retour aux leads
        </button>

        <div className="rounded-[2rem] bg-white p-8 shadow-xl">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">
            <div>
              <p className="font-black text-violet-700">Fiche lead</p>
              <h1 className="mt-2 text-4xl font-black text-[#08243a]">
                {lead.full_name || "Sans nom"}
              </h1>

              <div className="mt-4 flex flex-wrap gap-3">
                <CategoryBadge category={lead.eligibility_category} />

                <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-black text-slate-600">
                  {statusLabels[lead.call_status] || "À appeler"}
                </span>
              </div>
            </div>

            <button
              onClick={() => onSave(lead)}
              className="rounded-2xl bg-gradient-to-r from-violet-600 to-blue-600 px-8 py-4 font-black text-white shadow-lg"
            >
              Sauvegarder
            </button>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <InfoBox label="Téléphone" value={lead.phone} />
            <InfoBox label="Email" value={lead.email} />
            <InfoBox label="Code postal" value={lead.city} />
            <InfoBox label="Nombre de personnes" value={lead.household_size} />
            <InfoBox label="Revenus" value={lead.tax_income} />
            <InfoBox label="Statut logement" value={lead.owner_status} />
            <InfoBox label="Type logement" value={lead.housing_type} />
            <InfoBox label="Chauffage" value={lead.heating_type} />
            <InfoBox label="Facture chauffage" value={lead.heating_bill} />
            <InfoBox label="Contact souhaité" value={lead.wants_contact} />
            <InfoBox label="Date préférée" value={lead.preferred_date} />
            <InfoBox label="Heure préférée" value={lead.preferred_time} />
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
  <div>
    <label className="font-black text-[#08243a]">
      Assigné à
    </label>

    <select
      value={lead.assigned_to || ""}
      onChange={(e) => onChange(lead.id, "assigned_to", e.target.value)}
      className="mt-3 w-full rounded-2xl border-2 border-slate-200 p-4 font-bold outline-none focus:border-violet-500"
    >
      <option value="">Non assigné</option>
      {associates.map((name) => (
        <option key={name} value={name}>
          {name}
        </option>
      ))}
    </select>
  </div>

  <div>
    <label className="font-black text-[#08243a]">
      Statut d’appel
    </label>

    <select
      value={lead.call_status || "a_appeler"}
      onChange={(e) => onChange(lead.id, "call_status", e.target.value)}
      className="mt-3 w-full rounded-2xl border-2 border-slate-200 p-4 font-bold outline-none focus:border-violet-500"
    >
      <option value="a_appeler">À appeler</option>
      <option value="appele">Appelé</option>
      <option value="injoignable">Injoignable</option>
      <option value="rappel_prevu">Rappel prévu</option>
      <option value="termine">Terminé</option>
      <option value="ne_veut_pas_etre_contacte">
        Ne veut pas être contacté
      </option>
    </select>
  </div>

  <div>
    <label className="font-black text-[#08243a]">
      Date de rappel
    </label>

    <input
      type="date"
      value={lead.reminder_date || ""}
      onChange={(e) => onChange(lead.id, "reminder_date", e.target.value)}
      className="mt-3 block w-full min-w-0 max-w-full appearance-none rounded-2xl border-2 border-slate-200 bg-white p-4 font-bold outline-none focus:border-violet-500"
    />
  </div>
</div>

          <div className="mt-8">
            <label className="font-black text-[#08243a]">
              Notes internes
            </label>

            <textarea
              value={lead.internal_note || ""}
              onChange={(e) => onChange(lead.id, "internal_note", e.target.value)}
              placeholder="Ex : client intéressé, rappeler demain, demande devis, hésitation..."
              className="mt-3 min-h-40 w-full rounded-2xl border-2 border-slate-200 p-4 font-semibold outline-none focus:border-violet-500"
            />
          </div>
        </div>
      </div>
    </main>
  );
}

function InfoBox({ label, value }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-5">
      <p className="text-sm font-black uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <p className="mt-2 text-lg font-black text-[#08243a]">
        {value || "-"}
      </p>
    </div>
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
            <p className="mt-3 text-slate-400">Plateforme marketing rénovation énergétique.</p>
          </div>

          <div className="flex flex-col gap-3 font-bold text-slate-300">
            <p className="text-sm uppercase tracking-wide text-slate-500">Navigation</p>
            <button
  onClick={() => go("admin")}
  className="text-left text-slate-500 transition hover:text-white"
>
  Espace partenaire
</button>
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