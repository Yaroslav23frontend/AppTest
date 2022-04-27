import React, { useContext, useEffect, useState } from "react";

const URLContext = React.createContext();

export function useURL() {
  return useContext(URLContext);
}
export default function URLProivider({ children }) {
  const [url, setUrl] = useState();
  const value = {
    url,
    setUrl,
  };
  return <URLContext.Provider value={value}>{children}</URLContext.Provider>;
}
