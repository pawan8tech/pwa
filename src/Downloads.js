import React, { useState, useEffect } from "react";
import { getAllVideos } from "./indexedDB";
import styles from "./Home.module.css";

const Downloads = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchDownloadedVideos = async () => {
      const storedVideos = await getAllVideos();
      setVideos(storedVideos);
    };

    fetchDownloadedVideos();
  }, []);

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

  return (
    <div className={styles.container}>
      <h1>Downloaded Videos</h1>
      <div className="videoList">
        {videos.map((video) => (
          <div key={video.id} className="videoItem">
            <h3>{getShortUrl(video.url)}</h3>
            <video width="560" height="315" controls>
              <source src={URL.createObjectURL(video.blob)} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Downloads;
