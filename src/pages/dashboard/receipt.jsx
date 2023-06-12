import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Avatar,
    Chip,
    Tooltip,
    Progress,
} from "@material-tailwind/react";
import AxiosInstance from "@/utils/AxiosInstance";
import { useEffect, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

export function Receipt() {
    const currDate = new Date().toLocaleDateString("fr-CA")

    const [orders, setOrders] = useState([]);
    const [dateVal, setDateVal] = useState({
        startDate: currDate,
        endDate: currDate
    })

    const dateChangeHandler = (newValue) => {
        setDateVal(newValue);
    }

    const fetchOrder = async () => {
        await AxiosInstance.get(`/order?startDate=${dateVal.startDate}&&endDate=${dateVal.endDate}`)
            .then((res) => {
                setOrders(() => [...res.data])
            });
    }

    useEffect(() => {
        fetchOrder();
    }, [dateVal.startDate, dateVal.endDate]);

    return (
        <>
            <div className="flex items-center justify-between">
                <div className="mt-12">
                    <Typography color="textPrimary" className="w-48 h-8 text-2xl font-medium text-left text-black">
                        Today's Receipts
                    </Typography>
                </div>
                <div className="mt-12 w-60">
                    <Datepicker
                        useRange={false}
                        showShortcuts={true}
                        primaryColor={"blue"}
                        onChange={dateChangeHandler}
                        value={dateVal}
                    />
                </div>
            </div >
            {
                orders.filter((elem, i) => elem.status === 'selesai').map((order, id) => {
                    return (
                        <>
                            <div className="mx-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <Typography variant="h5">
                                            Table No : {order.costumerTable}
                                        </Typography>
                                    </div>
                                    <div className="w-32 h-6 text-xs text-left flex">
                                        <svg
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="relative"
                                            preserveAspectRatio="xMidYMid meet"
                                        >
                                            <path
                                                d="M5 7.49984V1.6665H15V7.49984"
                                                stroke="#DE3905"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                            <path
                                                d="M4.99984 15H3.33317C2.89114 15 2.46722 14.8244 2.15466 14.5118C1.8421 14.1993 1.6665 13.7754 1.6665 13.3333V9.16667C1.6665 8.72464 1.8421 8.30072 2.15466 7.98816C2.46722 7.6756 2.89114 7.5 3.33317 7.5H16.6665C17.1085 7.5 17.5325 7.6756 17.845 7.98816C18.1576 8.30072 18.3332 8.72464 18.3332 9.16667V13.3333C18.3332 13.7754 18.1576 14.1993 17.845 14.5118C17.5325 14.8244 17.1085 15 16.6665 15H14.9998"
                                                stroke="#DE3905"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                            <path
                                                d="M15 11.6665H5V18.3332H15V11.6665Z"
                                                stroke="#DE3905"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                        </svg>
                                        <Typography variant="h6" color="blue-gray" className="w-24 flex items-center pl-1 h-6 text-xs text-left text-[#de3905]">
                                            Receipt# :
                                        </Typography>
                                        <Typography variant="h6" color="blue-gray" className="w-20 flex items-center text-xs text-left text-[#808080]">
                                            {order.order_id}
                                        </Typography>
                                    </div>
                                </div>
                                <table className="table-auto w-full text-left">
                                    <thead>
                                        <tr>
                                            <th className="py-2 w-5/6">Ordered Items</th>
                                            <th className="py-2">Qty.</th>
                                            <th className="py-2">Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order.items.map((item) => (
                                            <tr key={item.id}>
                                                <td className="py-2 text-[#808080]">{item.title}</td>
                                                <td className="py-2 text-[#808080]">{item.qty}</td>
                                                <td className="py-2 text-[#808080]">Rp{item.price * 1}</td>
                                            </tr>
                                        ))}
                                        <div className="w-full h-px bg-[#de3905]/50 items-center ml-11 my-1" />
                                        <tr>
                                            <td className="py-2 font-semibold">Total</td>
                                            <td className="py-2"></td>
                                            <td className="py-2 font-semibold">Rp{order.items.reduce((acc, item) => acc + item.qty * item.price, 0)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="w-full h-px bg-[#de3905]/50 items-center my-3" />
                        </>
                    )
                })
            }
        </>
    );
}

export default Receipt;

