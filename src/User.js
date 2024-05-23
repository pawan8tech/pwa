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
        });
      })
      .catch((error) => {
        console.log("somthing else", error);
      });
  }, []);
  return (
    <div>
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
