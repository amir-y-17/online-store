import Index from "./pages/Index/Index"
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"

const route = [ 
    {path: '/' , element: <Index/> },
    {path: '/register' , element: <Register/> },
    {path: '/login' , element: <Login/> },
]

export default route