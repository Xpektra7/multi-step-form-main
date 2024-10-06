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






function step2() {
    index = 2;
    showSlide();
}

function showSlide() {
    steps.forEach(step => {
        if (step.id === `step-${index}`) {
            step.classList.remove("hidden");
        } else {
            step.classList.add("hidden");
        };
    });

    indicators.forEach(indicator => {
        if (indicator.textContent == index) {
            indicator.classList.add("active");
        } else {
            indicator.classList.remove("active");
        }
    });

    prevStep.style.visibility = (index < 2) ? "hidden" : "visible";
    nav.style.display = (index > 4) ? "none" : "flex";
    nextStep.innerHTML = (index < 4) ? "Next Step" : "Submit";

    if (plan === "monthly") {
        yearly.forEach(year => {
            year.style.display = "none";
        })
        arcadePrice.innerHTML = "$9/mo";
        advancedPrice.innerHTML = "$12/mo";
        proPrice.innerHTML = "$15/mo";
        servicePrice.innerHTML = "+$1/mo";
        storagePrice.innerHTML = "+$2/mo";
        profilePrice.innerHTML = "+$2/mo";
    }
    else{
        yearly.forEach(year => {
            year.style.display = "inline";
        })
        arcadePrice.innerHTML = "$90/yr";
        advancedPrice.innerHTML = "$120/yr";
        proPrice.innerHTML = "$150/yr";
        servicePrice.innerHTML = "+$10/yr";
        storagePrice.innerHTML = "+$20/yr";
        profilePrice.innerHTML = "+$20/yr";

    }


    switch (planChoice) {
        case "arcade":
            summaryPrice.innerHTML = arcadePrice.innerHTML;
            break;
        case "advanced":
            summaryPrice.innerHTML = advancedPrice.innerHTML;
            break;
        case "pro":
            summaryPrice.innerHTML = proPrice.innerHTML;
            break;
    
    }
    summaryChoice.innerHTML = `${planChoice} (${plan})`;
    summaryService.innerHTML = servicePrice.innerHTML;
    summaryStorage.innerHTML = storagePrice.innerHTML;
    summaryProfile.innerHTML = profilePrice.innerHTML;

    if (onlineService.checked) {
        summaryService.parentElement.classList.remove("hidden");
        serviceAmount = parseFloat(summaryService.innerHTML.replace(/[^0-9.]/g, ''));
    } else {
        summaryService.parentElement.classList.add("hidden");
        serviceAmount = 0;
    } 

    if (largerStorage.checked) {
        summaryStorage.parentElement.classList.remove("hidden");
        storageAmount = parseFloat(summaryStorage.innerHTML.replace(/[^0-9.]/g, ''));
    } else {
        summaryStorage.parentElement.classList.add("hidden");
        storageAmount = 0;
    }

    if (customizableProfile.checked) {
        summaryProfile.parentElement.classList.remove("hidden");
        profileAmount = parseFloat(summaryProfile.innerHTML.replace(/[^0-9.]/g, ''));
    } else {
        summaryProfile.parentElement.classList.add("hidden");
        profileAmount = 0;
    }

    planTotal = parseFloat(summaryPrice.innerHTML.replace(/[^0-9.]/g, ''));


    total.previousElementSibling.innerHTML = `Total (${plan})`;
    
    if (plan == "monthly") {
        total.innerHTML = `+$${planTotal + serviceAmount + storageAmount + profileAmount}/mo`;
    } else {
        total.innerHTML = `+$${planTotal + serviceAmount + storageAmount + profileAmount}/yr`;
    }
};

function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function isValidPhoneNumber(phone) {
    if (phone.length > 10) {
        return true
    } else {
        return false
    }
    
  }

function validate() {
    if (username.value === "") {
        username.classList.remove("border-lightGray");
        username.classList.add("border-strawberryRed");
        nameMsg.innerHTML = "This field is required";
    }else {
        username.classList.add("border-lightGray");
        username.classList.remove("border-strawberryRed");
        nameMsg.innerHTML = "";
    };

    if (email.value == "") {
        email.classList.remove("border-lightGray");
        email.classList.add("border-strawberryRed");
        emailMsg.innerHTML = "This field is required";
    }
    else if(isValidEmail(email.value) == false){
        email.classList.remove("border-lightGray");
        email.classList.add("border-strawberryRed");
        emailMsg.innerHTML = "Invalid email";
    }
    else {
        email.classList.add("border-lightGray");
        email.classList.remove("border-strawberryRed");
        nameMsg.innerHTML = "";
    };

    if (phone.value == "") {
        phone.classList.remove("border-lightGray");
        phone.classList.add("border-strawberryRed");
        phoneMsg.innerHTML = "This field is required";
    }
    else if(isValidPhoneNumber(phone.value) == false){
        phone.classList.remove("border-lightGray");
        phone.classList.add("border-strawberryRed");
        phoneMsg.innerHTML = "Invalid number";
    }
    else {
        phone.classList.add("border-lightGray");
        phone.classList.remove("border-strawberryRed");
        phoneMsg.innerHTML = "";
    };


    if (nameMsg.innerHTML === "" && phoneMsg.innerHTML === "" && emailMsg.innerHTML === "") {
        return true;
    } else {
        return false;
    };
    
}

toggleBtn.addEventListener("click", () => { 

    if (!togglePlan.checked) {
        toggleBtn.previousElementSibling.classList = "text-sm text-coolGray";
        toggleBtn.nextElementSibling.classList = "text-sm text-marineBlue font-bold";
        plan = "yearly";
    } else {
        toggleBtn.nextElementSibling.classList = "text-sm text-coolGray";
        toggleBtn.previousElementSibling.classList = "text-sm text-marineBlue font-bold";
        plan = "monthly";
    }

    toggleBtn.classList.toggle("justify-end");

    showSlide();
})


prevStep.addEventListener("click", () => {
    index -= 1;
    showSlide();
})
nextStep.addEventListener("click", () => {
    validate();
    if (validate()) {
        index += 1;
    }
    showSlide();
})


plans.forEach(plan => {
    plan.addEventListener("click", () => {
        plans.forEach(plan => {
            if (plan.checked) {
                plan.previousElementSibling.classList.add("border-purplishBlue");
                plan.previousElementSibling.classList.remove("border-lightGray");
                planChoice = plan.id;                
            } else{
                plan.previousElementSibling.classList.remove("border-purplishBlue");
                plan.previousElementSibling.classList.add("border-lightGray");
            }
        })        
    })
});

addons.forEach(addon => {
    addon.addEventListener("click", () => {
        addons.forEach(addon => {
            if (addon.checked) {
                addon.parentElement.classList.add("border-purplishBlue");
                addon.parentElement.classList.remove("border-lightGray");
            } else{
                addon.parentElement.classList.remove("border-purplishBlue");
                addon.parentElement.classList.add("border-lightGray");
            }
    })  })
});



showSlide();