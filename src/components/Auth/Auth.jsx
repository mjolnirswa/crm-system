import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const Auth = () => {
    const [ isLoginForm, setIsLoginForm ] = useState(true)

    const toggleForm = () => {
        setIsLoginForm(!isLoginForm)
    }

    return (
        <div className="flex h-screen items-center justify-center">
            <div className="flex flex-col justify-center flex-1 px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                <div className="flex items-center w-full h-full max-w-sm mx-auto lg:w-96">
                    { isLoginForm ? 
                    <LoginForm toggleForm={toggleForm}/> : 
                    <RegisterForm toggleForm={toggleForm}/> }
                </div>
            </div>
        </div>
    )
}

export default Auth;