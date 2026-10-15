import { BrowserRouter } from "react-router-dom"
import AppRoutes from "./routes/AppRoutes"
function App() {
  return (
    // <div className="min-h-screen flex items-center justify-center">
    //   <h1 className="text-4xl font-bold">
    //     PharmaCare
    //   </h1>
    // </div>
    <BrowserRouter>
    <AppRoutes />
    </BrowserRouter>
  )
}

export default App