import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

export const Route = createFileRoute("/")({ component: Home });

const NAV = [
  ["#introducere", "Introducere"],
  ["#instructaj", "Instructaj"],
  ["#continut", "La calculator"],
  ["#electrosecuritate", "Electro"],
  ["#comparatie", "Încăperi"],
  ["#concluzii", "Concluzii"],
];

const TEAM = [
  ["BB", "Borș Bogdan"],
  ["BA", "Bruma Alexandrina"],
  ["CA", "Covali Alexandr"],
  ["GC", "Gațcan Cristian"],
  ["MA", "Mazur Adrian"],
];

function Home() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen">
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition ${
          scrolled ? "border-slate-200 bg-white/95 shadow-sm" : "border-white/20 bg-[#0a355c]/55"
        } backdrop-blur-md`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <a href="#top" className={`font-[Space_Grotesk,sans-serif] text-lg font-bold ${scrolled ? "text-[#0f4c81]" : "text-white"}`}>
            SSM <span className="text-[#ff8a80]">CEITI</span>
          </a>
          <nav className="hidden gap-1 lg:flex">
            {NAV.map(([href, label]) => (
              <a
                key={href}
                href={href}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium ${scrolled ? "text-slate-600 hover:bg-[#0f4c81]/10" : "text-white/90 hover:bg-white/15"}`}
              >
                {label}
              </a>
            ))}
          </nav>
          <button
            type="button"
            className={`rounded-lg border px-3 py-1.5 text-sm font-medium lg:hidden ${scrolled ? "border-slate-200" : "border-white/40 text-white"}`}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
          >
            Meniu
          </button>
        </div>
        {open && (
          <div className="flex flex-col border-t border-white/10 bg-[#0a355c] px-4 py-2 lg:hidden">
            {NAV.map(([href, label]) => (
              <a key={href} href={href} className="py-2 text-sm font-medium text-white" onClick={() => setOpen(false)}>
                {label}
              </a>
            ))}
          </div>
        )}
      </header>

      <main id="top">
        <section className="relative min-h-[88vh] overflow-hidden">
          <img src="/lab.jpg" alt="Laborator de informatică cu rânduri de calculatoare" className="hero-photo absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#06182c] via-[#0a355c]/75 to-[#0a355c]/35" />
          <div className="relative mx-auto flex min-h-[88vh] max-w-6xl flex-col justify-end px-4 pb-14 pt-28">
            <p className="mb-3 inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
              <span className="live-dot inline-block h-2 w-2 rounded-full bg-[#e63946]" />
              Miercuri, 4 noiembrie · ora V · Laboratorul 102
            </p>
            <h1 className="max-w-3xl font-[Space_Grotesk,sans-serif] text-4xl font-bold leading-tight text-white sm:text-6xl">
              Instructaj la locul de muncă și electrosecuritate
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-white/85">
              Cinci colegi, două teme: cum se instruiesc elevii înainte să lucreze la calculator și cum deosebim o sală obișnuită de o încăpere cu pericol majorat — în școală și în cămine.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {TEAM.map(([ini, name]) => (
                <span key={ini} className="rounded-full bg-white/12 px-3 py-1 text-sm text-white backdrop-blur">
                  {name.split(" ")[0]}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto grid max-w-6xl gap-4 px-4 py-8 sm:grid-cols-2 lg:grid-cols-4">
            <Shot src="/stingator.jpg" cap="Stingător și ieșire" />
            <Shot src="/priza.jpg" cap="Priză și cablu" />
            <Shot src="/evacuare.jpg" cap="Cale de evacuare" />
            <Shot src="/camin.jpg" cap="Bucătărie de cămin" />
          </div>
        </section>

        <section id="introducere" className="bg-white px-4 py-14">
          <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-2">
            <div>
              <h2 className="font-[Space_Grotesk,sans-serif] text-3xl font-bold text-[#0a355c]">De ce acest instructaj</h2>
              <p className="mt-3 text-slate-700">
                Legea nr. 186 din 10 iulie 2008 spune că instruirea se face din mijloacele unității, în timpul programului, și se consideră timp de muncă. La noi, „locul de muncă” al elevului în oră este postul din laborator.
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700">
                <li>Mai întâi vine instruirea introductiv-generală: legea, riscurile unității, incendiu, prim ajutor.</li>
                <li>Apoi instructajul la locul de muncă: riscurile exacte ale postului, nu ale întregii școli.</li>
                <li>Fără verificare și fără fișă, elevul nu lucrează de sine stătător.</li>
                <li>Normele de apărare împotriva incendiilor cer căi libere, mijloace de stingere și oameni care știu unde sunt.</li>
              </ul>
            </div>
            <figure className="overflow-hidden rounded-3xl shadow-lg">
              <img src="/primajutor.jpg" alt="Trusă de prim ajutor și plan de evacuare pe masă" className="h-full w-full object-cover" />
              <figcaption className="bg-[#0a355c] px-4 py-3 text-sm text-white/80">Prim ajutor și plan de evacuare — fac parte din instructaj, nu sunt opționale.</figcaption>
            </figure>
          </div>
        </section>

        <section id="instructaj" className="mx-auto max-w-6xl px-4 py-14">
          <Eyebrow n="02" title="Instructajul din laborator" />
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["Cine îl face", "Conducătorul direct al locului de muncă: profesorul responsabil de Laboratorul 102. Grupa nu trece de 20 de persoane. Fișa rămâne la el."],
              ["Cât ține", "Minimum 8 ore, stabilite prin instrucțiuni proprii împreună cu lucrătorul desemnat sau serviciul de prevenire. La elevi se adaptează la orele practice, dar conținutul minim rămâne."],
              ["Când se reia", "La primul laborator, la schimbarea postului, la echipament nou, după un incident și periodic. Reluarea lucrului se consemnează din nou în fișă."],
            ].map(([t, d]) => (
              <Card key={t} title={t}>{d}</Card>
            ))}
          </div>
          <div className="mt-6 grid items-center gap-6 lg:grid-cols-2">
            <img src="/ergonomie.jpg" alt="Post de lucru cu monitor, tastatură și scaun" className="floaty w-full rounded-3xl object-cover shadow-lg" />
            <Card title="Fișa de instruire">
              <p>Fișa personală de instruire nu e o semnătură de formă. În ea se vede:</p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>data instructajului și cine l-a făcut;</li>
                <li>că elevul a fost verificat de șeful ierarhic superior celui care a instruit;</li>
                <li>că abia după aceea i se permite lucrul de sine stătător.</li>
              </ul>
              <p className="mt-3">Dacă lipsește una dintre ele, postul rămâne închis pentru acel elev.</p>
            </Card>
          </div>
        </section>

        <section id="continut" className="bg-white px-4 py-14">
          <div className="mx-auto max-w-6xl">
            <Eyebrow n="03" title="Cinci pași la calculator" />
            <div className="grid gap-4 lg:grid-cols-5">
              {[
                ["1", "Riscuri", "Electrocutare de la cablu deteriorat, oboseală oculară, poziție vicioasă, scurtcircuit, incendiu de la priză supraîncărcată."],
                ["2", "Reguli", "Pornire și oprire de la buton. Fără demontat carcasa. Fără mâncare sau lichide pe masă. Prelungitor doar dacă e întreg și aprobat."],
                ["3", "Urgențe", "Unde e stingătorul sălii, trusa, alarma și scara. Cine anunță profesorul. Nu blocăm ușa cu ghiozdane."],
                ["4", "Practică", "Verificăm vizual ștecherul și izolația. Așezăm monitorul la o lungime de braț. Scaunul susține spatele. Cablurile nu atârnă pe interval."],
                ["5", "Admitere", "Profesorul pune 2–3 întrebări. Doar răspunsul corect plus semnătura în fișă deschid postul."],
              ].map(([n, t, d]) => (
                <article key={n} className="rounded-2xl border border-slate-200 p-4">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-[#0f4c81] text-sm font-bold text-white">{n}</span>
                  <h3 className="mt-3 font-semibold text-[#0a355c]">{t}</h3>
                  <p className="mt-1 text-sm text-slate-600">{d}</p>
                </article>
              ))}
            </div>
            <Note tone="warn">Dacă apare miros de plastic ars, nu se caută defectul de unul singur. Se oprește echipamentul, se scoate din priză doar dacă este sigur și se anunță profesorul.</Note>
          </div>
        </section>

        <section id="electrosecuritate" className="mx-auto max-w-6xl px-4 py-14">
          <Eyebrow n="04" title="Electrosecuritate" />
          <div className="grid items-start gap-6 lg:grid-cols-2">
            <div className="grid gap-4">
              <img src="/priza.jpg" alt="Priză cu împământare și cablu deteriorat pe birou" className="w-full rounded-3xl object-cover shadow-lg" />
              <img src="/tablou.jpg" alt="Tablou electric cu disjunctoare" className="w-full rounded-3xl object-cover shadow-lg" />
            </div>
            <div className="space-y-4">
              <Card title="Ce poate face curentul">
                <ul className="list-disc space-y-1 pl-5">
                  <li>Electrocutare — trecerea curentului prin corp.</li>
                  <li>Arsuri la locul de contact.</li>
                  <li>Contracție: mâna nu mai poate da drumul conductorului.</li>
                  <li>La zeci de miliamperi apare riscul de fibrilație.</li>
                  <li>Un scurtcircuit poate aprinde izolația înainte să sară siguranța.</li>
                </ul>
              </Card>
              <Card title="Cu ce ne apărăm în laborator">
                <ul className="list-disc space-y-1 pl-5">
                  <li>Carcasă cu izolație dublă — nu o deschidem.</li>
                  <li>Priză cu contact de protecție (împământare).</li>
                  <li>Disjunctor diferențial pe circuit: taie când apare o scurgere spre pământ sau prin om.</li>
                  <li>Mâini uscate. Nicio intervenție la tablou.</li>
                  <li>Un aparat pe priză, nu un ciorchine de prelungitoare.</li>
                </ul>
              </Card>
              <Note>Faptul că laboratorul este uscat nu anulează riscul. Un cablu tăiat mută pericolul pe postul acela, chiar dacă sala este fără pericol major.</Note>
              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-black shadow-lg">
                <div className="aspect-video">
                  <iframe
                    className="h-full w-full"
                    src="https://www.youtube-nocookie.com/embed/bNF0CFh47NM"
                    title="Exploatarea instalațiilor electrice — securitatea personalului"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <p className="bg-white px-4 py-3 text-sm text-slate-600">Video: securitatea personalului la instalațiile electrice (EL-IT XP, 3:37).</p>
              </div>
            </div>
          </div>
        </section>

        <section id="comparatie" className="bg-white px-4 py-14">
          <div className="mx-auto max-w-6xl">
            <Eyebrow n="05" title="Trei feluri de încăperi" />
            <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
              <table className="w-full min-w-[720px] border-collapse text-sm">
                <thead>
                  <tr className="bg-[#0f4c81] text-left text-white">
                    <th className="px-4 py-3">Categorie</th>
                    <th className="px-4 py-3">Ce o face periculoasă</th>
                    <th className="px-4 py-3">Unde o vedem</th>
                    <th className="px-4 py-3">Ce schimbăm la protecție</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="px-4 py-3 align-top"><Tag tone="ok">Fără pericol major</Tag></td>
                    <td className="px-4 py-3 align-top">Umiditate normală, fără praf conductiv, podea izolantă, temperatură obișnuită.</td>
                    <td className="px-4 py-3 align-top">Săli de clasă, birouri, Laboratorul 102, camera din cămin.</td>
                    <td className="px-4 py-3 align-top">Priză cu împământare, stingător ABC, instructaj de post.</td>
                  </tr>
                  <tr className="border-b bg-slate-50">
                    <td className="px-4 py-3 align-top"><Tag tone="mid">Cu pericol majorat</Tag></td>
                    <td className="px-4 py-3 align-top">Umezeală mare, căldură, praf conductiv sau podea care conduce. Un singur factor ajunge.</td>
                    <td className="px-4 py-3 align-top">Baia și bucătăria căminului, unele ateliere.</td>
                    <td className="px-4 py-3 align-top">Diferențial obligatoriu, fără prelungitoare pe jos ud, verificări mai dese.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 align-top"><Tag tone="bad">Foarte periculoase</Tag></td>
                    <td className="px-4 py-3 align-top">Umezeală extremă, substanțe agresive sau mai mulți factori deodată.</td>
                    <td className="px-4 py-3 align-top">Zone tehnice închise: cazangerie, depozite speciale. Nu sunt sălile noastre.</td>
                    <td className="px-4 py-3 align-top">Acces doar pentru personal, tensiune redusă, instruire separată.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <figure className="overflow-hidden rounded-3xl border border-slate-200">
                <img src="/lab.jpg" alt="Sala de calculatoare" className="h-64 w-full object-cover" />
                <figcaption className="p-4 text-sm text-slate-600">Laboratorul 102 stă la „fără pericol major”, dar fiecare post are propriul cablu. Pericolul local nu dispare odată cu categoria sălii.</figcaption>
              </figure>
              <figure className="overflow-hidden rounded-3xl border border-slate-200">
                <img src="/camin.jpg" alt="Bucătărie de cămin cu chiuvetă și aparate" className="h-64 w-full object-cover" />
                <figcaption className="p-4 text-sm text-slate-600">În cămin camera e una, bucătăria e alta. Apa de lângă fierbător urcă încăperea la pericol majorat.</figcaption>
              </figure>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <Card title="Evacuare">
                <img src="/evacuare.jpg" alt="Hol cu indicatoare de ieșire" className="mb-3 h-36 w-full rounded-xl object-cover" />
                Culoarul rămâne liber. Indicatoarele verzi se văd și când se taie lumina de lucru, pentru că iluminatul de evacuare e separat.
              </Card>
              <Card title="Stingere">
                <img src="/stingator.jpg" alt="Stingător pe peretele holului" className="mb-3 h-36 w-full rounded-xl object-cover" />
                Știm unde e stingătorul sălii și al etajului înainte de incident. Nu îl mutăm ca să „încapă un dulap”.
              </Card>
              <Card title="Cămin, pe scurt">
                <img src="/ergonomie.jpg" alt="Colț de lucru" className="mb-3 h-36 w-full rounded-xl object-cover" />
                În cameră: un aparat, cablu întreg. În baie: niciun încărcător pe marginea căzii. Administratorul și elevul de serviciu știu planul.
              </Card>
            </div>
          </div>
        </section>

        <section id="concluzii" className="mx-auto max-w-6xl px-4 py-14">
          <Eyebrow n="06" title="Concluzii" />
          <div className="grid gap-4 md:grid-cols-2">
            <Card title="Patru idei">
              <ol className="list-decimal space-y-2 pl-5">
                <li>Legea cere instructaj real, nu o bifă.</li>
                <li>În Laboratorul 102 îl face profesorul responsabil, iar fișa dovedește că a avut loc.</li>
                <li>Calculatorul este sigur doar cu cablu întreg, mână uscată și disjunctor diferențial.</li>
                <li>Sala și căminul nu au același grad de pericol. Bucătăria și baia cer măsuri mai stricte.</li>
              </ol>
            </Card>
            <Card title="De reținut">
              <ul className="list-disc space-y-2 pl-5">
                <li>Durata minimă a instructajului la locul de muncă: 8 ore.</li>
                <li>Grupa de instruire: cel mult 20 de persoane.</li>
                <li>Lab. 102: fără pericol major, cu risc local la fiecare post.</li>
                <li>Cămin: cameră fără pericol major, zonă umedă cu pericol majorat.</li>
                <li>Lucrul independent începe după verificare, nu după ce „am auzit o dată”.</li>
              </ul>
            </Card>
          </div>
          <div className="mt-6">
            <Card title="Surse pe care ne sprijinim">
              <ul className="list-disc space-y-1 pl-5">
                <li>Legea nr. 186/2008 privind securitatea și sănătatea în muncă.</li>
                <li>Materialele de curs: instructaj la locul de muncă și instruirea introductiv-generală.</li>
                <li>Modelul de instructaj la locul de muncă și normele generale de apărare împotriva incendiilor.</li>
              </ul>
            </Card>
          </div>
        </section>

        <section id="autori" className="bg-[#0a355c] px-4 py-16 text-white">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-center font-[Space_Grotesk,sans-serif] text-3xl font-bold">Cei cinci</h2>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {TEAM.map(([ini, name]) => (
                <div key={name} className="flex min-w-[220px] items-center gap-3 rounded-2xl bg-white/10 px-4 py-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-sm font-bold text-[#0a355c]">{ini}</span>
                  <div className="font-semibold">{name}</div>
                </div>
              ))}
            </div>
            <p className="mt-8 text-center text-sm text-white/70">Laboratorul 102 · miercuri, 4 noiembrie · ora a V-a</p>
          </div>
        </section>
      </main>
    </div>
  );
}

