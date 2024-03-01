import { useState, useCallback, useRef, useEffect } from "react";
import "./App.css";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaRegCopy } from "react-icons/fa";
import { RxDividerHorizontal } from "react-icons/rx";

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [num, setNum] = useState(false);
  const [char, setChar] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false); // State to manage tooltip visibility

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (num) str += "0123456789";
    if (char) str += "!@#$%^&*-_~";

    for (let i = 1; i <= length; i++) {
      let index = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(index);
    }
    setPassword(pass);
  }, [length, num, char, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, num, char, setPassword]);

  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
    setShowTooltip(true); // Show tooltip when password is copied
    setTimeout(() => {
      setShowTooltip(false); // Hide tooltip after 2 seconds
    }, 2000);
  }, [password]);

  return (
    <>
      <div className="main h-screen">
        <h1 className="text-3xl font-semibold text-white text-center pt-[18vw]">
          <span className="flex items-center justify-center p-2">
            {" "}
            <RiLockPasswordFill />
          </span>
          Password Generator{" "}
        </h1>

        <div
          id="password-container"
          className="w-full max-w-md mx-auto shadow-lg px-10 py-5 my-8 mt-3 text-gray-600 bg-zinc-800 rounded-md"
        >
          <div className="flex shadow rounded-lg overflow-hidden mb-4 relative">
            {" "}
            {/* Added relative for positioning tooltip */}
            <input
              type="text"
              placeholder="Password"
              value={password}
              className="outline-none w-full h-[5vh] py-1 px-3"
              readOnly
              ref={passwordRef}
            />
            <button
              onClick={copyPassword}
              className="outline-none bg-zinc-900 text-white px-3 py-0.5 shrink-0 hover:bg-zinc-800"
            >
              <FaRegCopy />
            </button>
            {showTooltip && (
              <span className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 mt-2 rounded shadow">
                Copied!
              </span>
            )}
          </div>

          <div className="flex text-lg gap-x-10">
            <div className="flex-items-center gap-x-1 text-gray-100">
              <input
                type="range"
                min={8}
                max={40}
                className="cursor-pointer"
                value={length}
                onChange={(e) => setLength(e.target.value)}
              />
              <label>Length: {length}</label>
            </div>

            <div className="flex-items-center gap-x-1 text-gray-100">
              <input
                type="checkbox"
                defaultChecked={char}
                className="cursor-pointer"
                onChange={() => {
                  setChar((prev) => !prev);
                }}
              />
              <label>Characters</label>
            </div>
            <div className="flex-items-center gap-x-1 text-gray-100">
              <input
                type="checkbox"
                defaultChecked={num}
                className="cursor-pointer"
                onChange={() => {
                  setNum((prev) => !prev);
                }}
              />
              <label>Numbers</label>
            </div>
          </div>
        </div>
        <h1 className="flex flex-col text-white items-center justify-center mt-[280px]">
          <RxDividerHorizontal className="text-gray-800 font-extrabold" />

          <div className="flex space-x-1">
            <p> Created by </p>
            <p>
              <a
                className="text-yellow-300"
                href="https://gauravgarwa.tech"
                target="_blank"
              >
                {" "}
                Gaurav Garwa
              </a>
            </p>
          </div>
        </h1>
      </div>
    </>
  );
}

export default App;
