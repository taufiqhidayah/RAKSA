# GelangSiaga — Product Specification

## 1. Product Summary

**GelangSiaga** (also referred to as **RAKSA-TAG** in extended scope) is an emergency identification system built around an NFC/QR wristband. It serves three closely related safety scenarios:

1. **Adult medical emergency** — When someone is unconscious, injured, or otherwise unable to communicate, bystanders can tap, scan, or look up the wristband to see critical medical information and contact an emergency contact or emergency services.
2. **Child lost & guardian reunification** — When a child becomes separated from their parent or guardian in a crowded place (mall, airport, theme park, festival, or public transport), a bystander or staff member can tap or scan the child's wristband to immediately reach the parent or guardian — even when the child is too young to remember a phone number or explain where their parents are.
3. **Elderly dependent & cognitive safety** — When an elderly parent wears a wristband managed by their adult child, bystanders can help someone who is disoriented, has wandered from home, may have fainted in a crowd, or lives with Alzheimer's or dementia. The public page surfaces family contact and safety context — not just clinical triage.

In all cases, access is public (no login required) and shows only the minimum information needed for that scenario. For self-worn adult bands, that means medical context; for children, a clear "lost child" message and direct guardian contact; for elderly dependents, a blend of medical context, disorientation guidance, and family reunification.

**One account, many tags.** A single GelangSiaga account can manage multiple wristbands for different family members — your own band, tags for your toddler or children, and tags for elderly parents you care for. Each tag has its own profile, contacts, and public page. Adding a new tag is as simple as **Register New Tag** → enter Activation Code → complete that wearer's setup wizard.

Private owner access is fully separated from public emergency access. Account holders claim each wristband using a private Activation Code, manage all tags from a unified family dashboard, and can disable any tag if it is lost or misused. When a dependent's tag (child or elderly parent) is scanned, the account holder receives an in-app alert — and optionally the bystander's shared location — so they know help is needed and where to go.

GelangSiaga is designed as a responsive web application for MVP, targeting a safety-track competition prototype with a practical, privacy-conscious approach to bystander-assisted emergency identification and family safety.

---

## 2. Problem Statement

When someone faints, collapses, or is involved in an accident, bystanders often cannot identify the person or access critical health information. The victim's phone may be locked, damaged, out of battery, or simply unavailable. Important details — emergency contacts, allergies, and critical medical conditions — remain inaccessible at the moment they matter most.

A second, equally common problem affects families: **children who become separated from their parents or guardians**. This happens frequently in crowded public spaces — shopping malls, airports, religious gatherings, concerts, theme parks, and holiday travel. A young child may be frightened, crying, and unable to communicate their name clearly, their parent's phone number, or where they were supposed to meet. The parent's phone may be out of reach, on silent, or the parent may not yet know the child is missing. Bystanders and security staff want to help quickly, but have no reliable way to contact the guardian.

A third problem affects **families caring for elderly parents**: older adults who **forget the way home**, become **disoriented in crowded places**, live with **Alzheimer's or dementia**, or have conditions that make **sudden fainting** more likely. Their adult children cannot be everywhere at once. The parent's phone may be forgotten, dead, or too confusing to use. A wristband managed by the son or daughter gives strangers a immediate path to call family — without requiring the elderly person to remember anything.

Existing solutions rely heavily on the victim being conscious and able to unlock their device, or on physical cards that may not be carried consistently. For children, parents sometimes write a phone number on the child's arm or a paper tag — but that wears off, looks unprofessional, and exposes the number permanently to everyone. For elderly parents, family members may pin a note with a phone number inside a bag — but that is easy to miss and does not help in a medical emergency. There is no simple, always-visible, tap-or-scan mechanism that works when the person cannot speak and their phone cannot help — whether that person is an unconscious adult, a lost child, or a confused elderly parent who needs to get home.

---

## 3. Proposed Solution

GelangSiaga provides a wristband containing an NFC tag (NTAG213), a QR code backup, a visible Emergency ID, and clear instruction text such as **"TAP / SCAN IN EMERGENCY"**.

Bystanders use any of three public access paths:

1. **NFC tap** — opens a public emergency URL encoded on the tag
2. **QR scan** — same public emergency URL as NFC
3. **Manual lookup** — enter the visible Emergency ID on a lookup page

The public emergency page requires no login and displays only minimum critical information with large, mobile-first action buttons to contact an emergency contact or call emergency services. Every access is logged for the owner's awareness.

Account holders manage all tags privately: they register once, then claim each wristband with an Activation Code from the package/manual, fill in that wearer's emergency profile, preview what bystanders will see, and activate the tag. From the family dashboard they can **Register New Tag** at any time to add another band — for themselves, a child, or an elderly parent. Each tag is configured independently; the account holder can edit, disable, or review scan history per tag.

For **child wristbands**, the parent or guardian owns the account and manages the child's profile. The public page prioritizes guardian contact over medical detail — a large **Call Parent / Guardian** action is the primary CTA, with optional allergy information for safety.

For **elderly dependent wristbands**, an adult child (or caregiver) owns the account and manages the parent's profile. The public page blends medical context with family reunification — prominent **Call Family** actions plus optional disorientation notes (e.g., "May need help finding way home", "Has Alzheimer's — please stay with them").

When any **dependent tag** (child or elderly) is scanned, the account holder receives a **scan notification** in their dashboard/app. The public page also offers a recommended bystander action — **Share Location with Family** — so the helper can voluntarily send their current GPS coordinates to the account holder, enabling faster reunification without continuous tracking of the wearer.

---

## 4. Use Cases & Product Modes

GelangSiaga supports three product modes on the same platform and hardware. The mode is selected during setup and determines the public page layout, required fields, and default instruction text on the wristband. All modes share the same **family account** — one login can manage multiple tags in any combination of modes.

### Mode A: Adult Emergency (`adult_emergency`)

**Scenario:** Unconscious, injured, or non-communicative adult — typically **self-managed** (wearer owns the account) or worn by an adult who manages their own tag.

**Public page priority:**
1. Critical medical information (allergies, conditions, medications)
2. Contact emergency contact
3. Call emergency services
4. Optional: **Share Location with Family** (when family contact is configured)

**Wristband label:** `TAP / SCAN IN EMERGENCY`

**Typical wearer:** Adults, athletes, people with chronic conditions who manage their own band.

---

### Mode B: Child Guardian (`child_guardian`)

**Scenario:** Child separated from parent/guardian in a public place — **managed by parent/guardian account**, not the child.

**Public page priority:**
1. Clear lost-child message (e.g., "This child may be lost — please contact their guardian")
2. Child's first name or nickname + approximate age
3. **Call Parent / Guardian** — primary action button (tel: / WhatsApp)
4. **Share Location with Family** — recommended secondary hero action (see Section 4.4)
5. Optional secondary guardian contact
6. Critical allergies (if any) — important for children too
7. Optional note: meeting point, "speaks Indonesian only", non-verbal, etc.

**Wristband label:** `SCAN IF LOST` or `TAP / SCAN IF LOST`

**Typical wearer:** Children aged ~2–12 (including toddlers) under parent/guardian management.

**Account model:** Parent/guardian owns the Supabase account and manages one or more child wristbands from their dashboard. The child does not need their own login.

**Key difference from adult mode:** Guardian phone contact is the **hero action** on the public page. Medical fields are optional and minimal. The page is optimized for mall security, event staff, or good Samaritans to reunite the child with their family in seconds — not for clinical triage.

---

### Mode C: Elderly Dependent (`elderly_dependent`)

**Scenario:** Elderly parent or dependent adult who may become **disoriented**, **forget the way home**, live with **Alzheimer's/dementia**, or **suddenly faint in a crowd** — **managed by adult child or caregiver account**, not the wearer.

**Public page priority:**
1. Alert header (e.g., "This person may need help — please contact their family")
2. Preferred name/nickname + approximate age
3. Critical medical info (allergies, conditions, medications — especially relevant if fainted)
4. Disorientation / cognitive notes (e.g., "Has Alzheimer's", "May not remember home address", "Please stay with them")
5. **Call Family / Caregiver** — primary action button (tel: / WhatsApp to account manager)
6. **Share Location with Family** — recommended co-primary action
7. Call emergency services (112 / 119)
8. Optional reunification note (e.g., "Lives in South Jakarta area — family will pick up")

**Wristband label:** `TAP / SCAN IF LOST` or `TAP / SCAN IN EMERGENCY`

**Typical wearer:** Elderly parents (60+), people with cognitive decline, or dependents at risk of wandering — managed by adult children or caregivers.

**Account model:** Adult child or caregiver owns the account. They set up and maintain the parent's profile, emergency contacts (usually themselves and siblings), and receive scan notifications. The elderly wearer does not need their own login or smartphone.

**Key difference from self-managed adult mode:** Family reunification and **call family** are as important as medical info. The account manager is always the adult child, not the person wearing the band.

