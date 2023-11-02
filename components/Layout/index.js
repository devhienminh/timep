import { useDispatch } from "react-redux";

import { incrementPoint, setDefaultPoint } from "@/redux/slice/pointSlice";
import { setTimeAccess } from "@/redux/slice/accessSlice";

import { useEffect, useState } from "react";

import getConfig from "next/config";
import { useSession } from "next-auth/react";

import io from "socket.io-client";

import Navbar from "./Navbar";
import Footer from "./Footer";

const { publicRuntimeConfig } = getConfig();
const { server } = publicRuntimeConfig;

export default function Layout({ children }) {
  const dispatch = useDispatch();
  const { data: session } = useSession();

  useEffect(() => {
    const socket = io(server, {
      query: {
        email: session ? session.user.email : "",
      },
    });

    socket.on("access-start", ({ time, point }) => {
      console.log(time);
      dispatch(setTimeAccess(time));
      dispatch(setDefaultPoint(point));
    });
  }, [session]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(incrementPoint());
    }, 1000);
    return () => clearInterval(intervalId);
  }, [dispatch]);

  return (
    <>
      <div className="container mx-auto">
        <header>
          <Navbar />
        </header>
        <main className="p-3">{children}</main>
      </div>
      <Footer />
    </>
  );
}
