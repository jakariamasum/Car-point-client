import { useMemo } from "react";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import useAllUsers from "../../../Hooks/useAllUsers/useAllUsers";
import useAxiosSecure from "../../../Hooks/useAxiosSecure/useAxiosSecure";
import LoadingAnimation from "../../../components/LoadingAnimation/LoadingAnimation";

const AllUsers = () => {
  // hooks and custom hooks
  const { allUsersPending, allUsers, allUsersRefetch } = useAllUsers();
  const axiosSecure = useAxiosSecure();

  // update user verification status
  const handleVerificationRequest = (id, status) => {
    const updatedVerifyStatus = status;
    const requestUpdate = "responded";
    const updateStatus = { updatedVerifyStatus, requestUpdate };

    // update verification status in the userList database
    axiosSecure
      .put(`/updateUserDetails/${id}`, updateStatus)
      .then((res) => {
        const data = res.data;
        if (data.modifiedCount > 0) {
          allUsersRefetch();
        }
      })
      .catch((err) => console.log(err.code + "||" + err.message));

    // update verification status in the product listing database
    axiosSecure
      .put(`/updateSellerVerification/${id}`, updateStatus)
      .then(() => {
        //
      })
      .catch((err) => console.log(err.code + "||" + err.message));
  };

  // define columns for react-table
  const columns = useMemo(
    () => [
      {
        accessorKey: "",
        header: "#",
        cell: (row) => <p>{row.row.index + 1}</p>,
      },
      {
        accessorKey: "name",
        header: "Name",
        cell: (row) => (
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle rounded-[50%] w-12 h-12">
                <img src={row.row.original.photo} alt="User photo" />
              </div>
            </div>
            <div>
              <div className="font-bold">{row.row.original.name}</div>
              <div className="text-[13px] opacity-70">
                {row.row.original._id}
              </div>
            </div>
          </div>
        ),
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "verifyStatus",
        header: "Verify Status",
        cell: (row) => (
          <p
            className={`capitalize ${
              row.row.original.verifyStatus === "verified"
                ? "text-[#1a9c1a]"
                : "text-[#f51c1c]"
            } font-medium`}
          >
            {row.row.original.verifyStatus}
          </p>
        ),
      },
      {
        accessorKey: "request",
        header: "Request",
        cell: (row) => (
          <div>
            {row.row.original.verifyStatus === "requested" &&
            row.row.original.verifyStatus !== "verified" ? (
              <div className="flex flex-col justify-center items-center gap-2">
                <button
                  onClick={() =>
                    handleVerificationRequest(row.row.original._id, "verified")
                  }
                  className="bg-[#088008] rounded-lg text-white px-4 py-1 font-medium"
                >
                  Verify
                </button>
                <button
                  onClick={() =>
                    handleVerificationRequest(row.row.original._id, "declined")
                  }
                  className="bg-[#dd1616] text-white px-4 py-1 rounded-lg font-medium"
                >
                  Decline
                </button>
              </div>
            ) : (
              <p>No request</p>
            )}
          </div>
        ),
      },
    ],
    []
  );

  // get the data
  const data = useMemo(() => allUsers ?? [], [allUsers]);

  // tanStack table
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageIndex: 0, pageSize: 10 } },
  });

  if (allUsersPending) {
    return <LoadingAnimation />;
  }

  return (
    <div className="lg:min-h-[100vh] flex flex-col justify-start items-center gap-5 w-full">
      <h2 className="text-center text-4xl md:text-5xl font-bold text-main capitalize">
        All User List
      </h2>

      {/* all user list table */}
      <div className="overflow-x-auto w-full mt-8">
        <table className="table font-body text-center">
          {/* head */}
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="text-[15px] text-blue">
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="table-description text-sub">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          {/* body */}
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="text-center table-description">
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
          <span>
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>
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

export default AllUsers;
