import React, { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const IdGeneration = createContext<{
  generateId: () => void;
  currentId: string;
}>({ generateId: () => null, currentId: "" });

export default function IdGenerationProvider(props: {
  children: React.ReactNode;
}) {
  const [currentId, setCurrentId] = useState<any>("");
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
