(() => {
  document.documentElement.classList.add('js-ready');
  const isEnglish = new URLSearchParams(window.location.search).get('lang') === 'en';
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const placeholderIcon = `
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="22" r="13"></circle>
      <path d="M9 58c1.8-14 10.2-22 23-22s21.2 8 23 22H9z"></path>
    </svg>
  `;

  function configureLanguage() {
    const currentUrl = new URL(window.location.href);
    const chineseUrl = new URL(currentUrl);
    const englishUrl = new URL(currentUrl);
    chineseUrl.searchParams.delete('lang');
    englishUrl.searchParams.set('lang', 'en');

    const languageLinks = document.querySelectorAll('.language-switch a');
    const chineseLink = document.querySelector('[data-language="zh"]');
    const englishLink = document.querySelector('[data-language="en"]');
    if (chineseLink && englishLink) {
      chineseLink.href = `${chineseUrl.pathname}${chineseUrl.search}${chineseUrl.hash}`;
      englishLink.href = `${englishUrl.pathname}${englishUrl.search}${englishUrl.hash}`;
      chineseLink.classList.toggle('is-active', !isEnglish);
      englishLink.classList.toggle('is-active', isEnglish);
      chineseLink.setAttribute('aria-current', isEnglish ? 'false' : 'page');
      englishLink.setAttribute('aria-current', isEnglish ? 'page' : 'false');
      languageLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
          event.preventDefault();
          const targetUrl = new URL(window.location.href);
          if (link.dataset.language === 'en') targetUrl.searchParams.set('lang', 'en');
          else targetUrl.searchParams.delete('lang');
          window.location.assign(
            `${targetUrl.pathname}${targetUrl.search}${targetUrl.hash}`
          );
        });
      });
    }

    if (!isEnglish) return;

    document.documentElement.lang = 'en';
    document.title = 'Sino-Italian Joint Laboratory for Health Management and Intelligent Maintenance - Beihang University';
    document.querySelector('meta[name="description"]')?.setAttribute(
      'content',
      'The Sino-Italian Joint Laboratory for Health Management and Intelligent Maintenance advances intelligent operations and maintenance, prognostics and health management, digital twins, resilience, and reliability for complex engineering systems.'
    );

    const setHTML = (selector, html) => {
      const element = document.querySelector(selector);
      if (element) element.innerHTML = html;
    };
    const setText = (selector, text) => {
      const element = document.querySelector(selector);
      if (element) element.textContent = text;
    };

    document.querySelector('.navbar')?.setAttribute('aria-label', 'Primary navigation');
    document.querySelector('.brand-identity')?.setAttribute('aria-label', 'Return to home');
    document.querySelector('.header-search')?.setAttribute('aria-label', 'Search');
    document.querySelector('.header-search')?.setAttribute('title', 'Search');
    document.querySelector('.language-switch')?.setAttribute('aria-label', 'Language selection');
    document.querySelector('.hero-keywords')?.setAttribute('aria-label', 'Core research keywords');
    setText('.nav-toggle', 'Menu');

    const navigation = window.TEAM_HOMEPAGE_CONFIG?.navigationLabels?.en || {};
    document.querySelectorAll('.nav-links [data-page-link]').forEach((link) => {
      const navigationKey = link.dataset.route || link.dataset.pageLink;
      link.textContent = navigation[navigationKey] || link.textContent;
    });
    document.querySelectorAll('[data-nav-key]').forEach((label) => {
      label.textContent = navigation[label.dataset.navKey] || label.textContent;
    });

    setText('.hero h1', 'Sino-Italian Joint Laboratory for Health Management and Intelligent Maintenance');
    setHTML(
      '.hero-lead',
      'We advance prognostics and health management (PHM), digital twins, intelligent operations and maintenance, and resilience and reliability for complex systems.<span class="hero-lead-line">By integrating artificial intelligence, modeling and simulation, and engineering data, we translate frontier research into practical engineering solutions.</span>'
    );
    document.querySelectorAll('.hero-actions [data-page-link]').forEach((link) => {
      const arrow = link.querySelector('span')?.outerHTML || '';
      link.innerHTML = `${navigation[link.dataset.pageLink]} ${arrow}`;
    });
    setText('#home-news-title', 'News');
    setText('#home-notice-title', 'Notices');
    setText('#home-directions-title', 'Research Directions');
    setText('#home-about-title', 'Center Introduction');
    document.querySelectorAll('.home-information .home-more, .home-directions .home-more').forEach((link) => {
      link.textContent = 'More';
    });
    setText('.home-about-link', 'Learn More');
    const homeNewsText = [
      'Reliability Engineering × a Sustainable Future: ICRE 2026',
      '2026 International Summer School of Aviation Safety'
    ];
    document.querySelectorAll('.home-news-entry').forEach((entry, index) => {
      const text = homeNewsText[index];
      if (!text) return;
      const title = entry.querySelector('h3');
      if (title) title.textContent = text;
    });
    const homeNoticeText = [
      ['Admissions', 'The laboratory welcomes applications from master’s students, doctoral students, and postdoctoral researchers.'],
      ['Research Collaboration', 'Universities, research institutes, and enterprises worldwide are welcome to pursue academic exchange and joint research.']
    ];
    document.querySelectorAll('.home-notice-item').forEach((item, index) => {
      const text = homeNoticeText[index];
      if (!text) return;
      const time = item.querySelector('time');
      const title = item.querySelector('strong');
      if (time) time.textContent = text[0];
      if (title) title.textContent = text[1];
    });
    document.querySelector('.home-direction-list')?.setAttribute('aria-label', 'Research direction list');
    const homeResearchDirections = [
      {
        title: 'Multimodal Foundation Models and Intelligent PHM Algorithms',
        description: 'Integrating multi-source information such as sensor signals, operating parameters, maintenance records, and environmental conditions to build PHM foundation-model methods for health prediction, intelligent diagnosis, and validation.',
        link: 'View full direction'
      },
      {
        title: 'Digital Twin Modeling and Intelligent O&M Decision Optimization',
        description: 'Combining MBSE, multiphysics simulation, and data-driven optimization across the lifecycle of complex engineering systems to support condition assessment, predictive decisions, and closed-loop intelligent O&M verification.',
        link: 'View full direction'
      },
      {
        title: 'Complex-System Resilience and Belief Reliability Analysis',
        description: 'Combining complex-network modeling, AI analysis, and digital-twin simulation to characterize structural vulnerability, recovery capability, and reliability under coupled disturbances and uncertainty.',
        link: 'View full direction'
      },
      {
        title: ''
      },
      {
        title: ''
      },
      {
        title: ''
      }
    ];
    document.querySelectorAll('.home-direction-card').forEach((item, index) => {
      const direction = homeResearchDirections[index];
      if (!direction) return;
      const title = item.querySelector('h3');
      const description = item.querySelector('.home-direction-detail p');
      const detailLink = item.querySelector('.home-direction-detail a');
      if (title) title.textContent = direction.title;
      if (description) description.textContent = direction.description;
      if (detailLink) detailLink.innerHTML = `${direction.link} <span aria-hidden="true">→</span>`;
    });
    const homeAboutText = [
      'The Sino-Italian Joint Laboratory for Health Management and Intelligent Maintenance was jointly established by research teams from Beihang University and Politecnico di Milano. It focuses on prognostics and health management, modeling and simulation, intelligent operations and maintenance, and multimodal foundation models for complex engineering systems.',
      'Following the principles of cyber-physical integration, intelligence-driven research, and systems empowerment, the laboratory connects models, algorithms, simulation, verification, and applications to provide an interdisciplinary research and experimental platform for aerospace, energy and transportation, and intelligent manufacturing.'
    ];
    document.querySelectorAll('.home-about-copy > p').forEach((paragraph, index) => {
      paragraph.textContent = homeAboutText[index] || paragraph.textContent;
    });
    document.querySelector('.home-about-figure img')?.setAttribute('alt', 'Inauguration of the Sino-Italian Joint Laboratory');
    setText('.news-page [data-placeholder-title]', 'News');
    document.querySelectorAll('.news-meta span').forEach((element) => {
      element.textContent = 'Beihang Hangzhou International Campus';
    });
    document.querySelectorAll('.news-copy h3').forEach((element) => {
      element.textContent = 'Reliability Engineering × a Sustainable Future: ICRE 2026';
    });
    document.querySelectorAll('.news-copy p').forEach((element) => {
      element.textContent = 'The 10th International Conference on Reliability Engineering will be held in Hangzhou under the theme “Reliability Engineering for a Sustainable Future: From Classical Reliability to Intelligent Resilient Systems.”';
    });
    document.querySelectorAll('[data-placeholder-page]').forEach((page) => {
      const heading = page.querySelector('h1');
      const paragraph = page.querySelector('p');
      if (heading) heading.textContent = page.dataset.titleEn || heading.textContent;
      if (paragraph) paragraph.textContent = 'Content coming soon.';
    });
    setText('#lab-gallery-title', 'Laboratory Highlights');
    const galleryCaptions = [
      'Inauguration of the Sino-Italian Joint Laboratory',
      'Laboratory exchange and facilities visit',
      'Sino-Italian Joint Laboratory academic seminar',
      'International Conference on Reliability Engineering',
      'Fault-simulation and experimental platform'
    ];
    document.querySelectorAll('.lab-slide').forEach((slide, index) => {
      const caption = galleryCaptions[index];
      const image = slide.querySelector('img');
      const figcaption = slide.querySelector('figcaption');
      if (image && caption) image.alt = caption;
      if (figcaption && caption) figcaption.textContent = caption;
    });
    document.querySelector('[data-lab-carousel]')?.setAttribute('aria-roledescription', 'carousel');
    document.querySelector('.lab-carousel-dots')?.setAttribute('aria-label', 'Select a laboratory photo');
    document.querySelector('[data-carousel-prev]')?.setAttribute('aria-label', 'View previous photo');
    document.querySelector('[data-carousel-next]')?.setAttribute('aria-label', 'View next photo');
    document.querySelectorAll('.lab-carousel-dot').forEach((dot, index) => {
      dot.setAttribute('aria-label', `View photo ${index + 1}`);
    });
    const labNavigation = {
      'lab-overview': 'Laboratory',
      'lab-faculty': 'Faculty',
      'lab-postdocs': 'Postdoctoral Researchers'
    };
    document.querySelectorAll('[data-lab-target]').forEach((button) => {
      button.textContent = labNavigation[button.dataset.labTarget] || button.textContent;
    });
    document.querySelector('.lab-subnav')?.setAttribute('aria-label', 'Laboratory page navigation');
    document.querySelector('.personnel-sidebar')?.setAttribute('aria-label', 'Faculty categories');
    setText('.personnel-side-overview span', 'Faculty Overview');
    const personnelSideLabels = ['Faculty', 'Postdoctoral Researchers'];
    document.querySelectorAll('.personnel-side-list .personnel-side-button > span:first-child').forEach((label, index) => {
      label.textContent = personnelSideLabels[index] || label.textContent;
    });
    setText('.personnel-page-heading h1', 'Faculty');
    setText('[data-personnel-home]', 'Home');
    setText('[data-personnel-overview]', 'Faculty');
    const personnelMemberNames = ['Yang Hu', 'Yang Li', 'Xiaoyu Jiang', 'Danyang Han', 'Di Su', 'Jiayu Wang', 'Zhenqin Yin'];
    document.querySelectorAll('[data-personnel-member]').forEach((button, index) => {
      button.textContent = personnelMemberNames[index] || button.textContent;
    });
    const overviewSectionTitles = ['Faculty', 'Postdoctoral Researchers'];
    document.querySelectorAll('.personnel-overview-section > h2').forEach((heading, index) => {
      heading.textContent = overviewSectionTitles[index] || heading.textContent;
    });
    const overviewPeople = [
      ['Yang Hu', 'Executive Director · Associate Research Fellow · Doctoral Supervisor'],
      ['Yang Li', 'Associate Professor · Master’s Supervisor'],
      ['Xiaoyu Jiang', 'Associate Research Fellow · Master’s Supervisor'],
      ['Danyang Han', 'Postdoctoral Researcher'],
      ['Di Su', 'Postdoctoral Researcher'],
      ['Jiayu Wang', 'Postdoctoral Researcher'],
      ['Zhenqin Yin', 'Postdoctoral Researcher']
    ];
    document.querySelectorAll('.personnel-overview-card').forEach((card, index) => {
      const person = overviewPeople[index];
      if (!person) return;
      const name = card.querySelector('h3');
      const role = card.querySelector('p');
      if (name) name.textContent = person[0];
      if (role) role.textContent = person[1];
    });

    setHTML('.lab-introduction', `
      <h2>Sino-Italian Joint Laboratory for Health Management and Intelligent Maintenance</h2>
      <p>The Sino-Italian Joint Laboratory for Health Management and Intelligent Maintenance was jointly founded by Professor Rui Kang of Beihang University and Professor Enrico Zio of Politecnico di Milano, with Associate Research Fellow Yang Hu serving as Executive Director. Guided by the principles of cyber-physical integration, intelligence-driven innovation, and system-wide enablement, the laboratory focuses on prognostics and health management (PHM), modeling and simulation, intelligent operations and maintenance, and multimodal foundation models for complex engineering systems. Its end-to-end research chain spans models, algorithms, simulation, validation, and application, providing a multidisciplinary experimental platform for PHM and intelligent maintenance in aerospace, energy and transportation, and manufacturing. The team currently comprises two professors, two associate research fellows, one associate professor, four postdoctoral researchers, and thirteen graduate students.</p>
      <figure class="lab-figure">
        <img src="image/中意健康管理与智能维修联合实验室照片1.png" alt="Cyber-physical experimental platform of the Sino-Italian Joint Laboratory for Health Management and Intelligent Maintenance" loading="lazy">
      </figure>
      <p>The laboratory comprises <strong>four core modules</strong>, together forming an integrated cyber-physical environment for PHM and intelligent maintenance:</p>
      <ol class="lab-module-list">
        <li><strong>PHM simulation system:</strong> Simulates twelve critical subsystems and more than 300 key flight parameters for Airbus A320 and Boeing 737 aircraft. It supports fault injection at the LRU, equipment, and subsystem levels, flight-environment modeling, and data generation for validating PHM algorithms and maintenance strategies.</li>
        <li><strong>Physical fault experimental platform:</strong> Reproduces typical fault modes in airborne gearboxes, bearings, electromechanical units, pumps, and related equipment. A dynamic torque sensor with 0.01 Nm accuracy and a hydraulic loading unit with a maximum load of 50 kN enable experiments on degradation mechanisms and fault evolution.</li>
        <li><strong>Virtual fault experimental platform:</strong> Integrates a fault-logic database, virtual sensor-injection modules, and an airborne software-bus simulator. Operational data under normal and representative fault conditions can be transmitted in real time to the PHM simulation system, enabling multilevel simulation from signal anomalies to system-level failures.</li>
        <li><strong>High-performance computing platform:</strong> A GPU cluster with a 128-core CPU environment, 1 TB of memory, and multiple NVIDIA A100 GPUs supports the pre-training, fine-tuning, and inference of multimodal foundation models, as well as intelligent diagnosis, reinforcement-learning decisions, and digital-twin simulation.</li>
      </ol>
      <figure class="lab-figure">
        <img src="image/中意健康管理与智能维修联合实验室照片2.png" alt="Four core modules of the Sino-Italian Joint Laboratory for Health Management and Intelligent Maintenance" loading="lazy">
      </figure>
    `);
    setHTML('.lab-personnel', `
      <section class="personnel-section personnel-detail-view" id="lab-faculty" data-personnel-panel="faculty">
        <h2 class="personnel-section-title">Faculty</h2>
        <div class="personnel-list">
          <article class="personnel-card" id="person-yang-hu">
            <img class="personnel-photo" src="image/Yang Hu.png" alt="Yang Hu" loading="lazy">
            <div>
              <p class="personnel-role">Executive Director · Associate Research Fellow · Doctoral Supervisor</p>
              <h3 class="personnel-name">Yang Hu</h3>
              <p class="personnel-research"><strong>Research:</strong> Prognostics and health management (PHM) of complex systems, artificial intelligence and industrial big data, and equipment-system modeling and simulation.</p>
              <p class="personnel-email"><strong>Email:</strong> yang_hu@buaa.edu.cn</p>
              <div class="personnel-links">
                <a class="personnel-link-primary" href="huyang-homepage/" target="_blank" rel="noopener">Personal Website</a>
                <a href="https://shi.buaa.edu.cn/huyang" target="_blank" rel="noopener">Beihang Profile</a>
                <a href="https://scholar.google.com/citations?user=t0t8_BkAAAAJ&amp;hl=en" target="_blank" rel="noopener">Google Scholar</a>
              </div>
            </div>
            <div class="personnel-profile-sections">
              <section class="personnel-profile-section">
                <h4>Biography</h4>
                <p>Yang Hu is an Associate Research Fellow and Doctoral Supervisor at the Hangzhou International Innovation Institute of Beihang University and a member of the Smart Civil Aviation Science and Technology Innovation Center. He received his Ph.D. from Politecnico di Milano in 2015 under the supervision of Professor Enrico Zio. His recent work focuses on prognostics and health management of complex systems, artificial intelligence, and modeling and simulation of equipment and systems-of-systems.</p>
              </section>
              <section class="personnel-profile-section">
                <h4>Research Interests</h4>
                <p>His research interests include prognostics and health management (PHM) of complex systems, artificial intelligence and industrial big data, modeling and simulation of equipment and systems-of-systems, intelligent operations and maintenance, and predictive maintenance decision optimization.</p>
              </section>
              <section class="personnel-profile-section">
                <h4>Academic Achievements</h4>
                <p>As a principal investigator or co-principal investigator, he has led 18 national and ministerial-level research projects with total funding exceeding RMB 39 million. These projects cover next-generation aviation equipment support systems, PHM-based support models, intelligent support systems, support-effectiveness simulation, and support big-data applications. He has published more than 30 papers as first or corresponding author in leading international journals including Reliability Engineering &amp; System Safety and Mechanical Systems and Signal Processing. His publications have received more than 1,600 Google Scholar citations, with an h-index of 16. He has authored two monographs and holds five authorized national invention patents and two software copyrights. His honors include one Second Prize of the Natural Science Award of the Chinese Society of Aeronautics and Astronautics, two Second Prizes of the Military Science and Technology Progress Award, and selection for the Young Elite Scientists Sponsorship Program by CAST in 2020.</p>
              </section>
            </div>
          </article>
          <article class="personnel-card" id="person-yang-li">
            <img class="personnel-photo" src="image/Yang Li.png" alt="Yang Li" loading="lazy">
            <div>
              <p class="personnel-role">Associate Professor · Master’s Supervisor</p>
              <h3 class="personnel-name">Yang Li</h3>
              <p class="personnel-research"><strong>Research:</strong> Beyond-reliability and autonomous intelligence, including testability design and intelligent control, fault diagnosis and fault tolerance, accelerated testing and life prediction, and reliability, supportability, and maintainability design.</p>
              <p class="personnel-email"><strong>Email:</strong> yongerli@buaa.edu.cn</p>
            </div>
            <div class="personnel-profile-sections">
              <section class="personnel-profile-section">
                <h4>Biography</h4>
                <p>Yang Li is an Associate Professor and Master's Supervisor at Beihang University. He was selected for Shanghai's “Super Postdoctoral” program, received joint doctoral training from Politecnico di Milano and Nanjing University of Aeronautics and Astronautics, and conducted postdoctoral research in Control Science and Engineering, a Shanghai Peak Discipline, at Shanghai University.</p>
              </section>
              <section class="personnel-profile-section">
                <h4>Research Interests</h4>
                <p>His research focuses on beyond-reliability and autonomous intelligence, including testability design and intelligent control, fault diagnosis and fault tolerance, accelerated testing and life prediction, reliability, supportability, and maintainability design, and their applications in complex engineering systems.</p>
              </section>
              <section class="personnel-profile-section">
                <h4>Academic Achievements</h4>
                <p>He has published more than 50 academic papers, co-authored one monograph, and filed or received authorization for more than 10 national invention patents. He serves as a young editorial board member of Artificial Intelligence and Autonomous Systems, Journal of Instrumentation (English Edition), and Intelligence &amp; Robotics, and as a guest editor for the SCI-indexed journals Machines and Processes. He has also served as a special-session chair, publication chair, or program committee chair for international conferences including IEEE ICPS, QR2MSE, RCAE, and ICRE, and regularly reviews for leading journals including IEEE TSMC, IEEE TNNLS, IEEE TIM, and IEEE TII. He has led or participated in more than 10 projects, including National Natural Science Foundation of China projects and National Key R&amp;D Program projects. His honors include best paper awards from the Shanghai Association of Automation, EECR, and RCAE, the CCDC Most Popular Paper Award, and the IEEE TIM Outstanding Reviewer Award.</p>
              </section>
            </div>
          </article>
          <article class="personnel-card" id="person-xiaoyu-jiang">
            <img class="personnel-photo" src="image/Xiaoyu Jiang.png" alt="Xiaoyu Jiang" loading="lazy">
            <div>
              <p class="personnel-role">Associate Research Fellow · Master's Supervisor</p>
              <h3 class="personnel-name">Xiaoyu Jiang</h3>
              <p class="personnel-research"><strong>Research:</strong> Applications of machine learning, foundation models, intelligent agents, and other artificial intelligence technologies in intelligent manufacturing, low-altitude operations and maintenance, smart energy, and other industrial fields.</p>
              <p class="personnel-email"><strong>Email:</strong> jiangxiaoyu@buaa.edu.cn</p>
              <div class="personnel-links">
                <a href="https://shi.buaa.edu.cn/jiangxiaoyu/zh_CN/index/219991/list/index.htm" target="_blank" rel="noopener">Homepage</a>
                <a href="https://scholar.google.com.hk/citations?user=SZzM_wUAAAAJ&amp;hl=en&amp;oi=ao" target="_blank" rel="noopener">Google Scholar</a>
              </div>
            </div>
            <div class="personnel-profile-sections">
              <section class="personnel-profile-section">
                <h4>Biography</h4>
                <p>Xiaoyu Jiang received his Ph.D. in Control Science and Engineering from Zhejiang University. He is currently a Master's Supervisor at Beihang University and head of the iData Group. He was selected for the Zhejiang Provincial Young Talent Support Program and Zhejiang Provincial Selective Postdoctoral Funding Program and received the Third Prize of the Zhejiang Natural Science Award. He conducted postdoctoral and visiting research at the State Key Laboratory of Industrial Control Technology at Zhejiang University, the Department of Systems Engineering at City University of Hong Kong, and the Department of Aerospace Engineering at the University of Kansas.</p>
              </section>
              <section class="personnel-profile-section">
                <h4>Research Interests</h4>
                <p>His research focuses on applications of machine learning, foundation models, intelligent agents, and other artificial intelligence technologies in intelligent manufacturing, low-altitude operations and maintenance, smart energy, and other industrial fields.</p>
              </section>
              <section class="personnel-profile-section">
                <h4>Academic Achievements</h4>
                <p>He has published more than 60 papers in leading journals, including IEEE Transactions journals such as IEEE TPAMI, TSMC, TIE, TII, TR, TASE, TIM, and TAI, IEEE JAS, and international conferences including NeurIPS. His work has received more than 1,300 Google Scholar citations, and five papers have been selected as ESI Highly Cited Papers. His research has been applied to complex industrial systems including chemical processes, rotating equipment, and discrete manufacturing, and he has filed or received authorization for more than 20 invention patents. In recent years, he has led projects funded by the National Natural Science Foundation of China, the Zhejiang Provincial Natural Science Foundation, and the Hangzhou Municipal Natural Science Foundation, and has contributed as a core member to major Ministry of Science and Technology projects and National Key R&amp;D Program projects.</p>
              </section>
            </div>
          </article>
        </div>
      </section>
      <section class="personnel-section personnel-detail-view" id="lab-postdocs" data-personnel-panel="postdocs">
        <h2 class="personnel-section-title">Postdoctoral Researchers</h2>
        <div class="personnel-list">
          <article class="personnel-card" id="person-danyang-han">
            <img class="personnel-photo" src="image/Danyang Han.png" alt="Danyang Han" loading="lazy">
            <div>
              <p class="personnel-role">Postdoctoral Researcher</p><h3 class="personnel-name">Danyang Han</h3><p class="personnel-email"><strong>Email:</strong></p>
              <div class="personnel-profile-sections">
                <section class="personnel-profile-section"><h4>Biography</h4><p>Danyang Han received her Ph.D. in Engineering from Beihang University and is currently a postdoctoral researcher at Beihang University. During her doctoral studies, she received honors including Beihang University Outstanding Graduate Student and doctoral scholarships. She currently serves as a member of the Reliability System Science and Engineering Professional Committee of the Chinese Institute of Command and Control and as a guest editor for SCI-indexed journals.</p></section>
                <section class="personnel-profile-section"><h4>Research Interests</h4><p>Her research focuses on remaining useful life prediction for complex equipment and health perception and diagnosis for life-cycle complex systems. Oriented toward industrial manufacturing and the aviation, aerospace, and civil aviation sectors, she develops methods for health-state information fusion, performance degradation modeling, remaining useful life prediction, and fault diagnosis by integrating digital-twin theory, physics-informed modeling, and deep learning.</p></section>
                <section class="personnel-profile-section"><h4>Academic Achievements</h4><p>She has participated in projects funded by the National Natural Science Foundation of China, National Key R&amp;D Program projects, equipment pre-research projects, and multiple collaborative projects with peer institutions. She has published one academic monograph, more than 20 academic papers, and holds more than 10 authorized invention patents.</p></section>
              </div>
            </div>
          </article>
          <article class="personnel-card" id="person-di-su">
            <img class="personnel-photo" src="image/Di Su.png" alt="Di Su" loading="lazy">
            <div>
              <p class="personnel-role">Postdoctoral Researcher</p><h3 class="personnel-name">Di Su</h3><p class="personnel-email"><strong>Email:</strong> sudi314@buaa.edu.cn</p>
              <div class="personnel-profile-sections">
                <section class="personnel-profile-section"><h4>Personal Profile</h4><p>Di Su received his Ph.D. and is currently a postdoctoral researcher at Beihang University. He completed his bachelor’s, master’s, and doctoral studies at the School of Aerospace Engineering, Beijing Institute of Technology. He previously served as a Qianjiang Researcher at the Hangzhou Institute for Extremely-Weak Magnetic Field Major National Science and Technology Infrastructure, with experience in both research and engineering project implementation. He has led projects funded by the China Postdoctoral Science Foundation, Zhejiang Postdoctoral Research Excellence Program, and enterprise research programs.</p></section>
                <section class="personnel-profile-section"><h4>Research Interests</h4><p>His research focuses on intelligent support for aviation equipment, covering digital twins, multi-agent modeling and intelligent decision-making, prognostics and health management, and reliability analysis. He works on state perception, risk assessment, and collaborative operations-and-maintenance optimization for complex equipment.</p></section>
                <section class="personnel-profile-section"><h4>Academic Achievements</h4><p>He has published more than 10 SCI/EI papers and holds more than 10 authorized national invention patents. He has led four projects, including China Postdoctoral Science Foundation funding, Zhejiang Postdoctoral Research Excellence Program funding, and enterprise-sponsored projects, with total funding of RMB 2.55 million. He has also contributed as a core team member to major national science and technology infrastructure projects and intelligent aviation-equipment support projects.</p></section>
              </div>
            </div>
          </article>
          <article class="personnel-card" id="person-jiayu-wang">
            <img class="personnel-photo" src="image/Jiayu Wang.png" alt="Jiayu Wang" loading="lazy">
            <div>
              <p class="personnel-role">Postdoctoral Researcher</p><h3 class="personnel-name">Jiayu Wang</h3><p class="personnel-email"><strong>Email:</strong></p>
              <div class="personnel-profile-sections">
                <section class="personnel-profile-section"><h4>Personal Profile</h4><p>Jiayu Wang received a bachelor’s degree in Automation and a Ph.D. in Control Science and Engineering from Jiangnan University. During his doctoral studies, he was supported by the China Scholarship Council for joint training with the research group of Royal Society of New Zealand Fellow Professor Brent Young at the University of Auckland. He is currently a postdoctoral researcher at Beihang University.</p></section>
                <section class="personnel-profile-section"><h4>Research Interests</h4><p>His research focuses on frontier applications of deep learning, foundation models, and intelligent agents to soft sensing and quality monitoring in industrial processes, including intelligent manufacturing and low-altitude operations and maintenance.</p></section>
                <section class="personnel-profile-section"><h4>Academic Achievements</h4><p>He has published more than ten first-author or corresponding-author papers in leading journals and conferences including IEEE TII, TIM, and IoTJ, and holds three authorized national invention patents. He led and completed a Jiangsu Provincial Graduate Research and Practice Innovation Program project and received honors including the 2025 Jiangnan University Outstanding Doctoral Dissertation Award, the National Scholarship, and recognition as one of the university’s Top Ten Graduate Students.</p></section>
              </div>
            </div>
          </article>
          <article class="personnel-card" id="person-zhenqin-yin">
            <span class="personnel-photo-placeholder" aria-label="No photo available for Zhenqin Yin">
              <svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="22" r="13"></circle><path d="M9 58c1.8-14 10.2-22 23-22s21.2 8 23 22H9z"></path></svg>
            </span>
            <div>
              <p class="personnel-role">Postdoctoral Researcher</p><h3 class="personnel-name">Zhenqin Yin</h3><p class="personnel-email"><strong>Email:</strong></p>
              <div class="personnel-profile-sections">
                <section class="personnel-profile-section"><h4>Personal Profile</h4><p>Zhenqin Yin received a Ph.D. in Control Science and Engineering from Zhejiang University and is currently a postdoctoral researcher at Beihang University. During her doctoral studies, she received honors including Outstanding Graduate Student and a doctoral scholarship from Zhejiang University, as well as support from the National Program for Building High-Level Universities. She conducted research at the State Key Laboratory of Industrial Control Technology at Zhejiang University and visited the Graduate School of Informatics at Kyoto University.</p></section>
                <section class="personnel-profile-section"><h4>Research Interests</h4><p>Her research focuses on machine learning, artificial-intelligence security, data-driven modeling, and industrial intelligent systems.</p></section>
                <section class="personnel-profile-section"><h4>Academic Achievements</h4><p>Over the past five years, she has contributed to major projects including the Science and Technology Innovation 2030 “New Generation Artificial Intelligence” program and key projects of the National Natural Science Foundation of China. Her work covers intelligent modeling of industrial-process data, intelligent-model security and robust learning, process monitoring, and fault diagnosis. She has published papers in leading journals and A-ranked conferences including IEEE TII, TIFS, TITS, and RESS.</p></section>
              </div>
            </div>
          </article>
        </div>
      </section>
    `);

    setHTML('#research article.prose', `
      <div class="research-intro">
        <p><strong>The Sino-Italian Joint Laboratory for Health Management and Intelligent Maintenance</strong> centers its research on health prognostics, digital twins, and system resilience for advanced engineering systems in aerospace, energy and transportation, and intelligent manufacturing. It has established an integrated framework of <strong>“multimodal intelligent cognition—cyber-physical modeling—reliable system assurance.”</strong><span class="research-intro-lead">The laboratory pursues three principal directions:</span></p>
      </div>
      <div class="research-topic-list">
        <details class="research-topic-card">
          <summary>
            <span class="research-topic-image" aria-hidden="true"><img src="assets/images/research-phm-card.jpg" alt="" loading="lazy"></span>
            <span class="research-topic-number">01</span>
            <span class="research-topic-copy"><strong>Multimodal Foundation Models<br>and Intelligent PHM Algorithms</strong><small>Integrating AI with physics-based models to predict and diagnose the health of complex systems</small></span>
            <span class="research-topic-action"><span class="research-topic-action-open">View details</span><span class="research-topic-action-close">Collapse</span></span>
          </summary>
          <div class="research-topic-detail"><div class="research-topic-detail-inner">
            <p>This direction develops an end-to-end technical framework for PHM of complex engineering systems, from multi-source data processing to model training and performance validation, with multimodal foundation models at its core. By integrating sensor signals, operational parameters, maintenance records, environmental conditions, and other multidimensional information, we investigate cognitive modeling and intelligent optimization for PHM tasks and develop next-generation health-management solutions for highly reliable aerospace, energy, and transportation systems. Topics include:</p>
            <p><strong>(1) Multimodal data processing for PHM:</strong> Data cleaning, alignment, and representation learning for heterogeneous sources; standardized multi-source workflows and efficient representation frameworks; and unified, dynamic fusion of structural, time-series, image, and text data.</p>
            <p><strong>(2) Integrated multimodal foundation modeling for PHM:</strong> PHM-oriented cognitive foundation models that combine a digital-twin module for physical constraints, a knowledge-enhancement module for domain knowledge and expert experience, and a dynamic fusion mechanism to achieve deep coordination between mechanisms and data.</p>
            <p><strong>(3) Multi-agent collaborative training of PHM foundation models:</strong> Joint training strategies for multiple tasks, scenarios, and devices based on multi-agent reinforcement learning (MARL) and collaborative optimization, enabling distributed perception and coordinated decision-making in complex systems.</p>
            <p><strong>(4) Cyber-physical validation of multimodal PHM foundation models:</strong> Combined validation with simulation-generated and real operational data across task scenarios, fault profiles, and operating conditions to evaluate robustness, generalizability, and engineering readiness, creating a continuously improving validation system.</p>
            <p>The goal is a multimodal PHM framework integrating data-driven learning, physical constraints, knowledge enhancement, intelligent collaboration, and cyber-physical validation to enable lifecycle-wide predictive maintenance and autonomous intelligent assurance for complex engineering systems.</p>
            <figure class="research-figure"><img src="image/多模态大模型与PHM智能算法研究.png" alt="Framework for multimodal foundation models and intelligent PHM algorithms" loading="lazy"></figure>
          </div></div>
        </details>
        <details class="research-topic-card">
          <summary>
            <span class="research-topic-image" aria-hidden="true"><img src="assets/images/research-digital-twin-card.jpg" alt="" loading="lazy"></span>
            <span class="research-topic-number">02</span>
            <span class="research-topic-copy"><strong>Digital-Twin Modeling<br>and Intelligent Maintenance Decision Optimization</strong><small>Enabling intelligent operational and support decisions through integrated cyber-physical simulation</small></span>
            <span class="research-topic-action"><span class="research-topic-action-open">View details</span><span class="research-topic-action-close">Collapse</span></span>
          </summary>
          <div class="research-topic-detail"><div class="research-topic-detail-inner">
            <p>Centered on digital-twin (DT) technology, this direction studies lifecycle modeling of complex engineering systems from requirements and functions to physical implementation, together with mechanisms for coordinated operation between virtual and physical systems. Model-based systems engineering (MBSE), multiphysics simulation, and data-driven optimization are combined to create real-time state mapping and predictive decision frameworks for highly reliable and efficient intelligent maintenance. Topics include:</p>
            <p><strong>(1) Digital-twin architectures and multilevel modeling:</strong> Mission-, system-, equipment-, and component-level digital twins, with a requirements—function—logic—physical—behavior mapping chain for cyber-physical coordination and multiscale associative modeling.</p>
            <p><strong>(2) Multiphysics modeling and operational-behavior simulation:</strong> Coupled structural, thermal, electrical, and fluid models for studying dynamic responses and degradation under real missions and extreme environments, providing a mechanistic basis for condition monitoring and lifetime prediction.</p>
            <p><strong>(3) Digital-twin-based system-state assessment and prediction:</strong> Fusion of digital-twin models with real-time sensor data for dynamic assessment and forward prediction of system health, mission performance, and potential fault risks.</p>
            <p><strong>(4) Intelligent maintenance and decision optimization:</strong> Digital-twin-informed decision models combining reinforcement learning, multi-objective optimization, and evolutionary computation to optimize maintenance planning, mission scheduling, resource allocation, and emergency recovery while balancing effectiveness and cost.</p>
            <p><strong>(5) Cyber-physical closed-loop validation and intelligent simulation platforms:</strong> Integrated experimental platforms for closed-loop validation of algorithms, models, and system strategies, alongside scalable AnyLogic-, Modelica-, and Python-based simulation systems supporting the full path from simulation validation to engineering deployment.</p>
            <p>This direction forms an integrated chain of model construction, simulation validation, intelligent decision-making, and closed-loop optimization, providing systematic solutions for improving the availability and lifecycle management of advanced engineering systems.</p>
            <figure class="research-figure"><img src="image/数字孪生建模与智慧运维决策优化.png" alt="Framework for digital-twin modeling and intelligent maintenance decision optimization" loading="lazy"></figure>
          </div></div>
        </details>
        <details class="research-topic-card">
          <summary>
            <span class="research-topic-image" aria-hidden="true"><img src="assets/images/research-resilience-card.jpg" alt="" loading="lazy"></span>
            <span class="research-topic-number">03</span>
            <span class="research-topic-copy"><strong>Complex-System Resilience<br>and Belief Reliability Analysis</strong><small>Revealing structural evolution and quantifying resistance to disruption and recovery capacity</small></span>
            <span class="research-topic-action"><span class="research-topic-action-open">View details</span><span class="research-topic-action-close">Collapse</span></span>
          </summary>
          <div class="research-topic-detail"><div class="research-topic-detail-inner">
            <p>This direction develops theoretical frameworks and engineering methods for resilience and belief reliability in complex aerospace, energy and transportation, and intelligent-manufacturing systems. Complex-network modeling, AI analysis, and digital-twin simulation reveal structural vulnerability and dynamic evolution under multiple disturbances, couplings, and uncertainties, enabling quantitative safety and reliability assessment. Topics include:</p>
            <p><strong>(1) Complex-network modeling and system-coupling analysis:</strong> Multilayer, multidomain, and multiscale network models of structural characteristics, coupling relationships, and dynamic evolution. The OmniLink HyperNetwork (OHN) framework models high-dimensional interactions among multiple entities, relationships, and time scales. Structural Order Entropy measures structural complexity and changing order to mathematically characterize robustness and evolutionary trends.</p>
            <p><strong>(2) Belief reliability theory and uncertainty quantification:</strong> Reliability models based on belief theory that integrate Bayesian inference, evidence theory, and fuzzy logic for the comprehensive representation, updating, and dynamic assessment of uncertain multi-source information.</p>
            <p><strong>(3) System-resilience assessment and metric development:</strong> Recovery and robustness under disturbances, faults, and external shocks; quantitative resilience metrics, evolution models, and assessment systems supporting recoverability and mission-continuity analysis.</p>
            <p><strong>(4) Resilience enhancement and structural optimization:</strong> Adaptive control and structural reconfiguration for high-risk scenarios, including redundancy allocation and dynamic recovery decisions for system-level resilience improvement and proactive risk defense.</p>
            <p>The objective is a new reliability paradigm combining network science, information-entropy theory, and AI modeling to support intelligent safety management, disturbance-resistant design, and sustained mission capability in critical national engineering systems and infrastructure.</p>
            <figure class="research-figure"><img src="image/复杂系统韧性与确信可靠性分析.png" alt="Framework for complex-system resilience and belief reliability analysis" loading="lazy"></figure>
          </div></div>
        </details>
      </div>
      <p class="research-outro">The three directions reinforce one another to form an integrated <strong>“intelligence—simulation—assurance”</strong> innovation system, providing theoretical and technical foundations for future engineering systems with high reliability, intelligence, and resilience.</p>
    `);
    setHTML('#research-collapse-button', '<span aria-hidden="true">↑</span>Collapse details');

    setHTML('#achievements .section-shell', `
      <nav class="education-subnav achievement-subnav" aria-label="Research outputs page navigation">
        <button class="is-active" type="button" data-achievement-target="achievement-journals">Journal Papers</button>
        <button type="button" data-achievement-target="achievement-conferences">Conferences &amp; Other</button>
        <button type="button" data-achievement-target="achievement-books">Books</button>
        <button type="button" data-achievement-target="achievement-patents">Patents &amp; Software</button>
      </nav>
      <div class="achievement-publications" aria-live="polite">
        <section class="publication-block" id="achievement-journals"></section>
        <section class="publication-block" id="achievement-conferences"></section>
        <section class="publication-block" id="achievement-books"></section>
        <section class="publication-block" id="achievement-patents"></section>
      </div>
    `);

    setHTML('#education .page-shell', `
      <nav class="education-subnav" aria-label="Talent development page navigation">
        <button class="is-active" type="button" data-education-target="education-students">Student Supervision</button>
        <button type="button" data-education-target="education-recruitment">Admissions</button>
      </nav>
      <article class="prose recruitment-content">
        <section class="education-feature" id="education-students">
          <h2 class="education-section-title">Student Supervision</h2>
          <h3 class="student-subheading">Current / Supervised Students (Selected)</h3>
          <div class="student-group" id="current-doctoral">
            <h4 class="student-group-title">Doctoral Student</h4>
            <ul class="student-grid">
              <li><a class="student-card" href="students/profile.html?id=dongcan-liu&amp;lang=en"><img src="image/Dongcan Liu.png" alt="Dongcan Liu" loading="lazy"><span class="student-card-body"><span class="student-card-name">Dongcan Liu</span><span class="student-card-meta">Major: Control Science and Engineering</span><span class="student-card-email">Email:</span><span class="student-card-link">Personal Profile →</span></span></a></li>
            </ul>
          </div>
          <div class="student-group" id="current-masters">
            <h4 class="student-group-title">Master’s Students</h4>
            <ul class="student-grid">
              <li><a class="student-card" href="students/profile.html?id=xinhang-chen&amp;lang=en"><img src="image/Xinhang Chen.png" alt="Xinhang Chen" loading="lazy"><span class="student-card-body"><span class="student-card-name">Xinhang Chen</span><span class="student-card-meta">Major: Electronic Information</span><span class="student-card-email">Email:</span><span class="student-card-link">Personal Profile →</span></span></a></li>
              <li><a class="student-card" href="students/profile.html?id=jun-deng&amp;lang=en"><img src="image/Jun Deng.png" alt="Jun Deng" loading="lazy"><span class="student-card-body"><span class="student-card-name">Jun Deng</span><span class="student-card-meta">Major: Electronic Information</span><span class="student-card-email">Email:</span><span class="student-card-link">Personal Profile →</span></span></a></li>
              <li><a class="student-card" href="students/profile.html?id=jing-li&amp;lang=en"><img src="image/Jing Li.png" alt="Jing Li" loading="lazy"><span class="student-card-body"><span class="student-card-name">Jing Li</span><span class="student-card-meta">Major: Electronic Information</span><span class="student-card-email">Email:</span><span class="student-card-link">Personal Profile →</span></span></a></li>
              <li><a class="student-card" href="students/profile.html?id=kunlong-huang&amp;lang=en"><img src="image/Kunlong Huang.jpg" alt="Kunlong Huang" loading="lazy"><span class="student-card-body"><span class="student-card-name">Kunlong Huang</span><span class="student-card-meta">Master’s Student in Electronic Information</span><span class="student-card-email">Email:</span><span class="student-card-link">Personal Profile →</span></span></a></li>
              <li><a class="student-card" href="students/profile.html?id=yanyan-wu&amp;lang=en"><img src="image/Yanyan Wu.png" alt="Yanyan Wu" loading="lazy"><span class="student-card-body"><span class="student-card-name">Yanyan Wu</span><span class="student-card-meta">Major: Artificial Intelligence / Electronic Information</span><span class="student-card-email">Email:</span><span class="student-card-link">Personal Profile →</span></span></a></li>
              <li><a class="student-card" href="students/profile.html?id=yongpeng-qi&amp;lang=en"><img src="image/Yongpeng Qi.png" alt="Yongpeng Qi" loading="lazy"><span class="student-card-body"><span class="student-card-name">Yongpeng Qi</span><span class="student-card-meta">Major: Transportation</span><span class="student-card-email">Email:</span><span class="student-card-link">Personal Profile →</span></span></a></li>
              <li><a class="student-card" href="students/profile.html?id=linhan-zhang&amp;lang=en"><img src="image/Linhan Zhang.png" alt="Linhan Zhang" loading="lazy"><span class="student-card-body"><span class="student-card-name">Linhan Zhang</span><span class="student-card-meta">Major: Mechanical Engineering</span><span class="student-card-email">Email:</span><span class="student-card-link">Personal Profile →</span></span></a></li>
              <li><a class="student-card" href="students/profile.html?id=zhihuan-wei&amp;lang=en"><img src="image/Zhihuan Wei.png" alt="Zhihuan Wei" loading="lazy"><span class="student-card-body"><span class="student-card-name">Zhihuan Wei</span><span class="student-card-meta">Major: Mechanical Engineering</span><span class="student-card-email">Email:</span><span class="student-card-link">Personal Profile →</span></span></a></li>
              <li><a class="student-card" href="students/profile.html?id=pedro-martin&amp;lang=en"><img src="image/Pedro Martin.png" alt="Pedro Martin" loading="lazy"><span class="student-card-body"><span class="student-card-name">Pedro Martin</span><span class="student-card-meta">Major: Microsatellite Technology</span><span class="student-card-email">Email:</span><span class="student-card-link">Personal Profile →</span></span></a></li>
              <li><a class="student-card" href="students/profile.html?id=zuhaer-tousif&amp;lang=en"><img src="image/Zuhaer Tousif.png" alt="Zuhaer Tousif" loading="lazy"><span class="student-card-body"><span class="student-card-name">Zuhaer Tousif</span><span class="student-card-meta">International Master’s Student</span><span class="student-card-email">Email:</span><span class="student-card-link">Personal Profile →</span></span></a></li>
            </ul>
          </div>
          <div class="student-group" id="current-undergraduates">
            <h4 class="student-group-title">Undergraduate Students</h4>
            <ul class="student-grid">
              <li><a class="student-card" href="students/profile.html?id=minghan-sui&amp;lang=en"><span class="student-card-avatar-placeholder" aria-label="No photo available for Minghan Sui">${placeholderIcon}</span><span class="student-card-body"><span class="student-card-name">Minghan Sui</span><span class="student-card-meta">Undergraduate Student</span><span class="student-card-email">Email:</span><span class="student-card-link">Personal Profile →</span></span></a></li>
            </ul>
          </div>
        </section>
        <section class="recruitment-section" id="education-recruitment">
          <h2 class="education-section-title">Admissions Guide</h2>
          <h2>I. About the Research Group</h2>
          <p>The Hu Yang Research Group is part of the Smart Civil Aviation Science and Technology Innovation Center at the Hangzhou International Innovation Institute, Beihang University. Led by Associate Research Fellow and Doctoral Supervisor Yang Hu, it is a young, energetic, and innovative research team. The permanent research staff include two associate research fellows, one associate professor, and four postdoctoral researchers, alongside more than ten master’s and doctoral students. This structure supports efficient collaboration through faculty leadership, core-researcher support, and a well-developed talent pipeline.</p>
          <p>Responding to major national strategic needs, the laboratory conducts fundamental and applied research on intelligent operations and maintenance, digital twins, resilience, and reliability for advanced aerospace, naval, and intelligent-manufacturing systems. Supported by high-performance computing, industrial IoT, PHM simulation and validation, and digital-twin modeling platforms, it collaborates with universities and industry partners including AVIC, COMAC, Huawei, and Loong Airlines to connect research with engineering applications.</p>
          <p>The group’s host platform, the Smart Civil Aviation Science and Technology Innovation Center, was established by the Hangzhou International Innovation Institute, Beihang University in partnership with the French National University of Civil Aviation (ENAC). It is a major education–research innovation platform serving China’s strategy for the digital and intelligent transformation of civil aviation. The center advances intelligent capabilities throughout the lifecycle of aircraft, engines, and airborne systems—including airworthiness, maintenance, air traffic management, and airport operations—and develops a closed-loop technology system spanning perception, modeling, decision-making, and optimization to support safe, efficient, and resilient civil aviation.</p>
          <p>The center houses several well-equipped specialist laboratories that provide a strong experimental foundation for our research in PHM, digital twins, and intelligent operations and maintenance:</p>
          <h3>1) Integrated Cyber-Physical Laboratory for Intelligent Health Management</h3>
          <p>This core platform for civil-aircraft PHM foundation-model research combines physical experimentation with virtual simulation, supporting the complete chain from component-degradation mechanisms to aircraft-level PHM validation. It includes Airbus A320 and Boeing 737 full-aircraft simulation systems covering twelve subsystems, more than 300 parameters, and millisecond-level fault injection; a high-precision mechanical-fault test rig with 50 kN hydraulic loading and 0.01 Nm torque sensing; and a dedicated algorithm-development environment with 128 CPU cores, 1 TB memory, and two NVIDIA A100 GPUs for multimodal foundation-model training, fine-tuning, and inference.</p>
          <h3>2) Sino-French Dassault Systèmes Center of Excellence in Education</h3>
          <p>Built on the Dassault Systèmes 3DEXPERIENCE platform (R2024x), the center provides an MBSE collaborative-development environment spanning the full aircraft lifecycle. It integrates industrial software including CATIA for parametric modeling, SIMULIA for multiphysics simulation, DELMIA for maintenance-process optimization, and ENOVIA for collaborative data management, together with Abaqus, Simpack, Isight, and Magic MBSE. The platform supports high-fidelity digital twins, multidisciplinary optimization, and system-architecture analysis to internationally recognized engineering standards.</p>
          <h3>3) Reliability Digital Twin Laboratory &amp; Fleet Operations and Maintenance Simulation Laboratory</h3>
          <p>The former includes high- and low-temperature aging chambers (-70°C to +200°C), a semiconductor thermal-resistance tester, and automated LabVIEW/MATLAB data acquisition for failure-mechanism modeling and reliability validation of critical components. The latter uses AnyLogic, an interactive AR sand-table system, and a dynamic scheduling-optimization engine to simulate PHM-supported maintenance-resource allocation and operational-effectiveness assessment for fleets at the thousand-flight scale, enabling closed-loop validation from individual-aircraft health management to intelligent fleet maintenance.</p>
          <p>The platform and Politecnico di Milano jointly established the Sino-Italian Joint Laboratory for Health Management and Intelligent Maintenance, co-led by internationally recognized PHM scholar Professor Enrico Zio and Professor Rui Kang of Beihang University. It regularly delivers international joint training, academic seminars, and co-developed courses. Partner organizations provide data from 150,000 flights, more than 2,000 real fault work orders, and over 1,000 technical manuals, ensuring authentic data, representative scenarios, and deployable results.</p>
          <p>With comprehensive facilities, rich data resources, and deep international collaboration, the platform independently supports high-level, engineering-oriented, and internationally connected master’s research, enabling efficient progress and high-quality outcomes.</p>
          <p>The group fosters a rigorous academic culture through a combined mechanism of periodic group meetings, individual weekly reports, focused seminars, and project-driven training. Students are encouraged to participate in national projects, international conferences, and joint industry challenges, developing systems thinking, engineering competence, academic communication, and teamwork. Each graduate student typically participates in one or two national or provincial/ministerial projects and publishes one or two SCI/EI-indexed papers. Some outstanding master’s students contribute to national major special projects, undertake key technology development, and present at major milestones.</p>
          <h2>II. Principal Research Directions</h2>
          <p>Our central themes are health prognostics, digital twins, and system resilience for advanced aerospace, energy and transportation, and intelligent-manufacturing systems. We organize this work within a framework of multimodal intelligent cognition, cyber-physical modeling, and reliable system operation and maintenance. The three principal directions, described in detail on the Research page, are:</p>
          <p>(1) <strong>Multimodal foundation models and intelligent PHM algorithms:</strong> integrating AI with physics-based models to predict and diagnose complex-system health. Applications include aircraft, high-speed trains, ships, CNC machine tools, wind power, and satellite electrical systems. Students learn mainstream PHM methods—including CNNs for image-based fault recognition, RNNs/LSTMs for time-series degradation modeling, and Transformers for long-range sequence dependencies—and may contribute to PHM design and validation for major national engineering systems.</p>
          <p>(2) <strong>Digital-twin modeling and intelligent maintenance decision optimization:</strong> enabling intelligent operational and support decisions through integrated cyber-physical simulation. This direction emphasizes systems engineering and simulation modeling and suits students interested in complex-system modeling, simulation optimization, and intelligent decision-making. The group has developed several digital-twin prototypes for aviation support and offshore-platform engineering systems, offering substantial involvement in real projects.</p>
          <p>(3) <strong>Complex-system resilience and belief reliability analysis:</strong> revealing structural evolution and quantifying resistance to disruption and recovery capacity. This theory-intensive direction suits students with strong mathematical foundations and interests in complex-system dynamics, network science, and risk-informed decision-making. Outcomes apply to aerospace systems, power networks, urban infrastructure, and other critical domains.</p>
          <p>These directions reinforce one another to form an integrated intelligence—simulation—assurance innovation system and provide theoretical and technical foundations for highly reliable, intelligent, and resilient engineering systems.</p>
          <p>Applications are welcome from students in computer science, automation, artificial intelligence, mechanical engineering, aerospace engineering, systems engineering, applied mathematics, and related disciplines. All directions emphasize problem orientation, model-driven research, algorithmic innovation, system implementation, and interdisciplinary integration.</p>
          <h2>III. Core Requirements and Preferred Qualifications</h2>
          <p>To ensure high-quality graduate education and effective research delivery, applicants should meet the following expectations:</p>
          <h3>Academic background:</h3>
          <ul>
            <li>Priority is given to bachelor’s or master’s graduates in computer science and technology, artificial intelligence, automation, control science and engineering, mechanical engineering, aerospace, systems engineering, applied mathematics, or related disciplines.</li>
            <li>A strong mathematical foundation is required, particularly in linear algebra, probability and statistics, optimization theory, and differential equations. As a general guideline, relevant course grades should be excellent (90 or above).</li>
            <li>Applicants should have systematically studied core courses such as Machine Learning, Deep Learning, Data Structures and Algorithms, Signals and Systems, and Control Systems, normally with grades of at least 90 in these courses.</li>
          </ul>
          <h3>Technical capabilities:</h3>
          <ul>
            <li>Proficiency in at least one of Python, MATLAB, or C++.</li>
            <li>Familiarity with mainstream deep-learning frameworks such as PyTorch or TensorFlow and the ability to independently implement CNN, RNN, LSTM, and Transformer models.</li>
            <li>Competence in mathematical modeling and data analysis, including data preprocessing and visualization with Pandas, NumPy, Scikit-learn, and Matplotlib.</li>
            <li>Prior understanding of PHM, digital twins, reinforcement learning, or complex networks is preferred.</li>
          </ul>
          <h3>Practical and competition experience (preferred):</h3>
          <ul>
            <li>Provincial-level or higher awards in competitions such as the China Undergraduate Mathematical Contest in Modeling, mathematics competitions, the Challenge Cup, RoboMaster, ACM programming contests, or Kaggle data-science competitions.</li>
            <li>Experience in research projects, patent applications, or academic-paper preparation, whether or not published.</li>
            <li>Honors such as the National Scholarship, a university first-class scholarship, or Outstanding Student recognition.</li>
            <li>Industry internships, including at internet companies, aerospace institutes, or intelligent-manufacturing enterprises.</li>
          </ul>
          <h3>Personal qualities:</h3>
          <ul>
            <li>Strong enthusiasm for research and independent learning, resilience under research pressure, and willingness to tackle frontier problems.</li>
            <li>Effective teamwork and communication, with active participation in group meetings, project discussions, and academic presentations.</li>
            <li>Good English proficiency for reading literature and writing academic papers; TOEFL, IELTS, or GRE results are advantageous.</li>
            <li>A career interest in nationally important sectors such as aerospace, advanced manufacturing, or artificial intelligence is preferred.</li>
          </ul>
          <h2>IV. Graduate Training and Expected Outcomes</h2>
          <p>We follow an individualized, project-driven, and outcome-oriented training model. After enrollment, the supervisor develops a tailored plan based on each student’s background, interests, career goals, and the group’s active projects, ensuring that individual strengths are fully developed and effectively applied.</p>
          <p><strong>Expected outcomes, adjusted where appropriate to each training pathway:</strong></p>
          <ol>
            <li>Publish a high-quality paper as first author, or as second author when the supervisor is first author.</li>
            <li>Apply for a national invention patent or software copyright.</li>
            <li>Independently develop or lead a prototype system or simulation platform that passes acceptance or demonstration.</li>
            <li>Give an oral or poster presentation at a relevant international conference such as ICML, the PHM Society Conference, IEEE reliability conferences, or ESREL.</li>
            <li>Complete an internship of at least three months at an enterprise or research institute and submit an internship report and host evaluation.</li>
            <li>Receive a university-level or higher research-competition award or scholarship.</li>
          </ol>
          <p>Every graduate student receives adequate research funding, high-performance computing resources, and opportunities for academic exchange in China and abroad. Outstanding students are actively recommended for overseas joint training or doctoral study and may receive priority referrals to partner organizations including AVIC, CASC, Huawei, and COMAC.</p>
          <h2>V. Career Development</h2>
          <p><strong>▶ Further academic study:</strong> Through collaborations with overseas laboratories, we support joint training and research visits. Outstanding master’s and doctoral graduates may receive recommendations for doctoral or postdoctoral opportunities at Beihang or leading universities in China and abroad, including Université Paris-Saclay, Politecnico di Milano, and City University of Hong Kong, subject to securing a CSC scholarship where required.</p>
          <p><strong>▶ Employment:</strong> Graduates pursue roles at aerospace institutes (including Institutes 601 and 603, and the First and Fifth Academies of CASC), intelligent-manufacturing companies such as Huawei and DJI, AI companies such as Alibaba Cloud, SenseTime, and Megvii, industrial-software companies such as Dassault Systèmes and Siemens, and power utilities such as State Grid and China Southern Power Grid. Typical positions include algorithm engineer, systems architect, PHM engineer, digital-twin specialist, and reliability analyst.</p>
          <p><strong>▶ Entrepreneurship and interdisciplinary development:</strong> The group encourages innovation and supports students interested in commercializing research. Alumni have founded startups in intelligent maintenance and industrial AI.</p>
          <h2>VI. How to Apply</h2>
          <p>Students motivated to pursue frontier research in intelligent systems, artificial intelligence, and systems engineering are warmly invited to apply. Send the materials below to <strong class="recruitment-email-address">yang_hu@buaa.edu.cn</strong>. <strong>Email subject:</strong> “Master’s/PhD Application – Name – Undergraduate University – Major.”</p>
          <p>Postdoctoral applicants should consult <a href="https://h3i.buaa.edu.cn/info/1141/1391.htm" target="_blank" rel="noopener">https://h3i.buaa.edu.cn/info/1141/1391.htm</a>. The institute provides first-class academic supervision, research conditions, and compensation. Annual salaries are RMB 320,000 for Category A and RMB 280,000 for Category B postdoctoral fellows, excluding government subsidies, plus RMB 150,000 in research start-up funding including government support. Fellows may also apply for supplementary subsidies from Hangzhou Municipality and Yuhang District, with cumulative benefits of up to RMB 2.19 million. See the Yuhang District “Future through Global Innovation · Outstanding Postdoctoral” Take-off Program, the Hangzhou West Science and Technology Innovation Corridor special-fund rules, and related policies; all benefits remain subject to the latest government regulations.</p>
          <p class="recruitment-materials-title"><strong>Required materials:</strong></p>
          <ol>
            <li>Curriculum vitae, including education, research/project experience, competition awards, and professional certifications.</li>
            <li>Undergraduate/master’s transcripts (scanned copies).</li>
            <li>Representative outputs such as papers, patents, competition certificates, or project reports.</li>
            <li>A personal statement of approximately 500 Chinese characters or comparable length in English, explaining motivation, research interests, and career plans.</li>
            <li>Optional: one or two recommendation letters.</li>
          </ol>
          <p>Applications will undergo an initial review, followed by online or in-person interviews for shortlisted candidates. Interviews cover foundational knowledge, research potential, English communication, and discussion of proposed projects.</p>
          <p class="recruitment-conclusion">The Hu Yang Research Group is an energetic, excellence-driven, and practice-oriented research community. Beyond papers and patents, we value each student’s comprehensive capabilities and long-term career development. You will engage with frontier research, contribute to major national engineering projects, work alongside outstanding peers, and gain rigorous research training and valuable professional experience.</p>
          <p class="recruitment-invitation">If you are passionate about research, ready for challenges, and eager to grow, we welcome you to join us in exploring new paradigms for system operations and maintenance in the age of intelligence and contributing to the intelligent transformation of advanced engineering systems.</p>
        </section>
      </article>
    `);

    setHTML('.contact-page', `
      <header class="contact-heading">
        <h2 class="contact-title">Contact Information</h2>
        <nav class="personnel-breadcrumb" aria-label="Breadcrumb">
          <button type="button" data-contact-home>Home</button>
          <span>/</span>
          <strong>Contact</strong>
        </nav>
      </header>
      <figure class="contact-map">
        <img src="image/school_lc.png" alt="Location map of Beihang University Hangzhou International Innovation Institute" loading="lazy">
      </figure>
      <dl class="contact-list">
        <div class="contact-item"><dt>Address</dt><dd>No. 166 Shuanghongqiao Street, Pingyao Town, Yuhang District, Hangzhou, Zhejiang, Beihang University Hangzhou International Innovation Institute / International School of Innovation</dd></div>
        <div class="contact-item"><dt>Postal Code</dt><dd>311115</dd></div>
        <div class="contact-item"><dt>Email</dt><dd>yang_hu@buaa.edu.cn</dd></div>
      </dl>
      <section class="contact-recruitment"><p>We continually recruit master’s and doctoral students and postdoctoral fellows. We welcome candidates interested in prognostics and health management, intelligent operations and maintenance, industrial big data, and complex-system modeling and simulation—especially those eager to apply advanced AI algorithms to challenging open problems.</p></section>
    `);
    setText('.site-footer p', '© 2026 Sino-Italian Joint Laboratory for Health Management and Intelligent Maintenance · Hangzhou International Innovation Institute, Beihang University');
  }

  configureLanguage();
  let showNewsView = () => {};

  function setupNewsPage() {
    const newsPage = document.getElementById('news');
    const source = newsPage?.querySelector('.placeholder-page');
    if (!newsPage || !source) return;
    const labels = isEnglish
      ? {
          home: 'Home',
          title: 'News',
          conferences: 'Academic Conferences',
          papers: 'Research Publications',
          activities: 'Academic Activities',
          notices: 'Notices',
          empty: 'Content coming soon.',
          conferenceTitle: 'Reliability Engineering × a Sustainable Future: ICRE 2026',
          conferenceText: 'The 10th International Conference on Reliability Engineering gathered scholars in Hangzhou to exchange frontier research on reliability engineering and intelligent resilient systems.',
          activityTitle: '2026 International Summer School of Aviation Safety',
          activityText: 'The summer school brought together international students and scholars for academic exchange on digitally empowered aviation safety.',
          detail: 'Learn more'
        }
      : {
          home: '首页',
          title: '新闻动态',
          conferences: '学术会议',
          papers: '论文成果',
          activities: '学术活动',
          notices: '通知公告',
          empty: '栏目内容待补充。',
          conferenceTitle: '可靠性工程 × 可持续未来 ICRE 2026重磅来袭',
          conferenceText: '第10届可靠性工程国际会议在杭州举行，来自相关领域的专家学者围绕可靠性工程与智能韧性系统前沿研究展开交流。',
          activityTitle: '2026 数字赋能的航空安全国际暑期学校',
          activityText: '暑期学校汇聚中外学生与专家学者，围绕数字赋能的航空安全开展课程学习、专题研讨与学术交流。',
          detail: '了解详情'
        };
    const conferenceItems = [
      {
        day: '07.19–21',
        year: '2026',
        title: labels.conferenceTitle,
        text: labels.conferenceText,
        image: 'image/icre-2026-cover.jpg',
        imageAlt: isEnglish ? 'Group photo of ICRE 2026 participants' : 'ICRE 2026会议参会人员合影',
        url: 'https://mp.weixin.qq.com/s/vTC1ejJQKDhgqZKh8jc96A'
      }
    ];
    const activityItems = [
      {
        day: '07.12–25',
        year: '2026',
        title: labels.activityTitle,
        text: labels.activityText,
        image: 'image/summer-school-2026.jpg',
        imageAlt: isEnglish ? 'Group photo from the 2026 International Summer School of Aviation Safety' : '2026 数字赋能的航空安全国际暑期学校合影',
        url: 'https://mp.weixin.qq.com/s/HlfpfIzE95P60b-ABVsFCw'
      }
    ];

    // 按时间轴格式生成新闻列表，传入新闻对象数组，返回新闻列表HTML字符串
    const buildNewsTimeline = (items) => {
      return `
        <div class="news-timeline">
          ${items.map((item) => `
            <a class="news-timeline-item" href="${item.url}" target="_blank" rel="noopener">
              <time class="news-timeline-date"><strong>${item.day}</strong>${item.year}</time>
              <span class="news-timeline-plane" aria-hidden="true">
                <svg viewBox="0 0 24 24"><path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5Z"></path></svg>
              </span>
              <span class="news-timeline-image">
                <img src="${item.image}" alt="${item.imageAlt}" loading="lazy">
              </span>
              <span class="news-timeline-content">
                <h2>${item.title}</h2>
                <p>${item.text}</p>
                <span class="news-timeline-detail">${labels.detail}</span>
              </span>
            </a>
          `).join('')}
        </div>
      `;
    };
    const sections = [
      ['conferences', labels.conferences],
      ['activities', labels.activities],
      ['papers', labels.papers],
      ['notices', labels.notices]
    ];
    const app = document.createElement('div');
    app.className = 'center-page-shell news-page-shell';
    app.innerHTML = `
      <div class="center-page-layout news-page-layout">
        <aside class="personnel-sidebar" aria-label="${labels.title}">
          <div class="course-side-list">
            ${sections.map(([key, label], index) => `
              <button class="personnel-side-button${index === 0 ? ' is-active' : ''}" type="button" data-news-view="${key}">${label}</button>
            `).join('')}
          </div>
        </aside>
        <div class="center-page-main">
          <header class="personnel-page-heading">
            <h1 data-news-heading>${labels.conferences}</h1>
            <nav class="personnel-breadcrumb" aria-label="Breadcrumb">
              <button type="button" data-news-home>${labels.home}</button>
              <span>/</span>
              <button type="button" data-news-overview>${labels.title}</button>
              <i>/</i>
              <strong data-news-current>${labels.conferences}</strong>
            </nav>
          </header>
          <section class="center-page-panel news-page-panel" data-news-panel="conferences">${buildNewsTimeline(conferenceItems)}</section>
          <section class="center-page-panel news-page-panel" data-news-panel="activities" hidden>${buildNewsTimeline(activityItems)}</section>
          <section class="center-page-panel news-page-panel" data-news-panel="papers" hidden><p class="news-empty-view">${labels.empty}</p></section>
          <section class="center-page-panel news-page-panel" data-news-panel="notices" hidden><p class="news-empty-view">${labels.empty}</p></section>
        </div>
      </div>
    `;
    newsPage.replaceChildren(app);
    const routeNames = {
      conferences: 'news-conferences',
      activities: 'news-activities',
      papers: 'news-papers',
      notices: 'news-notices'
    };
    showNewsView = (viewName = 'conferences') => {
      const targetView = sections.some(([key]) => key === viewName) ? viewName : 'conferences';
      const currentLabel = sections.find(([key]) => key === targetView)?.[1] || labels.conferences;
      app.querySelectorAll('[data-news-view]').forEach((button) => {
        button.classList.toggle('is-active', button.dataset.newsView === targetView);
      });
      app.querySelectorAll('[data-news-panel]').forEach((panel) => {
        panel.hidden = panel.dataset.newsPanel !== targetView;
      });
      const heading = app.querySelector('[data-news-heading]');
      const current = app.querySelector('[data-news-current]');
      if (heading) heading.textContent = currentLabel;
      if (current) current.textContent = currentLabel;
    };
    app.querySelectorAll('[data-news-view]').forEach((button) => {
      button.addEventListener('click', () => showPage(routeNames[button.dataset.newsView]));
    });
    app.querySelector('[data-news-home]')?.addEventListener('click', () => showPage('home'));
    app.querySelector('[data-news-overview]')?.addEventListener('click', () => showPage('news-conferences'));
    showNewsView('conferences');
  }

  setupNewsPage();
  let showCenterPageView = () => {};

  function setupCenterPage() {
    const centerPage = document.getElementById('team');
    const introSource = centerPage?.querySelector('.page-shell');
    if (!centerPage || !introSource) return;
    const labels = isEnglish
      ? {
          home: 'Home',
          title: 'About',
          intro: 'Introduction',
          philosophy: 'Philosophy',
          organization: 'Organization',
          executiveDirector: 'Executive Director'
        }
      : {
          home: '首页',
          title: '中心简况',
          intro: '中心简介',
          philosophy: '中心理念',
          organization: '中心架构',
          executiveDirector: '执行主任'
        };
    const sections = [
      ['intro', labels.intro],
      ['philosophy', labels.philosophy],
      ['organization', labels.organization]
    ];
    const app = document.createElement('div');
    app.className = 'center-page-shell';
    app.innerHTML = `
      <div class="center-page-layout">
        <aside class="personnel-sidebar" aria-label="${labels.title}">
          <div class="course-side-list">
            ${sections.map(([key, label], index) => `
              <button class="personnel-side-button${index === 0 ? ' is-active' : ''}" type="button" data-center-view="${key}">${label}</button>
            `).join('')}
          </div>
        </aside>
        <div class="center-page-main">
          <header class="personnel-page-heading">
            <h1 data-center-heading>${labels.intro}</h1>
            <nav class="personnel-breadcrumb" aria-label="Breadcrumb">
              <button type="button" data-center-home>${labels.home}</button>
              <span>/</span>
              <button type="button" data-center-overview>${labels.title}</button>
              <i>/</i>
              <strong data-center-current>${labels.intro}</strong>
            </nav>
          </header>
          <section class="center-page-panel" data-center-panel="intro"></section>
          <section class="center-page-panel" data-center-panel="philosophy" hidden></section>
          <section class="center-page-panel" data-center-panel="organization" hidden></section>
        </div>
      </div>
    `;
    const introPanel = app.querySelector('[data-center-panel="intro"]');
    const organizationPanel = app.querySelector('[data-center-panel="organization"]');
    while (introSource.firstChild) introPanel.append(introSource.firstChild);
    introPanel.querySelector('.lab-introduction > h2:first-child')?.remove();
    organizationPanel.innerHTML = `
      <div class="center-organization-grid">
        <figure class="center-organization-person" data-center-member="person-yang-hu" role="button" tabindex="0" aria-label="${isEnglish ? 'View Yang Hu profile' : '查看胡杨教师页面'}">
          <img src="image/Yang Hu.png" alt="${isEnglish ? 'Yang Hu' : '胡杨'}" loading="lazy">
          <figcaption><strong>${isEnglish ? 'Yang Hu' : '胡杨'}</strong><small>${labels.executiveDirector}</small></figcaption>
        </figure>
        <figure class="center-organization-person" data-center-member="person-yang-li" role="button" tabindex="0" aria-label="${isEnglish ? 'View Yang Li profile' : '查看李洋教师页面'}">
          <img src="image/Yang Li.png" alt="${isEnglish ? 'Yang Li' : '李洋'}" loading="lazy">
          <figcaption><strong>${isEnglish ? 'Yang Li' : '李洋'}</strong></figcaption>
        </figure>
        <figure class="center-organization-person" data-center-member="person-xiaoyu-jiang" role="button" tabindex="0" aria-label="${isEnglish ? 'View Xiaoyu Jiang profile' : '查看江肖禹教师页面'}">
          <img src="image/Xiaoyu Jiang.png" alt="${isEnglish ? 'Xiaoyu Jiang' : '江肖禹'}" loading="lazy">
          <figcaption><strong>${isEnglish ? 'Xiaoyu Jiang' : '江肖禹'}</strong></figcaption>
        </figure>
      </div>
    `;
    centerPage.replaceChildren(app);
    const routeNames = {
      intro: 'team',
      philosophy: 'center-philosophy',
      organization: 'organization'
    };
    showCenterPageView = (viewName = 'intro') => {
      const targetView = sections.some(([key]) => key === viewName) ? viewName : 'intro';
      const currentLabel = sections.find(([key]) => key === targetView)?.[1] || labels.intro;
      app.querySelectorAll('[data-center-view]').forEach((button) => {
        button.classList.toggle('is-active', button.dataset.centerView === targetView);
      });
      app.querySelectorAll('[data-center-panel]').forEach((panel) => {
        panel.hidden = panel.dataset.centerPanel !== targetView;
      });
      const heading = app.querySelector('[data-center-heading]');
      const current = app.querySelector('[data-center-current]');
      if (heading) heading.textContent = currentLabel;
      if (current) current.textContent = currentLabel;
    };
    app.querySelectorAll('[data-center-view]').forEach((button) => {
      button.addEventListener('click', () => showPage(routeNames[button.dataset.centerView]));
    });
    app.querySelectorAll('[data-center-member]').forEach((person) => {
      const openMember = () => showPage(person.dataset.centerMember);
      person.addEventListener('click', openMember);
      person.addEventListener('keydown', (event) => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        openMember();
      });
    });
    app.querySelector('[data-center-home]')?.addEventListener('click', () => showPage('home'));
    app.querySelector('[data-center-overview]')?.addEventListener('click', () => showPage('team'));
    showCenterPageView('intro');
  }

  setupCenterPage();
  let showResearchPageView = () => {};
  let resetResearchTopicDetail = () => {};
  let showResearchTopicDetailPage = () => {};

  function setupResearchPage() {
    const researchPage = document.getElementById('research');
    const directionsSource = researchPage?.querySelector('.page-shell');
    const achievementsSource = document.querySelector('#achievements .section-shell');
    if (!researchPage || !directionsSource || !achievementsSource) return;
    const labels = isEnglish
      ? {
          home: 'Home',
          title: 'Research',
          directions: 'Research Directions',
          projects: 'Research Projects',
          outputs: 'Research Outputs',
          cooperation: 'Research Collaboration',
          cooperationOverview: 'Collaboration Overview',
          directionItems: [
            'Multimodal Foundation Models and Intelligent PHM Algorithms',
            'Digital-Twin Modeling and Intelligent Maintenance Decision Optimization',
            'Complex-System Resilience and Belief Reliability Analysis'
          ],
          journals: 'Journal Papers',
          conferences: 'Conferences & Other',
          books: 'Books',
          patents: 'Patents & Software',
          domestic: 'Mainland Universities',
          international: 'Overseas Universities',
          enterprise: 'Industry Collaboration',
          cooperationIntro: 'The laboratory advances open collaboration in response to national innovation priorities and practical industry needs, with a focus on joint research, talent development, and shared research platforms. Through sustained engagement with universities, research institutions, and enterprises in China and abroad, it connects academic inquiry with engineering practice and supports research, team development, and service to industry.',
          cooperationStatus: 'In university collaboration, the laboratory maintains close academic ties with Zhejiang University, City University of Hong Kong, Politecnico di Milano, and Université Paris-Saclay, supporting academic exchange, joint research, and talent development. In industry and research-institute collaboration, it works with AVIC, Aero Engine Corporation of China, China Aerospace Science and Technology Corporation, COMAC, the China Electronic Product Reliability and Environmental Testing Research Institute, Huawei 2012 Laboratories, Zhejiang Loong Airlines Maintenance Engineering Co., Ltd., and Suparna Airlines on research projects and shared platforms. These partnerships support fundamental research and key technologies for intelligent operations and maintenance, digital-twin modeling, resilience, and reliability in advanced aerospace, naval, and intelligent-manufacturing systems. The laboratory is equipped with high-performance computing, industrial IoT data acquisition, PHM simulation and validation, digital-twin modeling, and complex-network analysis platforms. Its long-term partnership with Zhejiang Loong Airlines provides more than ten years of flight-parameter data covering over 150,000 A320 flights and more than 2,000 authentic maintenance work orders. It also shares resources with the Sino-French Dassault Systèmes Center of Excellence in Education, the Reliability Digital Twin Laboratory, and the Fleet Operations and Maintenance Simulation Laboratory, enabling coordinated design, modeling, simulation, and validation.',
          cooperationDetail: 'Further information on collaboration and related outcomes will be added.',
          cooperationBack: '← Back to partners',
          cooperationCategoryBack: '← Back to collaboration overview',
          categoryDescriptions: {
            domestic: 'Academic exchange and research collaboration with universities in mainland China.',
            international: 'International academic exchange, joint research, and talent development.',
            enterprise: 'Joint research projects, platform development, and engineering applications with industry partners.'
          }
        }
      : {
          home: '首页',
          title: '科学研究',
          directions: '科研方向',
          projects: '科研项目',
          outputs: '科研成果',
          cooperation: '科研合作',
          cooperationOverview: '合作概览',
          directionItems: [
            '多模态大模型与智能PHM算法研究',
            '数字孪生建模与智慧运维决策优化',
            '复杂系统韧性与确信可靠性分析'
          ],
          journals: '期刊论文',
          conferences: '会议及其他',
          books: '专著',
          patents: '专利与软著',
          domestic: '境内高校',
          international: '境外高校',
          enterprise: '企业合作',
          cooperationIntro: '实验室面向国家创新体系建设与行业实际需求，持续推进以科研协同、人才培养和平台共建为重点的开放合作。通过加强与国内外高校、科研机构及企业的交流，促进学术研究与工程应用相衔接，并以产学研协作为科研创新、团队建设和行业服务提供支撑。',
          cooperationStatus: '在高校合作方面，实验室与浙江大学、香港城市大学、意大利米兰理工大学、巴黎萨克雷大学等国内外高校保持密切学术联系，持续开展学术交流、联合研究与人才培养。在企业及科研机构合作方面，实验室与航空工业集团、中国航发、中国航天科技集团、中国商飞有限公司、工信部电子信息五所、华为2012实验室、浙江长龙航空维修工程有限公司、金鹏航空等单位共同开展科研项目和平台建设，围绕新一代航空、航天、舰船、智能制造等高端工程系统的智能化运维、数字孪生建模和韧性可靠性分析，推进基础理论研究与关键技术攻关。',
          cooperationDetail: '合作内容与相关成果待补充。',
          cooperationBack: '← 返回合作单位',
          cooperationCategoryBack: '← 返回科研合作首页',
          categoryDescriptions: {
            domestic: '与境内高校开展学术交流与科研协同。',
            international: '开展国际学术交流、联合研究与人才培养。',
            enterprise: '与企业开展科研项目、平台共建与工程应用合作。'
          }
        };
    const sections = [
      ['directions', labels.directions],
      ['projects', labels.projects],
      ['outputs', labels.outputs],
      ['cooperation', labels.cooperation]
    ];
    const outputCategories = [
      ['journals', labels.journals],
      ['conferences', labels.conferences],
      ['books', labels.books],
      ['patents', labels.patents]
    ];
    const yearRanges = ['2026', '2025', '2024', '2023-2018'];
    const projects = isEnglish
      ? [
          ['2025', '2025.09 – 2026.09', 'Integrated operations and maintenance control software development for asset systems based on multimodal data', 'Shanghai Yiliu Technology Co., Ltd. · RMB 1.05 million · Task Leader (ranked 1/8)'],
          ['2025', '2025.10 – 2026.06', 'Development of a reliability testing and validation system for representative products', 'China Electronic Product Reliability and Environmental Testing Research Institute · RMB 428,000 · Executive Project Leader (ranked 1/6)'],
          ['2023', '2023.02 – 2024.12', 'Research and validation of precision support for new aircraft', 'RMB 3 million · Task Leader (ranked 1/8)'],
          ['2023', '2023.01 – 2024.12', 'Research on the standards system for aircraft health management systems', 'RMB 500,000 · Task Leader (ranked 1/7)'],
          ['2022', '2022.05 – 2025.05', 'Research on key technologies for agile support of aviation equipment', 'RMB 3 million · Project Leader'],
          ['2022', '2022.09 – 2023.09', 'Algorithmic models for AI-based equipment maintenance decision-making', 'Pre-research Rapid Support Project · RMB 210,000'],
          ['2021', '2021.03 – 2023.11', 'Research on next-generation intelligent support systems for aviation equipment', 'RMB 8 million · Project Leader'],
          ['2020', '2020.03 – 2022.03', 'Research on situational awareness of support resources and equipment selection models', 'RMB 3.8 million · Project Leader'],
          ['2020', '2020.03 – 2022.03', 'Aircraft health management and intelligent support technology', 'Young Elite Scientists Sponsorship Program by CAST · RMB 450,000 · No. YESS20200302'],
          ['2019', '2019.08 – 2021.08', 'Concept study of military intelligent agents and swarm-intelligence algorithms', 'Science and Technology Commission Innovation Special Zone Project · RMB 750,000 · Project Leader'],
          ['2018', '2018.01 – 2020.12', 'Self-learning of equipment health indicators and generalized PHM modeling based on deep learning in industrial big-data environments', 'National Natural Science Foundation of China Young Scientists Fund · RMB 220,000 · No. 61703431']
        ]
      : [
          ['2025', '2025.09 – 2026.09', '基于多模态数据的资产系统一体化运维运控软件开发', '上海亿流科技有限公司 · 105万元 · 课题负责人（排名1/8）'],
          ['2025', '2025.10 – 2026.06', '典型产品可靠性测试验证系统开发', '工信部电子信息五所 · 42.8万元 · 项目执行负责人（排名1/6）'],
          ['2023', '2023.02 – 2024.12', '新机精确保障研究与验证', '300万元 · 课题负责人（排名1/8）'],
          ['2023', '2023.01 – 2024.12', '飞机健康管理系统标准体系研究', '50万元 · 课题负责人（排名1/7）'],
          ['2022', '2022.05 – 2025.05', '航空装备敏捷保障关键技术研究', '300万元 · 项目负责人'],
          ['2022', '2022.09 – 2023.09', '基于人工智能的装备维修决策算法模型', '预研快速扶持课题 · 21万元'],
          ['2021', '2021.03 – 2023.11', '新一代航空装备智能保障系统研究', '800万元 · 项目负责人'],
          ['2020', '2020.03 – 2022.03', '保障资源态势感知与装备优选模型研究', '380万元 · 项目负责人'],
          ['2020', '2020.03 – 2022.03', '飞机健康管理与智能保障技术研究', '中国科协青年人才托举计划（国家级人才计划）· 45万元 · 编号 YESS20200302'],
          ['2019', '2019.08 – 2021.08', '军事智能单体与群智能算法概念研究', '科技委创新特区项目 · 75万元 · 项目负责人'],
          ['2018', '2018.01 – 2020.12', '工业大数据环境下基于深度学习的设备健康指标自学习与PHM通用建模技术', '国家自然科学基金青年基金项目 · 22万元 · 编号 61703431']
        ];
    const availableYearRanges = yearRanges.filter((range) => {
      if (range === '2023-2018') {
        return projects.some(([year]) => Number(year) >= 2018 && Number(year) <= 2023);
      }
      return projects.some(([year]) => year === range);
    });
    const projectGroupHtml = (range) => {
      const years = range === '2023-2018'
        ? ['2023', '2022', '2021', '2020', '2019', '2018']
        : [range];
      const content = years.map((year) => {
        const yearProjects = projects.filter(([projectYear]) => projectYear === year);
        if (!yearProjects.length) return '';
        return `
          <section class="research-project-year">
            <h2>${year}</h2>
            <ol class="research-project-list">
              ${yearProjects.map(([, period, title]) => `
                <li class="research-project-item">
                  <time class="research-project-period">${period}</time>
                  <div>
                    <h3>${title}</h3>
                  </div>
                </li>
              `).join('')}
            </ol>
          </section>
        `;
      }).join('');
      return `
        <section class="research-project-year-group" id="research-project-${range}">
          ${content}
        </section>
      `;
    };
    const projectsHtml = `
      <nav class="education-subnav achievement-subnav" aria-label="${isEnglish ? 'Project year navigation' : '科研项目年份导航'}">
        ${availableYearRanges.map((range, index) => `
          <button class="${index === 0 ? 'is-active' : ''}" type="button" data-project-target="research-project-${range}">${range}</button>
        `).join('')}
      </nav>
      ${availableYearRanges.map(projectGroupHtml).join('')}
    `;
    const cooperationGroups = {
      domestic: isEnglish
        ? [
            { name: 'Zhejiang University', logo: 'image/zju.png' }
          ]
        : [
            { name: '浙江大学', logo: 'image/zju.png' }
          ],
      international: isEnglish
        ? [
            { name: 'The Hong Kong Polytechnic University', logo: 'image/polyu-mark.jpg' },
            { name: 'Politecnico di Milano', logo: 'image/milano.jpg' },
            { name: 'Université Paris-Saclay', logo: 'image/saclay.png' }
          ]
        : [
            { name: '香港理工大学', logo: 'image/polyu-mark.jpg' },
            { name: '意大利米兰理工大学', logo: 'image/milano.jpg' },
            { name: '巴黎萨克雷大学', logo: 'image/saclay.png' }
          ],
      enterprise: isEnglish
        ? [
            { name: 'Commercial Aircraft Corporation of China (COMAC)', logo: 'assets/images/partners/comac-logo.jpg' },
            { name: 'China Electronic Product Reliability and Environmental Testing Research Institute', logo: 'assets/images/partners/ceprei-logo.jpg' },
            { name: 'Huawei 2012 Laboratories', logo: 'assets/images/partners/huawei-logo-full.svg' },
            { name: 'Zhejiang Loong Airlines Maintenance Engineering Co., Ltd.', logo: 'assets/images/partners/loongair-logo-cropped.jpg' },
            { name: 'Suparna Airlines', logo: 'assets/images/partners/suparna-logo.png' }
          ]
        : [
            { name: '中国商飞有限公司', logo: 'assets/images/partners/comac-logo.jpg' },
            { name: '工信部电子信息五所', logo: 'assets/images/partners/ceprei-logo.jpg' },
            { name: '华为2012实验室', logo: 'assets/images/partners/huawei-logo-full.svg' },
            { name: '浙江长龙航空维修工程有限公司', logo: 'assets/images/partners/loongair-logo-cropped.jpg' },
            { name: '金鹏航空', logo: 'assets/images/partners/suparna-logo.png' }
          ]
    };
    const app = document.createElement('div');
    app.className = 'research-page-shell';
    app.innerHTML = `
      <div class="research-page-layout">
        <aside class="personnel-sidebar" aria-label="${labels.title}">
          <div class="course-side-list">
            ${sections.map(([key, label], index) => `
              ${key === 'directions' ? `
                <div class="personnel-side-group" data-research-direction-group>
                  <button class="personnel-side-button${index === 0 ? ' is-active' : ''}" type="button" data-research-page-view="directions">
                    <span>${label}</span><span class="personnel-side-symbol" aria-hidden="true"></span>
                  </button>
                  <div class="personnel-side-members">
                    ${labels.directionItems.map((title, directionIndex) => `
                      <button type="button" data-research-direction-index="${directionIndex}">${title}</button>
                    `).join('')}
                  </div>
                </div>
              ` : key === 'outputs' ? `
                <div class="personnel-side-group" data-research-output-group>
                  <button class="personnel-side-button" type="button" data-research-page-view="outputs">
                    <span>${label}</span><span class="personnel-side-symbol" aria-hidden="true"></span>
                  </button>
                  <div class="personnel-side-members">
                    ${outputCategories.map(([category, categoryLabel]) => `
                      <button type="button" data-research-output-category="${category}">${categoryLabel}</button>
                    `).join('')}
                  </div>
                </div>
              ` : key === 'cooperation' ? `
                <div class="personnel-side-group" data-research-cooperation-group>
                  <button class="personnel-side-button" type="button" data-research-page-view="cooperation">
                    <span>${label}</span><span class="personnel-side-symbol" aria-hidden="true"></span>
                  </button>
                  <div class="personnel-side-members">
                    <button type="button" data-research-cooperation-category="domestic">${labels.domestic}</button>
                    <button type="button" data-research-cooperation-category="international">${labels.international}</button>
                    <button type="button" data-research-cooperation-category="enterprise">${labels.enterprise}</button>
                  </div>
                </div>
              ` : `
                <button class="personnel-side-button${index === 0 ? ' is-active' : ''}" type="button" data-research-page-view="${key}">${label}</button>
              `}
            `).join('')}
          </div>
        </aside>
        <div class="research-page-main">
          <header class="personnel-page-heading">
            <h1 data-research-page-heading>${labels.directions}</h1>
            <nav class="personnel-breadcrumb" aria-label="Breadcrumb">
              <button type="button" data-research-page-home>${labels.home}</button>
              <span>/</span>
              <button type="button" data-research-page-overview>${labels.title}</button>
              <i>/</i>
              <strong data-research-page-current>${labels.directions}</strong>
              <i data-research-page-detail-separator hidden>/</i>
              <strong data-research-page-detail hidden></strong>
            </nav>
          </header>
          <section class="research-page-panel" data-research-page-panel="directions"></section>
          <section class="research-page-panel" data-research-page-panel="projects" hidden></section>
          <section class="research-page-panel" data-research-page-panel="outputs" hidden></section>
          <section class="research-page-panel" data-research-page-panel="cooperation" hidden></section>
        </div>
      </div>
    `;
    const directionsPanel = app.querySelector('[data-research-page-panel="directions"]');
    const projectsPanel = app.querySelector('[data-research-page-panel="projects"]');
    const outputsPanel = app.querySelector('[data-research-page-panel="outputs"]');
    const cooperationPanel = app.querySelector('[data-research-page-panel="cooperation"]');
    while (directionsSource.firstChild) directionsPanel.append(directionsSource.firstChild);
    projectsPanel.innerHTML = projectsHtml;
    while (achievementsSource.firstChild) outputsPanel.append(achievementsSource.firstChild);
    outputsPanel.querySelector('.achievement-subnav')?.remove();
    const outputYearRanges = ['2026', '2025', '2024', '2023-2018', '2017-2013'];
    outputsPanel.insertAdjacentHTML('afterbegin', `
      <nav class="education-subnav achievement-subnav" data-journal-year-nav data-output-year-nav aria-label="${isEnglish ? 'Journal year navigation' : '期刊论文年份导航'}">
        ${outputYearRanges.map((range, index) => `
          <button class="${index === 0 ? 'is-active' : ''}" type="button" data-journal-year-target="achievement-journals-${range}">${range}</button>
        `).join('')}
      </nav>
      <nav class="education-subnav achievement-subnav" data-conference-year-nav data-output-year-nav aria-label="${isEnglish ? 'Conference year navigation' : '会议及其他年份导航'}" hidden>
        ${outputYearRanges.map((range, index) => `
          <button class="${index === 0 ? 'is-active' : ''}" type="button" data-conference-year-target="achievement-conferences-${range}">${range}</button>
        `).join('')}
      </nav>
    `);
    const journalYearNav = outputsPanel.querySelector('[data-journal-year-nav]');
    const conferenceYearNav = outputsPanel.querySelector('[data-conference-year-nav]');
    let currentJournalYearRange = '2026';
    let currentConferenceYearRange = '2026';
    const showPublicationYearRange = (categoryName, range = '2026') => {
      const nav = categoryName === 'conferences' ? conferenceYearNav : journalYearNav;
      const targetAttribute = categoryName === 'conferences'
        ? 'conferenceYearTarget'
        : 'journalYearTarget';
      nav?.querySelectorAll('button').forEach((button) => {
        const isActive = button.dataset[targetAttribute] === `achievement-${categoryName}-${range}`;
        button.classList.toggle('is-active', isActive);
        button.setAttribute('aria-pressed', String(isActive));
      });
      const section = outputsPanel.querySelector(`#achievement-${categoryName}`);
      const groups = section?.querySelectorAll('.publication-year-group') || [];
      if (!groups.length) return false;
      groups.forEach((group) => {
        group.hidden = group.id !== `achievement-${categoryName}-${range}`;
      });
      const target = document.getElementById(`achievement-${categoryName}-${range}`);
      if (target && !target.querySelector('.publication-list, .publication-status')) {
        const empty = document.createElement('p');
        empty.className = 'publication-status';
        empty.textContent = categoryName === 'conferences'
          ? (isEnglish ? 'No conference publications for this year.' : '该年份暂无会议及其他成果。')
          : (isEnglish ? 'No journal papers for this year.' : '该年份暂无期刊论文。');
        target.append(empty);
      }
      return true;
    };
    const showJournalYearRange = (range = '2026') => {
      currentJournalYearRange = range;
      return showPublicationYearRange('journals', range);
    };
    const showConferenceYearRange = (range = '2026') => {
      currentConferenceYearRange = range;
      return showPublicationYearRange('conferences', range);
    };
    journalYearNav?.querySelectorAll('[data-journal-year-target]').forEach((button) => {
      button.addEventListener('click', () => {
        showJournalYearRange(button.dataset.journalYearTarget.replace('achievement-journals-', ''));
      });
    });
    conferenceYearNav?.querySelectorAll('[data-conference-year-target]').forEach((button) => {
      button.addEventListener('click', () => {
        showConferenceYearRange(button.dataset.conferenceYearTarget.replace('achievement-conferences-', ''));
      });
    });
    if (!showJournalYearRange(currentJournalYearRange)) {
      document.addEventListener(
        'publications:rendered',
        () => {
          showJournalYearRange(currentJournalYearRange);
          showConferenceYearRange(currentConferenceYearRange);
        },
        { once: true }
      );
    }
    cooperationPanel.innerHTML = `
      <div class="cooperation-list-view" data-cooperation-list>
        <p class="cooperation-intro">${labels.cooperationIntro}</p>
        <p class="cooperation-intro">${labels.cooperationStatus}</p>
        <div class="cooperation-category-grid">
          ${['domestic', 'international', 'enterprise'].map((category) => `
            <button class="cooperation-category-card" type="button" data-cooperation-category="${category}">
              <span class="cooperation-category-image" aria-hidden="true">
                <span class="cooperation-category-logos cooperation-category-logos--${category}">
                  ${cooperationGroups[category].map(({ name, logo }) => `
                    <img src="${logo}" alt="" title="${name}">
                  `).join('')}
                </span>
              </span>
              <span class="cooperation-category-copy">
                <strong>${labels[category]}</strong>
                <small>${labels.categoryDescriptions[category]}</small>
              </span>
            </button>
          `).join('')}
        </div>
      </div>
      <section class="cooperation-partner-view" data-cooperation-partners hidden>
        <button class="cooperation-back" type="button" data-cooperation-category-back>${labels.cooperationCategoryBack}</button>
        <h2 data-cooperation-category-title></h2>
        <ul class="cooperation-partner-list" data-cooperation-grid></ul>
      </section>
    `;
    researchPage.replaceChildren(app);

    const routeNames = {
      directions: 'research',
      projects: 'research-projects',
      outputs: 'achievements',
      cooperation: 'research-cooperation'
    };
    const detailSeparator = app.querySelector('[data-research-page-detail-separator]');
    const detailBreadcrumb = app.querySelector('[data-research-page-detail]');
    const setResearchDetailBreadcrumb = (text = '') => {
      if (detailSeparator) detailSeparator.hidden = !text;
      if (detailBreadcrumb) {
        detailBreadcrumb.hidden = !text;
        detailBreadcrumb.textContent = text;
      }
    };
    let currentOutputCategory = 'journals';
    const showOutputCategory = (categoryName = 'journals') => {
      currentOutputCategory = outputCategories.some(([category]) => category === categoryName)
        ? categoryName
        : 'journals';
      outputsPanel.querySelectorAll('.publication-block').forEach((section) => {
        section.hidden = section.id !== `achievement-${currentOutputCategory}`;
      });
      if (journalYearNav) journalYearNav.hidden = currentOutputCategory !== 'journals';
      if (conferenceYearNav) conferenceYearNav.hidden = currentOutputCategory !== 'conferences';
      if (currentOutputCategory === 'journals') showJournalYearRange(currentJournalYearRange);
      if (currentOutputCategory === 'conferences') showConferenceYearRange(currentConferenceYearRange);
      app.querySelectorAll('[data-research-output-category]').forEach((button) => {
        button.classList.toggle(
          'is-active',
          button.dataset.researchOutputCategory === currentOutputCategory
        );
      });
      setResearchDetailBreadcrumb(
        outputCategories.find(([category]) => category === currentOutputCategory)?.[1] || labels.journals
      );
    };
    let currentCooperationCategory = 'domestic';
    const showCooperationOverview = () => {
      const list = cooperationPanel.querySelector('[data-cooperation-list]');
      const partners = cooperationPanel.querySelector('[data-cooperation-partners]');
      if (list) list.hidden = false;
      if (partners) partners.hidden = true;
      app.querySelectorAll('[data-research-cooperation-category]').forEach((button) => {
        button.classList.remove('is-active');
      });
      setResearchDetailBreadcrumb(labels.cooperationOverview);
    };
    const showCooperationCategory = (categoryName = 'domestic') => {
      currentCooperationCategory = cooperationGroups[categoryName] ? categoryName : 'domestic';
      const list = cooperationPanel.querySelector('[data-cooperation-list]');
      const partners = cooperationPanel.querySelector('[data-cooperation-partners]');
      const grid = cooperationPanel.querySelector('[data-cooperation-grid]');
      const title = cooperationPanel.querySelector('[data-cooperation-category-title]');
      if (list) list.hidden = true;
      if (partners) partners.hidden = false;
      if (title) title.textContent = labels[currentCooperationCategory];
      app.querySelectorAll('[data-research-cooperation-category]').forEach((button) => {
        button.classList.toggle(
          'is-active',
          button.dataset.researchCooperationCategory === currentCooperationCategory
        );
      });
      setResearchDetailBreadcrumb(labels[currentCooperationCategory]);
      if (grid) {
        grid.innerHTML = cooperationGroups[currentCooperationCategory].map(({ name, logo, mark }) => `
          <li class="cooperation-partner-item">
            <span class="cooperation-partner-logo" aria-hidden="true">
              ${logo
                ? `<img src="${logo}" alt="" loading="lazy">`
                : `<span class="cooperation-partner-mark">${mark}</span>`}
            </span>
            <strong>${name}</strong>
          </li>
        `).join('');
      }
    };
    cooperationPanel.querySelectorAll('[data-cooperation-category]').forEach((button) => {
      button.addEventListener('click', () => showCooperationCategory(button.dataset.cooperationCategory));
    });
    cooperationPanel.querySelector('[data-cooperation-category-back]')?.addEventListener('click', showCooperationOverview);
    showResearchPageView = (viewName = 'directions') => {
      const targetView = sections.some(([key]) => key === viewName) ? viewName : 'directions';
      const currentLabel = sections.find(([key]) => key === targetView)?.[1] || labels.directions;
      app.querySelectorAll('[data-research-page-view]').forEach((button) => {
        button.classList.toggle('is-active', button.dataset.researchPageView === targetView);
      });
      const cooperationGroup = app.querySelector('[data-research-cooperation-group]');
      cooperationGroup?.classList.toggle('is-expanded', targetView === 'cooperation');
      cooperationGroup?.querySelector(':scope > .personnel-side-button')
        ?.setAttribute('aria-expanded', String(targetView === 'cooperation'));
      const outputGroup = app.querySelector('[data-research-output-group]');
      outputGroup?.classList.toggle('is-expanded', targetView === 'outputs');
      outputGroup?.querySelector(':scope > .personnel-side-button')
        ?.setAttribute('aria-expanded', String(targetView === 'outputs'));
      const directionGroup = app.querySelector('[data-research-direction-group]');
      directionGroup?.classList.toggle('is-expanded', targetView === 'directions');
      directionGroup?.querySelector(':scope > .personnel-side-button')
        ?.setAttribute('aria-expanded', String(targetView === 'directions'));
      app.querySelectorAll('[data-research-page-panel]').forEach((panel) => {
        panel.hidden = panel.dataset.researchPagePanel !== targetView;
      });
      const heading = app.querySelector('[data-research-page-heading]');
      const current = app.querySelector('[data-research-page-current]');
      if (heading) heading.textContent = currentLabel;
      if (current) current.textContent = currentLabel;
      setResearchDetailBreadcrumb('');
      if (targetView === 'directions') resetResearchTopicDetail();
      if (targetView === 'cooperation') showCooperationOverview();
      if (targetView === 'outputs') {
        document.dispatchEvent(new CustomEvent('publications:load'));
        showOutputCategory(currentOutputCategory);
      }
    };
    app.querySelectorAll('[data-research-page-view]').forEach((button) => {
      button.addEventListener('click', () => {
        const group = button.closest('[data-research-direction-group], [data-research-cooperation-group], [data-research-output-group]');
        if (group?.classList.contains('is-expanded')) {
          group.classList.remove('is-expanded');
          button.setAttribute('aria-expanded', 'false');
          return;
        }
        showPage(routeNames[button.dataset.researchPageView]);
      });
    });
    app.querySelectorAll('[data-research-cooperation-category]').forEach((button) => {
      button.addEventListener('click', () => {
        showPage('research-cooperation');
        showCooperationCategory(button.dataset.researchCooperationCategory);
      });
    });
    app.querySelectorAll('[data-research-output-category]').forEach((button) => {
      button.addEventListener('click', () => {
        showPage('achievements');
        showOutputCategory(button.dataset.researchOutputCategory);
      });
    });
    app.querySelectorAll('[data-research-direction-index]').forEach((button) => {
      button.addEventListener('click', () => {
        showPage('research');
        requestAnimationFrame(() => {
          showResearchTopicDetailPage(Number(button.dataset.researchDirectionIndex));
        });
      });
    });
    app.querySelector('[data-research-page-home]')?.addEventListener('click', () => showPage('home'));
    app.querySelector('[data-research-page-overview]')?.addEventListener('click', () => showPage('research'));
    showCooperationOverview();
    showOutputCategory('journals');
    showResearchPageView('directions');
  }

  setupResearchPage();
  let showStudentView = () => {};

  function upgradeEducationPage() {
    const pageShell = document.querySelector('#education .page-shell');
    const feature = document.getElementById('education-students');
    const recruitmentSection = document.getElementById('education-recruitment');
    const recruitmentWrap = recruitmentSection?.closest('.recruitment-content');
    if (!pageShell || !feature || !recruitmentWrap) return;

    pageShell.querySelector('.education-subnav')?.remove();
    const doctoralGroup = document.getElementById('current-doctoral');
    const mastersGroup = document.getElementById('current-masters');
    const undergraduatesGroup = document.getElementById('current-undergraduates');
    if (!doctoralGroup || !mastersGroup) return;

    const academicYears = ['2024', '2025', '2026'];
    const existingMemberIds = new Set(
      Array.from(feature.querySelectorAll('.student-card')).map((card) => {
        const profileUrl = new URL(card.getAttribute('href'), window.location.href);
        return profileUrl.searchParams.get('id');
      })
    );
    const studentProfiles = window.TEAM_HOMEPAGE_DATA?.studentProfiles || {};
    Object.entries(studentProfiles).forEach(([memberId, profile]) => {
      if (existingMemberIds.has(memberId)) return;
      const targetGroup = profile.category === 'doctoral'
        ? doctoralGroup
        : profile.category === 'undergraduates'
          ? undergraduatesGroup
          : mastersGroup;
      if (!targetGroup) return;
      const list = targetGroup.querySelector('.student-grid');
      if (!list) return;
      const item = document.createElement('li');
      const avatarMarkup = profile.photo
        ? `<img src="${profile.photo}" alt="${isEnglish ? profile.enName : profile.name}" loading="lazy">`
        : `<span class="student-card-avatar-placeholder" aria-label="${isEnglish ? `No photo available for ${profile.enName}` : `${profile.name}暂无照片`}">${placeholderIcon}</span>`;
      item.innerHTML = `
        <a class="student-card" href="students/profile.html?id=${memberId}&amp;lang=${isEnglish ? 'en' : 'zh'}">
          ${avatarMarkup}
          <span class="student-card-body">
            <span class="student-card-name">${isEnglish ? profile.enName : profile.name}</span>
            <span class="student-card-meta">${isEnglish ? profile.majorEn : profile.major}</span>
            <span class="student-card-link">${isEnglish ? 'Personal Profile →' : '个人主页 →'}</span>
          </span>
        </a>
      `;
      list.append(item);
    });
    const gradeByMember = {
      'dongcan-liu': '2026',
      'yu-guo': '2026',
      'xinhang-chen': '2024',
      'jun-deng': '2024',
      'jing-li': '2024',
      'zhihuan-wei': '2024',
      'kunlong-huang': '2025',
      'yanyan-wu': '2025',
      'yongpeng-qi': '2025',
      'linhan-zhang': '2025',
      'pedro-martin': '2025',
      'zuhaer-tousif': '2025'
    };
    const studentsByYear = {};
    const advisorOrder = { '胡杨': 0, '李洋': 1, '江肖禹': 2 };
    const yearLabel = (year) => isEnglish ? `Class of ${year}` : `${year}级`;
    const yearBranches = (category) => {
      const categoryYears = category === 'doctoral' || category === 'alumni-doctoral'
        ? academicYears.filter((year) => year !== '2024' && year !== '2025')
        : academicYears;
      return categoryYears.map((year) => {
      const members = studentsByYear[`${category}-${year}`] || [];
      return `
        <div class="personnel-side-group" data-student-year-group="${category}-${year}">
          <button class="personnel-side-button" type="button" data-student-year-view="${category}" data-student-year="${year}">
            <span>${yearLabel(year)}</span><span class="personnel-side-symbol" aria-hidden="true"></span>
          </button>
          <div class="personnel-side-members">
            ${members.map((member) => `<button type="button" data-student-member="${member.id}" data-student-member-view="${category}">${member.name}</button>`).join('')}
          </div>
        </div>
      `;
      }).join('');
    };

    const memberLinks = (group, category, options = {}) => {
      const includeInSidebar = options.includeInSidebar !== false;
      Array.from(group.querySelectorAll('.student-card')).forEach((card) => {
      const name = card.querySelector('.student-card-name')?.textContent.trim() || '';
      const profileUrl = new URL(card.getAttribute('href'), window.location.href);
      const memberId = profileUrl.searchParams.get('id') || name;
      const profile = studentProfiles[memberId];
      const gradeValue = profile?.year || gradeByMember[memberId] || '';
      const advisorValue = profile?.advisor || '胡杨';
      const meta = card.querySelector('.student-card-meta');
      if (profile && meta) meta.textContent = isEnglish ? profile.majorEn : profile.major;
      if (includeInSidebar && gradeValue) {
        const yearKey = `${category}-${gradeValue}`;
        studentsByYear[yearKey] ||= [];
        studentsByYear[yearKey].push({ id: memberId, name, advisor: advisorValue });
      }
      card.dataset.studentMemberCard = memberId;
      card.dataset.studentMemberView = category;
      card.dataset.studentYear = gradeValue || 'unknown';
      card.removeAttribute('href');
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      const cardBody = card.querySelector('.student-card-body');
      const detailLabel = card.querySelector('.student-card-link');
      card.querySelector('.student-card-email')?.remove();
      const grade = document.createElement('span');
      const advisor = document.createElement('span');
      grade.className = 'student-card-grade';
      advisor.className = 'student-card-advisor';
      grade.textContent = gradeValue
        ? (isEnglish ? `Year: ${gradeValue}` : `年级：${gradeValue}级`)
        : (isEnglish ? 'Year: To be confirmed' : '年级：待确认');
      const advisorName = isEnglish
        ? (profile?.advisorEn || 'Yang Hu')
        : (profile?.advisor || '胡杨');
      advisor.textContent = isEnglish ? `Supervisor: ${advisorName}` : `指导教师：${advisorName}`;
      if (cardBody && detailLabel) {
        if (category !== 'undergraduates') {
          cardBody.insertBefore(grade, detailLabel);
          cardBody.insertBefore(advisor, detailLabel);
        }
      }
      if (detailLabel) detailLabel.textContent = isEnglish ? 'View details →' : '查看详情 →';
      });
      const list = group.querySelector('.student-grid');
      if (list) {
        Array.from(list.children)
          .sort((itemA, itemB) => {
            const cardA = itemA.querySelector('[data-student-member-card]');
            const cardB = itemB.querySelector('[data-student-member-card]');
            const yearA = Number(cardA?.dataset.studentYear) || Number.POSITIVE_INFINITY;
            const yearB = Number(cardB?.dataset.studentYear) || Number.POSITIVE_INFINITY;
            if (yearA !== yearB) return yearA - yearB;
            const advisorA = studentProfiles[cardA?.dataset.studentMemberCard]?.advisor || '胡杨';
            const advisorB = studentProfiles[cardB?.dataset.studentMemberCard]?.advisor || '胡杨';
            return (advisorOrder[advisorA] ?? 99) - (advisorOrder[advisorB] ?? 99);
          })
          .forEach((item) => list.append(item));
      }
      Object.keys(studentsByYear)
        .filter((key) => key.startsWith(`${category}-`))
        .forEach((key) => {
          studentsByYear[key].sort(
            (memberA, memberB) => (advisorOrder[memberA.advisor] ?? 99) - (advisorOrder[memberB.advisor] ?? 99)
          );
        });
      return includeInSidebar ? yearBranches(category) : '';
    };
    if (undergraduatesGroup) memberLinks(undergraduatesGroup, 'undergraduates', { includeInSidebar: false });

    const labels = isEnglish
      ? {
          title: 'Students',
          overview: 'Student Overview',
          doctoral: 'Doctoral Students',
          masters: 'Master’s Students',
          undergraduates: 'Undergraduate Students',
          alumni: 'Alumni',
          alumniDoctoral: 'Doctoral Alumni',
          alumniMasters: 'Master’s Alumni',
          home: 'Home'
        }
      : {
          title: '学生培养',
          overview: '学生培养',
          doctoral: '博士研究生',
          masters: '硕士研究生',
          undergraduates: '本科生',
          alumni: '往届研究生',
          alumniDoctoral: '博士研究生',
          alumniMasters: '硕士研究生',
          home: '首页'
        };

    const layout = document.createElement('div');
    layout.className = 'personnel-page-shell student-page-shell';
    layout.innerHTML = `
      <div class="personnel-layout">
        <aside class="personnel-sidebar" aria-label="${labels.title}">
          <button class="personnel-side-button personnel-side-overview is-active" type="button" data-student-view="overview">
            <span>${labels.overview}</span>
          </button>
          <div class="personnel-side-list">
            <div class="personnel-side-group student-side-group" data-student-group="doctoral">
              <button class="personnel-side-button" type="button" data-student-view="doctoral">
                <span>${labels.doctoral}</span><span class="personnel-side-symbol" aria-hidden="true"></span>
              </button>
              <div class="personnel-side-members">${memberLinks(doctoralGroup, 'doctoral')}</div>
            </div>
            <div class="personnel-side-group student-side-group" data-student-group="masters">
              <button class="personnel-side-button" type="button" data-student-view="masters">
                <span>${labels.masters}</span><span class="personnel-side-symbol" aria-hidden="true"></span>
              </button>
              <div class="personnel-side-members">${memberLinks(mastersGroup, 'masters')}</div>
            </div>
            <div class="personnel-side-group student-side-group" data-student-group="alumni">
              <button class="personnel-side-button" type="button" data-student-alumni>
                <span>${labels.alumni}</span><span class="personnel-side-symbol" aria-hidden="true"></span>
              </button>
              <div class="personnel-side-members student-alumni-branches">
                <div class="personnel-side-group" data-student-alumni-group="alumni-doctoral">
                  <button class="personnel-side-button" type="button" data-student-view="alumni-doctoral">
                    <span>${labels.alumniDoctoral}</span><span class="personnel-side-symbol" aria-hidden="true"></span>
                  </button>
                  <div class="personnel-side-members">${yearBranches('alumni-doctoral')}</div>
                </div>
                <div class="personnel-side-group" data-student-alumni-group="alumni-masters">
                  <button class="personnel-side-button" type="button" data-student-view="alumni-masters">
                    <span>${labels.alumniMasters}</span><span class="personnel-side-symbol" aria-hidden="true"></span>
                  </button>
                  <div class="personnel-side-members">${yearBranches('alumni-masters')}</div>
                </div>
              </div>
            </div>
          </div>
        </aside>
        <div class="personnel-main">
          <header class="personnel-page-heading">
            <h1 data-student-heading>${labels.title}</h1>
            <nav class="personnel-breadcrumb" aria-label="Breadcrumb">
              <button type="button" data-student-home>${labels.home}</button>
              <span>/</span>
              <button type="button" data-student-overview>${labels.title}</button>
              <i data-student-separator hidden>/</i>
              <strong data-student-current hidden></strong>
            </nav>
          </header>
          <div data-student-content></div>
          <section class="student-profile-view" data-student-detail hidden></section>
          <div class="student-empty-view" data-student-empty hidden></div>
        </div>
      </div>
    `;

    feature.querySelector('.education-section-title')?.remove();
    feature.querySelector('.student-subheading')?.remove();
    feature.classList.add('personnel-view', 'is-active');
    layout.querySelector('[data-student-content]')?.append(feature);
    pageShell.insertBefore(layout, recruitmentWrap);
    recruitmentWrap.classList.add('student-recruitment-wrap');
    recruitmentWrap.hidden = true;

    const groups = { doctoral: doctoralGroup, masters: mastersGroup };
    if (undergraduatesGroup) groups.undergraduates = undergraduatesGroup;
    showStudentView = (viewName = 'overview') => {
      const validViews = ['doctoral', 'masters', 'alumni-doctoral', 'alumni-masters'];
      const targetView = validViews.includes(viewName) ? viewName : 'overview';
      const isAlumniView = targetView.startsWith('alumni-');
      const summary = feature.querySelector('.student-summary');
      if (summary) summary.hidden = targetView !== 'overview';
      feature.hidden = isAlumniView;
      feature.classList.remove('is-student-member-mode');
      const detailView = layout.querySelector('[data-student-detail]');
      if (detailView) detailView.hidden = true;
      feature.querySelectorAll('.student-grid > li').forEach((item) => {
        item.hidden = false;
      });
      Object.entries(groups).forEach(([name, group]) => {
        group.hidden = isAlumniView || (targetView !== 'overview' && name !== targetView);
      });
      const emptyView = layout.querySelector('[data-student-empty]');
      if (emptyView) emptyView.hidden = !isAlumniView;
      layout.querySelectorAll('[data-student-view]').forEach((button) => {
        button.classList.toggle('is-active', button.dataset.studentView === targetView);
      });
      layout.querySelectorAll('[data-student-group]').forEach((group) => {
        const expanded = group.dataset.studentGroup === targetView
          || (group.dataset.studentGroup === 'alumni' && isAlumniView);
        group.classList.toggle('is-expanded', expanded);
        group.querySelector(':scope > .personnel-side-button')
          ?.setAttribute('aria-expanded', String(expanded));
      });
      layout.querySelectorAll('[data-student-alumni-group]').forEach((group) => {
        const expanded = group.dataset.studentAlumniGroup === targetView;
        group.classList.toggle('is-expanded', expanded);
        group.querySelector(':scope > .personnel-side-button')
          ?.setAttribute('aria-expanded', String(expanded));
      });
      layout.querySelectorAll('[data-student-year-group]').forEach((group) => {
        group.classList.remove('is-expanded');
        group.querySelector(':scope > .personnel-side-button')
          ?.setAttribute('aria-expanded', 'false');
      });
      layout.querySelectorAll('[data-student-member]').forEach((button) => {
        button.classList.remove('is-active');
      });
      const heading = layout.querySelector('[data-student-heading]');
      const current = layout.querySelector('[data-student-current]');
      const separator = layout.querySelector('[data-student-separator]');
      const viewLabel = {
        overview: labels.title,
        doctoral: labels.doctoral,
        masters: labels.masters,
        undergraduates: labels.undergraduates,
        'alumni-doctoral': labels.alumniDoctoral,
        'alumni-masters': labels.alumniMasters
      }[targetView] || labels.title;
      if (heading) heading.textContent = viewLabel;
      if (current) {
        current.textContent = viewLabel;
        current.hidden = targetView === 'overview';
      }
      if (separator) separator.hidden = targetView === 'overview';
    };

    const showStudentYear = (category, year) => {
      showStudentView(category);
      if (category === 'doctoral' || category === 'masters') {
        const targetGroup = groups[category];
        targetGroup?.querySelectorAll('.student-grid > li').forEach((item) => {
          const card = item.querySelector('[data-student-member-card]');
          item.hidden = card?.dataset.studentYear !== year;
        });
      }
      const yearGroup = layout.querySelector(
        `[data-student-year-group="${category}-${year}"]`
      );
      yearGroup?.classList.add('is-expanded');
      yearGroup?.querySelector(':scope > .personnel-side-button')
        ?.setAttribute('aria-expanded', 'true');
      const categoryLabel = {
        doctoral: labels.doctoral,
        masters: labels.masters,
        'alumni-doctoral': labels.alumniDoctoral,
        'alumni-masters': labels.alumniMasters
      }[category] || labels.title;
      const heading = layout.querySelector('[data-student-heading]');
      const current = layout.querySelector('[data-student-current]');
      const separator = layout.querySelector('[data-student-separator]');
      if (heading) heading.textContent = yearLabel(year);
      if (current) {
        current.textContent = `${categoryLabel} / ${yearLabel(year)}`;
        current.hidden = false;
      }
      if (separator) separator.hidden = false;
    };

    const showStudentMember = (memberId, category) => {
      showStudentView(category);
      const selectedCard = feature.querySelector(`[data-student-member-card="${memberId}"]`);
      const profile = studentProfiles[memberId];
      const memberYear = selectedCard?.dataset.studentYear || profile?.year || '';
      const memberName = selectedCard?.querySelector('.student-card-name')?.textContent.trim() || '';
      const photo = selectedCard?.querySelector('img');
      const major = selectedCard?.querySelector('.student-card-meta')?.textContent.trim() || '';
      const grade = selectedCard?.querySelector('.student-card-grade')?.textContent.trim() || '';
      const advisor = selectedCard?.querySelector('.student-card-advisor')?.textContent.trim() || '';
      const detailView = layout.querySelector('[data-student-detail]');
      const sections = isEnglish
        ? [
            ['Personal Profile', profile?.bioEn],
            ['Research Interests', profile?.researchEn],
            ['Academic Achievements', profile?.achievementsEn]
          ]
        : [
            ['个人简介', profile?.bio],
            ['研究方向', profile?.research],
            ['学术成果', profile?.achievements]
          ];
      const emptyText = isEnglish ? 'Information to be added.' : '信息待补充。';
      const photoMarkup = photo
        ? `<img class="student-profile-photo" src="${photo.getAttribute('src') || ''}" alt="${photo.getAttribute('alt') || memberName}">`
        : `<div class="student-profile-photo-placeholder" aria-label="${isEnglish ? 'No photo available' : '暂无照片'}">${placeholderIcon}</div>`;
      feature.hidden = true;
      if (detailView) {
        detailView.innerHTML = `
          <div class="student-profile-intro">
            ${photoMarkup}
            <div>
              <h2 class="student-profile-name">${memberName}</h2>
              <p class="student-profile-meta">${major}</p>
              <p class="student-profile-meta">${grade}</p>
              <p class="student-profile-meta">${advisor}</p>
            </div>
          </div>
          <div class="student-profile-sections">
            ${sections.map(([title, content]) => `
              <section class="student-profile-section">
                <h3>${title}</h3>
                <p>${content || emptyText}</p>
              </section>
            `).join('')}
          </div>
        `;
        detailView.hidden = false;
      }
      const yearGroup = layout.querySelector(
        `[data-student-year-group="${category}-${memberYear}"]`
      );
      yearGroup?.classList.add('is-expanded');
      yearGroup?.querySelector(':scope > .personnel-side-button')
        ?.setAttribute('aria-expanded', 'true');
      layout.querySelectorAll('[data-student-member]').forEach((button) => {
        button.classList.toggle(
          'is-active',
          button.dataset.studentMember === memberId
            && button.dataset.studentMemberView === category
        );
      });
      const heading = layout.querySelector('[data-student-heading]');
      const current = layout.querySelector('[data-student-current]');
      const separator = layout.querySelector('[data-student-separator]');
      const categoryLabel = labels[category] || labels.title;
      if (heading) heading.textContent = memberName || categoryLabel;
      if (current) {
        current.textContent = `${categoryLabel} / ${memberName}`;
        current.hidden = false;
      }
      if (separator) separator.hidden = false;
    };
    showStudentMemberView = showStudentMember;

    layout.querySelectorAll('[data-student-view]').forEach((button) => {
      const routes = {
        doctoral: 'doctoral-students',
        masters: 'masters-students',
        'alumni-doctoral': 'alumni-doctoral',
        'alumni-masters': 'alumni-masters',
        overview: 'education'
      };
      button.addEventListener('click', () => {
        const group = button.closest('[data-student-group]');
        const alumniGroup = button.closest('[data-student-alumni-group]');
        if (alumniGroup?.classList.contains('is-expanded')) {
          alumniGroup.classList.remove('is-expanded');
          button.setAttribute('aria-expanded', 'false');
          return;
        }
        const isCategoryButton = group?.dataset.studentGroup === button.dataset.studentView;
        if (isCategoryButton && group.classList.contains('is-expanded')) {
          group.classList.remove('is-expanded');
          button.setAttribute('aria-expanded', 'false');
          return;
        }
        showPage(routes[button.dataset.studentView] || 'education');
      });
    });
    layout.querySelectorAll('[data-student-member]').forEach((button) => {
      button.addEventListener('click', () => {
        showStudentMember(button.dataset.studentMember, button.dataset.studentMemberView);
      });
    });
    layout.querySelectorAll('[data-student-year-view]').forEach((button) => {
      button.addEventListener('click', () => {
        const group = button.closest('[data-student-year-group]');
        if (group?.classList.contains('is-expanded')) {
          group.classList.remove('is-expanded');
          button.setAttribute('aria-expanded', 'false');
          return;
        }
        showStudentYear(button.dataset.studentYearView, button.dataset.studentYear);
      });
    });
    feature.querySelectorAll('[data-student-member-card]').forEach((card) => {
      const openMember = () => showStudentMember(
        card.dataset.studentMemberCard,
        card.dataset.studentMemberView
      );
      card.addEventListener('click', openMember);
      card.addEventListener('keydown', (event) => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        openMember();
      });
    });
    layout.querySelector('[data-student-alumni]')?.addEventListener('click', (event) => {
      const group = event.currentTarget.closest('[data-student-group]');
      const expanded = group?.classList.toggle('is-expanded');
      event.currentTarget.setAttribute('aria-expanded', String(Boolean(expanded)));
      if (!expanded) {
        group?.querySelectorAll('[data-student-alumni-group]').forEach((branch) => {
          branch.classList.remove('is-expanded');
          branch.querySelector(':scope > .personnel-side-button')
            ?.setAttribute('aria-expanded', 'false');
        });
      }
    });
    layout.querySelector('[data-student-home]')?.addEventListener('click', () => showPage('home'));
    layout.querySelector('[data-student-overview]')?.addEventListener('click', () => showPage('education'));
  }

  let showStudentMemberView = () => {};
  upgradeEducationPage();
  let resetCourseView = () => {};

  function setupCourses() {
    const app = document.querySelector('[data-course-app]');
    if (!app) return;
    const courseText = {
      ai: {
        title: isEnglish
          ? 'Artificial Intelligence and Advanced Large Models'
          : 'Artificial Intelligence and Advanced Large Models（人工智能与高级大模型，全英文授课）',
        type: isEnglish ? 'Graduate Theoretical Course' : '研究生理论课程',
        category: 'graduate-theory',
        description: isEnglish
          ? 'A 32-hour graduate course that treats AI as an end-to-end engineering system, helping students build durable orientation across foundation models, RAG, agents, evaluation, deployment, safety, and AI for engineering systems.'
          : '将人工智能视为“数据—建模—训练—推理—评估—部署—治理”的端到端工程系统，帮助学生建立面向基础模型、RAG、智能体、评估、安全与工程应用的整体认知。',
        facts: isEnglish
          ? [
              ['Course Code', 'D253041002'],
              ['Contact Hours', '32 hours · 16 sessions'],
              ['Target Students', 'Engineering graduate students'],
              ['Prerequisites', 'Python, linear algebra, introductory probability'],
              ['Course Form', 'Conceptual framework + hands-on lab + debrief'],
              ['Project Mode', 'Teams of 3–5 students']
            ]
          : [
              ['课程代码', 'D253041002'],
              ['学时安排', '32学时 · 16次课'],
              ['授课对象', '航空、材料、物理、机械、电气、交通等工程类研究生'],
              ['先修基础', 'Python 编程、线性代数、概率基础'],
              ['课程形式', '概念框架 + 上机实践 + 复盘讨论'],
              ['项目组织', '3–5人团队项目']
            ],
        goals: isEnglish
          ? [
              'Build a global map of modern AI covering data, models, training, inference, evaluation, safety, productization, and governance.',
              'Understand the historical trajectory and core ideas behind neural networks, CNNs, Transformers, GNNs, PINNs, and foundation models.',
              'Design a minimal working AI system such as a RAG workflow or agent-based engineering assistant, then improve it through evaluation.',
              'Use AI tools as reusable learning and engineering workflows rather than one-off prompt tricks.',
              'Apply AI to engineering and scientific contexts including aerospace maintenance reasoning, literature mining, and simulation support.'
            ]
          : [
              '建立现代 AI 的全局地图，理解数据、模型、训练、推理、评估、安全、产品化与治理之间的关系。',
              '掌握神经网络、CNN、注意力机制、Transformer、图神经网络、物理信息神经网络与基础模型的核心思想。',
              '设计一个最小可运行的 AI 系统，例如 RAG 流程或工程智能体，并通过评估持续改进。',
              '把 AI 工具沉淀为可复用的学习与工程工作流，而不是停留在一次性提示词使用。',
              '面向航空维修推理、材料/工程文献挖掘、仿真支持等场景理解 AI for Science / AI for Engineering 的应用路径。'
            ],
        modules: isEnglish
          ? [
              ['System Map and Learning Flywheel', 'AI as an engineering system; history, hierarchy, global map, project themes, and team formation.'],
              ['Tool-Driven Workflows', 'Prompting, reading, synthesis, self-testing, notebooks, and reusable personal/team workflow assets.'],
              ['Modern Model Foundations', 'Classic ML, neural networks, CNNs, attention, Transformers, GNNs, PINNs, data thinking, and compute reality.'],
              ['Foundation Models in Practice', 'Post-training, alignment, RAG, agents, tool use, multimodal extraction, and structured engineering pipelines.'],
              ['Evaluation, Reliability, and Safety', 'Benchmarks, private evals, error taxonomy, prompt injection, data exposure, and fail-safe design.'],
              ['Engineering Applications and Final Demo', 'AI for Science / Engineering Systems cases, efficient adaptation, inference systems, team demo, and growth plan.']
            ]
          : [
              ['系统地图与学习飞轮', '从工程系统视角理解 AI，梳理发展历史、层级结构、全局地图、项目主题与组队机制。'],
              ['工具驱动工作流', '从提示词、阅读、总结、自测到 Notebook 与评估脚本，沉淀个人/团队可复用工具包。'],
              ['现代模型基础', '覆盖经典机器学习、神经网络、CNN、注意力机制、Transformer、GNN、PINNs、数据质量与算力现实。'],
              ['基础模型实践', '理解后训练、对齐、RAG、智能体、工具调用、多模态抽取与工程化流水线。'],
              ['评估、可靠性与安全', '围绕基准、私有评测、误差分析、提示注入、数据暴露与失效保护建立工程判断。'],
              ['工程应用与最终展示', '结合 AI for Science / Engineering Systems 案例、高效适配、推理系统与团队 Demo 完成课程闭环。']
            ],
        teaching: isEnglish
          ? 'Each session combines a concise conceptual framework, a hands-on lab, and a short debrief. The course emphasizes evaluation-driven iteration, tooling fluency, engineering realism, and transferable learning routines.'
          : '每次课通常由概念框架、上机实践与复盘讨论组成。课程强调以评估为主线、以工具驱动能力形成，同时把成本、延迟、可靠性与安全作为真实工程约束。',
        assessment: isEnglish
          ? [
              ['Attendance and participation', '20%'],
              ['Continuous team assignments', '20%'],
              ['Midterm individual milestone', '20%'],
              ['Final team project', '40%']
            ]
          : [
              ['出勤与课堂参与', '20%'],
              ['团队连续作业', '20%'],
              ['个人期中里程碑', '20%'],
              ['团队期末项目', '40%']
            ],
        outputs: isEnglish
          ? [
              'Domain-specific AI system map',
              'Reusable workflow kit: prompt library, notebook templates, and evaluation scripts',
              'Working AI demo for an engineering or scientific scenario',
              'Evaluation report with measurable iteration and error analysis',
              'Academic paper proposal for applying advanced AI in a specific research domain'
            ]
          : [
              '面向所在领域的一页 AI 系统地图',
              '可复用工具工作流包：提示词库、Notebook 模板与评估脚本',
              '面向工程或科学场景的可运行 AI Demo',
              '包含可度量迭代与误差分析的评估报告',
              '面向具体研究领域的高级 AI 应用论文设想'
            ],
        references: []
      },
      probability: {
        title: isEnglish ? 'Probability & Statistics (Taught in English)' : 'Probability & Statistics（概率统计，全英文授课）',
        type: isEnglish ? 'International Graduate Theoretical Course' : '国际留学研究生理论课程',
        category: 'graduate-theory',
        description: isEnglish
          ? 'A 42-hour graduate course that builds a rigorous foundation in probability theory, statistical inference, regression, ANOVA, non-parametric methods, Bayesian estimation, and data-based decision-making.'
          : '系统讲授概率论、统计推断、方差分析、回归与相关分析、非参数方法、贝叶斯估计等内容，服务科研与工程中的不确定性分析和数据决策。',
        facts: isEnglish
          ? [
              ['Course Code', 'D253011004'],
              ['Contact Hours', '42 hours'],
              ['Course Type', 'International graduate course'],
              ['Target Students', 'Graduate students'],
              ['Prerequisites', 'Calculus and linear algebra'],
              ['Teaching Language', 'Fully English-taught']
            ]
          : [
              ['课程代码', 'D253011004'],
              ['学时安排', '42学时'],
              ['课程类型', '国际留学研究生课程'],
              ['授课对象', '研究生'],
              ['先修基础', '微积分、线性代数'],
              ['授课语言', '全英文授课']
            ],
        goals: isEnglish
          ? [
              'Understand and apply core principles of probability theory.',
              'Analyze discrete, continuous, and joint random variables and their distributions.',
              'Use point estimation, interval estimation, hypothesis testing, ANOVA, regression, and correlation analysis.',
              'Apply non-parametric methods and Bayesian estimation where appropriate.',
              'Translate probability and statistics concepts into research, engineering, economics, and industrial problem solving.'
            ]
          : [
              '理解并应用概率论基本原理。',
              '分析离散、连续及联合随机变量及其分布。',
              '掌握点估计、区间估计、假设检验、方差分析、回归与相关分析等统计推断方法。',
              '了解非参数方法与贝叶斯估计的适用场景。',
              '将概率统计方法用于科研、工程、经济与工业问题分析。'
            ],
        modules: isEnglish
          ? [
              ['Probability Foundations', 'Introduction, probability theory, discrete random variables, continuous random variables, and joint probability distributions.'],
              ['Sampling and Inference', 'Statistics, sampling distributions, point estimation, interval estimation, and hypothesis testing.'],
              ['Modeling and Comparison', 'Analysis of variance, regression, correlation analysis, and chi-square tests.'],
              ['Project Practice', 'Group project and presentation applying statistical methods to a real-world problem.']
            ]
          : [
              ['概率基础', '课程导论、概率论、离散随机变量、连续随机变量与联合概率分布。'],
              ['抽样与推断', '统计量与抽样分布、点估计、区间估计与假设检验。'],
              ['建模与比较', '方差分析、回归与相关分析、卡方检验。'],
              ['项目实践', '小组项目与展示，将统计方法应用于真实问题。']
            ],
        teaching: isEnglish
          ? 'The course combines lectures, case studies, practical applications, class discussion, problem-solving sessions, brief student self-introductions, weekly office hours, and continuous feedback through a course representative.'
          : '课程采用课堂讲授、案例分析、实践应用、课堂讨论与问题求解相结合的方式，并通过学生自我介绍、每周答疑、课程代表反馈等机制提升课堂互动。',
        assessment: isEnglish
          ? [
              ['Attendance and participation', '20%'],
              ['Regular homework assignments', '20%'],
              ['Group project and presentation', '20%'],
              ['Final examination', '40%']
            ]
          : [
              ['出勤与课堂参与', '20%'],
              ['平时作业', '20%'],
              ['小组项目与展示', '20%'],
              ['期末考试', '40%']
            ],
        outputs: isEnglish
          ? [
              'Regular problem sets with feedback',
              'Group project on a real-world statistical problem',
              '7-minute project presentation and 3-minute Q&A',
              'Comprehensive final examination'
            ]
          : [
              '带反馈的平时习题作业',
              '面向真实问题的小组项目',
              '7分钟项目汇报与3分钟问答',
              '覆盖全课程内容的综合期末考试'
            ],
        references: [
          isEnglish
            ? 'Modern Mathematical Statistics with Applications, Jay L. Devore, Kenneth N. Berk, Matthew A. Carlton, 3rd edition.'
            : 'Modern Mathematical Statistics with Applications，Jay L. Devore、Kenneth N. Berk、Matthew A. Carlton，第3版。'
        ],
        officialUrl: 'https://shi.buaa.edu.cn/huyang/zh_CN/skxx/214379/content/4323.htm#skxx'
      },
      aviation: {
        title: isEnglish ? 'Design and Simulation of Aviation System Health Management' : '航空系统健康管理设计与仿真',
        type: isEnglish ? 'Graduate Experimental Course' : '研究生实验课程',
        category: 'graduate-experiment',
        description: isEnglish
          ? 'A 16-hour graduate course on aviation PHM system architecture, design principles, simulation modeling, and algorithm development, combining lectures with practical simulation work.'
          : '围绕航空系统 PHM 体系架构、设计原则、仿真建模与算法开发展开，采用课堂讲授与上机实践结合的方式训练系统设计能力。',
        facts: isEnglish
          ? [
              ['Course Code', 'D571061031'],
              ['Contact Hours', '16 hours'],
              ['Course Type', 'Graduate experimental course'],
              ['Target Students', 'Transportation, electronic information, mechanical engineering, and related graduate students'],
              ['Prerequisites', 'Introduction to Aviation Systems or Computer Simulation'],
              ['Keywords', 'Aviation system, PHM, architecture, simulation, algorithm development']
            ]
          : [
              ['课程代码', 'D571061031'],
              ['学时安排', '16学时'],
              ['课程类型', '研究生实验课程'],
              ['授课对象', '交通运输、电子信息、机械工程等相关专业研究生'],
              ['先修课程', '航空系统概论或计算机仿真技术'],
              ['关键词', '航空系统、健康管理、PHM系统、系统架构、仿真、算法开发']
            ],
        goals: isEnglish
          ? [
              'Understand the complexity and system-level characteristics of aviation equipment health management.',
              'Master the architecture, core functions, design principles, and development workflow of aviation PHM systems.',
              'Use simulation tools to design, test, and iterate PHM system components.',
              'Develop practical capability by building core PHM frameworks and algorithms for specific tasks.',
              'Strengthen professional competitiveness for civil aviation fleet operation and maintenance roles.'
            ]
          : [
              '理解航空装备健康管理系统的复杂性、整体性与工程背景。',
              '掌握航空 PHM 系统的体系架构、核心功能、设计原则与研发流程。',
              '使用仿真工具完成 PHM 系统组件设计、测试与迭代。',
              '通过创建 PHM 核心框架和算法，提升动手能力与实践技能。',
              '增强面向民航机队运维等岗位的工程竞争力。'
            ],
        modules: isEnglish
          ? [
              ['Introduction to Aviation Systems and PHM', 'Definitions, key concepts, PHM importance in aviation, and the role of fault prediction and health management.'],
              ['PHM System Architecture', 'Core components, architectural structure, design principles, key functions, and integration with other aviation systems.'],
              ['Design Principles and Development Workflow', 'Aviation PHM design principles, development and implementation process, data acquisition, fault modeling, decision support, and case analysis.'],
              ['Simulation and Modeling', 'Role of simulation, PHM simulation techniques, tool practice, and model development and testing.'],
              ['Algorithm Development', 'Common PHM algorithms, application-oriented development, and practical design for specific PHM tasks.']
            ]
          : [
              ['航空系统与 PHM 简介', '航空系统及健康管理的定义、关键概念、PHM 在航空中的重要性及其在装备运维中的作用。'],
              ['PHM 系统架构', 'PHM 系统核心组成、体系结构、架构设计原则、状态监控、故障诊断、寿命预测与维修决策功能。'],
              ['设计原则与开发流程', '航空 PHM 系统设计原则、开发实施过程、数据采集、故障建模、决策支持与案例分析。'],
              ['仿真与建模', '仿真在 PHM 设计中的作用、故障预测与健康管理仿真技术、仿真工具实践与模型测试。'],
              ['算法开发', 'PHM 常用算法概述、面向系统应用的算法开发，以及特定任务算法设计与实现。']
            ],
        teaching: isEnglish
          ? 'Teaching combines lectures with computer-based practice. Lectures cover system design, principles, and cases; practical sessions use simulation tools and small projects to design and test PHM components.'
          : '课程采用课堂讲授与上机实践相结合的方式。讲授部分聚焦系统设计、原则与案例；上机部分通过仿真工具和小型项目完成 PHM 系统设计与测试。',
        assessment: isEnglish
          ? [
              ['Attendance', '30%'],
              ['After-class exercises', '30%'],
              ['Final course project', '40%']
            ]
          : [
              ['出勤情况', '30%'],
              ['课后练习', '30%'],
              ['课程大作业', '40%']
            ],
        outputs: isEnglish
          ? [
              'PHM system design exercises',
              'Simulation model development and testing',
              'Task-oriented PHM algorithm implementation',
              'Final project integrating architecture, simulation, and algorithm design'
            ]
          : [
              'PHM 系统设计练习',
              '仿真模型开发与测试',
              '面向具体任务的 PHM 算法实现',
              '融合架构、仿真与算法设计的课程大作业'
            ],
        references: isEnglish
          ? [
              '智预——装备故障预测与健康管理：全寿命周期解读与实践, Hu Yang, Han Danyang, Zhu Qingyu, Publishing House of Electronics Industry, 2025.06.',
              '民用客机健康管理系统, Lv Zhenbang et al., Shanghai Jiao Tong University Press, 2019.12.'
            ]
          : [
              '《智预——装备故障预测与健康管理：全寿命周期解读与实践》，胡杨、韩丹阳、祝青钰，电子工业出版社，2025.06。',
              '《民用客机健康管理系统》，吕镇邦等，上海交通大学出版社，2019.12。'
            ]
      }
    };
    const courses = [
      {
        id: 'military-theory',
        title: isEnglish ? 'Military Theory' : '军事理论',
        type: isEnglish ? 'Undergraduate Course' : '本科生课程',
        category: 'undergraduate',
        description: isEnglish
          ? 'Detailed course information will be added later.'
          : '课程详细信息待补充。',
        facts: [],
        goals: [],
        modules: [],
        assessment: [],
        outputs: [],
        references: []
      },
      { id: 'ai-foundation-models', ...courseText.ai },
      { id: 'probability-statistics', ...courseText.probability },
      {
        id: 'stochastic-process',
        title: 'Stochastic Process',
        type: isEnglish ? 'Dual-Degree Graduate Course' : '双学位研究生课程',
        category: 'graduate-theory',
        teacher: isEnglish ? 'Yang Li' : '李洋',
        description: isEnglish
          ? 'Detailed course information will be added later.'
          : '课程详细信息待补充。',
        facts: [],
        goals: [],
        modules: [],
        assessment: [],
        outputs: [],
        references: []
      },
      { id: 'aviation-phm', ...courseText.aviation }
    ];
    const labels = isEnglish
      ? {
          pageTitle: 'Teaching',
          home: 'Home',
          undergraduate: 'Undergraduate Courses',
          graduate: 'Graduate Courses',
          theory: 'Theoretical Courses',
          experiment: 'Practical Courses',
          tag: 'COURSE',
          instructor: 'Instructor',
          teacher: 'Yang Hu',
          type: 'Course Type',
          view: 'View details',
          back: '← Back to courses',
          pending: 'Detailed course information will be added later.',
          overview: 'Course Rationale',
          factsTitle: 'Key Information',
          goals: 'Learning Outcomes',
          teaching: 'Teaching Method',
          assessment: 'Assessment',
          reference: 'Textbooks and References',
          official: 'View the Beihang course page'
        }
      : {
          pageTitle: '课程教学',
          home: '首页',
          undergraduate: '本科生课程',
          graduate: '研究生课程',
          theory: '理论课程',
          experiment: '实践课程',
          tag: '课程',
          instructor: '授课教师',
          teacher: '胡杨',
          type: '课程类型',
          view: '查看课程详情',
          back: '← 返回课程列表',
          pending: '课程详细信息待补充。',
          overview: '课程定位',
          factsTitle: '关键信息',
          goals: '学习目标',
          teaching: '教学方式',
          assessment: '考核方式',
          reference: '教材与参考书',
          official: '查看北航课程主页'
        };

    app.innerHTML = `
      <div class="course-layout">
        <aside class="personnel-sidebar" aria-label="${labels.pageTitle}">
          <div class="course-side-list">
            <button class="personnel-side-button is-active" type="button" data-course-category="undergraduate">${labels.undergraduate}</button>
            <div class="personnel-side-group course-side-group is-expanded" data-course-branch="graduate">
              <button class="personnel-side-button" type="button" data-course-branch-toggle="graduate" aria-expanded="true">
                <span>${labels.graduate}</span><span class="personnel-side-symbol" aria-hidden="true"></span>
              </button>
              <div class="personnel-side-members course-side-members">
                <button class="personnel-side-button" type="button" data-course-category="graduate-theory">${labels.theory}</button>
                <button class="personnel-side-button" type="button" data-course-category="graduate-experiment">${labels.experiment}</button>
              </div>
            </div>
          </div>
        </aside>
        <div class="course-main">
          <header class="personnel-page-heading course-page-heading">
            <h1 data-course-heading>${labels.undergraduate}</h1>
            <nav class="personnel-breadcrumb" aria-label="Breadcrumb">
              <button type="button" data-course-home>${labels.home}</button>
              <span>/</span>
              <button type="button" data-course-overview>${labels.pageTitle}</button>
              <i>/</i>
              <strong data-course-current>${labels.undergraduate}</strong>
            </nav>
          </header>
          <div class="course-grid" data-course-grid>
            ${courses.map((course) => `
              <button class="course-card" type="button" data-course-id="${course.id}" data-course-group="${course.category}">
                <span class="course-card-tag">${labels.tag}</span>
                <h2>${course.title}</h2>
                <span class="course-card-meta">
                  <span>${labels.instructor}：${course.teacher || labels.teacher}</span>
                  <span>${labels.type}：${course.type}</span>
                </span>
              </button>
            `).join('')}
          </div>
          <article class="course-detail" data-course-detail hidden></article>
        </div>
      </div>
    `;

    const grid = app.querySelector('[data-course-grid]');
    const detail = app.querySelector('[data-course-detail]');
    const categoryTitles = {
      undergraduate: labels.undergraduate,
      graduate: labels.graduate,
      'graduate-theory': labels.theory,
      'graduate-experiment': labels.experiment
    };
    const validCategories = Object.keys(categoryTitles);
    const renderList = (title, items = []) => items.length ? `
      <section class="course-detail-section">
        <h3>${title}</h3>
        <ul class="course-bullet-list">
          ${items.map((item) => `<li>${item}</li>`).join('')}
        </ul>
      </section>
    ` : '';
    const renderAssessment = (items = []) => items.length ? `
      <section class="course-detail-section">
        <h3>${labels.assessment}</h3>
        <div class="course-assessment-grid">
          ${items.map(([item, weight]) => `<div><strong>${weight}</strong><span>${item}</span></div>`).join('')}
        </div>
      </section>
    ` : '';
    const renderParagraph = (title, body) => body ? `
      <section class="course-detail-section">
        <h3>${title}</h3>
        <p class="course-section-text">${body}</p>
      </section>
    ` : '';
    const renderReferences = (course) => {
      const references = course.references || [];
      if (!references.length && !course.officialUrl) return '';
      return `
        <section class="course-reference">
          <h3>${labels.reference}</h3>
          ${references.length ? `<ul>${references.map((item) => `<li>${item}</li>`).join('')}</ul>` : ''}
          ${course.officialUrl ? `<p><a href="${course.officialUrl}" target="_blank" rel="noopener">${labels.official} →</a></p>` : ''}
        </section>
      `;
    };
    let currentCategory = 'undergraduate';
    const showCourseCategory = (category) => {
      currentCategory = validCategories.includes(category) ? category : 'undergraduate';
      app.querySelectorAll('[data-course-category]').forEach((button) => {
        button.classList.toggle('is-active', button.dataset.courseCategory === currentCategory);
      });
      const graduateIsActive = currentCategory.startsWith('graduate');
      const graduateBranch = app.querySelector('[data-course-branch="graduate"]');
      graduateBranch?.classList.toggle('is-expanded', graduateIsActive);
      const graduateToggle = app.querySelector('[data-course-branch-toggle="graduate"]');
      graduateToggle?.classList.toggle('is-active', graduateIsActive);
      graduateToggle?.setAttribute('aria-expanded', String(graduateBranch?.classList.contains('is-expanded') ?? true));
      app.querySelectorAll('[data-course-group]').forEach((card) => {
        card.hidden = currentCategory === 'graduate'
          ? !card.dataset.courseGroup.startsWith('graduate')
          : card.dataset.courseGroup !== currentCategory;
      });
      const heading = app.querySelector('[data-course-heading]');
      if (heading) heading.textContent = categoryTitles[currentCategory];
      const current = app.querySelector('[data-course-current]');
      if (current) current.textContent = categoryTitles[currentCategory];
      if (grid) grid.hidden = false;
      if (detail) detail.hidden = true;
      app.querySelector('.course-page-heading')?.removeAttribute('hidden');
    };
    resetCourseView = (category) => {
      showCourseCategory(validCategories.includes(category) ? category : currentCategory);
    };
    const showCourse = (course) => {
      if (!grid || !detail) return;
      grid.hidden = true;
      app.querySelector('.course-page-heading')?.setAttribute('hidden', '');
      detail.innerHTML = `
        <button class="course-back" type="button" data-course-back>${labels.back}</button>
        <section class="course-detail-hero">
          <span class="course-detail-kicker">${course.type}</span>
          <h2>${course.title}</h2>
          <p>${course.description || labels.pending}</p>
        </section>
        ${renderList(labels.goals, course.goals)}
        ${renderReferences(course)}
      `;
      detail.hidden = false;
      detail.querySelector('[data-course-back]')?.addEventListener('click', resetCourseView);
      window.scrollTo({ top: 0, behavior: 'auto' });
    };
    app.querySelectorAll('[data-course-id]').forEach((card) => {
      card.addEventListener('click', () => {
        const course = courses.find((item) => item.id === card.dataset.courseId);
        if (course) showCourse(course);
      });
    });
    app.querySelectorAll('[data-course-category]').forEach((button) => {
      button.addEventListener('click', () => showCourseCategory(button.dataset.courseCategory));
    });
    app.querySelector('[data-course-branch-toggle="graduate"]')?.addEventListener('click', () => {
      const group = app.querySelector('[data-course-branch="graduate"]');
      if (!group) return;
      if (!currentCategory.startsWith('graduate')) {
        showCourseCategory('graduate-theory');
        return;
      }
      const isExpanded = group.classList.toggle('is-expanded');
      app.querySelector('[data-course-branch-toggle="graduate"]')?.setAttribute('aria-expanded', String(isExpanded));
    });
    app.querySelector('[data-course-home]')?.addEventListener('click', () => showPage('home'));
    app.querySelector('[data-course-overview]')?.addEventListener('click', () => {
      showCourseCategory('undergraduate');
    });
    showCourseCategory('undergraduate');
  }

  setupCourses();
  let resetCultureView = () => {};

  function setupCulturePage() {
    const app = document.querySelector('[data-culture-app]');
    if (!app) return;
    const labels = isEnglish
      ? {
          home: 'Home',
          title: 'Culture',
          gallery: 'Culture Gallery',
          party: 'Party-Building Activities',
          academic: 'Academic Exchange',
          team: 'Team Building',
          empty: 'Content coming soon.',
          detail: 'View details',
          backToAcademic: '← Back to Academic Exchange',
          previous: 'Previous culture photo',
          next: 'Next culture photo'
        }
      : {
          home: '首页',
          title: '文化建设',
          gallery: '文化掠影',
          party: '党建活动',
          academic: '学术交流',
          team: '团队建设',
          empty: '栏目内容待补充。',
          detail: '了解详情',
          backToAcademic: '← 返回学术交流',
          previous: '上一张文化建设图片',
          next: '下一张文化建设图片'
        };
    const culturePhotos = [
      {
        src: 'image/cul1.jpg',
        alt: isEnglish ? 'Culture gallery photo 1' : '文化建设图片 1'
      },
      {
        src: 'image/cul2.jpg',
        alt: isEnglish ? 'Culture gallery photo 2' : '文化建设图片 2'
      },
      {
        src: 'image/cul3.jpg',
        alt: isEnglish ? 'Culture gallery photo 3' : '文化建设图片 3'
      }
    ];
    const sections = [
      ['party', labels.party],
      ['academic', labels.academic],
      ['team', labels.team]
    ];
    const academicExchangeItem = isEnglish
      ? {
          day: '06.15–23',
          year: '2026',
          title: 'ESREL 2026 and Academic Visit to Politecnico di Milano',
          text: 'The delegation attended the 36th European Safety and Reliability Conference in Braga, Portugal, and visited Professor Enrico Zio\'s team at Politecnico di Milano for joint-laboratory development and academic exchange.'
        }
      : {
          day: '06.15–23',
          year: '2026',
          title: '赴葡萄牙参加 ESREL 2026 并访问米兰理工大学开展学术交流',
          text: '团组参加第36届欧洲安全与可靠性工程学会年会，并访问米兰理工大学 Enrico Zio 教授团队，围绕联合实验室建设、科研合作与人才交流展开深入研讨。'
        };
    const academicExchangeDetail = isEnglish
      ? {
          title: academicExchangeItem.title,
          date: 'June 14–25, 2026',
          sections: [
            ['Visit Overview', 'The delegation departed Shanghai on June 14, transferred in Brussels, arrived in Lisbon and continued to Braga. It attended ESREL 2026 from June 15 to 19, visited Politecnico di Milano from June 20 to 23, departed from Milan Malpensa Airport on June 24 and returned to China on June 25.'],
            ['ESREL 2026', 'The conference covered 16 methodological and 13 application areas, with 643 oral presentations, 33 posters and 502 accepted papers. The delegation attended the opening ceremony, Mario P. Brito\'s keynote, the MA9 Prognostics and System Health Management session, and sessions on energy, risk assessment, simulation for safety and reliability, and natural hazards.'],
            ['Conference Activities', 'The delegation joined two roundtables on balancing development and safety and on whether we live in a safe world. On June 16, it chaired the SS-08 Generative AI for Predictive Maintenance special session and delivered a presentation, then attended the conference banquet and closing ceremony.'],
            ['Joint Laboratory and Research Collaboration', 'At Politecnico di Milano, Professor Enrico Zio\'s team and the delegation agreed on a joint publication plan under the Sino-Italian laboratory, discussed visits by postdoctoral researchers Luca and Giovanni, and explored a future High-End Foreign Expert Program proposal. Further discussions covered multimodal foundation models for reliability, risk and resilience engineering and education, as well as an initial plan for a joint journal special issue. The delegation also visited the LASAR3 laboratory and its research platforms.'],
            ['Academic Seminar and Next Steps', 'On June 23, the delegation delivered the seminar “From design to discovery: a new looking of PHM in the age of complexity and large AI model,” followed by one-to-one discussions with researchers and exchanges with students. Both sides will continue advancing joint publications, researcher visits, program applications, special-issue planning and summer-school participation.']
          ]
        }
      : {
          title: academicExchangeItem.title,
          date: '2026年6月14日—25日',
          sections: [
            ['出访概况', '团组于6月14日从上海出发，经比利时布鲁塞尔转机抵达里斯本，随后前往布拉加。6月15日至19日参加第36届欧洲安全与可靠性工程学会年会（ESREL 2026），6月20日至23日访问米兰理工大学，6月24日从米兰马尔彭萨机场返程，6月25日回到国内。'],
            ['ESREL 2026 会议交流', '本届会议设置16个方法论领域与13个应用领域，共接收口头报告643个、海报33个，收录论文502篇。团组参加开幕式，聆听 Mario P. Brito 主旨报告，并参加故障预测与系统健康管理、能源、风险评估、安全与可靠性仿真分析、自然灾害等分会场交流。'],
            ['专题活动与学术汇报', '团组参加“如何平衡发展与安全”和“我们是否生活在一个安全的世界”两场圆桌会议。6月16日主持 SS-08 Generative AI for Predictive Maintenance 特别分会场并完成汇报，后续出席会议晚宴并参加闭幕式。'],
            ['联合实验室与科研合作', '在米兰理工大学，团组与 Enrico Zio 教授团队就中意健康管理联合实验室的深度发展达成多项共识，敲定以联合实验室名义共同发表学术论文的方案，并沟通 Luca 和 Giovanni 博士后来访安排。双方还研讨了高端外国专家计划申报，深入探讨多模态大模型在可靠性、风险、韧性工程及教育领域的发展方向，初步敲定联合组建期刊专题的方案，并参观 LASAR3 实验室及科研平台。'],
            ['学术报告与后续工作', '6月23日，团组为米兰理工大学研究组及相关学者作“From design to discovery: a new looking of PHM in the age of complexity and large AI model”学术报告，并与实验室团队开展一对一学术交流。双方将继续推进联合论文、人员互访、外专项目申报、期刊专题与暑期学校等合作事项。']
          ]
        };
    const buildAcademicExchangeTimeline = () => `
      <div class="news-timeline culture-academic-timeline">
          <button class="news-timeline-item culture-academic-entry" type="button" data-culture-academic-entry>
            <time class="news-timeline-date"><strong>${academicExchangeItem.day}</strong>${academicExchangeItem.year}</time>
            <span class="news-timeline-plane" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5Z"></path></svg>
            </span>
            <span class="news-timeline-image">
              <img src="image/cul3.jpg" alt="${isEnglish ? 'Academic exchange at ESREL 2026 and Politecnico di Milano' : 'ESREL 2026与米兰理工大学学术交流'}" loading="lazy">
            </span>
            <span class="news-timeline-content">
              <h2>${academicExchangeItem.title}</h2>
              <p>${academicExchangeItem.text}</p>
              <span class="news-timeline-detail">${labels.detail}</span>
            </span>
          </button>
      </div>
    `;
    app.innerHTML = `
      <div class="culture-layout">
        <aside class="personnel-sidebar" aria-label="${labels.title}">
          <div class="course-side-list">
            ${sections.map(([key, label], index) => `
              <button class="personnel-side-button${index === 0 ? ' is-active' : ''}" type="button" data-culture-section="${key}">${label}</button>
            `).join('')}
          </div>
        </aside>
        <div class="culture-main">
          <header class="personnel-page-heading" data-culture-header>
            <h1 data-culture-heading>${labels.gallery}</h1>
            <nav class="personnel-breadcrumb" aria-label="Breadcrumb">
              <button type="button" data-culture-home>${labels.home}</button>
              <span>/</span>
              <button type="button" data-culture-overview>${labels.title}</button>
              <i>/</i>
              <strong data-culture-current>${labels.gallery}</strong>
            </nav>
          </header>
          <section class="culture-gallery-view" aria-roledescription="carousel" aria-label="${labels.gallery}" data-culture-gallery>
            <div class="culture-gallery-stage" data-culture-stage>
              ${culturePhotos.map((photo, index) => `
                <figure class="culture-gallery-card${index === 0 ? ' is-current' : index === 1 ? ' is-next' : index === culturePhotos.length - 1 ? ' is-previous' : ' is-hidden'}" data-culture-photo="${index}" role="button" tabindex="${index === 1 || index === culturePhotos.length - 1 ? '0' : '-1'}" aria-label="${isEnglish ? `View photo ${index + 1}` : `查看第 ${index + 1} 张图片`}">
                  <img src="${photo.src}" alt="${photo.alt}" loading="lazy" decoding="async">
                </figure>
              `).join('')}
            </div>
            <div class="culture-gallery-dots" aria-label="${labels.gallery}">
              ${culturePhotos.map((_, index) => `
                <button class="culture-gallery-dot${index === 0 ? ' is-active' : ''}" type="button" data-culture-dot="${index}" aria-label="${isEnglish ? `View photo ${index + 1}` : `查看第 ${index + 1} 张图片`}"${index === 0 ? ' aria-current="true"' : ''}></button>
              `).join('')}
            </div>
          </section>
          ${sections.map(([key]) => `
            <section class="center-page-panel news-page-panel culture-section-panel" data-culture-content="${key}" hidden>
              ${key === 'academic' ? buildAcademicExchangeTimeline() : `<p class="news-empty-view">${labels.empty}</p>`}
            </section>
          `).join('')}
          <article class="culture-academic-detail" data-culture-academic-detail hidden>
            <button class="course-back" type="button" data-culture-academic-back>${labels.backToAcademic}</button>
            <figure class="culture-academic-detail-figure">
              <img src="image/cul3.jpg" alt="${isEnglish ? 'Academic exchange at ESREL 2026 and Politecnico di Milano' : 'ESREL 2026与米兰理工大学学术交流'}">
            </figure>
            <header class="culture-academic-detail-header">
              <time>${academicExchangeDetail.date}</time>
              <h1>${academicExchangeDetail.title}</h1>
            </header>
            <div class="culture-academic-detail-body">
              ${academicExchangeDetail.sections.map(([title, text]) => `
                <section>
                  <h2>${title}</h2>
                  <p>${text}</p>
                </section>
              `).join('')}
            </div>
          </article>
        </div>
      </div>
    `;

    let cultureGalleryTimer = 0;
    let currentSection = 'gallery';
    const showCultureSection = (sectionName) => {
      window.clearInterval(cultureGalleryTimer);
      currentSection = sections.some(([key]) => key === sectionName) ? sectionName : 'party';
      const currentLabel = sections.find(([key]) => key === currentSection)?.[1] || labels.party;
      app.querySelectorAll('[data-culture-section]').forEach((button) => {
        button.classList.toggle('is-active', button.dataset.cultureSection === currentSection);
      });
      const heading = app.querySelector('[data-culture-heading]');
      const current = app.querySelector('[data-culture-current]');
      app.querySelector('[data-culture-header]')?.removeAttribute('hidden');
      app.querySelector('[data-culture-gallery]')?.setAttribute('hidden', '');
      app.querySelector('[data-culture-academic-detail]')?.setAttribute('hidden', '');
      app.querySelectorAll('[data-culture-content]').forEach((panel) => {
        panel.hidden = panel.dataset.cultureContent !== currentSection;
      });
      if (heading) heading.textContent = currentLabel;
      if (current) current.textContent = currentLabel;
    };
    resetCultureView = (sectionName) => {
      if (sections.some(([key]) => key === sectionName)) showCultureSection(sectionName);
      else showCultureGallery();
    };
    app.querySelectorAll('[data-culture-section]').forEach((button) => {
      button.addEventListener('click', () => showCultureSection(button.dataset.cultureSection));
    });
    app.querySelector('[data-culture-home]')?.addEventListener('click', () => showPage('home'));
    app.querySelector('[data-culture-overview]')?.addEventListener('click', () => showCultureGallery());
    app.querySelector('[data-culture-academic-entry]')?.addEventListener('click', () => {
      app.querySelector('[data-culture-header]')?.setAttribute('hidden', '');
      app.querySelectorAll('[data-culture-content]').forEach((panel) => {
        panel.hidden = true;
      });
      app.querySelector('[data-culture-academic-detail]')?.removeAttribute('hidden');
      window.scrollTo({ top: 0, behavior: 'auto' });
    });
    app.querySelector('[data-culture-academic-back]')?.addEventListener('click', () => {
      showCultureSection('academic');
      window.scrollTo({ top: 0, behavior: 'auto' });
    });

    const cards = Array.from(app.querySelectorAll('[data-culture-photo]'));
    let currentPhoto = 0;
    const photoIndex = (index) => (index + culturePhotos.length) % culturePhotos.length;
    const renderCultureGallery = () => {
      if (!culturePhotos.length) return;
      cards.forEach((card) => {
        const index = Number(card.dataset.culturePhoto);
        const offset = photoIndex(index - currentPhoto);
        const isCurrent = offset === 0;
        const isNext = offset === 1;
        const isPrevious = offset === culturePhotos.length - 1;
        card.classList.toggle('is-current', isCurrent);
        card.classList.toggle('is-next', isNext);
        card.classList.toggle('is-previous', isPrevious);
        card.classList.toggle('is-hidden', offset > 1 && offset < culturePhotos.length - 1);
        card.tabIndex = isNext || isPrevious ? 0 : -1;
        if (isCurrent) card.setAttribute('aria-current', 'true');
        else card.removeAttribute('aria-current');
      });
      app.querySelectorAll('[data-culture-dot]').forEach((dot) => {
        const isActive = Number(dot.dataset.cultureDot) === currentPhoto;
        dot.classList.toggle('is-active', isActive);
        if (isActive) dot.setAttribute('aria-current', 'true');
        else dot.removeAttribute('aria-current');
      });
    };
    const goToCulturePhoto = (index) => {
      currentPhoto = photoIndex(index);
      renderCultureGallery();
    };
    const startCultureGallery = () => {
      window.clearInterval(cultureGalleryTimer);
      cultureGalleryTimer = window.setInterval(() => goToCulturePhoto(currentPhoto + 1), 4800);
    };
    const showCultureGallery = () => {
      currentSection = 'gallery';
      app.querySelectorAll('[data-culture-section]').forEach((button) => {
        button.classList.remove('is-active');
      });
      app.querySelector('[data-culture-header]')?.setAttribute('hidden', '');
      app.querySelector('[data-culture-gallery]')?.removeAttribute('hidden');
      app.querySelector('[data-culture-academic-detail]')?.setAttribute('hidden', '');
      app.querySelectorAll('[data-culture-content]').forEach((panel) => {
        panel.hidden = true;
      });
      const heading = app.querySelector('[data-culture-heading]');
      const current = app.querySelector('[data-culture-current]');
      if (heading) heading.textContent = labels.gallery;
      if (current) current.textContent = labels.gallery;
      renderCultureGallery();
      startCultureGallery();
    };
    app.querySelectorAll('[data-culture-dot]').forEach((dot) => {
      dot.addEventListener('click', () => {
        goToCulturePhoto(Number(dot.dataset.cultureDot));
        startCultureGallery();
      });
    });
    cards.forEach((card) => {
      const selectCard = () => {
        const index = Number(card.dataset.culturePhoto);
        if (index === currentPhoto) return;
        goToCulturePhoto(index);
        startCultureGallery();
      };
      card.addEventListener('click', selectCard);
      card.addEventListener('keydown', (event) => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        selectCard();
      });
    });
    showCultureGallery();
  }

  setupCulturePage();
  let showRecruitmentView = () => {};

  function setupRecruitmentPage() {
    const app = document.querySelector('[data-recruitment-app]');
    const source = document.getElementById('education-recruitment');
    if (!app || !source) return;
    const headings = Array.from(source.querySelectorAll(':scope > h2:not(.education-section-title)'));
    const sectionNodes = (index, excludeClosing = false) => {
      const nodes = [];
      let node = headings[index];
      while (node) {
        if (
          node !== headings[index]
          && node.matches?.('h2:not(.education-section-title)')
        ) break;
        if (
          !excludeClosing
          || !node.matches?.('.recruitment-conclusion, .recruitment-invitation')
        ) nodes.push(node);
        node = node.nextElementSibling;
      }
      return nodes;
    };
    const sectionHtml = (index, excludeClosing = false) => (
      sectionNodes(index, excludeClosing).map((node) => node.outerHTML).join('')
    );
    const firstParagraph = (index) => (
      sectionNodes(index).find((node) => node.tagName === 'P')?.outerHTML || ''
    );
    const closingHtml = [
      source.querySelector('.recruitment-conclusion')?.outerHTML || '',
      source.querySelector('.recruitment-invitation')?.outerHTML || ''
    ].join('');
    const talentNodes = sectionNodes(5, true);
    const applicationIntroNode = talentNodes.find((node) => node.tagName === 'P');
    const applicationIntroHtml = applicationIntroNode?.outerHTML || '';
    const talentHtml = talentNodes
      .filter((node) => node !== applicationIntroNode && node !== headings[5])
      .map((node) => node.outerHTML)
      .join('');
    const labels = isEnglish
      ? {
          home: 'Home',
          title: 'Recruitment',
          overview: 'Recruitment Overview',
          admissions: 'Admissions',
          talent: 'Talent Recruitment',
          researchLink: 'See Research Directions for details',
          programs: 'Eligible Degree Programs',
          programItems: [
            ['Academic PhD', 'Safety Science and Engineering (0837; Reliability Systems Engineering); Control Science and Engineering (0811; Industrial Internet and Knowledge-Driven Automation)'],
            ['Professional Doctorate', 'Electronic Information (0854); Mechanical Engineering (0855)'],
            ['Academic Master’s', 'Control Science and Engineering (0811); Low-Altitude Intelligent Transportation Engineering (9904; Low-Altitude Safety Assurance Technology)'],
            ['Professional Master’s', 'Electronic Information (0854); Mechanical Engineering (0855); Transportation (0861)']
          ],
          requirements: [
            'Applicants from computer science, artificial intelligence, automation, control, mechanical engineering, aerospace, systems engineering, applied mathematics, and related fields are welcome.',
            'Applicants should have a solid mathematical foundation and good academic performance.',
            'Programming, deep-learning, research-project, or academic-competition experience is preferred.',
            'Applicants should be enthusiastic about research and demonstrate independent learning, teamwork, and communication skills.',
            'Applicants should be able to read academic literature and communicate research findings in English.'
          ],
          requirementIntro: 'To ensure the quality of postgraduate training and the smooth progress of research projects, the laboratory has the following basic requirements for applicants:',
          requirementLink: 'See the recruitment introduction for details'
        }
      : {
          home: '首页',
          title: '英才招聘',
          overview: '英才招聘',
          admissions: '招生信息',
          talent: '人才招聘',
          researchLink: '具体研究内容详见科研方向',
          programs: '招生专业',
          programItems: [
            ['学术型博士', '安全科学与工程（0837，方向：可靠性系统工程）、控制科学与工程（0811，方向：工业互联网与知识驱动自动化）'],
            ['专业型博士', '电子信息（0854）、机械（0855）'],
            ['学术型硕士', '控制科学与工程（0811）、低空智能运载工程（9904，方向：低空安全保障技术）'],
            ['专业型硕士', '电子信息（0854）、机械（0855）、交通运输（0861）']
          ],
          requirements: [
            '欢迎计算机、人工智能、自动化、控制、机械、航空航天、系统工程、应用数学等相关专业学生报考。',
            '具备较扎实的数学基础和良好的专业课成绩。',
            '具备编程、深度学习、科研项目或学科竞赛经历者优先。',
            '热爱科研，具有自主学习、团队协作和沟通表达能力。',
            '具备英文文献阅读与学术交流能力。'
          ],
          requirementIntro: '为确保研究生培养质量与科研项目顺利推进，实验室对学生提出以下基本要求：',
          requirementLink: '详见招生简介'
        };
    const programsHtml = `
      <section class="recruitment-admission-programs">
      <h2>${labels.programs}</h2>
      <dl class="recruitment-programs">
        ${labels.programItems.map(([term, value]) => `<div><dt>${term}</dt><dd>${value}</dd></div>`).join('')}
      </dl>
      </section>
    `;
    const requirementsHtml = `
      <section class="recruitment-admission-section">
        <p class="recruitment-requirement-intro">${labels.requirementIntro}</p>
        <ul class="recruitment-requirements">
          ${labels.requirements.map((item) => `<li>${item}</li>`).join('')}
        </ul>
        <p class="recruitment-requirement-link">
          <a href="https://shi.buaa.edu.cn/huyang/zh_CN/zdylm/227783/list/index.htm" target="_blank" rel="noopener">${labels.requirementLink}</a>
        </p>
      </section>
    `;
    const views = {
      overview: `
        ${firstParagraph(0)}
        ${firstParagraph(1)}
        <nav class="recruitment-entry-links" aria-label="${labels.title}">
          <button class="recruitment-research-link" type="button" data-recruitment-research>${labels.researchLink} →</button>
          <button type="button" data-recruitment-entry="admissions">${labels.admissions} →</button>
          <button type="button" data-recruitment-entry="talent">${labels.talent} →</button>
        </nav>
        <div class="recruitment-closing">${applicationIntroHtml}${closingHtml}</div>
      `,
      admissions: `${programsHtml}${requirementsHtml}`,
      talent: talentHtml
    };

    app.innerHTML = `
      <div class="recruitment-layout">
        <aside class="personnel-sidebar" aria-label="${labels.title}">
          <button class="personnel-side-button personnel-side-overview is-active" type="button" data-recruitment-view="overview">
            <span>${labels.overview}</span>
          </button>
          <div class="personnel-side-list">
            <button class="personnel-side-button" type="button" data-recruitment-view="admissions">${labels.admissions}</button>
            <button class="personnel-side-button" type="button" data-recruitment-view="talent">${labels.talent}</button>
          </div>
        </aside>
        <div class="recruitment-main">
          <header class="personnel-page-heading">
            <h1 data-recruitment-heading>${labels.overview}</h1>
            <nav class="personnel-breadcrumb" aria-label="Breadcrumb">
              <button type="button" data-recruitment-home>${labels.home}</button>
              <span>/</span>
              <button type="button" data-recruitment-overview>${labels.title}</button>
              <i data-recruitment-separator hidden>/</i>
              <strong data-recruitment-current hidden></strong>
            </nav>
          </header>
          <article class="recruitment-page-content" data-recruitment-content></article>
        </div>
      </div>
    `;

    const routeNames = {
      overview: 'recruitment',
      admissions: 'recruitment-admissions',
      talent: 'recruitment-talent'
    };
    showRecruitmentView = (viewName = 'overview') => {
      const targetView = views[viewName] ? viewName : 'overview';
      const title = labels[targetView];
      const content = app.querySelector('[data-recruitment-content]');
      const heading = app.querySelector('[data-recruitment-heading]');
      const current = app.querySelector('[data-recruitment-current]');
      const separator = app.querySelector('[data-recruitment-separator]');
      if (content) content.innerHTML = views[targetView];
      if (heading) heading.textContent = title;
      if (current) {
        current.textContent = title;
        current.hidden = targetView === 'overview';
      }
      if (separator) separator.hidden = targetView === 'overview';
      app.querySelectorAll('[data-recruitment-view]').forEach((button) => {
        button.classList.toggle('is-active', button.dataset.recruitmentView === targetView);
      });
      content?.querySelector('[data-recruitment-research]')?.addEventListener('click', () => showPage('research'));
      content?.querySelectorAll('[data-recruitment-entry]').forEach((button) => {
        button.addEventListener('click', () => showPage(routeNames[button.dataset.recruitmentEntry]));
      });
    };
    app.querySelectorAll('[data-recruitment-view]').forEach((button) => {
      button.addEventListener('click', () => showPage(routeNames[button.dataset.recruitmentView]));
    });
    app.querySelector('[data-recruitment-home]')?.addEventListener('click', () => showPage('home'));
    app.querySelector('[data-recruitment-overview]')?.addEventListener('click', () => showPage('recruitment'));
    showRecruitmentView('overview');
  }

  setupRecruitmentPage();
  const panels = Array.from(document.querySelectorAll('[data-page]'));
  window.TeamHomepageScrollReveal?.init();

  function showPersonnelView(viewName) {
    const targetView = ['overview', 'faculty', 'postdocs'].includes(viewName)
      ? viewName
      : 'overview';
    const viewLabels = isEnglish
      ? {
          overview: 'Faculty',
          faculty: 'Faculty',
          postdocs: 'Postdoctoral Researchers'
        }
      : {
          overview: '师资队伍',
          faculty: '教师团队',
          postdocs: '博士后研究人员'
        };
    document.querySelectorAll('[data-personnel-panel]').forEach((panel) => {
      panel.classList.toggle('is-active', panel.dataset.personnelPanel === targetView);
    });
    document.querySelectorAll('[data-personnel-view]').forEach((button) => {
      button.classList.toggle('is-active', button.dataset.personnelView === targetView);
    });
    document.querySelector('.lab-personnel')?.classList.remove('is-member-mode');
    document.querySelectorAll('#faculty .personnel-card').forEach((card) => {
      card.classList.remove('is-member-active');
    });
    document.querySelectorAll('[data-personnel-overview-group]').forEach((section) => {
      section.hidden = false;
    });
    document.querySelectorAll('[data-personnel-group]').forEach((group) => {
      group.classList.toggle(
        'is-expanded',
        targetView !== 'overview' && group.dataset.personnelGroup === targetView
      );
    });
    const heading = document.querySelector('[data-personnel-heading]');
    const current = document.querySelector('[data-personnel-current]');
    const separator = document.querySelector('[data-personnel-detail-separator]');
    if (heading) heading.textContent = viewLabels[targetView];
    if (current) {
      current.textContent = viewLabels[targetView];
      current.hidden = targetView === 'overview';
    }
    if (separator) separator.hidden = targetView === 'overview';
  }

  function showPersonnelCategory(category) {
    const targetCategory = category === 'postdocs' ? 'postdocs' : 'faculty';
    const categoryLabel = isEnglish
      ? (targetCategory === 'faculty' ? 'Faculty' : 'Postdoctoral Researchers')
      : (targetCategory === 'faculty' ? '教师团队' : '博士后研究人员');
    showPersonnelView('overview');
    document.querySelectorAll('[data-personnel-overview-group]').forEach((section) => {
      section.hidden = section.dataset.personnelOverviewGroup !== targetCategory;
    });
    document.querySelectorAll('[data-personnel-view]').forEach((button) => {
      button.classList.toggle('is-active', button.dataset.personnelView === targetCategory);
    });
    document.querySelectorAll('[data-personnel-group]').forEach((group) => {
      group.classList.toggle('is-expanded', group.dataset.personnelGroup === targetCategory);
    });
    const heading = document.querySelector('[data-personnel-heading]');
    const current = document.querySelector('[data-personnel-current]');
    const separator = document.querySelector('[data-personnel-detail-separator]');
    if (heading) heading.textContent = categoryLabel;
    if (current) {
      current.textContent = categoryLabel;
      current.hidden = false;
    }
    if (separator) separator.hidden = false;
  }

  function showPersonnelMember(memberId, viewName) {
    const targetView = viewName === 'postdocs' ? 'postdocs' : 'faculty';
    showPersonnelView(targetView);
    const labPersonnel = document.querySelector('.lab-personnel');
    const memberCard = document.getElementById(memberId);
    const memberButton = document.querySelector(`[data-personnel-member="${memberId}"]`);
    const memberName = memberButton?.textContent.trim() || '';
    const categoryLabel = isEnglish
      ? (targetView === 'faculty' ? 'Faculty' : 'Postdoctoral Researchers')
      : (targetView === 'faculty' ? '教师团队' : '博士后研究人员');
    labPersonnel?.classList.add('is-member-mode');
    memberCard?.classList.add('is-member-active');
    const heading = document.querySelector('[data-personnel-heading]');
    const current = document.querySelector('[data-personnel-current]');
    if (heading) heading.textContent = memberName || categoryLabel;
    if (current) {
      current.textContent = `${categoryLabel} / ${memberName}`;
      current.hidden = false;
    }
  }

  const pageRoutes = window.TEAM_HOMEPAGE_CONFIG?.pageRoutes || {};

  function showPage(routeName, options = {}) {
    const route = pageRoutes[routeName] || { page: routeName };
    const targetName = panels.some((panel) => panel.dataset.page === route.page)
      ? route.page
      : 'home';
    const activeRoute = targetName === 'home' && route.page !== 'home' ? 'home' : routeName;

    panels.forEach((panel) => {
      panel.classList.toggle('is-active', panel.dataset.page === targetName);
    });
    window.TeamHomepageNavigation?.syncActive({ activeRoute, targetName });

    if (!options.skipHash && window.location.hash !== `#${activeRoute}`) {
      history.pushState(null, '', `#${activeRoute}`);
    }

    window.scrollTo({ top: 0, behavior: 'auto' });
    if (targetName === 'education') {
      const isRecruitment = route.section === 'education-recruitment';
      const studentLayout = document.querySelector('.student-page-shell');
      const recruitmentWrap = document.querySelector('.student-recruitment-wrap');
      if (studentLayout) studentLayout.hidden = isRecruitment;
      if (recruitmentWrap) recruitmentWrap.hidden = !isRecruitment;
      if (!isRecruitment) showStudentView(route.studentView || 'overview');
    }
    if (targetName === 'teaching') resetCourseView(route.courseCategory);
    if (targetName === 'culture') resetCultureView(route.cultureSection);
    if (route.newsView) showNewsView(route.newsView);
    if (route.recruitmentView) showRecruitmentView(route.recruitmentView);
    if (route.researchView) showResearchPageView(route.researchView);
    if (route.centerView) showCenterPageView(route.centerView);
    if (route.view) showPersonnelView(route.view);
    if (route.category) showPersonnelCategory(route.category);
    if (route.member) showPersonnelMember(route.member, route.view);
    if (route.section) {
      requestAnimationFrame(() => {
        document.getElementById(route.section)?.scrollIntoView({
          behavior: 'auto',
          block: 'start'
        });
      });
    }
  }

  window.TeamHomepageSearch?.init({
    isEnglish,
    showPage,
    showStudentMemberView,
    studentProfiles: window.TEAM_HOMEPAGE_DATA?.studentProfiles || {}
  });

  window.TeamHomepageNavigation?.init({
    showPage
  });

  const personnelRouteNames = {
    overview: 'faculty-overview',
    faculty: 'faculty-teachers',
    postdocs: 'faculty-postdocs'
  };
  document.querySelectorAll('[data-personnel-view]').forEach((button) => {
    button.addEventListener('click', () => {
      const group = button.closest('[data-personnel-group]');
      if (group?.classList.contains('is-expanded')) {
        group.classList.remove('is-expanded');
        button.setAttribute('aria-expanded', 'false');
        return;
      }
      showPage(personnelRouteNames[button.dataset.personnelView] || 'faculty-overview');
      if (group) button.setAttribute('aria-expanded', 'true');
    });
  });

  document.querySelectorAll('[data-personnel-member]').forEach((button) => {
    button.addEventListener('click', () => {
      showPage(button.dataset.personnelMember);
    });
  });

  document.querySelectorAll('[data-personnel-overview-member]').forEach((card) => {
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    const openMember = () => showPage(card.dataset.personnelOverviewMember);
    card.addEventListener('click', openMember);
    card.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      openMember();
    });
  });

  document.querySelector('[data-personnel-home]')?.addEventListener('click', () => {
    showPage('home');
  });
  document.querySelector('[data-personnel-overview]')?.addEventListener('click', () => {
    showPage('faculty-overview');
  });
  document.querySelector('[data-contact-home]')?.addEventListener('click', () => {
    showPage('home');
  });

  window.TeamHomepageHomeInteractions?.init({
    prefersReducedMotion
  });

  const researchTopics = window.TeamHomepageResearchTopics?.init({
    isEnglish,
    showPage
  });
  resetResearchTopicDetail = researchTopics?.resetDetail || resetResearchTopicDetail;
  showResearchTopicDetailPage = researchTopics?.showDetailPage || showResearchTopicDetailPage;

  function setupSectionSubnav(selector, datasetKey) {
    const buttons = Array.from(document.querySelectorAll(selector));
    const setActiveButton = (activeButton) => {
      buttons.forEach((button) => {
        button.classList.toggle('is-active', button === activeButton);
      });
    };

    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        setActiveButton(button);
        document.getElementById(button.dataset[datasetKey])?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      });
    });

    if ('IntersectionObserver' in window && buttons.length) {
      const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const activeButton = buttons.find(
            (button) => button.dataset[datasetKey] === entry.target.id
          );
          if (activeButton) setActiveButton(activeButton);
        });
      }, {
        rootMargin: '-150px 0px -60% 0px',
        threshold: 0
      });

      buttons.forEach((button) => {
        const section = document.getElementById(button.dataset[datasetKey]);
        if (section) sectionObserver.observe(section);
      });
    }
  }

  setupSectionSubnav('[data-education-target]', 'educationTarget');
  setupSectionSubnav('[data-achievement-target]', 'achievementTarget');
  setupSectionSubnav('[data-project-target]', 'projectTarget');
  setupSectionSubnav('[data-lab-target]', 'labTarget');

  window.addEventListener('popstate', () => {
    showPage(window.location.hash.replace('#', ''), { skipHash: true, instant: true });
  });

  const initialTarget = window.location.hash.replace('#', '') || 'home';
  showPage(initialTarget, {
    skipHash: true,
    instant: true
  });

  const pendingStudentId = sessionStorage.getItem('teamHomepagePendingStudent');
  if (pendingStudentId) {
    sessionStorage.removeItem('teamHomepagePendingStudent');
    const pendingProfile = window.TEAM_HOMEPAGE_DATA?.studentProfiles?.[pendingStudentId];
    const pendingCategory = pendingProfile?.category === 'doctoral'
      ? 'doctoral'
      : pendingProfile?.category === 'undergraduates'
        ? 'undergraduates'
        : 'masters';
    showPage('education', { skipHash: true, instant: true });
    requestAnimationFrame(() => {
      showStudentMemberView(pendingStudentId, pendingCategory);
    });
  }

  if (initialTarget === 'research') {
    requestAnimationFrame(() => {
      document.querySelector('#research')?.scrollIntoView();
    });
  }
})();
