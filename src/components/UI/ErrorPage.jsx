import { Link } from "react-router-dom";

const ErrorPage = () => {
    return(
        <div className="flex flex-col items-center justify-center my-auto h-screen">
            <h1 className="text-center text-xl font-medium">Oooops!</h1>
            <p className="mt-5 text-center text-lg">Something went wrong...</p>
            <Link to='/auth' className="text-center mx-auto mt-5 cursor-pointer text-blue-600 underline">Go to start page</Link>
        </div>
    )
}

export default ErrorPage;