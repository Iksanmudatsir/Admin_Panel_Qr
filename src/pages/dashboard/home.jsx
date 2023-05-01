import React from "react";
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

export function Home() {
  return (
    <div className="mt-12">
       <Typography className="w-full h-8 text-2xl font-medium text-[#181818]">
          Today's incoming order
        </Typography>
      <div className="mb-10 w-40 sm:w-64 md:w-40 h-2 sm:h-1.5 ml-10 rounded-md bg-[#a64b2a]"/>
      <div className="bg-gray-400 px-2.5 rounded-lg border-white">
        <div className="flex items-center justify-between"> 
          <Typography variant="h6" color="blue-gray" className="">
                Costumer Table: {orderedItems[0].costumerTable}
            </Typography>
            <div className="relative my-3 md:w-60">
              <select
                id="id-01"
                name="id-01"
                required
                className=" bg-[#eae0e5] rounded-[5px] relative h-6 w-full appearance-none border-b border-slate-200 bg-white px-4 text-sm text-slate-500 outline-none transition-all autofill:bg-white focus:border-emerald-500 focus-visible:outline-none focus:focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
              >
                <option value="1">Order Pending</option>
                <option value="2">Complete</option>
                <option value="3">Canceled</option>
              </select>
              
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="pointer-events-none absolute top-1 right-2 h-5 w-5 fill-slate-400 transition-all peer-focus:fill-emerald-500 peer-disabled:cursor-not-allowed"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-labelledby="title-01 description-01"
                role="graphics-symbol"
              >
                <title id="title-01">Arrow Icon</title>
                <desc id="description-01">Arrow icon of the select list.</desc>
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
        </div>
        <div className="flex justify-between items-center">
        <Typography variant="h6" color="blue-gray" className="pb-1 text-lg font-medium text-left text-[#181818]">
            Order :
          </Typography>
          <Typography variant="h6" color="blue-gray" className="w-16 h-6 text-base font-medium text-left text-[#181818]">
            Qy.
          </Typography>
        </div>
        {orderedItems.map((item, index) => (
        <div key={index}>
          {item.items.map((menuItem, i) => (
            <div className="flex justify-between items-center" key={i}>
              <Typography
                variant="small"
                className="pl-8 pb-2 flex items-center gap-1 font-normal text-blue-gray-600"
              >
                {menuItem.name}
              </Typography>
              <Typography
                variant="small"
                className="w-3.5 h-6 pr-14 text-sm font-medium text-left text-[#181818]/50"
              >
                {menuItem.quantity}
              </Typography>
            </div>
          ))}
        </div>
      ))}
      </div>
      <div className="mt-7">
      <div className="flex justify-center mb-7 ml-24 w-10/12 h-1.5 rounded-[15px] bg-[#a64b2a]"/>
      <div className="bg-gray-400 px-2.5 rounded-lg border-white">
        <div className="flex items-center justify-between"> 
          <Typography variant="h6" color="blue-gray" className="">
                Costumer Table: {orderedItems1[0].costumerTable} 
            </Typography>
            <div className="relative my-3 md:w-60">
              <select
                id="id-01"
                name="id-01"
                required
                className="bg-[#eae0e5] rounded-[5px] peer relative h-6 w-full appearance-none border-b border-slate-200 bg-white px-4 text-sm text-slate-500 outline-none transition-all autofill:bg-white focus:border-emerald-500 focus-visible:outline-none focus:focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
              >
                <option value="1">Order Pending</option>
                <option value="2">Complete</option>
                <option value="3">Canceled</option>
              </select>
              
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="pointer-events-none absolute top-1 right-2 h-5 w-5 fill-slate-400 transition-all peer-focus:fill-emerald-500 peer-disabled:cursor-not-allowed"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-labelledby="title-01 description-01"
                role="graphics-symbol"
              >
                <title id="title-01">Arrow Icon</title>
                <desc id="description-01">Arrow icon of the select list.</desc>
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
        </div>
        <div className="flex justify-between items-center">
          <Typography variant="h6" color="blue-gray" className="pb-1 text-lg font-medium text-left text-[#181818]">
            Order :
          </Typography>
          <Typography variant="h6" color="blue-gray" className="w-16 h-6 text-base font-medium text-left text-[#181818]">
            Qy
          </Typography>
          </div>
          {orderedItems1.map((item, index) => (
            <div key={index}>
              {item.items.map((menuItem, i) => (
                <div className="flex justify-between items-center" key={i}>
                  <Typography
                    variant="small"
                    className="pl-8 pb-2 flex items-center gap-1 font-normal text-blue-gray-600"
                    >
                      {menuItem.name}
                    </Typography>
                  <Typography
                    variant="small"
                    className="w-3.5 h-6 pr-14 text-sm font-medium text-left text-[#181818]/50"
                    >
                      {menuItem.quantity}
                    </Typography>
                </div>
              ))}
            </div>
          ))}
      </div>
    </div>
    <div className="mt-7">
      <div className="flex justify-center mb-7 ml-24 w-10/12 h-1.5 rounded-[15px] bg-[#a64b2a]"/>
      <div className="bg-gray-400 px-2.5 rounded-lg border-white">
        <div className="flex items-center justify-between"> 
          <Typography variant="h6" color="blue-gray" className="">
                Costumer Table: 6 
            </Typography>
            <div className="relative my-3 md:w-60">
              <select
                id="id-01"
                name="id-01"
                required
                className="bg-[#eae0e5] rounded-[5px] peer relative h-6 w-full appearance-none border-b border-slate-200 bg-white px-4 text-sm text-slate-500 outline-none transition-all autofill:bg-white focus:border-emerald-500 focus-visible:outline-none focus:focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
              >
                <option value="1">Order Pending</option>
                <option value="2">Complete</option>
                <option value="3">Canceled</option>
              </select>
              
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="pointer-events-none absolute top-1 right-2 h-5 w-5 fill-slate-400 transition-all peer-focus:fill-emerald-500 peer-disabled:cursor-not-allowed"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-labelledby="title-01 description-01"
                role="graphics-symbol"
              >
                <title id="title-01">Arrow Icon</title>
                <desc id="description-01">Arrow icon of the select list.</desc>
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
        </div>
        <div className="flex justify-between items-center">
          <Typography variant="h6" color="blue-gray" className="pb-1 text-lg font-medium text-left text-[#181818]">
            Order :
          </Typography>
          <Typography variant="h6" color="blue-gray" className="w-16 h-6 text-base font-medium text-left text-[#181818]">
            Qy
          </Typography>
        </div>
       {orderedItems2.map((item, index) => (
        <div key={index}>
          {item.items.map((menuItem, i) => (
            <div className="flex justify-between items-center" key={i}>
              <Typography
                variant="small"
                className="pl-8 pb-2 flex items-center gap-1 font-normal text-blue-gray-600"
                >
                  {menuItem.name}
                </Typography>
              <Typography
                variant="small"
                className="w-3.5 h-6 pr-14 text-sm font-medium text-left text-[#181818]/50"
                >
                  {menuItem.quantity}
                </Typography>
            </div>
          ))}
        </div>
       ))}
      </div>
    </div>
  </div>
  );
}

