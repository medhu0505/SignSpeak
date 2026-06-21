import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./root.ts";
//let videlement = document.getElementById("VideoFeed")
//function updateCameraFeed() {
  //videlement.src = "http://127.0.0.1:5000/video?" + new Date().getTime();
//}
createRoot(document.getElementById("root")!).render(<App />);
