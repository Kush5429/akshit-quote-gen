import { useState, useRef } from "react";

const DOUBLETICK_LOGO = "data:image/jpeg;base64,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";

const SHIVAM_SIG = "data:image/jpeg;base64,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";

// ─── Pricing as provided (no discounts applied) ───
const PLANS = {
  starter: {
    name: "Starter",
    subtitle: "Bulk Messaging + Google Sheets",
    monthly: 5700,
    quarterly: 12900,
    yearly: 30000,
    monthlyNote: "Requires management approval",
    features: [
      "Team inbox (5 agents free)",
      "Send bulk broadcasts",
      "Bulk import",
      "Define customer segments",
      "Share products and catalogues",
      "Detailed broadcast analytics",
      "Excel export and import",
      "Google Sheets integration",
      "Access on mobile and web",
      "Unlimited tags",
      "10 custom attributes",
    ],
  },
  pro: {
    name: "Pro",
    subtitle: "Bulk Messaging + Chatbots + Integrations",
    monthly: 8700,
    quarterly: 18000,
    yearly: 42000,
    monthlyNote: "Requires management approval",
    features: [
      "Everything in Starter plan",
      "Team inbox (10 agents free)",
      "Roles & permissions",
      "Number masking",
      "Automated ordering bot",
      "3rd party integrations",
      "Developer API",
      "Agent & Organisation Analytics",
      "Reports",
      "30 custom attributes",
      "5 WhatsApp Groups included",
    ],
  },
  enterprise: {
    name: "Enterprise",
    subtitle: "Full Suite — Quarterly Only",
    monthly: null,
    quarterly: 30000,
    yearly: 120000,
    quarterlyNote: "₹10,000/month × 3 months — without AI Bots",
    yearlyNote: "₹10,000/month × 12 months — without AI Bots",
    features: [
      "Team inbox (scalable agents)",
      "Frictionless messaging",
      "SLA Breached alerts",
      "Roles & permissions",
      "Number masking",
      "Automated ordering bot",
      "3rd party integrations",
      "Developer API",
      "Agent & Organization Analytics",
      "Reports",
      "Send bulk broadcasts",
      "Bulk import",
      "CTWA Integration",
      "Define customer segments",
      "Share products and catalogs",
      "Detailed broadcast analytics",
      "Excel export and import",
      "Google Sheets integration",
      "Unlimited tags & custom attributes",
      "5 WhatsApp Groups included",
      "WhatsApp group with key company persons",
      "Complex journeys",
      "Enterprise Analytics",
      "CAPI Support",
    ],
  },
};

const ADDON_GROUPS = [
  {
    group: "Platform Features",
    items: [
      {
        id: "whatsapp_calling",
        label: "WhatsApp API Calling",
        note: "Calling usage cost charged separately",
        monthly: 3000, quarterly: 9000, yearly: 36000,
        displayPrice: { monthly: "₹3,000/mo", quarterly: "₹9,000/qtr", yearly: "₹36,000/yr" },
      },
      {
        id: "ai_filtered",
        label: "AI Filtered Awaiting Reply",
        monthly: 5000, quarterly: 15000, yearly: 60000,
        displayPrice: { monthly: "₹5,000/mo", quarterly: "₹15,000/qtr", yearly: "₹60,000/yr" },
      },
      {
        id: "collaborators",
        label: "Collaborators",
        monthly: 7000, quarterly: 21000, yearly: 84000,
        displayPrice: { monthly: "₹7,000/mo", quarterly: "₹21,000/qtr", yearly: "₹84,000/yr" },
      },
      {
        id: "ai_chatbots",
        label: "AI Chat Bots (ChatGPT-Based)",
        note: "Requires active ChatGPT Plus subscription",
        monthly: 15000, quarterly: 45000, yearly: 180000,
        displayPrice: { monthly: "₹15,000/mo", quarterly: "₹45,000/qtr", yearly: "₹1,80,000/yr" },
      },
      {
        id: "key_account",
        label: "Key Account Manager",
        monthly: 10000, quarterly: 30000, yearly: 120000,
        displayPrice: { monthly: "₹10,000/mo", quarterly: "₹30,000/qtr", yearly: "₹1,20,000/yr" },
      },
      {
        id: "managerial",
        label: "Managerial Services (Complete Account Management)",
        monthly: 35000, quarterly: 105000, yearly: 420000,
        displayPrice: { monthly: "₹35,000/mo", quarterly: "₹1,05,000/qtr", yearly: "₹4,20,000/yr" },
      },
      {
        id: "sla_timer",
        label: "SLA Chat-Based Timer",
        monthly: 2500, quarterly: 7500, yearly: 30000,
        displayPrice: { monthly: "₹2,500/mo", quarterly: "₹7,500/qtr", yearly: "₹30,000/yr" },
      },
      {
        id: "frictionless",
        label: "Frictionless Messaging (Utility-Based)",
        monthly: null, quarterly: null, yearly: 30000,
        displayPrice: { monthly: "₹30,000/yr only", quarterly: "₹30,000/yr only", yearly: "₹30,000/yr" },
      },
    ],
  },
  {
    group: "Users & Numbers",
    items: [
      {
        id: "extra_agents",
        label: "Additional Agents",
        monthly: 500, quarterly: 1500, yearly: 6000,
        displayPrice: { monthly: "₹500/user/mo", quarterly: "₹1,500/user/qtr", yearly: "₹6,000/user/yr" },
      },
      {
        id: "additional_waba",
        label: "Additional WABA (WhatsApp API Number)",
        monthly: 2400, quarterly: 7200, yearly: 28800,
        displayPrice: { monthly: "₹2,400/mo", quarterly: "₹7,200/qtr", yearly: "₹28,800/yr" },
      },
    ],
  },
  {
    group: "Integrations",
    items: [
      {
        id: "zoho_crm",
        label: "Zoho CRM Integration",
        monthly: null, quarterly: 5000, yearly: 20000,
        iframeYearly: 25000,
        displayPrice: { monthly: "₹5,000/qtr or ₹20,000/yr", quarterly: "₹5,000/qtr", yearly: "₹20,000/yr" },
      },
      {
        id: "hubspot",
        label: "HubSpot Integration",
        monthly: null, quarterly: 5000, yearly: 18000,
        displayPrice: { monthly: "₹5,000/qtr or ₹18,000/yr", quarterly: "₹5,000/qtr", yearly: "₹18,000/yr" },
      },
      {
        id: "indiamart",
        label: "IndiaMart Integration",
        monthly: null, quarterly: 5000, yearly: 18000,
        displayPrice: { monthly: "₹5,000/qtr or ₹18,000/yr", quarterly: "₹5,000/qtr", yearly: "₹18,000/yr" },
      },
      {
        id: "leadsquared",
        label: "LeadSquared Integration",
        monthly: null, quarterly: 5000, yearly: 18000,
        iframeYearly: 25000,
        displayPrice: { monthly: "₹5,000/qtr or ₹18,000/yr", quarterly: "₹5,000/qtr", yearly: "₹18,000/yr" },
      },
      {
        id: "bitrix",
        label: "Bitrix Integration",
        monthly: null, quarterly: 5000, yearly: 18000,
        displayPrice: { monthly: "₹5,000/qtr or ₹18,000/yr", quarterly: "₹5,000/qtr", yearly: "₹18,000/yr" },
      },
      {
        id: "salesforce",
        label: "Salesforce Integration",
        monthly: null, quarterly: 12500, yearly: 50000,
        iframeYearly: 90000,
        displayPrice: { monthly: "₹12,500/qtr or ₹50,000/yr", quarterly: "₹12,500/qtr", yearly: "₹50,000/yr" },
      },
      {
        id: "shopify",
        label: "Shopify Integration",
        monthly: 0, quarterly: 0, yearly: 0,
        displayPrice: { monthly: "Free", quarterly: "Free", yearly: "Free" },
      },
      {
        id: "woocommerce",
        label: "WooCommerce Integration",
        monthly: null, quarterly: null, yearly: 18000,
        displayPrice: { monthly: "₹18,000/yr only", quarterly: "₹18,000/yr only", yearly: "₹18,000/yr" },
      },
    ],
  },
  {
    group: "One-Time & Usage",
    items: [
      {
        id: "bot_building",
        label: "Bot Building (up to 15 components)",
        monthly: null, quarterly: null, yearly: null,
        custom: "₹20,000 one-time",
        displayPrice: { monthly: "₹20,000 one-time", quarterly: "₹20,000 one-time", yearly: "₹20,000 one-time" },
      },
      {
        id: "bluetick",
        label: "BlueTick Verified Badge",
        monthly: null, quarterly: null, yearly: null,
        custom: "₹40,000 one-time",
        displayPrice: { monthly: "₹40,000 one-time", quarterly: "₹40,000 one-time", yearly: "₹40,000 one-time" },
      },
      {
        id: "magic_text",
        label: "Magic Text Wand (AI Reply / Text Assist)",
        monthly: null, quarterly: null, yearly: null,
        custom: "₹1/daily active chat",
        displayPrice: { monthly: "₹1/daily active chat", quarterly: "₹1/daily active chat", yearly: "₹1/daily active chat" },
      },
      {
        id: "ai_summary",
        label: "AI Summary",
        monthly: null, quarterly: null, yearly: null,
        custom: "₹2/daily summary",
        displayPrice: { monthly: "₹2/daily summary", quarterly: "₹2/daily summary", yearly: "₹2/daily summary" },
      },
      {
        id: "whatsapp_groups",
        label: "WhatsApp Groups",
        note: "Pro & Enterprise plans include 5 groups free",
        monthly: null, quarterly: null, yearly: null,
        custom: "₹100/group/month",
        displayPrice: { monthly: "₹100/group/month", quarterly: "₹100/group/month", yearly: "₹100/group/month" },
      },
    ],
  },
];

