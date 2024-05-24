import React, { useState, useEffect } from "react";
import { saveVideo } from "./indexedDB";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";

const API_KEY = "bD7ORaO3yiUHfkFfTBfv7PTt24srtOys37wOMt5VQs7D7m3fQ6IXvj9b";
const MAX_RESULTS = 10;
const SEARCH_QUERY = "music";

const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    const fetchVideos = async () => {
      if (navigator.onLine) {
        try {
          const response = await fetch(
            `https://api.pexels.com/videos/search?query=${SEARCH_QUERY}&per_page=${MAX_RESULTS}`,
            {
              headers: {
                Authorization: API_KEY,
              },
            }
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setVideos(data.videos);
        } catch (error) {
          console.error("Error fetching videos:", error);
        }
      }
    };

    const handleOnlineStatus = () => {
      const onlineStatus = navigator.onLine;
      setIsOffline(!onlineStatus);

      if (onlineStatus) {
        fetchVideos();
      }
    };

    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setDeferredPrompt(event);
      setShowInstallButton(true);
    };

    fetchVideos(); // Initial fetch

    window.addEventListener("online", handleOnlineStatus);
    window.addEventListener("offline", handleOnlineStatus);
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("online", handleOnlineStatus);
      window.removeEventListener("offline", handleOnlineStatus);
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleDownload = async (video) => {
    try {
      const response = await fetch(video.video_files[0].link);
      const blob = await response.blob();
      console.log(blob.type, "----blob size");
      await saveVideo({ id: video.id, url: video.url, blob });
      console.log("Video saved to IndexedDB:", video.id);
      alert("Video downloaded and saved for offline use.");
    } catch (error) {
      console.error("Error downloading video:", error);
    }
  };

  const getShortUrl = (url) => {
    console.log("-----url----", url);
    const newurl = url.replace("https://www.pexels.com/video/", "");
    console.log(newurl);
    const arr = newurl.split("-");
    arr.pop();
    const capitalizeFirstLetter = (str) =>
      str.charAt(0).toUpperCase() + str.slice(1);
    const newArr = arr.map(capitalizeFirstLetter);
    return newArr.join(" ");
  };

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the A2HS prompt");
        } else {
          console.log("User dismissed the A2HS prompt");
        }
        setDeferredPrompt(null);
        setShowInstallButton(false);
      });
    }
  };

  return (
    <div className={styles.container}>
      <h1>Pexels Music Videos</h1>
      {isOffline && (
        <div className={styles.downloadbuttoncontainer}>
          <p>You are currently offline. You can view your downloaded videos.</p>
          <Link to="/Downloads">
            <button className={styles.downloadbutton}>
              Go to Downloaded Videos
            </button>
          </Link>
        </div>
      )}
      {showInstallButton && (
        <button className={styles.downloadbutton} onClick={handleInstallClick}>
          Install App
        </button>
      )}
      <div className="videoList">
        {!isOffline &&
          videos.map((video) => (
            <div key={video.id} className={styles.videoItem}>
              <h3>{getShortUrl(video.url)}</h3>
              <video width="560" height="315" controls>
                <source src={video.video_files[0].link} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <button onClick={() => handleDownload(video)}>Download</button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default VideoList;
