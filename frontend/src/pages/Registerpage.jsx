import React, { useEffect, useState } from 'react'
import './Registerpage.css'
import { Link, useNavigate } from 'react-router-dom'

const Registerpage = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        gender: ""
    })
    const [passwordMatch, setPasswordMatch] = useState(true)
    const navigate = useNavigate();

    const dataChange = (event) => {
        setFormData((prev) => {
            return { ...prev, [event.target.name]: event.target.value }
        })
    }

    useEffect(() => {
        setPasswordMatch(formData.password === formData.confirmPassword || formData.confirmPassword === "");
    }, [formData.password, formData.confirmPassword]);

    const submit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert("Registration Successful! Please login")
                navigate("/login");
            } else {
                response.json().then(data => alert(data.message));
            }
        } catch (err) {
            alert(err.message)
            console.log("Registration failed", err.message);
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center w-full dark:bg-gray-950">
            <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-md">
                <h1 className="text-2xl font-bold mb-6 dark:text-gray-200">Register Yourself!</h1>
                <form action="#" onSubmit={submit}>
                    <div className='flex mb-4 gap-4'>
                        <div className="">
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">First Name</label>
                            <input value={formData.firstName} onChange={dataChange} type="text" id="firstName" name='firstName' className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="John" required />
                        </div>
                        <div className="">
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Last Name</label>
                            <input value={formData.lastName} onChange={dataChange} type="text" id="lastName" name='lastName' className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Doe" required />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                        <input value={formData.email} onChange={dataChange} type="email" id="email" name='email' className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="your@email.com" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
                        <input value={formData.password} onChange={dataChange} type="password" name='password' id="password" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter your password" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Confirm Password</label>
                        <input value={formData.confirmPassword} onChange={dataChange} type="password" name='confirmPassword' id="confirmPassword" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter your password" required />

                    </div>
                    {!passwordMatch && (
                        <p className='text-red-500 -mt-3 mb-2 text-center'>Password does not match!</p>
                    )}
                    <div className="flex items-center justify-between gap-4 mb-2">
                        <label htmlFor="gender" className="block text-sm font-medium text-gray-700 dark:text-gray-300 ">Gender</label>

                        <div className='flex items-center gap-4'>
                            <div class="flex items-center ">
                                <input id="male" type="radio" onChange={dataChange} value={"Male"} name="gender" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label for="male" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Male</label>
                            </div>
                            <div class="flex items-center">
                                <input id="female" type="radio" onChange={dataChange} value={"Female"} name="gender" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label for="female" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Female</label>
                            </div>
                        </div>
                    </div>
                    <div className="text-center mb-4">
                        <Link to={"/login"} className='text-xs text-indigo-500 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>Login</Link>
                    </div>
                    <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Register</button>
                </form>
            </div>
        </div>
    )
}

export default Registerpage

{/* <div className='flex justify-center items-center h-screen'>
<form action="" onSubmit={submit} className='register-form flex flex-col items-center px-6 py-4 w-[90%] sm:w-[50%] md:w-[35%]'>
    <div className='text-2xl mb-6 '>Register</div>
    <div className='space-y-6'>
        <input value={formData.firstName} onChange={dataChange} type="text" placeholder='First Name' name='firstName' required />
        <input value={formData.lastName} onChange={dataChange} type="text" placeholder='Last Name' name='lastName' required />
        <input value={formData.email} onChange={dataChange} type="email" placeholder='Email' name='email' required />
        <input value={formData.password} onChange={dataChange} type="password" placeholder='Password' name='password' required />
        <input value={formData.confirmPassword} onChange={dataChange} type="password" placeholder='Confirm Password' name='confirmPassword' required />
        {!passwordMatch && (
            <p className='text-red-500 -mt-4 text-center'>Password does not match!</p>
        )}
    </div>
    <div className='flex items-center gap-1 mt-3'>
        <input type="radio" name="gender" id="male" value={"Male"} onChange={dataChange} /> <label htmlFor="male">Male</label>
        &nbsp; &nbsp;
        <input type="radio" name="gender" id="female" value={"Female"} onChange={dataChange} /> <label htmlFor="female">Female</label>
    </div>
    <button className='bg-red-500 text-white px-6 py-2 rounded-lg mt-2'>Register</button>
    <p className='mt-1 '>Already have an account? <Link to={"/login"} className='text-red-500 font-medium'>Login</Link></p>
</form>
</div> */}