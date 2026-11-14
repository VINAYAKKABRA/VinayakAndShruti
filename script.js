/**
 * ROYAL WEDDING EXPERIENCE JAVASCRIPT
 * Couple: Vinayak & Shruti (#TwoHeartsOneViSh)
 * Venue: Goenka Farm, Nagpur (02 & 03 December 2026)
 */

document.addEventListener('DOMContentLoaded', () => {
  initLanguage();
  initCountdown();
  initItinerary();
  initAmbientAudio();
  initNavigation();
  initPetalEffect();
});

/* ==========================================================================
   1. BILINGUAL DICTIONARY & LANGUAGE ENGINE
   ========================================================================== */
const I18N = {
  en: {
    // Navigation
    nav_home: "Home",
    nav_itinerary: "Itinerary",
    nav_venue: "Venue & Map",

    // Hero
    ganesh_invocation_1: "|| Shri Ganeshay Namah ||",
    ganesh_invocation_2: "|| Jai Shri Dadaji Ki ||",
    ganesh_invocation: "|| Shri Ganeshay Namah ||\n|| Jai Shri Dadaji Ki ||",
    dadaji_grace: "By the boundless grace of Shri Dadaji Maharaj",
    groom_name: "Vinayak",
    weds: "weds",
    bride_name: "Shruti",
    hashtag: "#TwoHeartsOneViSh",
    wedding_dates: "02 & 03 December 2026",
    wedding_venue_short: "Goenka Farm, Nagpur",
    countdown_heading: "Celebrations Begin In",
    days: "Days",
    hours: "Hours",
    mins: "Minutes",
    secs: "Seconds",
    btn_explore_itinerary: "Explore Itinerary",
    btn_get_directions: "Get Directions",

    // Itinerary Section
    itinerary_badge: "Royal Program Guide",
    itinerary_title: "Wedding Itinerary & Celebrations",
    tab_all: "All Celebrations (8)",
    tab_day1: "Day 1: Dec 02 (Carnival, Mayra, Sangeet)",
    tab_day2: "Day 2: Dec 03 (Nikasi, Swagat, Varmala, Phere, Reception)",
    results_showing: "Showing",
    results_of: "of 8 celebrations",
    no_events_found: "No celebrations match your search query.",
    btn_reset_search: "Reset Search",

    // Event Card Labels
    label_date: "Date:",
    label_time: "Time:",
    label_venue: "Venue:",
    btn_view_location: "View Location on Map",

    // Venue Section
    venue_badge: "Destination & Logistics",
    venue_title: "Venue & Campus Navigation",
    venue_subtitle: "Goenka Farm is an expansive destination resort situated along National Highway 6, Nagpur.",
    venue_name: "Goenka Farm, Nagpur",
    venue_full_addr: "National Highway 6, Mahalgaon (Near Kamptee / Bhandara Road), Nagpur, Maharashtra - 441104",
    btn_open_maps: "Open in Google Maps",
    btn_gps_directions: "GPS Directions",
    btn_copy_address: "Copy Address",
    point_airport: "Nagpur International Airport (NAG)",
    point_airport_desc: "~26 km | Approx. 35-40 mins drive via Outer Ring Road",
    point_railway: "Nagpur Junction Railway Station",
    point_railway_desc: "~18 km | Approx. 25-30 mins drive via Bhandara Road",
    point_stay: "Resort Stay & NR Wing",
    point_stay_desc: "Dedicated guest villas, suites & hospitality desk on-site",
    subvenue_ocean: "Ocean Theme Park",
    subvenue_ocean_desc: "Carnival festivities & games",
    subvenue_royal_hall: "Royal Hall",
    subvenue_royal_hall_desc: "Phere & Groom Side Mayra",
    subvenue_t_hall: "T Hall",
    subvenue_t_hall_desc: "Bride Side Mayra Ceremony",
    subvenue_varmala: "Wavepool",
    subvenue_varmala_desc: "Baraat Swagat & Varmala Ceremony",
    subvenue_sangeet: "Sangeet Lawn",
    subvenue_sangeet_desc: "Grand Sangeet Sandhya Musical Night",
    subvenue_nikasi: "NR Building",
    subvenue_nikasi_desc: "Nikasi Procession & Guest Stays",
    subvenue_reception: "Main Lawn",
    subvenue_reception_desc: "Swagat Samaroh (Reception Banquet)",

    // Footer
    footer_note: "Your presence, blessings, and warm smiles are the most cherished gifts as Vinayak & Shruti begin their eternal journey of love and togetherness.",
    footer_copy: "Celebrated with love by Kabra & Sikchi Parivar • Goenka Farm, Nagpur",

    // Toasts & Alerts
    toast_link_copied: "Website link copied to clipboard!",
    toast_addr_copied: "Goenka Farm address copied to clipboard!"
  },

  hi: {
    // Navigation
    nav_home: "मुख्य पृष्ठ",
    nav_itinerary: "कार्यक्रम विवरण",
    nav_venue: "स्थान एवं मार्ग",

    // Hero
    ganesh_invocation_1: "|| श्री गणेशाय नमः ||",
    ganesh_invocation_2: "|| जय श्री दादाजी की ||",
    ganesh_invocation: "|| श्री गणेशाय नमः ||\n|| जय श्री दादाजी की ||",
    dadaji_grace: "श्री दादाजी महाराज की असीम अनुकंपा से",
    groom_name: "विनायक",
    weds: "संग",
    bride_name: "श्रुति",
    hashtag: "#TwoHeartsOneViSh",
    wedding_dates: "02 | 03 दिसंबर 2026",
    wedding_venue_short: "गोयनका फार्म, नागपुर",
    countdown_heading: "मंगल बेला प्रारंभ होने में",
    days: "दिन",
    hours: "घंटे",
    mins: "मिनट",
    secs: "सेकंड",
    btn_explore_itinerary: "कार्यक्रम देखें",
    btn_get_directions: "मार्ग एवं दिशा",

    // Itinerary Section
    itinerary_badge: "मांगलिक उत्सव",
    itinerary_title: "विवाह कार्यक्रम रूपरेखा",
    itinerary_subtitle: "दो दिवसीय भव्य उत्सव के सभी कार्यक्रमों, समय व स्थान की संपूर्ण जानकारी।",
    search_placeholder: "कार्यक्रम, स्थान, दिनांक या समय खोजें...",
    tab_all: "सभी कार्यक्रम (8)",
    tab_day1: "दिवस 1: 02 दिसं (कार्निवल, मायरा, संगीत)",
    tab_day2: "दिवस 2: 03 दिसं (निकासी, बारात स्वागत, वरमाला, फेरे, स्वागत)",
    results_showing: "दिखाए जा रहे हैं",
    results_of: "कुल 8 कार्यक्रमों में से",
    no_events_found: "आपकी खोज के अनुसार कोई कार्यक्रम नहीं मिला।",
    btn_reset_search: "पुनः खोजें",

    // Event Card Labels
    label_date: "दिनांक:",
    label_time: "समय:",
    label_venue: "स्थान:",
    btn_view_location: "मैप एवं दिशा (Location)",

    // Venue Section
    venue_badge: "स्थान एवं व्यवस्था",
    venue_title: "गोयनका फार्म एवं परिसर मार्गदर्शन",
    venue_subtitle: "गोयनका फार्म राष्ट्रीय राजमार्ग 6 पर स्थित नागपुर का एक भव्य एवं सुसज्जित रिसॉर्ट परिसर है।",
    venue_name: "गोयनका फार्म, नागपुर",
    venue_full_addr: "राष्ट्रीय राजमार्ग 6, महलगांव (कामठी / भंडारा रोड के समीप), नागपुर, महाराष्ट्र - 441104",
    btn_open_maps: "गूगल मैप पर देखें",
    btn_gps_directions: "मार्ग एवं दिशा (GPS)",
    btn_copy_address: "पता कॉपी करें",
    point_airport: "डॉ. बाबासाहेब आंबेडकर अंतरराष्ट्रीय विमानक्षेत्र",
    point_airport_desc: "~26 किमी | आउटर रिंग रोड द्वारा लगभग 35-40 मिनट",
    point_railway: "नागपुर जंक्शन रेलवे स्टेशन",
    point_railway_desc: "~18 किमी | भंडारा रोड द्वारा लगभग 25-30 मिनट",
    point_stay: "आवास एवं एन.आर विंग",
    point_stay_desc: "परिसर में सुसज्जित विला, कक्ष एवं अतिथि स्वागत कक्ष",
    subvenue_ocean: "ओसियन थीम पार्क",
    subvenue_ocean_desc: "कार्निवल उत्सव एवं खेलकूद",
    subvenue_royal_hall: "रॉयल हॉल",
    subvenue_royal_hall_desc: "मंगल फेरे एवं वर पक्ष मायरा",
    subvenue_t_hall: "टी हॉल",
    subvenue_t_hall_desc: "वधू पक्ष मायरा (भात)",
    subvenue_varmala: "वेवपूल",
    subvenue_varmala_desc: "बारात स्वागत एवं भव्य वरमाला समारोह",
    subvenue_sangeet: "संगीत लॉन",
    subvenue_sangeet_desc: "भव्य संगीत संध्या",
    subvenue_nikasi: "एन.आर बिल्डिंग",
    subvenue_nikasi_desc: "निकासी (बारात प्रस्थान) एवं अतिथि निवास",
    subvenue_reception: "मुख्य लॉन",
    subvenue_reception_desc: "स्वागत समारोह (प्रीतिभोज)",

    // Footer
    footer_note: "इस पावन मांगलिक बेला पर पधारकर नवयुगल को अपना शुभाशीर्वाद प्रदान कर हमें अनुगृहीत करें।",
    footer_copy: "काबरा एवं सिकची परिवार • गोयनका फार्म, नागपुर",

    // Toasts & Alerts
    toast_link_copied: "वेबसाइट लिंक कॉपी हो गया!",
    toast_addr_copied: "गोयनका फार्म का पता कॉपी हो गया!"
  }
};