**Real-world examples:**
- A son in Jakarta creates a tag for his 78-year-old mother who sometimes forgets her way home from the market.
- A daughter sets up a band for her father with early-stage Alzheimer's before a crowded Lebaran gathering.
- A caregiver manages a tag for an elderly client who has a history of fainting in hot, crowded environments.

---

### 4.1 Family Account & Multi-Tag Model

One GelangSiaga account supports **multiple wristbands** for different family members. The account holder is always the logged-in user; each tag represents a **wearer** with their own profile.

| Tag role | Who wears it | Who manages account | Typical mode |
|----------|--------------|---------------------|--------------|
| **Self** | Account holder | Self | `adult_emergency` |
| **Child** | Son/daughter/toddler | Parent/guardian | `child_guardian` |
| **Elderly parent** | Mother/father/grandparent | Adult child/caregiver | `elderly_dependent` |

**Example family setups:**

| Account holder | Tags managed |
|----------------|--------------|
| Adult for themselves only | 1× own band |
| Parent with toddler | 1× own band + 1× child band |
| Adult child caring for elderly parent | 1× elderly parent band (or + own band) |
| Parent with 2 children + own band | 1× self + 2× child bands |
| Sandwich-generation caregiver | 1× self + 1× child + 1× elderly parent |

**Register New Tag flow (add tag to existing account):**

```
Dashboard / Family page
    │
    └──► Register New Tag
              │
              └──► Enter Activation Code (from new package)
                        │
                        └──► Setup Wizard for this tag only
                                  ├── Step 0: Who is this tag for? (Self / Child / Elderly parent)
                                  ├── Step 0b: Select profile mode (auto-suggested from role)
                                  ├── Steps 1–6: Same as first-time setup (per-tag profile)
                                  └──► Tag appears in family dashboard
```

No second account needed. Each tag keeps its own Emergency ID, public token, profile, contacts, and scan history.

---

### 4.2 Scan Notification to Account Holder

When a **dependent tag** (`child_guardian` or `elderly_dependent`) — or any tag with notifications enabled — is scanned:

1. System creates a `scan_logs` entry as usual.
2. Account holder receives an **in-app notification** (MVP: dashboard badge + notification list; post-MVP: push/SMS).
3. Notification shows: wearer name, time, access method (NFC/QR/manual), and link to scan detail.
4. If the bystander also taps **Share Location with Family**, the notification includes an **approximate map pin** from the scanner's device.

**Notification copy examples:**
- "Budi's tag was scanned — someone may be helping them"
- "Your mother's tag was scanned at 14:32 — tap to view details"
- "Location shared: someone found Ani near [approximate area]"

This is **scan-triggered alerting**, not continuous GPS tracking of the wearer. The parent/child only learns something when a bystander actively scans — which is the intended safety moment.

---

### 4.3 Bystander Location Sharing (Recommended Design)

When a bystander opens a dependent's public page (child or elderly), they should see a prominent button to help the family **know where the wearer was found**. This uses the **scanner's phone GPS** with explicit consent — not tracking the wristband or the wearer.

**Recommended primary button label:**

| Language | Recommended label | Subtext |
|----------|-------------------|---------|
| English | **Share Location with Family** | "Send your current location so their family can find them" |
| Indonesian | **Kirim Lokasi ke Keluarga** | "Kirim lokasi Anda agar keluarga bisa menemukan mereka" |

**Why this label:** Clear, action-oriented, explains who receives the data (family, not police or strangers). Avoids sounding like surveillance. Works for both child lost and elderly disorientation scenarios.

**Alternative labels (acceptable):**

| Label | Best for |
|-------|----------|
| **I'm Helping — Share My Location** | Emphasizes the bystander's voluntary help |
| **Send Location to Guardian** | Child mode specifically |
| **Alert Family + Share Location** | Combined one-tap action (notification + geolocation) — post-MVP |

**Not recommended:** "Track this person", "Emergency GPS", "Find my child" — these imply continuous tracking or misstate who is being located.

**Bystander flow:**

1. Bystander scans NFC/QR → public page opens.
2. Account holder receives scan notification immediately (even if bystander does nothing else).
3. Bystander taps **Share Location with Family**.
4. Browser requests location permission (one-time, explicit consent).
5. If granted: coordinates sent to server → linked to `scan_logs` → account holder sees map pin in notification/scan detail.
6. If denied: page still works — call/WhatsApp buttons remain available; no location shared.

**Privacy rules:**
- Location is the **scanner's position** (where help is happening), not the wearer's hidden tracker.
- Coordinates are shared **only with the account holder** and linked emergency contacts — never public.
- Location is **not stored indefinitely** — retain for reunification window (e.g., 7 days) then purge or anonymize.
- Rate limit location submissions per scan session to prevent abuse.

---

### Shared Platform Behavior

All modes use the same:
- NFC NTAG213 tag + QR + visible Emergency ID
- Public URL pattern (`/e/[token]`)
- Activation Code claim flow (first tag or Register New Tag)
- Multi-tag family dashboard
- Scan logging + optional location sharing
- Scan notifications to account holder
- Disable/revoke capability per tag
- Privacy separation (public vs. owner access)

The system selects the correct public page template based on `wristbands.profile_mode` at render time.

---

## 5. Product Category / Track

| Attribute | Value |
|-----------|-------|
| **Category** | Safety & Emergency Identification / Family Safety |
| **Track** | Competition — Safety / Health Tech |
| **Form factor** | Physical wristband + responsive web app |
| **Access model** | Public emergency access + private owner portal |
| **Product modes** | Adult emergency + Child guardian reunification + Elderly dependent |
| **Account model** | One account, multiple tags (self + children + elderly parents) |
| **Deployment** | Cloud-hosted web application (Vercel + Supabase) |

---

## 6. Technology Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js (App Router) |
| **Backend / BaaS** | Supabase |
| **Database** | Supabase PostgreSQL |
| **Authentication** | Supabase Auth |
| **Authorization** | Supabase Row Level Security (RLS) |
| **Storage** | Supabase Storage (only if needed later) |
| **Hosting** | Vercel or another Next.js-compatible provider |
| **NFC tag** | NTAG213 |
| **QR code** | Generated from the same public emergency URL as NFC |
| **App type (MVP)** | Responsive web application — not a native mobile app |

---

## 7. Target Users

### Primary Users (Account Holders / Guardians / Caregivers)

- Individuals who want a visible, always-accessible emergency ID for themselves
- People with known allergies, chronic conditions, or important medications
- **Parents or guardians** who want a reliable way for strangers to contact them if their child or toddler gets lost in public
- **Adult children** who want to protect **elderly parents** who forget the way home, have Alzheimer's/dementia, or may faint in crowded places
- **Sandwich-generation caregivers** managing tags for themselves, children, and aging parents from one account
- Families traveling to crowded places (malls, airports, theme parks, religious events, Lebaran gatherings)
- Athletes, commuters, and outdoor activity participants

### Primary Wearers (Dependent Tags — Child & Elderly Modes)

**Children:**
- Children and toddlers aged approximately 2–12 who may not know or cannot reliably share a parent's phone number
- Non-verbal or shy children in stressful separation situations
- Wristband is worn by the child; account and management remain with the parent/guardian

**Elderly dependents:**
- Elderly parents who may become disoriented, wander, or forget how to get home
- People with Alzheimer's, dementia, or cognitive decline
- Elderly at risk of fainting or medical episodes in hot/crowded environments
- Wristband is worn by the elderly person; account and management remain with the adult child or caregiver
- Wearer does not need a smartphone or separate login

### Secondary Users (Bystanders / First Responders)

- Passersby who encounter an unconscious or unresponsive person
- Good Samaritans at accident scenes
- **Mall security, event staff, and airport personnel** helping a lost child or confused elderly person
- Non-medical first responders who need quick identification context

### Tertiary Users (Administrators)

- Manufacturer or competition organizers who batch-generate wristbands
- Support staff who handle lost, stolen, or revoked wristbands

---

## 8. Hardware Concept

Each GelangSiaga wristband includes:

| Component | Purpose |
|-----------|---------|
| **NFC NTAG213 tag** | Stores HTTPS URL with public emergency token only — no medical data on tag |
| **QR code** | Backup access method; same URL as NFC |
| **Visible Emergency ID** | Human-readable fallback for manual lookup (e.g., `GS-XXXX-XXXX`) |
| **Instruction text** | Mode-specific label (see below) |

**Instruction text by mode:**

| Mode | Wristband label |
|------|-----------------|
| Adult emergency (self) | `TAP / SCAN IN EMERGENCY` |
| Child guardian | `SCAN IF LOST` or `TAP / SCAN IF LOST` |
| Elderly dependent | `TAP / SCAN IF LOST` or `TAP / SCAN IN EMERGENCY` |

**Wristband variants by wearer:**
- **Child:** Smaller strap, high-visibility colors, optional fun design
- **Elderly:** Comfortable clasp, large-print instruction text, high-contrast colors
- **Adult self:** Standard size; same NFC/QR/Emergency ID architecture — only label and profile mode differ

