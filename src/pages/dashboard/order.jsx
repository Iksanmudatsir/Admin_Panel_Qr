import React, { useEffect, useState } from "react";
import { FunctionComponent } from "react";
import {
    Typography,
    Card,
    CardHeader,
    CardBody,
    IconButton,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Avatar,
    Tooltip,
    Progress,
    Chip,
    Button,
} from "@material-tailwind/react";
import {
    ClockIcon,
    CheckIcon,
    EllipsisVerticalIcon,
    ArrowUpIcon,
} from "@heroicons/react/24/outline";
import { StatisticsCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";
import {
    statisticsCardsData,
    statisticsChartsData,
    projectsTableData,
    ordersOverviewData,
} from "@/data";
import { orderedItems, orderedItems1, orderedItems2 } from "@/data/tableReceipt";
import AxiosInstance from "@/utils/AxiosInstance";
import SocketInstance from "@/utils/SocketInstance";

export function Order() {
    const currDate = new Date().toLocaleDateString("fr-CA")

    const [orders, setOrders] = useState([]);

    const fetchOrder = async () => {
        await AxiosInstance.get(`/order?startDate=${currDate}&&endDate=${currDate}`).then((res) => {
            setOrders(() => [...res.data]);
        });
    }

    const onClickHandler = async (id) => {
        await AxiosInstance.post(`/order/done/${id}`).then((res) => console.log('done', res));
        setOrders((orders) => orders.filter((order, i) => order.order_id !== id));
    }

    useEffect(() => {
        SocketInstance.on("receive_order", (data) => {
            fetchOrder();
        });
        fetchOrder();
    }, [SocketInstance])


    return (
        <>
            <div className="flex justify-between items-center mt-10">
                <Typography className="w-full h-8 text-2xl font-medium text-[#181818]">
                    Today's incoming order
                </Typography>
            </div>
            <div className="mb-7 w-40 sm:w-64 md:w-40 h-2 sm:h-1.5 ml-10 rounded-md bg-[#a64b2a]" />
            {
                orders.filter((elem, id) => elem.status === "sedang diproses").map((order, i) => (
                    <div className="px-5" key={i}>
                        <div className="flex items-center justify-between w-full">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Costumer Table: {order.costumerTable}</h2>
                            <Button href="#" className="flex justify-center w-24 h-7 items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 bg-[#a64b2a]" onClick={() => onClickHandler(order.order_id)}>
                                Done
                            </Button>
                        </div>
                        <div className="flex items-center justify-between w-full">
                            <h2 className="mb-2 mt-2 text-lg font-semibold text-gray-900 dark:text-white">No Id: {order.costumer_id}</h2>
                            <h2 className="mb-2 mt-2 text-lg font-semibold text-gray-500 dark:text-gray-400">date: {new Date(order.create_at).toLocaleDateString('es-US', { day: 'numeric', month: 'numeric', year: 'numeric' })}</h2>
                        </div>
                        <div className="flex items-center justify-between w-full">
                            <div className="flex justify-between items-center w-full">
                                <Typography variant="h6" color="blue-gray" className="pb-1 text-lg font-medium text-left text-[#181818]">
                                    Order :
                                </Typography>
                                <Typography variant="h6" color="blue-gray" className="w-16 h-6 text-base font-medium text-left text-[#181818]">
                                    Qy.
                                </Typography>
                            </div>
                        </div>
                        <div className="flex justify-between items-center px-5">
                            <ul className="max-w-md space-y-1 text-gray-500 dark:text-gray-400">
                                {
                                    order.items.map((item, i) =>
                                        <li className="text-[#808080]" key={i}>
                                            {item.title}
                                        </li>
                                    )
                                }
                            </ul>
                            <ul className="max-w-md space-y-1 mr-7 text-gray-500 dark:text-gray-400">
                                {
                                    order.items.map((item, i) =>
                                        <li className="text-[#808080]" key={i}>
                                            {item.qty}
                                        </li>
                                    )
                                }
                            </ul>
                        </div>
                        <div className="w-full h-px bg-[#de3905]/50 items-center my-3" />
                    </div >
                )
                )
            }
        </>
    );
    //   return (
    //     <div className="mt-12">
    //       <Typography className="w-full h-8 text-2xl font-medium text-[#181818]">
    //         Today's incoming order
    //       </Typography>
    //       <div className="mb-10 w-40 sm:w-64 md:w-40 h-2 sm:h-1.5 ml-10 rounded-md bg-[#a64b2a]" />
    //       <div className="bg-gray-400 px-2.5 rounded-lg border-white">
    //         <div className="flex items-center justify-between">
    //           <Typography variant="h6" color="blue-gray" className="">
    //             {/* Costumer Table: {orderedItems[0].costumerTable} */}
    //           </Typography>
    //           <div className="relative my-3 md:w-60">
    //             <select
    //               id="id-01"
    //               name="id-01"
    //               required
    //               className=" bg-[#eae0e5] rounded-[5px] relative h-6 w-full appearance-none border-b border-slate-200 bg-white px-4 text-sm text-slate-500 outline-none transition-all autofill:bg-white focus:border-emerald-500 focus-visible:outline-none focus:focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
    //             >
    //               <option value="1">Order Pending</option>
    //               <option value="2">Complete</option>
    //               <option value="3">Canceled</option>
    //             </select>

    //             <svg
    //               xmlns="http://www.w3.org/2000/svg"
    //               className="pointer-events-none absolute top-1 right-2 h-5 w-5 fill-slate-400 transition-all peer-focus:fill-emerald-500 peer-disabled:cursor-not-allowed"
    //               viewBox="0 0 20 20"
    //               fill="currentColor"
    //               aria-labelledby="title-01 description-01"
    //               role="graphics-symbol"
    //             >
    //               <title id="title-01">Arrow Icon</title>
    //               <desc id="description-01">Arrow icon of the select list.</desc>
    //               <path
    //                 fillRule="evenodd"
    //                 d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
    //                 clipRule="evenodd"
    //               />
    //             </svg>
    //           </div>
    //         </div>
    //         <div className="flex justify-between items-center">
    //           <Typography variant="h6" color="blue-gray" className="pb-1 text-lg font-medium text-left text-[#181818]">
    //             Order :
    //           </Typography>
    //           <Typography variant="h6" color="blue-gray" className="w-16 h-6 text-base font-medium text-left text-[#181818]">
    //             Qy.
    //           </Typography>
    //         </div>
    //         {orders.map((item, index) => (
    //           <div key={index}>
    //             <div className="flex justify-between items-center">
    //               <Typography
    //                 variant="small"
    //                 className="pl-8 pb-2 flex items-center gap-1 font-normal text-blue-gray-600"
    //               >
    //                 {item.title}
    //               </Typography>
    //               <Typography
    //                 variant="small"
    //                 className="w-3.5 h-6 pr-14 text-sm font-medium text-left text-[#181818]/50"
    //               >
    //                 {/* {menuItem.quantity} */}
    //               </Typography>
    //             </div>
    //             <hr className="my-4 border-gray-300 w-2/4 mx-auto" />
    //             <div className="flex justify-end">
    //               <button
    //                 className="bg-[#a64b2a] text-white w-20 px-4 py-2 mb-4 mr-1 rounded-lg"
    //               // onClick={() => handleDoneButtonClick(index)}
    //               >
    //                 Done
    //               </button>
    //             </div>
    //           </div>
    //         ))}
    //       </div>
    //     </div>
    //   );
}

export default Order;