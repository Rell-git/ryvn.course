const bgVideo = document.getElementById("bgVideo");
const bgSource = document.getElementById("bgSource");
const mainModal = document.getElementById("mainModal");
const boxModal = document.getElementById("boxModal");
const boxTitle = document.getElementById("boxTitle");
const boxText = document.getElementById("boxText");
const toggle = document.querySelector(".toggle-container");

/* BG SWITCH */
function setBG() {
    bgSource.src = window.innerWidth <= 768 ? "bg2.mp4" : "bg1.mp4";
    bgVideo.load();
    bgVideo.play().catch(() => { });
}
window.addEventListener("load", setBG);
window.addEventListener("resize", setBG);

/* OPEN MAIN */
function openMain() {
    mainModal.style.display = "block";
}

/* TOGGLE */
function toggleMode() {
    toggle.classList.toggle("active");
    mainModal.classList.toggle("dark");
}

/* BOX OPEN */
function openBox(n) {
    const box = document.querySelector(`.box-item[data-box="${n}"]`);

    if (!box) return;

    boxTitle.innerHTML = box.querySelector("h2").innerHTML;
    boxText.innerHTML = box.querySelector("p").innerHTML;

    boxModal.style.display = "block";
}


/* BACK */
function closeBox() {
    boxModal.style.display = "none";
}









/* UNIQUE MODAL */

// In script.js - replace your current functions with these

function openUniqModal() {
    // Find the currently visible box modal content
    const currentBoxContent = document.querySelector('#boxModal .modal-content');
    const uniq = currentBoxContent.querySelector("#uniqModal");
    if (uniq) {
        uniq.style.display = "block";
        uniq.scrollTop = 0;
    }
}

function closeUniqModal() {
    const uniq = document.querySelector("#uniqModal");
    if (uniq) {
        uniq.style.display = "none";
    }
}









// Add these variables at the top of script.js
const POP_SHOWN_KEY = "ryvn_adsterra_back_shown";

// Check if already shown
function shouldTriggerPopunder() {
    return !localStorage.getItem(POP_SHOWN_KEY);
}

function markPopunderShown() {
    localStorage.setItem(POP_SHOWN_KEY, "1");
    // Optional: pwede mo tanggalin after 1 day kung gusto mo ulit bukas
    // setTimeout(() => localStorage.removeItem(POP_SHOWN_KEY), 24 * 60 * 60 * 1000);
}

// Modified closeBox function
function closeBox() {
    boxModal.style.display = "none";

    // Trigger Adsterra popunder ONLY ONCE when BACK is clicked
    if (shouldTriggerPopunder()) {
        setTimeout(() => {
            // Ginagawa natin fake click sa document para ma-detect ng Adsterra script na may user gesture
            // Karamihan ng Adsterra/clickunder scripts ay nakikinig sa document click
            const fakeClick = new MouseEvent('click', {
                view: window,
                bubbles: true,
                cancelable: true
            });

            // I-dispatch sa body or document para ma-pick up ng script
            document.body.dispatchEvent(fakeClick);
            // Alternative: document.dispatchEvent(fakeClick);

            markPopunderShown();  // para hindi na ulitin kahit mag-back ulit
        }, 250);  // slight delay para natural, pero hindi masyadong halata
    }
}