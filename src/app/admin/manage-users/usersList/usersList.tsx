import GetToken from "@/app/auth/getToken";
import { Payment, columns } from "./columns";
import { DataTable } from "../../../../components/admin/tableData/data-table";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  const userToken = await GetToken();
  const result = await fetch(
    `${process.env.API_ENDPOINT}/users/get-all-users`,
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }
  );

  if (result.ok) {
    const response = await result.json();
    if (response.items) {
      return response.items;
    }
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
