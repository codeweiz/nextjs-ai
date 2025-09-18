import SideNav from "@microboat/acme/app/ui/dashboard/sidenav";
import {getConfig} from "@microboat/common/config";


export default async function Layout({children}: { children: React.ReactNode }) {
    const appConfig = await getConfig()
    console.log("acme dashboard layout app config", appConfig)

    return (
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
            <div className="w-full flex-none md:w-64">
                <SideNav/>
            </div>
            <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
                {children}
            </div>
        </div>
    )
}
