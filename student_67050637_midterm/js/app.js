const initialEvents = [
  {
    id: 1,
    title: "Modern JavaScript & ES6+ Workshop",
    category: "Tech",
    speaker: "Dr. Somchai Dev",
    date: "2026-09-15",
    seats: 5,
    description: "เจาะลึกการใช้งาน JavaScript ยุคใหม่ อธิบายเรื่อง Async/Await, Closure และ Modules",
    isRegistered: false
  },
  {
    id: 2,
    title: "UX/UI Design System Creation",
    category: "Design",
    speaker: "Aj. Ananya Design",
    date: "2026-09-20",
    seats: 0,
    description: "การสร้าง Design System สำหรับองค์กรขนาดใหญ่ด้วย Figma และการเชื่อมต่อกับ CSS",
    isRegistered: false
  },
  {
    id: 3,
    title: "Startup Pitching & Funding 101",
    category: "Business",
    speaker: "Khun Vorapat VC",
    date: "2026-09-25",
    seats: 12,
    description: "เทคนิคการนำเสนอแผนธุรกิจเพื่อระดมทุนสำหรับนักศึกษาสายเทคโนโลยี",
    isRegistered: false
  },
  {
    id: 4,
    title: "Cybersecurity Essentials for Web Apps",
    category: "Tech",
    speaker: "Dr. Prasit Security",
    date: "2026-10-01",
    seats: 8,
    description: "เรียนรู้ช่องโหว่พื้นฐาน OWASP Top 10 และแนวทางการป้องกันบน Web Front-end",
    isRegistered: false
  }
];

const STORAGE_KEY = "smartEventHub_events";
const THEME_KEY = "smartEventHub_theme";

let events = [];
let searchTerm = "";
let categoryFilter = "";
let sortOrder = "date-desc";

let searchInput, categorySelect, sortSelect, filterForm, addEventBtn, changeModeBtn;
let addEventOverlay;

const CATEGORY_OPTIONS = ["Business", "Tech", "Design", "General"];

function initApp() {
  loadEvents();
  cacheDom();
  wrapSidebar();
  setupCategoryOptions();
  bindEvents();
  applyStoredTheme();
  render();
}

function applyStoredTheme() {
  if (localStorage.getItem(THEME_KEY) === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
  }
}

function toggleTheme() {
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  if (isDark) {
    document.documentElement.removeAttribute("data-theme");
    localStorage.removeItem(THEME_KEY);
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem(THEME_KEY, "dark");
  }
}

function wrapSidebar() {
  const statsSection = document.getElementById("activity-detail");
  const filterSection = document.getElementById("activity-filter");
  const wrapper = document.createElement("div");
  wrapper.className = "sidebar-column";
  statsSection.parentNode.insertBefore(wrapper, statsSection);
  wrapper.appendChild(statsSection);
  wrapper.appendChild(filterSection);
}

function cacheDom() {
  searchInput = document.getElementById("search-keyword");
  categorySelect = document.getElementById("filter-category");
  sortSelect = document.getElementById("sort-order");
  filterForm = categorySelect.closest("form");
  addEventBtn = document.getElementById("AddEvent");
  changeModeBtn = document.getElementById("ChangeMode");
}

function setupCategoryOptions() {
  const allOption = document.createElement("option");
  allOption.value = "";
  allOption.textContent = "ทั้งหมด";
  allOption.selected = true;
  categorySelect.insertBefore(allOption, categorySelect.firstChild);

  const generalOption = document.createElement("option");
  generalOption.value = "General";
  generalOption.textContent = "General";
  categorySelect.appendChild(generalOption);
}

function loadEvents() {
  const saved = localStorage.getItem(STORAGE_KEY);
  events = saved ? JSON.parse(saved) : initialEvents.map((event) => ({ ...event }));
}

function saveEvents() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
}

function bindEvents() {
  searchInput.addEventListener("input", (e) => {
    searchTerm = e.target.value.trim().toLowerCase();
    render();
  });

  categorySelect.addEventListener("change", (e) => {
    categoryFilter = e.target.value;
    render();
  });

  sortSelect.addEventListener("change", (e) => {
    sortOrder = e.target.value;
    render();
  });

  filterForm.addEventListener("reset", (e) => {
    e.preventDefault();
    searchInput.value = "";
    categorySelect.value = "";
    sortSelect.value = "date-desc";
    searchTerm = "";
    categoryFilter = "";
    sortOrder = "date-desc";
    resetData();
  });

  getEventListContainer().addEventListener("click", (e) => {
    const btn = e.target.closest(".register-btn");
    if (!btn) return;
    const card = btn.closest(".event-card");
    registerEvent(Number(card.dataset.id));
  });

  addEventBtn.addEventListener("click", openAddEventModal);

  changeModeBtn.addEventListener("click", toggleTheme);
}

