import type { PublicEmergencyPageDto } from "@/core/application/dto";

interface EmergencyPageViewProps {
  data: PublicEmergencyPageDto;
}

export function EmergencyPageView({ data }: EmergencyPageViewProps) {
  return (
    <main
      style={{
        maxWidth: 480,
        margin: "0 auto",
        padding: "1.5rem 1rem",
        minHeight: "100dvh",
      }}
    >
      <header
        style={{
          background: "#b91c1c",
          color: "#fff",
          padding: "1rem",
          borderRadius: 8,
          marginBottom: "1.5rem",
        }}
      >
        <p style={{ margin: 0, fontWeight: 600 }}>{data.alertMessage}</p>
      </header>

      <section>
        <h1 style={{ fontSize: "1.5rem", margin: "0 0 0.5rem" }}>
          {data.preferredName}
        </h1>
        {data.approximateAge !== undefined && (
          <p>Perkiraan usia: {data.approximateAge} tahun</p>
        )}
      </section>

      {data.criticalAllergies && (
        <section style={{ marginTop: "1rem" }}>
          <h2>Alergi</h2>
          <p>{data.criticalAllergies}</p>
        </section>
      )}

      <section style={{ marginTop: "2rem", display: "grid", gap: "0.75rem" }}>
        {data.contacts.map((contact) => (
          <a
            key={contact.telUri}
            href={contact.telUri}
            style={{
              display: "block",
              textAlign: "center",
              padding: "1rem",
              background: contact.isPrimary ? "#15803d" : "#2563eb",
              color: "#fff",
              borderRadius: 8,
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Hubungi {contact.label}
          </a>
        ))}
        <a
          href="tel:112"
          style={{
            display: "block",
            textAlign: "center",
            padding: "1rem",
            background: "#dc2626",
            color: "#fff",
            borderRadius: 8,
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          Telepon 112
        </a>
      </section>
    </main>
  );
}
