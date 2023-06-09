import React, { useEffect, useState } from 'react';
import { BiFoodMenu, BiMoneyWithdraw } from 'react-icons/bi';
import { BsPeople } from 'react-icons/bs';
import { MdDateRange } from 'react-icons/md';
import Chart from "react-apexcharts";
import AxiosInstance from '@/utils/AxiosInstance';

const Home = () => {
    const currDate = new Date().toLocaleDateString('default', { day: 'numeric', month: 'long', year: 'numeric' })

    const [items, setItems] = useState([]);
    const [processOders, setProcessOrders] = useState([]);
    const [doneOrders, setDoneOrders] = useState([])

    const fetchItem = async () => {
        await AxiosInstance.get('/item?available=1').then((res) => {
            setItems([...res.data]);
        });
    }

    const fetchOrder = async () => {
        await AxiosInstance.get('/order').then((res) => {
            setProcessOrders([...res.data.filter((elem) => elem.status === 'sedang diproses')]);
            setDoneOrders([...res.data.filter((elem) => elem.status === 'selesai')])
        });
    }

    const getTodayIncomes = () => {
        const totalIncomes = doneOrders.reduce((acc, order) => {
            const item = order.items;
            const itemPrice = item.reduce((sum, item) => sum + item.price, 0);
            return acc + itemPrice;
        }, 0);

        return totalIncomes
    }

    const optionBar = {
        chart: {
            id: "basic-bar"
        },
        xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
        }
    }

    const seriesBar = [
        {
            name: "series-1",
            data: [30, 40, 45, 50, 49, 60, 70, 91]
        }
    ]

    useEffect(() => {
        Promise.all([
            fetchItem(),
            fetchOrder()
        ]);

        console.log(doneOrders);
        console.log(getTodayIncomes())
    }, [])

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
                                <div class="text-black font-bold text-xl mb-2 leading-tight">Date</div>
                                <p class="text-grey-darker text-base">{currDate}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg-white basis-full">
                <div class="pt-5 max-w-max max-h-max">
                    <div class="flex flex-col lg:flex-row rounded overflow-hidden border shadow-lg">
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