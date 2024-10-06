const plans = document.getElementsByName("plan");
const addons = document.getElementsByName("add-ons");
const steps = document.querySelectorAll(".step");
const indicators = document.querySelectorAll("header>ul>li");
const prevStep = document.getElementById("back");
const nextStep = document.getElementById("next");
const nav = document.querySelector("nav");
const username = document.querySelector("#name");
const email = document.querySelector("#email");
const phone = document.querySelector("#phone");
const togglePlan = document.getElementById("togglePlan");
const nameMsg = document.getElementById("name-msg");
const emailMsg = document.getElementById("email-msg");
const phoneMsg = document.getElementById("phone-msg");
const toggleBtn = document.getElementById("toggleBtn");
const yearly = document.querySelectorAll(".yearly");
const arcadePrice = document.getElementById("arcadePrice");
const advancedPrice = document.getElementById("advancedPrice");
const proPrice = document.getElementById("proPrice");
const onlineService = document.getElementById("onlineService");
const largerStorage = document.getElementById("largerStorage");
const customizableProfile = document.getElementById("customizableProfile");
const servicePrice = document.getElementById("servicePrice");
const storagePrice = document.getElementById("storagePrice");
const profilePrice = document.getElementById("profilePrice");
const summaryChoice = document.getElementById("summaryChoice");
const summaryPrice = document.getElementById("summaryPrice");
const summaryService = document.getElementById("summaryService");
const summaryStorage = document.getElementById("summaryStorage");
const summaryProfile = document.getElementById("summaryProfile");
const total = document.getElementById("total");

let index = 1;
let plan = "monthly";
let planChoice = "monthly";
let planTotal;
let serviceAmount;
let storageAmount;
let profileAmount;

// Prices object for cleaner price updates
const prices = {
    monthly: {
        arcade: "$9/mo", advanced: "$12/mo", pro: "$15/mo",
        service: "+$1/mo", storage: "+$2/mo", profile: "+$2/mo"
    },
    yearly: {
        arcade: "$90/yr", advanced: "$120/yr", pro: "$150/yr",
        service: "+$10/yr", storage: "+$20/yr", profile: "+$20/yr"
    }
};

// Helper function for updating validation feedback
function updateFieldValidation(field, message, isValid) {
    if (isValid) {
        field.classList.add("border-lightGray");
        field.classList.remove("border-strawberryRed");
        message.innerHTML = "";
    } else {
        field.classList.remove("border-lightGray");
        field.classList.add("border-strawberryRed");
        message.innerHTML = "This field is required";
    }
}

// Helper function for price updates
function updatePlanPrices() {
    const currentPrices = prices[plan];
    arcadePrice.innerHTML = currentPrices.arcade;
    advancedPrice.innerHTML = currentPrices.advanced;
    proPrice.innerHTML = currentPrices.pro;
    servicePrice.innerHTML = currentPrices.service;
    storagePrice.innerHTML = currentPrices.storage;
    profilePrice.innerHTML = currentPrices.profile;
}

function showSlide() {
    steps.forEach(step => {
        step.classList.toggle("hidden", step.id !== `step-${index}`);
    });

    indicators.forEach(indicator => {
        indicator.classList.toggle("active", indicator.textContent == index);
    });

    prevStep.style.visibility = (index < 2) ? "hidden" : "visible";
    nav.style.display = (index > 4) ? "none" : "flex";
    nextStep.innerHTML = (index < 4) ? "Next Step" : "Submit";

    yearly.forEach(year => year.style.display = plan === "monthly" ? "none" : "inline");

    updatePlanPrices();

    summaryChoice.innerHTML = `${planChoice} (${plan})`;
    summaryService.innerHTML = servicePrice.innerHTML;
    summaryStorage.innerHTML = storagePrice.innerHTML;
    summaryProfile.innerHTML = profilePrice.innerHTML;

    serviceAmount = onlineService.checked ? parseFloat(summaryService.innerHTML.replace(/[^0-9.]/g, '')) : 0;
    storageAmount = largerStorage.checked ? parseFloat(summaryStorage.innerHTML.replace(/[^0-9.]/g, '')) : 0;
    profileAmount = customizableProfile.checked ? parseFloat(summaryProfile.innerHTML.replace(/[^0-9.]/g, '')) : 0;

    planTotal = parseFloat(summaryPrice.innerHTML.replace(/[^0-9.]/g, ''));

    total.previousElementSibling.innerHTML = `Total (${plan})`;
    total.innerHTML = `+$${(planTotal + serviceAmount + storageAmount + profileAmount)}/${plan === "monthly" ? 'mo' : 'yr'}`;
}

// Email and Phone Validation Functions
function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function isValidPhoneNumber(phone) {
    const phonePattern = /^[0-9]{10,15}$/; // More flexible pattern for phone numbers
    return phonePattern.test(phone);
}

function validate() {
    let valid = true;

    // Username validation
    updateFieldValidation(username, nameMsg, username.value !== "");
    if (username.value === "") valid = false;

    // Email validation
    const emailValid = isValidEmail(email.value);
    updateFieldValidation(email, emailMsg, emailValid);
    if (!emailValid) emailMsg.innerHTML = "Invalid email";
    if (email.value === "" || !emailValid) valid = false;

    // Phone validation
    const phoneValid = isValidPhoneNumber(phone.value);
    updateFieldValidation(phone, phoneMsg, phoneValid);
    if (!phoneValid) phoneMsg.innerHTML = "Invalid number";
    if (phone.value === "" || !phoneValid) valid = false;

    return valid;
}

// Plan toggle functionality
toggleBtn.addEventListener("click", () => { 
    plan = togglePlan.checked ? "monthly" : "yearly";
    toggleBtn.classList.toggle("justify-end");
    showSlide();
});

// Step navigation
prevStep.addEventListener("click", () => {
    index = Math.max(1, index - 1);
    showSlide();
});

nextStep.addEventListener("click", () => {
    if (validate()) index += 1;
    showSlide();
});

// Plan selection
plans.forEach(planEl => {
    planEl.addEventListener("click", () => {
        plans.forEach(plan => {
            plan.previousElementSibling.classList.toggle("border-purplishBlue", plan.checked);
            plan.previousElementSibling.classList.toggle("border-lightGray", !plan.checked);
            if (plan.checked) planChoice = plan.id;
        });
        showSlide();
    });
});

// Add-ons selection
addons.forEach(addon => {
    addon.addEventListener("click", () => {
        addons.forEach(addon => {
            addon.parentElement.classList.toggle("border-purplishBlue", addon.checked);
            addon.parentElement.classList.toggle("border-lightGray", !addon.checked);
        });
        showSlide();
    });
});

showSlide();
