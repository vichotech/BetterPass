/* SELECTORS
================================================================= */
const modalBlur = document.getElementById("modal-blur");
const settings = document.getElementById("settings-modal-cont");

// Checkboxes
const upperCheck = document.getElementById("include-upper");
const lowerCheck = document.getElementById("include-lower");
const numbersCheck = document.getElementById("include-numbers");
const specialCheck = document.getElementById("include-special");

// Ranges
const lengthLabel = document.getElementById("length-label");
const lengthInput = document.getElementById("length-input");
const passNumberLabel = document.getElementById("pass-number-label");
const passNumberInput = document.getElementById("pass-number-input");

// First character fake select
const firstCharFakeLabel = document.getElementById("first-char-fake-label");
const firstCharFakeSelect = document.getElementById("first-char-fake-select");
const firstCharFakeOptList = document.getElementById("first-char-fake-opt-list");
const firstCharFirstRadio = document.getElementById("first-char-first-radio");

// Last character fake select
const lastCharFakeLabel = document.getElementById("last-char-fake-label");
const lastCharFakeSelect = document.getElementById("last-char-fake-select");
const lastCharFakeOptList = document.getElementById("last-char-fake-opt-list");
const lastCharFirstRadio = document.getElementById("last-char-first-radio");

// Buttons
const doneBtn = document.getElementById("done-btn");
const resetBtn = document.getElementById("reset-btn");

/* FUNCTIONS
================================================================= */
function updateCharSelects() {
    const fakeOptions = Array.from(document.querySelectorAll(".fake-opt"));
    const upperOptions = Array.from(document.querySelectorAll(".upper-char"));
    const lowerOptions = Array.from(document.querySelectorAll(".lower-char"));
    const numbersOptions = Array.from(document.querySelectorAll(".number-char"));
    const specialOptions = Array.from(document.querySelectorAll(".special-char"));
  
    // Toggle options according to the checked checkboxes
    upperOptions.forEach((opt) => {
        opt.hidden = !upperCheck.checked;
    });

    lowerOptions.forEach((opt) => {
      opt.hidden = !lowerCheck.checked;
    });
  
    numbersOptions.forEach((opt) => {
      opt.hidden = !numbersCheck.checked;
    });
  
    specialOptions.forEach((opt) => {
      opt.hidden = !specialCheck.checked;
    });

    upperChars.forEach((char) => {
        if (!fakeOptions.some((option) => option.value === char)) {
            const firstCharLi = createRadioElement("upper-char", "first-char", char, "first-char");
            firstCharFakeOptList.appendChild(firstCharLi);
            const lastCharLi = createRadioElement("upper-char", "last-char", char, "last-char");
            lastCharFakeOptList.appendChild(lastCharLi);
        }
    });

    lowerChars.forEach((char) => {
        if (!fakeOptions.some((option) => option.value === char)) {
            const firstCharLi = createRadioElement("lower-char", "first-char", char, "first-char");
            firstCharFakeOptList.appendChild(firstCharLi);
            const lastCharLi = createRadioElement("lower-char", "last-char", char, "last-char");
            lastCharFakeOptList.appendChild(lastCharLi);
        }
    });

    numbersChars.forEach((char) => {
        if (!fakeOptions.some((option) => option.value === char)) {
            const firstCharLi = createRadioElement("number-char", "first-char", char, "first-char");
            firstCharFakeOptList.appendChild(firstCharLi);
            const lastCharLi = createRadioElement("number-char", "last-char", char, "last-char");
            lastCharFakeOptList.appendChild(lastCharLi);
        }
    });

    specialChars.forEach((char) => {
        if (!fakeOptions.some((option) => option.value === char)) {
            const firstCharLi = createRadioElement("special-char", "first-char", char, "first-char");
            firstCharFakeOptList.appendChild(firstCharLi);
            const lastCharLi = createRadioElement("special-char", "last-char", char, "last-char");
            lastCharFakeOptList.appendChild(lastCharLi);
        }
    });
};

function showToastIfAnyChecks() {
    if(!hasLower && !hasUpper && !hasNumbers && !hasSpecial) {
        showToast({
            type: "warning",
            title: "Warning!",
            description: "Select at least one type of characters."
        }); // Show toast once the password is copied. See 'toasts.js' file.
    }
};

