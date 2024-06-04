import React, { createContext, useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";
import axios from "axios";
import * as SecureStore from 'expo-secure-store';

import { router } from 'expo-router';
// Create the context
export const VeeContext = createContext();

// Provide a default value (optional)
const defaultValues = {
  isOpen: false,
  test: "Default test value",
  username: "",
};

export const VeeContextProvider = ({ children }) => {
  const navigation = router;
  const [isOpen, setIsOpen] = useState(defaultValues.isOpen);
  const [test, setTest] = useState(defaultValues.test);
  const [username, setUsername] = useState("");
  const [userid, setUserid] = useState("");
  const [employee, setEmployee] = useState([]);
  const [visitors, setVisitors] = useState([]);
  const [myqrcode, setQrcode] = useState([]);
  const [loadingmyqrcode, setLoadingqr] = useState(false);
  const [employeedataloaded, setemployeedataloaded] = useState(false);
  const [awaiting, setAwaiting] = useState([]);
  const [pendingApproval, setPendingApproval] = useState([]);
  const [reshedule, setReshedule] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [plans, setPlans] = useState([]);
  const [visitordataloaded, setVisitordataloaded] = useState(false);
  const [companySetup, setCompanySetup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [logo, setLogo] = useState();
  const [integrations, setIntegrations] = useState([]);
  const [isvisitorbaropen, setIsVisitorBarOpen] = useState(false);
  const [sideloading, setSideloading] = useState(true);
  const [visitationdata, setVisitationdata] = useState([]);

  const [loadingaccept, setLoadingAccept] = useState(false);
  const [datatoken, setDatatoken] = useState(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(prevState => !prevState);
    setIsOverlayOpen(prevState => !prevState);
  };

  const toggleVisitorBar = async (ref) => {
    setIsVisitorBarOpen(prevState => !prevState);

    if (ref !== 'close') {
      setSideloading(true);
      setVisitationdata([]);
      try {
        const payload = { post_id: ref };
        const endpoint = 'https://veezitorbackend.vercel.app/getvisitordetails';
        const response = await axios.post(endpoint, payload);

        if (response.status === 200) {
        
          setVisitationdata(response.data?.visitorsdata);
          console.log('Visitation details fetched successfully');
        }
      } catch (error) {
        if (error.response) {
          console.error(error.response.data.message);
        } else if (error.request) {
          console.error('No response received from the server.');
        } else {
          console.error(error.message || 'No response received from the server.');
        }
      } finally {
        setSideloading(false);
      }
    }
  };


  const timeAgo = (date) => {
    const now = new Date();
    const givenDate = new Date(date);
  
    // Check if the provided date is valid
    if (isNaN(givenDate.getTime())) {
      return "now";
    }
  
    const secondsPast = Math.floor((now - givenDate) / 1000);
  
    if (secondsPast < 60) {
      return "now";
    }
    if (secondsPast < 3600) {
      const minutes = Math.floor(secondsPast / 60);
      return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
    }
    if (secondsPast < 86400) {
      const hours = Math.floor(secondsPast / 3600);
      return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    }
    if (secondsPast < 604800) {
      const days = Math.floor(secondsPast / 86400);
      return `${days} day${days === 1 ? '' : 's'} ago`;
    }
    if (secondsPast < 2592000) {
      const weeks = Math.floor(secondsPast / 604800);
      return `${weeks} week${weeks === 1 ? '' : 's'} ago`;
    }
    if (secondsPast < 31536000) {
      const months = Math.floor(secondsPast / 2592000);
      return `${months} month${months === 1 ? '' : 's'} ago`;
    }
    const years = Math.floor(secondsPast / 31536000);
    return `${years} year${years === 1 ? '' : 's'} ago`;
  };


  async function acceptVisitor(ref) {
    if (ref !== 'close') {
      setLoadingAccept(true);
      try {
        const payload = { post_id: ref };
        const endpoint = '/acceptvisitor';
        const response = await axiosInstance.post(endpoint, payload);

        if (response.status === 200) {
          console.log('response', response);
          console.log('Visitation details updated successfully');
          setVisitationdata(response.data?.visitorsdata);
          setVisitors(response.data?.visitorserializer);
        }
        setLoadingAccept(false);
        toggleVisitorBar('close');
      } catch (error) {
        if (error.response) {
          console.error(error.response.data.message);
        } else if (error.request) {
          console.error('No response received from the server.');
        } else {
          console.error(error.message || 'No response received from the server.');
        }
      } finally {
        setLoadingAccept(false);
      }
    }
  };

  async function checkUsername() {
    let accessToken = await SecureStore.getItemAsync('access_token');
    if (accessToken) {
      console.log(accessToken)
      const decodedDetails = jwtDecode(accessToken).username;
      const decodedId = jwtDecode(accessToken).user_id;
      setUsername(decodedDetails);
      setUserid(decodedId);
      console.log("rannnn");
    }
  };

  const fetchEmployeeData = async () => {
    let accessToken = await SecureStore.getItemAsync('access_token');
    if (accessToken) {
      try {
        const response = await axiosInstance.get("/employee");
        if (response.status === 200) {
          console.log('Successful');
          setEmployee(response.data);
          setemployeedataloaded(true);
        } else {
          throw new Error("Network response was not ok");
        }
      } catch (error) {
        console.error("An Error Occurred");
      }
    }
  };

  async function refreshAccessToken() {
    try {
      const refreshToken = await SecureStore.getItemAsync('refresh_token');
      if (!refreshToken) {
        throw new Error("Refresh token not found");
      }
      const response = await axios.post(
        "https://veezitorbackend.vercel.app/api/token/refresh/",
        { refresh: refreshToken }
      );
      const newAccessToken = response.data.access;
      const newRefreshToken = response.data.refresh;
      await SecureStore.setItemAsync('access_token', newAccessToken);
      await SecureStore.setItemAsync("refresh_token", newRefreshToken);
      console.log("token refreshed");
      return newAccessToken;
    } catch (error) {
      throw new Error("Failed to refresh access token");
    }
  };

  const axiosInstance = axios.create({
    baseURL: "https://veezitorbackend.vercel.app/",
    headers: {
      "Content-Type": "application/json",
    },
  });

  axiosInstance.interceptors.request.use(
    async (config) => {
      const access = await SecureStore.getItemAsync('access_token');
      if (access) {
        const decodedToken =  jwtDecode(access);
        // const arrayToken = access.split(".");
        // const tokenPayload = JSON.parse(atob(arrayToken[1]));
        // const isExpired =
        const isExpired =   Math.floor(new Date().getTime() / 1000) >= decodedToken.exp;
        if (isExpired) {
          try {
            const newAccessToken = await refreshAccessToken();
            config.headers.Authorization = `Bearer ${newAccessToken}`;
            return config;
          } catch (error) {
            console.error("Failed to refresh access token:", error);
            setTimeout(() => {
              navigation.replace("/(auth)/login");
            }, 2000);
            return Promise.reject(new Error("Failed to refresh access token"));
          }
        } else {
          config.headers.Authorization = `Bearer ${access}`;
        }
      } else {
        console.log("Access token not found");
        navigation.replace("/(auth)/login");
        // setTimeout(() => {
        //   navigation.replace("/(auth)/login");
        // }, 1000);
        return Promise.reject(new Error("Access token not found"));
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
  );

  async function fetchCompanySetup() {
    try {
      setLoading(false);
      const response = await axiosInstance.get("/Companysetup");
      console.log("it rannnn", response.data);
      setCompanySetup(response?.data?.company_obj);
      console.log('response?.data?.company_obj', response?.data?.company_obj)
      await SecureStore.setItemAsync('userdata_token', response.data.token);
      setLoading(false);
      return response.data;
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        console.error("Kindly Setup Your Company Info.");
        setError(true);
      } else {
        console.error(`An error occurred: ${error.message}`);
      }
    }
  };

  const fetchQrCode = async () => {
    let accessToken = await SecureStore.getItemAsync('access_token');
    if (accessToken) {
      try {
        const response = await axiosInstance.get("/userqrcards");
        if (response.status === 200) {
          setQrcode(response.data);
          setLoadingqr(true);
          console.log(myqrcode);
        } else {
          console.error("An Error Occurred");
        }
      } catch (error) {
        console.error("An Error Occurred");
      }
    }
  };

  const fetchIntegrations = async () => {
    let accessToken = await SecureStore.getItemAsync('access_token');
    if (accessToken) {
      try {
        const response = await axiosInstance.get("/userintegrations");
        if (response.status === 200) {
          setIntegrations(response.data);
          setLoading(false);
          console.log(integrations);
        } else {
          console.error("An Error Occurred");
        }
      } catch (error) {
        console.error("An Error Occurred");
      }
    }
  };

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync('access_token');
    await SecureStore.deleteItemAsync('refresh_token');
    setTimeout(() => {
      navigation.replace("/(auth)/login");
    }, 2000);
  };

  const fetchPendingApprovals = async () => {
    let accessToken = await SecureStore.getItemAsync('access_token');
    if (accessToken) {
      try {
        const response = await axiosInstance.get("/pending-approval");
        if (response.status === 200) {
          setPendingApproval(response.data);
        } else {
          console.error("An Error Occurred");
        }
      } catch (error) {
        console.error("An Error Occurred");
      }
    }
  };

  const fetchVisitors = async () => {
    setVisitordataloaded(false)
    let accessToken = await SecureStore.getItemAsync('access_token');
    if (accessToken) {
      try {
        const response = await axiosInstance.get("/visitor");
        if (response) {
          console.log("Visitors", response.data);
          setVisitors(response.data);
          const myvisitors = response.data
          if(myvisitors){
            const pendingVisitors = myvisitors.filter(
              (visitor) => visitor.status == "pending_approval"
            );
            const resheduleVisitors = myvisitors.filter(
              (visitor) => visitor.status === "reshedule"
            );
            const inProgressVisitors = myvisitors.filter(
              (visitor) => visitor.status === "inprogress"
            );
            const awaitingvisitors = myvisitors.filter(
              (visitor) => visitor.status === "awaiting_confirmation"
            );
        
            setPendingApproval(pendingVisitors);
            setReshedule(resheduleVisitors);
            setInProgress(inProgressVisitors);
            setAwaiting(awaitingvisitors);
            setVisitordataloaded(true);
          }
    
        } else {
          console.error("An Error Occurred");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const fetchReshedule = async () => {
    let accessToken = await SecureStore.getItemAsync('access_token');
    if (accessToken) {
      try {
        const response = await axiosInstance.get("/reshedule-visit");
        if (response.status === 200) {
          setReshedule(response.data);
        } else {
          console.error("An Error Occurred");
        }
      } catch (error) {
        console.error("An Error Occurred");
      }
    }
  };

  const fetchPlans = async () => {
    let accessToken = await SecureStore.getItemAsync('access_token');
    if (accessToken) {
      try {
        const response = await axiosInstance.get("/userplans");
        if (response) {
          setPlans(response.data);
        } else {
          console.error("An Error Occurred");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const fetchInProgress = async () => {
    let accessToken = await SecureStore.getItemAsync('access_token');
    if (accessToken) {
      try {
        const response = await axiosInstance.get("/in-progress");
        if (response.status === 200) {
          setInProgress(response.data);
        } else {
          console.error("An Error Occurred");
        }
      } catch (error) {
        console.error("An Error Occurred");
      }
    }
  };

  const fetchAwaiting = async () => {
    let accessToken = await SecureStore.getItemAsync('access_token');
    if (accessToken) {
      try {
        const response = await axiosInstance.get("/awaiting-checkin");
        if (response.status === 200) {
          setAwaiting(response.data);
        } else {
          console.error("An Error Occurred");
        }
      } catch (error) {
        console.error("An Error Occurred");
      }
    }
  };


  async function fetchuserdata() {

    let accessToken = await SecureStore.getItemAsync('access_token');
    if(accessToken){
      try {
        setLoading(true);
        const response = await axiosInstance.get("/Dashboard");
        console.log("it rannnn", response.data); // Assuming the response data contains useful 
        setEmployee(response?.data?.employee_data);
        setIntegrations(response?.data?.integration);
        setQrcode(response?.data?.qrcards);
        setVisitors(response?.data?.visitor_serializer);
        setLoading(false);
        setLoadingqr(true);
        setemployeedataloaded(true);
        const myvisitors = response?.data?.visitor_serializer
   
        if(myvisitors){
          const pendingVisitors = myvisitors.filter(
            (visitor) => visitor.status == "pending_approval"
          );
          const resheduleVisitors = myvisitors.filter(
            (visitor) => visitor.status === "reshedule"
          );
          const inProgressVisitors = myvisitors.filter(
            (visitor) => visitor.status === "inprogress"
          );
          const awaitingvisitors = myvisitors.filter(
            (visitor) => visitor.status === "awaiting_confirmation"
          );
      
          setPendingApproval(pendingVisitors);
          setReshedule(resheduleVisitors);
          setInProgress(inProgressVisitors);
          setAwaiting(awaitingvisitors);
          setVisitordataloaded(true);
        };
        setVisitordataloaded(true);
        console.log("Successfully Fetched User Data.");
        return response.data; // Return the data for further use if needed
      } catch (error) {
        setLoading(false);
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          console.log("Kindly Setup Your Company Info.");
          setError(true);
        } else {
          console.error(`An error occurred: ${error.message}`);
      
        }
        // Optionally, handle the error in a way that suits your application
        // throw error; // Rethrow the error if you want to handle it later
      }
    }



  };

  // Fetch data on component mount
  useEffect(() => {
    checkUsername();
fetchuserdata();
//     fetchPlans();
    fetchCompanySetup();

  }, []);

  return (
    <VeeContext.Provider
      value={{
        isOpen,
        setIsOpen,
        test,
        setTest,
        fetchCompanySetup,
        username,
        setUsername,
        toggleSidebar,
        isSidebarOpen,
        setIsSidebarOpen,
        isOverlayOpen,
        setIsOverlayOpen,
        employee,
        setEmployee,
        visitors,
        setVisitors,
        myqrcode,
        setQrcode,
        loadingmyqrcode,
        setLoadingqr,
        employeedataloaded,
        setemployeedataloaded,
        awaiting,
        setAwaiting,
        pendingApproval,
        setPendingApproval,
        reshedule,
        setReshedule,
        inProgress,
        setInProgress,
        plans,
        setPlans,
        visitordataloaded,
        setVisitordataloaded,
        companySetup,
        setCompanySetup,
        loading,
        setLoading,
        error,
        setError,
        logo,
        setLogo,
        integrations,
        setIntegrations,
        isvisitorbaropen,
        setIsVisitorBarOpen,
        toggleVisitorBar,
        sideloading,
        setSideloading,
        visitationdata,
        setVisitationdata,
        acceptVisitor,
        handleLogout,
        fetchPendingApprovals,
        fetchVisitors,
        fetchReshedule,
        fetchPlans,
        fetchInProgress,
        fetchAwaiting,
        datatoken,
        setDatatoken,
        timeAgo
      }}
    >
      {children}
    </VeeContext.Provider>
  );
};
