"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Player from "../components/Player";

const queryClient = new QueryClient();
const customContext = createContext(null);
export const useCustomContext = () => useContext(customContext);

export const ContextProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null);
  return (
    <>
      <customContext.Provider
        value={{ accessToken, currentTrack, setCurrentTrack }}
      >
        <QueryClientProvider client={queryClient}>
          <GetTooken setAccessToken={setAccessToken} />
          {children}
          {accessToken && (
            <Player accessToken={accessToken} currentTrack={currentTrack} />
          )}
        </QueryClientProvider>
      </customContext.Provider>
    </>
  );
};

const GetTooken = ({
  setAccessToken,
}: {
  setAccessToken: (token: any) => void;
}) => {
  const session: any = useSession();
  const queryClient: any = useQueryClient();
  const { data } = useQuery({
    queryKey: ["getAccessToken"],
    queryFn: () => setAccessToken(session?.data?.accessToken),
    retry: 10,
  });
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["getAccessToken"] }); // Fix: Change the argument to an array containing the string "getAccessToken"
  }, [session?.data?.accessToken, queryClient]);
  console.log({ data });
  return <></>;
};
