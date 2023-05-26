import React from "react";
import styles from "./userlist.module.css";

export interface UserObj {
  id: number;
  name: string | JSX.Element;
  username: string;
  nameUpdated?: boolean;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
}

export interface Props {
  users: UserObj[];
  onDelete: (id: number) => void;
  updateUser: (user: UserObj) => void;
}

const UserList = ({ users, onDelete, updateUser }: Props) => {
  if (users.length === 0) return null;
  return (
    <div className="table-wrap">
      <div className={`table-responsive ${styles.tableWrap}`}>
        <table className={`table table-striped ${styles.customTable}`}>
          <thead className={styles.theadWrap}>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>City</th>
              <th></th>
            </tr>
          </thead>
          <tbody className={styles.customTableBody}>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.address.city}</td>
                <td>
                  <button
                    onClick={(id) => updateUser(user)}
                    className="btn btn-danger mx-2"
                  >
                    Update
                  </button>

                  <button
                    onClick={(id) => onDelete(user.id)}
                    className="btn btn-primary"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
