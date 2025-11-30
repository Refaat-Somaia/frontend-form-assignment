import { useState } from 'react'
import AppInputField from '../components/AppInputField'
import AppButton from '../components/AppButton'
import img from '../assets/images/login.png'
import googleLogo from '../assets/images/google-logo.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faCheck, faLock, faXmark, faUser, faCheckCircle, faPen } from '@fortawesome/free-solid-svg-icons'
import AppAlertDialog from '../components/AppAlertDialog'

export default function Login(props) {

    const [email, setEmail] = useState("")
    const [isValidEmail, setIsValidEmail] = useState(false)

    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [isShowLogIn, setIsShowLogIn] = useState(true)
    const [animating, setAnimating] = useState(false);
    const [showRules, setShowRules] = useState(false);
    const [alertMessage, setAlertMesaage] = useState("")
    const [alertIcon, setAlertIcon] = useState(null)
    const [isShowAlert, setIsShowAlert] = useState(false)
    const [animationType, setAnimationType] = useState("");
    const [passwordRules, setPasswordRules] = useState({
        length: false,
        uppercase: false,
        number: false
    });

    function handlePasswordChange(e) {

        setPassword(e.target.value)
        setPasswordRules(validatePassword(e.target.value))
    }

    function handleEmailChange(e) {
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        const value = e.target.value;
        setEmail(value);
        setIsValidEmail(filter.test(value));
    }







    function swapForms() {
        if (animating) return;
        setEmail("")
        setPassword("")
        setPasswordConfirm("")

        setAnimationType("form-out");
        setAnimating(true);

        setTimeout(() => {
            setIsShowLogIn(!isShowLogIn);
            setAnimationType("form-in");

            setTimeout(() => setAnimating(false), 600);
        }, 600);
    }
    function validatePassword(password) {
        const rules = {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            number: /[0-9]/.test(password),
        };

        return rules;
    }

    function submitLogInForm(e) {
        e.preventDefault()
        if (email.length === 0 || password.length === 0) {
            showAlert("Please fill all fields", faPen)
            return

        }
        if (!isValidEmail) {
            showAlert("Please enter a valid email", faEnvelope)
            return

        }
        showAlert('Form submitted successfully', faCheckCircle)

    }

    function submitSignUpForm(e) {
        e.preventDefault()
        if (email.length === 0 || password.length === 0 || passwordConfirm.length === 0 || name.length === 0) {
            showAlert("Please fill all fields", faPen)
            return
        }
        if (!isValidEmail) {
            showAlert("Please enter a valid email", faEnvelope)
            return

        }
        if (!passwordRules.length || !passwordRules.number || !passwordRules.uppercase) {
            showAlert("Please enter a valid password", faLock)
            return
        }
        if (password !== passwordConfirm) {
            showAlert("Passwords don't match", faLock)
            return
        }

        showAlert('Form submitted successfully', faCheckCircle)

    }

    function showAlert(message, icon) {
        setAlertMesaage(message)
        setAlertIcon(icon)
        setIsShowAlert(true)
    }


    return (
        <div>
            <AppAlertDialog isVisible={isShowAlert} icon={alertIcon} message={alertMessage} onClose={() => setIsShowAlert(false)} />

            {isShowLogIn ?
                <div className="h-[42rem] overflow-hidden mt-4 w-screen bg-background  items-center flex justify-center">
                    <div className={`md:max-w-screen-xl w-[90%] form-in m-0 sm:mt-10 mt-10 md:mt-0 shadow sm:rounded-lg flex justify-center flex-1 ${animationType}`}>
                        <div className="lg:w-1/2  w-[90%] xl:w-5/12 p-6 sm:p-12">

                            <div className=" flex flex-col items-center">

                                <form className="w-full flex-1 mt-4" onSubmit={submitLogInForm}>




                                    <div className="mx-auto max-w-[22rem]">
                                        <h1 className="text-2xl xl:text-3xl font-bold text-fontColor">
                                            Welcome back                            </h1>
                                        <p className='opacity-[0.7] text-fontColor mb-[2rem]'>Log into your account.</p>

                                        <div className="relative group">

                                            <AppInputField icon={faEnvelope} placeholder="Email" onChange={handleEmailChange} />
                                            <div
                                                className={`
            absolute top-full left-0 mt-2 p-3 w-64 rounded-xl shadow-lg
            bg-offColor text-fontColor text-sm z-10
            opacity-0 
            transition-all duration-300
        ${(!isValidEmail && email.length > 1) ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
                                            >
                                                Please enter a valid email

                                            </div>
                                        </div>
                                        <AppInputField icon={faLock} placeholder='Password' eyeIcon={true} onChange={(e) => setPassword(e.target.value)} type='password' />

                                        <AppButton type='submit' width='w-[99%] ' isCentered={true} text="Log in" />

                                        <a href=''><p className='text-sm text-center text-fontColor underline mt-4'>forgot your password?</p></a>


                                        <button type='button' className={`w-[99%] mt-4 h-14 m-auto bg-offColor appButton rounded-lg flex flex-row justify-center items-center cursor-default`}>

                                            <img src={googleLogo} className='w-8 mr-2' alt="" />
                                            <p className={`text-fontColor font-medium`}>Continue with Google</p>
                                        </button>


                                        <div className="my-6 border-b text-center">
                                            <div
                                                className="leading-none  px-2 inline-block text-sm text-fontColor tracking-wide font-medium bg-background transform translate-y-[0.7rem]">
                                                Don't have an account?                                        </div>
                                        </div>

                                        <AppButton width='w-[99%]' isCentered={true}
                                            bgColor='bg-offColor'
                                            textColor='text-fontColor'
                                            onClick={() => swapForms()}
                                            text="Create account" />

                                    </div>


                                </form>
                            </div>
                        </div>
                        <div className="flex-1 bg-offColor text-center hidden justify-center items-center lg:flex">
                            <img src={img} className='w-[50%]' alt="" />

                        </div>
                    </div>
                </div>

                : <div className="h-[46rem] mb-4 overflow-hidden mt-4 w-screen bg-background  items-center flex justify-center">
                    <div className={`md:max-w-screen-xl w-[90%] form-in m-0 sm:mt-10 mt-10 md:mt-0 shadow sm:rounded-lg flex justify-center flex-1 ${animationType}`}>
                        <div className="lg:w-1/2 xl:w-5/12 p-6  w-[90%] sm:p-12">

                            <div className=" flex flex-col items-center">

                                <form className="w-full flex-1 mt-4" onSubmit={submitSignUpForm}>




                                    <div className="mx-auto max-w-[22rem]">
                                        <h1 className="text-2xl xl:text-3xl font-bold text-fontColor">
                                            Sign Up                            </h1>
                                        <p className='opacity-[0.7] text-fontColor mb-[2rem]'>Create a new account.</p>
                                        <AppInputField icon={faUser} placeholder="First and last name" onChange={(e) => setName(e.target.value)} />

                                        <div className="relative group">

                                            <AppInputField icon={faEnvelope} placeholder="Email" onChange={handleEmailChange} />
                                            <div
                                                className={`
            absolute top-full left-0 mt-2 p-3 w-64 rounded-xl shadow-lg
            bg-offColor text-fontColor text-sm z-10
            opacity-0 
            transition-all duration-300
        ${(!isValidEmail && email.length > 1) ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
                                            >
                                                Please enter a valid email

                                            </div>
                                        </div>


                                        <div className="relative group">
                                            <AppInputField
                                                icon={faLock}
                                                placeholder="Password"
                                                type='password'
                                                eyeIcon={true}
                                                onChange={handlePasswordChange}
                                                onFocus={() => setShowRules(true)}
                                                onBlur={() => setShowRules(false)}

                                            />


                                            <div
                                                className={`
            absolute top-full left-0 mt-2 p-3 w-64 rounded-xl shadow-lg
            bg-offColor text-fontColor text-sm z-10
            opacity-0 pointer-events-none
            group-hover:opacity-100 group-hover:translate-y-0
            transition-all duration-300
            ${showRules ? "opacity-100 translate-y-0" : ""}
        `}
                                            >
                                                <ul className="space-y-2 text-sm">
                                                    <li className={`flex items-center gap-2 transition-[0.2s] ${passwordRules.length ? "text-green-600" : "text-fontColor"}`}>
                                                        {passwordRules.length ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faXmark} className='text-red-500' />} At least 8 characters
                                                    </li>

                                                    <li className={`flex items-center gap-2 transition-[0.2s] ${passwordRules.uppercase ? "text-green-600" : "text-fontColor"}`}>
                                                        {passwordRules.uppercase ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faXmark} className='text-red-500' />}   Contains uppercase letter
                                                    </li>

                                                    <li className={`flex items-center gap-2 transition-[0.2s] ${passwordRules.number ? "text-green-600" : "text-fontColor"}`}>
                                                        {passwordRules.number ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faXmark} className='text-red-500' />} Contains a number
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                        <AppInputField icon={faLock} type='password' onChange={(e) => setPasswordConfirm(e.target.value)} placeholder='Confirm password' />


                                        <AppButton type='submit' width='w-[99%] ' isCentered={true} text="Sign up" />



                                        <button type='button' className={`w-[99%] mt-4 h-14 m-auto bg-offColor appButton rounded-lg flex flex-row justify-center items-center cursor-default`}>

                                            <img src={googleLogo} className='w-8 mr-2' alt="" />
                                            <p className={`text-fontColor font-medium`}>Continue with Google</p>
                                        </button>


                                        <div className="my-6 border-b text-center">
                                            <div
                                                className="leading-none  px-2 inline-block text-sm text-fontColor tracking-wide font-medium bg-background transform translate-y-[0.7rem]">
                                                Already have an account?                                        </div>
                                        </div>

                                        <AppButton width='w-[99%]' isCentered={true}
                                            bgColor='bg-offColor'
                                            textColor='text-fontColor'
                                            onClick={() => swapForms()}
                                            text="Log in" />

                                    </div>


                                </form>
                            </div>
                        </div>
                        <div className="flex-1 bg-offColor text-center hidden justify-center items-center lg:flex">
                            <img src={img} className='w-[50%]' alt="" />

                        </div>
                    </div>
                </div>}
        </div>
    )
}