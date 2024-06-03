import { useMemo } from "react";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { Link } from "react-router-dom";
import LoadingAnimation from "../../components/LoadingAnimation/LoadingAnimation";
import useAxiosSecure from "../../Hooks/useAxiosSecure/useAxiosSecure";
import useUserBids from "../../Hooks/useUserBids/useUserBids";
import useCurrentUser from "../../Hooks/useCurrentUser/useCurrentUser";

const MyBiding = () => {
  // hooks and custom hooks
  const { dbCurrentUser } = useCurrentUser();
  const { bidsPending, allBids } = useUserBids(dbCurrentUser.email);
  const axiosSecure = useAxiosSecure();

  const columns = [
    {
      accessorKey: "singleAdId",
      header: "Product ID",
      cell: ({ row }) => (
        <Link
          to={`/details/${row.original.singleAdId}`}
          className="text-blue-500 hover:underline"
        >
          {row.original.singleAdId}
        </Link>
      ),
    },
    {
      accessorKey: "sellerName",
      header: "Seller",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="text-2xl font-bold">{row.original.sellerName}</span>
          <span className="text-green-500">{row.original.sellerPhone}</span>
        </div>
      ),
    },
    {
      accessorKey: "price",
      header: "Price",
    },
    {
      accessorKey: "todayDate",
      header: "Bid Date",
    },
    {
      accessorKey: "productStatus",
      header: "Order Status",
      cell: ({ row }) => (
        <span
          className={`px-2 py-1 rounded-md ${
            row.original.productStatus === "confirmed"
              ? "bg-green-200 text-green-500"
              : row.original.productStatus === "canceled"
              ? "bg-red-100 text-red-700"
              : row.original.productStatus === "pending"
              ? "bg-yellow-100 text-yellow-700"
              : ""
          }`}
        >
          {row.original.productStatus}
        </span>
      ),
    },
  ];

  // get the data
  const data = useMemo(() => allBids ?? [], [allBids]);

  // tanStack table
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  // handle confirm order
  const handleConfirmOrder = async (_id) => {
    try {
      const response = await axiosSecure.put(`/confirmOrder/${_id}`);
      if (response.data.modifiedCount) {
        // reload orders or update the state
      }
    } catch (error) {
      console.error("Failed to confirm order", error);
    }
  };

  // handle cancel order
  const handleCancelOrder = async (_id) => {
    try {
      const response = await axiosSecure.put(`/cancelOrder/${_id}`);
      if (response.data.modifiedCount) {
        // reload orders or update the state
      }
    } catch (error) {
      console.error("Failed to cancel order", error);
    }
  };

  // conditional loading
  if (bidsPending) {
    return <LoadingAnimation />;
  }

  return (
    <div className="lg:min-h-[100vh] p-5 flex flex-col container mx-auto gap-8 justify-start items-center">
      <h2 className="text-center text-4xl md:text-5xl font-bold text-main capitalize">
        My Orders
      </h2>

      {/* table to show all the orders */}
      <div className="w-full mt-10">
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup, index) => (
              <tr key={index} className="table-row">
                {headerGroup.headers.map((header) => (
                  <th key={header?.id} className="table-description text-sub">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row, index) => (
              <tr key={index} className="table-row">
                {row.getVisibleCells().map((cell, index) => (
                  <td key={index} className="text-center table-description">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {/* pagination buttons */}
        <div className="w-full flex justify-between items-center gap-10 mt-5 font-body font-semibold">
          <button
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
            className="hover:text-sub duration-300 disabled:text-gray"
          >
            Previous
          </button>
          <button
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
            className="hover:text-sub duration-300 disabled:text-gray"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyBiding;
