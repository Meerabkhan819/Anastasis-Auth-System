import { auth } from "./firebase-config.js";
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";


let isLoginState = true;

const authForm = document.getElementById('auth-form');
const emailInput = document.getElementById('auth-email');
const passwordInput = document.getElementById('auth-password');
const submitBtn = document.getElementById('btn-submit');
const tabLogin = document.getElementById('tab-login');
const tabRegister = document.getElementById('tab-register');
const forgotContainer = document.getElementById('forgot-password-container');
const btnForgot = document.getElementById('btn-forgot');

const successModal = document.getElementById('success-modal');
const successTxt = document.getElementById('success-message');
const btnSkeuoClose = document.getElementById('btn-skeuo-close');

const errorAlert = document.getElementById('error-alert');
const errorTxt = document.getElementById('error-message');
const btnErrorClose = document.getElementById('btn-error-close');

tabLogin.addEventListener('click', () => {
    isLoginState = true;
    tabLogin.classList.add('active');
    tabRegister.classList.remove('active');
    submitBtn.innerText = "AUTHORIZE NODE";
    forgotContainer.style.display = "block";
});

tabRegister.addEventListener('click', () => {
    isLoginState = false;
    tabRegister.classList.add('active');
    tabLogin.classList.remove('active');
    submitBtn.innerText = "REGISTER IDENTITY COMPONENT";
    forgotContainer.style.display = "none";
});

function launchSuccess(msg, customTitle = "ACCESS GRANTED") {
    const headingElement = document.querySelector('.modal-status-heading');
    if (headingElement) {
        headingElement.innerText = customTitle;
    }
    successTxt.innerText = msg;
    successModal.classList.remove('shadow-hidden');
}

function launchError(err) {
    errorTxt.innerText = err;
    errorAlert.classList.remove('shadow-hidden');
  
    setTimeout(() => { errorAlert.classList.add('shadow-hidden'); }, 6000);
}

btnSkeuoClose.addEventListener('click', () => {
    successModal.classList.add('shadow-hidden');
});

btnErrorClose.addEventListener('click', () => {
    errorAlert.classList.add('shadow-hidden');
});

btnForgot.addEventListener('click', async (e) => {
    e.preventDefault(); 
    const email = emailInput.value.trim();
    
    if (!email) {
        launchError("Please insert the target node identity email first to receive recovery vectors.");
        return;
    }
    
    try {
        await sendPasswordResetEmail(auth, email);
        launchSuccess(
            `A cryptographically secure recovery linkage has been tunneled to: ${email}`,
            "RECOVERY LINK SENT"
        );
    } catch (error) {
        if (error.code === 'auth/user-not-found') {
            launchError("This email address is not registered in our cloud cluster node.");
        } else if (error.code === 'auth/invalid-email') {
            launchError("The email format entered is invalid.");
        } else {
            launchError(error.message);
        }
    }
});

authForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (password.length < 6) {
        launchError("Cryptographic key structure invalid. Key must contain at least 6 characters.");
        return;
    }

    try {
        if (isLoginState) {
           
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            launchSuccess(
                `Session completely verified for node: ${userCredential.user.email}`, 
                "LOGIN SUCCESSFUL"
            );
        } else {
            // Firebase Register/Signup Engine execution
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            launchSuccess(
                `New Identity successfully stored in the system cluster: ${userCredential.user.email}`, 
                "REGISTRATION SUCCESSFUL"
            );
        }
        authForm.reset();
    } catch (error) {
        if (error.code === 'auth/wrong-password') {
            launchError("Incorrect cryptographic key (password) for this cloud node identity.");
        } else if (error.code === 'auth/user-not-found') {
            launchError("No registered identity component found with this email node.");
        } else if (error.code === 'auth/email-already-in-use') {
            launchError("This email node identity is already registered in the system.");
        } else {
            launchError(error.message);
        }
    }
});