function resetData() {
  events = initialEvents.map((event) => ({ ...event }));
  saveEvents();
  render();
}

function registerEvent(id) {
  const event = events.find((ev) => ev.id === id);
  if (!event || event.isRegistered || event.seats <= 0) return;
  event.seats -= 1;
  event.isRegistered = true;
  saveEvents();
  render();
}

function getFilteredEvents() {
  return events.filter((event) => {
    const matchesSearch =
      !searchTerm ||
      event.title.toLowerCase().includes(searchTerm) ||
      event.speaker.toLowerCase().includes(searchTerm);
    const matchesCategory = !categoryFilter || event.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });
}

function getSortedEvents(list) {
  const sorted = [...list];
  switch (sortOrder) {
    case "date-asc":
      sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
      break;
    case "seat-desc":
      sorted.sort((a, b) => b.seats - a.seats);
      break;
    default:
      sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
  }
  return sorted;
}

function getEventListContainer() {
  let container = document.getElementById("event-list");
  if (!container) {
    const titleSection = document.getElementById("activity-list-title");
    const wrapper = document.createElement("div");
    wrapper.className = "content-column";
    titleSection.parentNode.insertBefore(wrapper, titleSection);
    wrapper.appendChild(titleSection);

    container = document.createElement("div");
    container.id = "event-list";
    container.className = "event-list";
    wrapper.appendChild(container);
  }
  return container;
}

function createEventCard(event) {
  const card = document.createElement("article");
  card.className = "card event-card";
  card.dataset.id = event.id;

  const title = document.createElement("h3");
  title.className = "event-title";
  title.textContent = event.title;

  const category = document.createElement("span");
  category.className = "event-category";
  category.textContent = event.category;

  const speaker = document.createElement("p");
  speaker.className = "event-speaker";
  speaker.textContent = `วิทยากร: ${event.speaker}`;

  const date = document.createElement("p");
  date.className = "event-date";
  date.textContent = `วันที่: ${event.date}`;

  const seats = document.createElement("p");
  seats.className = "event-seats";
  seats.textContent = `ที่นั่งว่าง: ${event.seats}`;

  const description = document.createElement("p");
  description.className = "event-description";
  description.textContent = event.description;

  const registerBtn = document.createElement("button");
  registerBtn.type = "button";
  registerBtn.className = "register-btn";
  if (event.isRegistered) {
    registerBtn.textContent = "ลงทะเบียนแล้ว";
    registerBtn.disabled = true;
  } else if (event.seats <= 0) {
    registerBtn.textContent = "ที่นั่งเต็ม";
    registerBtn.disabled = true;
  } else {
    registerBtn.textContent = "ลงทะเบียน";
    registerBtn.disabled = false;
  }

  card.append(title, category, speaker, date, seats, description, registerBtn);
  return card;
}

function renderEvents(eventList) {
  const container = getEventListContainer();
  container.innerHTML = "";
  eventList.forEach((event) => {
    container.appendChild(createEventCard(event));
  });
}

function updateStats(list) {
  const total = list.length;
  const registered = list.filter((event) => event.isRegistered).length;
  const available = list.reduce((sum, event) => sum + event.seats, 0);

  document.getElementById("stat-total").textContent = total;
  document.getElementById("stat-registered").textContent = registered;
  document.getElementById("stat-available").textContent = available;
}

function render() {
  const filtered = getFilteredEvents();
  const sorted = getSortedEvents(filtered);
  renderEvents(sorted);
  updateStats(filtered);
}

function buildFormField(labelText, inputEl) {
  const group = document.createElement("div");
  group.className = "form-group";

  const label = document.createElement("label");
  label.textContent = labelText;
  label.htmlFor = inputEl.id;

  const error = document.createElement("span");
  error.className = "field-error";
  error.id = `${inputEl.id}-error`;

  group.append(label, inputEl, error);
  return group;
}

