import { BrowserRouter, Routes, Route } from "react-router-dom"
import PrivateRoutes from "./helpers/privateroute"

import Login from "./page/login"
import Dash from "./page/dash"
import Signup from "./page/signup"


function router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoutes/>}>
          <Route path="/" element={<Dash/>} />
        </Route>

        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default router
