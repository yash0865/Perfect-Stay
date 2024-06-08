import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { setLogin } from '../redux/state'
import { useDispatch } from 'react-redux'

const Loginpage = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const dataChange = (event) => {
        setFormData((prev) => {
            return { ...prev, [event.target.name]: event.target.value }
        })
    }

    const submit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const loggedIn = await response.json();

            if (loggedIn) {
                dispatch(
                    setLogin({
                        user: loggedIn.user,
                        token: loggedIn.token
                    })
                )
                alert("Login Successful!")
                navigate("/")
            }
        } catch (err) {
            alert(err.message)
            console.log("Login failed", err.message);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center w-full dark:bg-gray-950">
            <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-md">
                <h1 className="text-2xl font-bold text-center mb-4 dark:text-gray-200">Welcome Back!</h1>
                <form action="#" onSubmit={submit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                        <input value={formData.email} onChange={dataChange} type="email" id="email" name='email' className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="your@email.com" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
                        <input value={formData.password} onChange={dataChange} type="password" name='password' id="password" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter your password" required />
                    </div>
                    <div className="text-center mb-4">
                        <Link to={"/register"} className='text-xs text-indigo-500 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>Create new acccont</Link>
                    </div>
                    <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Login</button>
                </form>
            </div>
        </div>
    )
}

export default Loginpage


//     < form action = "" onSubmit = { submit } className = 'register-form flex flex-col items-center px-6 py-4 w-[90%] sm:w-[50%] md:w-[35%]' >
// <div className='text-2xl mb-6 '>Login</div>
// <div className='space-y-6'>
//     <input value={formData.email} onChange={dataChange} type="email" placeholder='Email' name='email' required />
//     <input value={formData.password} onChange={dataChange} type="password" placeholder='Password' name='password' required />
// </div>
// <button className='bg-red-500 text-white px-6 py-2 rounded-lg mt-6'>Login</button>
// <p className='mt-1 '>Don't have an account? <Link to={"/register"} className='text-red-500 font-medium'>Register</Link></p>
// </form >