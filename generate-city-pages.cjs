#!/usr/bin/env node
/**
 * Programmatic SEO Page Generator
 * Arizona Telepsychiatry Clinic — City Landing Pages
 *
 * Generates 50+ optimized "online psychiatrist [city]" / "ADHD telehealth [city]"
 * pages with full SEO + AEO (Answer Engine Optimization) compliance.
 */

const fs = require("fs");
const path = require("path");

// ─────────────────────────────────────────────────────────
// CITY DATA — 55 Arizona cities organized by tier
// ─────────────────────────────────────────────────────────
const cities = [
  // TIER 1 — Major metros (100k+ population)
  { name: "Phoenix", slug: "phoenix", county: "Maricopa", tier: 1, pop: "1.6M", notable: "Arizona's capital and largest city", nearby: null, region: "Central Arizona", zip: "85001" },
  { name: "Tucson", slug: "tucson", county: "Pima", tier: 1, pop: "545K", notable: "home to the University of Arizona", nearby: "Phoenix", region: "Southern Arizona", zip: "85701" },
  { name: "Mesa", slug: "mesa", county: "Maricopa", tier: 1, pop: "508K", notable: "the third-largest city in Arizona", nearby: "Phoenix", region: "East Valley", zip: "85201" },
  { name: "Chandler", slug: "chandler", county: "Maricopa", tier: 1, pop: "275K", notable: "a major tech hub in the East Valley", nearby: "Phoenix", region: "East Valley", zip: "85224" },
  { name: "Scottsdale", slug: "scottsdale", county: "Maricopa", tier: 1, pop: "242K", notable: "known for world-class healthcare and resorts", nearby: "Phoenix", region: "East Valley", zip: "85251" },
  { name: "Glendale", slug: "glendale", county: "Maricopa", tier: 1, pop: "250K", notable: "home to State Farm Stadium and Westgate", nearby: "Phoenix", region: "West Valley", zip: "85301" },
  { name: "Gilbert", slug: "gilbert", county: "Maricopa", tier: 1, pop: "280K", notable: "one of the fastest-growing cities in the U.S.", nearby: "Phoenix", region: "East Valley", zip: "85233" },
  { name: "Tempe", slug: "tempe", county: "Maricopa", tier: 1, pop: "185K", notable: "home to Arizona State University", nearby: "Phoenix", region: "East Valley", zip: "85281" },
  { name: "Peoria", slug: "peoria", county: "Maricopa", tier: 1, pop: "195K", notable: "a growing city spanning Maricopa and Yavapai counties", nearby: "Phoenix", region: "West Valley", zip: "85345" },
  { name: "Surprise", slug: "surprise", county: "Maricopa", tier: 1, pop: "145K", notable: "one of the fastest-growing suburbs in the West Valley", nearby: "Phoenix", region: "West Valley", zip: "85374" },

  // TIER 2 — Mid-size cities (20k–100k)
  { name: "Yuma", slug: "yuma", county: "Yuma", tier: 2, pop: "100K", notable: "one of the sunniest cities on Earth", nearby: "Phoenix", region: "Southwestern Arizona", zip: "85364" },
  { name: "Flagstaff", slug: "flagstaff", county: "Coconino", tier: 2, pop: "75K", notable: "a mountain city home to Northern Arizona University", nearby: "Phoenix", region: "Northern Arizona", zip: "86001" },
  { name: "Goodyear", slug: "goodyear", county: "Maricopa", tier: 2, pop: "100K", notable: "a rapidly expanding West Valley city", nearby: "Phoenix", region: "West Valley", zip: "85338" },
  { name: "Avondale", slug: "avondale", county: "Maricopa", tier: 2, pop: "90K", notable: "home to Phoenix Raceway", nearby: "Phoenix", region: "West Valley", zip: "85323" },
  { name: "Buckeye", slug: "buckeye", county: "Maricopa", tier: 2, pop: "105K", notable: "the fastest-growing city in Arizona", nearby: "Phoenix", region: "West Valley", zip: "85326" },
  { name: "Casa Grande", slug: "casa-grande", county: "Pinal", tier: 2, pop: "60K", notable: "located between Phoenix and Tucson along I-10", nearby: "Phoenix", region: "Central Arizona", zip: "85122" },
  { name: "Lake Havasu City", slug: "lake-havasu-city", county: "Mohave", tier: 2, pop: "58K", notable: "home to the London Bridge and a popular recreation destination", nearby: "Phoenix", region: "Western Arizona", zip: "86403" },
  { name: "Maricopa", slug: "maricopa", county: "Pinal", tier: 2, pop: "60K", notable: "a booming bedroom community south of Phoenix", nearby: "Phoenix", region: "Central Arizona", zip: "85138" },
  { name: "Sierra Vista", slug: "sierra-vista", county: "Cochise", tier: 2, pop: "45K", notable: "a gateway to the Huachuca Mountains and Fort Huachuca", nearby: "Tucson", region: "Southeastern Arizona", zip: "85635" },
  { name: "Prescott", slug: "prescott", county: "Yavapai", tier: 2, pop: "46K", notable: "Arizona's original territorial capital", nearby: "Phoenix", region: "Central Highlands", zip: "86301" },
  { name: "Prescott Valley", slug: "prescott-valley", county: "Yavapai", tier: 2, pop: "48K", notable: "a growing community in the Prescott metro area", nearby: "Prescott", region: "Central Highlands", zip: "86314" },
  { name: "Bullhead City", slug: "bullhead-city", county: "Mohave", tier: 2, pop: "42K", notable: "located along the Colorado River across from Laughlin, NV", nearby: "Phoenix", region: "Western Arizona", zip: "86442" },
  { name: "Apache Junction", slug: "apache-junction", county: "Pinal", tier: 2, pop: "42K", notable: "the gateway to the Superstition Mountains", nearby: "Phoenix", region: "East Valley", zip: "85119" },
  { name: "Queen Creek", slug: "queen-creek", county: "Maricopa", tier: 2, pop: "65K", notable: "a fast-growing community known for its family-friendly atmosphere", nearby: "Phoenix", region: "East Valley", zip: "85142" },
  { name: "San Tan Valley", slug: "san-tan-valley", county: "Pinal", tier: 2, pop: "95K", notable: "one of the largest census-designated communities in Arizona", nearby: "Phoenix", region: "East Valley", zip: "85140" },
  { name: "Oro Valley", slug: "oro-valley", county: "Pima", tier: 2, pop: "47K", notable: "an affluent community nestled in the foothills north of Tucson", nearby: "Tucson", region: "Southern Arizona", zip: "85737" },
  { name: "Marana", slug: "marana", county: "Pima", tier: 2, pop: "55K", notable: "a rapidly growing town northwest of Tucson", nearby: "Tucson", region: "Southern Arizona", zip: "85653" },
  { name: "El Mirage", slug: "el-mirage", county: "Maricopa", tier: 2, pop: "36K", notable: "a diverse West Valley community", nearby: "Phoenix", region: "West Valley", zip: "85335" },
  { name: "Kingman", slug: "kingman", county: "Mohave", tier: 2, pop: "32K", notable: "a historic Route 66 city in northwestern Arizona", nearby: "Phoenix", region: "Northwestern Arizona", zip: "86401" },
  { name: "Florence", slug: "florence", county: "Pinal", tier: 2, pop: "28K", notable: "one of Arizona's oldest towns, rich in history", nearby: "Phoenix", region: "Central Arizona", zip: "85132" },

  // TIER 3 — Smaller cities/towns (5k–20k) with search volume
  { name: "Sahuarita", slug: "sahuarita", county: "Pima", tier: 3, pop: "35K", notable: "a growing community south of Tucson", nearby: "Tucson", region: "Southern Arizona", zip: "85629" },
  { name: "Fountain Hills", slug: "fountain-hills", county: "Maricopa", tier: 3, pop: "24K", notable: "home to one of the world's tallest fountains", nearby: "Scottsdale", region: "East Valley", zip: "85268" },
  { name: "Nogales", slug: "nogales", county: "Santa Cruz", tier: 3, pop: "20K", notable: "a border city with a unique binational culture", nearby: "Tucson", region: "Southern Arizona", zip: "85621" },
  { name: "Douglas", slug: "douglas", county: "Cochise", tier: 3, pop: "16K", notable: "a historic border town in southeastern Arizona", nearby: "Tucson", region: "Southeastern Arizona", zip: "85607" },
  { name: "Cottonwood", slug: "cottonwood", county: "Yavapai", tier: 3, pop: "13K", notable: "a gateway to Sedona and the Verde Valley wine region", nearby: "Prescott", region: "Verde Valley", zip: "86326" },
  { name: "Camp Verde", slug: "camp-verde", county: "Yavapai", tier: 3, pop: "12K", notable: "home to Montezuma Castle National Monument", nearby: "Prescott", region: "Verde Valley", zip: "86322" },
  { name: "Sedona", slug: "sedona", county: "Yavapai", tier: 3, pop: "10K", notable: "world-famous for its red rock formations and wellness culture", nearby: "Flagstaff", region: "Verde Valley", zip: "86336" },
  { name: "Payson", slug: "payson", county: "Gila", tier: 3, pop: "16K", notable: "the heart of Arizona's Rim Country", nearby: "Phoenix", region: "Rim Country", zip: "85541" },
  { name: "Globe", slug: "globe", county: "Gila", tier: 3, pop: "7K", notable: "a historic mining town in the Copper Corridor", nearby: "Phoenix", region: "Eastern Arizona", zip: "85501" },
  { name: "Show Low", slug: "show-low", county: "Navajo", tier: 3, pop: "12K", notable: "a mountain community in the White Mountains", nearby: "Phoenix", region: "White Mountains", zip: "85901" },
  { name: "Safford", slug: "safford", county: "Graham", tier: 3, pop: "10K", notable: "the commercial center of the Gila Valley", nearby: "Tucson", region: "Eastern Arizona", zip: "85546" },
  { name: "Winslow", slug: "winslow", county: "Navajo", tier: 3, pop: "9K", notable: "a historic Route 66 town immortalized in song", nearby: "Flagstaff", region: "Northern Arizona", zip: "86047" },
  { name: "Page", slug: "page", county: "Coconino", tier: 3, pop: "8K", notable: "the gateway to Lake Powell and Antelope Canyon", nearby: "Flagstaff", region: "Northern Arizona", zip: "86040" },
  { name: "Litchfield Park", slug: "litchfield-park", county: "Maricopa", tier: 3, pop: "7K", notable: "a charming planned community in the West Valley", nearby: "Phoenix", region: "West Valley", zip: "85340" },
  { name: "Paradise Valley", slug: "paradise-valley", county: "Maricopa", tier: 3, pop: "14K", notable: "one of the wealthiest communities in Arizona", nearby: "Scottsdale", region: "East Valley", zip: "85253" },
  { name: "Anthem", slug: "anthem", county: "Maricopa", tier: 3, pop: "25K", notable: "a master-planned community in north Phoenix", nearby: "Phoenix", region: "North Valley", zip: "85086" },
  { name: "Sun City", slug: "sun-city", county: "Maricopa", tier: 3, pop: "39K", notable: "America's first active adult retirement community", nearby: "Phoenix", region: "West Valley", zip: "85351" },
  { name: "Sun City West", slug: "sun-city-west", county: "Maricopa", tier: 3, pop: "26K", notable: "a vibrant retirement community in the West Valley", nearby: "Phoenix", region: "West Valley", zip: "85375" },
  { name: "Green Valley", slug: "green-valley", county: "Pima", tier: 3, pop: "22K", notable: "a popular retirement community south of Tucson", nearby: "Tucson", region: "Southern Arizona", zip: "85614" },
  { name: "Eloy", slug: "eloy", county: "Pinal", tier: 3, pop: "20K", notable: "known as the skydiving capital of the world", nearby: "Phoenix", region: "Central Arizona", zip: "85131" },
  { name: "Somerton", slug: "somerton", county: "Yuma", tier: 3, pop: "15K", notable: "a growing city in the Yuma metropolitan area", nearby: "Yuma", region: "Southwestern Arizona", zip: "85350" },
  { name: "Coolidge", slug: "coolidge", county: "Pinal", tier: 3, pop: "13K", notable: "near the ancient Casa Grande Ruins", nearby: "Phoenix", region: "Central Arizona", zip: "85128" },
  { name: "Wickenburg", slug: "wickenburg", county: "Maricopa", tier: 3, pop: "8K", notable: "Arizona's dude ranch capital with Old West heritage", nearby: "Phoenix", region: "West Valley", zip: "85390" },
  { name: "Chino Valley", slug: "chino-valley", county: "Yavapai", tier: 3, pop: "13K", notable: "a rural community in the Prescott metro area", nearby: "Prescott", region: "Central Highlands", zip: "86323" },
  { name: "Clarkdale", slug: "clarkdale", county: "Yavapai", tier: 3, pop: "4K", notable: "home to the Verde Canyon Railroad", nearby: "Prescott", region: "Verde Valley", zip: "86324" },
];

