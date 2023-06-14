import { useState, useEffect, useRef } from "react";
import arrow from "./assets/images/icon-arrow.svg";
import Map from "./components/Map";
import { getPostion } from "./libs/getPosition";

function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [position, setPosition] = useState([0, 0]);
  const [location, setLocation] = useState({
    ip: "",
    timezone: "",
    isp: "",
    city: "",
  });

  useEffect(() => {
    const getLatandLong = async () => {
      const res = await getPostion();

      setPosition([Number(res.location.lat), Number(res.location.lng)]);
      setLocation({
        ip: res.ip,
        timezone: res.location.timezone,
        isp: res.isp,
        city: res.location.city,
      });
    };
    getLatandLong();
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const inputValue = inputRef.current?.value;
    const getNewPos = async () => {
      const res = await getPostion(inputValue);
      if (res) {
        setPosition([Number(res.location.lat), Number(res.location.lng)]);
        setLocation({
          ip: res.ip,
          timezone: res.location.timezone,
          isp: res.isp,
          city: res.location.city,
        });

        if (inputRef.current) inputRef.current.value = "";
      }
    };
    getNewPos();
  }
  return (
    <main className="relative min-h-screen bg-green-100">
      <header className='flex  flex-col py-8 gap-8 items-center bg-[url("assets/images/pattern-bg-desktop.png")] max-sm:bg-[url("assets/images/pattern-bg-mobile.png")] bg-cover bg-no-repeat bg-center min-h-[280px]'>
        <h1 className="font-medium text-3xl text-[#FFFFFF]">
          IP Adress Tracker
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex items-center  bg-white  justify-between w-[85%] md:w-[33%]  pl-4 rounded-lg"
        >
          <input
            ref={inputRef}
            pattern="^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$"
            className="bg-transparent border-none outline-none   lg:w-full lg:text-lg"
            type="text"
            placeholder="Search for any IP address or domain"
          />
          <button className="bg-black w-[58px] h-[58px] flex items-center justify-center rounded-r-lg">
            <img src={arrow} alt="arrow" />
          </button>
        </form>

        <div className=" absolute z-50  top-[200px] bg-white w-[60%] max-sm:w-[82%] flex min-h-[160px] items-center justify-around max-sm:justify-center rounded-lg flex-wrap gap-3 max-sm:flex-col px-4 max-sm:py-6">
          <div className="flex flex-col gap-2 max-sm:items-center">
            <span className="font-bold text-[11px] tracking-[1.75px] uppercase opacity-50">
              IP address
            </span>
            <span className="font-medium text-2xl ">{location.ip}</span>
          </div>

          <div className="flex  gap-8 items-center  ">
            <div className="h-[75px] w-[1px] bg-gray-200 max-sm:hidden" />
            <div className="flex flex-col gap-2 max-sm:items-center">
              <span className="font-bold text-[11px] tracking-[1.75px] uppercase opacity-50">
                Location
              </span>
              <span className="font-medium text-2xl ">{location.city}</span>
            </div>
          </div>

          <div className="flex gap-8 items-center">
            <div className="h-[75px] w-[1px] bg-gray-200 max-sm:hidden" />
            <div className="flex flex-col gap-2 max-sm:items-center">
              <span className="font-bold text-[11px] tracking-[1.75px] uppercase opacity-50">
                Timezone
              </span>
              <span className="font-medium text-2xl ">{location.timezone}</span>
            </div>
          </div>

          <div className="flex gap-8 items-center">
            <div className="h-[75px] w-[1px] bg-gray-200 max-sm:hidden" />
            <div className="flex flex-col gap-2 max-sm:items-center">
              <span className="font-bold text-[11px] tracking-[1.75px] uppercase opacity-50 ">
                ISP
              </span>
              <span className="font-medium text-2xl text-center ">
                {location.isp}
              </span>
            </div>
          </div>
        </div>
      </header>
      <Map position={position} />
    </main>
  );
}

export default App;
