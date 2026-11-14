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
              Ce învață elevul înainte să lucreze la calculator și cât de periculoasă este fiecare încăpere din colegiu și din cămin.
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
              <h2 className="font-[Space_Grotesk,sans-serif] text-3xl font-bold text-[#0a355c]">Ce este instructajul la locul de muncă</h2>
              <p className="mt-3 text-slate-700">
                Este instruirea în care afli riscurile <b>postului tău</b> și cum să te ferești de ele. Pentru elev, postul este calculatorul din Laboratorul 102.
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700">
                <li>Mai întâi se face instruirea introductiv-generală, cu regulile întregului colegiu.</li>
                <li>Apoi urmează instructajul la locul de muncă, doar despre laboratorul tău.</li>
                <li>Fără instructaj și fără semnătură în fișă, elevul nu lucrează singur.</li>
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
              ["Cine îl face", "Profesorul responsabil de Laboratorul 102, cu grupe de cel mult 20 de elevi."],
              ["Ce cuprinde", "Riscurile postului, regulile laboratorului, primul ajutor, stingerea incendiului și evacuarea, plus o demonstrație practică."],
              ["Când se repetă", "La primul laborator, la schimbarea postului, la echipament nou și după un incident."],
            ].map(([t, d]) => (
              <Card key={t} title={t}>{d}</Card>
            ))}
          </div>
          <div className="mt-6 grid items-center gap-6 lg:grid-cols-2">
            <img src="/ergonomie.jpg" alt="Post de lucru cu monitor, tastatură și scaun" className="floaty w-full rounded-3xl object-cover shadow-lg" />
            <Card title="Fișa de instruire">
              <p>Fișa personală de instruire dovedește că instructajul a avut loc. În ea se scrie:</p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>data și cine a făcut instructajul;</li>
                <li>că elevul a răspuns corect la verificare;</li>
                <li>semnătura elevului.</li>
              </ul>
              <p className="mt-3">Abia după asta elevul poate lucra singur la calculator.</p>
            </Card>
          </div>
        </section>

        <section id="continut" className="bg-white px-4 py-14">
          <div className="mx-auto max-w-6xl">
            <Eyebrow n="03" title="Cinci pași la calculator" />
            <div className="grid gap-4 lg:grid-cols-5">
              {[
                ["1", "Riscuri", "Curentul electric, incendiul de la cabluri, oboseala ochilor și a spatelui."],
                ["2", "Reguli", "Pornești și oprești doar de la buton. Nu deschizi carcasa. Fără apă sau mâncare pe masă."],
                ["3", "Urgențe", "Știi unde sunt stingătorul, trusa de prim ajutor și ieșirea. Ușa nu se blochează cu ghiozdane."],
                ["4", "Practică", "Verifici cablul și priza. Monitorul stă la o lungime de braț. Spatele sprijinit de scaun."],
                ["5", "Verificare", "Profesorul pune câteva întrebări. Răspunzi corect, semnezi fișa și poți lucra."],
              ].map(([n, t, d]) => (
                <article key={n} className="rounded-2xl border border-slate-200 p-4">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-[#0f4c81] text-sm font-bold text-white">{n}</span>
                  <h3 className="mt-3 font-semibold text-[#0a355c]">{t}</h3>
                  <p className="mt-1 text-sm text-slate-600">{d}</p>
                </article>
              ))}
            </div>
            <Note tone="warn">Miros de plastic ars sau fum? Oprești calculatorul, te îndepărtezi și anunți imediat profesorul. Nu repari nimic singur.</Note>
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
                  <li>Electrocutare: curentul trece prin corp.</li>
                  <li>Arsuri în locul unde ai atins firul.</li>
                  <li>Mâna se strânge și nu mai poate da drumul firului.</li>
                  <li>Chiar și un curent mic poate opri inima.</li>
                  <li>Un scurtcircuit poate porni un incendiu.</li>
                </ul>
              </Card>
              <Card title="Cu ce ne apărăm în laborator">
                <ul className="list-disc space-y-1 pl-5">
                  <li>Cabluri și carcase întregi, pe care nu le deschidem.</li>
                  <li>Prize cu împământare.</li>
                  <li>Disjunctor diferențial: taie curentul imediat ce acesta trece prin om.</li>
                  <li>Mâini uscate. La tabloul electric umblă doar electricianul.</li>
                  <li>Fără prelungitoare legate unul de altul.</li>
                </ul>
              </Card>
              <Note>Chiar dacă sala e sigură, un singur cablu tăiat face postul acela periculos.</Note>
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
                    <td className="px-4 py-3 align-top">Nimic: aer uscat, podea de lemn sau linoleum, temperatură normală.</td>
                    <td className="px-4 py-3 align-top">Săli de clasă, Laboratorul 102, camera din cămin.</td>
                    <td className="px-4 py-3 align-top">Prize cu împământare, stingător în apropiere.</td>
                  </tr>
                  <tr className="border-b bg-slate-50">
                    <td className="px-4 py-3 align-top"><Tag tone="mid">Cu pericol majorat</Tag></td>
                    <td className="px-4 py-3 align-top">Un singur factor ajunge: umezeală, căldură mare, praf sau podea de beton ori ceramică.</td>
                    <td className="px-4 py-3 align-top">Bucătăria căminului, atelierele, subsolul.</td>
                    <td className="px-4 py-3 align-top">Disjunctor diferențial obligatoriu, fără prelungitoare pe jos.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 align-top"><Tag tone="bad">Foarte periculoase</Tag></td>
                    <td className="px-4 py-3 align-top">Apă peste tot, substanțe chimice sau doi factori deodată.</td>
                    <td className="px-4 py-3 align-top">Dușurile și spălătoria din cămin, încăperile tehnice.</td>
                    <td className="px-4 py-3 align-top">Niciun aparat din priză lângă apă. În încăperile tehnice intră doar personalul.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <figure className="overflow-hidden rounded-3xl border border-slate-200">
                <img src="/lab.jpg" alt="Sala de calculatoare" className="h-64 w-full object-cover" />
                <figcaption className="p-4 text-sm text-slate-600">Laboratorul 102 este „fără pericol major”, dar fiecare cablu trebuie verificat.</figcaption>
              </figure>
              <figure className="overflow-hidden rounded-3xl border border-slate-200">
                <img src="/camin.jpg" alt="Bucătărie de cămin cu chiuvetă și aparate" className="h-64 w-full object-cover" />
                <figcaption className="p-4 text-sm text-slate-600">În cămin, camera e sigură, dar apa de lângă prize face bucătăria mai periculoasă.</figcaption>
              </figure>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <Card title="Evacuare">
                <img src="/evacuare.jpg" alt="Hol cu indicatoare de ieșire" className="mb-3 h-36 w-full rounded-xl object-cover" />
                Culoarul rămâne liber. Urmezi indicatoarele verzi, care rămân aprinse chiar dacă se oprește lumina.
              </Card>
              <Card title="Stingere">
                <img src="/stingator.jpg" alt="Stingător pe peretele holului" className="mb-3 h-36 w-full rounded-xl object-cover" />
                Afli din timp unde e stingătorul. Pe aparatele din priză nu se aruncă apă.
              </Card>
              <Card title="Cămin, pe scurt">
                <img src="/primajutor.jpg" alt="Trusă de prim ajutor și plan de evacuare" className="mb-3 h-36 w-full rounded-xl object-cover" />
                Nu lași aparate pornite când pleci. Fără reșouri în cameră. Niciun încărcător lângă duș sau chiuvetă.
              </Card>
            </div>
          </div>
        </section>

        <section id="concluzii" className="mx-auto max-w-6xl px-4 py-14">
          <Eyebrow n="06" title="Concluzii" />
          <div className="grid gap-4 md:grid-cols-2">
            <Card title="Patru idei">
              <ol className="list-decimal space-y-2 pl-5">
                <li>Întâi instructajul, apoi calculatorul.</li>
                <li>Instructajul îl face profesorul, iar semnătura în fișă îl dovedește.</li>
                <li>Cablu întreg, mâini uscate și priză cu împământare.</li>
                <li>Cu cât e mai multă apă în încăpere, cu atât e mai periculoasă.</li>
              </ol>
            </Card>
            <Card title="De reținut">
              <ul className="list-disc space-y-2 pl-5">
                <li>Grupa de instruire: cel mult 20 de elevi.</li>
                <li>Laboratorul 102 și camera din cămin: fără pericol major.</li>
                <li>Bucătăria căminului: cu pericol majorat.</li>
                <li>Dușurile și spălătoria: foarte periculoase.</li>
              </ul>
            </Card>
          </div>
          <div className="mt-6">
            <Card title="Surse pe care ne sprijinim">
              <ul className="list-disc space-y-1 pl-5">
                <li>Legea nr. 186/2008 privind securitatea și sănătatea în muncă.</li>
                <li>Legea nr. 267/1994 privind apărarea împotriva incendiilor.</li>
                <li>Materialele de curs SSM despre instruire și modelul de instructaj la locul de muncă.</li>
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
