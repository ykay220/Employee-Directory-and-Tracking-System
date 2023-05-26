import { useState, useEffect } from "react";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { UserObj } from "../expense-tracker/components/UserList";
import apiClient from "./api-client";

const useUsers = () => {
  const [users, setUsers] = useState<UserObj[]>([]);
  const [errors, setErrors] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [nameUpdated, setNameUpdated] = useState(false);

  useEffect(() => {
    apiClient
      .get<UserObj[]>("/users")
      .then((res) => setUsers(res.data))
      .catch((err) => setErrors(err.message));
  }, []);

  const handlerDelete = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
    apiClient.delete("/users/" + id).catch((err) => setErrors(err.message));
  };

  const handlerCategory = (category: string) => {
    setSelectedCategory(category);
  };

  const visibleText = selectedCategory
    ? users.filter((u) => u.address.city === selectedCategory)
    : users;

  const createData = (newuser: UserObj) => {
    const userExists = users.some((user) => user.username === newuser.username);
    if (userExists) {
      // User already exists, display an error or provide feedback to the user
      console.log("User already exists");
      return;
    }

    setUsers([...users, newuser]);
    apiClient
      .post("/users/", newuser)
      .then((res) => setUsers([res.data, ...users]))
      .catch((err) => setErrors(err.message));
  };

  const updateData = (user: UserObj) => {
    setUsers(
      users.map((u) =>
        u.id === user.id && !u.nameUpdated
          ? { ...user, name: user.name + "✔", nameUpdated: true }
          : u
      )
    );
  };

  return {
    users,
    errors,
    selectedCategory,
    nameUpdated,
    visibleText,
    handlerDelete,
    handlerCategory,
    createData,
    updateData,
  };
};

export default useUsers;