// ─────────────────────────────────────────────────────────
// CONTENT VARIATIONS — Unique per-city content blocks
// ─────────────────────────────────────────────────────────

function getNearbyCities(city) {
  return cities
    .filter(c => c.slug !== city.slug && c.region === city.region)
    .slice(0, 5);
}

function getCrossRegionCities(city) {
  return cities
    .filter(c => c.region !== city.region && c.tier <= 2)
    .slice(0, 4);
}

// City-specific intro paragraph variations
function getIntroParagraph(city) {
  const intros = {
    1: `If you live in ${city.name}, Arizona and suspect you may have ADHD — or you've already been diagnosed and need ongoing care — Arizona Telepsychiatry Clinic makes it easy to connect with a board-certified psychiatric provider from home. As ${city.notable}, ${city.name} residents deserve convenient access to expert mental health care without long wait times or lengthy commutes.`,
    2: `Adults in ${city.name}, AZ now have a faster path to professional ADHD evaluation and psychiatric care. Arizona Telepsychiatry Clinic serves ${city.name} (${city.county} County) with secure video appointments — so you can see a board-certified provider without leaving ${city.name}. As ${city.notable}, the community is growing, and so is the need for accessible mental health services.`,
    3: `Finding a psychiatrist in ${city.name}, Arizona doesn't have to mean driving to ${city.nearby || "a larger city"}. Arizona Telepsychiatry Clinic brings board-certified psychiatric care directly to ${city.name} residents through secure telehealth visits. Located in ${city.region}, ${city.name} is ${city.notable} — and now its residents can access expert ADHD and mental health care from the comfort of home.`,
  };
  return intros[city.tier];
}

// City-specific "why telehealth" paragraphs
function getWhyTelehealth(city) {
  if (city.tier === 1) {
    return `Even in a major metro like ${city.name}, wait times for in-person psychiatric appointments can stretch 4–8 weeks. With telehealth, ${city.name} residents can typically be seen within days — not months. No traffic on the ${city.name === "Phoenix" ? "I-10" : city.name === "Tucson" ? "I-19" : "freeway"}, no waiting rooms, and appointments that fit around your work schedule.`;
  }
  if (city.tier === 2) {
    return `${city.name} has a limited number of psychiatric providers, and in-person wait times can be frustrating. Telehealth eliminates the barrier of distance — whether you're in downtown ${city.name} or on the outskirts of ${city.county} County, you get the same expert care through a secure video visit.`;
  }
  return `For residents of ${city.name} and the surrounding ${city.region} area, accessing a psychiatrist often means driving to ${city.nearby || "Phoenix"}. Telehealth changes that. Arizona Telepsychiatry Clinic brings the same board-certified care to your screen — no road trips required.`;
}

