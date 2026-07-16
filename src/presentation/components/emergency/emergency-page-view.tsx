import type { PublicEmergencyPageDto } from "@/core/application/dto";
import { ProfileMode } from "@/core/domain/enums";
import {
  BadgeAlert,
  Brain,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Droplets,
  FileHeart,
  HeartPulse,
  Languages,
  MessageCircle,
  Phone,
  Pill,
  ShieldCheck,
  Siren,
  Star,
  UserRound,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface EmergencyPageViewProps {
  data: PublicEmergencyPageDto;
}

const cardClass =
  "mt-5 rounded-[28px] border border-[rgba(109,74,255,0.08)] bg-white/95 p-6 shadow-[0_2px_3px_rgba(23,23,23,0.025),0_20px_44px_-28px_rgba(67,46,151,0.32)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_6px_rgba(23,23,23,0.025),0_24px_50px_-28px_rgba(67,46,151,0.42)] motion-reduce:transform-none motion-reduce:transition-none";

const medicalTone = {
  primary: {
    icon: "bg-[#F3EEFF] text-[#6D4AFF]",
    pill: "border-[#E4DCFF] bg-[#F5F2FF] text-[#5838E8]",
    marker: "bg-[#6D4AFF]",
  },
  danger: {
    icon: "bg-[#FFF3F3] text-[#EF4444]",
    pill: "border-red-100 bg-red-50 text-red-800",
    marker: "bg-[#EF4444]",
  },
  warning: {
    icon: "bg-[#FFF8E8] text-[#F59E0B]",
    pill: "border-amber-100 bg-amber-50 text-amber-800",
    marker: "bg-[#F59E0B]",
  },
  info: {
    icon: "bg-blue-50 text-blue-500",
    pill: "border-blue-100 bg-blue-50 text-blue-800",
    marker: "bg-blue-500",
  },
} as const;

export function EmergencyPageView({ data }: EmergencyPageViewProps) {
  const contacts = [...data.contacts].sort(
    (a, b) => Number(b.isPrimary) - Number(a.isPrimary),
  );
  const primaryContact = contacts.find((contact) => contact.isPrimary) ?? contacts[0];
  const disclaimer = getDisclaimer(data.profileMode);

  return (
    <main className="mx-auto min-h-dvh w-full max-w-[520px] px-4 pt-[max(1rem,env(safe-area-inset-top))] pb-[calc(10rem+env(safe-area-inset-bottom))] max-[350px]:px-3">
      <div className="mb-4 mt-1 flex items-center justify-center gap-2 text-[13px] font-bold uppercase tracking-[0.11em] text-[#6D4AFF]">
        <ShieldCheck size={17} aria-hidden="true" />
        RAKSA
      </div>

      <div className="mb-4 mt-1 flex items-center justify-center gap-2 text-[13px] font-bold uppercase tracking-[0.11em] text-[#6D4AFF]">
        <p className="mb-2.5 mt-0">
        <span className="rounded-full border border-red-500/20 bg-white/70 px-2.5 py-1 text-[15px] font-bold uppercase tracking-[0.075em] text-red-800">
          Emergency Information
        </span>
      </p>
      </div>

      <section
        className="fixed bottom-[max(.65rem,env(safe-area-inset-bottom))] left-1/2 z-20 grid w-[calc(100%-1rem)] max-w-[504px] -translate-x-1/2 gap-2.5 rounded-[22px] border border-[#ECE8FF]/90 bg-white/85 p-2.5 shadow-[0_22px_50px_-25px_rgba(51,35,116,0.48)] backdrop-blur-xl"
        aria-label="Tindakan darurat"
      >
        {primaryContact && (
          <a
            href={primaryContact.telUri}
            style={{ color: "#ffffff" }}
            className="flex min-h-14 items-center justify-center gap-2.5 rounded-2xl bg-[#7247B8] px-4 py-3.5 text-center text-[15px] font-bold leading-tight no-underline shadow-[0_14px_28px_-15px_rgba(216,185,211,0.7)] transition duration-200 hover:-translate-y-px hover:bg-[#CFAECC] active:scale-[0.975] motion-reduce:transform-none motion-reduce:transition-none"
          >
            <Phone size={22} style={{ color: "#ffffff" }} aria-hidden="true" />
            Hubungi {primaryContact.label}
          </a>
        )}
        <div className="grid grid-cols-2 gap-2.5">
          {primaryContact && (
            <a
              href={toWhatsAppUri(primaryContact.telUri)}
              style={{ color: "#ffffff" }}
              className="flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-[#2FB201] px-3 py-3.5 text-center text-[15px] font-bold no-underline shadow-[0_14px_28px_-15px_rgba(181,239,164,0.7)] transition duration-200 hover:bg-[#A8E896] active:scale-[0.975] motion-reduce:transform-none motion-reduce:transition-none max-[350px]:px-2 max-[350px]:text-[13px]"
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={21} style={{ color: "#ffffff" }} aria-hidden="true" />
              WhatsApp
            </a>
          )}
          <a
            href="tel:112"
            style={{ color: "#ffffff" }}
            className="flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-[#F192A5] px-3 py-3.5 text-center text-[15px] font-bold no-underline shadow-[0_14px_28px_-15px_rgba(241,146,165,0.7)] transition duration-200 hover:-translate-y-px hover:bg-[#EE849A] active:scale-[0.975] motion-reduce:transform-none motion-reduce:transition-none max-[350px]:px-2 max-[350px]:text-[13px]"
          >
            <Siren size={22} style={{ color: "#ffffff" }} aria-hidden="true" />
            Telepon 112
          </a>
        </div>
      </section>

      <section className={`${cardClass} p-5 max-[350px]:p-4`}>
        <div className="flex items-center gap-4">
          <span className="grid size-[72px] shrink-0 place-items-center rounded-[20px] border border-[#E4DCFF] bg-gradient-to-br from-[#F8F5FF] to-[#F3EEFF] text-[#6D4AFF]">
            <UserRound size={29} aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <h1 className="m-0 truncate text-[clamp(2rem,9vw,2.5rem)] font-bold leading-[1.08] tracking-[-0.045em] text-[#171717]">
              {data.preferredName}
            </h1>
          </div>
        </div>

        {(data.approximateAge !== undefined ||
          data.bloodType ||
          data.languageHint) && (
            <div className="mt-3.5 flex flex-wrap gap-3">
              {data.approximateAge !== undefined && (
                <Fact icon={CalendarDays} value={`${data.approximateAge} Tahun`} />
              )}
              {data.bloodType && <Fact icon={Droplets} value={data.bloodType} />}
              {data.languageHint && (
                <Fact icon={Languages} value={formatLanguage(data.languageHint)} />
              )}
            </div>
          )}
      </section>

      {contacts.length > 0 && (
        <section className="mt-5" aria-labelledby="emergency-contacts-title">
          <h2
            id="emergency-contacts-title"
            className="mb-3 mt-0 text-lg font-bold text-[#171717]"
          >
            Kontak Darurat
          </h2>
          <div className="grid gap-3">
            {contacts.map((contact) => (
              <a
                key={`${contact.telUri}-${contact.label}`}
                href={contact.telUri}
                className="relative flex min-h-[82px] max-h-[92px] cursor-pointer items-center gap-3 rounded-[20px] border border-[#ECE8FF] bg-white p-[18px] text-inherit no-underline shadow-[0_2px_3px_rgba(23,23,23,0.02),0_14px_32px_-26px_rgba(67,46,151,0.34)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_6px_rgba(23,23,23,0.02),0_24px_50px_-28px_rgba(67,46,151,0.38)] active:scale-[0.98] motion-reduce:transform-none motion-reduce:transition-none"
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-full border border-[#E4DCFF] bg-[#F3EEFF] text-[#6D4AFF]">
                  <UserRound size={24} aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <strong className="block truncate text-lg font-bold text-[#171717]">
                    {contact.label}
                  </strong>
                  <small className="mt-1 block text-sm text-[#6B7280]">
                    {contact.label === contact.relationship
                      ? "Kontak darurat"
                      : contact.relationship}
                  </small>
                </span>
                {contact.isPrimary && (
                  <span className="absolute right-[68px] top-2.5 inline-flex items-center gap-1 rounded-full bg-[#EAFBF2] px-2 py-1 text-xs font-semibold text-[#15803D]">
                    <Star size={12} fill="currentColor" aria-hidden="true" />
                    Utama
                  </span>
                )}
                <span className="ml-auto grid size-10 shrink-0 place-items-center rounded-full bg-[#F3EEFF] text-[#6D4AFF]">
                  <Phone size={20} aria-hidden="true" />
                </span>
                <ChevronRight className="shrink-0 text-[#A7A1B8]" size={20} aria-hidden="true" />
              </a>
            ))}
          </div>
        </section>
      )}

      {data.criticalAllergies && (
        <InfoCard
          icon={BadgeAlert}
          title="Alergi penting"
          body={data.criticalAllergies}
          tone="danger"
          display="pills"
        />
      )}

      {data.medicalConditions && (
        <InfoCard
          icon={HeartPulse}
          title="Kondisi medis"
          body={data.medicalConditions}
          tone="primary"
          display="pills"
        />
      )}

      {data.importantMedications && (
        <InfoCard
          icon={Pill}
          title="Obat penting"
          body={data.importantMedications}
          tone="info"
          display="pills"
        />
      )}

      {data.profileMode === ProfileMode.CHILD_GUARDIAN &&
        data.reunificationNote && (
          <InfoCard
            icon={ShieldCheck}
            title="Petunjuk mempertemukan keluarga"
            body={data.reunificationNote}
            tone="primary"
          />
        )}

      {data.profileMode === ProfileMode.ELDERLY_DEPENDENT &&
        (data.disorientationNotes || data.cognitiveConditionFlag) && (
          <InfoCard
            icon={Brain}
            title="Catatan pendampingan"
            body={
              data.disorientationNotes ??
              "Orang ini mungkin mengalami kebingungan atau disorientasi. Dampingi dengan tenang sambil menghubungi keluarga."
            }
            tone="primary"
          />
        )}

      {data.emergencyNotes && (
        <InfoCard
          icon={FileHeart}
          title="Catatan darurat"
          body={data.emergencyNotes}
          tone="warning"
          display="note"
        />
      )}

      <footer className={`${cardClass} bg-gradient-to-br from-white/95 to-[#F3EEFF]/70`}>
        <div className="flex items-center gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-[14px] bg-emerald-50 text-[#22C55E]">
            <CheckCircle2 size={20} aria-hidden="true" />
          </span>
          <div>
            <strong className="block text-[15px]">Diverifikasi oleh pemilik</strong>
            <p className="mb-0 mt-1 text-sm text-[#6B7280]">
              Informasi profil darurat RAKSA
            </p>
          </div>
        </div>
        <div className="mt-3.5 flex items-center gap-2 border-t border-[#ECE8FF] pt-3 text-sm font-semibold text-gray-600">
          <Clock3 size={16} className="text-[#6D4AFF]" aria-hidden="true" />
          {data.lastConfirmedAt
            ? `Terakhir dikonfirmasi ${formatDate(data.lastConfirmedAt)}`
            : "Tanggal konfirmasi belum tersedia"}
        </div>
        <p className="mb-0 mt-3 flex items-start gap-2 text-sm leading-relaxed text-[#6B7280]">
          <ShieldCheck size={16} className="mt-0.5 shrink-0 text-[#6D4AFF]" aria-hidden="true" />
          <span>{disclaimer}</span>
        </p>
      </footer>
    </main>
  );
}

function Fact({
  icon: Icon,
  value,
}: {
  icon: LucideIcon;
  value: string;
}) {
  return (
    <div className="inline-flex h-10 min-w-0 items-center gap-2 rounded-full border border-[#ECE8FF] bg-[#F5F2FF] px-3.5 text-[#6D4AFF]">
      <Icon size={18} aria-hidden="true" />
      <strong className="text-base font-semibold leading-none text-[#171717] [overflow-wrap:anywhere]">
        {value}
      </strong>
    </div>
  );
}

function InfoCard({
  icon: Icon,
  title,
  body,
  tone = "primary",
  display = "note",
}: {
  icon: LucideIcon;
  title: string;
  body: string;
  tone?: keyof typeof medicalTone;
  display?: "pills" | "note";
}) {
  const colors = medicalTone[tone];

  return (
    <section
      className="mt-4 rounded-3xl border border-[#ECE8FF] bg-white p-6 shadow-[0_2px_3px_rgba(23,23,23,0.02),0_16px_36px_-28px_rgba(67,46,151,0.3)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_8px_rgba(23,23,23,0.025),0_22px_42px_-28px_rgba(67,46,151,0.4)] motion-safe:animate-[medical-card-in_400ms_cubic-bezier(0.16,1,0.3,1)_both] motion-reduce:transform-none motion-reduce:transition-none"
    >
      <h2 className="m-0 flex items-center gap-3.5 text-xl font-semibold leading-tight text-[#171717]">
        <span className={`grid size-[52px] shrink-0 place-items-center rounded-2xl ${colors.icon}`}>
          <Icon size={22} aria-hidden="true" />
        </span>
        {title}
      </h2>
      {display === "pills" ? (
        <div className="mt-4 flex flex-wrap gap-2.5">
          {splitMedicalValues(body).map((value, index) => (
            <span
              key={`${value}-${index}`}
              className={`inline-flex h-9 items-center gap-2 rounded-full border px-3.5 text-[15px] font-semibold ${colors.pill}`}
            >
              <span
                className={`size-2 shrink-0 rounded-full ${colors.marker}`}
                aria-hidden="true"
              />
              {value}
            </span>
          ))}
        </div>
      ) : (
        <p className="mb-0 mt-4 whitespace-pre-wrap rounded-2xl bg-slate-50 px-4 py-3.5 text-base font-medium leading-[1.6] text-[#6B7280]">
          {body}
        </p>
      )}
    </section>
  );
}

function getDisclaimer(mode: PublicEmergencyPageDto["profileMode"]): string {
  switch (mode) {
    case ProfileMode.CHILD_GUARDIAN:
      return "Informasi ini diberikan oleh wali. Verifikasi identitas penjemput sebelum menyerahkan anak.";
    case ProfileMode.ELDERLY_DEPENDENT:
      return "Informasi ini diberikan oleh keluarga dan hanya untuk membantu dalam keadaan darurat.";
    default:
      return "Informasi ini diberikan oleh pemilik gelang dan bukan pengganti penilaian tenaga medis.";
  }
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

function toWhatsAppUri(telUri: string): string {
  return `https://wa.me/${telUri.replace(/\D/g, "")}`;
}

function formatLanguage(language: string): string {
  return language.replace(/^Bahasa\s+/i, "");
}

function splitMedicalValues(value: string): string[] {
  return value
    .split(/[,;\n]+/)
    .map((item) => item.trim())
    .filter(Boolean);
}