const ADDONS = ADDON_GROUPS.flatMap(g => g.items);

const fmtINR = n => new Intl.NumberFormat("en-IN").format(n);

/* ─── Design tokens ─── */
const T = {
  bg: "#0b1015", surface: "#111820", surfaceHigh: "#16202b",
  border: "#1c2836", borderMed: "#243242",
  green: "#17a066", greenDk: "#0d7a4e", greenLt: "#21c47a",
  text: "#e4eaf0", textSub: "#6d8497", textMuted: "#3d5264",
  white: "#fff",
  pGreen: "#0b5235", pGreenMid: "#0e7048", pAccent: "#1aad74",
};

const baseInput = {
  width: "100%", padding: "11px 15px", background: "#0d1520",
  border: `1.5px solid ${T.border}`, borderRadius: 8, color: T.text,
  fontSize: 14, outline: "none", fontFamily: "inherit",
  boxSizing: "border-box", lineHeight: 1.5,
};

/* ─── Scope of Work renderer — parses plain text into structured PDF elements ─── */
function renderScopeLines(scopeText) {
  return scopeText.split("\n").map((line, i) => {
    const trimmed = line.trim();

    // Empty line → spacer
    if (!trimmed) {
      return <div key={i} style={{ height: 8 }} />;
    }

    // Section header: ends with colon, or wrapped in asterisks (e.g. *For Sales:*)
    const isHeader = /^[A-Za-z*\s()&/,+-]+:$/.test(trimmed) || /^\*[^*]+\*$/.test(trimmed);

    if (isHeader) {
      return (
        <div key={i} style={{
          fontWeight: 700,
          color: "#0b5235",
          fontSize: 13,
          marginTop: i === 0 ? 0 : 12,
          marginBottom: 5,
          fontFamily: "'EB Garamond', serif",
          letterSpacing: 0.2,
          borderBottom: "1px solid #d1fae5",
          paddingBottom: 3,
        }}>
          {trimmed.replace(/^\*|\*$/g, "")}
        </div>
      );
    }

    // Bullet line — strip any leading -, •, *, numbers+dot
    const bulletStripped = trimmed.replace(/^[-•*]\s*/, "").replace(/^\d+\.\s*/, "");

    return (
      <div key={i} style={{
        display: "flex",
        gap: 9,
        alignItems: "flex-start",
        marginBottom: 5,
        paddingLeft: 2,
      }}>
        <span style={{
          color: "#1aad74",
          flexShrink: 0,
          fontSize: 9,
          marginTop: 5,
          fontWeight: 700,
        }}>▶</span>
        <span style={{
          color: "#374151",
          fontSize: 12.5,
          lineHeight: 1.8,
        }}>{bulletStripped}</span>
      </div>
    );
  });
}

