"use cilent"
import GetToken from "@/app/auth/getToken";
import { User, columns } from "./columns";
import { DataTable } from "../../../../components/admin/tableData/data-table";
import GetAllUsers from "../../adminActions/getAllUsers";

async function getData(): Promise<User[]> {
  // Fetch data from your API here.
  const response = await GetAllUsers()

    if (response.items) {
      console.log(response.items)
      return response.items;
    }
  return [];
}

export default async function UsersList() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable searchOption='username' columns={columns} data={data} />
    </div>
  );
}
