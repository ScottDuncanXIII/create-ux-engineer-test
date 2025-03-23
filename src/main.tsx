import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import gsap from "gsap";
import { ScrollToPlugin } from "gsap/all";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollToPlugin, useGSAP);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
