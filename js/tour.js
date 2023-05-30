window.addEventListener("load", function () {
    // tour 데이터 파싱 및 슬라이드 제작
    function parseTour(_cate) {
      // const tourXhttp = new XMLHttpRequest();
      // tourXhttp.onreadystatechange = function (event) {
      //   const req = event.target;
      //   if (req.readyState === XMLHttpRequest.DONE) {
      //     let data = JSON.parse(req.response);
      //     makeTourSlide(data);
      //   }
      // };
  
      if (_cate === "망설이면 품절") {
        // tourXhttp.open("GET", "tourdata.json");
        fetch("tourdata.json")
        .then(res => res.json())
        .then(result => makeTourSlide(result))
        .catch(err => console.log(err));
      } else if (_cate === "패키지") {
        // tourXhttp.open("GET", "tourdata1.json");
        fetch("tourdata1.json")
        .then(res => res.json())
        .then(result => makeTourSlide(result))
        .catch(err => console.log(err));
      } else if (_cate === "숙소") {
        // tourXhttp.open("GET", "tourdata2.json");
        fetch("tourdata2.json")
        .then(res=>res.json())
        .then(result => makeTourSlide(result))
        .catch(err => console.log(err));
      } else if (_cate === "해외숙소") {
        // tourXhttp.open("GET", "tourdata3.json");
        fetch("tourdata3.json")
        .then(res => res.json())
        .then(result => makeTourSlide(result))
        .catch(err => console.log(err));

      }
      
      // tourXhttp.send();
    }
    parseTour("망설이면 품절");
  
    function makeTourSlide(_data) {
      let swTourHtml = ``;
      for (let i = 0; i < _data.tour_total; i++) {
        let obj = _data[`tour_${i + 1}`];
        let temp = `
        <div class="swiper-slide">
          <a href="${obj.link}" class="tour-link">
            <div class="tour-img">
              <img src="images/${obj.pic}" alt="${obj.alt}" />
            </div>
            <div class="tour-info">
              <ul class="tour-info-list">
                <li ${
                  obj.category ? "style='display:block'" : "style='display:none'"
                }>
                  <span class="tour-cate">${obj.category}</span>
                </li>
                <li>
                  <span class="tour-title">${obj.title}</span>
                </li>
                <li>
                  <span class="tour-place">${obj.place}</span>
                </li>
                <li>
                  <span class="tour-price"><b>${obj.price}</b>원~</span>
                </li>
              </ul>
            </div>
          </a>
        </div>
        `;
        swTourHtml += temp;
      }
  
      let swTourWrapper = document.querySelector(".sw-tour .swiper-wrapper");
      swTourWrapper.innerHTML = swTourHtml;


  
      let tourSwiper = new Swiper(".sw-tour", {
        slidesPerView: 3,
        grid: {
          rows: 2,
          fill: "row",
        },
        spaceBetween: 10,
        navigation: {
          nextEl: ".tour .sw-next",
          prevEl: ".tour .sw-prev",
        },
        breakpoints: {
          1024: {
            spaceBetween: 32,
            slidesPerView: 2,
            // 화면당 2개씩 슬라이드 이동
            slidesPerGroup: 2,
            grid: {
              rows: 1,
            },
          },
          1280: {
            spaceBetween: 26,
            slidesPerView: 3,
            // 화면당 4개씩 슬라이드 이동
            slidesPerGroup: 3,
            grid: {
              rows: 1,
            },
          },
        },
      });
    }
  
    const btns = document.querySelectorAll(".tour .btns a");
    let cateName = ["망설이면 품절","패키지","숙소","해외숙소"];
    for(let i = 0; i < cateName.length; i++){
      btns[i].onclick = function (event) {
        event.preventDefault();
        parseTour(cateName[i]);
        for(let j = 0; j < btns.length; j++){
          btns[j].classList.remove("btns-active")
         }
          //포커스 적용
          this.classList.add("btns-active");
      };
    }
    btns[0].classList.add("btns-active");
    // btns[0].onclick = function (event) {
    //   event.preventDefault();
    //   parseTour(cateName[0]);
    // };
    // btns[1].onclick = function (event) {
    //   event.preventDefault();
    //   parseTour(cateName[1]);
    // };
    // btns[2].onclick = function (event) {
    //   event.preventDefault();
    //   parseTour(cateName[2]);
    // };
    // btns[3].onclick = function (event) {
    //   event.preventDefault();
    //   parseTour(cateName[3]);
    // };
  });