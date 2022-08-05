import React from "react";
import Chart from "chart.js/auto";
import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import Link from "next/link";

export default function BarChart({ dataValue, select }) {
  const [dataValues, setDataValues] = useState([]);
  const [times, setTimes] = useState([]);
  const [query, setQuery] = useState({
    startDate: "",
    endDate: "",
    enodebId: "",
    cellId: "",
  });
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuery({
      ...query,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getData(query);
  };
  async function getData(query) {
    try {
      let response = await fetch(
        "http://localhost:3000/graph?" + new URLSearchParams(query)
      );
      const data = await response.json();
      let tempData = [];
      let tempTimes = [];
      let tempBoth = [];
      data.forEach((el) => {
        tempTimes.push(el.resultTime.time);
        tempData.push(el.availability);
        tempBoth.push({
          x: Number(el.resultTime.time[0] + el.resultTime.time[1]),
          y: el.availability,
        });
      });
      setDataValues(tempBoth);
      setTimes(tempTimes);
    } catch {}
  }
  useEffect(() => {
    getData();
  }, []);

  let options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Availability over time",
      },
      datalabels: {
        font: {
          size: 24,
        },
      },
    },
  };

  let data = {
    labels: times,
    datasets: [
      {
        label: "Availability",
        data: dataValues,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],

    font: {
      size: 24,
    },
  };

  return (
    <div>
      <Link href="/">Back to Home</Link>
      <form onSubmit={handleSubmit}>
        <label>Enode Id:</label>
        <input
          type="text"
          onChange={handleChange}
          value={query.enodebId}
          name="enodebId"
          maxlength="30"
          style={{ marginRight: 5 }}
        />
        <label>Cell Id:</label>
        <input
          onChange={handleChange}
          value={query.cellId}
          type="text"
          name="cellId"
          maxlength="30"
          style={{ marginRight: 5 }}
        />
        <label for="startDate">Start Date:</label>
        <input
          onChange={handleChange}
          value={query.startDate}
          type="date"
          name="startDate"
          style={{ marginRight: 5 }}
        />
        <label for="birthday">End Date:</label>
        <input
          onChange={handleChange}
          value={query.endDate}
          type="date"
          name="endDate"
          style={{ marginRight: 5 }}
        />
        <input type="submit" name="" value="Check availability" />
      </form>
      <Line options={options} data={data} />;
    </div>
  );
}