let currentLang = 'en'; // DEFAULT IS ENGLISH

function initLanguage() {
  const savedLang = localStorage.getItem('wedding_lang') || 'en';
  setLanguage(savedLang);

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetLang = e.target.getAttribute('data-lang');
      if (targetLang) setLanguage(targetLang);
    });
  });
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('wedding_lang', lang);

  // Sync document lang and body class
  document.documentElement.lang = lang;
  if (document.body) {
    document.body.classList.toggle('lang-hi', lang === 'hi');
    document.body.classList.toggle('lang-en', lang === 'en');
  }

  // Update active state on toggle buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    if (btn.getAttribute('data-lang') === lang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Apply translations to all data-i18n elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (I18N[lang] && I18N[lang][key]) {
      el.textContent = I18N[lang][key];
    }
  });

  // Apply placeholder translations
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (I18N[lang] && I18N[lang][key]) {
      el.setAttribute('placeholder', I18N[lang][key]);
    }
  });

  // Re-render itinerary cards with current language
  if (typeof renderEvents === 'function') {
    renderEvents();
  }
}

/* ==========================================================================
   2. WEDDING ITINERARY DATA & FILTERING
   ========================================================================== */
const EVENTS_DATA = [
  {
    id: "carnival",
    day: "day1",
    dayBadge_en: "Wednesday, 02 December 2026",
    dayBadge_hi: "बुधवार, 02 दिसंबर 2026",
    title_en: "Carnival!!",
    title_hi: "कार्निवल!!",
    time_en: "11:30 AM Onwards",
    time_hi: "सुबह 11:30 बजे से",
    venue_en: "Ocean Theme Park, Goenka Farm",
    venue_hi: "ओसियन थीम पार्क, गोयनका फार्म",
    mapUrl: "https://maps.app.goo.gl/wEuBEfCRNGwN46Ki9",
    art: "assets/img/carnival_tent.png",
    tags: ["carnival", "games", "music", "day1", "ocean", "theme park", "dec 2", "morning"]
  },
  {
    id: "mayra",
    day: "day1",
    dayBadge_en: "Wednesday, 02 December 2026",
    dayBadge_hi: "बुधवार, 02 दिसंबर 2026",
    title_en: "Mayra",
    title_hi: "मायरा",
    time_en: "3:00 PM Onwards",
    time_hi: "दोपहर 3:00 बजे से",
    venue_en: "Groom Side: Royal Hall | Bride Side: T Hall",
    venue_hi: "वर पक्ष: रॉयल हॉल | वधू पक्ष: टी हॉल",
    art: "assets/img/mayra_ceremony.png",
    dualMap: true,
    mapLinks: [
      {
        url: "https://maps.app.goo.gl/WsxpwravFLjAMfkU9",
        label_en: "Royal Hall (Groom Side Mayra)",
        label_hi: "रॉयल हॉल (वर पक्ष मायरा)"
      },
      {
        url: "https://maps.app.goo.gl/eamQWCzf3pmo1VXo6",
        label_en: "T Hall (Bride Side Mayra)",
        label_hi: "टी हॉल (वधू पक्ष मायरा)"
      }
    ],
    tags: ["mayra", "bhat", "traditional", "day1", "royal hall", "t hall", "somani", "dec 2", "afternoon", "groom", "bride"]
  },
  {
    id: "sangeet",
    day: "day1",
    dayBadge_en: "Wednesday, 02 December 2026",
    dayBadge_hi: "बुधवार, 02 दिसंबर 2026",
    title_en: "Sangeet Sandhya",
    title_hi: "संगीत संध्या",
    time_en: "7:30 PM Onwards",
    time_hi: "शाम 7:30 बजे से",
    venue_en: "Main Lawn, Goenka Farm",
    venue_hi: "मुख्य लॉन, गोयनका फार्म",
    mapUrl: "https://maps.app.goo.gl/vqdk8gpwUs3j4wL76",
    art: "assets/img/sangeet_couple.png",
    tags: ["sangeet", "dance", "dj", "night", "music", "day1", "main lawn", "dec 2", "evening"]
  },
  {
    id: "nikasi",
    day: "day2",
    dayBadge_en: "Thursday, 03 December 2026",
    dayBadge_hi: "गुरुवार, 03 दिसंबर 2026",
    title_en: "Nikasi (Baraat Departure)",
    title_hi: "निकासी",
    time_en: "9:30 AM Onwards",
    time_hi: "सुबह 9:30 बजे से",
    venue_en: "NR Building, Goenka Farm",
    venue_hi: "एन.आर बिल्डिंग, गोयनका फार्म",
    mapUrl: "https://maps.app.goo.gl/7PsHjgx6YdAcdi4V9",
    art: "assets/img/nikasi_horse.png",
    tags: ["nikasi", "baraat", "ghodi", "dhol", "day2", "nr building", "dec 3", "morning"]
  },
  {
    id: "baraat_swagat",
    day: "day2",
    dayBadge_en: "Thursday, 03 December 2026",
    dayBadge_hi: "गुरुवार, 03 दिसंबर 2026",
    title_en: "Baraat Swagat",
    title_hi: "बारात स्वागत",
    time_en: "11:00 AM",
    time_hi: "सुबह 11:00 बजे",
    venue_en: "Wavepool Side, Goenka Farm",
    venue_hi: "वेवपूल साइड, गोयनका फार्म",
    mapUrl: "https://maps.app.goo.gl/HTzDcDdaKdifwyDs7",
    art: "assets/img/baraat_swagat.png",
    tags: ["baraat", "swagat", "welcome", "wavepool", "pool", "side", "day2", "dec 3", "morning"]
  },
  {
    id: "varmala",
    day: "day2",
    dayBadge_en: "Thursday, 03 December 2026",
    dayBadge_hi: "गुरुवार, 03 दिसंबर 2026",
    title_en: "Varmala Ceremony",
    title_hi: "वरमाला समारोह",
    time_en: "11:15 AM Onwards",
    time_hi: "सुबह 11:15 बजे से",
    venue_en: "Wavepool, Goenka Farm",
    venue_hi: "वेवपूल, गोयनका फार्म",
    mapUrl: "https://maps.app.goo.gl/HTzDcDdaKdifwyDs7",
    art: "assets/img/hastamelap_hands.png",
    tags: ["varmala", "wavepool", "pool", "garland", "stage", "day2", "dec 3", "morning"]
  },
  {
    id: "phere",
    day: "day2",
    dayBadge_en: "Thursday, 03 December 2026",
    dayBadge_hi: "गुरुवार, 03 दिसंबर 2026",
    title_en: "Panigrahan & Mangal Phere",
    title_hi: "पाणिग्रहण एवं मंगल फेरे",
    time_en: "11:45 AM Auspicious Muhurat",
    time_hi: "शुभ मुहूर्त: सुबह 11:45 बजे",
    venue_en: "Royal Hall, Goenka Farm",
    venue_hi: "रॉयल हॉल, गोयनका फार्म",
    mapUrl: "https://maps.app.goo.gl/WsxpwravFLjAMfkU9",
    art: "assets/img/phere_couple.png",
    tags: ["phere", "wedding", "panigrahan", "varmala", "sacred", "day2", "royal hall", "dec 3", "noon"]
  },
  {
    id: "reception",
    day: "day2",
    dayBadge_en: "Thursday, 03 December 2026",
    dayBadge_hi: "गुरुवार, 03 दिसंबर 2026",
    title_en: "Swagat Samaroh (Reception)",
    title_hi: "स्वागत समारोह",
    time_en: "7:00 PM to 10:00 PM",
    time_hi: "शाम 7:00 से 10:00 बजे तक",
    venue_en: "Main Lawn, Goenka Farm",
    venue_hi: "मुख्य लॉन, गोयनका फार्म",
    mapUrl: "https://maps.app.goo.gl/LtBnkYUiBihqXVHP9",
    art: "assets/img/reception_couple.png",
    tags: ["reception", "swagat", "dinner", "banquet", "day2", "main lawn", "dec 3", "night"]
  }
];

