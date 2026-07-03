/* ============================================================
   LIKITHA EPURI — PORTFOLIO JAVASCRIPT
   Features:
     - Loading screen
     - Smooth scroll
     - Navbar scroll effect
     - Typing animation
     - Intersection Observer (fade-in + skill bars)
     - Scroll progress bar
     - Back to top button
     - Mobile nav toggle
     - Contact form handler
     - Active nav link highlighting
   ============================================================ */

'use strict';

// ── DOM REFERENCES ──────────────────────────────────────────
const loader        = document.getElementById('loader');
const scrollProg    = document.getElementById('scroll-progress');
const navbar        = document.getElementById('navbar');
const hamburger     = document.getElementById('hamburger');
const navLinks      = document.getElementById('nav-links');
const typedText     = document.getElementById('typed-text');
const contactForm   = document.getElementById('contact-form');
const formStatus    = document.getElementById('form-status');
const backToTop     = document.getElementById('back-to-top');
const allNavLinks   = document.querySelectorAll('.nav-link');
const allSections   = document.querySelectorAll('section[id]');

// ── LOADING SCREEN ──────────────────────────────────────────
window.addEventListener('load', () => {
  setTimeout(() => {
    loader.classList.add('hidden');
    document.body.style.overflow = '';
    // Trigger hero animations after loader
    document.querySelectorAll('#hero [data-animate]').forEach(el => {
      el.classList.add('visible');
    });
  }, 2200);
});
document.body.style.overflow = 'hidden';

// ── SCROLL PROGRESS BAR ─────────────────────────────────────
function updateScrollProgress() {
  const scrollTop    = window.scrollY;
  const docHeight    = document.documentElement.scrollHeight - window.innerHeight;
  const progress     = (scrollTop / docHeight) * 100;
  scrollProg.style.width = `${Math.min(progress, 100)}%`;
}

