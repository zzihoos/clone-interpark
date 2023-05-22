window.addEventListener("load", function () {
  // 티켓 json 연동
  let ticketData;
  const ticketXhttp = new XMLHttpRequest();
  ticketXhttp.onreadystatechange = function (event) {
    const req = event.target;
    if (req.readyState === XMLHttpRequest.DONE) {
      ticketData = JSON.parse(req.response);
      makeTicketSlide();
    }
  };
  ticketXhttp.open("GET", "ticketdata.json");
  ticketXhttp.send();
  function makeTicketSlide() {
    let html = ``;
    for (let i = 0; i < ticketData.ticket_total; i++) {
      let obj = ticketData[`ticket_${i + 1}`];
      let temp = `
          <div class="swiper-slide">
            <a href="${obj.link}" class="ticket-link">
              <div class="ticket-img">
                <img src="images/${obj.poster}" alt="${obj.title}" />
                <span class="ticket-rank">${obj.rank}</span>
              </div>
              <div class="ticket-info">
                <ul class="ticket-info-list">
                  <li>
                    <span class="ticket-title"><b>${obj.title}</b></span>
                  </li>
                  <li>
                    <span class="ticket-hall">${obj.hall}</span>
                  </li>
                  <li>
                    <span class="ticket-date">${obj.date}</span>
                  </li>
                  <li><span class="ticket-sale">${obj.sale}</span></li>
                </ul>
              </div>
            </a>
          </div>
        `;
      html += temp;
    }
    const swTicketWrapper = document.querySelector(
      ".sw-ticket .swiper-wrapper"
    );
    swTicketWrapper.innerHTML = html;

    let ticketSwiper = new Swiper(".sw-ticket", {
      slidesPerView: "auto",
      spaceBetween: 10,
      navigation: {
        nextEl: ".ticket .sw-next",
        prevEl: ".ticket .sw-prev",
      },
      breakpoints: {
        1024: {
          slidesPerView: 3,
          spaceBetween: 32,
        },
        1280: {
          slidesPerView: 4,
          spaceBetween: 27,
        },
      },
    });
  }
});
