import { useState, useEffect, MouseEvent } from "react";
import "./app.css";
import apiClient from "./services/api-client";
import "./App.css";
import UserList, { UserObj } from "./expense-tracker/components/UserList";
import UserFilter from "./expense-tracker/components/UserFilter";
import UserForm from "./expense-tracker/components/UserForm";
import useUsers from "./services/useUsers";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

function App() {
  const {
    users,
    errors,
    updateData,
    visibleText,
    handlerDelete,
    handlerCategory,
    createData,
  } = useUsers();

  return (
    <div>
      {errors && <p>{errors}</p>}
      <UserForm
        onSubmit={(user) => {
          createData(user);
        }}
      />
      <UserFilter onSelectCategory={handlerCategory} users={users} />
      <UserList
        updateUser={updateData}
        onDelete={handlerDelete}
        users={visibleText}
      />
    </div>
  );
}

export default App;
