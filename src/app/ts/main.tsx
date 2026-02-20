import { createRoot } from 'react-dom/client'
import Home from './Home.tsx'
import { Route, Routes } from 'react-router'

createRoot(document.getElementById('root')!).render(
  <Routes>
   <Route index element={<Home/>}/>
  </Routes>,
)
