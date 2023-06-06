import React from 'react';

const Home = () => {
    return (
        <div className='flex'>
            <div class="bg-white m-auto">
                <div class="w-[100%] pt-5">
                    <div class="flex flex-col lg:flex-row rounded overflow-hidden h-auto lg:h-32 border shadow-lg">
                        <div class="rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                            <div class="text-black font-bold text-xl mb-2 leading-tight">Today Orders</div>
                            <p class="text-grey-darker text-base">1523</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg-white m-auto">
                <div class="w-[100%] pt-5">
                    <div class="flex flex-col lg:flex-row rounded overflow-hidden h-auto lg:h-32 border shadow-lg">
                        <div class="rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                            <div class="text-black font-bold text-xl mb-2 leading-tight">Menu Available</div>
                            <p class="text-grey-darker text-base">31</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg-white m-auto">
                <div class="w-[100%] pt-5">
                    <div class="flex flex-col lg:flex-row rounded overflow-hidden h-auto lg:h-32 border shadow-lg">
                        <div class="rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                            <div class="text-black font-bold text-xl mb-2 leading-tight">All Order</div>
                            <p class="text-grey-darker text-base">1523</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg-white m-auto">
                <div class="w-[100%] pt-5">
                    <div class="flex flex-col lg:flex-row rounded overflow-hidden h-auto lg:h-32 border shadow-lg">
                        <div class="rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                            <div class="text-black font-bold text-xl mb-2 leading-tight">All Order</div>
                            <p class="text-grey-darker text-base">1523</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;