// ── NAVBAR SCROLL EFFECT ─────────────────────────────────────
function handleNavbarScroll() {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

// ── BACK TO TOP ──────────────────────────────────────────────
function handleBackToTop() {
  if (window.scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
}
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── ACTIVE NAV LINK ──────────────────────────────────────────
function updateActiveNavLink() {
  let current = '';
  allSections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  allNavLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

// Consolidate scroll handler
window.addEventListener('scroll', () => {
  updateScrollProgress();
  handleNavbarScroll();
  handleBackToTop();
  updateActiveNavLink();
}, { passive: true });

// ── MOBILE NAV TOGGLE ────────────────────────────────────────
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

// Close mobile nav on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// Close nav on outside click
document.addEventListener('click', (e) => {
  if (navLinks.classList.contains('open') &&
      !navLinks.contains(e.target) &&
      !hamburger.contains(e.target)) {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  }
});

// ── SMOOTH SCROLL FOR ANCHOR LINKS ──────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ── TYPING ANIMATION ─────────────────────────────────────────
const roles = [
  'AI Developer',
  'Full Stack Developer',
  'Python Developer',
  'JavaScript Developer',
  'Problem Solver',
];
let roleIndex   = 0;
let charIndex   = 0;
let isDeleting  = false;
let typingDelay = 100;

function typeRole() {
  if (!typedText) return;
  const currentRole = roles[roleIndex];

  if (isDeleting) {
    typedText.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
    typingDelay = 50;
  } else {
    typedText.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
    typingDelay = 120;
  }

  if (!isDeleting && charIndex === currentRole.length) {
    isDeleting  = true;
    typingDelay = 1800; // pause before deleting
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex  = (roleIndex + 1) % roles.length;
    typingDelay = 300; // pause before typing next
  }

  setTimeout(typeRole, typingDelay);
}

// Start typing after loader
setTimeout(typeRole, 2500);

// ── INTERSECTION OBSERVER — FADE-IN ANIMATIONS ──────────────
const observerOptions = {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px',
};

const animObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      animObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('[data-animate]').forEach(el => {
  // Skip hero elements — they're triggered after loader
  if (!el.closest('#hero')) {
    animObserver.observe(el);
  }
});

// ── SKILL BAR ANIMATION ──────────────────────────────────────
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-fill').forEach(fill => {
        fill.classList.add('animated');
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-category').forEach(card => {
  skillObserver.observe(card);
});

// ── CONTACT FORM ─────────────────────────────────────────────
// Natively handled via HTML POST to FormSubmit.co

// ── FLOATING ICONS PARALLAX (subtle) ────────────────────────
const floatIcons = document.querySelectorAll('.float-icon');
window.addEventListener('mousemove', (e) => {
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;
  const dx = (e.clientX - cx) / cx;
  const dy = (e.clientY - cy) / cy;

  floatIcons.forEach((icon, i) => {
    const factor = (i % 3 + 1) * 6;
    icon.style.transform = `translate(${dx * factor}px, ${dy * factor}px)`;
  });
}, { passive: true });

// ── GITHUB API INTEGRATION ────────────────────────────────────
async function fetchGitHubStats() {
  const username = 'Likitha77-epuri';
  try {
    const userResponse = await fetch(`https://api.github.com/users/${username}`);
    if (!userResponse.ok) throw new Error('Failed to fetch user data');
    const userData = await userResponse.json();

    document.getElementById('gh-repos').textContent = userData.public_repos || 0;
    document.getElementById('gh-followers').textContent = userData.followers || 0;
    document.getElementById('gh-following').textContent = userData.following || 0;

    const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
    if (!reposResponse.ok) throw new Error('Failed to fetch repos data');
    const reposData = await reposResponse.json();

    let totalStars = 0;
    const languagesMap = {};

    reposData.forEach(repo => {
      totalStars += repo.stargazers_count || 0;
      if (repo.language) {
        languagesMap[repo.language] = (languagesMap[repo.language] || 0) + 1;
      }
    });

    document.getElementById('gh-stars').textContent = totalStars;

    const sortedLanguages = Object.entries(languagesMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4);

    const totalReposWithLang = Object.values(languagesMap).reduce((a, b) => a + b, 0);

    const langsListEl = document.getElementById('gh-langs-list');
    if (langsListEl) {
      langsListEl.innerHTML = '';
      if (sortedLanguages.length === 0) {
        langsListEl.innerHTML = '<div class="gh-lang-loading">No language data found</div>';
      } else {
        const langColors = {
          'Python': '#3776AB',
          'JavaScript': '#F7DF1E',
          'HTML': '#E44D26',
          'CSS': '#264DE4',
          'Flask': '#94a3b8',
          'SQL': '#00758F'
        };

        sortedLanguages.forEach(([lang, count]) => {
          const pct = ((count / totalReposWithLang) * 100).toFixed(0);
          const color = langColors[lang] || '#8B5CF6';
          const langItem = document.createElement('div');
          langItem.className = 'gh-lang-item';
          langItem.innerHTML = `
            <div class="gh-lang-info">
              <span>${lang}</span>
              <span class="gh-lang-pct">${pct}%</span>
            </div>
            <div class="gh-lang-bar">
              <div class="gh-lang-fill" style="width: ${pct}%; background-color: ${color}"></div>
            </div>
          `;
          langsListEl.appendChild(langItem);
        });
      }
    }

  } catch (error) {
    console.error('Error fetching GitHub statistics:', error);
    document.getElementById('gh-repos').textContent = '10+';
    document.getElementById('gh-followers').textContent = '5+';
    document.getElementById('gh-following').textContent = '10+';
    document.getElementById('gh-stars').textContent = '2+';
    const langsListEl = document.getElementById('gh-langs-list');
    if (langsListEl) {
      langsListEl.innerHTML = `
        <div class="gh-lang-item">
          <div class="gh-lang-info"><span>Python</span><span class="gh-lang-pct">50%</span></div>
          <div class="gh-lang-bar"><div class="gh-lang-fill" style="width: 50%; background-color: #3776AB"></div></div>
        </div>
        <div class="gh-lang-item">
          <div class="gh-lang-info"><span>JavaScript</span><span class="gh-lang-pct">30%</span></div>
          <div class="gh-lang-bar"><div class="gh-lang-fill" style="width: 30%; background-color: #F7DF1E"></div></div>
        </div>
        <div class="gh-lang-item">
          <div class="gh-lang-info"><span>HTML/CSS</span><span class="gh-lang-pct">20%</span></div>
          <div class="gh-lang-bar"><div class="gh-lang-fill" style="width: 20%; background-color: #E44D26"></div></div>
        </div>
      `;
    }
  }
}

fetchGitHubStats();


// ── PROFILE RING TILT ON HOVER ───────────────────────────────
const profileRing = document.querySelector('.profile-ring');
if (profileRing) {
  profileRing.addEventListener('mousemove', (e) => {
    const rect   = profileRing.getBoundingClientRect();
    const x      = e.clientX - rect.left - rect.width / 2;
    const y      = e.clientY - rect.top  - rect.height / 2;
    const rotX   = (-y / rect.height * 20).toFixed(1);
    const rotY   = (x / rect.width * 20).toFixed(1);
    profileRing.style.transform = `perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
  });
  profileRing.addEventListener('mouseleave', () => {
    profileRing.style.transform = '';
  });
}

// ── PROJECT CARDS TILT ───────────────────────────────────────
document.querySelectorAll('.project-card, .achievement-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x    = e.clientX - rect.left - rect.width / 2;
    const y    = e.clientY - rect.top  - rect.height / 2;
    const rotX = (-y / rect.height * 8).toFixed(1);
    const rotY = (x / rect.width * 8).toFixed(1);
    card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ── CONSOLE GREETING ─────────────────────────────────────────
console.log('%c 👩‍💻 Likitha Epuri — Portfolio ', 'background: linear-gradient(135deg,#3B82F6,#8B5CF6); color:white; font-size:16px; font-weight:bold; padding:8px 16px; border-radius:8px;');
console.log('%c Built with HTML, CSS & JavaScript | Powered by passion for AI & Full Stack Development', 'color:#CBD5E1; font-size:12px;');
