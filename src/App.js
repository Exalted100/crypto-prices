import LineChart from "./LineChart";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [plotData, setPlotData] = useState([]);
  const dataStart = 1392577232;
  const [endDate, setEndDate] = useState("");
  const [dataEnd, setDataEnd] = useState(Math.floor(Date.now() / 1000));
  const [numberOfDaysForPlotData, setNumberOfDaysForPlotData] = useState(10);
  const [cryptocurrency, setCryptocurrency] = useState("bitcoin");

  const onNumberOfDaysChange = (e) => {
    setNumberOfDaysForPlotData(e.target.value);
  };

  const dateToTimeStamp = (date) => {
    return Date.parse(date) / 1000;
  };

  const onEndDateChange = (e) => {
    setEndDate(e.target.value);
    setDataEnd(dateToTimeStamp(e.target.value));
  };

  useEffect(() => {
    (async () => {
      try {
        const params = {
          vs_currency: "usd",
          from: dataStart,
          to: dataEnd,
        };

        const cryptoStats = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${cryptocurrency}/market_chart/range`,
          { params }
        );

        setPlotData(
          cryptoStats.data.prices.slice(
            cryptoStats.data.prices.length - numberOfDaysForPlotData,
            cryptoStats.data.prices.length
          ) || []
        );
      } catch (error) {}
    })();
  }, [cryptocurrency, dataEnd, dataStart, numberOfDaysForPlotData]);

  return (
    <div className="px-5 md:px-20 pt-10">
      <h1 className="text-2xl font-semibold mb-10 underline">Crypto Prices</h1>

      <label className="font-semibold mr-5 mb-5">
        End Date:{" "}
        <input
          onChange={onEndDateChange}
          value={endDate}
          type="date"
          name="end-date"
          className="shadow-4xl border-2 border-black px-2 py-1 font-normal cursor-pointer mb-5 outline-none"
        />
      </label>

      <label className="font-semibold mr-5 mb-5">
        Number of days:{" "}
        <input
          value={numberOfDaysForPlotData}
          onChange={onNumberOfDaysChange}
          type="number"
          className="shadow-4xl border-2 border-black w-20 px-2 py-1 font-normal mb-5 outline-none"
        />
      </label>

      <label className="font-semibold mb-5">
        Set Coin:{" "}
        <select
          value={cryptocurrency}
          onChange={(e) => setCryptocurrency(e.target.value)}
          className="shadow-4xl border-2 border-black px-2 py-1 font-normal cursor-pointer mb-5 outline-none"
        >
          <option value="bitcoin">Bitcoin (BTC)</option>
          <option value="ethereum">Ethereum (ETH)</option>
          <option value="litecoin">Litecoin (LTC)</option>
          <option value="binancecoin">Binance Coin (BNB)</option>
        </select>
      </label>

      <div className="w-full border-2 rounded border-black shadow-4xl relative p-2 md:p-6 mt-5 mb-6">
        <LineChart transactionsStats={plotData} />
      </div>
    </div>
  );
}

export default App;
