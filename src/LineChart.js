import Chart from "react-apexcharts";

const LineChart = ({ transactionsStats }) => {
    // console.log("data", transactionsStats)
    // const plotData = {
    //     amounts: [],
    //     dates: [],
    // };
    const plotData = {
        amounts: [],
        dates: [],
    }
    transactionsStats.map((item, itemIndex) => {
        // plotData.amounts.push(item.totalAmount / 100);
        // plotData.dates.push(item.key);
        plotData.amounts.push(item[1]);
        plotData.dates.push(new Date(item[0]).toLocaleDateString());
        return null
    }
    );

    // plotData.dates = plotData.dates.sort(function (a, b) {
    //     const date1 = new Date(a);
    //     const date2 = new Date(b);

    //     return date2 - date1;
    // });

    // console.log("type", typeof(plotData.dates[0]))

    const chartState = {
        series: [
            {
                name: "Price",
                data:
                    plotData && plotData.amounts
                        ? plotData.amounts
                        // ? plotData.amounts.slice(plotData.amounts.length - 10, plotData.amounts.length)
                        // ? plotData.amounts.slice(0, 7)
                        : [],
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
            //   title: {
            //     text: 'All Transactions',
            //     align: 'left',
            //     style: {
            //         fontSize: '20px',
            //       },
            //   },
            grid: {
                row: {
                    colors: ["transparent", "transparent"], // takes an array which will be repeated on columns
                    opacity: 0.5,
                },
            },
            xaxis: {
                categories: plotData ? plotData.dates : [],
                // categories: plotData ? plotData.dates.slice(plotData.dates.length - 10, plotData.dates.length) : [],
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
            //   yaxis: {

            //   },
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
