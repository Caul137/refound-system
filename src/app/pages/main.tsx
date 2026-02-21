import '../../css/App.css'
import { createRoot } from "react-dom/client";
import Home from "./Home/Home.tsx";
import { StrictMode } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NewRefundRequest from "./Requests/NewRefundRequest.tsx";
import RefundRequest from './Requests/RefundRequest.tsx';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
        <Route path="newRefundRequest" element={<NewRefundRequest/>}/>
         <Route path="RefundRequest" element={<RefundRequest/>}/>
    </Routes>
   </BrowserRouter>
  </StrictMode>,
);
