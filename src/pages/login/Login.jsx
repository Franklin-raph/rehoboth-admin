import React, { useEffect, useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiLoader } from "react-icons/fi";
import { FaChevronDown } from "react-icons/fa6";
import { BsLightningCharge } from "react-icons/bs";
import AuthNav from '../../components/auth-nav/AuthNav';
import Alert from '../../components/alert/Alert';
import { GoEye, GoEyeClosed } from 'react-icons/go';
import Cookies from 'js-cookie';
import BtnLoader from '../../components/btn-loader/BtnLoader';
import ReCAPTCHA from "react-google-recaptcha";

const Login = () => {

    const [msg, setMsg] = useState('')
    const [alertType, setAlertType] = useState('')

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordType, setPasswordType] = useState('password')
    const API_KEY = import.meta.env.VITE_API_KEY
    const BASE_URL = import.meta.env.VITE_BASE_URL
    const SITE_KEY = import.meta.env.VITE_SITE_KEY
    const [loading, setLoading] = useState(false)
    const [captchaValue, setCaptchaValue] = useState('')
    const recaptchaRef = useRef(null)
    

    const navigate = useNavigate()

    useEffect(() => {
        const token = Cookies.get('token')
        if(token) navigate('/dashboard')
        console.log(BASE_URL);
        
    }, [])

        async function handleSignIn(e){
            console.log(API_KEY, BASE_URL);
            console.log(`https://rehobothapp.com/api/auth/login`);
            // Cookies.set('token', true)
            e.preventDefault()
            if(!email || !password){
                setMsg('Please fill in all fields')
                setAlertType('error')
                return
            }else{
                setLoading(true)
                const res = await fetch(`${BASE_URL}/auth/login`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Api-Key': `${API_KEY}`,
                },
                body: JSON.stringify({
                    email,
                    password,
                    captcha:captchaValue
                })
                })
                if(res) setLoading(false)
                const data = await res.json()
                console.log(data);
            if(!res.ok){
                setMsg(data?.message)
                setAlertType('error')
                return
            }
            if(res.ok && data?.data?.stellarPublicKey){
                Cookies.set('token', data.data.token)
                const { password, token, ...safeData } = data;
                localStorage.setItem('userData', JSON.stringify(safeData));
                console.log("Stellar Public key");
                navigate('/dashboard')
                return
            }
            // if(res.ok){
            //     // localStorage.setItem('token', data.data.token)
            //     Cookies.set('token', data.token)
            //     const { password, token, ...safeData } = data;
            //     localStorage.setItem('userData', JSON.stringify(safeData));

            //     if(!data?.stellarPublicKey){
            //         console.log(data, "No stellar public key");
            //         navigate('/about-self')
            //         return
            //     }
            //     if(data?.stellarPublicKey){
            //         console.log("Stellar Public key");
            //         navigate('/get-started')
            //     }
            // }
        }
    }

    const handleCaptchaChange = (value) => {
        setCaptchaValue(value);
    }

  return (
    <div className="relative">
        <AuthNav />
        <div className="sm:mt-[10rem] mt-[7rem]">
            <div className="hidden sm:block z-[10] w-[70%] mx-auto h-[80%] absolute left-[50%] top-[-5%] blury-bg"  style={{ transform: "translate(-50%, 0%)" }}></div>
            <div className="flex flex-col justify-center items-center relative z-[11]">
                <div className="bg-white px-4 sm:px-8 pt-8 pb-5 rounded-[16px] sm:shadow-lg w-full sm:w-[588px]">
                    <div className="hidden top-bg relative top-[-20px] sm:flex items-center justify-center w-[300px] mx-auto">
                        <img src="./images/logo.svg" alt="Rehoboth Finance Logo" className="mx-auto mb-4 relative top-[-65px] left-[11px]" />
                    </div>
                    <div className="text-center mb-12 mt-[-80px] relative z-[100]">
                        <h2 className="sm:text-2xl text-[18px] font-semibold mb-2">Login</h2>
                        <p className="text-[#667085] text-[12px] sm:text-[14px]">Login to access your dashboard</p>
                    </div>
                    <form onSubmit={handleSignIn} className="flex flex-col sm:w-[400px] mx-auto">
                        <div>
                            <label className="text-[#121212] gont-[500] text-[14px] mb-1 block">Email</label>
                            <input
                                type="text"
                                onChange={e => setEmail(e.target.value)}
                                placeholder="adeyemi@rehobothfinance"
                                className="border border-gray-300 text-[#707070] p-2 rounded-[6px] outline-none w-full"
                            />
                        </div>
                        <div className='mt-5'>
                            <label className="text-[#121212] gont-[500] text-[14px] mb-1 block">Password</label>
                            <div className='flex items-center justify-between border border-gray-300 p-2 rounded-[6px] w-full'>
                                <input
                                    type={passwordType}
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder="********"
                                    className="outline-none w-full"
                                />
                                <div>
                                    {
                                        passwordType === 'password' ?
                                        <GoEye className='cursor-pointer text-gray-300 text-[22px]' onClick={() => setPasswordType('text')}/>
                                        :
                                        <GoEyeClosed className='cursor-pointer text-gray-300' onClick={() => setPasswordType('password')}/>
                                    }
                                </div>
                            </div>
                        </div>
                        <p className='text-[#808080] cursor-pointer text-end mt-2 text-[14px]' onClick={() => navigate('/forgot-password')}>Forgot Password?</p>
                        {
                            loading?
                            <BtnLoader />
                            :
                            <button onClick={handleSignIn} className="bg-primary-color text-white py-2 px-4 rounded-[8px] mt-5">
                                Login
                            </button>
                        }
                        <div className="text-center text-[#808080] mt-5 sm:mt-[70px] text-[14px]">
                            Don't have an account? <Link to="/create-account" className="text-blue-600">Register</Link>
                        </div>
                    </form>
                </div>
                <div className='flex items-center justify-center mt-3'>
                    <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey={SITE_KEY}
                        onChange={handleCaptchaChange}
                    />
                </div>
            </div>
        </div>
        <div className="mt-[100px] mb-5 sm:mx-10 flex sm:flex-row flex-col sm:gap-0 gap-3 items-center justify-between">
            <p className="text-[#808080] text-[12px]">
                &copy; {new Date().getFullYear()} Rehoboth finance. All rights reserved.
            </p>
            <div className="text-[#808080] text-[12px] flex items-center gap-4">
                <Link href="#">Privacy Policy</Link>
                <Link href="#" className="mr-4">Terms of Use</Link>
            </div>
        </div>
        {
            msg && <Alert msg={msg} setMsg={setMsg} alertType={alertType}/>
        }
    </div>
  )
}

export default Login