function Eyebrow({ n, title }: { n: string; title: string }) {
  return (
    <div className="mb-6">
      <span className="text-xs font-semibold tracking-wide text-[#e63946]">{n}</span>
      <h2 className="font-[Space_Grotesk,sans-serif] text-3xl font-bold text-[#0a355c]">{title}</h2>
    </div>
  );
}

function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="mb-2 font-[Space_Grotesk,sans-serif] text-lg font-semibold text-[#0a355c]">{title}</h3>
      <div className="text-[15px] leading-relaxed text-slate-700">{children}</div>
    </article>
  );
}

function Note({ children, tone = "info" }: { children: ReactNode; tone?: "info" | "warn" }) {
  return (
    <p className={`mt-4 rounded-r-xl border-l-4 px-4 py-3 text-sm ${tone === "warn" ? "border-[#e63946] bg-red-50" : "border-[#0f4c81] bg-blue-50"}`}>
      {children}
    </p>
  );
}

function Tag({ children, tone }: { children: ReactNode; tone: "ok" | "mid" | "bad" }) {
  const cls = tone === "ok" ? "bg-teal-100 text-teal-800" : tone === "mid" ? "bg-orange-100 text-orange-800" : "bg-red-100 text-red-800";
  return <span className={`inline-block rounded-md px-2 py-1 text-xs font-semibold ${cls}`}>{children}</span>;
}

function Shot({ src, cap }: { src: string; cap: string }) {
  return (
    <figure className="group overflow-hidden rounded-2xl">
      <img src={src} alt={cap} className="h-56 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-64" />
      <figcaption className="mt-1 text-xs text-slate-500">{cap}</figcaption>
    </figure>
  );
}
