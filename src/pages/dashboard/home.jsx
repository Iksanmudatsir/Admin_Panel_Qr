import React from 'react';
import { BiFoodMenu, BiMoneyWithdraw } from 'react-icons/bi';
import { BsPeople } from 'react-icons/bs';
import { MdDateRange } from 'react-icons/md';
import Chart from "react-apexcharts";

const Home = () => {
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

    return (
        <>
            <div className='flex gap-3'>
                <div class="bg-white basis-full">
                    <div class="w-[100%] pt-5">
                        <div class="flex flex-col lg:flex-row rounded overflow-hidden h-auto lg:h-32 border shadow-lg">
                            <BiFoodMenu size={60} className='m-7 mt-8' />
                            <div class="rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                                <p class="text-grey-darker text-base font-bold">Menu Available</p>
                                <div class="text-black font-bold text-xl mb-2 leading-tight m-8">31</div>
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
                                <div class="text-black font-bold text-xl mb-2 leading-tight">8</div>
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
                                <p class="text-grey-darker text-base">Rp43020</p>
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
                                <p class="text-grey-darker text-base">16-05-2002</p>
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
        </>
    );
}

export default Home;