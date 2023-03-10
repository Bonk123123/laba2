import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
};

export const data1 = [
  {
    id: 1,
    value: 1200,
  },
  {
    id: 2,
    value: 2340,
  },
  {
    id: 3,
    value: 1220,
  },
  {
    id: 4,
    value: 1440,
  },
  {
    id: 5,
    value: 1110,
  },
  {
    id: 6,
    value: 1510,
  },
];
export const labels = [1, 2, 3, 4, 5];

const App = () => {
  const avg = (data) => {
    let avg = 0;
    for (let i = 0; i < data.length; i++) {
      avg += data[i];
    }
    avg = avg / data.length;
    return avg;
  };

  const [data, setData] = React.useState({
    labels: data1.map((item) => item.id),
    datasets: [
      {
        label: "Значение",
        data: data1.map((item) => item.value),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  });
  const [mydata, setMydata] = React.useState(data.datasets[0].data);
  const [privateData, setPrivateData] = React.useState({
    labels: mydata.map((item, i) => i + 1),
    datasets: [
      {
        label: "Значение",
        data: mydata,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  });

  const [maximum, setMaximum] = React.useState(0);
  const [minimum, setMinimum] = React.useState(0);
  const [multiplicity, setMultiplicity] = React.useState(0);
  const [newState, setNewState] = React.useState(0);
  const [average, setAverage] = React.useState(0);

  const createData = () => {
    setMydata((prev) => prev.concat(parseInt(newState)));
  };

  const change = () => {
    // setMydata((prev) => prev.push(1000));
    setMydata((prev) =>
      prev.filter(
        (item) =>
          item >= minimum && item <= maximum && item % multiplicity === 0
      )
    );
  };

  React.useEffect(() => {
    const sum = mydata.reduce((a, b) => a + b, 0);
    const avg = sum / mydata.length || 0;
    setAverage(avg);
    setPrivateData({
      labels: mydata.map((item, i) => i + 1),
      datasets: [
        {
          label: "Значение",
          data: mydata,
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ],
    });
  }, [mydata]);

  return (
    <div>
      <div>
        <div className="border absolute left-1/2">
          <input
            value={newState}
            onChange={(e) => setNewState(e.target.value)}
          />
          <button onClick={createData}>добавить данные</button>
        </div>
        <div className="flex items-center justify-center gap-10">
          <table className="w-1/4">
            <thead>
              <tr className="border text-center">
                <th>id</th>
                <th>value</th>
                <th>del</th>
              </tr>
            </thead>
            <tbody>
              {mydata.map((item, i) => {
                return (
                  <tr
                    style={{
                      backgroundColor:
                        Math.abs(item - mydata[i - 1]) / mydata[i - 1] > 0.2
                          ? "#f95454"
                          : "white",
                    }}
                    className="border text-center"
                    key={item.id}
                  >
                    <td>{i + 1}</td>
                    <td>{item}</td>
                    <td
                      className="cursor-pointer"
                      onClick={() => {
                        setMydata((prev) =>
                          prev.filter((item, ind) => ind != i)
                        );
                      }}
                    >
                      &#10005;
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className=" w-1/2 flex-col justify-start mt-6">
            <Bar options={options} data={privateData} />
            <p>
              среднее значение:{" "}
              {(mydata.reduce((a, b) => a + b, 0) / mydata.length).toFixed(2)}
            </p>
            <div className="flex w-full justify-center items-center">
              <div className="flex-col h-1/2 items-center justify-center">
                <label>maximum</label>
                <input
                  className="border flex"
                  defaultValue={0}
                  value={maximum}
                  onChange={(e) => setMaximum(e.target.value)}
                />
                <label>minimum</label>
                <input
                  className="border flex"
                  defaultValue={0}
                  value={minimum}
                  onChange={(e) => setMinimum(e.target.value)}
                />
                <label>multiplicity</label>
                <input
                  className="border flex"
                  defaultValue={0}
                  value={multiplicity}
                  onChange={(e) => setMultiplicity(e.target.value)}
                />
                <button className="text-center border" onClick={change}>
                  build
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
