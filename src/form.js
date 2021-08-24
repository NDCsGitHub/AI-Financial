
// export const account = [
// ]



function formFunctionality(){

    const signupFormContainer = document.querySelector('.signupFormContainer');
    const loginFormContainer = document.querySelector('.loginFormContainer');

    function loginFormSignup(){
        const loginFormSignupButton = document.querySelector('.loginFormSignup');

        loginFormSignupButton.addEventListener('click', () => {
            loginFormContainer.style.transform = "scale(0)"
            signupFormContainer.style.transform = "scale(1)"
        });
    }

    function signupFormClose(){
        const signupFormCloseButton = document.querySelector('.signupCloseForm');
        signupFormCloseButton.addEventListener('click', () =>{
            signupFormContainer.style.transform = "scale(0)"
            loginFormContainer.style.transform = "scale(1)"
        })
    }



    //get user info
    function userInfo(){
        const afterLoggedInPage = document.querySelector('.afterLogin');


        //listen auth status
        auth.onAuthStateChanged(user => {
            if (user){
                console.log("User Logged in");
    
                afterLoggedInPage.style.transform = "scale(1)"
                loginFormContainer.style.transform = "scale(0)"

            } else{
                console.log("User Logged Out");
                afterLoggedInPage.style.transform = "scale(0)"
                loginFormContainer.style.transform = "scale(1)"
            }
            
        })



        //sign up
        const signupForm = document.querySelector('.signupFormContainer');
        const genderInput1 = document.querySelector("#option-1")
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = signupForm['signupName'].value;
            const email = signupForm['signupEmail'].value;
            const password = signupForm['signupPassword'].value;
            const phonenumber = signupForm['signupPhoneNumber'].value;
            const gender = genderValue();
                function genderValue(){
                    if(genderInput1.checked) {
                        return "Male";
                    }else {
                        return "Female";
                    }
                }

            auth.createUserWithEmailAndPassword(email, password).then(cred => {
                const signupWindow = document.querySelector('.signupFormContainer');
                signupFormContainer.style.transform = "scale(0)"
                loginFormContainer.style.transform = "scale(1)"
                signupForm.reset();
            })
        })

        //logout        
        const logout = document.querySelector('.logoutButton')
        logout.addEventListener('click', (e) =>{
            e.preventDefault();
            auth.signOut();
        })


        //login
        const loginForm = document.querySelector('.loginFormContainer');
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = loginForm['loginEmail'].value;
            const password = loginForm['loginPassword'].value;

            auth.signInWithEmailAndPassword(email, password).then(cred =>{
                loginFormContainer.style.transform = "scale(0)";
                loginForm.reset();
            })


        })


    }   





    return {
        loginFormSignup:loginFormSignup(),
        signupFormClose: signupFormClose(),
        userInfo:userInfo(),
    }
}










export default formFunctionality