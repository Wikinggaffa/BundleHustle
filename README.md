# BundleHustle

Working title ideas

Binge Broker

Bundle Hustle

Streamopolis: Subscription Shuffle

Theme & setting (no NYC alleys)

World: “Streamopolis,” a city-sized internet made of districts like DormNet, FamilyHub, and SportsSphere.

Role: A Subscription Broker flipping promo codes, gift cards, and family-plan slots.

Travel: You “route hop” across networks (Wi-Fi cafés, SmartTV malls, Campus LANs). Travel takes a turn and has a fee/opportunity cost.

Core loop (Drug Wars → Sub Wars)

Start with cash + tiny inventory.

Pick a district → buy undervalued subs/promos.

Hop to a new district → sell high to that segment.

React to events (price hikes, password crackdowns, blockbuster drops).

Manage risk (compliance audits instead of cops).

After X days/turns → score by wealth + reputation + active user base.

Fictional streaming “brands” (parody, not real)

Each has vibes & demand patterns:

FlickFaucet – mainstream films/series.

Castle+ – fairy-tale + family.

ParcelPlay Video – free shipping jokes + shows.

GreenScreen – next-day TV & originals.

PearTV+ – prestige miniseries.

Mammoth – big franchises, gritty reboots.

CurioFlow – docs & smart stuff.

GoalLine+ – sports & live matches.

NoriRoll – anime & late-night simulcasts.

ScreamBeam – horror & thrillers.

IndieCrate – festivals & arthouse.

KidzCloud – cartoons & edutainment.

RetroWave – 80s–00s classics.

GiggleBox – stand-up & sketch.

StageDoor – musicals & theatre.

CraftTube – DIY & home projects.

NewsWire+ – live news bundles.

ZenStream – nature, fireplace loops.

EuroBall – football tournaments.

Bollywood Blvd – South Asian cinema.

Districts (market segments)

DormNet (students, broke → loves free trials)

FamilyHub (bundles, kids content)

CaféWi-Fi Row (gig workers, monthly churn)

SmartTV Plaza (older households, stable demand)

SportsSphere (huge spikes on finals)

Otaku Arcade (anime fanatics, late-night)

Office LAN (perk buyers, bulk orders)

Cinephile Alley (prestige drama spikes)

Holiday Park (seasonal cabins, Summer/Winter surges)

Items you trade

Promo Codes (expire; low risk, small margin)

Gift Cards (no expire; mid margin)

Bundle Slots (limited quantity; big margin, audit risk)

Limited-Series Passes (event-driven spikes)

Sports Weekend Passes (date-locked; volatile)

Systems & stats

Price model: Base price ± district modifier ± daily volatility ± event impact.

Reputation: Better prices, access to bigger clients; drops if refunds/chargebacks rise.

Inventory cap: “Wallet space” (number of codes/slots).

Compliance meter: High when you hoard bundle slots → risk of Audit (fines, item confiscation).

Loans: “Fintech Shark” (daily interest), or safer “Angel Nerd” (lower rate, reputation requirement).

Upgrades:

Market Scanner (see tomorrow’s drift % in one district)

Auto-Lister (sell up to N items instantly when threshold met)

Referral Engine (passive daily sales)

Fraud Filter (reduce audit chance)

Cold Storage (bigger wallet)

Random events (the fun)

Password Sharing Crackdown (bundle slots tank; legit gift cards spike)

Blockbuster Drop (FlickFaucet, Mammoth, PearTV+ surge for 2–3 days)

Sports Final Weekend (GoalLine+ & EuroBall explode; others dip)

Price Hike Announcement (pre-hike hoarding → short spike, post-hike slump)

Service Outage (prices crater for a day)

Merger Rumor (two brands’ prices drift up together)

Free Trial Bonanza (DormNet demand drops for mainstream services)

Awards Night (prestige services pop; horror/comedy dip)

VAT Change/Regulatory Talk (citywide minor price wobble)

Win / lose / modes

Classic (30 days): End with highest Net Worth.

Broker Prestige: Maintain Reputation ≥ X and Active Users ≥ Y.

Ironclad: No loans; audits harsher.

Endings: “Coupon King/Queen,” “Respectable Reseller,” “Banned by Bots.”

UI sketch (simple HTML game)

Top bar: Day, Cash, Debt, Reputation, Compliance.

Left: District map (buttons) + travel cost.

Center: Market table (brand, buy/sell price, stock, trend arrow).

Right: Inventory list + queued sales.

Bottom: Event feed + actions (Buy/Sell/Travel/End Day).

Balancing starter numbers (first pass)

Start cash: 1,000

Wallet space: 20

Daily travel time: 1 turn; travel fee: 10

Loan rates: Shark 8%/day, Angel 2%/day

Audit chance base: 3%/day, +0.5% per bundle slot held >5

Typical margins: −20% to +60% around base

Quick content roadmap

Sprint 1: Core buy/sell, districts, 10 brands, daily tick, simple events.

Sprint 2: Reputation, audits, loans, upgrades.

Sprint 3: Achievements, high-score seed, polish & SFX.



Art vibe: Pixel-retro

Tone: Wholesome satire

  Game length: 30 days

## Development

This repository contains a minimal pixel-retro prototype implemented in plain HTML, CSS, and JavaScript.

- Open `index.html` in a browser to play.
- Run `node tests/test_game.js` to execute a small logic test of the core loop.
