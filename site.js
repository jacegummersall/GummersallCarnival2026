const data = window.reunionData;

const renderList = (selector, items, template) => {
  const element = document.querySelector(selector);
  element.innerHTML = items.map(template).join("");
};

renderList("#quickFacts", data.quickFacts, (fact) => `
  <article class="fact">
    <span>${fact.label}</span>
    <strong>
      ${
        fact.url
          ? `<a href="${fact.url}" target="_blank" rel="noopener">${fact.value}</a>`
          : fact.value
      }
    </strong>
  </article>
`);

const scheduleEvents = data.schedule.flatMap((day) =>
  day.events.map((item) => ({
    ...item,
    day: day.day,
    date: day.date,
  })),
);

renderList("#scheduleList", data.schedule, (day) => `
  <article class="day-card">
    <div class="day-card-header">
      <span class="date-badge">${day.date}</span>
      <div>
        <h3>${day.day}</h3>
        <p>${day.theme}</p>
      </div>
    </div>
    <p class="day-description">${day.description}</p>
    <div class="day-events">
      ${day.events
        .map((item) => {
          const eventIndex = scheduleEvents.findIndex(
            (event) =>
              event.day === day.day &&
              event.date === day.date &&
              event.time === item.time &&
              event.title === item.title,
          );

          return `
          <button class="day-event" type="button" data-event-index="${eventIndex}">
            <div class="time-badge">
              <span class="event-time">${item.time}</span>
              <span class="event-title">${item.title}</span>
            </div>
          </button>
        `;
        })
        .join("")}
    </div>
  </article>
`);

renderList("#activityCards", data.activities, (activity) => `
  <article class="activity-card">
    <div class="activity-icon" aria-hidden="true">${activity.icon}</div>
    <h3>${activity.title}</h3>
    <p>${activity.description}</p>
    ${
      activity.palette
        ? `<div class="palette-grid" aria-label="Family photo color palette">
            ${activity.palette
              .map((swatch) => `
                <div class="palette-swatch" aria-label="${swatch.name}" title="${swatch.name}">
                  <span class="swatch-color" style="background: ${swatch.color}"></span>
                </div>
              `)
              .join("")}
          </div>`
        : ""
    }
    ${
      activity.url
        ? `<a class="text-link" href="${activity.url}" target="_blank" rel="noopener">${activity.linkLabel}</a>`
        : ""
    }
  </article>
`);

renderList("#detailList", data.details, (detail) => `
  <article class="detail-item">
    <h3>${detail.title}</h3>
    <p>${detail.description}</p>
    ${
      detail.url
        ? `<a class="text-link" href="${detail.url}" target="_blank" rel="noopener">${detail.linkLabel}</a>`
        : ""
    }
  </article>
`);

const lastUpdated = document.querySelector("#lastUpdated");
if (lastUpdated) {
  lastUpdated.textContent = data.lastUpdated;
}

const modal = document.querySelector("#eventModal");
const modalClose = modal.querySelector(".modal-close");
const modalDay = document.querySelector("#eventModalDay");
const modalTitle = document.querySelector("#eventModalTitle");
const modalTime = document.querySelector("#eventModalTime");
const modalDescription = document.querySelector("#eventModalDescription");
const modalLinks = document.querySelector("#eventModalLinks");
let lastFocusedEvent = null;

const closeEventModal = () => {
  modal.hidden = true;
  document.body.classList.remove("modal-open");
  lastFocusedEvent?.focus();
};

const openEventModal = (event, trigger) => {
  lastFocusedEvent = trigger;
  modalDay.textContent = `${event.day}, ${event.date}`;
  modalTitle.textContent = event.title;
  modalTime.textContent = event.time;
  modalDescription.textContent = event.description;
  modalLinks.innerHTML = "";

  const eventLinks =
    event.links || (event.url ? [{ label: event.linkLabel || "View Details", url: event.url }] : []);

  modalLinks.hidden = eventLinks.length === 0;
  modalLinks.innerHTML = eventLinks
    .map(
      (link) => `
        <a class="button primary modal-link" href="${link.url}" target="_blank" rel="noopener">
          ${link.label}
        </a>
      `,
    )
    .join("");

  modal.hidden = false;
  document.body.classList.add("modal-open");
  modalClose.focus();
};

document.addEventListener("click", (event) => {
  const eventTile = event.target.closest(".day-event");
  if (!eventTile) return;

  const scheduleEvent = scheduleEvents[Number(eventTile.dataset.eventIndex)];
  openEventModal(scheduleEvent, eventTile);
});

modalClose.addEventListener("click", closeEventModal);
modal.addEventListener("click", (event) => {
  if (event.target === modal) closeEventModal();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !modal.hidden) closeEventModal();
});
