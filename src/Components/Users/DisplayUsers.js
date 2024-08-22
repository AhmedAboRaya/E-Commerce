import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";

const DisplayUsers = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:7000/users")
      .then((response) => response.json())
      .then((data) => {
        setTimeout(() => {
          setUsers(data);
          setIsLoading(false);
        }, 3000);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
      });
  }, []);

  return (
    <div className="border-2 bg-blue-200 p-4 w-[50%] rounded-md">
      {isLoading ? (
        <div className="d-flex justify-content-center">
          <Spinner variant="primary" />
        </div>
      ) : (
        <>
          <h1 className="text-center">User List</h1>
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                <h1 className="text-2xl">{user.name}</h1>{" "}
                <h6>
                  Age: {user.age}, City: {user.city}
                </h6>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default DisplayUsers;
