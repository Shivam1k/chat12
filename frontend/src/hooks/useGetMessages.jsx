import React, { useEffect } from "react";
import axios from "axios";

import {useSelector,useDispatch} from "react-redux";

import { setMessages } from '../redux/messageSlice';

const useGetMessages = () => {
  const { selectedUser } = useSelector((store) => store.user);

  const dispatch = useDispatch()


  useEffect(() => {
    const fetchMessages = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(
          `http://localhost:8080/api/v1/message/${selectedUser?._id}`);
          dispatchEvent(setMessages(res.data))
        console.log(res.data);
        
        
      } catch (error) {
        console.log(error);
      }
    };
    fetchMessages();
  },[selectedUser?._id,setMessages]);
};

export default useGetMessages;



// import { useEffect } from "react";
// import axios from "axios";
// import { useSelector, useDispatch } from "react-redux";
// import { setMessages } from '../redux/messageSlice';

// const useGetMessages = () => {
//   const { selectedUser } = useSelector((store) => store.user);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const fetchMessages = async () => {
//       try {
//         axios.defaults.withCredentials = true;
//         const res = await axios.get(
//           `http://localhost:8080/api/v1/message/${selectedUser?._id}`
//         );
//         dispatch(setMessages(res.data));
//         console.log(res.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     if (selectedUser?._id) {
//       fetchMessages();
//     }
//   }, [selectedUser?._id, dispatch]);
// };

// export default useGetMessages;