/* ─── Main component ─── */
export default function App() {
  const [step, setStep] = useState(1);
  const [clientName, setClientName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [clientLogo, setClientLogo] = useState(null);
  const [billing, setBilling] = useState("quarterly");
  const [plan, setPlan] = useState("pro");
  const [enterpriseAIBots, setEnterpriseAIBots] = useState(false);
  const [enterpriseCustomPrice, setEnterpriseCustomPrice] = useState("");
  const [addons, setAddons] = useState([]);
  const [iframeSelections, setIframeSelections] = useState({});
  const [customAddonsList, setCustomAddonsList] = useState([]);
  const [newCustomAddon, setNewCustomAddon] = useState({ label: "", price: "", billing: "custom" });
  const [scope, setScope] = useState("");
  const [discount, setDiscount] = useState(0);
  const [preview, setPreview] = useState(false);
  const logoRef = useRef();
  const docRef = useRef();

  const planData = PLANS[plan];
  const billingLabel = { monthly: "Monthly", quarterly: "Quarterly", yearly: "Yearly" }[billing];

  const isEnterpriseMonthly = plan === "enterprise" && billing === "monthly";
  const isEnterpriseYearly = plan === "enterprise" && billing === "yearly";
  const isEnterpriseQuarterly = plan === "enterprise" && billing === "quarterly";
  const isEnterpriseCustom = isEnterpriseMonthly || isEnterpriseYearly || isEnterpriseQuarterly;
  const effectiveBilling = billing;
  const effectiveBillingLabel = { monthly: "Monthly", quarterly: "Quarterly", yearly: "Yearly" }[billing];

  const basePlanPrice = isEnterpriseCustom
    ? (parseInt(enterpriseCustomPrice.replace(/[^0-9]/g, ""), 10) || 0)
    : (planData[billing] ?? planData.quarterly);

  const aiBotsAddon = plan === "enterprise" && enterpriseAIBots
    ? (billing === "quarterly" ? 45000 : billing === "yearly" ? 180000 : 15000)
    : 0;
  const planPriceOriginal = basePlanPrice + aiBotsAddon;
  const discountFactor = 1 - discount / 100;
  const planPrice = Math.round(planPriceOriginal * discountFactor);

  const selAddons = ADDONS.filter(a => addons.includes(a.id));

  const getAddonPrice = (a) => {
    const useIframe = iframeSelections[a.id] === "iframe" && a.iframeYearly != null;
    if (useIframe) return a.iframeYearly;
    if (a[effectiveBilling] != null) return a[effectiveBilling];
    if (effectiveBilling === "monthly" && a.quarterly != null) return a.quarterly;
    if (a.yearly != null) return a.yearly;
    return null;
  };

  const billingTag = { monthly: "monthly", quarterly: "quarterly", yearly: "yearly" }[effectiveBilling];

  const getAddonDisplayPrice = (a) => {
    const useIframe = iframeSelections[a.id] === "iframe" && a.iframeYearly != null;
    if (useIframe) return `₹${fmtINR(a.iframeYearly)}/yr (with iframe)`;
    if (a.displayPrice) {
      const raw = a.displayPrice[effectiveBilling] ?? a.displayPrice.yearly ?? a.custom ?? "—";
      return raw;
    }
    const p = getAddonPrice(a);
    return p != null ? `₹${fmtINR(p)} (${billingTag})` : (a.custom ?? "—");
  };

  const getAddonPrintLabel = (a) => {
    const useIframe = iframeSelections[a.id] === "iframe" && a.iframeYearly != null;
    if (useIframe) return `INR ${fmtINR(a.iframeYearly)}/- (yearly · with iframe)`;
    const p = getAddonPrice(a);
    if (p === 0) return "Free";
    if (p == null) return a.custom ?? "—";
    if (a[effectiveBilling] == null && a.yearly != null && effectiveBilling !== "yearly") {
      return `INR ${fmtINR(p)}/- (yearly)`;
    }
    return `INR ${fmtINR(p)}/- (${billingTag})`;
  };

  const numericAddons = selAddons.filter(a => getAddonPrice(a) != null);
  const customAddons = selAddons.filter(a => getAddonPrice(a) == null);
  const addonSum = numericAddons.reduce((s, a) => s + getAddonPrice(a), 0)
    + customAddonsList.reduce((s, ca) => s + (parseInt(ca.price) || 0), 0);
  const total = planPrice + addonSum;
  const totalGST = Math.round(total * 1.18);
  const teamName = companyName || "Client";

  const toggleAddon = id => setAddons(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
  const handleLogoUpload = e => {
    const f = e.target.files[0];
    if (f) { const r = new FileReader(); r.onload = ev => setClientLogo(ev.target.result); r.readAsDataURL(f); }
  };

  const download = () => {
    const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>DoubleTick Quotation — ${companyName}</title>
      <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
      <style>
        *, *::before, *::after { box-sizing: border-box; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        body { margin: 0; padding: 0; font-family: 'Inter', sans-serif; background: #fff; }
        @page { margin: 0; size: A4; }
        @media print {
          body { width: 210mm; }
          .page-break { break-before: page !important; }
          .no-break { break-inside: avoid !important; }
          .section-block { break-inside: avoid !important; }
          tr { break-inside: avoid !important; }
          thead { display: table-header-group; }
        }
      </style>
    </head><body>${docRef.current.outerHTML}<script>window.onload=()=>{setTimeout(()=>{window.print();},800);}<\/script></body></html>`;
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const w = window.open(url, "_blank");
    if (!w) {
      const a = document.createElement("a");
      a.href = url;
      a.download = `DoubleTick-Quotation-${companyName || "Client"}.html`;
      a.click();
    }
    setTimeout(() => URL.revokeObjectURL(url), 10000);
  };

  const STEPS = ["Client Info", "Plan & Billing", "Add-ons", "Review"];

  /* ═══════════════════════════════════
     PRINT DOCUMENT
  ═══════════════════════════════════ */
  const PrintDoc = () => (
    <div ref={docRef} style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#1e2d3d", background: "#fff", maxWidth: 860, margin: "0 auto" }}>

      {/* ── PAGE 1: Cover + Overview ── */}
      <div style={{ breakAfter: "page" }}>
        <div style={{ background: `linear-gradient(135deg, ${T.pGreen} 0%, ${T.pGreenMid} 100%)`, padding: "38px 56px 30px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ fontSize: 9.5, letterSpacing: 3.5, color: "rgba(255,255,255,0.45)", textTransform: "uppercase", marginBottom: 14, fontWeight: 500 }}>APPORT SOFTWARE SOLUTIONS PVT LTD</div>
              <div style={{ display: "inline-flex", alignItems: "center", background: "rgba(255,255,255,0.97)", borderRadius: 9, padding: "8px 18px", marginBottom: 18 }}>
                <img src={DOUBLETICK_LOGO} alt="DoubleTick" style={{ height: 28, display: "block", objectFit: "contain" }} />
              </div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", lineHeight: 1.85, marginTop: 2 }}>
                8th Floor, 8-B, Sagar Sangeet, Colaba, Mumbai — 400005<br />
                deepak@quicksell.co &nbsp;&nbsp;|&nbsp;&nbsp; +91 81040 64645<br />
                CIN: U72900MH2021PTC354389
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "center" }}>
              {clientLogo ? (
                <div style={{ background: "#ffffff", borderRadius: 12, padding: "14px 22px", display: "flex", alignItems: "center", justifyContent: "center", minWidth: 150, minHeight: 72, boxShadow: "0 2px 12px rgba(0,0,0,0.18)", border: "1px solid rgba(255,255,255,0.6)" }}>
                  <img src={clientLogo} alt={companyName} style={{ maxHeight: 52, maxWidth: 170, objectFit: "contain", display: "block" }} />
                </div>
              ) : (
                <div style={{ background: "#ffffff", borderRadius: 12, padding: "14px 22px", minWidth: 150, minHeight: 72, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 12px rgba(0,0,0,0.18)" }}>
                  <div style={{ fontSize: 11, letterSpacing: 1.5, color: "#0b5235", textTransform: "uppercase", fontWeight: 700, textAlign: "center", lineHeight: 1.4 }}>{companyName}</div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div style={{ background: "#edfbf3", borderBottom: "2px solid #a7f0c8", padding: "18px 56px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 9.5, letterSpacing: 2.5, color: "#5aac88", textTransform: "uppercase", marginBottom: 5, fontWeight: 600 }}>Prepared For</div>
            <div style={{ fontFamily: "'EB Garamond', serif", fontSize: 24, fontWeight: 600, color: T.pGreen, lineHeight: 1.2 }}>{clientName}</div>
            <div style={{ fontSize: 14, color: "#2d4a3a", fontWeight: 600, marginTop: 3 }}>{companyName}</div>
            {email && <div style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>{email}</div>}
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 9.5, letterSpacing: 2.5, color: "#5aac88", textTransform: "uppercase", marginBottom: 5, fontWeight: 600 }}>Date</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#1f2937" }}>{new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</div>
            <div style={{ marginTop: 8, display: "inline-block", background: T.pGreen, color: "#fff", fontSize: 10.5, fontWeight: 600, borderRadius: 30, padding: "4px 14px", letterSpacing: 0.5 }}>{planData.name} Plan &nbsp;·&nbsp; {effectiveBillingLabel} Billing</div>
          </div>
        </div>

        <div style={{ padding: "38px 56px" }}>
          <PrintSection title="Company Overview">
            <p style={{ color: "#374151", lineHeight: 1.9, margin: 0, fontSize: 13 }}>QuickSell is a conversational commerce company empowering global brands with scalable personal commerce and relationship-led sales on WhatsApp. Started in 2017 with a vision of enabling global brands to win more customers using simple yet robust technology on mobile, today we have over 7,000+ customers across 100+ countries using our technology to grow digitally.</p>
          </PrintSection>

          <PrintSection title="About DoubleTick">
            <p style={{ color: "#374151", lineHeight: 1.9, marginBottom: 12, fontSize: 13 }}>DoubleTick is a mobile-first conversational CRM built on top of WhatsApp Business API to unlock marketing and sales capabilities of WhatsApp with top-notch features such as a cloud-based team inbox, unlimited broadcast and bulk messaging, real-time broadcast analytics, dynamic cataloging, chatbot, commerce BOT and many more.</p>
            <p style={{ color: "#374151", lineHeight: 1.9, marginBottom: 12, fontSize: 13 }}>Some of the brands powered by DoubleTick include GRT Jewellers, Raheja Developers, Sabyasachi, Tarun Tahiliani, ICRA, BVC Logistics, Tupperware, Birla Brainiacs KGK Group, Walking Tree, CKC Group, Malabar Diamonds and Gold, Emerald India, Prima Art, Siroya, SabyaSachi, etc. Backed by investors from Silicon Valley, Info Edge Ventures and BeeNext Asia, we are headquartered in Mumbai, India.</p>
            <p style={{ color: "#374151", lineHeight: 1.9, marginBottom: 16, fontSize: 13 }}>DoubleTick.io is EU GDPR compliant, ISO 27001 certified, and a Meta Business Partner, powered by the Official WhatsApp Business API. Recognized as Meta Emerging Technology Partner of the Year 2025 and trusted by businesses globally.</p>
            <div style={{ padding: "14px 18px", background: "#f0fdf8", borderRadius: 9, border: "1px solid #a7f0c8", fontSize: 12 }}>
              <div style={{ fontWeight: 600, color: T.pGreen, marginBottom: 8 }}>Customer Reviews</div>
              <div style={{ color: "#2d6a4f", lineHeight: 2 }}>
                G2: https://www.g2.com/products/doubletick-io/reviews<br />
                App Store: https://apps.apple.com/in/app/doubletick/id1662977073<br />
                Play Store: https://play.google.com/store/apps/details?id=io.doubletick.mobile.crm
              </div>
            </div>
          </PrintSection>
        </div>
        <PrintFooter />
      </div>

      {/* ── Page 2: Commercial Proposal ── */}
      <div style={{ breakBefore: "page" }}>
        <PrintPageHeader title="Commercial Proposal" sub={`${companyName}  ·  ${effectiveBillingLabel} Billing`} clientLogo={clientLogo} companyName={companyName} />
        <div style={{ padding: "24px 56px" }}>
          <PrintSection title={`${effectiveBillingLabel} Pricing Summary`}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ background: T.pGreen, color: "#fff" }}>
                  <th style={{ padding: "11px 14px", textAlign: "center", width: 44, fontWeight: 600, fontSize: 12 }}>#</th>
                  <th style={{ padding: "11px 16px", textAlign: "left", fontWeight: 600, fontSize: 12 }}>Particulars</th>
                  <th style={{ padding: "11px 16px", textAlign: "right", fontWeight: 600, fontSize: 12 }}>Amount (excl. GST)</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ background: "#f7faf9" }}>
                  <td style={pTdc}>1</td>
                  <td style={pTdl}>
                    DoubleTick {planData.name} Plan &mdash; {effectiveBillingLabel}
                    {discount > 0 && (
                      <div style={{ fontSize: 11, color: T.pAccent, marginTop: 2, fontWeight: 600 }}>
                        {discount}% discount applied · Original: ₹{fmtINR(planPriceOriginal)}
                      </div>
                    )}
                    {/* ── BUG FIX 2: Show correct /month base price by dividing by billing period ── */}
                    {plan === "enterprise" && (
                      <div style={{ fontSize: 11, color: "#6b7280", marginTop: 2 }}>
                        {(() => {
                          const billingMonths = billing === "yearly" ? 12 : billing === "quarterly" ? 3 : 1;
                          const baseMonthly = Math.round(basePlanPrice / billingMonths);
                          return enterpriseAIBots
                            ? `Without AI Bots: ₹${fmtINR(baseMonthly)}/mo + AI Bots: ₹15,000/mo`
                            : `Base: ₹${fmtINR(baseMonthly)}/month`;
                        })()}
                      </div>
                    )}
                  </td>
                  <td style={pTdr}><strong>INR {fmtINR(planPrice)}/-</strong></td>
                </tr>
                {numericAddons.map((a, i) => (
                  <tr key={a.id} style={{ background: i % 2 === 0 ? "#fff" : "#f7faf9" }}>
                    <td style={pTdc}>{i + 2}</td>
                    <td style={pTdl}>
                      {a.label}
                      {iframeSelections[a.id] === "iframe" && a.iframeYearly && (
                        <span style={{ fontSize: 11, color: "#9ca3af", marginLeft: 6 }}>(with iframe)</span>
                      )}
                    </td>
                    <td style={pTdr}><strong>{getAddonPrintLabel(a)}</strong></td>
                  </tr>
                ))}
                {customAddons.map((a, i) => (
                  <tr key={a.id} style={{ background: (numericAddons.length + i) % 2 === 0 ? "#fff" : "#f7faf9" }}>
                    <td style={pTdc}>{numericAddons.length + i + 2}</td>
                    <td style={pTdl}>{a.label}</td>
                    <td style={{ ...pTdr, color: T.pAccent, fontStyle: "italic" }}>{getAddonPrintLabel(a)}</td>
                  </tr>
                ))}
                {customAddonsList.map((ca, i) => (
                  <tr key={ca.id} style={{ background: (numericAddons.length + customAddons.length + i) % 2 === 0 ? "#fff" : "#f7faf9" }}>
                    <td style={pTdc}>{numericAddons.length + customAddons.length + i + 2}</td>
                    <td style={pTdl}>{ca.label}</td>
                    <td style={{ ...pTdr, color: T.pAccent, fontStyle: "italic" }}>
                      {ca.price ? `INR ${Number(ca.price).toLocaleString("en-IN")}/-` : "—"} {ca.billing !== "custom" ? `(${ca.billing})` : ""}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={2} style={{ padding: "12px 16px", textAlign: "right", fontSize: 12.5, color: "#6b7280", borderTop: "1.5px solid #d1fae5" }}>Subtotal + 18% GST</td>
                  <td style={{ padding: "12px 16px", textAlign: "right", fontSize: 15, fontWeight: 700, color: T.pGreen, borderTop: "1.5px solid #d1fae5" }}>INR {fmtINR(totalGST)}/-</td>
                </tr>
              </tbody>
            </table>
            <div style={{ marginTop: 8, fontSize: 11, color: "#9ca3af", fontStyle: "italic" }}>* GST at 18% is applicable additionally on all taxable line items.</div>
          </PrintSection>

          <PrintSection title={`DoubleTick ${planData.name} Plan — Included Features`}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 30px" }}>
              {planData.features.map((f, i) => (
                <div key={i} style={{ display: "flex", gap: 9, alignItems: "flex-start", fontSize: 12.5, color: "#374151", lineHeight: 1.65 }}>
                  <span style={{ color: T.pAccent, flexShrink: 0, marginTop: 3, fontSize: 10 }}>▶</span>
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </PrintSection>

          <div style={{ padding: "16px 20px", background: "#fffbeb", borderRadius: 9, border: "1px solid #fcd34d", fontSize: 12.5 }}>
            <div style={{ fontWeight: 700, color: "#78350f", marginBottom: 10, fontSize: 12, letterSpacing: 0.5, textTransform: "uppercase" }}>Important Notes</div>
            <div style={{ display: "grid", gap: 8 }}>
              {[
                ["Cold Messaging", "Meta strictly prohibits cold messaging via WhatsApp Business API. All outbound communications must comply with Meta's messaging policies."],
                ["WhatsApp Groups", `Groups created via WhatsApp APIs support a maximum of 8 participants. Adding more than 8 members requires the Collaborators add-on. A minimum messaging tier of 100,000 messages is required by Meta to operate group-based communication at scale. Pro & Enterprise plans include 5 WhatsApp groups by default.`],
                ["Platform Operations", "All agents will be required to use the DoubleTick App (Web or Mobile) for day-to-day operations."],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", gap: 10, color: "#7c2d12", lineHeight: 1.7 }}>
                  <strong style={{ flexShrink: 0, minWidth: 130, color: "#92400e" }}>{k}:</strong>
                  <span>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Page 3: Scope of Work ── */}
      <div style={{ breakBefore: "page" }}>
        <PrintPageHeader title="Support & Onboarding" sub="Scope of Work" clientLogo={clientLogo} companyName={companyName} />
        <div style={{ padding: "24px 56px" }}>
          {scope && (
            <div style={{ marginBottom: 22 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <div style={{ width: 4, height: 24, background: T.pGreen, borderRadius: 2, flexShrink: 0 }} />
                <div style={{ fontFamily: "'EB Garamond', serif", fontSize: 17, fontWeight: 700, color: "#0b5235", letterSpacing: 0.2 }}>Scope of Work</div>
              </div>
              {/* ── BUG FIX 1: Parse scope text into structured bullets + section headers ── */}
              <div style={{ padding: "16px 20px", background: "#f8fafc", borderRadius: 9, border: "1px solid #e2e8f0" }}>
                {renderScopeLines(scope)}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Page 4: CSM Programme + Self-Service ── */}
      <div style={{ breakBefore: "page" }}>
        <PrintPageHeader title="Support & Onboarding" sub="Customer Success Programme" clientLogo={clientLogo} companyName={companyName} />
        <div style={{ padding: "24px 56px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ width: 4, height: 24, background: T.pGreen, borderRadius: 2, flexShrink: 0 }} />
            <div style={{ fontFamily: "'EB Garamond', serif", fontSize: 17, fontWeight: 700, color: "#0b5235", letterSpacing: 0.2 }}>Customer Success Manager (CSM) Programme</div>
          </div>

          <div style={{ padding: "10px 16px", background: "#edfbf3", borderRadius: 8, border: "1px solid #a7f0c8", marginBottom: 12 }}>
            <div style={{ fontWeight: 600, color: T.pGreen, fontSize: 12.5 }}>60-Day Dedicated CSM Policy &mdash; Effective 3 October 2025</div>
          </div>
          <p style={{ color: "#374151", lineHeight: 1.8, marginBottom: 7, fontSize: 12.5 }}>Every account will have a dedicated Customer Success Manager assigned for 60 days from the date of activation. The CSM will serve as your primary point of contact, assisting with account setup, onboarding, and ensuring a smooth implementation of the platform.</p>
          <p style={{ color: "#374151", lineHeight: 1.8, marginBottom: 12, fontSize: 12.5 }}>After the 60-day CSM period, you will receive a brief feedback form. You will continue to have full access to the DoubleTick Support Channel for ongoing assistance at any time.</p>

          <div style={{ breakInside: "avoid" }}>
            <div style={{ fontWeight: 600, color: "#1f2937", marginBottom: 8, fontSize: 12.5 }}>Your 60-Day CSM Support Includes:</div>
            <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #e5e7eb", borderRadius: 8, overflow: "hidden" }}>
              <tbody>
                {[
                  ["01", "1-on-1 Onboarding", "Setting up your WhatsApp number on the DoubleTick platform"],
                  ["02", "Facebook Business Verification", "Step-by-step guidance through the Meta business verification process"],
                  ["03", "Agents & WABA Setup", "Adding team agents and mapping WhatsApp Business Accounts to your dashboard"],
                  ["04", "Use-Case Consultation", "Expert discussion on your business use-cases and feature recommendations tailored to your industry"],
                  ["05", "Add-on Integration Support", "Assistance configuring and integrating optional add-on features"],
                  ["06", "Platform Walkthrough", "A dedicated 15-minute guided walkthrough of the full DoubleTick platform"],
                ].map(([num, title, desc], i) => (
                  <tr key={num} style={{ background: i % 2 === 0 ? "#fff" : "#f8fafc", borderBottom: "1px solid #e5e7eb", breakInside: "avoid" }}>
                    <td style={{ padding: "9px 12px", width: 38, fontWeight: 700, color: T.pGreen, fontSize: 14, verticalAlign: "middle", fontFamily: "'EB Garamond', serif", textAlign: "center", borderRight: "1px solid #e5e7eb" }}>{num}</td>
                    <td style={{ padding: "9px 14px", fontWeight: 600, color: "#111827", width: 180, verticalAlign: "middle", fontSize: 12, borderRight: "1px solid #e5e7eb" }}>{title}</td>
                    <td style={{ padding: "9px 14px", color: "#4b5563", fontSize: 12, lineHeight: 1.6 }}>{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ padding: "10px 16px", background: "#fffbeb", borderRadius: 8, border: "1px solid #fcd34d", fontSize: 12, color: "#374151", lineHeight: 1.7, breakInside: "avoid", marginTop: 14, marginBottom: 18 }}>
            <strong style={{ color: "#92400e" }}>Please Note: </strong>Your CSM will guide you through creating your first WhatsApp message template and share best practices to ensure campaign compliance and successful message delivery.
          </div>

          <div style={{ breakInside: "avoid" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <div style={{ width: 4, height: 24, background: T.pGreen, borderRadius: 2, flexShrink: 0 }} />
              <div style={{ fontFamily: "'EB Garamond', serif", fontSize: 17, fontWeight: 700, color: "#0b5235", letterSpacing: 0.2 }}>Self-Service Resources</div>
            </div>
            <p style={{ color: "#374151", lineHeight: 1.8, marginBottom: 10, fontSize: 12.5 }}>To maximise your use of the platform at any time, we encourage you to utilise the following self-service resources:</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
              {[["Video Courses & Help Center", "Step-by-step tutorials covering all platform features"], ["Live & Recorded Webinars", "Best-practice sessions hosted by the DoubleTick team"], ["Developer Documentation", "Comprehensive API guides for custom integrations"]].map(([t, d]) => (
                <div key={t} style={{ padding: "11px 13px", background: "#f8fafc", borderRadius: 9, border: "1px solid #e2e8f0" }}>
                  <div style={{ fontWeight: 600, color: T.pGreen, marginBottom: 4, fontSize: 12 }}>{t}</div>
                  <div style={{ fontSize: 11, color: "#6b7280", lineHeight: 1.6 }}>{d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Page 5: Terms & Conditions ── */}
      <div style={{ breakBefore: "page" }}>
        <PrintPageHeader title="Terms & Conditions" sub="Commercial Agreement" clientLogo={clientLogo} companyName={companyName} />
        <div style={{ padding: "24px 56px" }}>

          <PrintSection title="Payment & Agreement Terms">
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <tbody>
                {[
                  ["Payment Terms", "Full payment is due upfront, prior to account activation."],
                  ["Taxation", "Goods and Services Tax (GST) at 18% is applicable in addition to all listed prices."],
                  ["Purchase Order", `Upon acceptance of this proposal, ${teamName} shall issue a Purchase Order (PO) to formalise the commercial agreement.`],
                  ["Advance Payment", `${teamName} agrees to remit payment in advance in accordance with the agreed commercial terms and conditions.`],
                  ["Billing Cycle", `${effectiveBillingLabel} — This proposal is structured on a ${effectiveBillingLabel.toLowerCase()} billing basis${effectiveBillingLabel === "Monthly" ? " (subject to management approval)" : ""}. Renewal terms shall be mutually agreed upon prior to the next cycle.`],
                ].map(([label, val], i) => (
                  <tr key={label} style={{ background: i % 2 === 0 ? "#f9fafb" : "#fff", borderBottom: "1px solid #e5e7eb" }}>
                    <td style={{ padding: "11px 16px", fontWeight: 600, color: "#111827", width: 190, verticalAlign: "top", fontSize: 12.5 }}>{label}</td>
                    <td style={{ padding: "11px 16px", color: "#374151", lineHeight: 1.75, fontSize: 12.5 }}>{val}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </PrintSection>

          <PrintSection title="WhatsApp API Message Costs">
            <p style={{ color: "#374151", lineHeight: 1.9, marginBottom: 14, fontSize: 13 }}>WhatsApp message costs are charged separately by Meta and are effective as of <strong>January 1, 2026</strong>. These are prepaid — the client must recharge the DoubleTick Wallet directly. Rates are subject to change per Meta's pricing policy. No setup fees are applicable.</p>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: T.pGreen, color: "#fff" }}>
                  <th style={{ padding: "10px 16px", textAlign: "left", fontWeight: 600, fontSize: 12 }}>Message Type</th>
                  <th style={{ padding: "10px 16px", textAlign: "right", fontWeight: 600, fontSize: 12 }}>Rate (per delivered message)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Marketing Template Message", "INR 0.99", false, null],
                  ["Utility Template Message", "INR 0.13", false, null],
                  ["Authentication Template Message", "INR 0.35", false, null],
                  ["Incoming Service Message", "Free", true, null],
                  ["Utility Messages (within 24h service window)", "Free", true, "Utility messages sent in response to user messages within the 24-hour service window are free"],
                  ["WhatsApp API Calling — Inbound", "INR 0.24425/min", false, null],
                  ["WhatsApp API Calling — Outbound", "INR 0.52620/min", false, null],
                ].map(([type, rate, free, note], i) => (
                  <tr key={type} style={{ background: i % 2 === 0 ? "#fff" : "#f7faf9", borderBottom: "1px solid #e5e7eb" }}>
                    <td style={{ padding: "10px 16px", color: "#374151", fontSize: 12.5 }}>
                      {type}
                      {note && <div style={{ fontSize: 11, color: "#6b7280", marginTop: 2, fontStyle: "italic" }}>{note}</div>}
                    </td>
                    <td style={{ padding: "10px 16px", textAlign: "right", fontWeight: 600, color: free ? T.pGreen : "#111827", fontSize: 12.5 }}>{rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ marginTop: 10, fontSize: 11.5, color: "#6b7280" }}>For rates outside India: <span style={{ color: T.pAccent }}>https://doubletick.io/conversation-cost</span></div>
          </PrintSection>

          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
            <img src={SHIVAM_SIG} alt="Authorised Signatory" style={{ width: 240, objectFit: "contain", display: "block" }} />
          </div>
        </div>
        <PrintFooter />
      </div>
    </div>
  );

  /* ═══════════════════════════════════
     BUILDER UI
  ═══════════════════════════════════ */
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", minHeight: "100vh", background: T.bg, color: T.text }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap');
        input::placeholder, textarea::placeholder { color: #2e4255; }
        input:focus, textarea:focus { border-color: ${T.green} !important; box-shadow: 0 0 0 3px rgba(23,160,102,0.13); }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #0d1520; }
        ::-webkit-scrollbar-thumb { background: #1c2836; border-radius: 3px; }
      `}</style>

      {/* ─── Top Navbar ─── */}
      <div style={{ background: T.surface, borderBottom: `1px solid ${T.border}`, height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 36px", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ background: "#fff", borderRadius: 7, padding: "5px 13px", display: "inline-flex", alignItems: "center" }}>
            <img src={DOUBLETICK_LOGO} alt="DoubleTick" style={{ height: 24, objectFit: "contain", display: "block" }} />
          </div>
          <div style={{ height: 20, width: 1, background: T.border }} />
          <span style={{ fontSize: 11.5, color: T.textMuted, letterSpacing: 1.8, textTransform: "uppercase", fontWeight: 500 }}>Quotation Builder</span>
        </div>
        {preview && (
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => setPreview(false)} style={{ padding: "8px 18px", background: "transparent", border: `1px solid ${T.borderMed}`, borderRadius: 7, color: T.textSub, cursor: "pointer", fontSize: 13, fontWeight: 500 }}>
              ← Edit
            </button>
            <button onClick={download} style={{ padding: "8px 22px", background: `linear-gradient(135deg, ${T.green}, ${T.greenDk})`, border: "none", borderRadius: 7, color: "#fff", cursor: "pointer", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}>
              ↓ &nbsp;Download PDF
            </button>
          </div>
        )}
      </div>

      {!preview ? (
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "52px 24px 100px" }}>

          {/* Step indicator */}
          <div style={{ display: "flex", marginBottom: 52 }}>
            {STEPS.map((s, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
                  {i > 0 && <div style={{ flex: 1, height: 1, background: step > i ? T.green : T.border, transition: "background 0.3s" }} />}
                  <div style={{ width: 30, height: 30, borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, transition: "all 0.25s", background: step === i + 1 ? T.green : step > i + 1 ? T.greenDk : T.surface, border: `2px solid ${step >= i + 1 ? T.green : T.border}`, color: step >= i + 1 ? "#fff" : T.textMuted, cursor: step > i + 1 ? "pointer" : "default" }} onClick={() => step > i + 1 && setStep(i + 1)}>
                    {step > i + 1 ? "✓" : i + 1}
                  </div>
                  {i < STEPS.length - 1 && <div style={{ flex: 1, height: 1, background: step > i + 1 ? T.green : T.border, transition: "background 0.3s" }} />}
                </div>
                <div style={{ fontSize: 11, marginTop: 8, color: step === i + 1 ? T.greenLt : T.textMuted, fontWeight: step === i + 1 ? 600 : 400, letterSpacing: 0.2 }}>{s}</div>
              </div>
            ))}
          </div>

          {/* ── Step 1 ── */}
          {step === 1 && (
            <>
              <StepHead title="Client Information" sub="Enter the recipient's details for this quotation." />
              <PanelCard>
                <div style={{ display: "grid", gap: 20 }}>
                  <FField label="Client's Full Name *">
                    <input value={clientName} onChange={e => setClientName(e.target.value)} placeholder="e.g. Anurag Sharma" style={baseInput} />
                  </FField>
                  <FField label="Company Name *">
                    <input value={companyName} onChange={e => setCompanyName(e.target.value)} placeholder="e.g. XFAS Logistics" style={baseInput} />
                  </FField>
                  <FField label="Email Address">
                    <input value={email} onChange={e => setEmail(e.target.value)} placeholder="e.g. contact@xfaslogistics.com" type="email" style={baseInput} />
                  </FField>
                  <FField label="Client Company Logo">
                    <div
                      onClick={() => logoRef.current.click()}
                      style={{ border: `2px dashed ${clientLogo ? T.green : T.border}`, borderRadius: 11, padding: clientLogo ? "20px 24px" : "30px 24px", textAlign: "center", cursor: "pointer", background: clientLogo ? "rgba(23,160,102,0.04)" : "#0d1520", transition: "all 0.2s" }}
                      onMouseEnter={e => !clientLogo && (e.currentTarget.style.borderColor = T.greenDk)}
                      onMouseLeave={e => !clientLogo && (e.currentTarget.style.borderColor = T.border)}
                    >
                      {clientLogo ? (
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                          <div style={{ background: "#fff", borderRadius: 8, padding: "10px 20px", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                            <img src={clientLogo} alt="logo" style={{ maxHeight: 56, maxWidth: 200, objectFit: "contain", display: "block" }} />
                          </div>
                          <span style={{ fontSize: 12, color: T.greenLt }}>Click to replace</span>
                        </div>
                      ) : (
                        <>
                          <div style={{ fontSize: 28, color: T.textMuted, marginBottom: 8, lineHeight: 1 }}>+</div>
                          <div style={{ fontSize: 14, color: T.textSub, marginBottom: 4 }}>Upload client logo</div>
                          <div style={{ fontSize: 11.5, color: T.textMuted }}>PNG, JPG or SVG &nbsp;·&nbsp; Will appear prominently on the quotation</div>
                        </>
                      )}
                      <input ref={logoRef} type="file" accept="image/*" onChange={handleLogoUpload} style={{ display: "none" }} />
                    </div>
                    {clientLogo && <button onClick={() => setClientLogo(null)} style={{ marginTop: 8, background: "none", border: "none", color: "#f87171", cursor: "pointer", fontSize: 12, padding: 0 }}>✕ Remove logo</button>}
                  </FField>
                </div>
                <NavBtns next={() => setStep(2)} nextDisabled={!clientName || !companyName} />
              </PanelCard>
            </>
          )}

          {/* ── Step 2 ── */}
          {step === 2 && (
            <>
              <StepHead title="Plan & Billing" sub="Choose the billing cycle and DoubleTick plan to propose." />
              <PanelCard>
                <FField label="Billing Cycle">
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginTop: 4 }}>
                    {[["monthly", "Monthly", "Custom / Approval"], ["quarterly", "Quarterly", "Standard"], ["yearly", "Yearly", "Best Value"]].map(([b, label, badge]) => (
                      <div key={b} onClick={() => { setBilling(b); if (b === "quarterly") setEnterpriseCustomPrice(""); }} style={{ padding: "13px 12px", borderRadius: 10, border: `1.5px solid ${billing === b ? T.green : T.border}`, background: billing === b ? "rgba(23,160,102,0.07)" : "#0d1520", cursor: "pointer", textAlign: "center", transition: "all 0.15s" }}>
                        <div style={{ fontWeight: 600, fontSize: 14, color: billing === b ? T.greenLt : T.textSub }}>{label}</div>
                        <div style={{ fontSize: 10.5, color: billing === b ? T.greenLt : T.textMuted, marginTop: 3, fontWeight: 500 }}>{badge}</div>
                      </div>
                    ))}
                  </div>
                  {billing === "monthly" && (
                    <div style={{ marginTop: 10, padding: "9px 14px", background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.3)", borderRadius: 8, fontSize: 12, color: "#f59e0b" }}>
                      {plan === "enterprise" ? "Enterprise monthly pricing is custom — enter the agreed amount above." : "Monthly billing for Starter / Pro requires management approval before sending."}
                    </div>
                  )}
                  {billing === "quarterly" && plan === "enterprise" && (
                    <div style={{ marginTop: 10, padding: "9px 14px", background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.3)", borderRadius: 8, fontSize: 12, color: "#f59e0b" }}>
                      Enterprise quarterly pricing is custom — enter the agreed quarterly amount above.
                    </div>
                  )}
                  {billing === "yearly" && plan === "enterprise" && (
                    <div style={{ marginTop: 10, padding: "9px 14px", background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.3)", borderRadius: 8, fontSize: 12, color: "#f59e0b" }}>
                      Enterprise yearly pricing is custom — enter the agreed annual amount above.
                    </div>
                  )}
                </FField>
                <div style={{ marginTop: 22 }}>
                  <FField label="Plan">
                    <div style={{ display: "grid", gap: 10, marginTop: 4 }}>
                      {Object.entries(PLANS).map(([key, p]) => {
                        const isEnt = key === "enterprise";
                        const isEntCustom = isEnt && (billing === "monthly" || billing === "yearly" || billing === "quarterly");
                        const dispBilling = billing;
                        const basePrice = isEntCustom
                          ? (parseInt(enterpriseCustomPrice.replace(/[^0-9]/g, ""), 10) || null)
                          : (p[dispBilling] ?? p.quarterly);
                        const aiExtra = isEnt && enterpriseAIBots
                          ? (billing === "quarterly" ? 45000 : billing === "yearly" ? 180000 : 15000)
                          : 0;
                        const displayPrice = basePrice != null ? basePrice + aiExtra : null;
                        const isSelected = plan === key;
                        const billingShort = billing === "monthly" ? "mo" : billing === "quarterly" ? "qtr" : "yr";
                        return (
                          <div key={key}>
                            <div onClick={() => setPlan(key)} style={{ padding: "16px 20px", borderRadius: 10, border: `1.5px solid ${isSelected ? T.green : T.border}`, background: isSelected ? "rgba(23,160,102,0.06)" : T.surface, cursor: "pointer", transition: "all 0.15s" }}>
                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                <div style={{ flex: 1 }}>
                                  <div style={{ fontWeight: 700, fontSize: 15, color: isSelected ? T.greenLt : T.text }}>{p.name}</div>
                                  <div style={{ fontSize: 12, color: T.textMuted, marginTop: 3 }}>{p.subtitle}</div>
                                </div>
                                {isEnt && isEntCustom ? (
                                  <div style={{ marginLeft: 16, flexShrink: 0, textAlign: "right" }}>
                                    <div style={{ fontSize: 11, color: T.textMuted, marginBottom: 5 }}>Custom {billing} price</div>
                                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                      <span style={{ fontSize: 15, fontWeight: 700, color: T.white }}>₹</span>
                                      <input
                                        value={enterpriseCustomPrice}
                                        onChange={e => setEnterpriseCustomPrice(e.target.value)}
                                        onClick={e => e.stopPropagation()}
                                        placeholder="e.g. 30,000"
                                        style={{ width: 110, padding: "6px 10px", background: "#0d1520", border: `1.5px solid ${T.green}`, borderRadius: 7, color: T.white, fontSize: 14, fontWeight: 700, outline: "none", fontFamily: "inherit" }}
                                      />
                                      <span style={{ fontSize: 11, color: T.textMuted }}>/{billingShort}</span>
                                    </div>
                                    {enterpriseCustomPrice && discount > 0 && (
                                      <div style={{ fontSize: 11, color: T.textMuted, marginTop: 3, textDecoration: "line-through" }}>
                                        ₹{fmtINR(parseInt(enterpriseCustomPrice.replace(/[^0-9]/g,""),10)||0)}
                                      </div>
                                    )}
                                    {enterpriseCustomPrice && (
                                      <div style={{ fontSize: 11, color: discount > 0 ? T.greenLt : T.textMuted, marginTop: 2 }}>
                                        {discount > 0 ? `₹${fmtINR(Math.round((parseInt(enterpriseCustomPrice.replace(/[^0-9]/g,""),10)||0) * (1 - discount/100)))} after ${discount}% off` : ""}
                                        {!discount && `+GST · ₹${fmtINR(Math.round((parseInt(enterpriseCustomPrice.replace(/[^0-9]/g,""),10)||0) * 1.18))} total`}
                                      </div>
                                    )}
                                    {isEnt && <div style={{ fontSize: 10.5, color: enterpriseAIBots ? T.greenLt : T.textMuted, marginTop: 3 }}>{enterpriseAIBots ? `+₹${billing === "yearly" ? "1,80,000" : billing === "quarterly" ? "45,000" : "15,000"} AI Bots` : "without AI Bots"}</div>}
                                  </div>
                                ) : (
                                  <div style={{ textAlign: "right", marginLeft: 16, flexShrink: 0 }}>
                                    {discount > 0 && (
                                      <div style={{ fontSize: 12, color: T.textMuted, textDecoration: "line-through", marginBottom: 1 }}>₹{fmtINR(displayPrice ?? 0)}</div>
                                    )}
                                    <div style={{ fontWeight: 700, fontSize: 19, color: discount > 0 ? T.greenLt : T.white }}>
                                      ₹{fmtINR(Math.round((displayPrice ?? 0) * (1 - discount / 100)))}
                                    </div>
                                    {discount > 0 && (
                                      <div style={{ fontSize: 10.5, color: T.greenLt, fontWeight: 600, marginTop: 1 }}>{discount}% off applied</div>
                                    )}
                                    <div style={{ fontSize: 11, color: T.textMuted, marginTop: 2 }}>+GST · ₹{fmtINR(Math.round(Math.round((displayPrice ?? 0) * (1 - discount / 100)) * 1.18))} total</div>
                                    {isEnt && <div style={{ fontSize: 10.5, color: enterpriseAIBots ? T.greenLt : T.textMuted, marginTop: 2 }}>{enterpriseAIBots ? "incl. AI Bots" : "without AI Bots"}</div>}
                                  </div>
                                )}
                              </div>
                            </div>
                            {isSelected && isEnt && (
                              <div style={{ marginTop: 8, padding: "12px 16px", background: T.surfaceHigh, borderRadius: 9, border: `1px solid ${T.borderMed}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <div>
                                  <div style={{ fontSize: 13.5, fontWeight: 600, color: T.text }}>Include AI Chat Bots?</div>
                                  <div style={{ fontSize: 11.5, color: T.textMuted, marginTop: 2 }}>+₹15,000/month · Requires ChatGPT Plus subscription</div>
                                </div>
                                <div style={{ display: "flex", gap: 8 }}>
                                  <button onClick={e => { e.stopPropagation(); setEnterpriseAIBots(false); }} style={{ padding: "6px 14px", borderRadius: 6, border: `1.5px solid ${!enterpriseAIBots ? T.green : T.border}`, background: !enterpriseAIBots ? "rgba(23,160,102,0.1)" : "transparent", color: !enterpriseAIBots ? T.greenLt : T.textSub, cursor: "pointer", fontSize: 12.5, fontWeight: 600 }}>No</button>
                                  <button onClick={e => { e.stopPropagation(); setEnterpriseAIBots(true); }} style={{ padding: "6px 14px", borderRadius: 6, border: `1.5px solid ${enterpriseAIBots ? T.green : T.border}`, background: enterpriseAIBots ? "rgba(23,160,102,0.1)" : "transparent", color: enterpriseAIBots ? T.greenLt : T.textSub, cursor: "pointer", fontSize: 12.5, fontWeight: 600 }}>Yes</button>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </FField>
                </div>

                {/* ── Discount Module ── */}
                <div style={{ marginTop: 18, padding: "16px 18px", background: T.surfaceHigh, borderRadius: 11, border: `1px solid ${discount > 0 ? T.green : T.border}`, transition: "border-color 0.2s" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: discount > 0 ? 14 : 0 }}>
                    <div>
                      <div style={{ fontSize: 13.5, fontWeight: 600, color: T.text }}>Apply Discount</div>
                      <div style={{ fontSize: 11.5, color: T.textMuted, marginTop: 2 }}>Maximum 30% — applies to plan price only</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", justifyContent: "flex-end" }}>
                      {[0, 5, 10, 15, 20, 25, 30].map(v => (
                        <button key={v} onClick={() => setDiscount(v)} style={{ padding: "5px 11px", borderRadius: 6, border: `1.5px solid ${discount === v ? T.green : T.border}`, background: discount === v ? "rgba(23,160,102,0.15)" : "transparent", color: discount === v ? T.greenLt : T.textSub, cursor: "pointer", fontSize: 12, fontWeight: 600, transition: "all 0.12s" }}>
                          {v === 0 ? "None" : `${v}%`}
                        </button>
                      ))}
                      <div style={{ display: "flex", alignItems: "center", gap: 4, border: `1.5px solid ${![0,5,10,15,20,25,30].includes(discount) && discount > 0 ? T.green : T.border}`, borderRadius: 6, padding: "4px 8px", background: ![0,5,10,15,20,25,30].includes(discount) && discount > 0 ? "rgba(23,160,102,0.15)" : "transparent" }}>
                        <input
                          type="number" min={0} max={30} step={0.1}
                          value={discount === 0 ? "" : discount}
                          onChange={e => {
                            const val = parseFloat(e.target.value);
                            if (e.target.value === "") { setDiscount(0); return; }
                            if (!isNaN(val) && val >= 0 && val <= 30) setDiscount(Math.round(val * 10) / 10);
                          }}
                          placeholder="e.g. 12.5"
                          onClick={e => e.stopPropagation()}
                          style={{ width: 60, background: "transparent", border: "none", outline: "none", color: T.greenLt, fontSize: 12, fontWeight: 600, fontFamily: "inherit" }}
                        />
                        <span style={{ fontSize: 12, color: T.textMuted }}>%</span>
                      </div>
                    </div>
                  </div>
                  {discount > 0 && (
                    <div style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 12, borderTop: `1px solid ${T.border}` }}>
                      <div style={{ flex: 1, position: "relative" }}>
                        <input
                          type="range" min={0} max={30} step={0.1} value={discount}
                          onChange={e => setDiscount(Math.round(Number(e.target.value) * 10) / 10)}
                          style={{ width: "100%", accentColor: T.green, cursor: "pointer" }}
                        />
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: T.textMuted, marginTop: 2 }}>
                          <span>0%</span><span>5%</span><span>10%</span><span>15%</span><span>20%</span><span>25%</span><span>30%</span>
                        </div>
                      </div>
                      <div style={{ textAlign: "right", flexShrink: 0, minWidth: 90 }}>
                        <div style={{ fontSize: 22, fontWeight: 800, color: T.greenLt }}>{discount}%</div>
                        <div style={{ fontSize: 11, color: T.textMuted }}>discount</div>
                      </div>
                    </div>
                  )}
                  {discount > 0 && (
                    <div style={{ marginTop: 12, padding: "10px 14px", background: "rgba(23,160,102,0.06)", borderRadius: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 12.5, color: T.textSub }}>Plan price after {discount}% discount</span>
                      <div style={{ textAlign: "right" }}>
                        <span style={{ fontSize: 12, color: T.textMuted, textDecoration: "line-through", marginRight: 8 }}>₹{fmtINR(planPriceOriginal)}</span>
                        <span style={{ fontSize: 15, fontWeight: 700, color: T.greenLt }}>₹{fmtINR(planPrice)}</span>
                      </div>
                    </div>
                  )}
                </div>

                <NavBtns prev={() => setStep(1)} next={() => setStep(3)} />
              </PanelCard>
            </>
          )}

          {/* ── Step 3 ── */}
          {step === 3 && (
            <>
              <StepHead title="Add-on Features" sub="Select optional add-ons. Prices shown for your selected billing cycle." />
              <PanelCard>
                {ADDON_GROUPS.map(group => (
                  <div key={group.group} style={{ marginBottom: 22 }}>
                    <div style={{ fontSize: 10.5, color: T.textMuted, textTransform: "uppercase", letterSpacing: 1.8, fontWeight: 700, marginBottom: 8, paddingBottom: 6, borderBottom: `1px solid ${T.border}` }}>{group.group}</div>
                    <div style={{ display: "grid", gap: 7 }}>
                      {group.items.map(a => {
                        const dispPrice = getAddonDisplayPrice(a);
                        const on = addons.includes(a.id);
                        const hasIframe = !!a.iframeYearly;
                        const iframeSel = iframeSelections[a.id] || "standard";
                        return (
                          <div key={a.id} style={{ borderRadius: 9, border: `1.5px solid ${on ? T.green : T.border}`, background: on ? "rgba(23,160,102,0.05)" : "#0d1520", transition: "all 0.12s", overflow: "hidden" }}>
                            <div onClick={() => toggleAddon(a.id)} style={{ padding: "10px 14px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                              <div style={{ display: "flex", alignItems: "flex-start", gap: 10, flex: 1 }}>
                                <div style={{ width: 16, height: 16, borderRadius: 4, border: `2px solid ${on ? T.green : T.borderMed}`, background: on ? T.green : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#fff", fontSize: 10, fontWeight: 700, marginTop: 2 }}>{on && "✓"}</div>
                                <div>
                                  <div style={{ fontSize: 13, color: on ? T.text : T.textSub }}>{a.label}</div>
                                  {a.note && <div style={{ fontSize: 11, color: T.textMuted, marginTop: 2 }}>{a.note}</div>}
                                </div>
                              </div>
                              <div style={{ fontSize: 12, color: T.greenLt, fontWeight: 600, whiteSpace: "nowrap", textAlign: "right", flexShrink: 0 }}>{dispPrice}</div>
                            </div>
                            {on && hasIframe && (
                              <div onClick={e => e.stopPropagation()} style={{ borderTop: `1px solid ${T.border}`, padding: "8px 14px 10px 40px", display: "flex", alignItems: "center", gap: 10, background: "rgba(23,160,102,0.03)" }}>
                                <span style={{ fontSize: 11.5, color: T.textSub }}>Integration type:</span>
                                <select
                                  value={iframeSel}
                                  onChange={e => setIframeSelections(p => ({ ...p, [a.id]: e.target.value }))}
                                  style={{ background: "#0d1520", border: `1px solid ${T.border}`, borderRadius: 6, color: T.text, fontSize: 12, padding: "4px 10px", cursor: "pointer", outline: "none" }}
                                >
                                  <option value="standard">Without iframe — {effectiveBilling === "yearly" ? `₹${fmtINR(a.yearly)}/yr` : `₹${fmtINR(a.quarterly)}/qtr`}</option>
                                  <option value="iframe">With iframe — ₹{fmtINR(a.iframeYearly)}/yr</option>
                                </select>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}

                {/* Custom Add-on Section */}
                <div style={{ marginTop: 8, marginBottom: 16 }}>
                  <div style={{ fontSize: 10.5, color: T.textMuted, textTransform: "uppercase", letterSpacing: 1.8, fontWeight: 700, marginBottom: 10, paddingBottom: 6, borderBottom: `1px solid ${T.border}` }}>Custom Add-on</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto auto", gap: 8, alignItems: "center" }}>
                    <input
                      value={newCustomAddon.label}
                      onChange={e => setNewCustomAddon(p => ({ ...p, label: e.target.value }))}
                      placeholder="Add-on name / description"
                      style={{ ...baseInput, fontSize: 13, padding: "9px 12px" }}
                      onClick={e => e.stopPropagation()}
                    />
                    <input
                      value={newCustomAddon.price}
                      onChange={e => setNewCustomAddon(p => ({ ...p, price: e.target.value }))}
                      placeholder="Price (e.g. 5000)"
                      style={{ ...baseInput, fontSize: 13, padding: "9px 12px", width: 140 }}
                      onClick={e => e.stopPropagation()}
                    />
                    <select
                      value={newCustomAddon.billing}
                      onChange={e => setNewCustomAddon(p => ({ ...p, billing: e.target.value }))}
                      style={{ ...baseInput, fontSize: 13, padding: "9px 12px", width: 130, cursor: "pointer" }}
                      onClick={e => e.stopPropagation()}
                    >
                      <option value="monthly">Monthly</option>
                      <option value="quarterly">Quarterly</option>
                      <option value="yearly">Yearly</option>
                      <option value="one-time">One-Time</option>
                      <option value="custom">Custom</option>
                    </select>
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        if (!newCustomAddon.label.trim()) return;
                        setCustomAddonsList(p => [...p, { ...newCustomAddon, id: `custom_${Date.now()}` }]);
                        setNewCustomAddon({ label: "", price: "", billing: "custom" });
                      }}
                      style={{ background: T.green, border: "none", borderRadius: 8, color: "#fff", fontWeight: 700, fontSize: 13, padding: "9px 16px", cursor: "pointer", whiteSpace: "nowrap" }}
                    >+ Add</button>
                  </div>
                  {customAddonsList.length > 0 && (
                    <div style={{ marginTop: 10, display: "grid", gap: 6 }}>
                      {customAddonsList.map(ca => (
                        <div key={ca.id} style={{ padding: "9px 14px", borderRadius: 8, border: `1.5px solid ${T.green}`, background: "rgba(23,160,102,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <div style={{ fontSize: 13, color: T.text }}>{ca.label}</div>
                          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                            <span style={{ fontSize: 12, color: T.greenLt, fontWeight: 600 }}>
                              {ca.price ? `₹${Number(ca.price).toLocaleString("en-IN")}` : "—"} · {ca.billing}
                            </span>
                            <button onClick={e => { e.stopPropagation(); setCustomAddonsList(p => p.filter(x => x.id !== ca.id)); }} style={{ background: "none", border: "none", color: "#f87171", cursor: "pointer", fontSize: 13, padding: 0 }}>✕</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {(addons.length > 0 || customAddonsList.length > 0) && (
                  <div style={{ marginTop: 18, padding: "16px 18px", background: T.surfaceHigh, borderRadius: 10, border: `1px solid ${T.border}` }}>
                    <div style={{ fontSize: 10.5, color: T.textMuted, textTransform: "uppercase", letterSpacing: 1.5, fontWeight: 600, marginBottom: 12 }}>Running Total</div>
                    <div style={{ fontSize: 13, color: T.textSub, display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
                      <span>{planData.name} Plan</span><span>₹{fmtINR(planPrice)}</span>
                    </div>
                    {numericAddons.map(a => (
                      <div key={a.id} style={{ fontSize: 12.5, color: T.textMuted, display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                        <span>{a.label}</span><span>₹{fmtINR(getAddonPrice(a))}</span>
                      </div>
                    ))}
                    {customAddonsList.map(ca => (
                      <div key={ca.id} style={{ fontSize: 12.5, color: T.textMuted, display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                        <span>{ca.label}</span><span>{ca.price ? `₹${Number(ca.price).toLocaleString("en-IN")} (${ca.billing})` : "Custom"}</span>
                      </div>
                    ))}
                    <div style={{ borderTop: `1px solid ${T.border}`, marginTop: 10, paddingTop: 10, display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: 14.5, color: T.greenLt }}>
                      <span>Total incl. 18% GST</span><span>₹{fmtINR(totalGST)}</span>
                    </div>
                  </div>
                )}
                <NavBtns prev={() => setStep(2)} next={() => setStep(4)} />
              </PanelCard>
            </>
          )}

          {/* ── Step 4 ── */}
          {step === 4 && (
            <>
              <StepHead title="Review & Generate" sub="Optionally add a scope note, verify the summary, then generate your quotation." />
              <PanelCard>
                <FField label="Scope of Work (optional)">
                  <textarea value={scope} onChange={e => setScope(e.target.value)} placeholder={`Describe deliverables per section. Use a header followed by colon for sections, e.g.:\n\nFor Sales:\nMulti-number team inbox\nNative WhatsApp-like app\n\nFor Marketing:\nCTWA Integration\nBulk broadcasts`} rows={8} style={{ ...baseInput, resize: "vertical", lineHeight: 1.65 }} />
                  <div style={{ marginTop: 6, fontSize: 11, color: T.textMuted }}>
                    💡 Lines ending with <code style={{ background: "#0d1520", padding: "1px 5px", borderRadius: 3, color: T.greenLt }}>:</code> become section headers. All other lines become bullet points automatically in the PDF.
                  </div>
                </FField>
                <div style={{ marginTop: 24, background: T.surfaceHigh, borderRadius: 11, border: `1px solid ${T.border}`, overflow: "hidden" }}>
                  <div style={{ padding: "13px 20px", borderBottom: `1px solid ${T.border}` }}>
                    <span style={{ fontSize: 10.5, color: T.textMuted, textTransform: "uppercase", letterSpacing: 1.5, fontWeight: 600 }}>Quotation Summary</span>
                  </div>
                  <div style={{ padding: "18px 20px" }}>
                    {[["Client", clientName], ["Company", companyName], email && ["Email", email], ["Plan", `${planData.name} · ${effectiveBillingLabel}`], ["Plan Price", `₹${fmtINR(planPrice)} + 18% GST`], plan === "enterprise" && ["Enterprise Type", enterpriseAIBots ? "With AI Bots" : "Without AI Bots"], addons.length > 0 && ["Add-ons", `${addons.length} selected`]].filter(Boolean).map(([l, v]) => (
                      <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${T.border}` }}>
                        <span style={{ color: T.textMuted, fontSize: 13 }}>{l}</span>
                        <span style={{ color: T.text, fontSize: 13, fontWeight: 500 }}>{v}</span>
                      </div>
                    ))}
                    <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 14, paddingBottom: 2 }}>
                      <span style={{ color: T.textSub, fontSize: 15, fontWeight: 600 }}>Grand Total (incl. GST)</span>
                      <span style={{ color: T.greenLt, fontSize: 17, fontWeight: 700 }}>₹{fmtINR(totalGST)}</span>
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: 28, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <button onClick={() => setStep(3)} style={{ padding: "10px 20px", background: "transparent", border: `1px solid ${T.borderMed}`, borderRadius: 8, color: T.textSub, cursor: "pointer", fontSize: 13 }}>← Back</button>
                  <button onClick={() => setPreview(true)} style={{ padding: "12px 34px", background: `linear-gradient(135deg, ${T.green}, ${T.greenDk})`, border: "none", borderRadius: 9, color: "#fff", cursor: "pointer", fontSize: 14, fontWeight: 700, letterSpacing: 0.3 }}>
                    Generate Quotation →
                  </button>
                </div>
              </PanelCard>
            </>
          )}
        </div>
      ) : (
        <div style={{ background: "#dde3e8", padding: "36px 20px 72px" }}>
          <PrintDoc />
        </div>
      )}
    </div>
  );
}

/* ─── Print sub-components ─── */
function PrintPageHeader({ title, sub, clientLogo, companyName }) {
  return (
    <div style={{ background: `linear-gradient(135deg, #0b5235 0%, #0e7048 100%)`, padding: "15px 56px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div>
        <div style={{ fontFamily: "'EB Garamond', serif", fontSize: 19, fontWeight: 600, color: "#fff" }}>{title}</div>
        <div style={{ fontSize: 11.5, color: "rgba(255,255,255,0.6)", marginTop: 1 }}>{sub}</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {clientLogo ? (
          <div style={{ background: "#ffffff", borderRadius: 7, padding: "5px 14px", display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: 36, minWidth: 70, boxShadow: "0 1px 6px rgba(0,0,0,0.15)" }}>
            <img src={clientLogo} alt="Client" style={{ maxHeight: 24, maxWidth: 100, objectFit: "contain", display: "block" }} />
          </div>
        ) : companyName ? (
          <div style={{ background: "#ffffff", borderRadius: 7, padding: "6px 14px", display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: 36 }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: "#0b5235", letterSpacing: 1, textTransform: "uppercase" }}>{companyName}</span>
          </div>
        ) : null}
        <div style={{ background: "#ffffff", borderRadius: 7, padding: "5px 12px", display: "inline-flex", alignItems: "center", boxShadow: "0 1px 6px rgba(0,0,0,0.15)" }}>
          <img src={DOUBLETICK_LOGO} alt="DoubleTick" style={{ height: 20, display: "block", objectFit: "contain" }} />
        </div>
      </div>
    </div>
  );
}

function PrintSection({ title, children }) {
  return (
    <div style={{ marginBottom: 20, breakInside: "avoid" }}>
      <div style={{ fontFamily: "'EB Garamond', serif", fontSize: 16.5, fontWeight: 600, color: "#0b5235", paddingBottom: 7, borderBottom: "1.5px solid #a7f0c8", marginBottom: 14 }}>{title}</div>
      {children}
    </div>
  );
}

function PrintFooter() {
  return (
    <div style={{ background: "#f4f7f5", borderTop: "2px solid #1aad74", padding: "10px 56px", display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16 }}>
      <img src={DOUBLETICK_LOGO} alt="DoubleTick" style={{ height: 18, objectFit: "contain", display: "block" }} />
      <div style={{ fontSize: 10, color: "#9ca3af", letterSpacing: 0.5 }}>doubletick.io &nbsp;·&nbsp; Meta Business Partner &nbsp;·&nbsp; ISO 27001 Certified &nbsp;·&nbsp; EU GDPR Compliant</div>
    </div>
  );
}

/* ─── Builder UI helpers ─── */
function StepHead({ title, sub }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <h2 style={{ fontFamily: "'EB Garamond', serif", fontSize: 27, fontWeight: 600, margin: "0 0 6px", color: "#fff" }}>{title}</h2>
      <p style={{ margin: 0, color: "#4a6070", fontSize: 14 }}>{sub}</p>
    </div>
  );
}
function PanelCard({ children }) {
  return <div style={{ background: "#111820", border: "1px solid #1c2836", borderRadius: 14, padding: "28px 28px 24px" }}>{children}</div>;
}
function FField({ label, children }) {
  return (
    <div>
      <label style={{ display: "block", fontSize: 11.5, color: "#4a6070", fontWeight: 600, letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 8 }}>{label}</label>
      {children}
    </div>
  );
}
function NavBtns({ prev, next, nextDisabled }) {
  return (
    <div style={{ marginTop: 28, display: "flex", justifyContent: prev ? "space-between" : "flex-end" }}>
      {prev && <button onClick={prev} style={{ padding: "10px 20px", background: "transparent", border: "1px solid #243242", borderRadius: 8, color: "#6d8497", cursor: "pointer", fontSize: 13 }}>← Back</button>}
      {next && <button onClick={next} disabled={nextDisabled} style={{ padding: "10px 26px", background: nextDisabled ? "#1c2836" : `linear-gradient(135deg, #17a066, #0d7a4e)`, border: "none", borderRadius: 8, color: nextDisabled ? "#3d5264" : "#fff", cursor: nextDisabled ? "not-allowed" : "pointer", fontSize: 13, fontWeight: 600 }}>Continue →</button>}
    </div>
  );
}

/* ─── Print table cell styles ─── */
const pTdc = { padding: "10px 14px", textAlign: "center", fontSize: 12.5, borderBottom: "1px solid #e5e7eb", color: "#9ca3af", width: 44 };
const pTdl = { padding: "10px 16px", textAlign: "left", fontSize: 12.5, borderBottom: "1px solid #e5e7eb", color: "#374151" };
const pTdr = { padding: "10px 16px", textAlign: "right", fontSize: 12.5, borderBottom: "1px solid #e5e7eb", color: "#111827" };
