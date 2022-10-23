import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "./AddUser.css";
import { useNavigate } from "react-router-dom";
import { route } from "../../utils/appRoutes";

const AddUser = ({}) => {
  const [firstNameUser, setFirstNameUser] = useState("");
  const [lastNameUser, setLastNameUser] = useState("");
  const [descriptionUser, setDescriptionUser] = useState("");
  const [photoUser, setPhotoUser] = useState("");
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  const numePattern = new RegExp(/(.*[a-z]){2,20}/);
  const photo = new RegExp(
    /^((ftp|http|https):\/\/)?www\.([A-z]+)\.([A-z]{2,})/
  );

  const validFirstNume = numePattern.test(firstNameUser);
  const validLastNume = numePattern.test(lastNameUser);
  const validPhoto = photo.test(photoUser);

  const getUsers = async () => {
    try {
      let response = await axios.get(`https://reqres.in/api/users?page=2`);
      if (response.status === 200) {
        setUsers(response.data.data);
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

  const handleFirstNameUser = (event) => {
    setFirstNameUser(event.target.value);
  };
  const handleLastNameUser = (event) => {
    setLastNameUser(event.target.value);
  };
  const handleDescriptionUser = (event) => {
    setDescriptionUser(event.target.value);
  };
  const handlePhotoUser = (event) => {
    setPhotoUser(event.target.value);
  };

  const postUser = async () => {
    if (!validFirstNume) {
      console.log("numele nu e bun");
      return toast.error("Fitrst name nu este valid.", { toastId: "kjsdkf" });
    }

    if (!validLastNume) {
      console.log("numele nu e bun");
      return toast.error("Last name nu este valid.", { toastId: "kjsdkf" });
    }

    if (!validPhoto) {
      console.log("poza nu e buna");
      return toast.error("Photo nu este valida.", { toastId: "kjsdkf" });
    }

    let toSend = {
      avatar: photoUser,
      email: descriptionUser,
      first_name: firstNameUser,
      last_name: lastNameUser,
    };
    try {
      let response = await axios.post(`https://reqres.in/api/users`, toSend);
      if (response.status === 201) {
        users.push(response.data);
        console.log(users);
        toast.info("User a fost adaugat cu succes!", {
          toastId: "kjghfsfsf",
        });
      }
    } catch (err) {
      if (err.response.status) {
        toast.error("Ooops... Se pare ca ceva nu a mers bine", {
          toastId: "yujdgty",
        });
        return;
      }
    } finally {
      //getUsers();
    }
  };

  useEffect(() => {
    getUsers();
  }, []);


  return (
    <div className="content">
      <button className="btn-back"
      onClick={ () => {navigate(route.userCard); }}>Back</button>
      <form>
        <div className="formular">
          <input
            className="input-type"
            type="text"
            value={firstNameUser}
            onChange={handleFirstNameUser}
            placeholder="First name user"
          />
          <input
            className="input-type"
            value={lastNameUser}
            onChange={handleLastNameUser}
            placeholder="Last name user"
          />
          <input
            className="input-type"
            type="text"
            value={descriptionUser}
            onChange={handleDescriptionUser}
            placeholder="Description user"
          />
          <input
            className="input-type"
            type="text"
            value={photoUser}
            onChange={handlePhotoUser}
            placeholder="Photo user"
          />
          <button
            className="btn-add"
            onClick={() => {
              setFirstNameUser("");
              setLastNameUser("");
              setDescriptionUser("");
              setPhotoUser("");
              postUser();
            }}
          >
            Add User
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
