import { auth } from "./firebase-config.js";
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

let isLoginState = true;

// DOM Triggers Setup
const authForm = document.getElementById('auth-form');
const emailInput = document.getElementById('auth-email');
const passwordInput = document.getElementById('auth-password');
const submitBtn = document.getElementById('btn-submit');
const formSubHeading = document.getElementById('form-sub-heading');
const tabLogin = document.getElementById('tab-login');
const tabRegister = document.getElementById('tab-register');
const btnForgot = document.getElementById('btn-forgot');

const navAuth = document.getElementById('nav-auth');
const navUtility = document.getElementById('nav-utility');

const btnResearch = document.getElementById('btn-directive-research');
const btnInnovation = document.getElementById('btn-directive-innovation');
const btnRecursion = document.getElementById('btn-directive-recursion');

const successModal = document.getElementById('success-modal');
const successTxt = document.getElementById('success-message');
const btnSkeuoClose = document.getElementById('btn-skeuo-close');

const errorAlert = document.getElementById('error-alert');
const errorTxt = document.getElementById('error-message');
const btnErrorClose = document.getElementById('btn-error-close');

function launchSuccess(msg, customTitle = "LOGIN SUCCESSFUL") {
    const headingElement = document.querySelector('.modal-status-heading');
    if (headingElement) headingElement.innerText = customTitle;
    if (successTxt) successTxt.innerText = msg;
    if (successModal) {
        successModal.classList.remove('pointer-events-none', 'scale-95');
        successModal.classList.add('opacity-100', 'scale-100');
    }
}

function launchError(err) {
    if (errorTxt) errorTxt.innerText = err;
    if (errorAlert) {
        errorAlert.classList.remove('pointer-events-none');
        errorAlert.classList.add('opacity-100');
        setTimeout(() => { dismissError(); }, 6000);
    }
}

function dismissError() {
    if (errorAlert) {
        errorAlert.classList.add('pointer-events-none');
        errorAlert.classList.remove('opacity-100');
    }
}

function setupBindings() {
    // Left Banner Checkmarks Data Core Actions
    if (btnResearch) {
        btnResearch.onclick = (e) => {
            e.preventDefault();
            launchSuccess("ANASTASIS BUSINESS SOLUTIONS PVT LTD is a 7.10 years old legal corporation incorporated on Sept 07, 2018. Registered under Class: Company limited by Shares.", "RESEARCH DIRECTIVE");
        };
    }

    if (btnInnovation) {
        btnInnovation.onclick = (e) => {
            e.preventDefault();
            launchSuccess("Authorized Share Capital cluster node setup stands at ₹1,00,000 INR with Paid-up capital allocations. Financial health is structural.", "INNOVATION DIRECTIVE");
        };
    }

    if (btnRecursion) {
        btnRecursion.onclick = (e) => {
            e.preventDefault();
            launchSuccess("Current status registered within ROC Delhi registry parameters is formally ACTIVE. Secure nodes completely synced.", "SECURITY PARAMETER");
        };
    }

    if (navAuth) {
        navAuth.onclick = (e) => {
            e.preventDefault();
            if (tabLogin) tabLogin.click();
        };
    }

    if (navUtility) {
        navUtility.onclick = (e) => {
            e.preventDefault();
            if (tabRegister) tabRegister.click();
        };
    }

    // Toggle Tab Operations
    if (tabLogin && tabRegister) {
        tabLogin.onclick = (e) => {
            e.preventDefault();
            isLoginState = true;
            tabLogin.className = "text-base font-bold tracking-wider transition-all duration-300 uppercase font-['Space_Grotesk'] pb-2 tab-btn-active";
            tabRegister.className = "text-base font-bold tracking-wider transition-all duration-300 uppercase font-['Space_Grotesk'] pb-2 tab-btn-inactive";
            if (submitBtn) submitBtn.innerText = "Login";
            if (formSubHeading) formSubHeading.innerText = "Sign in to continue";
        };

        tabRegister.onclick = (e) => {
            e.preventDefault();
            isLoginState = false;
            tabRegister.className = "text-base font-bold tracking-wider transition-all duration-300 uppercase font-['Space_Grotesk'] pb-2 tab-btn-active";
            tabLogin.className = "text-base font-bold tracking-wider transition-all duration-300 uppercase font-['Space_Grotesk'] pb-2 tab-btn-inactive";
            if (submitBtn) submitBtn.innerText = "Sign Up";
            if (formSubHeading) formSubHeading.innerText = "Create your new gateway identity";
        };
    }

    if (btnForgot) {
        btnForgot.onclick = async (e) => {
            e.preventDefault();
            const email = emailInput.value.trim();
            if (!email) {
                launchError("Identity fields empty. Input target account email first to dispatch key.");
                return;
            }
            try {
                await sendPasswordResetEmail(auth, email);
                launchSuccess(`A password vector link has been transmitted to cloud node: ${email}`, "RESET DISPATCHED");
            } catch (error) {
                launchError(error.message);
            }
        };
    }

    if (btnSkeuoClose) {
        btnSkeuoClose.onclick = (e) => {
            e.preventDefault();
            if (successModal) {
                successModal.classList.remove('opacity-100', 'scale-100');
                successModal.classList.add('pointer-events-none', 'scale-95');
            }
        };
    }

    if (btnErrorClose) {
        btnErrorClose.onclick = (e) => {
            e.preventDefault();
            dismissError();
        };
    }

    if (authForm) {
        authForm.onsubmit = async (e) => {
            e.preventDefault();
            const email = emailInput.value.trim();
            const password = passwordInput.value;

            if (password.length < 6) {
                launchError("Security mismatch. Key vector structure requires 6 characters minimum.");
                return;
            }

            try {
                if (isLoginState) {
                    const userCredential = await signInWithEmailAndPassword(auth, email, password);
                    launchSuccess(`Session synchronization completed for cloud identity: ${userCredential.user.email}`, "LOGIN SUCCESSFUL");
                } else {
                    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                    launchSuccess(`New Identity successfully registered. Redirecting to login session...`, "REGISTRATION SUCCESSFUL");
                }
                authForm.reset();
            } catch (error) {
                if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
                    launchError("Cryptographic payload mismatch. Access denied.");
                } else if (error.code === 'auth/email-already-in-use') {
                    launchError("Duplicate structural error: identity signature exists.");
                } else {
                    launchError(error.message);
                }
            }
        };
    }
}

setupBindings();
