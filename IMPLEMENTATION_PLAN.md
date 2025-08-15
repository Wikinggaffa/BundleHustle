Implementation Plan for BundleHustle
===================================

Project Setup
-------------
- Create a simple HTML/CSS/JS project scaffold targeting a “pixel‑retro” vibe.
- Define top‑level game state (day counter, cash, debt, reputation, compliance) and UI regions: district map, market table, inventory, event feed, action buttons.

Core Data Models
----------------
- Represent 10+ fictional streaming brands with base price, demand profile, and district modifiers.
- Model districts with travel cost, demand trends, and any special rules or events.
- Track tradable items: promo codes, gift cards, bundle slots, limited-series passes, sports weekend passes; include attributes like expiration, quantity, risk, and margin potential.

Core Loop Implementation
------------------------
- Initialize player with starting cash (1,000) and inventory capacity (wallet space = 20).
- Allow selecting a district, buying items at district-specific prices, and selling them in other districts.
- Handle travel between districts; each trip consumes one turn and charges a fee of 10.

Economy & Pricing
-----------------
- Implement price calculations: base price ± district modifier ± daily volatility ± event impact.
- Support daily tick updating prices, handling inventory expiration, and advancing day count (game length = 30 days for Classic mode).

Reputation, Compliance & Loans
------------------------------
- Track reputation changes based on sales/refunds affecting pricing and access to clients.
- Maintain a compliance meter that increases with large bundle-slot holdings and can trigger audits.
- Implement two loan types: Fintech Shark (8%/day) and Angel Nerd (2%/day with reputation requirement).

Upgrades System
---------------
- Add upgrade options: Market Scanner, Auto-Lister, Referral Engine, Fraud Filter, Cold Storage.
- Persist upgrade effects across days, influencing visibility, sales automation, audit chance, and inventory size.

Random Events Engine
--------------------
- Create event definitions (e.g., Password Sharing Crackdown, Blockbuster Drop, Sports Final Weekend, Service Outage) with triggers and effects on pricing/demand.
- Trigger one or more events daily, resolving outcomes and updating game state.

Win/Lose Conditions & Modes
---------------------------
- Implement Classic mode goal: maximize net worth after 30 days.
- Add alternative modes (Broker Prestige, Ironclad) with modified rules for reputation thresholds or loan restrictions.

Balancing & Testing
-------------------
- Integrate audit chance base 3%/day (+0.5% per bundle slot held >5), typical price margins −20% to +60%, and other starter numbers.
- Playtest pricing, events, and travel to fine-tune difficulty and economy flow.

Roadmap Sprints
---------------
- **Sprint 1**: Core buy/sell, districts, ten brands, daily tick, simple events.
- **Sprint 2**: Add reputation, audits, loans, upgrades.
- **Sprint 3**: Achievements, high-score seed, polish, and sound effects.

Summary
-------
This plan translates the “Subscription Broker” concept into an actionable coding roadmap: start with a core economic loop, gradually add systems for reputation, compliance, and upgrades, and finally incorporate polish through events, UI, and achievements. Each step aligns with the specifications in the README, ensuring a cohesive city‑sized internet trading game.

