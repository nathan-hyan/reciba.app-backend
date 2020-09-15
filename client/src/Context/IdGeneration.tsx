import React, { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const IdGeneration = createContext<{
  generateId: () => void;
  currentId: string;
}>({ generateId: () => console.log("ey"), currentId: "" });

export default function IdGenerationProvider(props: {
  children: React.ReactNode;
}) {
  const [currentId, setCurrentId] = useState<any>("");

  /**
   * Generates a new id for connecting two sessions together
   */
  const generateId = () => {
    const newId = uuidv4();
    setCurrentId(newId);
  };

  return (
    <IdGeneration.Provider value={{ generateId, currentId }}>
      {props.children}
    </IdGeneration.Provider>
  );
}