// City-specific FAQ questions and answers
function getCityFAQs(city) {
  return [
    {
      q: `Can I get an online ADHD evaluation if I live in ${city.name}, AZ?`,
      a: `Yes. Arizona Telepsychiatry Clinic provides comprehensive online ADHD evaluations for adults living anywhere in ${city.name} and throughout ${city.county} County. All you need is a device with a camera and a stable internet connection. Our board-certified provider, Lindsay Hart, PMHNP-BC, conducts thorough evaluations via secure HIPAA-compliant video.`,
    },
    {
      q: `How much does an online psychiatrist visit cost in ${city.name}?`,
      a: `Our initial psychiatric evaluation is $179 for self-pay patients, with follow-up visits at $120. We also accept most major insurance plans in Arizona, which can bring your out-of-pocket cost to $0–$40 depending on your plan. The same transparent pricing applies whether you're in ${city.name} or anywhere else in Arizona.`,
    },
    {
      q: `Do you prescribe ADHD medication to patients in ${city.name}?`,
      a: `Yes, when clinically appropriate. After a thorough evaluation, our provider can prescribe both stimulant and non-stimulant ADHD medications. Prescriptions are sent electronically to a pharmacy of your choice in ${city.name} or anywhere in Arizona. We follow all Arizona prescribing guidelines and DEA regulations for telehealth.`,
    },
    {
      q: `How quickly can I see a psychiatrist online from ${city.name}?`,
      a: `Most new patients in ${city.name} are seen within the same week. Unlike traditional in-person clinics in the ${city.region} area — where wait times can be 4–8 weeks — our telehealth model allows us to offer much faster scheduling. Book online and choose a time that works for you.`,
    },
    {
      q: `Is telepsychiatry as effective as in-person visits for ${city.name} residents?`,
      a: `Research consistently shows that telepsychiatry is as effective as in-person care for ADHD evaluation and treatment. For ${city.name} residents, it offers the added benefits of no commute, the comfort of your own space, and easier scheduling — which often leads to better follow-through with treatment plans.`,
    },
    {
      q: `What conditions do you treat for patients in ${city.name}?`,
      a: `We specialize in ADHD (including ADHD in women), anxiety disorders, depression, insomnia, and PTSD. Our provider works with adults across ${city.name} and the broader ${city.region} area to create individualized treatment plans that may include medication management, therapy referrals, and lifestyle strategies.`,
    },
  ];
}

// Treatment process steps
function getProcessSteps(city) {
  return [
    {
      icon: "📋",
      title: "Book Your Evaluation",
      desc: `Schedule your first appointment online. Most ${city.name} residents are seen within the same week.`,
    },
    {
      icon: "💻",
      title: "Meet Your Provider",
      desc: `Connect with Lindsay Hart, PMHNP-BC via secure video from anywhere in ${city.name}. No downloads needed.`,
    },
    {
      icon: "🧠",
      title: "Get Your Assessment",
      desc: `Receive a thorough psychiatric evaluation using evidence-based screening tools and clinical interview.`,
    },
    {
      icon: "💊",
      title: "Start Treatment",
      desc: `Your provider creates a personalized plan. Prescriptions sent to your preferred ${city.name} pharmacy.`,
    },
  ];
}

// ─────────────────────────────────────────────────────────
// HTML TEMPLATE
// ─────────────────────────────────────────────────────────

