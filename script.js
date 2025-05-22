document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                }
            });
        });
    }

    const psychologistList = document.querySelector('.psychologist-list');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    let cardsPerView = 3;
    let cardWidth = 300;
    let cardGap = 20;
    let cardFullWidth = cardWidth + cardGap;
    let currentScrollPosition = 0;

    function updateArrowStates() {
        if (!psychologistList) return;

        const maxScrollLeft = psychologistList.scrollWidth - psychologistList.clientWidth;

        if (leftArrow) {
            leftArrow.disabled = currentScrollPosition <= 0;
        }
        if (rightArrow) {
            rightArrow.disabled = currentScrollPosition >= maxScrollLeft - 1;
        }
    }

    function updateCardsPerView() {
        if (window.innerWidth <= 768) {
            cardsPerView = 1;
        } else if (window.innerWidth <= 1024) {
            cardsPerView = 2;
        } else {
            cardsPerView = 3;
        }
        updateArrowStates();
    }
    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);


    if (psychologistList) {
        if (leftArrow) {
            leftArrow.addEventListener('click', () => {
                const scrollAmount = cardFullWidth * cardsPerView;
                psychologistList.scrollBy({
                    left: -scrollAmount,
                    behavior: 'smooth'
                });
                setTimeout(() => {
                    currentScrollPosition = psychologistList.scrollLeft;
                    updateArrowStates();
                }, 300);
            });
        }

        if (rightArrow) {
            rightArrow.addEventListener('click', () => {
                const scrollAmount = cardFullWidth * cardsPerView;
                psychologistList.scrollBy({
                    left: scrollAmount,
                    behavior: 'smooth'
                });
                setTimeout(() => {
                    currentScrollPosition = psychologistList.scrollLeft;
                    updateArrowStates();
                }, 300);
            });
        }

        psychologistList.addEventListener('scroll', () => {
            currentScrollPosition = psychologistList.scrollLeft;
            updateArrowStates();
        });
        updateArrowStates();
    }

    if (window.location.pathname.includes('psicologos.html')) {
        const modal = document.getElementById('selectPsychologistModal');
        const closeModalButtons = document.querySelectorAll('#selectPsychologistModal .close-button, .modal-understood-button');

        const urlParams = new URLSearchParams(window.location.search);
        const showModal = urlParams.get('showModal');

        if (showModal === 'true' && modal) {
            modal.classList.add('show');

            urlParams.delete('showModal');
            const newUrl = window.location.pathname + (urlParams.toString() ? '?' + urlParams.toString() : '');
            window.history.replaceState(null, '', newUrl);


            closeModalButtons.forEach(button => {
                button.addEventListener('click', function() {
                    modal.classList.remove('show');
                });
            });

            window.addEventListener('click', function(event) {
                if (event.target === modal) {
                    modal.classList.remove('show');
                }
            });
        }
    }
});