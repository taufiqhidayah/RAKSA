Refactor ONLY the Medical Information cards.

Do not change any data or business logic.

## Goal

Transform the medical information section into a premium healthcare interface inspired by Apple Health and modern medical applications.

The section must feel lightweight, easy to scan, and visually calm.

Remove the colored vertical accent bars.

Use icon accents instead.

------------------------------------------------

Cards

Allergy

Medical Condition

Medication

Emergency Notes

------------------------------------------------

Card Style

Background:
White

Border Radius:
24px

Border:
1px solid #ECE8FF

Padding:
24px

Shadow:
Very soft

Spacing:
16px

Remove the left colored border completely.

------------------------------------------------

Header

Place a rounded icon container on the left.

Size:
52x52

Radius:
16px

Then beside it:

Section title

18–20px

SemiBold

------------------------------------------------

Icon Colors

Allergy

Light Red Background

Red Icon

Medical

Light Purple Background

Purple Icon

Medication

Light Blue Background

Blue Icon

Notes

Light Amber Background

Amber Icon

------------------------------------------------

Content

Do NOT use plain paragraphs when the data is a list.

Instead:

If multiple values exist:

Display them as rounded pills.

Example:

🟠 Peanut

🟠 Penicillin

🟠 Seafood

Use flex-wrap.

Gap:
10px

Each pill:

Height:
36px

Horizontal padding:
14px

Rounded:
999px

------------------------------------------------

Medical Conditions

Display as purple pills.

Example

🟣 Asthma

🟣 Hypertension

------------------------------------------------

Medication

Display as blue pills.

Example

💊 Salbutamol

💊 Ventolin

------------------------------------------------

Emergency Notes

Keep notes as paragraph.

Display inside a soft rounded container.

Use:

16px font

1.6 line height

Muted gray

No pills.

------------------------------------------------

Typography

Section Title

20px

600

Body

16px

500

Pills

15px

600

------------------------------------------------

Animation

Cards

Fade in.

Hover

Lift slightly.

Transition

200ms.

------------------------------------------------

Overall feeling

Modern

Minimal

Premium

Apple Health

Linear

Healthcare Dashboard

Avoid heavy visual elements.

The focus should be on readability and quick scanning.