/* SELECTORS
================================================================= */
const genBtn = document.getElementById("gen-btn");
const emptyState = document.getElementById("empty-state");
const passCont = document.querySelector(".password-cont");

/* VARIABLES
================================================================= */
const upperChars = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("");
const lowerChars = "abcdefghijklmnñopqrstuvwxyz".split("");
const numbersChars = Array.from("0123456789");
const specialChars = "¡!\"#$%&'()*+,-./:;<=>¿?@[\\]^_`{}~".split("");
const chars = lowerChars.concat(upperChars, numbersChars, specialChars);

let numberOfPass = 1;
let maxLength = 8;
let currentLength = 0;
let password = "";

let hasUpper = true;
let hasLower = true;
let hasNumbers = true;
let hasSpecial = true;

let firstChar = "";
let lastChar = "";

/* EVENTS
================================================================= */
window.addEventListener("load", () => {
    showBg();
    resetSettings();
    updateCharSelects();
});

genBtn.addEventListener("click", () => {
    // Verify if there's any selected checkboxes
    if(!hasUpper && !hasLower && !hasNumbers && !hasSpecial) {
        showToast({
            type: "error",
            title: "Error!",
            description: "At least one type of characters must be selected before creating a new password."
        });
    } else {
        const passwords = Array.from(document.querySelectorAll(".password"));
        if(passwords.length === 0) {
            for(let i = 0; i < numberOfPass; i++){
                genPassword();
            }
        } else {
            password = ""; // Empty 'password' variable's value
            passwords.filter((p) => {
                passCont.removeChild(p);
            });
            for(let i = 0; i < numberOfPass; i++){
                genPassword();
            }
        }
    }
});

/* FUNCTIONS
================================================================= */
function check(charArray) {
    if (charArray.some((char) => char === firstChar)) {
        firstChar = "";
        fakeLabel.innerText = "None";
        firstRadio.checked = true;
    } else if (charArray.some((char) => char === lastChar)) {
        lastChar = "";
        lastCharFakeLabel.innerText = "None";
        lastCharFirstRadio.checked = true;
    } else {
        return;
    }
};

function genPassword() {
    let allChars = []; // Array that will contain all the selected characters groups
    let bindingChars = []; // Array that will contain one character from every selected characters group
    let passChars = []; // Array that will contain the bindingChars[] plus as many character from allChars[] as needed to reach the password length

    if (hasUpper) {
        let index = Math.floor(Math.random() * upperChars.length);
        allChars = allChars.concat(upperChars)
        bindingChars.push(upperChars[index]);
    }
    if (hasLower) {
        let index = Math.floor(Math.random() * lowerChars.length);
        allChars = allChars.concat(lowerChars)
        bindingChars.push(lowerChars[index]);
    }
    if (hasNumbers) {
        let index = Math.floor(Math.random() * numbersChars.length);
        allChars = allChars.concat(numbersChars)
        bindingChars.push(numbersChars[index]);
    }
    if (hasSpecial) {
        let index = Math.floor(Math.random() * specialChars.length);
        allChars = allChars.concat(specialChars)
        bindingChars.push(specialChars[index]);
    }

    passChars = passChars.concat(bindingChars);

    // Evaluate if there is any first chars defined
    if (firstChar) {
        if (lastChar) {
            // password = firstChar + lastChar;
            currentLength = 2;
        } else {
            // password = firstChar;
            currentLength = 1;
            // Concatenate the rest of 'password' characters up to its max. length
            /* for (let i = bindingChars.length; i < maxLength - 1; i++) {
                let index = Math.floor(Math.random() * allChars.length);
                passChars.push(allChars[index]);
            } */
        }
    } else if (lastChar) {
        // password = lastChar;
        currentLength = 1;
        /* for (let i = bindingChars.length; i < maxLength - 1; i++) {
            let index = Math.floor(Math.random() * allChars.length);
            passChars.push(allChars[index]);
        } */
    } else {
        // password = "";
        currentLength = 0;
        /* for (let i = bindingChars.length; i < maxLength; i++) {
            let index = Math.floor(Math.random() * allChars.length);
            passChars = passChars.concat(allChars[index]);
        } */
    };

    // Concatenate the rest of 'password' characters up to its max. length
    for (let i = bindingChars.length; i < maxLength - currentLength; i++) {
        let index = Math.floor(Math.random() * allChars.length);
        passChars.push(allChars[index]);
    }

    //console.log(bindingChars, passChars);

    //password = firstChar + passChars.join('') + lastChar;

    let tempPassword = '';

    while (passChars.length > 0) {
        let index = Math.floor(Math.random() * passChars.length);
        tempPassword += passChars[index];
        passChars.splice(index, 1);
    }

    password = firstChar + tempPassword + lastChar;

    // Hide empty state
    emptyState.style.display = "none";

    const passBtn = document.createElement("button");
    passBtn.classList.add("password");
    passBtn.classList.add("w--100");
    passBtn.classList.add("p--2");
    passBtn.classList.add("flex");
    passBtn.classList.add("j-c--space-b");
    passBtn.classList.add("al-i--center");
    passBtn.classList.add("c--p-50");
    passBtn.classList.add("b--p-10-30");
    passBtn.classList.add("bdp-f--blur-1");
    passBtn.classList.add("bd--p-50-10_1_sd");
    passBtn.classList.add("bd-rd--2");
    passBtn.classList.add("tr--a_out_4");
    passBtn.classList.add("cur--pointer");

    const copyIcon = document.createElement("div");
    copyIcon.classList.add("square--5");
    copyIcon.innerHTML = `<svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                    </svg>`;

    const passWrap = document.createElement("div");
    const passCharsArray = password.split("");
    passCharsArray.forEach((c) => {
        const char = document.createElement("span");
        char.classList.add("char-span");
        char.innerText = c;
        if (upperChars.includes(c)) {
            char.style.color = "#0F0";
        } else if (lowerChars.includes(c)) {
            char.style.color = "#FF0";
        } else if (numbersChars.includes(c)) {
            char.style.color = "#0FF";
        } else if (specialChars.includes(c)) {
            char.style.color = "#F0F";
        }
        passWrap.appendChild(char);
        passBtn.appendChild(passWrap);
        passBtn.appendChild(copyIcon);
        passBtn.value = password;
    });

    // Copy password to clipboard
    passBtn.addEventListener("click", () => {
        const btnPassword = passBtn.value;
        copy(btnPassword, "Password copied to clipboard", "Create a password before copying it.");
    });

    passCont.appendChild(passBtn);
};

function copy(text, successMsg, errorMsg) {
    const display = window.getComputedStyle(emptyState).display;
    if (display === "none") {
        const textToCopy = document.createElement("textarea");
        textToCopy.value = text;
        document.body.appendChild(textToCopy);
        textToCopy.select();
        document.execCommand("copy");
        document.body.removeChild(textToCopy);
        showToast({
            type: "success",
            title: "Success!",
            description: successMsg
        }); // Show toast once the password is copied. See function below 👇
    } else {
        showToast({
            type: "error",
            title: "Error!",
            description: errorMsg
        });        
    }
}