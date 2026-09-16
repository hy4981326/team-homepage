(() => {
  'use strict';

  const scriptSource = document.currentScript?.src || '';
  const dataUrl = scriptSource
    ? new URL('../../data/publications.json', scriptSource)
    : new URL('../data/publications.json', window.location.href);
  const language = new URLSearchParams(window.location.search).get('lang') === 'en' ? 'en' : 'zh';
  const isEnglish = language === 'en';
  const categories = ['journals', 'conferences', 'books', 'patents'];
  const labels = {
    zh: {
      journals: '期刊论文',
      conferences: '会议及其他',
      books: '专著',
      patents: '发明专利与软件著作权',
      empty: '暂无内容。',
      link: '[链接]',
      fileError: '无法从本地文件直接加载科研成果。请在项目根目录运行 python3 -m http.server 8000，再通过 http://localhost:8000/ 预览。',
      fetchError: '科研成果加载失败，请稍后刷新重试。'
    },
    en: {
      journals: 'Journal Papers',
      conferences: 'Conferences & Other Publications',
      books: 'Books',
      patents: 'Invention Patents and Software Copyrights',
      empty: 'No entries yet.',
      link: '[Link]',
      fileError: 'Research outputs cannot be loaded directly from a local file. Run python3 -m http.server 8000 in the project root, then preview at http://localhost:8000/.',
      fetchError: 'Research outputs could not be loaded. Please refresh and try again.'
    }
  }[language];

  const site = document.getElementById('achievement-journals')
    ? { prefix: 'achievement', root: document.querySelector('.achievement-publications') }
    : document.getElementById('publication-journals')
      ? { prefix: 'publication', root: document.querySelector('.publication-content') }
      : null;

  if (!site?.root) return;

  function localized(value) {
    if (typeof value === 'string') return value;
    if (!value || typeof value !== 'object') return '';
    return String(value[language] || value.zh || value.en || '');
  }

  function safeUrl(value) {
    if (!value) return '';
    try {
      const url = new URL(value);
      return url.protocol === 'http:' || url.protocol === 'https:' ? url.href : '';
    } catch {
      return '';
    }
  }

  function status(message, isError = false) {
    const paragraph = document.createElement('p');
    paragraph.className = `publication-status${isError ? ' publication-status-error' : ''}`;
    paragraph.setAttribute('role', isError ? 'alert' : 'status');
    paragraph.textContent = message;
    return paragraph;
  }

  function setAllSectionsStatus(message, isError = false) {
    categories.forEach((category) => {
      const section = document.getElementById(`${site.prefix}-${category}`);
      if (!section) return;
      section.replaceChildren(status(message, isError));
    });
  }

  function appendMeta(parent, entry) {
    const authors = localized(entry.authors);
    const venue = localized(entry.venue);
    const details = localized(entry.details);

    if (authors) parent.append(document.createTextNode(authors));
    if (authors && (venue || details)) parent.append(document.createTextNode(' '));
    if (venue) {
      const emphasis = document.createElement('em');
      emphasis.textContent = venue;
      parent.append(emphasis);
    }
    if (venue && details) parent.append(document.createTextNode(' '));
    if (details) parent.append(document.createTextNode(details));

    const url = safeUrl(entry.url);
    if (url) {
      if (authors || venue || details) parent.append(document.createTextNode(' '));
      const link = document.createElement('a');
      link.className = 'paper-link';
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener';
      link.textContent = labels.link;
      parent.append(link);
    }
  }

  function createEntry(entry) {
    const item = document.createElement('li');
    item.dataset.publicationId = String(entry.id || '');

    const title = document.createElement('strong');
    title.className = 'publication-title';
    const authorPrefix = ['books', 'patents'].includes(entry.category)
      ? localized(entry.authors)
      : '';
    title.textContent = [authorPrefix, localized(entry.title)].filter(Boolean).join(' ');
    item.append(title);

    const meta = document.createElement('span');
    meta.className = 'publication-meta';
    const metaEntry = authorPrefix ? { ...entry, authors: { zh: '', en: '' } } : entry;
    appendMeta(meta, metaEntry);
    if (meta.childNodes.length) item.append(meta);
    return item;
  }

  function createList(entries, byYear = false) {
    const list = document.createElement('ul');
    list.className = `publication-list${byYear ? ' publication-list-by-year' : ' publication-list-direct'}`;
    entries.forEach((entry) => list.append(createEntry(entry)));
    return list;
  }

  function createHeading(category) {
    if (category !== 'journals' || site.prefix === 'achievement') {
      const heading = document.createElement('h2');
      heading.textContent = labels[category];
      return heading;
    }

    const row = document.createElement('div');
    row.className = 'publication-heading-row';
    const heading = document.createElement('h2');
    heading.textContent = labels.journals;
    const scholar = document.createElement('a');
    scholar.href = 'https://scholar.google.com/citations?user=t0t8_BkAAAAJ&hl=en';
    scholar.target = '_blank';
    scholar.rel = 'noopener';
    scholar.textContent = 'Google Scholar';
    row.append(heading, scholar);
    return row;
  }

  const yearRanges = [
    ['2026', (year) => year === 2026],
    ['2025', (year) => year === 2025],
    ['2024', (year) => year === 2024],
    ['2023-2018', (year) => year >= 2018 && year <= 2023],
    ['2017-2013', (year) => year >= 2013 && year <= 2017]
  ];

  function appendYears(parent, groupedEntries) {
    const years = [...new Set(groupedEntries.map((entry) => entry.year))].sort((a, b) => b - a);
    years.forEach((year) => {
      const heading = document.createElement('h3');
      heading.className = 'publication-year';
      heading.textContent = String(year);
      parent.append(heading, createList(groupedEntries.filter((entry) => entry.year === year), true));
    });
  }

  function renderYearRanges(section, entries, category) {
    yearRanges.forEach(([range, includesYear]) => {
      const group = document.createElement('div');
      group.className = 'publication-year-group';
      group.id = `achievement-${category}-${range}`;
      appendYears(group, entries.filter((entry) => includesYear(Number(entry.year))));
      section.append(group);
    });
  }

  function renderJournals(section, entries) {
    if (site.prefix !== 'achievement') {
      appendYears(section, entries);
      return;
    }

    renderYearRanges(section, entries, 'journals');
  }

  function renderConferences(section, entries) {
    if (site.prefix !== 'achievement') {
      section.append(createList(entries));
      return;
    }

    renderYearRanges(section, entries, 'conferences');
  }

  function renderPatents(section, entries) {
    const subtypeNames = [];
    entries.forEach((entry) => {
      const subtype = localized(entry.subtype) || labels.patents;
      if (!subtypeNames.includes(subtype)) subtypeNames.push(subtype);
    });
    subtypeNames.forEach((subtype) => {
      const heading = document.createElement('h3');
      heading.className = 'publication-year';
      heading.textContent = subtype;
      section.append(
        heading,
        createList(entries.filter((entry) => (localized(entry.subtype) || labels.patents) === subtype))
      );
    });
  }

  function updateNavigation() {
    categories.forEach((category) => {
      const targetId = `${site.prefix}-${category}`;
      const selector = site.prefix === 'achievement'
        ? `nav[aria-label] > [data-achievement-target="${targetId}"]`
        : `[data-publication-nav="${targetId}"]`;
      const control = document.querySelector(selector);
      const textTarget = control?.querySelector('span:last-child') || control;
      if (textTarget) {
        textTarget.textContent = category === 'patents'
          ? (isEnglish ? 'Patents & Software' : '专利与软著')
          : labels[category];
      }
    });
    const nav = site.prefix === 'achievement'
      ? document.querySelector('[data-journal-year-nav]')
      : document.querySelector('.publication-timeline');
    nav?.setAttribute(
      'aria-label',
      isEnglish ? 'Research outputs page navigation' : '科研成果页面导航'
    );
  }

  function render(data) {
    if (!data || !Array.isArray(data.entries)) throw new Error('Invalid publications data');
    const entries = data.entries.filter((entry) => categories.includes(entry.category));

    categories.forEach((category) => {
      const section = document.getElementById(`${site.prefix}-${category}`);
      if (!section) return;
      section.replaceChildren(createHeading(category));
      const categoryEntries = entries
        .filter((entry) => entry.category === category)
        .sort((a, b) => Number(b.year) - Number(a.year));

      if (!categoryEntries.length) {
        section.append(status(labels.empty));
      } else if (category === 'journals') {
        renderJournals(section, categoryEntries);
      } else if (category === 'conferences') {
        renderConferences(section, categoryEntries);
      } else if (category === 'patents') {
        renderPatents(section, categoryEntries);
      } else {
        section.append(createList(categoryEntries));
      }
    });

    updateNavigation();
    const journalCount = entries.filter((entry) => entry.category === 'journals').length;
    const count = document.getElementById('achievement-journal-count');
    if (count) count.textContent = String(journalCount);

    document.dispatchEvent(new CustomEvent('publications:rendered', {
      detail: { entries, language, prefix: site.prefix }
    }));
  }

  if (window.location.protocol === 'file:') {
    setAllSectionsStatus(labels.fileError, true);
    document.dispatchEvent(new CustomEvent('publications:error', {
      detail: { reason: 'file-protocol', prefix: site.prefix }
    }));
    return;
  }

  let hasLoaded = false;
  function loadPublications() {
    if (hasLoaded) return;
    hasLoaded = true;
    fetch(dataUrl)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then(render)
      .catch((error) => {
        console.error('Failed to load publications:', error);
        setAllSectionsStatus(labels.fetchError, true);
        document.dispatchEvent(new CustomEvent('publications:error', {
          detail: { reason: 'fetch-failed', prefix: site.prefix }
        }));
      });
  }

  if (site.prefix === 'achievement' && window.location.hash !== '#achievements') {
    document.addEventListener('publications:load', loadPublications, { once: true });
  } else {
    loadPublications();
  }
})();
