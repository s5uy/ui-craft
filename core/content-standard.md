# Content Standard

Never use low-effort placeholders. The copy, data, and imagery in a generated UI must be realistic enough to evaluate the design.

A design with placeholder content cannot be properly judged. "Lorem ipsum" body text hides poor line-length decisions. "Coming soon" feature cards hide weak hierarchy. "User Name" labels hide inadequate information density planning.

---

## Copy Quality

Write copy as if the product is real and the company has a clear point of view.

**Do not write:**
- "Streamline your workflow with our powerful platform"
- "Unlock the power of seamless collaboration"
- "Built for teams of all sizes"
- "The all-in-one solution for modern businesses"
- Anything that could apply to 500 different products

**Do write:**
- Copy that specifies what the product actually does
- Copy that names the problem it solves
- Copy with concrete nouns and active verbs
- Copy where the user could read it and know what to do next

If the product type is not specified, invent a specific product. "A deployment monitoring tool for engineering teams" is better than "a platform for your business." Specific copy reveals design problems that generic copy hides.

---

## Headline Strategy

Marketing headlines should have a point of view, not just a value proposition.

**Weak:** "The fastest way to ship your product"

**Stronger:** "Ship what matters. Drop what doesn't." (with a supporting subhead that explains what the product is)

A good headline is direct, specific, and creates curiosity or clarity. It does not hedge. It does not list features.

---

## Data and Metrics

When showing dashboards, metrics, or data visualizations:

- Use realistic numbers — not `1234`, not `99999`, not all round numbers
- Use realistic units — `$124,392`, `2.4k users`, `98.7% uptime`, `143ms p50`
- Use data that tells a story — not just numbers on cards but numbers that mean something in relation to each other
- Use realistic time ranges — "Last 30 days", "Q1 2025", "March 12 – April 12"
- Use realistic chart shapes — upward trends with natural variation, not perfectly smooth lines

Fake data that is clearly invented with no care undermines the credibility of the design.

---

## UI Labels and Navigation

Use realistic labels in navigation, tables, and UI chrome.

**For a SaaS product:**
- Navigation: Dashboard, Projects, Team, Settings, Billing
- Table headers: Name, Status, Created, Last updated, Actions
- Status labels: Active, In review, Draft, Archived

Not: Page 1, Item 1, Section A, Tab 2.

Match the vocabulary to the product category. Developer tools use different language than project management tools, which use different language than ecommerce tools.

---

## Imagery

When images are required in a design:

**Use `next/image` with descriptive `alt` text.** Do not use `<img src="placeholder.jpg">`.

**For real implementations:** reference Unsplash, a product screenshot, or a relevant public image URL. Describe the image type clearly in code comments or image `alt` attributes.

**For wireframe contexts:** use explicit, descriptive aspect ratios and bg-color placeholders (`bg-neutral-200`) with text labels indicating what the image is (`[Product screenshot]`).

Do not use gray boxes labeled "Image" without indicating what kind of image. The design reviewer cannot evaluate image-text hierarchy without knowing what the image contains.

---

## Product Plausibility Standard

If the design includes:
- A user profile: give the user a realistic name, avatar initial, and role
- A team list: give it 3–5 members with different roles
- A notification list: write 3–4 realistic notifications
- A pricing table: write realistic tier names and features specific to the product category
- An activity feed: write 4–5 realistic activity entries

Everything should be specific enough that a designer could evaluate whether the typography, spacing, and hierarchy work under real conditions.

---

## When Specificity Reveals Design Problems

Generic placeholders hide:
- Line-length issues (short placeholder text does not reveal that long real text will wrap badly)
- Truncation problems (fake short labels do not reveal that real data will overflow)
- Density issues (sparse fake data does not reveal that real data will crowd the layout)
- Hierarchy failures (all-caps "LABEL" placeholders do not reveal weak type hierarchy)

Specific, realistic content stress-tests the design before it is built. This is why the content standard matters.
