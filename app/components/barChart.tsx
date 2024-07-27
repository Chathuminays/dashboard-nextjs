import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

interface BarChartProps {
    lowCount: number;
    mediumCount: number;
    highCount: number;
}

const BarChart: React.FC<BarChartProps> = ({ lowCount, mediumCount, highCount }) => {
 
 const data = {
    labels: ['High', 'Medium', 'Low'],
    datasets: [
        {
            label: 'Tasks Priorities',
            data: [lowCount, mediumCount, highCount],
            backgroundColor: ['#EB5757', '#F2C94C', '#2F80ED'],
            borderWidth: 1,
        },
    ],
    };

 const options = {
    plugins: {
        legend: {
        display: false,
        },
    },
    scales: {
        x: {
        display: false,
        },
        y: {
        display: false,
        },
    },
    layout: {
    padding: {
        left: 90,
        right: 90,
        top: 10,
        bottom: 10,
    },
    },
    elements: {
        bar: {
            borderRadius: 10,
        },
    },
    barPercentage: 1,
  };

  return (

    <>
        <div className="max-w-sm mx-auto mt-3">
            <Bar data={data} options={options} />

            <div className="mt-2 mb-3 flex items-center gap-8 justify-center text-text_grey text-sm">
                <div className="flex items-center">
                    <span className="w-2 h-2 bg-text_red inline-block rounded-full mr-2"></span>
                    High
                </div>

                <div className="flex items-center">
                    <span className="w-2 h-2 bg-text_yellow inline-block rounded-full mr-2"></span>
                    Medium
                </div>

                <div className="flex items-center">
                    <span className="w-2 h-2 bg-text_blue inline-block rounded-full mr-2"></span>
                    Low
                </div>
            </div>
        </div>
    </>

  )
}

export default BarChart;