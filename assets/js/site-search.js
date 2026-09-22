(() => {
  'use strict';

  const getLabels = (isEnglish) => (
    isEnglish
      ? {
          open: 'Search',
          close: 'Close search',
          placeholder: 'Search people, courses, research, news...',
          title: 'Site Search',
          empty: 'No matching results',
          idle: 'Type a keyword to search the site.',
          hint: 'Press Enter to open the first result, Esc to close.',
          results: 'Search results'
        }
      : {
          open: '搜索',
          close: '关闭搜索',
          placeholder: '搜索人员、课程、科研、新闻...',
          title: '站内搜索',
          empty: '未找到匹配结果',
          idle: '请输入关键词进行站内搜索。',
          hint: '按 Enter 打开第一条结果，Esc 关闭。',
          results: '搜索结果'
        }
  );

  const getStaticEntries = (isEnglish) => [
    ['home', isEnglish ? 'Home' : '首页', isEnglish ? 'Laboratory homepage, news, notices, research directions, profile' : '实验室首页、新闻动态、通知公告、科研方向、中心简介', 'home'],
    ['team', isEnglish ? 'Center Profile' : '中心简介', isEnglish ? 'Sino-Italian Joint Laboratory, overview, platform, mission' : '中意健康管理与智能维修实验室、中心概况、平台介绍', 'team'],
    ['faculty', isEnglish ? 'Faculty' : '师资队伍', isEnglish ? 'Rui Kang, Enrico Zio, Yang Hu, Yang Li, Xiaoyu Jiang, postdoctoral researchers' : '康锐、Enrico Zio、胡杨、李洋、江肖禹、博士后、教师团队', 'faculty-overview'],
    ['rui-kang', isEnglish ? 'Rui Kang' : '康锐', isEnglish ? 'Chinese Director, Professor, doctoral supervisor, belief reliability' : '中方主任、教授、博士生导师、确信可靠性、可靠性系统工程', 'person-rui-kang'],
    ['enrico-zio', 'Enrico Zio', isEnglish ? 'Italian Director, professor, reliability, risk, resilience' : '意方主任、教授、可靠性、风险、安全、韧性', 'person-enrico-zio'],
    ['yang-hu', isEnglish ? 'Yang Hu' : '胡杨', isEnglish ? 'Associate Research Fellow, doctoral supervisor, PHM, digital twin' : '副研究员、博士生导师、PHM、数字孪生、智能运维', 'person-yang-hu'],
    ['yang-li', isEnglish ? 'Yang Li' : '李洋', isEnglish ? 'Associate Professor, master’s supervisor, reliability, fault diagnosis' : '副教授、硕士生导师、可靠性、故障诊断、容错', 'person-yang-li'],
    ['xiaoyu-jiang', isEnglish ? 'Xiaoyu Jiang' : '江肖禹', isEnglish ? 'Associate Research Fellow, machine learning, agents, industrial AI' : '副研究员、硕士生导师、机器学习、大模型、智能体、工业智能', 'person-xiaoyu-jiang'],
    ['students', isEnglish ? 'Students' : '学生培养', isEnglish ? 'Doctoral students, master’s students, student profiles, admissions' : '博士研究生、硕士研究生、学生主页、学生培养', 'education'],
    ['research', isEnglish ? 'Research Directions' : '科研方向', isEnglish ? 'Multimodal foundation models, PHM, digital twin, resilience, reliability' : '多模态大模型、PHM、数字孪生、智慧运维、复杂系统韧性、可靠性', 'research'],
    ['projects', isEnglish ? 'Research Projects' : '科研项目', isEnglish ? 'National projects, enterprise collaboration, funded research' : '国家项目、企业合作、科研项目、项目列表', 'research-projects'],
    ['outputs', isEnglish ? 'Research Outputs' : '科研成果', isEnglish ? 'Publications, journal papers, conference papers, patents, books' : '论文成果、期刊论文、会议论文、专利、软著、专著', 'achievements'],
    ['cooperation', isEnglish ? 'Research Collaboration' : '科研合作', isEnglish ? 'Domestic universities, international partners, enterprise collaboration' : '科研合作、国内高校、国际合作、企业合作', 'research-cooperation'],
    ['teaching', isEnglish ? 'Teaching' : '课程教学', isEnglish ? 'Graduate courses, theoretical courses, experimental courses' : '课程教学、研究生课程、理论课程、实验课程', 'teaching'],
    ['ai-course', isEnglish ? 'Artificial Intelligence and Advanced Large Models' : '人工智能与高级大模型', isEnglish ? 'AI, large models, RAG, agents, evaluation, engineering assistant' : '人工智能、大模型、RAG、智能体、评估、工程智能助手', 'teaching'],
    ['probability-course', isEnglish ? 'Probability & Statistics (Taught in English)' : 'Probability & Statistics（概率统计，全英文授课）', isEnglish ? 'Probability, statistics, English-taught course, regression, ANOVA, hypothesis testing' : 'Probability & Statistics、概率统计、全英文授课、统计推断、回归分析、方差分析、假设检验', 'teaching'],
    ['stochastic-process-course', 'Stochastic Process', isEnglish ? 'Dual-degree graduate course, Yang Li, stochastic process' : '双学位研究生课程、李洋、随机过程、Stochastic Process', 'teaching'],
    ['aviation-phm-course', isEnglish ? 'Design and Simulation of Aviation System Health Management' : '航空系统健康管理设计与仿真', isEnglish ? 'Aviation PHM, simulation, system architecture, algorithm development' : '航空系统、健康管理、PHM、仿真、系统架构、算法开发', 'teaching'],
    ['news', isEnglish ? 'News' : '新闻动态', isEnglish ? 'Academic conferences, activities, papers, notices' : '新闻动态、学术会议、学术活动、论文成果、通知公告', 'news'],
    ['icre', isEnglish ? 'ICRE 2026 Conference' : '2026年第十届可靠性工程国际会议', isEnglish ? 'ICRE, reliability engineering, conference news' : 'ICRE、可靠性工程国际会议、学术会议', 'news-conferences'],
    ['summer-school', isEnglish ? '2026 International Summer School on Aviation Safety' : '2026 数字赋能的航空安全国际暑期学校', isEnglish ? 'Summer school, aviation safety, academic activity' : '暑期学校、航空安全、学术活动、数字赋能', 'news-activities'],
    ['recruitment', isEnglish ? 'Admissions and Recruitment' : '招生招聘', isEnglish ? 'Master, doctoral, postdoctoral, admissions, talent recruitment' : '招生信息、人才招聘、硕士、博士、博士后', 'recruitment-admissions'],
    ['contact', isEnglish ? 'Contact' : '联系我们', isEnglish ? 'Email, address, contact information' : '联系我们、邮箱、地址、联系方式', 'contact']
  ].map(([id, title, summary, route]) => ({
    id,
    title,
    summary,
    route,
    text: `${title} ${summary}`.toLowerCase()
  }));

  const getStudentEntries = (studentProfiles, isEnglish) => (
    Object.entries(studentProfiles || {}).map(([studentId, profile]) => {
      const title = isEnglish ? profile.enName : profile.name;
      const summary = isEnglish
        ? [
            profile.majorEn,
            profile.advisorEn ? `Supervisor: ${profile.advisorEn}` : '',
            profile.year ? `Year: ${profile.year}` : '',
            profile.researchEn
          ].filter(Boolean).join(' · ')
        : [
            profile.major,
            profile.advisor ? `指导教师：${profile.advisor}` : '',
            profile.year ? `${profile.year}级` : '',
            profile.research
          ].filter(Boolean).join(' · ');

      return {
        id: `student-${studentId}`,
        title,
        summary,
        route: 'education',
        studentId,
        studentCategory: profile.category === 'doctoral' ? 'doctoral' : 'masters',
        text: [
          profile.name,
          profile.enName,
          profile.major,
          profile.majorEn,
          profile.advisor,
          profile.advisorEn,
          profile.year,
          profile.research,
          profile.researchEn
        ].filter(Boolean).join(' ').toLowerCase()
      };
    })
  );

  function init({ isEnglish, showPage, showStudentMemberView, studentProfiles }) {
    const searchButton = document.querySelector('.header-search');
    if (!searchButton || typeof showPage !== 'function') return;

    const labels = getLabels(isEnglish);
    const entries = [
      ...getStaticEntries(isEnglish),
      ...getStudentEntries(studentProfiles, isEnglish)
    ];
    const overlay = document.createElement('div');
    overlay.className = 'site-search-overlay';
    overlay.hidden = true;
    overlay.innerHTML = `
      <div class="site-search-panel" role="dialog" aria-modal="true" aria-labelledby="site-search-title">
        <button class="site-search-close" type="button" aria-label="${labels.close}">×</button>
        <h2 id="site-search-title">${labels.title}</h2>
        <input class="site-search-input" type="search" autocomplete="off" placeholder="${labels.placeholder}" aria-label="${labels.open}">
        <p class="site-search-hint">${labels.hint}</p>
        <div class="site-search-results" role="list" aria-label="${labels.results}"></div>
      </div>
    `;
    document.body.append(overlay);

    const input = overlay.querySelector('.site-search-input');
    const results = overlay.querySelector('.site-search-results');
    const closeButton = overlay.querySelector('.site-search-close');

    const closeSearch = () => {
      overlay.hidden = true;
      document.body.classList.remove('is-search-open');
      searchButton.focus();
    };
    const openSearch = () => {
      overlay.hidden = false;
      document.body.classList.add('is-search-open');
      input.value = '';
      renderResults('');
      requestAnimationFrame(() => input.focus());
    };
    const openEntry = (entry) => {
      closeSearch();
      if (entry.studentId && typeof showStudentMemberView === 'function') {
        showPage('education');
        requestAnimationFrame(() => {
          showStudentMemberView(entry.studentId, entry.studentCategory);
        });
        return;
      }
      showPage(entry.route);
    };
    const renderResults = (query) => {
      const normalizedQuery = query.trim().toLowerCase();
      if (!normalizedQuery) {
        results.innerHTML = `<p class="site-search-empty">${labels.idle}</p>`;
        return;
      }

      const matches = entries.filter((entry) => entry.text.includes(normalizedQuery));
      results.innerHTML = matches.length
        ? matches.map((entry) => `
          <button class="site-search-result" type="button" data-search-entry="${entry.id}">
            <strong>${entry.title}</strong>
            <span>${entry.summary}</span>
          </button>
        `).join('')
        : `<p class="site-search-empty">${labels.empty}</p>`;
      results.querySelectorAll('[data-search-entry]').forEach((button) => {
        const entry = entries.find((item) => item.id === button.dataset.searchEntry);
        button.addEventListener('click', () => {
          if (entry) openEntry(entry);
        });
      });
    };

    searchButton.setAttribute('aria-label', labels.open);
    searchButton.setAttribute('title', labels.open);
    searchButton.addEventListener('click', openSearch);
    closeButton?.addEventListener('click', closeSearch);
    overlay.addEventListener('click', (event) => {
      if (event.target === overlay) closeSearch();
    });
    input?.addEventListener('input', () => renderResults(input.value));
    input?.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeSearch();
        return;
      }
      if (event.key !== 'Enter') return;
      const firstId = results.querySelector('[data-search-entry]')?.dataset.searchEntry;
      const firstEntry = entries.find((entry) => entry.id === firstId);
      if (firstEntry) {
        event.preventDefault();
        openEntry(firstEntry);
      }
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !overlay.hidden) closeSearch();
    });
  }

  window.TeamHomepageSearch = {
    init
  };
})();
