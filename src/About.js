// import { Inter } from "next/font/google";
import "./about.module.css";
// const inter = Inter({ subsets: ["latin"] });

export default function About() {
  return (
    <div className="container">
      <h1 className="heading">Welcome to My PWA Demo</h1>
      <p style={{ fontSize: "1.5em" }}>
        This is a Progressive Web App (PWA) showcasing its features:
      </p>
      <ul>
        <li>Offline support: Users can use the app even when offline.</li>
        <li>Installability: Users can install the app on their devices.</li>
        <li>
          Push notifications: Send notifications to users even when the app is
          not open.
        </li>
        <li>
          Responsive design: The app adapts to different screen sizes and
          devices.
        </li>
        <li>
          Download Video: download video when user are online and see the
          downloaded video when user are offline
        </li>
        <li>
          Fast and engaging: Provides a smooth and responsive user experience.
        </li>
        <li>
          Animated transitions: Delightful animations enhance user interaction.
        </li>
      </ul>
    </div>
  );
}
