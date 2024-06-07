document.addEventListener("scroll", function(){
    var footer = document.querySelector("footer");
    if (window.scrollY > 0) {
        footer.classList.add("hidden");
    } else {
        footer.classList.remove("hidden");
    }

    var navbar = document.querySelector(".navbar"); // 수정된 부분
    if (window.scrollY > 0) {
        navbar.classList.add("hidden");
    } else {
        navbar.classList.remove("hidden");
    }
});

$(document).ready(function() {
    // 페이지 로드 시 초기 설정
    var $html = $("html, body"); // html과 body 모두 스크롤 조작 대상
    var page = 1;
    var lastPage = $(".content").length;
    var scrollSpeed = 800; // 스크롤 속도 조절

    $html.animate({scrollTop: 0}, 10);

    // 휠 이벤트로 페이지 이동
    $(window).on("wheel", function(e) {
        if ($html.is(":animated")) return;
        if (e.originalEvent.deltaY > 0) {
            if (page == lastPage) return;
            page++;
        } else if (e.originalEvent.deltaY < 0) {
            if (page == 1) return;
            page--;
        }
        var posTop = (page - 1) * $(window).height();
        $html.animate({scrollTop: posTop}, scrollSpeed);
        updateNavbar();
    });

    // 사이드바 링크 클릭 시 부드럽게 스크롤
    $(".nav_menu a").on("click", function(e) {
        e.preventDefault();
        var target = $($(this).attr("href"));
        var targetPos = target.offset().top;
        $html.animate({scrollTop: targetPos}, scrollSpeed);
        updateNavbar();
    });

    // 현재 섹션에 맞게 네비게이션 강조
    function updateNavbar() {
        var scrollPosition = $(window).scrollTop() + $(window).height() / 2;
        $(".content").each(function() {
            var sectionTop = $(this).offset().top;
            var sectionBottom = sectionTop + $(this).outerHeight();

            if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
                $(".nav_menu a").removeClass("active");
                $(".nav_menu a[href='#" + this.id + "']").addClass("active");
            }
        });
    }

    // 페이지 로드 시 초기 네비게이션 상태 설정
    $(window).on("scroll", function() {
        updateNavbar();
    });

    updateNavbar();
});

$(document).ready(function() {
    // 방명록 항목 불러오기
    function loadEntries() {
        var entries = JSON.parse(localStorage.getItem('guestbookEntries')) || [];
        var $entriesContainer = $('#guestbook-entries');
        $entriesContainer.empty();
        entries.forEach(function(entry, index) {
            var $entry = $('<div class="entry"></div>');
            $entry.append('<p><strong>' + entry.name + ':</strong> ' + entry.message + '</p>');
            $entry.append('<p class="entry-date">' + entry.date + '</p>'); // 날짜와 시간 표시
            var $deleteButton = $('<button class="delete-button">Delete</button>');
            $deleteButton.on('click', function() {
                deleteEntry(index);
            });
            $entry.append($deleteButton);
            $entriesContainer.append($entry);
        });
    }

    // 방명록 항목 추가
    function addEntry(name, message) {
        var entries = JSON.parse(localStorage.getItem('guestbookEntries')) || [];
        var now = new Date();
        var dateString = now.toLocaleString(); // 현지 시간과 날짜 문자열로 변환
        entries.push({ name: name, message: message, date: dateString });
        localStorage.setItem('guestbookEntries', JSON.stringify(entries));
        loadEntries();
    }

    // 방명록 항목 삭제
    function deleteEntry(index) {
        var entries = JSON.parse(localStorage.getItem('guestbookEntries')) || [];
        entries.splice(index, 1);
        localStorage.setItem('guestbookEntries', JSON.stringify(entries));
        loadEntries();
    }

    // 폼 제출 처리
    $('#guestbook-form').on('submit', function(e) {
        e.preventDefault();
        var name = $('#guest-name').val();
        var message = $('#guest-message').val();
        addEntry(name, message);
        $('#guest-name').val('');
        $('#guest-message').val('');
    });

    // 페이지 로드 시 방명록 항목 불러오기
    loadEntries();
});


document.addEventListener("scroll", function() {
    var scrollPosition = window.scrollY;

    var sections = document.querySelectorAll(".content");
    var icons = document.querySelectorAll(".quick-icons li");

    sections.forEach(function(section, index) {
        var sectionTop = section.offsetTop;
        var sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            icons[index].classList.add("icon-active");
        } else {
            icons[index].classList.remove("icon-active");
        }
    });
});
