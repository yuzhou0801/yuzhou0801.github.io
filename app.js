(() => {
  "use strict";
  const data = window.SITE_DATA;
  const $ = (selector) => document.querySelector(selector);
  const icons = {
    system: "🖥️", moon: "🌙", sun: "☀️",
    location: "📍", institution: "🏫", email: "📧",
    scholar: "🎓", linkedin: "💼", github: "💻",
    paper: "🎉", award: "🏆", document: "📄",
    abstract: "📖", citation: "📝", code: "💻"
  };
  function icon(name) {
    const span = document.createElement("span");
    span.className = "emoji-icon";
    span.setAttribute("aria-hidden", "true");
    span.textContent = icons[name] || icons.document;
    return span;
  }
  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }
  function validURL(value) {
    if (!value || typeof value !== "string") return null;
    try {
      const url = new URL(value, window.location.href);
      return ["http:", "https:", "mailto:"].includes(url.protocol) ? url.href : null;
    } catch { return null; }
  }
  function link(label, href, className) {
    const node = element("a", className, label);
    node.href = validURL(href) || "./index.html";
    if (/^https?:/.test(node.href) && new URL(node.href).origin !== window.location.origin) {
      node.target = "_blank";
      node.rel = "noopener noreferrer";
    }
    return node;
  }
  function profileText(tag, className, text) {
    const node = element(tag, className);
    const supervisor = data.profile.supervisor;
    if (!supervisor?.name || !validURL(supervisor.url)) {
      node.textContent = text;
      return node;
    }
    text.split(supervisor.name).forEach((part, index) => {
      if (index) node.append(link(supervisor.name, supervisor.url, "inline-link"));
      node.append(document.createTextNode(part));
    });
    return node;
  }
  function resourceLink(label, href, iconName) {
    const node = link(label, href, "outline-button");
    node.prepend(icon(iconName));
    return node;
  }
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
  const themeToggle = $(".theme-toggle");
  const themeControl = element("div", "theme-control");
  themeToggle.replaceWith(themeControl);
  themeControl.append(themeToggle);
  const themeMenu = element("div", "theme-menu");
  themeMenu.id = "theme-menu";
  themeMenu.hidden = true;
  themeMenu.setAttribute("role", "group");
  themeMenu.setAttribute("aria-label", "Color theme");
  themeControl.append(themeMenu);
  themeToggle.setAttribute("aria-controls", "theme-menu");
  themeToggle.setAttribute("aria-expanded", "false");
  function closeThemeMenu() {
    themeMenu.hidden = true;
    themeToggle.setAttribute("aria-expanded", "false");
  }
  function setThemeButton() {
    const dark = document.documentElement.dataset.theme === "dark";
    const preference = document.documentElement.dataset.themePreference;
    themeToggle.replaceChildren(icon(dark ? "moon" : "sun"));
    const label = `Choose color theme (current: ${preference})`;
    themeToggle.setAttribute("aria-label", label);
    themeToggle.title = label;
    themeMenu.querySelectorAll("button").forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.theme === preference)));
    $("meta[name='theme-color']")?.setAttribute("content", dark ? "#171717" : "#ffffff");
  }
  function applyTheme(preference) {
    document.documentElement.dataset.themePreference = preference;
    document.documentElement.dataset.theme = preference === "system" ? (systemTheme.matches ? "dark" : "light") : preference;
    setThemeButton();
  }
  [["system", "System", "system"], ["light", "Light", "sun"], ["dark", "Dark", "moon"]].forEach(([value, label, iconName]) => {
    const option = element("button", "theme-option");
    option.type = "button";
    option.dataset.theme = value;
    option.append(icon(iconName), element("span", "", label));
    option.addEventListener("click", () => {
      applyTheme(value);
      try { localStorage.setItem("academic-theme", value); } catch { /* Theme still works without storage. */ }
      closeThemeMenu();
      themeToggle.focus();
    });
    themeMenu.append(option);
  });
  themeToggle.addEventListener("click", () => {
    themeMenu.hidden = !themeMenu.hidden;
    themeToggle.setAttribute("aria-expanded", String(!themeMenu.hidden));
  });
  document.addEventListener("click", (event) => { if (!themeControl.contains(event.target)) closeThemeMenu(); });
  themeControl.addEventListener("keydown", (event) => {
    if (event.key === "Escape") { closeThemeMenu(); themeToggle.focus(); }
  });
  systemTheme.addEventListener("change", () => {
    if (document.documentElement.dataset.themePreference === "system") applyTheme("system");
  });
  window.addEventListener("storage", (event) => {
    if (event.key === "academic-theme") applyTheme(["light", "dark"].includes(event.newValue) ? event.newValue : "system");
  });
  setThemeButton();

  const dialog = $("#content-dialog");
  function openDialog(title, content, citation = null) {
    $("#dialog-title").textContent = title;
    $("#dialog-body").replaceChildren(content);
    $("#copy-status").textContent = "";
    const copyButton = $("#copy-citation");
    copyButton.hidden = !citation;
    copyButton.onclick = citation ? async () => {
      try {
        await navigator.clipboard.writeText(citation);
        $("#copy-status").textContent = "BibTeX copied to clipboard.";
      } catch {
        $("#copy-status").textContent = "Please select and copy the citation above.";
      }
    } : null;
    dialog.showModal();
  }
  $("#dialog-close").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  });

  document.querySelectorAll(".brand-name").forEach((node) => { node.textContent = data.profile.name; });
  $(".wordmark").setAttribute("aria-label", `${data.profile.name}, home`);

  function authors(publication) {
    const paragraph = element("p", "publication-authors");
    publication.authors.forEach((author, index) => {
      if (index) paragraph.append(document.createTextNode(", "));
      paragraph.append(element("span", author.self ? "author-self" : "", author.name));
      if (author.equal) paragraph.append(element("sup", "", "*"));
    });
    return paragraph;
  }
  function publicationURL(publication) {
    return validURL(publication.url) || `./publication.html?id=${encodeURIComponent(publication.id)}`;
  }
  function citationButton(publication) {
    const button = element("button", "outline-button", "BibTeX");
    button.prepend(icon("citation"));
    button.type = "button";
    button.setAttribute("aria-label", `Show BibTeX for ${publication.title}`);
    button.addEventListener("click", () => openDialog("Cite this work", element("pre", "", publication.bibtex), publication.bibtex));
    return button;
  }
  function publicationItem(publication) {
    const article = element("article", "publication-item");
    const kicker = element("div", "publication-kicker");
    kicker.append(element("span", "venue-badge", publication.venueShort), element("span", "publication-type", publication.type));
    const title = element("h3");
    const titleLink = link(publication.title, publicationURL(publication), "publication-title");
    const arrow = element("span", "title-arrow", "↗");
    arrow.setAttribute("aria-hidden", "true");
    titleLink.append(arrow);
    title.append(titleLink);
    article.append(kicker, title, authors(publication), element("p", "publication-venue", publication.venue));
    if (publication.note) article.append(element("p", "publication-extra", publication.note));
    const actions = element("div", "publication-actions");
    let abstractPanel;
    if (publication.abstract) {
      const abstractButton = element("button", "outline-button", "Abstract");
      abstractButton.prepend(icon("abstract"));
      abstractButton.type = "button";
      abstractButton.setAttribute("aria-expanded", "false");
      abstractButton.setAttribute("aria-controls", `abstract-${publication.id}`);
      abstractPanel = element("p", "abstract-panel", publication.abstract);
      abstractPanel.id = `abstract-${publication.id}`;
      abstractPanel.hidden = true;
      abstractButton.addEventListener("click", () => {
        abstractPanel.hidden = !abstractPanel.hidden;
        abstractButton.setAttribute("aria-expanded", String(!abstractPanel.hidden));
      });
      actions.append(abstractButton);
    }
    if (validURL(publication.pdf)) actions.append(resourceLink("PDF ↗", publication.pdf, "document"));
    if (validURL(publication.code)) actions.append(resourceLink("Code ↗", publication.code, "code"));
    if (publication.bibtex) actions.append(citationButton(publication));
    article.append(actions);
    if (abstractPanel) article.append(abstractPanel);
    return article;
  }

  function renderHome() {
    const profile = data.profile;
    document.title = `${profile.name} — Academic Profile`;
    $("#profile-name").textContent = profile.name;
    $("#profile-role").textContent = [profile.position, profile.institution].filter(Boolean).join(" · ");
    profile.bio.forEach((paragraph) => $("#biography").append(profileText("p", "", paragraph)));
    profile.interests.forEach((interest) => $("#interests").append(element("li", "", interest)));
    if (!profile.interests.length) $(".interests-block").hidden = true;
    $(".portrait-monogram").textContent = profile.initials;
    $(".portrait-label").textContent = data.template ? "Your photo here" : profile.name;
    if (validURL(profile.photo)) {
      const photo = element("img", "profile-photo");
      photo.src = validURL(profile.photo);
      photo.alt = profile.photoAlt || `Profile photo of ${profile.name}`;
      photo.width = 226;
      photo.height = 252;
      const placeholder = $("#portrait");
      photo.addEventListener("error", () => photo.replaceWith(placeholder), { once: true });
      placeholder.replaceWith(photo);
    }
    [["institution", profile.department], ["location", profile.location]].forEach(([name, value]) => {
      if (!value) return;
      const row = element("div", "sidebar-item");
      row.append(icon(name), element("span", "", value));
      $("#sidebar-details").append(row);
    });
    const labels = { email: "Email", scholar: "Google Scholar", linkedin: "LinkedIn", github: "GitHub" };
    Object.entries(labels).forEach(([key, label]) => {
      const configured = profile.links[key];
      const url = key === "email" && configured ? validURL(`mailto:${configured}`) : validURL(configured);
      if (!url && !data.template) return;
      const item = url ? link("", url, "social-link") : element("button", "social-link");
      if (!url) {
        item.type = "button";
        item.setAttribute("aria-label", `${label} — template placeholder`);
        item.addEventListener("click", () => openDialog(label, element("p", "", `This is a placeholder for ${profile.name}’s ${label === "Email" ? "email address" : label + " link"}. The personal link will be available once the profile is filled in.`)));
      }
      const arrow = element("span", "link-arrow", "↗");
      arrow.setAttribute("aria-hidden", "true");
      const displayLabel = key === "email" && configured ? configured : label;
      item.append(icon(key), element("span", "", displayLabel), arrow);
      $("#social-links").append(item);
    });
    $("#template-badge").hidden = !data.template;
    $("#template-note").hidden = !data.template;
    $("#copyright").textContent = `© ${new Date().getFullYear()} ${profile.name} · Updated ${data.updated}`;

    data.education.forEach((item) => {
      const article = element("article", "education-item");
      const symbol = element("div", "education-icon");
      symbol.append(icon("scholar"));
      const copy = element("div", "education-copy");
      const topline = element("div", "education-topline");
      topline.append(element("h3", "", item.institution), element("span", "education-period", item.period));
      copy.append(topline, element("p", "education-degree", item.degree));
      if (item.detail) copy.append(profileText("p", "education-detail", item.detail));
      article.append(symbol, copy);
      $("#education-list").append(article);
    });
    [...data.news].sort((a, b) => b.date.localeCompare(a.date)).forEach((item) => {
      const row = element("article", "news-item");
      const fullDate = /^\d{4}-\d{2}$/.test(item.date) ? `${item.date}-01` : item.date;
      const date = element("time", "news-date", new Date(`${fullDate}T12:00:00Z`).toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" }));
      date.dateTime = item.date;
      const symbol = element("span", "news-symbol");
      symbol.append(icon(item.type));
      const copy = element("p", "news-text");
      copy.append(validURL(item.url) ? link(item.text, item.url) : document.createTextNode(item.text));
      row.append(date, symbol, copy);
      $("#news-list").append(row);
    });

    $("#publication-count").textContent = data.publications.length;
    const hasEqualContribution = data.publications.some((paper) => paper.authors.some((author) => author.equal));
    const types = new Set(data.publications.map((paper) => paper.type));
    $(".publication-note").hidden = !hasEqualContribution;
    $(".publication-filters").hidden = types.size < 2;
    $(".publication-toolbar").hidden = types.size < 2 && !hasEqualContribution;
    document.querySelectorAll(".filter-button").forEach((button) => {
      button.hidden = button.dataset.filter !== "all" && !types.has(button.dataset.filter);
    });
    function renderPublications(filter) {
      const entries = data.publications.filter((paper) => filter === "all" || paper.type === filter).sort((a, b) => b.year - a.year);
      const list = $("#publication-list");
      list.replaceChildren();
      const years = [...new Set(entries.map((paper) => paper.year))];
      years.forEach((year) => {
        const group = element("div", "publication-year-group");
        group.append(element("h3", "publication-year", year));
        const papers = element("div", "publication-year-papers");
        entries.filter((paper) => paper.year === year).forEach((paper) => papers.append(publicationItem(paper)));
        group.append(papers);
        list.append(group);
      });
      if (!entries.length) list.append(element("p", "empty-state", "No publications in this category yet."));
      $("#filter-status").textContent = `Showing ${entries.length} ${filter === "all" ? "" : filter + " "}publication${entries.length === 1 ? "" : "s"}.`;
    }
    document.querySelectorAll(".filter-button").forEach((button) => {
      button.addEventListener("click", () => {
        document.querySelectorAll(".filter-button").forEach((item) => {
          item.classList.toggle("active", item === button);
          item.setAttribute("aria-pressed", String(item === button));
        });
        renderPublications(button.dataset.filter);
      });
    });
    renderPublications("all");

    const sections = [...document.querySelectorAll("main > section")];
    let scheduled = false;
    function updateNavigation() {
      let current = sections[0];
      sections.forEach((section) => { if (section.getBoundingClientRect().top <= 160) current = section; });
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10) current = sections.at(-1);
      document.querySelectorAll(".nav-link").forEach((anchor) => {
        const active = anchor.hash === `#${current.id}`;
        anchor.classList.toggle("active", active);
        if (active) anchor.setAttribute("aria-current", "location");
        else anchor.removeAttribute("aria-current");
      });
      scheduled = false;
    }
    window.addEventListener("scroll", () => {
      if (!scheduled) { scheduled = true; requestAnimationFrame(updateNavigation); }
    }, { passive: true });
    updateNavigation();
  }

  function renderPublication() {
    const id = new URLSearchParams(window.location.search).get("id");
    const paper = data.publications.find((item) => item.id === id);
    const container = $("#publication-detail");
    if (!paper) {
      document.title = `Publication not found — ${data.profile.name}`;
      container.append(element("h1", "detail-title", "Publication not found"), element("p", "", "This publication may have moved. Return to the homepage to browse all publications."));
      return;
    }
    document.title = `${paper.title} — ${data.profile.name}`;
    container.append(element("span", "venue-badge", paper.venueShort), element("h1", "detail-title", paper.title), authors(paper), element("p", "publication-venue", paper.venue));
    if (data.template) container.append(element("p", "notice", "Template preview · This is a sample entry, not a real publication. Once a paper URL is added, its title on the homepage will link directly to the paper, DOI, or arXiv page."));
    if (paper.abstract) container.append(element("h2", "detail-section-title", "Abstract"), element("p", "detail-abstract", paper.abstract));
    const actions = element("div", "publication-actions");
    if (validURL(paper.url)) actions.append(resourceLink("Read paper ↗", paper.url, "abstract"));
    if (validURL(paper.pdf)) actions.append(resourceLink("PDF ↗", paper.pdf, "document"));
    if (validURL(paper.code)) actions.append(resourceLink("Code ↗", paper.code, "code"));
    if (paper.bibtex) actions.append(citationButton(paper));
    container.append(actions);
  }

  if ($("#publication-detail")) renderPublication();
  else renderHome();
})();
