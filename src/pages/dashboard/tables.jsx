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
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { authorsTableData, projectsTableData } from "@/data";
import { foods, snack, drinks } from "@/data/dataFood";

export function Tables() {
  const Receipt = ({ order }) => {
    const totalCost = order.reduce((total, item) => total + item.price, 0);
  }
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="mt-12">
          <Typography color="textPrimary" className="w-56 h-8 text-2xl font-medium text-left text-black">
            Today's Receipts
          </Typography>
        </div>
        <div className="relative my-3 md:w-32 mt-14">
          <select
            id="id-01"
            name="id-01"
            required
            className="text-white rounded-[5px] relative h-6 w-full appearance-none border-b border-slate-200 bg-[#a64b2a] px-4 text-sm text-slate-500 outline-none transition-all autofill:bg-white focus:border-emerald-500 focus-visible:outline-none focus:focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
          >
            <option value="1">Today's</option>
            <option value="2">This month's</option>
            <option value="3">This year's</option>
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
            <desc id="description-01">Arrow incon of the select list.</desc>
            <path 
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      <div className="flex items-center justify-between ml-10 mr-10">
        <Typography variant="h6">
          Costumer Table :
        </Typography>
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
            002
          </Typography>
        </div>
      </div>
    </>
  );
}

export default Tables;


      {/* <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Authors Table
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["author", "function", "status", "employed", ""].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {authorsTableData.map(
                ({ img, name, email, job, online, date }, key) => {
                  const className = `py-3 px-5 ${
                    key === authorsTableData.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={name}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <Avatar src={img} alt={name} size="sm" />
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {name}
                            </Typography>
                            <Typography className="text-xs font-normal text-blue-gray-500">
                              {email}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {job[0]}
                        </Typography>
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          {job[1]}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Chip
                          variant="gradient"
                          color={online ? "green" : "blue-gray"}
                          value={online ? "online" : "offline"}
                          className="py-0.5 px-2 text-[11px] font-medium"
                        />
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {date}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography
                          as="a"
                          href="#"
                          className="text-xs font-semibold text-blue-gray-600"
                        >
                          Edit
                        </Typography>
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
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Projects Table
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["companies", "members", "budget", "completion", ""].map(
                  (el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-5 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-bold uppercase text-blue-gray-400"
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
                      <td className={className}>
                        <Typography
                          as="a"
                          href="#"
                          className="text-xs font-semibold text-blue-gray-600"
                        >
                          <EllipsisVerticalIcon
                            strokeWidth={2}
                            className="h-5 w-5 text-inherit"
                          />
                        </Typography>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card> */}

