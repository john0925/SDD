# Design System Document: The Curated Table

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Digital Curator."** 

We are moving away from the generic, grid-locked "food app" aesthetic. Instead, we are designing an editorial wellness experience that feels like a private consultation with a high-end nutritionist. The interface must balance the grounded, earthy nature of Olive Green with the sophisticated lightness of modern typography. 

To achieve this, we will use **Intentional Asymmetry**—where images of fresh ingredients break the container bounds—and **Layered Depth**, treating the UI as a series of physical materials like fine paper and frosted glass rather than flat digital pixels.

---

## 2. Colors & Tonal Architecture
Color is our primary tool for defining space. We are abandoning the traditional "border" approach in favor of a tonal hierarchy.

### The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders to separate sections or define cards. Boundaries must be defined solely through background color shifts.
*   **Base Layer:** `surface` (#fbfaf1)
*   **Sectional Shift:** Use `surface-container-low` (#f5f4eb) to define a large content area.
*   **Actionable Area:** Use `surface-container-lowest` (#ffffff) for card-level components to make them "pop" against the warmer background.

### Surface Hierarchy & Nesting
Treat the UI as a physical stack.
1.  **Level 0 (Background):** `surface`
2.  **Level 1 (Content Grouping):** `surface-container`
3.  **Level 2 (Interaction Points):** `surface-container-highest` or `surface-container-lowest`

### Glass & Gradient Rule
To prevent the brand from feeling "stagnant," apply a subtle **Signature Texture**:
*   **Hero Sections:** Use a linear gradient from `primary` (#3e5219) to `primary-container` (#556b2f) at a 135-degree angle.
*   **Floating Navigation:** Use a Glassmorphic effect. Apply `surface-container-lowest` at 70% opacity with a `backdrop-blur` of 16px. This allows the vibrant food photography to bleed through the UI, creating an integrated, premium feel.

---

## 3. Typography: Editorial Authority
Our typography pairs the modern precision of **Inter** with the expressive character of **Plus Jakarta Sans**.

*   **Display & Headlines (Plus Jakarta Sans):** These are our "Editorial Voices." Use `display-lg` for hero marketing claims. Use `headline-sm` for meal titles. The generous x-height of Jakarta conveys warmth and professionalism.
*   **Body & Labels (Inter):** Inter provides the "Clinical Trust." All nutritional data, ingredient lists, and instructions must use `body-md` or `label-md` to ensure maximum legibility and a nutritionist-led feel.
*   **Contrast as Hierarchy:** Pair a `display-md` headline with a `label-sm` (all caps, tracked out +5%) to create a high-end magazine layout.

---

## 4. Elevation & Depth
We define hierarchy through **Tonal Layering** rather than structural lines.

### The Layering Principle
Depth is achieved by stacking `surface-container` tiers. A `surface-container-lowest` card sitting on a `surface-container-low` section creates a natural, soft lift that feels organic and approachable.

### Ambient Shadows
When an element must float (e.g., a "Add to Cart" FAB), use **Ambient Shadows**:
*   **Color:** Use a tinted version of `on-surface` (#1b1c17) at 6% opacity.
*   **Blur:** 24px to 32px.
*   **Spread:** -4px.
*   This mimics natural light hitting a matte surface, avoiding the "dirty" look of standard grey shadows.

### The "Ghost Border" Fallback
If a border is required for accessibility (e.g., an input field), use a **Ghost Border**:
*   Token: `outline-variant` (#c5c8b8)
*   Opacity: 20%
*   *Requirement:* Never use 100% opaque borders.

---

## 5. Components

### Buttons (The Interaction Pillars)
*   **Primary:** `primary` background with `on-primary` text. Use `rounded-full` (9999px) for a companionate, friendly feel.
*   **Secondary:** `secondary-container` background. These should feel like a part of the page, not a disruption.
*   **Tertiary (The Minimalist):** No background. Use `primary` text with a subtle `primary-fixed-dim` underline for high-end navigation.

### Cards & Food Modules
*   **Rule:** Forbid divider lines.
*   **Layout:** Use `xl` (1.5rem) rounded corners. Use vertical white space from our spacing scale to separate the food title from the price.
*   **Nesting:** Place the food image in a container that is slightly "shrunk" inside the card, or allow it to bleed off the top edge to break the "boxed-in" feel.

### Nutrient Badges (Custom Component)
*   For protein/carb highlights, use `tertiary-container` (#9c4f00) with `on-tertiary-container` text.
*   Apply a `sm` (0.25rem) corner radius to give these a "medical/professional" tag look, contrasting against the rounded buttons.

### Input Fields
*   Background: `surface-container-high`
*   State: Underline only or Ghost Border (20% opacity).
*   Focus: Shift background to `surface-container-lowest` and increase the shadow blur.

---

## 6. Do's and Don'ts

### Do:
*   **Do** use asymmetrical padding (e.g., more padding on the left than the right in hero sections) to create an editorial flow.
*   **Do** use high-quality, "top-down" macro photography of ingredients.
*   **Do** utilize the `tertiary` (Carrot Orange) sparingly—only for vital nutritional callouts or high-priority CTA accents.

### Don't:
*   **Don't** use black (#000000) for text. Always use `on-surface` (#1b1c17) to maintain the warm, organic tone.
*   **Don't** use standard "drop shadows" on cards. Stick to tonal shifts or Ambient Shadows.
*   **Don't** use generic icons. If an icon is needed, it should have a "hand-drawn" or "organic" weight to match the nutritionist-led personality.