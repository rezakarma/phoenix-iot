import GetToken from "@/app/auth/getToken";
import { Devices, columns } from "./columns";
import { DataTable } from "@/components/admin/tableData/data-table";

async function getData(): Promise<any[]> {
  // Fetch data from your API here.
  const userToken = await GetToken();
  const result = await fetch(
    `${process.env.API_ENDPOINT}/device/user-devices`,
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }
  );

  if (result.ok) {
    const response = await result.json();
    if (response.items) {
      const modifiedData = response.items.map((obj) => ({
        id: obj.id,
        identifier: obj.identifier,
        setting: obj.setting,
        belongToUsername: obj.belongToUsername,
        temperature: obj.temperature,
        humidity: obj.humidity,
        isSync: obj.isSync,
        fanSwitch1: obj.fanSwitch1,
        fanSwitch2: obj.fanSwitch2,
        waterSwitch1: obj.waterSwitch1,
        waterSwitch2: obj.waterSwitch2,
        fanSwitchOnAt: obj.fanSwitchOnAt,
        fanSwitchOffAt: obj.fanSwitchOffAt,
        waterSwitchOffAt: obj.waterSwitchOffAt,
      }));

      return modifiedData;
    }
  }
  return [];
}

export default async function UserDeviceList() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable searchOption="identifier" columns={columns} data={data} />
    </div>
  );
}
