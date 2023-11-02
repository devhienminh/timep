import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import { format } from "date-fns";

import { signIn, useSession } from "next-auth/react";

import getConfig from "next/config";
import { useEffect, useState } from "react";

function millisecondsToHHMMSS(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  return formattedTime;
}

export default function Point() {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const [currentTime, setCurrentTime] = useState(
    new Date(new Date().getTime() + 1000),
  );

  const time = useSelector((state) => state.point.time);
  const point = useSelector((state) => state.point.point);

  const access = useSelector((state) => state.access);

  const accessFormattedTime = format(new Date(access), "HH:mm:ss");
  const accessFormattedDate = format(new Date(access), "dd/MM/yyyy");

  const timeDifference = new Date(currentTime) - new Date(access);

  const currentFormattedTime = millisecondsToHHMMSS(timeDifference);

  const { publicRuntimeConfig } = getConfig();
  const { timeToPoint } = publicRuntimeConfig;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <section className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <figure>
            <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
              <div className="bg-white py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                  <div className="stats stats-vertical lg:stats-horizontal shadow">
                    <div className="stat w-60">
                      <div className="stat-title">Start At</div>
                      <div className="stat-value" suppressHydrationWarning>
                        {accessFormattedTime}
                      </div>
                      <div className="stat-desc" suppressHydrationWarning>
                        {accessFormattedDate}
                      </div>
                    </div>

                    <div className="stat w-60">
                      <div className="stat-title">Current Time</div>
                      <div className="stat-value" suppressHydrationWarning>
                        {currentFormattedTime}
                      </div>
                      <div className="stat-desc" suppressHydrationWarning>
                        1 point every 10 minutes
                      </div>
                    </div>

                    <div className="stat w-60">
                      <div className="stat-title">Your Point</div>
                      <div className="stat-value">{point}</div>
                      <div className="stat-desc"></div>
                      <progress
                        className="progress"
                        value={(100 / timeToPoint) * time}
                        max="100"
                      ></progress>
                    </div>
                  </div>
                </div>
              </div>
            </blockquote>
            {session ? (
              <figcaption className="mt-10">
                <Image
                  className="mx-auto h-10 w-10 rounded-full"
                  src={session.user.image}
                  width={92}
                  height={92}
                  alt="user"
                />
                <div className="mt-4 flex items-center justify-center space-x-3 text-base">
                  <div className="font-semibold text-gray-900">
                    {session.user.name}
                  </div>
                </div>
              </figcaption>
            ) : (
              <button
                onClick={() => signIn("google")}
                className="btn btn-block mt-5"
              >
                Login To Save
              </button>
            )}
          </figure>
        </div>
      </section>
    </>
  );
}