function generatePage(city) {
  const nearby = getNearbyCities(city);
  const crossRegion = getCrossRegionCities(city);
  const faqs = getCityFAQs(city);
  const steps = getProcessSteps(city);
  const canonical = `https://arizonatelepsychiatryclinic.com/cities/${city.slug}.html`;
  const nearbyLinks = [...nearby, ...crossRegion].slice(0, 8);

  return `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
  <head>
    <meta charset="utf-8" />
    <title>Online Psychiatrist in ${city.name}, AZ | ADHD Telehealth | Arizona Telepsychiatry Clinic</title>
    <meta name="description" content="See a board-certified online psychiatrist in ${city.name}, Arizona. ADHD evaluations, medication management, and telepsychiatry for adults in ${city.name} and ${city.county} County. Most patients seen within days." />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="canonical" href="${canonical}" />

    <!-- Open Graph -->
    <meta property="og:title" content="Online Psychiatrist in ${city.name}, AZ — ADHD Telehealth" />
    <meta property="og:description" content="Board-certified psychiatric care for adults in ${city.name}, Arizona. ADHD evaluations, anxiety, depression treatment via secure telehealth." />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:site_name" content="Arizona Telepsychiatry Clinic" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="Online Psychiatrist in ${city.name}, AZ" />
    <meta name="twitter:description" content="ADHD evaluations and telepsychiatry for adults in ${city.name}. Board-certified care, seen within days." />

    <!-- Geo targeting -->
    <meta name="geo.region" content="US-AZ" />
    <meta name="geo.placename" content="${city.name}" />

    <!-- Tailwind CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = {
        theme: {
          extend: {
            colors: {
              primary: { 0: "#F6F7F2", 30: "#6BAF92", 40: "#3F7A5B" },
              neutral: { 10: "#F5F5F7", 50: "#6B7280", 60: "#111827" },
              accent: { warm: "#C6A673" },
            },
            fontFamily: {
              primary: ['"Red Hat Text"', 'system-ui', 'sans-serif'],
            },
          },
        },
      };
    </script>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Red+Hat+Text:wght@400;500;600;700&display=swap" rel="stylesheet" />

    <!-- Schema.org: LocalBusiness + MedicalBusiness -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": ["MedicalBusiness", "MedicalClinic"],
      "name": "Arizona Telepsychiatry Clinic — ${city.name}",
      "url": "${canonical}",
      "description": "Online psychiatrist and ADHD telehealth services for adults in ${city.name}, Arizona.",
      "telephone": "+1-480-000-0000",
      "areaServed": {
        "@type": "City",
        "name": "${city.name}",
        "containedInPlace": {
          "@type": "State",
          "name": "Arizona"
        }
      },
      "medicalSpecialty": "Psychiatry",
      "availableService": [
        {
          "@type": "MedicalProcedure",
          "name": "Online ADHD Evaluation",
          "description": "Comprehensive adult ADHD assessment via telehealth for ${city.name} residents"
        },
        {
          "@type": "MedicalProcedure",
          "name": "Psychiatric Medication Management",
          "description": "Ongoing medication management for ADHD, anxiety, depression, and insomnia"
        }
      ],
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "${city.name}",
        "addressRegion": "AZ",
        "postalCode": "${city.zip}",
        "addressCountry": "US"
      },
      "priceRange": "$$",
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "18:00"
      },
      "provider": {
        "@type": "Physician",
        "name": "Lindsay Hart, PMHNP-BC",
        "medicalSpecialty": "Psychiatry",
        "qualification": "Board-Certified Psychiatric Mental Health Nurse Practitioner"
      }
    }
    </script>

    <!-- Schema.org: FAQPage -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [${faqs.map(f => `
        {
          "@type": "Question",
          "name": ${JSON.stringify(f.q)},
          "acceptedAnswer": {
            "@type": "Answer",
            "text": ${JSON.stringify(f.a)}
          }
        }`).join(",")}
      ]
    }
    </script>

    <!-- Schema.org: BreadcrumbList -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://arizonatelepsychiatryclinic.com/" },
        { "@type": "ListItem", "position": 2, "name": "Locations", "item": "https://arizonatelepsychiatryclinic.com/cities/" },
        { "@type": "ListItem", "position": 3, "name": "${city.name}, AZ", "item": "${canonical}" }
      ]
    }
    </script>

    <!-- Schema.org: Service -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Telepsychiatry",
      "provider": {
        "@type": "MedicalClinic",
        "name": "Arizona Telepsychiatry Clinic"
      },
      "areaServed": {
        "@type": "City",
        "name": "${city.name}",
        "containedInPlace": { "@type": "State", "name": "Arizona" }
      },
      "description": "Online ADHD evaluation and psychiatric treatment for adults in ${city.name}, AZ",
      "offers": [
        { "@type": "Offer", "name": "Initial Evaluation", "price": "179", "priceCurrency": "USD" },
        { "@type": "Offer", "name": "Follow-Up Visit", "price": "120", "priceCurrency": "USD" }
      ]
    }
    </script>

    <!-- Schema.org: MedicalWebPage + Speakable (AEO) -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "MedicalWebPage",
      "name": "Online Psychiatrist in ${city.name}, AZ — ADHD Telehealth",
      "url": "${canonical}",
      "lastReviewed": "2026-04-01",
      "dateModified": "2026-04-01",
      "reviewedBy": {
        "@type": "Physician",
        "name": "Lindsay Hart, PMHNP-BC",
        "medicalSpecialty": "Psychiatric"
      },
      "specialty": "https://schema.org/Psychiatric",
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": [".speakable-summary", ".speakable-process", ".speakable-pricing"]
      }
    }
    </script>

    <style>
      .faq-panel { max-height: 0; opacity: 0; overflow: hidden; transition: max-height 0.35s ease, opacity 0.25s ease; }
      .faq-panel.open { opacity: 1; }
      .faq-icon-svg { transition: transform 0.3s ease; }
      .faq-icon-svg.rotated { transform: rotate(45deg); }
      .hero-gradient { background: linear-gradient(135deg, #F6F7F2 0%, #e8ede5 50%, #F6F7F2 100%); }
      .card-hover { transition: all 0.2s ease; }
      .card-hover:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(0,0,0,0.08); }
      .nearby-link { transition: all 0.15s ease; }
      .nearby-link:hover { background-color: #6BAF92; color: #fff; }
    </style>
  </head>

  <body class="font-primary text-neutral-60 bg-white">
    <!-- NAV -->
    <header class="w-full border-b bg-white sticky top-0 z-40">
      <div class="max-w-6xl mx-auto flex items-center justify-between h-16 px-4 lg:h-20">
        <a href="../index.html" class="flex items-center space-x-2">
          <span class="font-semibold text-lg text-neutral-900">Arizona Telepsychiatry Clinic</span>
        </a>
        <nav class="hidden md:flex items-center space-x-6 text-sm">
          <a href="../index.html#treatment" class="hover:text-primary-30">What We Treat</a>
          <a href="../index.html#pricing" class="hover:text-primary-30">Pricing</a>
          <a href="../blog.html" class="hover:text-primary-30">Learning Center</a>
          <a href="index.html" class="text-primary-30 font-medium">Locations</a>
          <a href="../index.html#faq" class="hover:text-primary-30">FAQs</a>
        </nav>
        <div class="hidden md:flex items-center space-x-2">
          <a href="../book.html" class="rounded-md font-medium text-white bg-primary-30 hover:bg-primary-40 shadow-sm px-5 py-2.5 text-sm">Book Now</a>
        </div>
        <button class="md:hidden p-2 rounded-md text-neutral-600 hover:bg-neutral-10" aria-label="Open menu" onclick="document.getElementById('mobile-menu').classList.toggle('hidden')">
          <svg width="24" height="24"><path stroke="currentColor" stroke-width="2.5" d="M4 6H20M4 12H20M4 18H20" stroke-linecap="round"></path></svg>
        </button>
      </div>
      <div id="mobile-menu" class="md:hidden hidden border-t bg-white">
        <nav class="flex flex-col px-4 py-3 space-y-2 text-sm">
          <a href="../index.html#treatment" class="py-1 hover:text-primary-30">What We Treat</a>
          <a href="../index.html#pricing" class="py-1 hover:text-primary-30">Pricing</a>
          <a href="../blog.html" class="py-1 hover:text-primary-30">Learning Center</a>
          <a href="index.html" class="py-1 text-primary-30 font-medium">Locations</a>
          <a href="../index.html#faq" class="py-1 hover:text-primary-30">FAQs</a>
          <div class="pt-3"><a href="../book.html" class="block text-center rounded-md py-2.5 font-medium text-white bg-primary-30 hover:bg-primary-40">Book Now</a></div>
        </nav>
      </div>
    </header>

    <main>
      <!-- BREADCRUMBS -->
      <nav class="max-w-6xl mx-auto px-4 pt-4" aria-label="Breadcrumb">
        <ol class="flex items-center space-x-2 text-xs text-neutral-50">
          <li><a href="../index.html" class="hover:text-primary-30">Home</a></li>
          <li><span class="mx-1">/</span></li>
          <li><a href="index.html" class="hover:text-primary-30">Locations</a></li>
          <li><span class="mx-1">/</span></li>
          <li class="text-neutral-60 font-medium">${city.name}, AZ</li>
        </ol>
      </nav>

      <!-- HERO -->
      <section class="hero-gradient">
        <div class="max-w-6xl mx-auto px-4 pt-12 pb-16 lg:pt-20 lg:pb-24">
          <div class="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
            <div class="flex-1 space-y-5">
              <div class="inline-flex items-center gap-2 rounded-full bg-primary-30/10 px-4 py-1.5">
                <span class="w-2 h-2 rounded-full bg-primary-30 animate-pulse"></span>
                <span class="text-xs font-medium text-primary-40">Now accepting patients in ${city.name}</span>
              </div>
              <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-neutral-60">
                Online Psychiatrist in<br /><span class="text-primary-30">${city.name}, Arizona</span>
              </h1>
              <p class="text-lg text-neutral-50 max-w-xl leading-relaxed">
                ${getIntroParagraph(city)}
              </p>
              <div class="flex flex-wrap gap-3 pt-2">
                <a href="../book.html" class="rounded-lg text-sm font-semibold text-white bg-primary-30 hover:bg-primary-40 shadow-lg shadow-primary-30/20 px-7 py-3.5 transition-all">Book Your Evaluation</a>
                <a href="#how-it-works" class="rounded-lg text-sm font-semibold text-primary-40 border-2 border-primary-30/30 hover:bg-primary-30/5 px-7 py-3.5 transition-all">See How It Works</a>
              </div>
              <div class="flex flex-wrap gap-x-6 gap-y-2 pt-2 text-sm text-neutral-50">
                <span class="flex items-center gap-1.5">
                  <svg class="w-4 h-4 text-primary-30" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                  Board-certified provider
                </span>
                <span class="flex items-center gap-1.5">
                  <svg class="w-4 h-4 text-primary-30" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                  Seen within days
                </span>
                <span class="flex items-center gap-1.5">
                  <svg class="w-4 h-4 text-primary-30" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                  HIPAA-compliant video
                </span>
              </div>
            </div>
            <!-- Hero card -->
            <div class="flex-1 w-full lg:max-w-md">
              <div class="bg-white rounded-2xl shadow-xl border p-6 space-y-5">
                <div class="flex items-center gap-4">
                  <div class="w-16 h-16 rounded-full bg-primary-30/10 flex items-center justify-center">
                    <svg class="w-8 h-8 text-primary-30" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
                  </div>
                  <div>
                    <p class="font-semibold text-neutral-60">Lindsay Hart, PMHNP-BC</p>
                    <p class="text-sm text-primary-30">Psychiatric Nurse Practitioner</p>
                  </div>
                </div>
                <div class="space-y-3">
                  <div class="flex items-center gap-3 text-sm">
                    <div class="w-8 h-8 rounded-lg bg-primary-0 flex items-center justify-center"><svg class="w-4 h-4 text-primary-30" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.828a1 1 0 101.415-1.414L11 9.586V6z" clip-rule="evenodd"/></svg></div>
                    <span class="text-neutral-50">Appointments available this week</span>
                  </div>
                  <div class="flex items-center gap-3 text-sm">
                    <div class="w-8 h-8 rounded-lg bg-primary-0 flex items-center justify-center"><svg class="w-4 h-4 text-primary-30" fill="currentColor" viewBox="0 0 20 20"><path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm12.553 1.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"/></svg></div>
                    <span class="text-neutral-50">Secure HIPAA-compliant video visits</span>
                  </div>
                  <div class="flex items-center gap-3 text-sm">
                    <div class="w-8 h-8 rounded-lg bg-primary-0 flex items-center justify-center"><svg class="w-4 h-4 text-primary-30" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/></svg></div>
                    <span class="text-neutral-50">Self-pay $179 · Insurance accepted</span>
                  </div>
                </div>
                <a href="../book.html" class="block w-full text-center rounded-lg font-semibold text-white bg-primary-30 hover:bg-primary-40 shadow-lg shadow-primary-30/20 py-3.5 transition-all">
                  Book Appointment in ${city.name}
                </a>
                <p class="text-xs text-center text-neutral-50">Serving all of ${city.county} County via telehealth</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- DIRECT ANSWER — AEO optimized -->
      <section class="bg-white border-y">
        <div class="max-w-4xl mx-auto px-4 py-12 md:py-16">
          <!-- Speakable summary for voice search / AI engines -->
          <div class="speakable-summary">
            <h2 class="text-2xl md:text-3xl font-bold text-neutral-60 text-center">
              ADHD Telehealth for Adults in ${city.name}
            </h2>
            <p class="mt-6 text-base text-neutral-50 leading-relaxed max-w-3xl mx-auto text-center">
              Arizona Telepsychiatry Clinic provides online ADHD evaluations and psychiatric care for adults in ${city.name}, Arizona. See a board-certified provider within days via secure HIPAA-compliant video. Initial evaluations cost $179 self-pay, and most insurance is accepted.
            </p>
          </div>
          <p class="mt-4 text-base text-neutral-50 leading-relaxed max-w-3xl mx-auto text-center">
            ${getWhyTelehealth(city)}
          </p>
          <div class="mt-10 grid sm:grid-cols-3 gap-6">
            <div class="text-center p-6 rounded-xl bg-primary-0">
              <p class="text-3xl font-bold text-primary-30">$179</p>
              <p class="text-sm text-neutral-50 mt-1">Initial evaluation</p>
            </div>
            <div class="text-center p-6 rounded-xl bg-primary-0">
              <p class="text-3xl font-bold text-primary-30">&lt; 7 days</p>
              <p class="text-sm text-neutral-50 mt-1">Typical wait time</p>
            </div>
            <div class="text-center p-6 rounded-xl bg-primary-0">
              <p class="text-3xl font-bold text-primary-30">100%</p>
              <p class="text-sm text-neutral-50 mt-1">Online — no commute</p>
            </div>
          </div>
        </div>
      </section>

      <!-- WHAT WE TREAT -->
      <section class="bg-primary-0">
        <div class="max-w-6xl mx-auto px-4 py-16 md:py-20">
          <div class="text-center mb-12">
            <h2 class="text-2xl md:text-3xl font-bold text-neutral-60">What We Treat in ${city.name}</h2>
            <p class="mt-3 text-neutral-50 max-w-2xl mx-auto">Comprehensive psychiatric care for adults — all from the comfort of your home in ${city.name}.</p>
          </div>
          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            ${[
              { title: "ADHD (Adult)", desc: `Comprehensive evaluation and treatment for adult ADHD. The most common reason ${city.name} residents contact us.`, icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />` },
              { title: "ADHD in Women", desc: `ADHD presents differently in women and is often missed. We specialize in identifying and treating ADHD in women and AFAB adults.`, icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.502-4.688-4.502-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.748 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />` },
              { title: "Anxiety", desc: `Generalized anxiety, social anxiety, and panic disorder treatment for ${city.name} adults through evidence-based approaches.`, icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />` },
              { title: "Depression", desc: `Medication management and comprehensive treatment for major depression and persistent depressive disorder.`, icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />` },
              { title: "Insomnia", desc: `Sleep disorders are often connected to ADHD and anxiety. We address the root cause, not just the symptoms.`, icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />` },
              { title: "PTSD", desc: `Post-traumatic stress disorder assessment and medication management, with referrals for trauma-focused therapy when appropriate.`, icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />` },
            ].map(item => `
            <div class="bg-white rounded-xl border p-6 card-hover">
              <div class="w-10 h-10 rounded-lg bg-primary-30/10 flex items-center justify-center mb-4">
                <svg class="w-5 h-5 text-primary-30" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">${item.icon}</svg>
              </div>
              <h3 class="font-semibold text-neutral-60">${item.title}</h3>
              <p class="mt-2 text-sm text-neutral-50 leading-relaxed">${item.desc}</p>
            </div>`).join("")}
          </div>
        </div>
      </section>

      <!-- HOW IT WORKS -->
      <section id="how-it-works" class="bg-white">
        <div class="max-w-4xl mx-auto px-4 py-16 md:py-20">
          <div class="text-center mb-12 speakable-process">
            <h2 class="text-2xl md:text-3xl font-bold text-neutral-60">How Online Psychiatry Works in ${city.name}</h2>
            <p class="mt-3 text-neutral-50">Four simple steps to expert care — no office visit needed.</p>
          </div>
          <div class="grid sm:grid-cols-2 gap-6">
            ${steps.map((step, i) => `
            <div class="relative bg-primary-0 rounded-xl p-6 card-hover">
              <div class="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary-30 text-white text-sm font-bold flex items-center justify-center shadow">${i + 1}</div>
              <p class="text-2xl mb-2">${step.icon}</p>
              <h3 class="font-semibold text-neutral-60">${step.title}</h3>
              <p class="mt-2 text-sm text-neutral-50 leading-relaxed">${step.desc}</p>
            </div>`).join("")}
          </div>
          <div class="mt-10 text-center">
            <a href="../book.html" class="inline-block rounded-lg text-sm font-semibold text-white bg-primary-30 hover:bg-primary-40 shadow-lg shadow-primary-30/20 px-8 py-3.5 transition-all">
              Get Started — Book in ${city.name}
            </a>
          </div>
        </div>
      </section>

      <!-- PROVIDER -->
      <section class="bg-primary-0 border-y">
        <div class="max-w-4xl mx-auto px-4 py-16 md:py-20">
          <div class="bg-white rounded-2xl shadow-sm border overflow-hidden">
            <div class="p-8 md:p-10">
              <p class="text-xs font-semibold uppercase tracking-wider text-primary-30 mb-4">Your Provider in ${city.name}</p>
              <div class="flex flex-col sm:flex-row gap-6 items-start">
                <div class="w-24 h-24 rounded-full bg-primary-30/10 flex items-center justify-center flex-shrink-0">
                  <svg class="w-12 h-12 text-primary-30" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
                </div>
                <div>
                  <h2 class="text-xl font-bold text-neutral-60">Lindsay Hart, PMHNP-BC</h2>
                  <p class="text-primary-30 font-medium">Board-Certified Psychiatric Nurse Practitioner</p>
                  <p class="mt-3 text-sm text-neutral-50 leading-relaxed">
                    Lindsay specializes in adult ADHD, anxiety, depression, and insomnia. She takes a collaborative approach — working with you to create a realistic plan that may include medication, therapy referrals, or lifestyle strategies. She serves patients throughout ${city.name} and all of Arizona via secure telehealth.
                  </p>
                  <div class="mt-4 flex flex-wrap gap-2">
                    <span class="inline-flex items-center rounded-full bg-primary-0 px-3 py-1 text-xs font-medium text-primary-40">ADHD Specialist</span>
                    <span class="inline-flex items-center rounded-full bg-primary-0 px-3 py-1 text-xs font-medium text-primary-40">Board Certified</span>
                    <span class="inline-flex items-center rounded-full bg-primary-0 px-3 py-1 text-xs font-medium text-primary-40">2000+ Patients</span>
                    <span class="inline-flex items-center rounded-full bg-primary-0 px-3 py-1 text-xs font-medium text-primary-40">Arizona Licensed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- PRICING -->
      <section class="bg-white">
        <div class="max-w-4xl mx-auto px-4 py-16 md:py-20">
          <div class="text-center mb-10 speakable-pricing">
            <h2 class="text-2xl md:text-3xl font-bold text-neutral-60">Transparent Pricing for ${city.name} Patients</h2>
            <p class="mt-3 text-neutral-50">No hidden fees. Insurance accepted.</p>
          </div>
          <div class="grid md:grid-cols-2 gap-6">
            <div class="rounded-2xl border-2 border-primary-30 bg-white p-8 relative">
              <div class="absolute -top-3 left-6 bg-primary-30 text-white text-xs font-semibold px-3 py-1 rounded-full">Most Popular</div>
              <h3 class="text-lg font-bold text-neutral-60">Self-Pay</h3>
              <div class="mt-4">
                <p class="text-4xl font-bold text-neutral-60">$179</p>
                <p class="text-sm text-neutral-50 mt-1">Initial evaluation</p>
              </div>
              <ul class="mt-6 space-y-3 text-sm text-neutral-50">
                <li class="flex items-start gap-2"><svg class="w-5 h-5 text-primary-30 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>Follow-ups at $120</li>
                <li class="flex items-start gap-2"><svg class="w-5 h-5 text-primary-30 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>No insurance needed</li>
                <li class="flex items-start gap-2"><svg class="w-5 h-5 text-primary-30 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>Superbill provided for reimbursement</li>
                <li class="flex items-start gap-2"><svg class="w-5 h-5 text-primary-30 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>Transparent pricing, no surprises</li>
              </ul>
              <a href="../book.html" class="mt-6 block w-full text-center rounded-lg font-semibold text-white bg-primary-30 hover:bg-primary-40 py-3 transition-all">Book Self-Pay</a>
            </div>
            <div class="rounded-2xl border bg-white p-8">
              <h3 class="text-lg font-bold text-neutral-60">Insurance</h3>
              <div class="mt-4">
                <p class="text-4xl font-bold text-neutral-60">$0–$40</p>
                <p class="text-sm text-neutral-50 mt-1">Typical copay</p>
              </div>
              <ul class="mt-6 space-y-3 text-sm text-neutral-50">
                <li class="flex items-start gap-2"><svg class="w-5 h-5 text-primary-30 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>Most major plans accepted</li>
                <li class="flex items-start gap-2"><svg class="w-5 h-5 text-primary-30 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>We verify benefits for you</li>
                <li class="flex items-start gap-2"><svg class="w-5 h-5 text-primary-30 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>AHCCCS / Medicaid accepted</li>
                <li class="flex items-start gap-2"><svg class="w-5 h-5 text-primary-30 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>Same quality care as self-pay</li>
              </ul>
              <a href="../book.html" class="mt-6 block w-full text-center rounded-lg font-semibold text-primary-40 border-2 border-primary-30/30 hover:bg-primary-30/5 py-3 transition-all">Check Insurance</a>
            </div>
          </div>
        </div>
      </section>

      <!-- FAQ — AEO optimized with direct answers -->
      <section id="faq" class="bg-primary-0">
        <div class="max-w-3xl mx-auto px-4 py-16 md:py-20">
          <div class="text-center mb-12">
            <h2 class="text-2xl md:text-3xl font-bold text-neutral-60">
              Frequently Asked Questions — ${city.name}
            </h2>
            <p class="mt-3 text-neutral-50">Common questions from ${city.name} residents about online psychiatry.</p>
          </div>
          <div class="space-y-0">
            ${faqs.map(faq => `
            <div class="faq-item" style="border-bottom: 1px solid #E4DCD8;">
              <button class="faq-toggle w-full flex items-center justify-between py-5 md:py-6 text-left" type="button" aria-expanded="false">
                <span class="text-base md:text-lg font-semibold pr-4 text-neutral-60">${faq.q}</span>
                <span class="faq-icon flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center" style="border: 2px solid #C6A673; color: #C6A673;">
                  <svg class="faq-icon-svg w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" stroke-linecap="round"/></svg>
                </span>
              </button>
              <div class="faq-panel">
                <div class="pb-5 md:pb-6 pr-12">
                  <p class="text-sm md:text-base leading-relaxed text-neutral-50">${faq.a}</p>
                </div>
              </div>
            </div>`).join("")}
          </div>
        </div>
      </section>

      <!-- CTA BANNER -->
      <section class="bg-primary-40">
        <div class="max-w-4xl mx-auto px-4 py-14 md:py-20 text-center">
          <h2 class="text-2xl md:text-3xl font-bold text-white">Ready to Get Started in ${city.name}?</h2>
          <p class="mt-3 text-white/80 max-w-xl mx-auto">
            Join 2,000+ Arizona adults who've taken the first step toward expert psychiatric care — from the comfort of home.
          </p>
          <div class="mt-8 flex flex-wrap gap-4 justify-center">
            <a href="../book.html" class="rounded-lg text-sm font-semibold text-primary-40 bg-white hover:bg-neutral-10 shadow-lg px-8 py-3.5 transition-all">Book Your Evaluation</a>
            <a href="tel:+14800000000" class="rounded-lg text-sm font-semibold text-white border-2 border-white/30 hover:bg-white/10 px-8 py-3.5 transition-all">Call Us</a>
          </div>
        </div>
      </section>

      <!-- NEARBY LOCATIONS — Internal linking for SEO -->
      <section class="bg-white">
        <div class="max-w-6xl mx-auto px-4 py-16 md:py-20">
          <h2 class="text-2xl font-bold text-neutral-60 text-center">
            We Also Serve These Arizona Cities
          </h2>
          <p class="mt-3 text-neutral-50 text-center max-w-2xl mx-auto">
            Arizona Telepsychiatry Clinic provides online psychiatry and ADHD telehealth across all of Arizona. Find your city below.
          </p>
          <div class="mt-8 flex flex-wrap justify-center gap-3">
            ${nearbyLinks.map(c => `<a href="${c.slug}.html" class="nearby-link rounded-full border border-primary-30/30 px-4 py-2 text-sm text-primary-40 font-medium">${c.name}, AZ</a>`).join("\n            ")}
            <a href="index.html" class="nearby-link rounded-full border border-neutral-50/30 px-4 py-2 text-sm text-neutral-50 font-medium">View All Locations →</a>
          </div>
        </div>
      </section>

      <!-- MEDICAL DISCLAIMER — E-E-A-T compliance -->
      <div class="max-w-4xl mx-auto px-4 py-6 border-t">
        <p class="text-xs text-neutral-50 leading-relaxed">
          <strong>Medical disclaimer:</strong> This page is for informational purposes only and does not constitute medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider for personal medical decisions. If you are experiencing a mental health emergency, call 988 (Suicide &amp; Crisis Lifeline) or go to your nearest emergency room.
        </p>
        <p class="text-xs text-neutral-50 mt-2">
          Last medically reviewed by Lindsay Hart, PMHNP-BC on April 1, 2026.
        </p>
      </div>

      <!-- FOOTER -->
      <footer class="bg-primary-40 text-white">
        <div class="max-w-6xl mx-auto px-4 py-12">
          <div class="flex flex-wrap items-start justify-between gap-10">
            <div class="max-w-md">
              <p class="font-semibold">Arizona Telepsychiatry Clinic</p>
              <p class="text-white/70 mt-3 text-sm">
                Virtual-first ADHD care for adults in ${city.name} and across Arizona. Board-certified provider, flexible scheduling, and ongoing support between appointments.
              </p>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-10 text-sm">
              <div>
                <p class="font-semibold">Company</p>
                <ul class="mt-3 space-y-2 text-white/70">
                  <li><a href="../index.html#provider" class="hover:text-white">About</a></li>
                  <li><a href="../index.html#provider" class="hover:text-white">Providers</a></li>
                  <li><a href="index.html" class="hover:text-white">Locations</a></li>
                </ul>
              </div>
              <div>
                <p class="font-semibold">Resources</p>
                <ul class="mt-3 space-y-2 text-white/70">
                  <li><a href="../index.html#faq" class="hover:text-white">FAQ</a></li>
                  <li><a href="../index.html#pricing" class="hover:text-white">Pricing</a></li>
                  <li><a href="../blog.html" class="hover:text-white">Learning Center</a></li>
                </ul>
              </div>
              <div>
                <p class="font-semibold">Legal</p>
                <ul class="mt-3 space-y-2 text-white/70">
                  <li><a href="../privacy-policy.html" class="hover:text-white">Privacy Policy</a></li>
                  <li><a href="../terms-of-service.html" class="hover:text-white">Terms of Service</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="border-t border-white/10 mt-10 pt-6 text-xs text-white/60">
            &copy; 2026 Arizona Telepsychiatry Clinic. Serving ${city.name}, AZ and all of Arizona.
          </div>
        </div>
      </footer>
    </main>

    <!-- FAQ accordion script -->
    <script>
      document.querySelectorAll(".faq-toggle").forEach(function (btn) {
        btn.addEventListener("click", function () {
          var panel = this.nextElementSibling;
          var svg = this.querySelector(".faq-icon-svg");
          var isOpen = panel.classList.contains("open");
          // close all
          document.querySelectorAll(".faq-panel").forEach(function (p) {
            p.style.maxHeight = "0";
            p.classList.remove("open");
          });
          document.querySelectorAll(".faq-icon-svg").forEach(function (s) {
            s.classList.remove("rotated");
          });
          document.querySelectorAll(".faq-toggle").forEach(function (b) {
            b.setAttribute("aria-expanded", "false");
          });
          if (!isOpen) {
            panel.style.maxHeight = panel.scrollHeight + "px";
            panel.classList.add("open");
            svg.classList.add("rotated");
            this.setAttribute("aria-expanded", "true");
          }
        });
      });
    </script>
  </body>
</html>`;
}

