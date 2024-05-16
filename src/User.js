import React from "react";
import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";

const User = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    let url = "https://jsonplaceholder.typicode.com/users";
    fetch(url)
      .then((response) => {
        response.json().then((result) => {
          setData(result);
          // localStorage.setItem("users", JSON.stringify(result));
        });
      })
      .catch((error) => {
        console.log("somthing else", error);
        // let collection = localStorage.getItem("users");
        // setData(JSON.parse(collection));
      });
  }, []);

  // const User = () => {
  // const [data, setData] = useState([]);
  // const [mode, setMode] = useState("online");
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(
  //         "https://jsonplaceholder.typicode.com/users"
  //       );
  //       const result = await response.json();
  //       setData(result);
  //       // localStorage.setItem("users", JSON.stringify(result));
  //       // setMode("online");
  //     } catch (error) {
  //       console.log("somthing else", error);
  //       // const collection = localStorage.getItem("users");
  //       // setData(JSON.parse(collection));
  //       // setMode("offline");
  //     }
  //   };

  //   fetchData();

  //   // const handleOnlineStatusChange = () => {
  //   //   setMode(navigator.onLine ? "online" : "offline");
  //   // };

  //   // window.addEventListener("online", handleOnlineStatusChange);
  //   // window.addEventListener("offline", handleOnlineStatusChange);

  //   return () => {
  //     // window.removeEventListener("online", handleOnlineStatusChange);
  //     // window.removeEventListener("offline", handleOnlineStatusChange);
  //   };
  // }, []);

  return (
    <div>
      {/* <div>
        {mode === "offline" ? (
          <div className="alert alert-warning" role="alert">
            You are in offline mode or some issue with connection
          </div>
        ) : null}
      </div> */}
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>S. No</th>
            <th>First Name</th>
            <th>User Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.username}</td>
              <td>{item.email}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default User;
