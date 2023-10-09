const AdminTable = ({ headers, data }) => {
  return (
    <div className="overflow-y-auto my-2">
      <table className="w-full border whitespace-nowrap  dark:border-neutral-500">
        <thead>
          <tr className="h-8 w-full text-md leading-none text-gray-600">
            {headers.map((item) => (
              <th
                key={item}
                className="font-bold text-left dark:border-neutral-800 border-2 px-3"
              >
                {item}
              </th>
            ))}
            <th className="font-bold text-center  dark:border-neutral-800 border-2 w-20 px-3">
              Action
            </th>
          </tr>
        </thead>
         <tbody className="w-full">

         </tbody>
      </table>
    </div>
  );
};
export default AdminTable;
