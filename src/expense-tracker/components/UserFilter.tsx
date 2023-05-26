import React from "react";

interface UserObj {
  id: number;
  name: string | JSX.Element;
  username: string;
  email: string;
  nameUpdated?: boolean;
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

interface Props {
  users: UserObj[];
  onSelectCategory: (category: string) => void;
}

const UserFilter = ({ onSelectCategory, users }: Props) => {
  return (
    <select
      className="form-select mb-3"
      onChange={(e) => onSelectCategory(e.target.value)}
    >
      <option disabled selected value="">
        Employees by Cities
      </option>
      {users.map((u) => (
        <option key={u.id} value={u.address.city}>
          {u.address.city}
        </option>
      ))}
    </select>
  );
};

export default UserFilter;
