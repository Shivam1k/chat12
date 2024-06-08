import React from "react";
import OtherUser from "./otherUser";
import useGetOtherUsers from "../hooks/useGetOtherUsers";
import { useSelector } from "react-redux";
import useGetMessages from "../hooks/useGetMessages";

const OtherUsers = () => {
  // Custom hook to fetch other users
  useGetOtherUsers();

  // useGetMessages();

  // Extract otherUsers from Redux store
  const { otherUsers } = useSelector((store) => store.user);

  // Log the otherUsers array to debug
  // console.log("otherUsers:", otherUsers);

  // Early return if otherUsers is not defined or empty
  if (!otherUsers) return;

  return (
    <div className="overflow-auto flex-1">
      {otherUsers.map((user) => (
        <OtherUser key={user._id} user={user} />
      ))}
    </div>
  );
};

export default OtherUsers;



