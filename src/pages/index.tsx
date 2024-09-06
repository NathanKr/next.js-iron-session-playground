import { useState } from "react";
import axios from "axios";
import { COOKIE_NAME, MAX_AGE_MS } from "@/logic/constants";

const Home = () => {
  const [cookieValue, setCookieValue] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const setCookie = async () => {
    try {
      setError("");
      const response = await axios.post("/api/set-cookie");
      console.log(response.data.message);
    } catch (error) {
      setError("Error setting cookie");
      console.error("Error setting cookie:", error);
    }
  };

  const getCookie = async () => {
    try {
      setError("");
      const response = await axios.get("/api/get-cookie");
      setCookieValue(response.data.value1);
    } catch (error) {
      setError("Error getting cookie");
      console.error("Error getting cookie:", error);
    }
  };

  return (
    <div>
      <h1>Cookie Management</h1>
      <h4>Cookie Name : {COOKIE_NAME}</h4>
      <h4>Maxage : {MAX_AGE_MS} [ms]</h4>
      <button onClick={setCookie}>Set Cookie</button>
      <br />
      <button onClick={getCookie}>Get Cookie value1</button>
      {cookieValue && <p>Cookie Value: {cookieValue}</p>}
      <p style={{color:'red'}}>{error}</p>
    </div>
  );
};

export default Home;