// ─────────────────────────────────────────────────────────
// LOCATIONS HUB PAGE
// ─────────────────────────────────────────────────────────

function generateIndexPage() {
  const tier1 = cities.filter(c => c.tier === 1);
  const tier2 = cities.filter(c => c.tier === 2);
  const tier3 = cities.filter(c => c.tier === 3);

  return `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
  <head>
    <meta charset="utf-8" />
    <title>Online Psychiatrist in Arizona — All Locations | Arizona Telepsychiatry Clinic</title>
    <meta name="description" content="Find an online psychiatrist near you in Arizona. Arizona Telepsychiatry Clinic serves 55+ cities with ADHD evaluations, anxiety, depression, and psychiatric care via telehealth." />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="canonical" href="https://arizonatelepsychiatryclinic.com/cities/" />
    <meta property="og:title" content="Online Psychiatrist — All Arizona Locations" />
    <meta property="og:description" content="ADHD telehealth and online psychiatry for adults in 55+ Arizona cities." />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://arizonatelepsychiatryclinic.com/cities/" />
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = {
        theme: {
          extend: {
            colors: {
              primary: { 0: "#F6F7F2", 30: "#6BAF92", 40: "#3F7A5B" },
              neutral: { 10: "#F5F5F7", 50: "#6B7280", 60: "#111827" },
            },
            fontFamily: { primary: ['"Red Hat Text"', 'system-ui', 'sans-serif'] },
          },
        },
      };
    </script>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Red+Hat+Text:wght@400;500;600;700&display=swap" rel="stylesheet" />
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Arizona Telepsychiatry Clinic Locations",
      "description": "All cities served by Arizona Telepsychiatry Clinic",
      "numberOfItems": ${cities.length},
      "itemListElement": [${cities.map((c, i) => `
        { "@type": "ListItem", "position": ${i + 1}, "url": "https://arizonatelepsychiatryclinic.com/cities/${c.slug}.html", "name": "Online Psychiatrist in ${c.name}, AZ" }`).join(",")}
      ]
    }
    </script>
    <style>
      .city-card { transition: all 0.2s ease; }
      .city-card:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(0,0,0,0.08); border-color: #6BAF92; }
    </style>
  </head>
  <body class="font-primary text-neutral-60 bg-white">
    <header class="w-full border-b bg-white sticky top-0 z-40">
      <div class="max-w-6xl mx-auto flex items-center justify-between h-16 px-4 lg:h-20">
        <a href="../index.html" class="flex items-center space-x-2">
          <span class="font-semibold text-lg text-neutral-900">Arizona Telepsychiatry Clinic</span>
        </a>
        <nav class="hidden md:flex items-center space-x-6 text-sm">
          <a href="../index.html#treatment" class="hover:text-primary-30">What We Treat</a>
          <a href="../index.html#pricing" class="hover:text-primary-30">Pricing</a>
          <a href="../blog.html" class="hover:text-primary-30">Learning Center</a>
          <span class="text-primary-30 font-medium">Locations</span>
          <a href="../index.html#faq" class="hover:text-primary-30">FAQs</a>
        </nav>
        <div class="hidden md:flex items-center"><a href="../book.html" class="rounded-md font-medium text-white bg-primary-30 hover:bg-primary-40 shadow-sm px-5 py-2.5 text-sm">Book Now</a></div>
        <button class="md:hidden p-2 rounded-md text-neutral-600 hover:bg-neutral-10" aria-label="Menu" onclick="document.getElementById('mobile-menu').classList.toggle('hidden')">
          <svg width="24" height="24"><path stroke="currentColor" stroke-width="2.5" d="M4 6H20M4 12H20M4 18H20" stroke-linecap="round"></path></svg>
        </button>
      </div>
      <div id="mobile-menu" class="md:hidden hidden border-t bg-white">
        <nav class="flex flex-col px-4 py-3 space-y-2 text-sm">
          <a href="../index.html#treatment" class="py-1 hover:text-primary-30">What We Treat</a>
          <a href="../index.html#pricing" class="py-1 hover:text-primary-30">Pricing</a>
          <a href="../blog.html" class="py-1 hover:text-primary-30">Learning Center</a>
          <span class="py-1 text-primary-30 font-medium">Locations</span>
          <div class="pt-3"><a href="../book.html" class="block text-center rounded-md py-2.5 font-medium text-white bg-primary-30 hover:bg-primary-40">Book Now</a></div>
        </nav>
      </div>
    </header>

    <main>
      <section class="bg-primary-0">
        <div class="max-w-6xl mx-auto px-4 py-16 md:py-24 text-center">
          <h1 class="text-3xl md:text-5xl font-bold text-neutral-60">Online Psychiatrist — All Arizona Locations</h1>
          <p class="mt-4 text-lg text-neutral-50 max-w-3xl mx-auto">Arizona Telepsychiatry Clinic serves adults in ${cities.length}+ cities across Arizona with board-certified telepsychiatry. Find your city below.</p>
        </div>
      </section>

      <section class="max-w-6xl mx-auto px-4 py-12">
        <h2 class="text-xl font-bold text-neutral-60 mb-6">Major Metro Areas</h2>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-16">
          ${tier1.map(c => `
          <a href="${c.slug}.html" class="city-card block rounded-xl border bg-white p-5">
            <p class="font-semibold text-neutral-60">${c.name}</p>
            <p class="text-xs text-neutral-50 mt-1">${c.county} County · Pop. ${c.pop}</p>
            <p class="text-xs text-primary-30 mt-2 font-medium">Online psychiatrist →</p>
          </a>`).join("")}
        </div>

        <h2 class="text-xl font-bold text-neutral-60 mb-6">Mid-Size Cities</h2>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-16">
          ${tier2.map(c => `
          <a href="${c.slug}.html" class="city-card block rounded-xl border bg-white p-5">
            <p class="font-semibold text-neutral-60">${c.name}</p>
            <p class="text-xs text-neutral-50 mt-1">${c.county} County · Pop. ${c.pop}</p>
            <p class="text-xs text-primary-30 mt-2 font-medium">Online psychiatrist →</p>
          </a>`).join("")}
        </div>

        <h2 class="text-xl font-bold text-neutral-60 mb-6">More Arizona Communities</h2>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-16">
          ${tier3.map(c => `
          <a href="${c.slug}.html" class="city-card block rounded-xl border bg-white p-5">
            <p class="font-semibold text-neutral-60">${c.name}</p>
            <p class="text-xs text-neutral-50 mt-1">${c.county} County · Pop. ${c.pop}</p>
            <p class="text-xs text-primary-30 mt-2 font-medium">Online psychiatrist →</p>
          </a>`).join("")}
        </div>
      </section>

      <section class="bg-primary-40">
        <div class="max-w-4xl mx-auto px-4 py-14 text-center">
          <h2 class="text-2xl md:text-3xl font-bold text-white">Don't See Your City?</h2>
          <p class="mt-3 text-white/80 max-w-xl mx-auto">We serve all of Arizona via telehealth. If you're anywhere in the state, we can see you.</p>
          <a href="../book.html" class="mt-8 inline-block rounded-lg text-sm font-semibold text-primary-40 bg-white hover:bg-neutral-10 shadow-lg px-8 py-3.5 transition-all">Book Your Evaluation</a>
        </div>
      </section>

      <footer class="bg-primary-40 text-white border-t border-white/10">
        <div class="max-w-6xl mx-auto px-4 py-12">
          <div class="flex flex-wrap items-start justify-between gap-10">
            <div class="max-w-md">
              <p class="font-semibold">Arizona Telepsychiatry Clinic</p>
              <p class="text-white/70 mt-3 text-sm">Virtual-first ADHD care with flexible scheduling, video visits, and ongoing support. Serving adults across all of Arizona.</p>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-10 text-sm">
              <div>
                <p class="font-semibold">Company</p>
                <ul class="mt-3 space-y-2 text-white/70">
                  <li><a href="../index.html#provider" class="hover:text-white">About</a></li>
                  <li><a href="../index.html#provider" class="hover:text-white">Providers</a></li>
                  <li><span class="text-white">Locations</span></li>
                </ul>
              </div>
              <div>
                <p class="font-semibold">Resources</p>
                <ul class="mt-3 space-y-2 text-white/70">
                  <li><a href="../index.html#faq" class="hover:text-white">FAQ</a></li>
                  <li><a href="../index.html#pricing" class="hover:text-white">Pricing</a></li>
                  <li><a href="../blog.html" class="hover:text-white">Learning Center</a></li>
                </ul>
              </div>
              <div>
                <p class="font-semibold">Legal</p>
                <ul class="mt-3 space-y-2 text-white/70">
                  <li><a href="../privacy-policy.html" class="hover:text-white">Privacy</a></li>
                  <li><a href="../terms-of-service.html" class="hover:text-white">Terms</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="border-t border-white/10 mt-10 pt-6 text-xs text-white/60">&copy; 2026 Arizona Telepsychiatry Clinic.</div>
        </div>
      </footer>
    </main>
  </body>
</html>`;
}

