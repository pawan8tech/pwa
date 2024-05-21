import React, { useState, useEffect } from "react";
import { saveVideo, getAllVideos } from "./indexedDB";
const API_KEY = "bD7ORaO3yiUHfkFfTBfv7PTt24srtOys37wOMt5VQs7D7m3fQ6IXvj9b";
const MAX_RESULTS = 10;
const SEARCH_QUERY = "music";

const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

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
      } else {
        // Fetch videos from IndexedDB if offline
        const storedVideos = await getAllVideos();
        console.log("Fetched videos from IndexedDB:", storedVideos);
        setVideos(
          storedVideos.map((video) => ({
            ...video,
            blobUrl: URL.createObjectURL(video.blob),
          }))
        );
      }
    };

    fetchVideos();

    const handleOnlineStatus = () => setIsOffline(!navigator.onLine);
    window.addEventListener("online", handleOnlineStatus);
    window.addEventListener("offline", handleOnlineStatus);

    return () => {
      window.removeEventListener("online", handleOnlineStatus);
      window.removeEventListener("offline", handleOnlineStatus);
    };
  }, []);

  const handleDownload = async (video) => {
    try {
      const response = await fetch(video.video_files[0].link, { mode: "cors" });
      if (!response.ok) {
        throw new Error("Failed to fetch video");
      }
      const blob = await response.blob();
      await saveVideo({ id: video.id, url: video.url, blob });
      console.log("Video saved to IndexedDB:", video.id);
      alert("Video downloaded and saved for offline use.");
    } catch (error) {
      console.error("Error downloading video:", error);
    }
  };

  return (
    <div>
      <h1>Pexels Music Videos</h1>
      {isOffline && (
        <p>You are currently offline. Showing downloaded videos.</p>
      )}
      <div className="video-list">
        {videos.map((video) => (
          <div key={video.id} className="video-item">
            <h3>{video.url}</h3>
            <video width="560" height="315" controls>
              <source
                src={video.blobUrl ? video.blobUrl : video.video_files[0].link}
                type="video/mp4"
              />
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

// // this working fine but when after the offline user didnot able to download
// import React, { useState, useEffect } from "react";
// import { saveVideo, getAllVideos } from "./indexedDB";
// const API_KEY = "bD7ORaO3yiUHfkFfTBfv7PTt24srtOys37wOMt5VQs7D7m3fQ6IXvj9b";
// const MAX_RESULTS = 10;
// const SEARCH_QUERY = "music";

// const VideoList = () => {
//   const [videos, setVideos] = useState([]);
//   const [isOffline, setIsOffline] = useState(!navigator.onLine);

//   useEffect(() => {
//     const fetchVideos = async () => {
//       if (navigator.onLine) {
//         try {
//           const response = await fetch(
//             `https://api.pexels.com/videos/search?query=${SEARCH_QUERY}&per_page=${MAX_RESULTS}`,
//             {
//               headers: {
//                 Authorization: API_KEY,
//               },
//             }
//           );
//           if (!response.ok) {
//             throw new Error("Network response was not ok");
//           }
//           const data = await response.json();
//           setVideos(data.videos);
//         } catch (error) {
//           console.error("Error fetching videos:", error);
//         }
//       } else {
//         // Fetch videos from IndexedDB if offline
//         const storedVideos = await getAllVideos();
//         console.log("Fetched videos from IndexedDB:", storedVideos);
//         setVideos(storedVideos);
//       }
//     };

//     fetchVideos();

//     const handleOnlineStatus = () => setIsOffline(!navigator.onLine);
//     window.addEventListener("online", handleOnlineStatus);
//     window.addEventListener("offline", handleOnlineStatus);

//     return () => {
//       window.removeEventListener("online", handleOnlineStatus);
//       window.removeEventListener("offline", handleOnlineStatus);
//     };
//   }, []);

//   //      const handleDownload = async (video) => {
//   //   if (!navigator.onLine) {
//   //     alert(
//   //       "You are currently offline. Please connect to the internet to download the video."
//   //     );
//   //     return;
//   //   }
//   //   try {
//   //     // Refresh IndexedDB data if the user comes back online
//   //     if (navigator.onLine && videos.length === 0) {
//   //       const response = await fetch(
//   //         `https://api.pexels.com/videos/search?query=${SEARCH_QUERY}&per_page=${MAX_RESULTS}`,
//   //         {
//   //           headers: {
//   //             Authorization: API_KEY,
//   //           },
//   //         }
//   //       );
//   //       if (!response.ok) {
//   //         throw new Error("Network response was not ok");
//   //       }
//   //       const data = await response.json();
//   //       setVideos(data.videos);
//   //     }

//   //     const response = await fetch(video.video_files[0].link);
//   //     if (!response.ok) {
//   //       throw new Error(
//   //         `Failed to download the video. Server returned status ${response.status}.`
//   //       );
//   //     }
//   //     const blob = await response.blob();
//   //     await saveVideo({ id: video.id, url: video.url, blob });
//   //     console.log("Video saved to IndexedDB:", video.id);
//   //     alert("Video downloaded and saved for offline use.");
//   //   } catch (error) {
//   //     console.error("Error downloading video:", error);
//   //     alert("Failed to download the video. Please try again later.");
//   //   }
//   // };

//   const handleDownload = async (video) => {
//     try {
//       const response = await fetch(video.video_files[0].link);
//       const blob = await response.blob();
//       await saveVideo({ id: video.id, url: video.url, blob });
//       console.log("Video saved to IndexedDB:", video.id);
//       alert("Video downloaded and saved for offline use.");
//     } catch (error) {
//       console.error("Error downloading video:", error);
//     }
//   };

//   return (
//     <div>
//       <h1>Pexels Music Videos</h1>
//       {isOffline && (
//         <p>You are currently offline. Showing Downloaded videos.</p>
//       )}
//       <div className="video-list">
//         {videos.map((video) => (
//           <div key={video.id} className="video-item">
//             <h3>{video.url}</h3>
//             <video width="560" height="315" controls>
//               <source
//                 src={
//                   video.blob
//                     ? URL.createObjectURL(video.blob)
//                     : video.video_files[0].link
//                 }
//                 type="video/mp4"
//               />
//               Your browser does not support the video tag.
//             </video>
//             <button onClick={() => handleDownload(video)}>Download</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default VideoList;

// import React, { useState, useEffect } from "react";
// import styles from "./Home.module.css";
// const API_KEY = "AIzaSyB2OimXw3MEy9VucMdHmkcjw5XIvhKpr68"; // Replace with your actual YouTube Data
// const SEARCH_QUERY = " hindi song"; // You can modify this query to be more specific if needed
// const MAX_RESULTS = 10;
// const VideoList = () => {
//   const [videos, setVideos] = useState([]);

//   useEffect(() => {
//     const storedVideos = localStorage.getItem("youtubeVideos");
//     if (storedVideos) {
//       setVideos(JSON.parse(storedVideos));
//     } else {
//       fetchVideos();
//     }
//   }, []);

//   const fetchVideos = async () => {
//     try {
//       const response = await fetch(
//         `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=${MAX_RESULTS}&q=${SEARCH_QUERY}&key=${API_KEY}`
//       );
//       const data = await response.json();
//       setVideos(data.items);
//       console.log("-----videos-----", videos);
//       localStorage.setItem("youtubeVideos", JSON.stringify(data.items));
//     } catch (error) {
//       console.error("Error fetching videos:", error);
//     }
//   };

//   return (
//     <div>
//       <h1>YouTube Music Videos</h1>
//       <div className={styles.video_list}>
//         {videos.map((video) => (
//           <div key={video.id.videoId} className={styles.video_item}>
//             <h3>{video.snippet.title}</h3>
//             <iframe
//               width="300"
//               height="169"
//               src={`https://www.youtube.com/embed/${video.id.videoId}`}
//               title={video.snippet.title}
//               frameBorder="0"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//               allowFullScreen
//             ></iframe>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default VideoList;

//  youtube api'

// import React, { useState, useEffect } from "react";
// import { openDatabase, saveVideo, getVideo } from "./indexedDb";

// const API_KEY = "AIzaSyB2OimXw3MEy9VucMdHmkcjw5XIvhKpr68"; // Replace with your actual YouTube Data API key
// const MAX_RESULTS = 10;
// const SEARCH_QUERY = "music"; // You can modify this query to be more specific if needed

// const VideoList = () => {
//   const [videos, setVideos] = useState([]);
//   const [db, setDb] = useState(null);

//   useEffect(() => {
//     const initializeDb = async () => {
//       const dbInstance = await openDatabase();
//       setDb(dbInstance);
//       fetchVideos(dbInstance);
//     };
//     initializeDb();
//   }, []);

//   const fetchVideos = async (dbInstance) => {
//     try {
//       const response = await fetch(
//         `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=${MAX_RESULTS}&q=${SEARCH_QUERY}&key=${API_KEY}`
//       );
//       const data = await response.json();
//       setVideos(data.items);
//       data.items.forEach(async (video) => {
//         const videoUrl = `https://www.youtube.com/watch?v=${video.id?.videoId}`;
//         const videoBlob = await fetchVideoBlob(videoUrl);
//         await saveVideo(dbInstance, video.id.videoId, videoBlob);
//         if (navigator.serviceWorker.controller) {
//           navigator.serviceWorker.controller.postMessage({
//             type: "CACHE_VIDEO",
//             id: video.id.videoId,
//             blob: videoBlob,
//           });
//         }
//       });
//     } catch (error) {
//       console.error("Error fetching videos:", error);
//     }
//   };

//   // const fetchVideoBlob = async (url) => {
//   //   const response = await fetch(url);
//   //   return response.blob();
//   // };
//   const fetchVideoBlob = async (url) => {
//     const proxyUrl = "http://localhost:8080/";
//     const response = await fetch(proxyUrl + url, { mode: "cors" });
//     return response.blob();
//   };

//   const playVideo = async (videoId) => {
//     const videoData = await getVideo(db, videoId);
//     const videoBlobUrl = URL.createObjectURL(videoData.blob);
//     document.getElementById(`video-${videoId}`).src = videoBlobUrl;
//   };

//   return (
//     <div>
//       <h1>YouTube Music Videos</h1>
//       <div className="video-list">
//         {videos.map((video) => (
//           <div key={video.id.videoId} className="video-item">
//             <h3>{video.snippet.title}</h3>
//             <video
//               id={`video-${video.id.videoId}`}
//               width="300"
//               height="169"
//               controls
//             ></video>
//             <button onClick={() => playVideo(video.id.videoId)}>
//               Play Offline
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default VideoList;

// // through pexels api

// import React, { useState, useEffect } from "react";

// const API_KEY = "bD7ORaO3yiUHfkFfTBfv7PTt24srtOys37wOMt5VQs7D7m3fQ6IXvj9b"; // Replace with your actual Pexels API key
// const MAX_RESULTS = 10;
// const SEARCH_QUERY = "music"; // You can modify this query to be more specific if needed

// const VideoList = () => {
//   const [videos, setVideos] = useState([]);

//   useEffect(() => {
//     fetchVideos();
//   }, []);

//   const fetchVideos = async () => {
//     try {
//       const response = await fetch(
//         `https://api.pexels.com/videos/search?query=${SEARCH_QUERY}&per_page=${MAX_RESULTS}`,
//         {
//           headers: {
//             Authorization: API_KEY,
//           },
//         }
//       );
//       const data = await response.json();
//       setVideos(data.videos);
//     } catch (error) {
//       console.error("Error fetching videos:", error);
//     }
//   };

//   return (
//     <div>
//       <h1>Pexels Music Videos</h1>
//       <div className="video-list">
//         {videos.map((video) => (
//           <div key={video.id} className="video-item">
//             <h3>{video.url}</h3>
//             <video width="560" height="315" controls>
//               <source src={video.video_files[0].link} type="video/mp4" />
//               Your browser does not support the video tag.
//             </video>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };
// export default VideoList;

// import React, { useState, useEffect } from "react";
// const API_KEY = "bD7ORaO3yiUHfkFfTBfv7PTt24srtOys37wOMt5VQs7D7m3fQ6IXvj9b";
// const MAX_RESULTS = 10;
// const SEARCH_QUERY = "music";

// const VideoList = () => {
//   const [videos, setVideos] = useState([]);
//   const [downloadedVideos, setDownloadedVideos] = useState([]);
//   const [videoUrls, setVideoUrls] = useState({});

//   useEffect(() => {
//     fetchVideos();
//   }, []);

//   const fetchVideos = async () => {
//     try {
//       const response = await fetch(
//         `https://api.pexels.com/videos/search?query=${SEARCH_QUERY}&per_page=${MAX_RESULTS}`,
//         {
//           headers: {
//             Authorization: API_KEY,
//           },
//         }
//       );
//       const data = await response.json();
//       setVideos(data.videos);
//     } catch (error) {
//       console.error("Error fetching videos:", error);
//     }
//   };

//   const handleDownload = async (video) => {
//     try {
//       const response = await fetch(video.video_files[0].link);
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       const blob = await response.blob();
//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = url;
//       link.download = `video-${video.id}.mp4`;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       window.URL.revokeObjectURL(url);
//       setDownloadedVideos((prev) => [...prev, video]);
//       setVideoUrls((prev) => ({ ...prev, [video.id]: url }));
//     } catch (error) {
//       console.error("Error downloading video:", error);
//     }
//   };

//   return (
//     <div>
//       <h1>Pexels Music Videos</h1>
//       <div className="video-list">
//         {videos.map((video) => (
//           <div key={video.id} className="video-item">
//             <h3>{video.url}</h3>
//             <video width="560" height="315" controls>
//               <source src={video.video_files[0].link} type="video/mp4" />
//               Your browser does not support the video tag.
//             </video>
//             <button onClick={() => handleDownload(video)}>Download</button>
//           </div>
//         ))}
//       </div>

//       {downloadedVideos.length > 0 && (
//         <div>
//           <h2>Downloaded Videos</h2>
//           <div className="downloaded-video-list">
//             {downloadedVideos.map((video) => (
//               <div key={video.id} className="downloaded-video-item">
//                 <h3>{video.url}</h3>
//                 <video width="560" height="315" controls>
//                   <source src={videoUrls[video.id]} type="video/mp4" />
//                   Your browser does not support the video tag.
//                 </video>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// if somthing goes wrong then show this code to sir

// import React, { useState, useEffect } from "react";

// const API_KEY = "bD7ORaO3yiUHfkFfTBfv7PTt24srtOys37wOMt5VQs7D7m3fQ6IXvj9b";
// const MAX_RESULTS = 10;
// const SEARCH_QUERY = "music";

// const VideoList = () => {
//   const [videos, setVideos] = useState([]);

//   useEffect(() => {
//     fetchVideos();
//   }, []);

//   const fetchVideos = async () => {
//     try {
//       const response = await fetch(
//         `https://api.pexels.com/videos/search?query=${SEARCH_QUERY}&per_page=${MAX_RESULTS}`,
//         {
//           headers: {
//             Authorization: API_KEY,
//           },
//         }
//       );
//       console.log("-------------fetchdata---------");
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       const data = await response.json();
//       setVideos(data.videos);
//     } catch (error) {
//       console.error("Error fetching videos:", error);
//     }
//   };

//   return (
//     <div>
//       <h1>Pexels Music Videos</h1>
//       <div className="video-list">
//         {videos.map((video) => (
//           <div key={video.id} className="video-item">
//             <h3>{video.url}</h3>
//             <video width="560" height="315" controls>
//               <source src={video.video_files[0].link} type="video/mp4" />
//               Your browser does not support the video tag.
//             </video>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default VideoList;

// src/VideoList.js
// import React, { useState, useEffect } from "react";

// const MAX_RESULTS = 10;
// const SEARCH_QUERY = "music"; // You can modify this query to be more specific if needed

// const VideoList = () => {
//   const [videos, setVideos] = useState([]);

//   useEffect(() => {
//     fetchVideos();
//   }, []);

//   const fetchVideos = async () => {
//     try {
//       const response = await fetch(
//         `/api?query=${SEARCH_QUERY}&per_page=${MAX_RESULTS}`
//       );
//       const data = await response.json();
//       setVideos(data.videos);
//     } catch (error) {
//       console.error("Error fetching videos:", error);
//     }
//   };

//   const downloadVideo = async (video) => {
//     const response = await fetch(video.video_files[0].link);
//     const blob = await response.blob();
//     saveVideoToIndexedDB(video.id, blob);
//   };

//   const saveVideoToIndexedDB = (id, blob) => {
//     const request = indexedDB.open("VideoDB", 1);

//     request.onupgradeneeded = (event) => {
//       const db = event.target.result;
//       if (!db.objectStoreNames.contains("videos")) {
//         db.createObjectStore("videos", { keyPath: "id" });
//       }
//     };

//     request.onsuccess = (event) => {
//       const db = event.target.result;
//       const transaction = db.transaction(["videos"], "readwrite");
//       const store = transaction.objectStore("videos");
//       store.put({ id, blob });
//     };

//     request.onerror = (event) => {
//       console.error("Error saving video to IndexedDB:", event.target.error);
//     };
//   };

//   return (
//     <div>
//       <h1>Pexels Music Videos</h1>
//       <div className="video-list">
//         {videos.map((video) => (
//           <div key={video.id} className="video-item">
//             <h3>{video.url}</h3>
//             <video width="560" height="315" controls>
//               <source src={video.video_files[0].link} type="video/mp4" />
//               Your browser does not support the video tag.
//             </video>
//             <button onClick={() => downloadVideo(video)}>Download</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default VideoList;

// // runnig with proxy but not connected
// import React, { useState, useEffect } from "react";

// const API_KEY = "bD7ORaO3yiUHfkFfTBfv7PTt24srtOys37wOMt5VQs7D7m3fQ6IXvj9b";
// const MAX_RESULTS = 10;
// const SEARCH_QUERY = "music"; // You can modify this query to be more specific if needed

// const VideoList = () => {
//   const [videos, setVideos] = useState([]);

//   useEffect(() => {
//     fetchVideos();
//   }, []);

//   const fetchVideos = async () => {
//     try {
//       const response = await fetch(
//         `https://api.pexels.com/videos/search?query=${SEARCH_QUERY}&per_page=${MAX_RESULTS}`,
//         {
//           headers: {
//             Authorization: API_KEY,
//           },
//         }
//       );
//       console.log("-------------fetchdata---------");
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       const data = await response.json();
//       setVideos(data.videos);
//     } catch (error) {
//       console.error("Error fetching videos:", error);
//     }
//   };

//   const downloadVideo = async (video) => {
//     console.log("------------downloadingvideo---------");
//     const response = await fetch(video.video_files[0].link);
//     const blob = await response.blob();
//     saveVideoToIndexedDB(video.id, blob);
//   };

//   const saveVideoToIndexedDB = (id, blob) => {
//     const request = indexedDB.open("VideoDB", 1);

//     request.onupgradeneeded = (event) => {
//       const db = event.target.result;
//       if (!db.objectStoreNames.contains("videos")) {
//         db.createObjectStore("videos", { keyPath: "id" });
//       }
//     };

//     request.onsuccess = (event) => {
//       const db = event.target.result;
//       const transaction = db.transaction(["videos"], "readwrite");
//       const store = transaction.objectStore("videos");
//       store.put({ id, blob });
//     };

//     request.onerror = (event) => {
//       console.error("Error saving video to IndexedDB:", event.target.error);
//     };
//   };

//   return (
//     <div>
//       <h1>Pexels Music Videos</h1>
//       <div className="video-list">
//         {videos.map((video) => (
//           <div key={video.id} className="video-item">
//             <h3>{video.url}</h3>
//             <video width="560" height="315" controls>
//               <source src={video.video_files[0].link} type="video/mp4" />
//               Your browser does not support the video tag.
//             </video>
//             <button onClick={() => downloadVideo(video)}>Download</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default VideoList;
