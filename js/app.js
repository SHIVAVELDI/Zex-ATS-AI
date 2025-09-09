document.addEventListener('DOMContentLoaded', async () => {
  try {
    const res = await fetch('data/profile.json');
    const profile = await res.json();

    // Basic header / hero
    document.getElementById('nav-name').textContent = profile.name || '';
    document.getElementById('hero-name').textContent = profile.name || '';
    const heroTitle = document.getElementById('hero-title');
    if (heroTitle) heroTitle.textContent = profile.title || '';
    const tagline = document.getElementById('hero-tagline');
    if (tagline) tagline.textContent = profile.tagline || '';

    // Profile image & resume
    const img = document.getElementById('profile-image');
    if (img && profile.profileImage) img.src = profile.profileImage;
    const resumeLink = document.querySelector('a[href="assets/resume.pdf"]');
    if (resumeLink && profile.resume) resumeLink.href = profile.resume;

    // Social links
    const socialRoot = document.getElementById('social-links');
    const footerSocial = document.getElementById('footer-social');
    const createLinks = (root) => {
      if (!root || !profile.socialLinks) return;
      root.innerHTML = '';
      profile.socialLinks.forEach(s => {
        const a = document.createElement('a');
        a.href = s.url;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.title = s.name;
        a.className = 'social-link';
        a.innerHTML = s.icon ? `<i class="${s.icon}"></i>` : s.name;
        root.appendChild(a);
      });
    };
    createLinks(socialRoot);
    createLinks(footerSocial);

    // About
    const about = document.getElementById('about-summary');
    if (about) about.textContent = profile.aboutSummary || '';

    const highlightsList = document.getElementById('about-highlights-list');
    if (highlightsList && Array.isArray(profile.highlights)) {
      highlightsList.innerHTML = '';
      profile.highlights.forEach(h => {
        const li = document.createElement('li');
        li.textContent = h;
        highlightsList.appendChild(li);
      });
    }

    const valuesGrid = document.getElementById('values-grid');
    if (valuesGrid && Array.isArray(profile.values)) {
      valuesGrid.innerHTML = '';
      profile.values.forEach(v => {
        const d = document.createElement('div');
        d.className = 'value-item';
        d.textContent = v;
        valuesGrid.appendChild(d);
      });
    }

    const fillTags = (id, arr) => {
      const el = document.getElementById(id);
      if (!el || !Array.isArray(arr)) return;
      el.innerHTML = '';
      arr.forEach(t => {
        const s = document.createElement('span');
        s.className = 'skill-tag';
        s.textContent = t;
        el.appendChild(s);
      });
    };

    fillTags('technical-skills', profile.technicalSkills);
    fillTags('tools-skills', profile.toolsSkills);
    fillTags('soft-skills', profile.softSkills);

    // Contact
    const contact = profile.contact || {};
    const emailEl = document.getElementById('contact-email');
    if (emailEl) { emailEl.href = `mailto:${contact.email}`; emailEl.textContent = contact.email; }
    const phoneEl = document.getElementById('contact-phone');
    if (phoneEl) phoneEl.textContent = contact.phone || '';
    const locEl = document.getElementById('contact-location');
    if (locEl) locEl.textContent = contact.location || '';

    // Footer
    document.getElementById('footer-name').textContent = profile.footerName || profile.name || '';
    document.getElementById('current-year').textContent = new Date().getFullYear();

  } catch (err) {
    console.error('Failed to load profile.json', err);
  }
});