export default Home;


 {/* <h2 className="" */}
      {/* <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        {statisticsCardsData.map(({ icon, title, footer, ...rest }) => (
          <StatisticsCard
            key={title}
            {...rest}
            title={title}
            icon={React.createElement(icon, {
              className: "w-6 h-6 text-white",
            })}
            footer={
              <Typography className="font-normal text-blue-gray-600">
                <strong className={footer.color}>{footer.value}</strong>
                &nbsp;{footer.label}
              </Typography>
            }
          />
        ))}
      </div>
      <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
        {statisticsChartsData.map((props) => (
          <StatisticsChart
            key={props.title}
            {...props}
            footer={
              <Typography
                variant="small"
                className="flex items-center font-normal text-blue-gray-600"
              >
                <ClockIcon strokeWidth={2} className="h-4 w-4 text-inherit" />
                &nbsp;{props.footer}
              </Typography>
            }
          />
        ))}
      </div>
      <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="overflow-hidden xl:col-span-2">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 flex items-center justify-between p-6"
          >
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-1">
                Projects
              </Typography>
              <Typography
                variant="small"
                className="flex items-center gap-1 font-normal text-blue-gray-600"
              >
                <CheckIcon strokeWidth={3} className="h-4 w-4 text-blue-500" />
                <strong>30 done</strong> this month
              </Typography>
            </div>
            <Menu placement="left-start">
              <MenuHandler>
                <IconButton size="sm" variant="text" color="blue-gray">
                  <EllipsisVerticalIcon
                    strokeWidth={3}
                    fill="currenColor"
                    className="h-6 w-6"
                  />
                </IconButton>
              </MenuHandler>
              <MenuList>
                <MenuItem>Action</MenuItem>
                <MenuItem>Another Action</MenuItem>
                <MenuItem>Something else here</MenuItem>
              </MenuList>
            </Menu>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["companies", "members", "budget", "completion"].map(
                    (el) => (
                      <th
                        key={el}
                        className="border-b border-blue-gray-50 py-3 px-6 text-left"
                      >
                        <Typography
                          variant="small"
                          className="text-[11px] font-medium uppercase text-blue-gray-400"
                        >
                          {el}
                        </Typography>
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {projectsTableData.map(
                  ({ img, name, members, budget, completion }, key) => {
                    const className = `py-3 px-5 ${
                      key === projectsTableData.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                    }`;

                    return (
                      <tr key={name}>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            <Avatar src={img} alt={name} size="sm" />
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-bold"
                            >
                              {name}
                            </Typography>
                          </div>
                        </td>
                        <td className={className}>
                          {members.map(({ img, name }, key) => (
                            <Tooltip key={name} content={name}>
                              <Avatar
                                src={img}
                                alt={name}
                                size="xs"
                                variant="circular"
                                className={`cursor-pointer border-2 border-white ${
                                  key === 0 ? "" : "-ml-2.5"
                                }`}
                              />
                            </Tooltip>
                          ))}
                        </td>
                        <td className={className}>
                          <Typography
                            variant="small"
                            className="text-xs font-medium text-blue-gray-600"
                          >
                            {budget}
                          </Typography>
                        </td>
                        <td className={className}>
                          <div className="w-10/12">
                            <Typography
                              variant="small"
                              className="mb-1 block text-xs font-medium text-blue-gray-600"
                            >
                              {completion}%
                            </Typography>
                            <Progress
                              value={completion}
                              variant="gradient"
                              color={completion === 100 ? "green" : "blue"}
                              className="h-1"
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </CardBody>
        </Card>
        <Card>
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 p-6"
          >
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Orders Overview
            </Typography>
            <Typography
              variant="small"
              className="flex items-center gap-1 font-normal text-blue-gray-600"
            >
              <ArrowUpIcon
                strokeWidth={3}
                className="h-3.5 w-3.5 text-green-500"
              />
              <strong>24%</strong> this month
            </Typography>
          </CardHeader>
          <CardBody className="pt-0">
            {ordersOverviewData.map(
              ({ icon, color, title, description }, key) => (
                <div key={title} className="flex items-start gap-4 py-3">
                  <div
                    className={`relative p-1 after:absolute after:-bottom-6 after:left-2/4 after:w-0.5 after:-translate-x-2/4 after:bg-blue-gray-50 after:content-[''] ${
                      key === ordersOverviewData.length - 1
                        ? "after:h-0"
                        : "after:h-4/6"
                    }`}
                  >
                    {React.createElement(icon, {
                      className: `!w-5 !h-5 ${color}`,
                    })}
                  </div>
                  <div>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="block font-medium"
                    >
                      {title}
                    </Typography>
                    <Typography
                      as="span"
                      variant="small"
                      className="text-xs font-medium text-blue-gray-500"
                    >
                      {description}
                    </Typography>
                  </div>
                </div>
              )
            )}
          </CardBody>
        </Card>
      </div> */}
