import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./CardUser.css";
// import AddUser from "../AddUser/AddUser";
import { route } from "../../utils/appRoutes";

const UserCard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      let response = await axios.get(`https://reqres.in/api/users?page=2`);
      if (response.status === 200) {
        setUsers(response.data.data);
        console.log(users);
        navigate(route.userCard);
      }
    } catch (err) {
      if (err.response.status) {
        if (err.response.status === 404) {
          toast.error("Nu exista users.", { toastId: "dxvsdddsddfvgkk" });
          return;
        } else {
          toast.error("Ooops... Se pare ca ceva nu a mers bine");
          return;
        }
      }
    }
  };

  const handleRemove = async (idUser) => {
    const newList = users.filter((item) => item.id !== idUser);
    setUsers(newList);
  };

  const localUsers = async () => {
    getUsers();
  };

  useEffect(() => {
    localUsers();
  }, []);

  return (
    <div>
      <div className="fix">
        <button
          className="btn-add"
          onClick={(e) => {
            navigate(route.addUser);
          }}
        >
          Add User
        </button>
      </div>
      <div className="user">
        <p> Users: </p>
      </div>
      <div className="row">
        {users.map((data, index) => (
          <div className="col-md-4 animated fadeIn" key={index} value={data.id}>
            <div className="card">
              <div className="card-body">
                <div className="profile">
                  <img className="profile-img" src={data.avatar} />
                </div>
                <h5 className="card-title">
                  {data.first_name + " " + data.last_name}
                </h5>
                <p className="card-text">
                  {data.email}
                  <br />
                </p>
                <button
                  className="delBtn"
                  type="button"
                  onClick={() => handleRemove(data.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserCard;
