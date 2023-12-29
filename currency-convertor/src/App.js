import { useState } from "react";
import "./App.css";
import Input from "./components/Input";
import useCurrencyInfo from "./hooks/useCurrencyInfo";
import { IoSwapVertical } from "react-icons/io5";

function App() {
  const [ammount, setAmmount] = useState("");
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmt, setConvertedAmt] = useState(0);

  const currenctInfo = useCurrencyInfo(from);

  const options = Object.keys(currenctInfo);

  const swap = () => {
    setFrom(to);
    setTo(from);
    setAmmount(convertedAmt);
    setConvertedAmt(ammount);
  };

  const handleConvert = () => {
    setConvertedAmt(ammount * currenctInfo[to]);
  };

  return (
    <div
      className="w-full h-screen flex justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/7078666/pexels-photo-7078666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
      }}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleConvert();
        }}
      >
        <div className="w-full mb-8">
          <Input
            className="font-bold text-gray-700 text-xl"
            label="From"
            ammount={ammount}
            currencyOptions={options}
            onCurrencyChange={(currency) => setFrom(currency)}
            selectCurrency={from}
            onAmountChange={(ammount) => setAmmount(ammount)}
          />
        </div>
        <div className="relative w-full h-0.5">
          <button
            type="button"
            className="absolute text-xl left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full font-bold bg-blue-600 text-white px-3 py-3"
            onClick={swap}
          >
            <IoSwapVertical />
          </button>
        </div>
        <div className="w-full mt-8 mb-4">
          <Input
            className="font-bold text-gray-700 text-xl"
            label="To"
            ammount={convertedAmt}
            currencyOptions={options}
            onCurrencyChange={(currency) => setTo(currency)}
            selectCurrency={to}
            amountDisable
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white mt-4 px-4 py-3 rounded-lg"
        >
          Convert {from.toUpperCase()} to {to.toUpperCase()}
        </button>
      </form>
    </div>
  );
}

export default App;
