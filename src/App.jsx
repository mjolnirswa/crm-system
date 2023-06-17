import Sidebar from "./components/Sidebar/Sidebar"
import Clock from "./components/UI/Clock"
import { Outlet } from "react-router-dom"
import { useAuth } from "./utils/hooks/useAuth"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

const App = () => {
  const {isAuth} = useAuth();
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuth === false) {
      navigate("/auth")
    }
  }, [isAuth])

  return (
    <div>
        {/* APP */}
        <div className="min-h-full">
            <div className="grid grid-cols-12 mx-auto lg:gap-5">

              {/* SIDEBAR */}
              <div className="hidden md:block xs-col-span-1 xl:col-span-2 lg:col-span-3">
                <div className="sticky top-0">
                    <Sidebar/>
                </div>
              </div>


              {/* MAIN CONTENT */}
              <div className="col-span-12 md:col-span-11 xl:col-span-10 lg:col-span-9">
                  <Clock />
                  <Outlet/>
              </div>
            </div>
        </div>
    </div>
  )
}

export default App
