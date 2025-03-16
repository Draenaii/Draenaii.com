/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
    const scrollDown = window.scrollY

  sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')
        
        if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
            sectionsClass.classList.add('active-link')
        }else{
            sectionsClass.classList.remove('active-link')
        }                                                    
    })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
//     reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text',{}); 
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img',{delay: 400}); 
sr.reveal('.home__social-icon',{ interval: 200}); 
sr.reveal('.skills__data, .work__img, .contact__input',{interval: 200}); 



/*===== CONTACT =====*/
document.getElementById("contact-form").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent form from reloading the page

    const form = event.target;
    const formData = new FormData(form);
    
    const response = await fetch("https://formspree.io/f/mkgjgjrg", {
        method: "POST",
        body: formData,
        headers: { "Accept": "application/json" }
    });

    const statusMessage = document.getElementById("form-status");

    if (response.ok) {
        statusMessage.textContent = "Message sent successfully!";
        statusMessage.style.color = "green";
        form.reset(); // Clear form fields
    } else {
        statusMessage.textContent = "Something went wrong. Please try again.";
        statusMessage.style.color = "red";
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("workModal");
    const modalContent = document.querySelector(".modal-content");
    const modalTitle = document.getElementById("modal-title");
    const modalImage = document.getElementById("modal-image");
    const modalDescription = document.getElementById("modal-description");
    const closeBtn = document.querySelector(".close");

    const projects = {
        1: { 
            title: "Bachelor’s Degree in AI", 
            img: "assets/img/bsc_degree.jpg", 
            desc: "Completed a BSc in Artificial Intelligence at Utrecht University, exploring machine learning, NLP, and robotics applications in automation and intelligent systems."
        },
        2: { 
            title: "Energy Supplier Settlements Innova Energie", 
            img: "assets/img/energy.jpg", 
            desc: "Engaged in energy supplier settlements at Innova Energie, improving accuracy in balance calculations and streamlining workflow processes using data-driven solutions. Also worked on complex billing issues."
        },
        3: { 
            title: "'Internship' at Mendix", 
            img: "assets/img/mendix.jpg", 
            desc: "Worked on a keystore API at Mendix, using mainly Python. Also did a lot of small courses to broaden my knowledge on coding."
        },
        4: { 
            title: "Predictive Analytics with Python & R", 
            img: "assets/img/analytics.jpg", 
            desc: "Built predictive models using Python & R to analyze different trends in data. Used machine learning algorithms to predict future outcomes and make data-driven decisions."
        },
        5: { 
            title: "Game Server Management", 
            img: "assets/img/game_server.jpg", 
            desc: "Managed two successful game servers: a FiveM roleplay server and a Minecraft survival server. Led a team, optimized performance, and built a thriving online community."
        },
        6: { 
            title: "Studying Abroad (Binghamton University, USA)", 
            img: "assets/img/study_abroad.jpg", 
            desc: "Spent a semester at Binghamton University, NY, studying physics, astronomy, American history and political science. Gained international experience and expanded my analytical skills."
        }
    };

    let lastClickedImageRect = null; // Store the last clicked image's position

    // Open modal when clicking an image
    document.querySelectorAll(".work__img").forEach(item => {
        item.addEventListener("click", function (e) {
            e.preventDefault();
            const projectId = this.getAttribute("data-id");

            if (projects[projectId]) {
                modalTitle.textContent = projects[projectId].title;
                modalImage.src = projects[projectId].img;
                modalDescription.textContent = projects[projectId].desc;

                // Store clicked image position
                lastClickedImageRect = this.getBoundingClientRect();

                // Set modal to start from image position
                modalContent.style.left = `${lastClickedImageRect.left + lastClickedImageRect.width / 2}px`;
                modalContent.style.top = `${lastClickedImageRect.top + lastClickedImageRect.height / 2}px`;

                // Show modal
                modal.style.display = "flex";

                // Delay adding animation class so position is set first
                setTimeout(() => {
                    modal.classList.add("show");

                    // Move modal to center
                    modalContent.style.left = "50%";
                    modalContent.style.top = "50%";
                    modalContent.style.transform = "translate(-50%, -50%) scale(1)";
                }, 10);
            }
        });
    });

    // Close modal when clicking the close button
    function closeModal() {
        if (lastClickedImageRect) {
            // Move modal back to the clicked image's position before fading out
            modalContent.style.left = `${lastClickedImageRect.left + lastClickedImageRect.width / 2}px`;
            modalContent.style.top = `${lastClickedImageRect.top + lastClickedImageRect.height / 2}px`;
        }

        // Apply shrink and fade-out effect
        modalContent.classList.add("closing");
        modal.classList.add("closing");

        setTimeout(() => {
            modal.classList.remove("show");
            modalContent.classList.remove("closing");
            modal.classList.remove("closing");
            modal.style.display = "none";
        }, 400); // Matches CSS transition duration
    }

    closeBtn.addEventListener("click", closeModal);

    // Close modal when clicking outside the content
    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            closeModal();
        }
    });
});