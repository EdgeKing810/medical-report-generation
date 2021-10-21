import React, { useState, useEffect } from 'react';

import {Bar, Doughnut, HorizontalBar, Line, Pie, Polar} from 'react-chartjs-2';
import dataset from '../datasets/data_testing';

export default function Graph() {
    const [state, setState] = useState({});
    const [type, setType] = useState(0);

    const [gender, setGender] = useState({
        percentMale: 0,
        percentFemale: 0
    });

    useEffect(() => {
        let numberOfItems = 0;

        let male = 0;
        let female = 0;

        let maleCardio = 0;
        let femaleCardio = 0;

        dataset.map(item => {
            numberOfItems++;
            item.gender === 1 ? female++ : male++;
            if (item.cardio === 1) item.gender === 1 ? femaleCardio++ : maleCardio++;
        });

        const percentMale = Math.round((maleCardio / male) * 100);
        const percentFemale = Math.round((femaleCardio / female) * 100);

        setGender({percentMale, percentFemale});
        const data = [percentMale, percentFemale];

        setState({
            labels: ["Male", "Female"],
            datasets: [{
                label: 'Percentage',
                backgroundColor: [
                    '#4299e1',
                    '#ed64a6'
                ],
                hoverBackgroundColor: [
                    '#2c5282',
                    '#97266d'
                ],
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: [...data, 0]
            }]
        });
    }, []);

    const bar = (
        <Bar
            data={state}
            options={{
                title:{display: false},
                legend:{display: false}
            }}
        />
    );

    const line = (
        <Line
            data={state}
            options={{
                title:{display: false},
                legend:{display: false}
            }}
        />
    );

    const pie = (
        <Pie
            data={state}
            options={{
                title:{display: false},
                legend:{display: false}
            }}
        />
    );

    const horizontalBar = (
        <HorizontalBar
            data={state}
            options={{
                title:{display: false},
                legend:{display: false}
            }}
        />
    );

    const doughnut = (
        <Doughnut
            data={state}
            options={{
                title:{display: false},
                legend:{display: false}
            }}
        />
    );

    const polar = (
        <Polar
            data={state}
            options={{
                title:{display: false},
                legend:{display: false}
            }}
        />
    );

    return(
        <div className="sm:w-2/3 w-5/6 flex flex-col">
            <div className="w-full font-serif sm:text-4xl text-xl text-gray-200 text-center mb-4 font-mono tracking-wide">CVD by Gender</div>
            {type === 0 ? bar : type === 1 ? line : type === 2 ? pie : type === 3 ? horizontalBar : type === 4 ? doughnut : polar}
            <div className="sm:w-2/3 w-full sm:h-12 h-8 mt-4 mx-auto flex flex-col lg:flex-row justify-between sm:rounded-lg">
                <button className={`sm:w-1/3 w-full border-r-2 border-custom-100 bg-custom-400 sm:rounded-l-lg mono sm:text-xl text-md tracking-wider text-gray-300 ${type !== 0 ? 'hover:bg-red-600 focus:bg-red-600' : 'opacity-75'}`} disabled={type === 0} onClick={() => setType(0)}>Bar</button>
                <button className={`sm:w-1/3 w-full bg-custom-400 mono sm:text-xl text-md tracking-wider text-gray-300 ${type !== 1 ? 'hover:bg-red-600 focus:bg-red-600' : 'opacity-50'}`} disabled={type === 1} onClick={() => setType(1)}>Line</button>
                <button className={`sm:w-1/3 w-full sm:border-l-2 border-custom-100 bg-custom-400 mono sm:text-xl text-md tracking-wider text-gray-300 ${type !== 2 ? 'hover:bg-red-600 focus:bg-red-600' : 'opacity-75'}`} disabled={type === 2} onClick={() => setType(2)}>Pie</button>
                <button className={`sm:w-1/3 w-full sm:border-l-2 border-custom-100 bg-custom-400 mono sm:text-xl text-md tracking-wider text-gray-300 ${type !== 3 ? 'hover:bg-red-600 focus:bg-red-600' : 'opacity-75'}`} disabled={type === 3} onClick={() => setType(3)}>Horizontal</button>
                <button className={`sm:w-1/3 w-full sm:border-l-2 border-custom-100 bg-custom-400 mono sm:text-xl text-md tracking-wider text-gray-300 ${type !== 4 ? 'hover:bg-red-600 focus:bg-red-600' : 'opacity-75'}`} disabled={type === 4} onClick={() => setType(4)}>Dougnut</button>
                <button className={`sm:w-1/3 w-full sm:border-l-2 border-custom-100 bg-custom-400 sm:rounded-r-lg mono sm:text-xl text-md tracking-wider text-gray-300 ${type !== 5 ? 'hover:bg-red-600 focus:bg-red-600' : 'opacity-75'}`} disabled={type === 5} onClick={() => setType(5)}>Polar</button>
            </div>
        </div>
    );
}
