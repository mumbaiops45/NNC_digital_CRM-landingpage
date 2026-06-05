import AnnouncementBar from "@/components/nnc-crm/AnnouncementBar";
import NNCNavbar from "@/components/nnc-crm/NNCNavbar";

export default function NNCCRMLayout({ children }) {
    return (
        <body>  <AnnouncementBar />

            <div className="sticky top-0 left-0 right-0 z-50">
                <NNCNavbar />


            </div>

            {children}
        </body>
    );
}