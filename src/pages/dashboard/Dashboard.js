import React, { useEffect, useState } from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryPie } from 'victory';
import { useDispatch, useSelector } from 'react-redux';
import { getVehicleInfoRequest } from '../../actions/vehicleinfo';
import { getCargoTypesRequest } from '../../actions/cargotypes';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const years = ['2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030'];

const Dashboard = () => {

    const vehicleinfo = useSelector((state) => state.vehicleinfo);
    const cargotypes = useSelector((state) => state.cargotypes);
    const dispatch = useDispatch();

    const [data, setData] = useState([])
    const [cargoData, setCargoData] = useState([])

    const [endAngle, setEndAngle] = useState(0)

    useEffect(() => {
        dispatch(getVehicleInfoRequest())
        dispatch(getCargoTypesRequest())
        setEndAngle(360)
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setEndAngle(360)
        }, 100);
    }, [])


    useEffect(() => {
        setCargoData(cargotypes.items.items)
    }, [cargotypes])

    useEffect(() => {
        setData(vehicleinfo.items.items)
    }, [vehicleinfo])

    // console.log(data)
    const dataChart = data ? data.map((item) => {
        return { year: item.production, income: parseFloat(item.price) }
    }) : []
    // console.log(dataChart)

    const dataCargoType = data ? data.map((item) => {
        return item.cargoType
    }) : []

    const totalCargoType = data ? data.map((item) => {
        return item.cargoType.length
    }) : []

    const sumCargoType = totalCargoType.reduce((total, value) => total + value, 0)

    const percentCargoType = (cargotype) => {
        let count = 0;
        dataCargoType.map((item) => {
            item.map(i => {
                if (i == cargotype) {
                    count++
                }
            })
        })
        return parseInt((count / sumCargoType * 100).toFixed(0))
    }

    // console.log(totalCargoType, sumCargoType)
    const dataChartPie = cargoData ? cargoData.map(item => {
        return { x: item.cargoName, y: percentCargoType(item.cargoName) }
    }) : []


    const dummydataChartPie = [
        { x: "Cats", y: 35 },
        { x: "Dogs", y: 40 },
        { x: "Birds", y: 55 }
    ]

    console.log(dataChartPie)
    // console.log(dummydataChartPie)
    return (
        <Box
            sx={{
                display: 'flex'
            }}
        >
            <Box
                sx={{
                    width: "60%",
                    height: 400,
                    backgroundColor: 'white',
                    padding: "10px",
                    borderRadius: "10px",
                    margin: '10px'
                }}
            >

                <Typography variant="h6" component="div">
                    Income chart
                </Typography>
                <VictoryChart
                    // domainPadding will add space to each side of VictoryBar to
                    // prevent it from overlapping the axis
                    domainPadding={20}
                    // startAngle={10}
                >
                    <VictoryAxis
                        // tickValues specifies both the number of ticks and where
                        // they are placed on the axis
                        tickValues={years}
                        tickFormat={years}
                        width="100%"
                    />
                    <VictoryAxis
                        dependentAxis
                        // tickFormat specifies how ticks should be displayed
                        tickFormat={(x) => (`$${(x / 1000000).toFixed(2)}m`)}
                    />
                    <VictoryBar
                        data={dataChart}
                        x="year"
                        y="income"
                        // barRatio={0.8}
                        cornerRadius={5}
                        style={{
                            data: {
                                fill: "#0674C4",
                                width: 25
                            }
                        }}
                        animate={{
                            duration: 2000,
                            onLoad: { duration: 1000 }
                        }}
                    // colorScale={['#00876c',
                    // '#3d9b72',
                    // '#63af77',
                    // '#88c37c',
                    // '#aed683',
                    // '#d6e88c',
                    // '#fffa97',
                    // '#fedc7b',
                    // '#fbbe65',
                    // '#f79f57',
                    // '#ef8050',
                    // '#e35f4e',
                    // '#d43d51']}
                    />
                </VictoryChart>
            </Box>
            <Box
                sx={{
                    width: "40%",
                    height: 400,
                    backgroundColor: 'white',
                    padding: "10px",
                    paddingBottom: "40px",
                    borderRadius: "10px",
                    margin: '10px'
                }}
            >
                <Typography variant="h6" component="div">
                    Cargo type chart
                </Typography>
                <VictoryPie
                    animate={{
                        duration: 1000,
                        // easing: "bounceIn"
                    }}
                    radius={({ datum, active }) => (active ? 150 : 120)}
                    endAngle={endAngle}
                    innerRadius={40}
                    events={[
                        {
                            target: "data",
                            eventHandlers: {
                                onClick: () => {
                                    return [
                                        {
                                            eventKey: "all",
                                            mutation: () => ({ active: false })
                                        },
                                        {
                                            mutation: () => ({ active: true })
                                        }
                                    ];
                                }
                            }
                        }
                    ]}
                    colorScale={['#00876c',
                        '#3d9b72',
                        '#63af77',
                        '#88c37c',
                        '#aed683',
                        '#d6e88c',
                        '#fffa97',
                        '#fedc7b',
                        '#fbbe65',
                        '#f79f57',
                        '#ef8050',
                        '#e35f4e',
                        '#d43d51']}

                    data={dataChartPie}
                />

            </Box>
        </Box>
    )
}

export default Dashboard