function createRadioElement(typeClass, positionClass, radioValue, name) {
    const li = document.createElement("li");
    li.classList.add("opt-cont");
    li.classList.add(typeClass);
    li.classList.add(positionClass);
    const radio = document.createElement("input");
    radio.setAttribute("type", "radio");
    radio.setAttribute("name", name);
    radio.classList.add("fake-opt");
    radio.classList.add("h--10");
    radio.classList.add("w--100");
    radio.classList.add("bd-rd--2");
    radio.classList.add("bd--p-50-10_1_sd");
    radio.classList.add("tr--a_out_2");
    radio.classList.add("cur--pointer");
    radio.value = radioValue;
    radio.addEventListener("click", (e) => {
        if (radio.checked) {
            if (e.target.closest('.first-char')) {
                firstChar = radio.value;
                firstCharFakeLabel.innerText = firstChar;
            } else {
                lastChar = radio.value;
                lastCharFakeLabel.innerText = lastChar;
            }           
        };

        if (firstCharFakeSelect.contains(radio)) {
            setTimeout(closeSelect(firstCharFakeSelect), 200);
        }
        if (lastCharFakeSelect.contains(radio)) {
            setTimeout(closeSelect(lastCharFakeSelect), 200);
        }
    });
    
    li.appendChild(radio);
    return li;
};

function closeSelect(select) {
    select.removeAttribute("open");
};

function resetSettings() {
    // Select all the checkboxes and reset their relatives variables
    upperCheck.checked = true;
    lowerCheck.checked = true;
    numbersCheck.checked = true;
    specialCheck.checked = true;
    hasLower = true;
    hasUpper = true;
    hasNumbers = true;
    hasSpecial = true;
    
    // Reset 'firstCharSelect' and 'lastCharSelect' options
    firstCharFirstRadio.checked = true;
    firstCharFakeLabel.innerText = firstCharFirstRadio.value;
    lastCharFirstRadio.checked = true;
    lastCharFakeLabel.innerText = lastCharFirstRadio.value;

    closeSelect(firstCharFakeSelect);
    closeSelect(lastCharFakeSelect);

    // Reset #length-input and #length-label
    lengthInput.value = 8;
    maxLength = lengthInput.value;
    lengthLabel.textContent = `Length: ${maxLength}`;

    // Reset #pass-number-input and #pass-number-label
    passNumberInput.value = 1;
    numberOfPass = passNumberInput.value;
    passNumberLabel.textContent = `Passwords: ${numberOfPass}`;
}

/* EVENTS
================================================================= */
const settingsToggle = Array.from(document.querySelectorAll(".settings-toggle"));
settingsToggle.forEach((trigger) => {
    trigger.addEventListener("click", () => {
        settings.classList.toggle("active");
        modalBlur.classList.toggle("active");
    });
});

// Checkboxes
upperCheck.addEventListener("input", () => {
    hasUpper = upperCheck.checked ? true : false;
    check(upperChars);
    showToastIfAnyChecks();
    updateCharSelects();
});

lowerCheck.addEventListener("input", () => {
    hasLower = lowerCheck.checked ? true : false;
    check(lowerChars);
    showToastIfAnyChecks();
    updateCharSelects();
});

numbersCheck.addEventListener("input", () => {
    hasNumbers = numbersCheck.checked ? true : false;
    check(numbersChars);
    showToastIfAnyChecks();
    updateCharSelects();
});

specialCheck.addEventListener("input", () => {
    hasSpecial = specialCheck.checked ? true : false;
    check(specialChars);
    showToastIfAnyChecks();
    updateCharSelects();
});

// Ranges
passNumberInput.addEventListener("input", () => {
    numberOfPass = passNumberInput.value;
    passNumberLabel.textContent = `Passwords: ${numberOfPass}`;
});

lengthInput.addEventListener("input", () => {
    maxLength = lengthInput.value;
    lengthLabel.textContent = `Length: ${maxLength}`;
});

firstCharFirstRadio.addEventListener("click", () => {
    firstChar = "";
    firstCharFakeLabel.innerText = firstCharFirstRadio.value;
    setTimeout(closeSelect(firstCharFakeSelect), 400);
});

lastCharFirstRadio.addEventListener("click", () => {
    lastChar = "";
    lastCharFakeLabel.innerText = lastCharFirstRadio.value;
    setTimeout(closeSelect(lastCharFakeSelect), 400);
});

// Buttons
doneBtn.addEventListener("click", () => {
    closeSelect(firstCharFakeSelect);
    closeSelect(lastCharFakeSelect);
})

resetBtn.addEventListener("click", () => {
    setTimeout(resetSettings, 400);
});