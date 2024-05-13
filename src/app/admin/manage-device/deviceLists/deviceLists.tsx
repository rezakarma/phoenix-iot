import GetToken from "@/app/auth/getToken";
import { Devices, columns } from "./columns";
import { DataTable } from "@/components/admin/tableData/data-table";
import GetAllDevices from "../../adminActions/getAllDevices";

async function getData(): Promise<any[]> {
  // Fetch data from your API here.
  const userToken = await GetToken();
  const result =await GetAllDevices()

  if (result.ok) {
    const response = await result.json();
    if (response.items) {

        const modifiedData = response.items.map(obj => ({
            id: obj.id,
            identifier: obj.identifier,
            setting: obj.setting,
            belongToUsername: obj.belongToUsername,
            temperature: obj.temperature,
            humidity: obj.humidity,
            isSync: obj.isSync
          }));

      return modifiedData;
    }
  }
  return [];
}

export default async function DeviceList() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable searchOption='identifier' columns={columns} data={data} />
    </div>
  );
}
