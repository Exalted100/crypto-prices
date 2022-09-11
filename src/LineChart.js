import Chart from "react-apexcharts";

const LineChart = ({ transactionsStats }) => {
  const plotData = {
    amounts: [],
    dates: [],
  };

  transactionsStats.map((item, itemIndex) => {
    plotData.amounts.push(item[1]);
    plotData.dates.push(new Date(item[0]).toLocaleDateString());
    return null;
  });

  const chartState = {
    series: [
      {
        name: "Price",
        data: plotData && plotData.amounts ? plotData.amounts : [],
      },
    ],
    options: {
      chart: {
        fontFamily: "Atyp, sans-serif",
        height: 400,
        toolbar: {
          show: false,
        },
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        colors: ["#5CD89F"],
      },
      grid: {
        row: {
          colors: ["transparent", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: plotData ? plotData.dates : [],
        labels: {
          style: {
            fontSize: "14px",
            fontWeight: 500,
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            fontSize: "14px",
            fontWeight: 500,
          },
          formatter: function (y) {
            if (typeof y !== "undefined") {
              return "$" + y.toLocaleString();
            }
            return y;
          },
        },
      },
      tooltip: {
        shared: true,
        intersect: false,
        style: {
          fontSize: "14px",
          fontFamily: "Atyp, sans-serif",
        },
        y: {
          formatter: function (y) {
            if (typeof y !== "undefined") {
              return "$" + y.toLocaleString();
            }
            return y;
          },
        },
      },
    },
  };
  return (
    <div>
      <Chart
        options={chartState.options}
        series={chartState.series}
        type="line"
        height={350}
      />
    </div>
  );
};

export default LineChart;
