import React, { useEffect, useState } from 'react';
import { BiFoodMenu, BiMoneyWithdraw } from 'react-icons/bi';
import { BsPeople } from 'react-icons/bs';
import { MdDateRange } from 'react-icons/md';
import Chart from "react-apexcharts";
import AxiosInstance from '@/utils/AxiosInstance';
import Datepicker from 'react-tailwindcss-datepicker';

const Home = () => {
    const currDate = new Date().toLocaleDateString("fr-CA");

    const [items, setItems] = useState([]);
    const [processOders, setProcessOrders] = useState([]);
    const [doneOrders, setDoneOrders] = useState([]);
    const [categoriesChart, setCategoriesChart] = useState([]);
    const [dataChart, setDataChart] = useState([]);
    const [dateVal, setDateVal] = useState({
        startDate: currDate,
        endDate: currDate
    })

    const getDateArray = (start, end) => {
        const arr = [];
        const dt = new Date(start);
        const dtend = new Date(end)

        while (dt <= dtend) {
            arr.push(new Date(dt).toLocaleDateString('fr-CA'));
            dt.setDate(dt.getDate() + 1);
        }

        return arr;
    }

    const fetchItem = async () => {
        await AxiosInstance.get('/item?available=1').then((res) => {
            setItems([...res.data]);
        });
    }

    const fetchTodayOrder = async () => {
        await AxiosInstance.get(`/order?startDate=${currDate}&&endDate=${currDate}`).then((res) => {
            setProcessOrders([...res.data.filter((elem) => elem.status === 'sedang diproses')]);
            setDoneOrders([...res.data.filter((elem) => elem.status === 'selesai')])
        });
    }

    const fetchOrderWithDate = async () => {
        await AxiosInstance.get(`/order?startDate=${dateVal.startDate}&&endDate=${dateVal.endDate}`).then((res) => {
            const data = [];

            console.log(res.data)
            let orderDate = res.data.filter((elem) => elem.status === 'selesai').map((elem) => new Date(elem.create_at).toLocaleDateString("fr-CA"));

            const arrDate = getDateArray(dateVal.startDate, dateVal.endDate);
            for (let i = 0; i < arrDate.length; i++) {
                const orderLength = orderDate.filter((elem) => elem === arrDate[i]).length;
                data.push(orderLength);
            }

            setDataChart(() => [...data])
            setCategoriesChart(() => arrDate.map((elem) => new Date(elem).toLocaleDateString('id-ID', { month: "long", day: "numeric" })));
        });
    }

    const dateChangeHandler = (newDateVal) => {
        setDateVal(newDateVal);
    }

    const getTodayIncomes = () => {
        const totalIncomes = doneOrders.reduce((acc, order) => {
            const items = order.items;
            const itemPrice = items.reduce((sum, item) => sum + (item.price * item.qty), 0);
            return acc + itemPrice;
        }, 0);

        return totalIncomes
    }

    const optionBar = {
        chart: {
            id: "order-by-date"
        },
        xaxis: {
            categories: categoriesChart,
        }
    }

    const seriesBar = [
        {
            name: "Order Count",
            data: dataChart
        }
    ]

    useEffect(() => {
        Promise.all([
            fetchItem(),
            fetchOrderWithDate(),
            fetchTodayOrder()
        ]);
    }, [dateVal])

    return (
        <div className='animate-fade-up'>
            <div className='flex gap-3'>
                <div class="bg-white basis-full">
                    <div class="w-[100%] pt-5">
                        <div class="flex flex-col lg:flex-row rounded overflow-hidden h-auto lg:h-32 border shadow-lg">
                            <BiFoodMenu size={60} className='m-7 mt-8' />
                            <div class="rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                                <p class="text-grey-darker text-base font-bold">Item Available</p>
                                <div class="text-black font-bold text-xl mb-2 leading-tight m-8">{items.length}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bg-white basis-full">
                    <div class="w-[100%] pt-5">
                        <div class="flex flex-col lg:flex-row rounded overflow-hidden h-auto lg:h-32 border shadow-lg">
                            <BsPeople size={60} className='m-7 mt-8' />
                            <div class="rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                                <p class="text-grey-darker text-base font-bold">Today Orders</p>
                                <div class="text-black font-bold text-xl mb-2 leading-tight">{processOders.length}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bg-white basis-full">
                    <div class="w-[100%] pt-5">
                        <div class="flex flex-col lg:flex-row rounded overflow-hidden h-auto lg:h-32 border shadow-lg">
                            <BiMoneyWithdraw size={60} className='m-7 mt-8' />
                            <div class="rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                                <div class="text-black font-bold text-xl mb-2 leading-tight">Today Incomes</div>
                                <p class="text-grey-darker text-base">Rp{getTodayIncomes()}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bg-white basis-full">
                    <div class="w-[100%] pt-5">
                        <div class="flex flex-col lg:flex-row rounded overflow-hidden h-auto lg:h-32 border shadow-lg">
                            <MdDateRange size={60} className='m-7 mt-8' />
                            <div class="rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                                <div class="text-black font-bold text-xl mb-2 leading-tight">Today Date</div>
                                <p class="text-grey-darker text-base">{currDate}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg-white basis-full">
                <div class="pt-5 max-w-max max-h-max">
                    <div class="flex-col lg:flex-row rounded overflow-hidden border shadow-lg">

                        <Datepicker
                            primaryColor={'amber'}
                            useRange={false}
                            showShortcuts={true}
                            value={dateVal}
                            onChange={(e) => dateChangeHandler(e)}
                        />

                        <Chart
                            options={optionBar}
                            series={seriesBar}
                            type="bar"
                            width="500"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;