function buildAddEventModal() {
  const overlay = document.createElement("div");
  overlay.id = "add-event-overlay";
  overlay.className = "modal-overlay hidden";

  const modal = document.createElement("div");
  modal.className = "modal";

  const heading = document.createElement("h2");
  heading.textContent = "เพิ่มกิจกรรมใหม่";

  const form = document.createElement("form");
  form.id = "add-event-form";
  form.noValidate = true;

  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.id = "new-event-title";
  titleInput.className = "input-field";

  const categoryInput = document.createElement("select");
  categoryInput.id = "new-event-category";
  categoryInput.className = "input-field";
  CATEGORY_OPTIONS.forEach((cat) => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    categoryInput.appendChild(opt);
  });

  const speakerInput = document.createElement("input");
  speakerInput.type = "text";
  speakerInput.id = "new-event-speaker";
  speakerInput.className = "input-field";

  const dateInput = document.createElement("input");
  dateInput.type = "date";
  dateInput.id = "new-event-date";
  dateInput.className = "input-field";

  const seatsInput = document.createElement("input");
  seatsInput.type = "number";
  seatsInput.id = "new-event-seats";
  seatsInput.className = "input-field";
  seatsInput.min = "1";

  const descriptionInput = document.createElement("textarea");
  descriptionInput.id = "new-event-description";
  descriptionInput.className = "input-field";
  descriptionInput.rows = 3;

  form.append(
    buildFormField("ชื่อกิจกรรม:", titleInput),
    buildFormField("ประเภท:", categoryInput),
    buildFormField("วิทยากร:", speakerInput),
    buildFormField("วันที่จัดงาน:", dateInput),
    buildFormField("จำนวนที่นั่ง:", seatsInput),
    buildFormField("รายละเอียด:", descriptionInput)
  );

  const actions = document.createElement("div");
  actions.className = "modal-actions";

  const cancelBtn = document.createElement("button");
  cancelBtn.type = "button";
  cancelBtn.textContent = "ยกเลิก";
  cancelBtn.className = "btn-reset";

  const submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  submitBtn.textContent = "บันทึกกิจกรรม";

  actions.append(cancelBtn, submitBtn);
  form.appendChild(actions);

  modal.append(heading, form);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  cancelBtn.addEventListener("click", closeAddEventModal);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeAddEventModal();
  });
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    handleAddEventSubmit();
  });

  return overlay;
}

function openAddEventModal() {
  if (!addEventOverlay) addEventOverlay = buildAddEventModal();
  addEventOverlay.classList.remove("hidden");
}

function closeAddEventModal() {
  addEventOverlay.classList.add("hidden");
  addEventOverlay.querySelector("form").reset();
  clearFieldErrors();
}

function clearFieldErrors() {
  document.querySelectorAll(".field-error").forEach((el) => {
    el.textContent = "";
  });
}

function setFieldError(id, message) {
  const el = document.getElementById(`${id}-error`);
  if (el) el.textContent = message;
}

function handleAddEventSubmit() {
  clearFieldErrors();

  const title = document.getElementById("new-event-title").value.trim();
  const category = document.getElementById("new-event-category").value;
  const speaker = document.getElementById("new-event-speaker").value.trim();
  const date = document.getElementById("new-event-date").value;
  const seatsRaw = document.getElementById("new-event-seats").value;
  const seats = Number(seatsRaw);
  const description = document.getElementById("new-event-description").value.trim();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let isValid = true;

  if (!title) {
    setFieldError("new-event-title", "กรุณากรอกชื่อกิจกรรม");
    isValid = false;
  }
  if (!speaker) {
    setFieldError("new-event-speaker", "กรุณากรอกชื่อวิทยากร");
    isValid = false;
  }
  if (!date) {
    setFieldError("new-event-date", "กรุณาเลือกวันที่");
    isValid = false;
  } else if (new Date(date) < today) {
    setFieldError("new-event-date", "วันที่ต้องไม่เป็นวันในอดีต");
    isValid = false;
  }
  if (!seatsRaw || seats <= 0) {
    setFieldError("new-event-seats", "จำนวนที่นั่งต้องมากกว่า 0");
    isValid = false;
  }

  if (!isValid) return;

  const newEvent = {
    id: events.length ? Math.max(...events.map((event) => event.id)) + 1 : 1,
    title,
    category,
    speaker,
    date,
    seats,
    description,
    isRegistered: false
  };

  events.push(newEvent);
  saveEvents();
  render();
  closeAddEventModal();
}

document.addEventListener("DOMContentLoaded", initApp);