let activeFilterDay = 'all';
let searchQuery = '';

function initItinerary() {
  const searchInput = document.getElementById('itinerarySearchInput');
  const clearBtn = document.getElementById('searchClearBtn');
  const tabs = document.querySelectorAll('.tab-btn');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      if (clearBtn) {
        clearBtn.style.display = searchQuery ? 'block' : 'none';
      }
      renderEvents();
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (searchInput) {
        searchInput.value = '';
        searchQuery = '';
        clearBtn.style.display = 'none';
        renderEvents();
      }
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeFilterDay = tab.getAttribute('data-day') || 'all';
      renderEvents();
    });
  });

  renderEvents();
}

function renderEvents() {
  const grid = document.getElementById('eventsGrid');
  const countDisplay = document.getElementById('filterCount');
  if (!grid) return;

  const isHindi = (currentLang === 'hi');

  const filtered = EVENTS_DATA.filter(ev => {
    // Day filter
    if (activeFilterDay !== 'all' && ev.day !== activeFilterDay) {
      return false;
    }

    // Search query filter
    if (searchQuery) {
      const matchText = [
        ev.title_en,
        ev.title_hi,
        ev.venue_en,
        ev.venue_hi,
        ev.time_en,
        ev.time_hi,
        ev.dayBadge_en,
        ev.dayBadge_hi,
        ...ev.tags
      ].join(' ').toLowerCase();

      return matchText.includes(searchQuery);
    }

    return true;
  });

  if (countDisplay) {
    const showingText = I18N[currentLang].results_showing || 'Showing';
    const ofText = I18N[currentLang].results_of || 'of 8 celebrations';
    countDisplay.textContent = `${showingText} ${filtered.length} ${ofText}`;
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="no-events-state">
        <i class="fa-solid fa-calendar-xmark"></i>
        <h3>${I18N[currentLang].no_events_found || 'No celebrations found'}</h3>
        <p style="color:var(--color-text-muted); margin-top:0.5rem;">Try a different keyword or reset filters.</p>
        <button class="btn-royal-outline" style="margin-top:1.2rem;" onclick="resetItinerarySearch()">
          ${I18N[currentLang].btn_reset_search || 'Reset Search'}
        </button>
      </div>
    `;
    return;
  }

  const labelDate = isHindi ? I18N.hi.label_date : I18N.en.label_date;
  const labelTime = isHindi ? I18N.hi.label_time : I18N.en.label_time;
  const labelVenue = isHindi ? I18N.hi.label_venue : I18N.en.label_venue;
  const btnLocation = isHindi ? I18N.hi.btn_view_location : I18N.en.btn_view_location;

  grid.innerHTML = filtered.map(ev => {
    const title = isHindi ? ev.title_hi : ev.title_en;
    const subTitle = isHindi ? ev.title_en : ev.title_hi;
    const dayBadge = isHindi ? ev.dayBadge_hi : ev.dayBadge_en;
    const time = isHindi ? ev.time_hi : ev.time_en;
    const venue = isHindi ? ev.venue_hi : ev.venue_en;

    let actionsHtml = '';
    if (ev.dualMap && ev.mapLinks) {
      actionsHtml = `
        <div class="event-actions dual-actions">
          ${ev.mapLinks.map(link => `
            <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="btn-royal-primary btn-event-map">
              <i class="fa-solid fa-diamond-turn-right"></i>
              <span>${isHindi ? link.label_hi : link.label_en}</span>
            </a>
          `).join('')}
        </div>
      `;
    } else {
      actionsHtml = `
        <div class="event-actions">
          <a href="${ev.mapUrl}" target="_blank" rel="noopener noreferrer" class="btn-royal-primary btn-event-map">
            <i class="fa-solid fa-diamond-turn-right"></i>
            <span>${btnLocation}</span>
          </a>
        </div>
      `;
    }

    return `
      <article class="event-card" id="event-${ev.id}">
        <div>
          <div class="event-header">
            <div class="event-title-group">
              <h3 class="event-title">${title}</h3>
              <div class="event-title-hi">${subTitle}</div>
            </div>
            ${ev.art ? `<img src="${ev.art}" alt="${ev.title_en}" class="event-art-thumb" loading="lazy" />` : ''}
          </div>

          <div class="event-meta">
            <div class="meta-item">
              <i class="fa-regular fa-calendar-days"></i>
              <span><strong>${labelDate}</strong> ${dayBadge}</span>
            </div>
            <div class="meta-item">
              <i class="fa-regular fa-clock"></i>
              <span><strong>${labelTime}</strong> ${time}</span>
            </div>
            <div class="meta-item">
              <i class="fa-solid fa-location-dot"></i>
              <span><strong>${labelVenue}</strong> ${venue}</span>
            </div>
          </div>
        </div>

        ${actionsHtml}
      </article>
    `;
  }).join('');
}

window.resetItinerarySearch = function () {
  const searchInput = document.getElementById('itinerarySearchInput');
  if (searchInput) searchInput.value = '';
  searchQuery = '';
  activeFilterDay = 'all';
  document.querySelectorAll('.tab-btn').forEach((btn, idx) => {
    btn.classList.toggle('active', idx === 0);
  });
  renderEvents();
};

/* ==========================================================================
   3. REAL-TIME COUNTDOWN TIMER
   ========================================================================== */
function initCountdown() {
  // Target: Carnival kick-off on 02 Dec 2026, 11:30 AM IST (UTC+05:30)
  const targetDate = new Date("2026-12-02T11:30:00+05:30").getTime();

  function update() {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
      const heading = document.getElementById('countdownHeading');
      if (heading) {
        heading.textContent = currentLang === 'hi' ? "मंगल विवाह उत्सव प्रारंभ हो चुका है!" : "The Celebrations Have Begun!";
      }
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    const dEl = document.getElementById('countDays');
    const hEl = document.getElementById('countHours');
    const mEl = document.getElementById('countMins');
    const sEl = document.getElementById('countSecs');

    if (dEl) dEl.textContent = String(d).padStart(2, '0');
    if (hEl) hEl.textContent = String(h).padStart(2, '0');
    if (mEl) mEl.textContent = String(m).padStart(2, '0');
    if (sEl) sEl.textContent = String(s).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}

/* ==========================================================================
   4. VENUE ADDRESS COPY HELPER
   ========================================================================== */
window.copyVenueAddress = function () {
  const addr = I18N[currentLang].venue_full_addr || "National Highway 6, Mahalgaon, Nagpur, Maharashtra - 441104";
  navigator.clipboard.writeText(addr).then(() => {
    showToast(I18N[currentLang].toast_addr_copied || 'Address copied!');
  }).catch(() => {
    showToast(addr);
  });
};

/* ==========================================================================
   5. AMBIENT ROYAL SYNTHESIZER & MUSIC CONTROLLER
   ========================================================================== */
let audioCtx = null;
let isAudioPlaying = false;
let synthInterval = null;

function initAmbientAudio() {
  const musicBtn = document.getElementById('btnMusicToggle');
  if (!musicBtn) return;

  musicBtn.addEventListener('click', () => {
    toggleAmbientMusic();
  });
}

function toggleAmbientMusic() {
  const musicBtn = document.getElementById('btnMusicToggle');
  const icon = musicBtn ? musicBtn.querySelector('i') : null;

  if (isAudioPlaying) {
    stopAmbientMusic();
    isAudioPlaying = false;
    if (musicBtn) musicBtn.classList.remove('playing');
    if (icon) icon.className = "fa-solid fa-volume-xmark";
    showToast(currentLang === 'hi' ? "संगीत बंद किया गया" : "Music Muted");
  } else {
    startAmbientMusic();
    isAudioPlaying = true;
    if (musicBtn) musicBtn.classList.add('playing');
    if (icon) icon.className = "fa-solid fa-music";
    showToast(currentLang === 'hi' ? "शाही शहनाई व सितार संगीत प्रारंभ" : "Playing Royal Wedding Ambiance");
  }
}

function startAmbientMusic() {
  let audioEl = document.getElementById('weddingAudioEl');
  if (!audioEl) {
    audioEl = new Audio('music.mp3');
    audioEl.id = 'weddingAudioEl';
    audioEl.loop = true;
    audioEl.volume = 0.55;
    document.body.appendChild(audioEl);
  }

  const playPromise = audioEl.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {
      startWebAudioSitarDrone();
    });
  }
}

function stopAmbientMusic() {
  const audioEl = document.getElementById('weddingAudioEl');
  if (audioEl) audioEl.pause();
  stopWebAudioSitarDrone();
}

function startWebAudioSitarDrone() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  const rootFreq = 138.59;
  const paFreq = 207.65;
  const saHigh = 277.18;

  const masterGain = audioCtx.createGain();
  masterGain.gain.setValueAtTime(0.08, audioCtx.currentTime);
  masterGain.connect(audioCtx.destination);

  const freqs = [rootFreq, rootFreq * 1.002, paFreq, saHigh];
  freqs.forEach(f => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(f, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
    osc.connect(gain);
    gain.connect(masterGain);
    osc.start();
  });

  const ragaPitches = [277.18, 311.13, 349.23, 392.00, 415.30, 466.16, 523.25, 554.37];
  synthInterval = setInterval(() => {
    if (!isAudioPlaying || !audioCtx) return;
    const note = ragaPitches[Math.floor(Math.random() * ragaPitches.length)];
    playSitarPluck(note, masterGain);
  }, 1800);
}

function playSitarPluck(freq, dest) {
  if (!audioCtx) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

  const t = audioCtx.currentTime;
  gain.gain.setValueAtTime(0, t);
  gain.gain.linearRampToValueAtTime(0.06, t + 0.05);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + 1.8);

  osc.connect(gain);
  gain.connect(dest);

  osc.start(t);
  osc.stop(t + 1.9);
}

function stopWebAudioSitarDrone() {
  if (synthInterval) {
    clearInterval(synthInterval);
    synthInterval = null;
  }
  if (audioCtx) {
    audioCtx.close();
    audioCtx = null;
  }
}

/* ==========================================================================
   6. NAVIGATION & GENERAL UI INTERACTION
   ========================================================================== */
function initNavigation() {
  const header = document.querySelector('.royal-header');
  const toggle = document.querySelector('.mobile-nav-toggle');
  const menu = document.querySelector('.nav-menu');

  function updateActiveNav() {
    const sections = ['hero', 'itinerary', 'venue'];
    const scrollPos = window.scrollY + 220;

    sections.forEach(id => {
      const sec = document.getElementById(id);
      if (!sec) return;
      const top = sec.offsetTop;
      const height = sec.offsetHeight;

      if (scrollPos >= top && scrollPos < top + height) {
        document.querySelectorAll(`.nav-link[href="#${id}"]`).forEach(l => l.classList.add('active'));
        document.querySelectorAll(`.dock-btn[href="#${id}"]`).forEach(l => l.classList.add('active'));
      } else {
        document.querySelectorAll(`.nav-link[href="#${id}"]`).forEach(l => l.classList.remove('active'));
        document.querySelectorAll(`.dock-btn[href="#${id}"]`).forEach(l => l.classList.remove('active'));
      }
    });
  }

  window.addEventListener('scroll', () => {
    if (header) {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
    updateActiveNav();
  }, { passive: true });

  updateActiveNav();

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('active');
      });
    });
  }
}

/* ==========================================================================
   7. GOLDEN PETAL SHOWER EFFECT
   ========================================================================== */
function initPetalEffect() {
  const canvas = document.getElementById('petalCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const petalsCount = window.innerWidth < 768 ? 16 : 28;
  const petals = [];

  for (let i = 0; i < petalsCount; i++) {
    petals.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 8 + 6,
      speedX: Math.random() * 1.2 - 0.6,
      speedY: Math.random() * 0.8 + 0.6,
      rotation: Math.random() * 360,
      rotSpeed: Math.random() * 1.5 - 0.75,
      color: Math.random() > 0.4 ? 'rgba(212, 175, 55, 0.45)' : 'rgba(243, 229, 171, 0.4)'
    });
  }

  function renderPetals() {
    ctx.clearRect(0, 0, width, height);

    petals.forEach(p => {
      p.y += p.speedY;
      p.x += Math.sin(p.y * 0.01) * 0.8 + p.speedX;
      p.rotation += p.rotSpeed;

      if (p.y > height + 20) {
        p.y = -20;
        p.x = Math.random() * width;
      }

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;

      ctx.beginPath();
      ctx.ellipse(0, 0, p.size * 0.6, p.size, Math.PI / 4, 0, 2 * Math.PI);
      ctx.fill();
      ctx.restore();
    });

    requestAnimationFrame(renderPetals);
  }

  renderPetals();
}

/* ==========================================================================
   8. TOAST NOTIFICATION HELPER
   ========================================================================== */
function showToast(message) {
  let toast = document.getElementById('weddingToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'weddingToast';
    toast.className = 'toast-msg';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color:var(--color-gold)"></i> <span>${message}</span>`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}
