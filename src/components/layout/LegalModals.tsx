"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";

type ModalKey = "impressum" | "datenschutz" | null;

const linkClass = "transition-colors hover:text-white";

const sectionLabelClass =
  "mb-2 font-sans text-[10px] uppercase tracking-[0.35em] text-white/40";

const paragraphClass =
  "font-sans text-sm leading-relaxed text-white/70 [text-transform:none] [letter-spacing:normal]";

export default function LegalModals() {
  const [active, setActive] = useState<ModalKey>(null);
  const close = () => setActive(null);

  return (
    <>
      <button
        type="button"
        onClick={() => setActive("impressum")}
        className={linkClass}
      >
        Impressum
      </button>
      <span aria-hidden="true" className="h-3 w-px bg-white/20" />
      <button
        type="button"
        onClick={() => setActive("datenschutz")}
        className={linkClass}
      >
        Datenschutz
      </button>

      <Modal
        isOpen={active === "impressum"}
        onClose={close}
        title="Impressum"
      >
        <div className="space-y-8">
          <section>
            <h3 className={sectionLabelClass}>Unternehmen</h3>
            <p className={paragraphClass}>
              ACAB All Car&apos;s All Bike&apos;s GmbH
              <br />
              Eistrasse 3
              <br />
              6102 Malters, Schweiz
              <br />
              Geschäftsführer: Ardian Desku
            </p>
          </section>

          <section>
            <h3 className={sectionLabelClass}>Kontakt</h3>
            <p className={paragraphClass}>
              Telefon:{" "}
              <a
                href="tel:+41798691304"
                className="text-white/80 underline-offset-4 transition-colors hover:text-white hover:underline"
              >
                +41 79 869 13 04
              </a>
              <br />
              E-Mail:{" "}
              <a
                href="mailto:acab.garage@hotmail.com"
                className="text-white/80 underline-offset-4 transition-colors hover:text-white hover:underline"
              >
                acab.garage@hotmail.com
              </a>
            </p>
          </section>

          <section>
            <h3 className={sectionLabelClass}>Handelsregister</h3>
            <p className={paragraphClass}>
              Kanton Luzern
              <br />
              UID-Nummer: CHE-463.251.142
            </p>
          </section>

          <section>
            <h3 className={sectionLabelClass}>Haftungsausschluss</h3>
            <p className={paragraphClass}>
              Alle Angaben auf dieser Website wurden sorgfältig geprüft. Für
              die Richtigkeit, Vollständigkeit und Aktualität der Inhalte
              übernehmen wir keine Gewähr.
            </p>
          </section>

          <section>
            <h3 className={sectionLabelClass}>
              Haftungsausschluss für Inhalte und Links
            </h3>
            <p className={paragraphClass}>
              Verweise und Links auf Websites Dritter liegen ausserhalb unseres
              Verantwortungsbereichs. Es wird jegliche Verantwortung für solche
              Websites abgelehnt. Der Zugriff und die Nutzung solcher Websites
              erfolgen auf eigene Gefahr des jeweiligen Nutzers.
            </p>
          </section>

          <section>
            <h3 className={sectionLabelClass}>Urheberrechtserklärung</h3>
            <p className={paragraphClass}>
              Die Urheber- und alle anderen Rechte an Inhalten, Bildern, Fotos
              oder anderen Dateien auf dieser Website gehören ausschliesslich
              der ACAB All Car&apos;s All Bike&apos;s GmbH oder den speziell
              genannten Rechteinhabern. Für die Reproduktion jeglicher Elemente
              ist die schriftliche Zustimmung des Urheberrechtsträgers im
              Voraus einzuholen.
            </p>
          </section>
        </div>
      </Modal>

      <Modal
        isOpen={active === "datenschutz"}
        onClose={close}
        title="Datenschutz"
      >
        <div className="space-y-8">
          <section>
            <h3 className={sectionLabelClass}>Allgemeines</h3>
            <p className={paragraphClass}>
              Der Schutz Ihrer persönlichen Daten ist uns ein besonderes
              Anliegen. Wir verarbeiten Ihre Daten ausschliesslich auf
              Grundlage der gesetzlichen Bestimmungen, insbesondere des
              Schweizerischen Bundesgesetzes über den Datenschutz (DSG) sowie
              gemäss Art. 13 der Schweizerischen Bundesverfassung. Alle
              personenbezogenen Daten werden vertraulich behandelt und nicht
              ohne Ihre ausdrückliche Zustimmung an Dritte weitergegeben.
            </p>
          </section>

          <section>
            <h3 className={sectionLabelClass}>Verantwortliche Stelle</h3>
            <p className={paragraphClass}>
              ACAB All Car&apos;s All Bike&apos;s GmbH, Eistrasse 3, 6102
              Malters
              <br />
              E-Mail:{" "}
              <a
                href="mailto:acab.garage@hotmail.com"
                className="text-white/80 underline-offset-4 transition-colors hover:text-white hover:underline"
              >
                acab.garage@hotmail.com
              </a>
            </p>
          </section>

          <section>
            <h3 className={sectionLabelClass}>SSL/TLS-Verschlüsselung</h3>
            <p className={paragraphClass}>
              Diese Website nutzt aus Sicherheitsgründen eine SSL- bzw.
              TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie
              daran, dass die Adresszeile des Browsers von «http://» auf
              «https://» wechselt und an dem Schloss-Symbol im Browser. Wenn
              die SSL-Verschlüsselung aktiviert ist, können die Daten, die Sie
              an uns übermitteln, nicht von Dritten mitgelesen werden.
            </p>
          </section>

          <section>
            <h3 className={sectionLabelClass}>
              Datenerhebung / Server-Log-Dateien
            </h3>
            <p className={paragraphClass}>
              Diese Website erhebt keine persönlichen Daten durch Tracking-
              oder Analysetools. Der Hosting-Provider erhebt und speichert
              automatisch Informationen in Server-Log-Dateien, die Ihr Browser
              automatisch übermittelt: Browsertyp und Browserversion,
              verwendetes Betriebssystem, Referrer-URL, IP-Adresse sowie Datum
              und Uhrzeit der Anfrage. Diese Daten sind nicht bestimmten
              Personen zuordenbar und werden nicht mit anderen Datenquellen
              zusammengeführt.
            </p>
          </section>

          <section>
            <h3 className={sectionLabelClass}>Kontaktaufnahme</h3>
            <p className={paragraphClass}>
              Wenn Sie uns per E-Mail oder WhatsApp kontaktieren, werden Ihre
              Angaben zur Bearbeitung Ihrer Anfrage gespeichert und nicht an
              Dritte weitergegeben.
            </p>
          </section>

          <section>
            <h3 className={sectionLabelClass}>Google Maps</h3>
            <p className={paragraphClass}>
              Diese Website verwendet Google Maps zur Darstellung des
              Standorts. Bei der Nutzung der Karte werden Daten an Google LLC
              (USA) übertragen. Weitere Informationen finden Sie in der
              Datenschutzerklärung von Google.
            </p>
          </section>

          <section>
            <h3 className={sectionLabelClass}>Datenübermittlung in die USA</h3>
            <p className={paragraphClass}>
              Durch die Einbindung von Google Maps können Daten in die USA
              übertragen werden. Die USA gelten nach aktuellem europäischen
              Datenschutzrecht nicht als sicherer Drittstaat im Sinne der
              DSGVO. Es ist möglich, dass US-Behörden auf die dort
              gespeicherten Daten zugreifen können.
            </p>
          </section>

          <section>
            <h3 className={sectionLabelClass}>Ihre Rechte</h3>
            <p className={paragraphClass}>
              Sie haben gegenüber uns folgende Rechte hinsichtlich Ihrer
              personenbezogenen Daten: Recht auf Bestätigung, Auskunftsrecht,
              Recht auf Berichtigung, Recht auf Löschung, Recht auf
              Einschränkung der Verarbeitung, Recht auf Datenübertragbarkeit,
              Widerspruchsrecht sowie Widerruf einer Einwilligung mit Wirkung
              für die Zukunft. Zur Ausübung Ihrer Rechte wenden Sie sich per
              E-Mail an:{" "}
              <a
                href="mailto:acab.garage@hotmail.com"
                className="text-white/80 underline-offset-4 transition-colors hover:text-white hover:underline"
              >
                acab.garage@hotmail.com
              </a>
              .
            </p>
          </section>

          <section>
            <h3 className={sectionLabelClass}>
              Änderungen dieser Datenschutzerklärung
            </h3>
            <p className={paragraphClass}>
              Wir behalten uns vor, diese Datenschutzerklärung jederzeit ohne
              vorherige Ankündigung anzupassen. Es gilt die jeweils aktuelle,
              auf dieser Website veröffentlichte Fassung.
            </p>
          </section>
        </div>
      </Modal>
    </>
  );
}