The package / manual book contains:

- **Private Activation Code** — single-use code to claim ownership
- Setup instructions
- Emergency usage explanation for both owner and bystanders

**Important:** NFC and QR contain only a public URL. All medical and contact data lives in the database and is served only through controlled public endpoints.

---

## 9. Code and Access Model

GelangSiaga strictly separates public emergency access from private owner access.

### Public Emergency Access

| Method | Identifier | Login Required | Data Shown |
|--------|------------|----------------|------------|
| NFC tap | Public token in URL | No | Minimum critical info only |
| QR scan | Public token in URL | No | Minimum critical info only |
| Emergency ID lookup | Visible Emergency ID | No | Minimum critical info only |

**Public page shows (adult mode):** preferred name/initials, approximate age, critical allergies, important conditions, important medications, last updated timestamp, and a self-reported information disclaimer.

**Public page shows (child mode):** lost-child alert message, child's first name or nickname, approximate age, primary guardian contact action (Call Parent/Guardian), **Share Location with Family** button, optional secondary guardian, critical allergies if any, optional reunification note (e.g., meeting point), last updated timestamp, and a guardian-provided information disclaimer.

**Public page shows (elderly dependent mode):** disorientation alert message, preferred name/nickname, approximate age, critical allergies and medical conditions, cognitive/disorientation notes (e.g., Alzheimer's), **Call Family / Caregiver** action, **Share Location with Family** button, call emergency services, optional reunification note (general area only — not full home address), last updated timestamp, and family-provided information disclaimer.

**Public page does not show:** full name, national ID, home address, school name, full medical history, or owner account details. For adult mode, phone numbers are preferably action buttons only; for child mode, guardian contact via prominent call/WhatsApp buttons is the primary action — optionally showing masked or partial number for staff verification (configurable by guardian).

### Private Owner Access

| Method | Identifier | Login Required | Capabilities |
|--------|------------|----------------|--------------|
| Activation Code | Code from manual/package | Yes (register/login) | Claim wristband ownership |
| Owner dashboard | Authenticated session | Yes | Manage all tags, edit profiles, view scans, receive notifications, disable tags |
| Register New Tag | Activation Code + authenticated session | Yes | Add another wristband to existing account |

**Activation Code properties:**

- Private — never printed on the wristband itself
- Single-use — consumed on successful claim
- Stored as hash in database — never plain text
- Tied to exactly one wristband record

> **MVP implementation note:** in the current code the Activation Code is still
> stored as a 6-character text value (not hashed) to stay consistent with the
> existing claim flow. Migrating to a hash is a separate refactor (touching the
> claim flow) and is tracked as tech debt.

### Superadmin (Admin) Access

| Method | Identifier | Login Required | Capabilities |
|--------|------------|----------------|--------------|
| Admin dashboard (`/admin`) | Authenticated session + `SUPERADMIN_USER_ID` | Yes | Register tags (generate Public ID, public token, Activation Code), list/search/filter all tags, revoke, delete unclaimed tags |

**Superadmin authorization model:**

- **Authentication** uses ordinary Supabase Auth (email/password) — no separate login system.
- **Authorization** is defined by the server environment variable `SUPERADMIN_USER_ID` (the account uuid), **not** a database row. This prevents privilege escalation via data: even if someone can write to `profiles`, they cannot make themselves admin.
- Enforced in depth: **middleware** (redirects non-superadmins), server **layout**, and **every Server Action** (`assertSuperadmin`).
- Admin writes use a **service-role client** (bypasses RLS) on the server, because RLS is owner-only and the superadmin is not represented in the JWT.
- Public token & Emergency ID are **cryptographically generated** (not typed manually). The Activation Code is shown **once** after generation for printing onto the package.

---

## 10. High-Level System Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    MANUFACTURER / ADMIN                          │
│  Create wristband batch → Generate Emergency ID, public token,  │
│  Activation Code → Write NFC/QR with public URL → Print code    │
│  in manual/package                                               │
└──────────────────────────────┬──────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                      CUSTOMER / OWNER                            │
│  Buy wristband → Register/Login → Claim with Activation Code →  │
│  Fill emergency profile → Preview public page → Activate         │
└──────────────────────────────┬──────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                    EMERGENCY / BYSTANDER                         │
│  Tap NFC / Scan QR / Enter Emergency ID → Public emergency     │
│  page opens → View critical info → Contact emergency contact   │
│  or call emergency services → System records scan log            │
└─────────────────────────────────────────────────────────────────┘
```

**Step-by-step:**

1. Manufacturer/admin creates wristband record in the system.
2. System generates Emergency ID, public emergency token, and private Activation Code.
3. NFC tag and QR code are written with the public emergency URL (`/e/[token]`).
4. Activation Code is placed inside the package/manual book — not on the wristband.
5. Customer purchases wristband.
6. Customer registers or logs in via Supabase Auth.
7. Customer claims wristband using Activation Code.
8. Customer fills emergency profile and adds emergency contacts.
9. Customer reviews public emergency preview and activates wristband.
10. Wristband status becomes **active**.
11. During an emergency, bystander taps NFC, scans QR, or enters Emergency ID.
12. Public emergency page opens without login.
13. Bystander sees minimum critical information and action buttons.
14. Bystander contacts emergency contact or emergency services.
15. System records a scan log entry.

**Child lost variant (steps 11–15):**

11. Child is separated from parent in a crowded place; bystander or staff notices distressed child with wristband.
12. Bystander scans QR or taps NFC (or enters Emergency ID).
13. Public page opens with **lost-child template** — guardian contact is the primary action.
14. Bystander calls or WhatsApps the parent/guardian; parent responds and reunites with child.
15. System records scan log; parent may receive notification (future version — high priority for child mode).

---

## 11. User Flow

### Owner Onboarding Flow

```
Landing Page
    │
    ├──► Register / Login (Supabase Auth)
    │
    └──► Claim Wristband
              │
              └──► Enter Activation Code
                        │
                        ├──► Invalid code → Show error, retry
                        ├──► Already claimed → Show claimed error
                        └──► Valid & unclaimed → Link wristband to user
                                    │
                                    └──► Setup Wizard
                                              ├── Step 0: Select profile mode (Adult / Child)
                                              ├── Step 1: Basic identity
                                              ├── Step 2: Critical medical info (adult) OR allergies + notes (child)
                                              ├── Step 3: Emergency contacts / Guardian contacts
                                              ├── Step 4: Privacy review
                                              ├── Step 5: Public emergency preview
                                              └── Step 6: Activate wristband
                                                        │
                                                        └──► Dashboard (active wristband)
```

### Ongoing Owner / Family Flow

From the dashboard or family page, the account holder can:

- View all managed tags (self, children, elderly parents) with status at a glance
- **Register New Tag** — add another wristband to the account
- Edit emergency profile per tag
- Manage emergency contacts per tag
- View scan history per tag
- Receive and review **scan notifications** (with optional location pin)
- Disable any tag (lost/misused scenario)
- Re-review public emergency preview per tag

### Guardian / Caregiver Flow (Child & Elderly Modes)

Parent, guardian, or adult child follows the same claim/setup flow (first tag or Register New Tag), with these differences:

**For a child tag:**
1. Select **Child Guardian** mode (or "This tag is for my child" during setup).
2. Enter child's first name/nickname and approximate age.
3. Add **guardian contacts** — at least one parent/guardian phone.
4. Optionally add allergies and reunification note.
5. Enable **scan notifications** (on by default for dependent tags).
6. Preview the **lost-child public page** including **Share Location with Family** button.
7. From family dashboard, manage multiple child tags under one account.

**For an elderly parent tag:**
1. Select **Elderly Dependent** mode (or "This tag is for my parent/elderly family member").
2. Enter parent's preferred name/nickname and approximate age.
3. Add **family/caregiver contacts** — usually the adult child setting up the account, plus siblings if needed.
4. Fill critical medical info (medications, allergies, conditions — especially if fainting risk).
5. Add **disorientation notes** — Alzheimer's/dementia flag, "may forget way home", "please stay with them".
6. Enable **scan notifications** (on by default).
7. Preview the **elderly dependent public page** before activation.
8. Elderly wearer does not need to use the app — adult child manages everything.

**Example: Parent who already has own tag, buys tag for child:**
1. Parent logs into existing account.
2. Taps **Register New Tag** from dashboard.
3. Enters Activation Code from child's new package.
4. Completes setup wizard for child → child's tag appears alongside parent's own tag.
5. When someone scans child's band → parent gets notification + optional location in their app.

---

## 12. Emergency Flow

### Flow A: Adult Medical Emergency

1. **Victim is unconscious or unable to communicate.**
2. **Bystander sees the wristband** with "TAP / SCAN IN EMERGENCY" instruction and visible Emergency ID.
3. **Bystander taps NFC or scans QR code.**
4. **If NFC/QR fails** (unsupported device, damaged QR), bystander enters Emergency ID manually on the lookup page (`/lookup`).
5. **Public emergency page opens** — no login required (`/e/[token]`).
6. **Page displays:**
   - Preferred name or initials
   - Approximate age
   - Critical allergies
   - Important medical conditions
   - Important medication
   - Last updated timestamp
   - Self-reported information disclaimer
7. **Bystander takes action:**
   - Tap **Contact emergency contact** (tel: or WhatsApp action — phone not shown as plain text if possible)
   - Tap **Call ambulance / emergency service** (e.g., 112 / 119)
8. **System records scan event** in `scan_logs` with access method and timestamp.
9. **Owner/family notification** — planned for a future version, not MVP.

---

### Flow B: Child Lost & Guardian Reunification

1. **Child becomes separated** from parent/guardian in a crowded place (mall, airport, event, etc.).
2. **Bystander or staff notices** the child is alone, distressed, or asking for their parent. Wristband shows **"SCAN IF LOST"**.
3. **Bystander scans QR or taps NFC** on the child's wristband.
4. **If NFC/QR fails**, bystander enters visible Emergency ID on `/lookup`.
5. **Public lost-child page opens** — no login required (`/e/[token]`, child template).
6. **Page displays:**
   - Prominent header: **"This child may be lost — please contact their guardian"**
   - Child's first name or nickname
   - Approximate age
   - Critical allergies (if configured)
   - Optional reunification note from guardian
   - Last updated timestamp
7. **Bystander takes action (primary):**
   - Tap **Call Parent / Guardian** — large button, tel: link
   - Tap **Share Location with Family** — sends scanner's GPS to parent (recommended second hero button)
   - Tap **WhatsApp Parent / Guardian** — common in Indonesia
   - Optional: **Call secondary guardian** if primary does not answer
8. **Parent/guardian receives scan notification** in their app immediately — with map pin if bystander shared location (in-app MVP; push/SMS post-MVP).
9. **Parent/guardian answers**, confirms identity, and reunites with the child. Bystander may stay with the child until guardian arrives.
10. **System records scan event** in `scan_logs` with optional location data.

**Important:** This flow is for **reunification**, not child tracking or surveillance. GelangSiaga does not track the child's location continuously — it only helps when a bystander actively scans the band. Location sharing comes from the **bystander's phone**, with their explicit consent.

---

### Flow C: Elderly Disoriented, Wandering, or Medical Episode

1. **Elderly person becomes lost, disoriented, or faints** in a public place — market, mosque, mall, or crowded event.
2. **Bystander notices** confusion, wandering behavior, or an unconscious elderly person with a wristband showing **"TAP / SCAN IF LOST"** or **"TAP / SCAN IN EMERGENCY"**.
3. **Bystander scans QR or taps NFC** on the wristband.
4. **If NFC/QR fails**, bystander enters visible Emergency ID on `/lookup`.
5. **Public elderly-dependent page opens** — no login required (`/e/[token]`, elderly template).
6. **Account holder (adult child) receives scan notification** in their dashboard/app immediately.
7. **Page displays:**
   - Prominent header: **"This person may need help — please contact their family"**
   - Preferred name/nickname + approximate age
   - Critical allergies, conditions, medications
   - Disorientation notes (e.g., "Has Alzheimer's — may not know address")
   - Reunification note (general area only)
   - Last updated timestamp
8. **Bystander takes action:**
   - Tap **Call Family / Caregiver** — primary button
   - Tap **Share Location with Family** — sends scanner's GPS to account holder (recommended co-primary action)
   - Tap **Call emergency services** (112 / 119) if medical emergency
9. **Adult child receives notification** with scan time and optional map pin → calls bystander back or travels to location.
10. **System records scan event** in `scan_logs` with optional `shared_location` fields.

**Important:** Same privacy principle as child mode — **no continuous tracking** of the elderly wearer. Location is scan-triggered and comes from the helper's device only.

---

## 13. UI/UX Flow

### Design Principles

- **Mobile-first** for all public emergency pages — bystanders use phones under stress
- **Large touch targets** — minimum 48px buttons on emergency page
- **High contrast** — readable in bright sunlight and low light
- **Minimal cognitive load** — critical info first, no navigation clutter
- **Fast loading** — public emergency page must load in under 2 seconds on 3G
- **Clear separation** — owner dashboard feels like a product app; emergency page feels like a life-saving utility

### Screen Inventory and Journey

#### Landing Page (`/`)

**Purpose:** Explain product value and route users to the right entry point.

| Element | Description |
|---------|-------------|
| Hero section | Problem statement + solution in one sentence |
| Use case tabs | Adult emergency + Child lost scenarios |
| How it works | 3-step visual: Wear → Setup → Scan to help |
| CTA: "Activate Wristband" | Routes to `/login` or `/claim` |
| CTA: "Emergency Lookup" | Routes to `/lookup` |
| Footer | Privacy note, disclaimer, contact |

---

#### Auth Page (`/login`)

**Purpose:** Register or log in using Supabase Auth.

| Element | Description |
|---------|-------------|
| Email/password form | Standard Supabase Auth |
| Toggle register/login | Single page with mode switch |
| Redirect after auth | New users → `/claim`; returning users → `/dashboard` |

---

#### Claim Wristband Page (`/claim`)

**Purpose:** Link a physical wristband to the authenticated owner account.

| Element | Description |
|---------|-------------|
| Activation Code input | Single field, uppercase normalization |
| Help text | "Find your Activation Code inside the package/manual book" |
| Submit | Validates code, links wristband |
| Error states | Invalid code, already claimed, expired code |

---

#### Setup Wizard (`/setup`)

**Purpose:** Guided first-time profile creation after successful claim.

| Step | Screen | Fields / Actions |
|------|--------|-----------------|
| 0 | Profile mode | Select **Adult Emergency**, **Child Guardian**, or **Elderly Dependent**; or "Who is this tag for?" (Self / Child / Elderly parent) |
| 1 | Basic identity | Adult: preferred name/initials, age. Child: child's nickname, age |
| 2 | Medical / safety info | Adult: allergies, conditions, meds. Child: allergies (optional), reunification notes |
| 3 | Contacts | Adult: emergency contacts. Child: guardian contacts (Mom/Dad/caregiver) |
| 4 | Privacy review | Explain what is public vs. private; guardian consent for child mode |
| 5 | Public emergency preview | Live preview of `/e/[token]` — adult or child template |
| 6 | Activate wristband | Confirm and set status to **active** |

Progress indicator shown throughout. User can save draft and return later (wristband status: **claimed**, not yet **active**).

---

#### Dashboard / Family Page (`/dashboard` or `/family`)

**Purpose:** Account holder home — all managed tags, notifications, and quick actions.

| Element | Description |
|---------|-------------|
| Tag list | All wristbands: self, children, elderly parents — each with status badge |
| Register New Tag CTA | Prominent button → `/tags/new` (claim additional band) |
| Notification bell | Unread scan alerts for dependent tags |
| Per-tag card | Wearer label, status (unclaimed/claimed/active/disabled), last scan, quick actions |
| Profile completion | Per-tag percentage or checklist |
| Last updated | Per-tag timestamp with stale-data warning if > 90 days |
| Quick actions per tag | Edit profile, Manage contacts, View scan history, Disable tag |
| Recent activity | Last 5 scans across all tags with wearer name, time, method, location-shared indicator |

---

#### Register New Tag Page (`/tags/new`)

**Purpose:** Add another wristband to an existing account without creating a new login.

| Element | Description |
|---------|-------------|
| Activation Code input | Single field, uppercase normalization |
| Help text | "Enter the Activation Code from your new tag package" |
| Submit | Validates code, links wristband to current account |
| Error states | Invalid code, already claimed, expired code |
| On success | Redirect to setup wizard for this tag only |

---

#### Scan Notifications (`/notifications` or dashboard panel)

**Purpose:** Alert account holder when a dependent tag is scanned.

| Element | Description |
|---------|-------------|
| Notification list | Wearer name, scan time, access method (NFC/QR/manual) |
| Location indicator | Map pin preview if bystander shared location |
| Detail link | Open full scan detail with optional map |
| Mark as read | Clear notification badge |
| Empty state | "No scans yet — you'll be notified when someone scans your family's tags" |

---

#### Dashboard (single-tag legacy view)

**Purpose:** When account has one tag, dashboard can simplify to single-band view. Multi-tag accounts use Family page layout above.

| Element | Description |
|---------|-------------|
| Wristband status badge | unclaimed / claimed / active / disabled |
| Profile completion indicator | Percentage or checklist |
| Last updated timestamp | With stale-data warning if > 90 days |
| Quick actions | Edit profile, Manage contacts, View scan history, Disable wristband |
| Scan history summary | Last 5 scans with time and access method |

---

#### Emergency Profile Editor (`/profile`)

**Purpose:** Edit public-safe emergency information.

| Field | Required | Public |
|-------|----------|--------|
| Preferred name / initials | Yes | Yes |
| Approximate age | Yes | Yes |
| Blood type | No | Yes (with disclaimer) |
| Critical allergies | Recommended | Yes |
| Important conditions | Recommended | Yes |
| Important medications | Recommended | Yes |
| Notes for first responders | No | Yes |
| Save + update `last_confirmed_at` | — | — |

---

#### Emergency Contact Manager (`/contacts`)

**Purpose:** Add, edit, delete, and prioritize emergency contacts.

| Element | Description |
|---------|-------------|
| Contact list | Name, relationship, phone, primary badge |
| Add contact form | Name, relationship, phone, set as primary |
| Primary contact | Exactly one primary; used on public emergency page |
| Delete with confirmation | Prevent accidental removal of last contact |

---

#### Public Emergency Page (`/e/[token]`)

**Purpose:** Bystander-facing page — the core product moment.

| Element | Description |
|---------|-------------|
| Large emergency header | "EMERGENCY INFORMATION" — high visibility |
| Critical info block | Allergies, conditions, medications — most prominent |
| Identity block | Preferred name/initials, approximate age |
| Last updated | "Information last updated: [date]" |
| Stale warning | If > 90 days since last confirmed |
| Action buttons | Large: "Contact Emergency Contact", "Call Emergency Services" |
| Disclaimer | "Self-reported information. Not verified by medical professionals." |
| No navigation | No header menu, no login links — distraction-free |

**Design:** Dark or high-contrast theme option. Zero authentication UI. Sub-2-second load target.

---

#### Public Lost-Child Page (`/e/[token]` — child template)

**Purpose:** Bystander/staff-facing page when a child wearing the wristband is lost or separated from their guardian.

| Element | Description |
|---------|-------------|
| Large alert header | **"This child may be lost — please contact their guardian"** (EN/ID) |
| Child identity | First name or nickname + approximate age only |
| Allergies block | Shown if configured — e.g., peanut allergy |
| Reunification note | Optional guardian message: "Please wait with my child", meeting point |
| Primary action | Extra-large: **Call Parent / Guardian** (tel:) |
| Location action | Extra-large: **Share Location with Family** — browser geolocation with consent; sends pin to account holder |
| Secondary action | **WhatsApp Parent / Guardian** |
| Tertiary action | Call secondary guardian (if configured) |
| Last updated | "Information last updated: [date]" |
| Disclaimer | "Guardian-provided information. Please verify identity before handover." |
| No navigation | Distraction-free; no login, no ads |

**Design notes:**
- Even simpler than adult emergency page — **one primary button dominates the screen**
- Friendly but urgent tone — not alarming for the child who may still be present
- Bilingual EN/ID recommended for travel and tourist areas
- Optional: show guardian label ("Call Mom — Sarah") without exposing full phone number as text

---

#### Public Elderly Dependent Page (`/e/[token]` — elderly template)

**Purpose:** Bystander-facing page when an elderly person wearing the wristband is disoriented, lost, or needs medical help.

| Element | Description |
|---------|-------------|
| Large alert header | **"This person may need help — please contact their family"** (EN/ID) |
| Identity block | Preferred name/nickname + approximate age |
| Medical block | Allergies, conditions, medications — prominent if fainting/medical risk |
| Disorientation notes | e.g., "Has Alzheimer's", "May forget way home", "Please stay with them" |
| Reunification note | Optional family message — general area only, not full address |
| Primary action | Extra-large: **Call Family / Caregiver** (tel:) |
| Location action | Extra-large: **Share Location with Family** |
| Secondary action | **WhatsApp Family / Caregiver** |
| Tertiary action | **Call Emergency Services** (112 / 119) |
| Last updated | "Information last updated: [date]" |
| Disclaimer | "Family-provided information. Please verify identity before handover." |
| No navigation | Distraction-free; no login, no ads |

**Design notes:**
- Balance medical urgency with reunification — both matter for elderly wearers
- **Share Location with Family** should be visually equal to Call Family — many bystanders can share location faster than making a phone call
- Account holder receives scan notification even if bystander only views the page
- Bilingual EN/ID recommended

---

#### Manual Lookup Page (`/lookup`)

**Purpose:** Fallback when NFC and QR are unavailable.

| Element | Description |
|---------|-------------|
| Emergency ID input | Format hint: `GS-XXXX-XXXX` |
| Submit | Validates ID, redirects to `/e/[token]` if active |
| Error states | Not found, disabled wristband |
| Help text | "Enter the Emergency ID printed on the wristband" |

---

#### Scan History Page (`/wristbands/[id]/scan-history`)

**Purpose:** Owner visibility into when their wristband was accessed.

| Column | Description |
|--------|-------------|
| Time of scan | `scanned_at` timestamp |
| Access method | NFC, QR, manual lookup, unknown |
| Approximate metadata | User agent summary only — no raw IP exposed to owner |

---

#### Disable Wristband Page (`/wristbands/[id]/disable`)

**Purpose:** Owner-initiated deactivation for lost or misused wristbands.

| Element | Description |
|---------|-------------|
| Explanation | What happens when disabled (public page shows nothing) |
| Confirmation | Type wristband ID or checkbox confirm |
| Submit | Sets status to **disabled** |
| Re-enable note | Contact support or claim new wristband |

---

## 14. Database Flow

### Lifecycle Overview

```
Admin creates batch
    │
    └──► For each wristband:
              ├── Create wristbands row (status: unclaimed)
              ├── Generate emergency_id (unique, random)
              ├── Generate public_token (unique, random)
              ├── Create activation_codes row (code_hash, status: unused)
              └── Set nfc_url / qr_url
                        │
                        ▼
Customer claims with Activation Code
    │
    ├── Validate activation_codes (hash match, status: unused)
    ├── Set activation_codes.status = used
    ├── Set wristbands.owner_id = user.id
    └── Set wristbands.status = claimed
                        │
                        ▼
Owner creates emergency profile + contacts
    │
    ├── Insert emergency_profiles row
    ├── Insert emergency_contacts rows
    └── Owner activates → wristbands.status = active
                        │
                        ▼
Public access (/e/[token] or /lookup)
    │
    ├── Fetch public-safe fields (RLS: public read on active wristbands)
    ├── Insert scan_logs row
    └── Return emergency page data
                        │
                        ▼
Owner disables wristband
    │
    └── Set wristbands.status = disabled
              └── Public queries return nothing / not-found
```

### Key Database Rules

1. Admin creates wristband batch (manual via Supabase for MVP).
2. For each wristband, system creates: wristband record, Emergency ID, public token, Activation Code, `status = unclaimed`.
3. Customer claims with Activation Code.
4. System checks `activation_codes` table (hash comparison).
5. If valid and unclaimed: mark code as used, set `owner_id`, set status to `claimed`.
6. User creates emergency profile and emergency contacts.
7. User activates → status becomes `active`, `activated_at` set.
8. Public emergency page fetches public-safe data by token via RLS-controlled query or RPC.
9. Every public access creates a `scan_logs` row.
10. Owner can disable wristband → status `disabled`.
11. Disabled wristband must not expose emergency profile on public routes.

---

## 15. Suggested Data Model

### `profiles`

Extends Supabase Auth users with app-specific fields.

| Column | Type | Notes |
|--------|------|-------|
| `id` | uuid PK | References `auth.users(id)` |
| `full_name` | text | Private — owner only |
| `display_name` | text | Optional display name |
| `phone` | text | Owner contact — private |
| `created_at` | timestamptz | |
| `updated_at` | timestamptz | |

---

### `wristbands`

Core wristband entity.

| Column | Type | Notes |
|--------|------|-------|
| `id` | uuid PK | |
| `owner_id` | uuid FK → profiles | Nullable until claimed |
| `emergency_id` | text UNIQUE | Public, random, non-sequential (e.g., `GS-A7K2-M9P4`) |
| `public_token` | text UNIQUE | Random secure token for URL |
| `status` | text | `unclaimed`, `claimed`, `active`, `disabled`, `revoked` |
| `profile_mode` | text | `adult_emergency`, `child_guardian`, `elderly_dependent` — determines public page template |
| `wearer_role` | text | `self`, `child`, `elderly_parent` — dashboard grouping and setup wizard defaults |
| `wearer_label` | text | Display name for dashboard, e.g., "Budi (child)", "Ibu Siti (mother)", "My band" |
| `notify_on_scan` | boolean | Send in-app/push notification to account holder when scanned — default `true` for dependent tags |
| `nfc_url` | text | Full HTTPS URL written to NFC tag |
| `qr_url` | text | Same URL as NFC |
| `claimed_at` | timestamptz | Nullable |
| `activated_at` | timestamptz | Nullable |
| `created_at` | timestamptz | |
| `updated_at` | timestamptz | |

---

### `activation_codes`

Private single-use claim codes.

| Column | Type | Notes |
|--------|------|-------|
| `id` | uuid PK | |
| `wristband_id` | uuid FK → wristbands | |
| `code_hash` | text | bcrypt or SHA-256 hash — never plain text |
| `status` | text | `unused`, `used`, `revoked` |
| `used_by` | uuid FK → profiles | Nullable |
| `used_at` | timestamptz | Nullable |
| `expires_at` | timestamptz | Nullable |
| `created_at` | timestamptz | |

---

### `emergency_profiles`

Public-safe medical summary linked to a wristband.

| Column | Type | Notes |
|--------|------|-------|
| `id` | uuid PK | |
| `wristband_id` | uuid FK → wristbands | One profile per wristband |
| `preferred_name` | text | Shown publicly |
| `approximate_age` | integer | Shown publicly |
| `blood_type` | text | Optional |
| `critical_allergies` | text | |
| `medical_conditions` | text | |
| `important_medications` | text | |
| `emergency_notes` | text | Notes for first responders |
| `reunification_note` | text | Child/elderly mode: message for bystanders, e.g., "Please stay with my child until I arrive" |
| `disorientation_notes` | text | Elderly mode: e.g., "Has Alzheimer's", "May forget way home" |
| `cognitive_condition_flag` | boolean | Elderly mode: optional flag for dementia/Alzheimer's — adjusts public page messaging |
| `language_hint` | text | Optional, e.g., "Speaks Indonesian only" |
| `is_public_enabled` | boolean | Owner toggle |
| `last_confirmed_at` | timestamptz | Owner confirmation timestamp |
| `created_at` | timestamptz | |
| `updated_at` | timestamptz | |

---

### `emergency_contacts`

Contacts reachable from the public emergency page.

| Column | Type | Notes |
|--------|------|-------|
| `id` | uuid PK | |
| `wristband_id` | uuid FK → wristbands | |
| `name` | text | |
| `relationship` | text | e.g., "Mother", "Father", "Guardian", "Babysitter" |
| `phone` | text | Used for tel:/WhatsApp action — not shown as plain text on public page by default |
| `is_primary` | boolean | One primary per wristband — shown first on public page |
| `show_name_on_public` | boolean | Child mode: show label like "Call Mom" on public page |
| `created_at` | timestamptz | |
| `updated_at` | timestamptz | |

---

### `scan_logs`

Audit trail for public emergency page access.

| Column | Type | Notes |
|--------|------|-------|
| `id` | uuid PK | |
| `wristband_id` | uuid FK → wristbands | |
| `access_method` | text | `nfc`, `qr`, `manual_lookup`, `unknown` |
| `location_shared` | boolean | Whether bystander submitted location |
| `shared_latitude` | decimal | Nullable — scanner's GPS latitude (with consent) |
| `shared_longitude` | decimal | Nullable — scanner's GPS longitude (with consent) |
| `location_accuracy_m` | integer | Nullable — GPS accuracy in meters |
| `location_shared_at` | timestamptz | Nullable |
| `scanned_at` | timestamptz | |
| `user_agent` | text | Nullable |
| `ip_hash` | text | Hashed IP — not raw IP |
| `approximate_location` | text | Nullable — reverse-geocoded area label from shared coordinates |
| `created_at` | timestamptz | |

---

### `scan_notifications`

In-app alerts to account holder when a tag is scanned.

| Column | Type | Notes |
|--------|------|-------|
| `id` | uuid PK | |
| `account_holder_id` | uuid FK → profiles | Who receives the notification |
| `wristband_id` | uuid FK → wristbands | Which tag was scanned |
| `scan_log_id` | uuid FK → scan_logs | Link to full scan detail |
| `message` | text | e.g., "Budi's tag was scanned" |
| `is_read` | boolean | Default false |
| `created_at` | timestamptz | |

---

### `admin_audit_logs` (optional)

| Column | Type | Notes |
|--------|------|-------|
| `id` | uuid PK | |
| `admin_user_id` | uuid | |
| `action` | text | e.g., `batch_create`, `revoke_wristband` |
| `target_type` | text | e.g., `wristband`, `activation_code` |
| `target_id` | uuid | |
| `created_at` | timestamptz | |

---

## 16. Suggested App Routes

| Route | Access | Purpose |
|-------|--------|---------|
| `/` | Public | Landing page |
| `/login` | Public | Register / login |
| `/dashboard` | Authenticated | Owner/family home — all tags overview |
| `/family` | Authenticated | Family dashboard — multi-tag list (alias or primary for multi-tag accounts) |
| `/tags/new` | Authenticated | Register New Tag — claim additional wristband |
| `/notifications` | Authenticated | Scan notification inbox |
| `/claim` | Authenticated | Claim first wristband with Activation Code |
| `/setup` | Authenticated | Setup wizard (post-claim); includes wearer role + profile mode selection |
| `/profile` | Authenticated | Emergency profile editor (per tag) |
| `/contacts` | Authenticated | Emergency / guardian / family contact manager (per tag) |
| `/wristbands/[id]` | Authenticated | Wristband detail and settings |
| `/wristbands/[id]/scan-history` | Authenticated | Scan log viewer with optional location map |
| `/wristbands/[id]/disable` | Authenticated | Disable wristband flow |
| `/e/[token]` | Public | Public emergency page (adult, child, or elderly template based on `profile_mode`) |
| `/e/[token]/share-location` | Public | POST endpoint for bystander location share (or inline on `/e/[token]`) |
| `/lookup` | Public | Manual Emergency ID lookup |
| `/admin` | Superadmin | NFC tag registration dashboard (generate Public ID + Activation Code), list & manage tags |

---

## 17. MVP Features

### Must Have

- [ ] Landing page with product explanation and CTAs (adult + child + elderly use cases)
- [ ] Supabase Auth — register and login
- [ ] Claim first wristband with Activation Code
- [ ] **Register New Tag** — add additional wristbands to same account
- [ ] **Family dashboard** — list all managed tags (architecture ready; MVP may demo 2+ tags)
- [ ] **Profile mode selection** — Adult Emergency vs. Child Guardian vs. Elderly Dependent
- [ ] **Wearer role selection** — Self / Child / Elderly parent during setup
- [ ] Owner/guardian/caregiver dashboard with per-tag status
- [ ] Emergency profile editor (mode-aware fields including disorientation notes)
- [ ] Emergency / guardian / family contact management (add, edit, delete, primary)
- [ ] Setup wizard with public emergency preview (all three templates)
- [ ] Public emergency page at `/e/[token]` — **adult template**
- [ ] Public lost-child page at `/e/[token]` — **child template**
- [ ] Public elderly-dependent page at `/e/[token]` — **elderly template**
- [ ] Manual lookup page at `/lookup`
- [ ] Scan logging on every public access
- [ ] **In-app scan notifications** for dependent tags (dashboard badge + notification list)
- [ ] Disable wristband flow (per tag)
- [ ] **Superadmin dashboard** (`/admin`) — register NFC tags with auto-generated Public ID (Emergency ID), public token, and Activation Code; list/search/filter tags; revoke; delete unclaimed tags. Access restricted to a single superadmin via `SUPERADMIN_USER_ID`.

### Family & Dependent Features — MVP vs. Post-MVP

| Feature | MVP | Post-MVP |
|---------|-----|----------|
| Multi-tag per account (Register New Tag) | **Yes (architecture)** | Full UX polish |
| Family dashboard listing all tags | **Yes (basic)** | Rich cards, filters |
| Child profile mode + lost-child public page | Yes | — |
| Elderly dependent mode + public page | **Yes** | — |
| Guardian/family contact call/WhatsApp buttons | Yes | — |
| Reunification + disorientation note fields | Yes | — |
| In-app scan notification on dependent tag scan | **Yes (basic)** | — |
| **Share Location with Family** (bystander GPS) | **Recommended MVP** | Map UI polish |
| Push/SMS notification on scan | No | **High priority** |
| Multiple child + elderly tags per account | **Yes (architecture)** | Demo with 3+ tags |
| Child/elderly photo for verification | No | Optional future |
| Trip/event mode (temporary heightened alert) | No | Yes |

### Explicitly Out of Scope for MVP

- Native mobile app (web-first; PWA acceptable)
- Push/SMS notifications (in-app notifications acceptable for MVP)
- **Continuous GPS tracking** of wearer (scan-triggered bystander location share is in scope)
- Hospital or insurance integration
- Automated bulk batch generation (single-tag registration via the superadmin dashboard is available; large batches remain post-MVP)
- Child/elderly photo on public page

---

## 18. Recommended Additional Features

Features that improve the product while keeping MVP realistic:

### General Features

| Feature | Benefit |
|---------|---------|
| Public emergency preview before activation | Owner confidence — see exactly what bystanders see |
| Profile completeness indicator | Nudges owners to fill critical fields |
| Last confirmed reminder | Reduces stale data risk |
| Wristband disable/revoke flow | Lost or stolen wristband protection |
| Manual Emergency ID lookup | NFC/QR fallback |
| QR backup generation | Printable QR for non-wristband use |
| Scan history | Owner awareness of access events |
| **Family multi-tag account** | One login for self + children + elderly parents |
| **Register New Tag** | Add bands without new account |
| **Scan notification to account holder** | Parent/caregiver knows immediately when dependent tag is scanned |
| **Share Location with Family** | Bystander sends GPS pin — reunification without continuous tracking |
| **Elderly dependent mode** | Adult child manages parent's band — disorientation + medical context |
| Emergency contact priority | Primary contact surfaced first |
| WhatsApp contact action | Common in Indonesia — one-tap contact |
| Offline printed fallback (Emergency ID on wristband) | Works without network for ID entry |
| Admin batch generation | Scale wristband production |
| Demo mode | Competition presentation without real data |
| Multilingual emergency page (EN / ID) | Broader accessibility in Indonesia |
| Dark / high-contrast emergency page | Readability under stress |
| Large emergency action buttons | Usability for stressed bystanders |
| Stale data warning (> 90 days) | Prompts owner to reconfirm |
| Optional blood type with disclaimer | Useful but not medically verified |
| Optional emergency notes field | Free-text for first responders |

**Recommendation:** Family multi-tag support should be **first-class in MVP architecture** even if the competition demo shows two tags. The highest-value post-MVP upgrade is **push/SMS notifications** on scan. **Share Location with Family** is strongly recommended for MVP demo impact — it solves "where is my child/parent?" without building a tracker.

### Elderly Dependent Mode — Additional Features

| Feature | Priority | Benefit |
|---------|----------|---------|
| **Profile mode: Elderly Dependent** | MVP | Public page blends medical info + family reunification |
| **Disorientation / Alzheimer's notes** | MVP | Helps bystanders understand behavior without clinical jargon |
| **Call Family as primary CTA** | MVP | Adult child is first contact — not 112 unless medical emergency |
| **Share Location with Family** | Recommended MVP | Adult child sees where parent was found |
| **Scan notification to adult child** | MVP (in-app) | Know immediately when parent's band is scanned |
| **Managed by caregiver account** | MVP | Elderly wearer needs no smartphone or login |
| **No home address on public page** | MVP (policy) | General area only — prevents predatory use |
| **Fainting/medical block prominent** | MVP | Relevant for crowd/hot environment scenarios |
| **Push/SMS on elderly tag scan** | Post-MVP (high) | Critical when adult child is not watching dashboard |
| **Wandering alert copy** | MVP | "May have wandered — please stay with them" |

### Child Mode — Additional Features

These features become important when covering the **child lost & guardian reunification** scope:

| Feature | Priority | Benefit |
|---------|----------|---------|
| **Profile mode: Child Guardian** | MVP | Switches public page to lost-child template with guardian contact as hero action |
| **Guardian contact as primary CTA** | MVP | One-tap Call Parent / WhatsApp — core value for lost-child scenario |
| **Lost-child public page template** | MVP | Distinct UI: alert header, child name, guardian buttons — not medical-first layout |
| **Reunification note** | MVP | Guardian can leave "Please wait with my child" or meeting point instructions |
| **Secondary guardian contact** | MVP | Fallback if primary parent does not answer |
| **Parent notification on scan (SMS/push)** | Post-MVP (high) | Parent knows immediately when band is scanned — critical for child mode |
| **Share Location with Family** | Recommended MVP | Parent sees map pin where child was found |
| **Multiple child wristbands per account** | MVP (architecture) | One parent dashboard for all children in the family |
| **Family / guardian dashboard** | MVP (basic) | List all managed wristbands (self + children + elderly) with status at a glance |
| **Trip / event mode** | Post-MVP | Temporary mode for high-risk outings (theme park day, Lebaran travel) with optional enhanced alert |
| **Child wristband SKU (size + color)** | Post-MVP | Smaller strap, bright colors, child-friendly design |
| **Bilingual lost-child page (EN/ID)** | Recommended | Tourist areas, airports, international malls |
| **Guardian identity verification prompt** | Post-MVP | Bystander checklist before releasing child to caller |
| **"Stay with child" static instruction** | MVP | Shown on public page — do not leave the child alone |
| **Allergies for child** | MVP | Peanut, bee sting, etc. — still relevant in lost-child scenario |
| **Language hint field** | Post-MVP | "Child speaks Indonesian only" — helps bystander communicate |
| **School / daycare contact mode** | Post-MVP | Contact school first on weekdays instead of parent |
| **Optional child photo (private verification)** | Future | Staff verifies guardian identity — photo never fully public without consent |
| **Handover verification code** | Future | Guardian tells bystander a code to confirm identity |
| **Scan alert to secondary guardian** | Post-MVP | Notify Dad if Mom is primary and does not respond |
| **Do not show home address or school name** | MVP (policy) | Protects child from predators — reunification via contact only |
| **Rate limiting on child profiles** | MVP | Prevents stalkers from repeatedly scanning to harvest data |

**Recommendation:** Child and elderly modes can ship in MVP with the same hardware and database — the main additions are `profile_mode`, third public page template, family multi-tag dashboard, scan notifications, and **Share Location with Family**. The single highest-value post-MVP feature is **push/SMS notification on scan**.

---

### Bystander Location Sharing — Security & Privacy

- Location is collected from the **bystander's device only** — never from the wristband hardware.
- Requires **explicit browser permission** — no silent tracking.
- Coordinates visible **only to account holder** and configured emergency contacts.
- Do **not** display shared location on the public page — private to account holder dashboard.
- Retain location data for limited period (e.g., 7–30 days) then purge.
- Rate limit: one location submission per scan session; prevent coordinate spam.
- Show bystander confirmation: "Location sent to family. Thank you for helping."

## 19. Security and Privacy Requirements

### Data Minimization

- NFC tag stores **only** an HTTPS URL with public token — no medical data on hardware.
- QR code stores the **same** public emergency URL.
- Do **not** store or display: NIK/national ID, full address, documents, lab results, or detailed medical history.
- Public emergency page returns **only** public-safe fields via dedicated query or RPC.

### Identifier Security

- Emergency ID is public-facing but **random and non-sequential** — not guessable.
- Public token is a **cryptographically random** string — not derived from Emergency ID.
- Activation Code is **private, single-use**, and stored as **hash only** — never plain text in the database.

### Access Control (Supabase RLS)

| Table | Owner | Public | Admin |
|-------|-------|--------|-------|
| `profiles` | Own row only | No access | Read all |
| `wristbands` | Own wristbands | Read active (token lookup only) | Full |
| `activation_codes` | No direct access | No access | Full |
| `emergency_profiles` | Own profiles | Read public fields on active wristbands | Full |
| `emergency_contacts` | Own contacts | Read primary contact action data only | Full |
| `scan_logs` | Read own wristband logs | Insert only | Full |

### Elderly-Specific Privacy

- Same rules as child mode: **no full name, home address, or daily routine** on public page.
- **Disorientation notes** should be helpful but not expose detailed medical records.
- **General area** (e.g., "South Jakarta") acceptable; **full street address** not acceptable on public page.
- Adult child account holder is responsible for keeping parent's medical info current.

### Child-Specific Privacy

- **Do not expose** child's full name, home address, school name, or daily routine on the public page.
- Use **first name or nickname only** — enough for guardian to confirm, not enough for identity theft.
- **Guardian phone** is accessed via action buttons (tel:/WhatsApp), not displayed as plain text by default — reduces harvesting by malicious scanners.
- **Parental/guardian consent** required during child profile setup — guardian confirms they are authorized to register the child.
- **Handover safety:** public page should instruct bystanders to verify guardian identity before releasing the child; GelangSiaga facilitates contact, not custody transfer.
- **No child photos on public page** for MVP — reduces risk of profiling; optional verified handover in future version.
- **Disable immediately** if wristband is lost — prevents stranger from luring child by faking ownership.
- **Rate limiting** especially important for child profiles — mitigates repeated scanning by bad actors.

### Public Page Protections

- Do not expose emergency contact phone as plain text — use `tel:` or WhatsApp action buttons.
- Rate limiting on public emergency pages and lookup endpoint.
- Show self-reported information disclaimer on every public page.
- Show last updated timestamp on every public page.
- Disabled or revoked wristbands return generic not-found — no information leakage.

### Owner Controls

- Owner can disable lost or misused wristband immediately.
- Owner can review scan history for awareness of unauthorized access patterns.

---

## 20. Supabase Best Practices

- **Enable RLS on all tables** — no table without policies.
- **Owner-only policies** — use `auth.uid() = owner_id` pattern for wristband-scoped data.
- **Public read policy** — restrict to `status = 'active'` and public-safe columns only; prefer a dedicated RPC such as `get_public_emergency_data(token)`.
- **Secure random token generation** — use `gen_random_uuid()` or `encode(gen_random_bytes(32), 'hex')` in PostgreSQL.
- **Store activation code as hash** — compare with `crypt()` on claim; never log or return plain codes.
- **Avoid storing unnecessary sensitive data** — if a field is not needed publicly or for owner management, do not collect it.
- **Database constraints** — `UNIQUE` on `emergency_id` and `public_token`; check constraints on `status` enum values.
- **Timestamps** — use `timestamptz` consistently; maintain `updated_at` via trigger.
- **Do not expose private contact data in public queries** — public RPC returns action URL, not raw phone number.
- **RPC for claim flow** — atomic transaction: validate code hash, mark used, set owner, update status — prevents race conditions.
- **Service role key** — server-side only; never exposed to client.
- **Indexes** — on `public_token`, `emergency_id`, `wristbands.owner_id`, `scan_logs.wristband_id`.

---

## 21. Next.js Best Practices

- **Use App Router** — all routes under `app/` directory.
- **Server Components by default** — public emergency page and dashboard data fetching on server.
- **Server Actions or Route Handlers** for sensitive writes — claim wristband, profile updates, disable wristband.
- **Public emergency page** — optimize for speed: minimal JS, no auth middleware, static where possible with dynamic token lookup.
- **Do not expose service role key to client** — use anon key client-side; service role in server actions only.
- **Environment variables** — `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` (server only).
- **Middleware** — protect `/dashboard`, `/claim`, `/setup`, `/profile`, `/contacts`, `/wristbands/*`; do not apply to `/e/[token]` or `/lookup`.
- **Clean separation** — public pages in minimal layout (no nav); authenticated pages in dashboard layout with sidebar.
- **Error boundaries** — graceful not-found for invalid tokens and disabled wristbands.
- **Metadata** — public emergency page: `robots: noindex` to prevent search engine indexing of personal emergency data.

---

## 22. Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| **Privacy misuse** — unauthorized access to personal health info | High | RLS, public-safe fields only, token-based access, owner disable, scan logging |
| **Random scan abuse** — bots or curiosity scans | Medium | Rate limiting, IP hash logging, no sensitive data beyond public fields |
| **Activation code theft** — code stolen before owner claims | High | Single-use hash storage, claim race protection via RPC, short expiry optional |
| **Lost wristband** — finder accesses profile | High | Owner disable flow, scan alerts (future), minimal public data |
| **Outdated data** — stale allergies or medications | High | Last updated timestamp, stale warning, last confirmed reminder |
| **NFC unsupported devices** — bystander phone lacks NFC | Medium | QR backup + manual Emergency ID lookup |
| **QR damaged** — unreadable QR on worn wristband | Medium | NFC primary + visible Emergency ID fallback |
| **User changes phone** — loses access to account | Medium | Email-based auth recovery via Supabase Auth |
| **Emergency contact unavailable** — primary contact does not answer | Medium | Multiple contacts, direct emergency services button always visible |
| **Database downtime** — emergency page unavailable | High | Vercel edge caching for static shell, Supabase SLA monitoring, visible Emergency ID as offline fallback |
| **False sense of medical authority** | Medium | Prominent self-reported disclaimer on every public page |
| **Regulatory concerns** — classified as medical device | Medium | Position as identification tool, not diagnostic; no medical claims |
| **Child safety / stranger danger** — wristband used to contact wrong person | High | Action buttons only, handover verification guidance, disable flow, no address/school on public page |
| **Guardian phone harvesting** — repeated scans to collect numbers | Medium | Rate limiting, no plain-text phone display, IP hash logging |
| **False reunification** — child released to non-guardian | High | Bystander instructions to verify identity; future handover code; stay-with-child message |
| **Child removes wristband** | Medium | Comfortable design, bright colors; parent educates child to keep it on during outings |

---

## 23. MVP Limitations

GelangSiaga MVP is an emergency **identification** and **guardian reunification** tool, not a medical device, child tracker, or health record system.

- No medical diagnosis or triage capabilities
- No full medical record storage
- No hospital or clinic integration
- No BPJS or insurance integration
- No automatic GPS tracking of the victim, child, or elderly wearer
- No continuous real-time location monitoring — **scan-triggered bystander location share only** (with consent)
- No health sensors (heart rate, SpO2, etc.)
- No battery-powered wearable electronics
- No native mobile app — responsive web only (PWA acceptable)
- No guarantee that self-reported data is medically accurate
- Push/SMS notification on scan — post-MVP (in-app scan notifications acceptable for MVP)
- Superadmin dashboard available for single-tag registration; automated bulk batch generation remains post-MVP
- Multi-tag architecture in MVP; demo may show 1–3 tags per account
- Activation and profile setup require internet access
- Public emergency page requires internet access (offline fallback limited to visible Emergency ID)
- Not a replacement for teaching children their parent's phone number or safe meeting points

---

## 24. Success Metrics

| Metric | Description | Target (MVP) |
|--------|-------------|--------------|
| Wristbands generated | Total wristband records created | Track baseline |
| Wristbands claimed | Activation codes successfully used | > 80% of generated |
| Activation completion rate | Claim → active status | > 70% of claimed |
| Emergency profile completion rate | All required fields filled | > 90% of active |
| Active wristbands | Status = active | Primary health metric |
| Emergency page accesses | Total scan_logs entries | Track per wristband |
| Time to contact action | Emergency page open → contact button tap | < 30 seconds |
| Disabled / lost wristbands | Status = disabled count | Track for safety |
| Profile freshness | Profiles updated within last 90 days | > 60% of active |
| Lookup fallback usage | manual_lookup access method ratio | Monitor NFC/QR reliability |
| Tags per account | Average wristbands managed per account holder | Track family adoption |
| Scan notifications delivered | In-app alerts sent on dependent tag scan | Track notification pipeline |
| Location shares per scan | % of scans where bystander shared GPS | Primary reunification signal |
| Elderly mode wristbands | Count where `profile_mode = elderly_dependent` | Track adoption |
| Multi-tag accounts | Accounts with 2+ active wristbands | Track family plan usage |
| Guardian contact tap rate | Call/WhatsApp button clicks on child page | Primary child-mode success signal |
| Reunification time (estimated) | Scan timestamp → guardian callback (future) | Requires notification feature |
| Child wristband disable rate | Disabled child bands / total child bands | Monitor loss/theft |

---

## 25. Short Pitch

**GelangSiaga** (RAKSA-TAG) is a safety wristband that helps strangers help your family — whether you're an adult who can't speak in a medical emergency, a child separated from your parent in a crowded mall, or an elderly parent who forgot the way home. Each wristband carries an NFC tag, a QR code, and a visible Emergency ID. Bystanders tap, scan, or type to instantly reach the right person.

**One account, many tags.** A son sets up a band for his aging mother. A parent adds tags for two toddlers. A daughter manages her own band plus her father's — all from one login. Register a new tag, fill in that person's profile, and you're done.

When a child's or elderly parent's tag is scanned, the account holder gets an instant alert — and if the helper taps **Share Location with Family**, you see exactly where they were found. No app download for bystanders. No login. No unlocked phone required.

Built with Next.js and Supabase for speed and security, GelangSiaga turns a simple silicone band into a safety layer for medical emergencies, family reunification, and elderly care — for the moments when every second counts.

---

## 26. Future Improvements

| Area | Improvement |
|------|-------------|
| **Notifications** | Push/SMS/email to account holder on dependent tag scan — **critical for child & elderly modes** |
| **Share Location with Family** | Full map UI, reverse geocoding, location history in scan detail |
| **Family accounts** | Manage multiple wristbands (self, children, elderly parents) from one dashboard — **MVP architecture** |
| **Elderly dependent mode** | Full template + disorientation fields — **MVP** |
| **Register New Tag** | Add bands to existing account — **MVP** |
| **Trip / event mode** | Temporary heightened alert for high-risk outings |
| **Handover verification code** | Guardian shares a code to confirm identity before child release |
| **Child wristband SKUs** | Smaller sizes, bright colors, fun designs |
| **Admin portal** | Batch generation, inventory, revoke, analytics dashboard |
| **Geolocation on scan** | Bystander-initiated location share via **Share Location with Family** — **recommended MVP** |
| **Multi-language** | Full i18n — Indonesian, English, and regional languages |
| **Wearable integrations** | Apple Watch / Wear OS companion for profile sync |
| **Medical professional verification** | Optional doctor-verified badge on profile |
| **Integration APIs** | Hospital ER pre-registration, insurance emergency lines |
| **Subscription model** | Premium features: multiple contacts, family plan, priority support |
| **Custom wristband designs** | Colors, sizes, corporate/event bulk orders |
| **Offline NFC read** | NTAG213 URI stored locally — page loads when connectivity returns |
| **Accessibility** | Screen reader optimization, voice readout of emergency info |
| **Analytics dashboard** | Owner insights: scan frequency, profile health score |
| **QR reprint** | Owner-generated replacement QR for damaged bands |

---

*Document version: 1.2 — GelangSiaga MVP Product Specification (includes Child Guardian, Elderly Dependent, Family Multi-Tag, Scan Notifications, and Share Location with Family / RAKSA-TAG extended scope)*
