import React, { createContext, useContext } from 'react';

const TestContext = createContext('hello');
export function TestProvider({ children }: { children: React.ReactNode }) {
  return <TestContext.Provider value="hello">{children}</TestContext.Provider>;
}
export function useTest() {
  return useContext(TestContext);
}