// ─────────────────────────────────────────────────────────
// SITEMAP GENERATOR
// ─────────────────────────────────────────────────────────

function generateSitemap() {
  const base = "https://arizonatelepsychiatryclinic.com";
  const today = new Date().toISOString().split("T")[0];

  const staticPages = [
    { url: "/", priority: "1.0", changefreq: "weekly" },
    { url: "/book.html", priority: "0.9", changefreq: "monthly" },
    { url: "/blog.html", priority: "0.7", changefreq: "weekly" },
    { url: "/cities/", priority: "0.8", changefreq: "monthly" },
    { url: "/article-adhd-symptoms-adults.html", priority: "0.6", changefreq: "monthly" },
    { url: "/article-adhd-women-afab.html", priority: "0.6", changefreq: "monthly" },
    { url: "/article-adult-adhd-arizona.html", priority: "0.6", changefreq: "monthly" },
    { url: "/article-prepare-online-visit.html", priority: "0.6", changefreq: "monthly" },
    { url: "/privacy-policy.html", priority: "0.3", changefreq: "yearly" },
    { url: "/terms-of-service.html", priority: "0.3", changefreq: "yearly" },
    { url: "/consent-forms.html", priority: "0.4", changefreq: "yearly" },
  ];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages.map(p => `  <url>
    <loc>${base}${p.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join("\n")}
${cities.map(c => `  <url>
    <loc>${base}/cities/${c.slug}.html</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${c.tier === 1 ? "0.8" : c.tier === 2 ? "0.7" : "0.6"}</priority>
  </url>`).join("\n")}
</urlset>`;

  return xml;
}

// ─────────────────────────────────────────────────────────
// ROBOTS.TXT
// ─────────────────────────────────────────────────────────

function generateRobotsTxt() {
  return `User-agent: *
Allow: /

Sitemap: https://arizonatelepsychiatryclinic.com/sitemap.xml

# Allow all search engine crawlers
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

# Allow AI answer engine crawlers (AEO)
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: ClaudeBot
Allow: /

# Block admin pages
Disallow: /admin.html
Disallow: /admin-login.html
Disallow: /admin-pelvic-scan.html
Disallow: /api/
`;
}

// ─────────────────────────────────────────────────────────
// MAIN — Generate everything
// ─────────────────────────────────────────────────────────

const outDir = path.join(__dirname, "cities");
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

console.log(`\n🏗️  Generating ${cities.length} city pages...\n`);

// Generate each city page
cities.forEach((city, i) => {
  const html = generatePage(city);
  const filePath = path.join(outDir, `${city.slug}.html`);
  fs.writeFileSync(filePath, html, "utf-8");
  console.log(`  ✓ [${i + 1}/${cities.length}] cities/${city.slug}.html`);
});

// Generate locations hub page
const indexHtml = generateIndexPage();
fs.writeFileSync(path.join(outDir, "index.html"), indexHtml, "utf-8");
console.log(`\n  ✓ cities/index.html (locations hub)`);

// Generate sitemap
const sitemap = generateSitemap();
fs.writeFileSync(path.join(__dirname, "sitemap.xml"), sitemap, "utf-8");
console.log(`  ✓ sitemap.xml (${cities.length + 11} URLs)`);

// Generate robots.txt
const robots = generateRobotsTxt();
fs.writeFileSync(path.join(__dirname, "robots.txt"), robots, "utf-8");
console.log(`  ✓ robots.txt`);

console.log(`\n✅ Done! Generated:`);
console.log(`   • ${cities.length} city landing pages in /cities/`);
console.log(`   • 1 locations hub page (cities/index.html)`);
console.log(`   • sitemap.xml with ${cities.length + 11} URLs`);
console.log(`   • robots.txt with crawl directives`);
console.log(`\n📊 SEO features included:`);
console.log(`   • Schema.org: MedicalBusiness, FAQPage, BreadcrumbList, Service`);
console.log(`   • Open Graph + Twitter Card meta tags`);
console.log(`   • Geo-targeting meta tags`);
console.log(`   • Canonical URLs`);
console.log(`   • FAQ accordion with structured data`);
console.log(`   • Internal city-to-city linking`);
console.log(`   • Breadcrumb navigation`);
console.log(`   • Unique content per city (tier-based)`);
console.log(`   • Mobile-first responsive design`);
console.log(`   • AEO-optimized direct answer sections\n`);
