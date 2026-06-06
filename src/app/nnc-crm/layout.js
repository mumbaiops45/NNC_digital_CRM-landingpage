import AnnouncementBar from "@/components/nnc-crm/AnnouncementBar";
import NNCNavbar from "@/components/nnc-crm/NNCNavbar";

export const metadata = {
  title: 'NNC Digital CRM — Smart CRM Software for Small Businesses in India',
  description:
    'NNC Digital CRM helps small businesses capture leads, automate follow-ups, manage pipelines, and close more deals. Free 14-day trial. No credit card required. Trusted by 500+ Indian businesses.',
keywords: [
  'CRM software India',
  'CRM for small business',
  'lead management software',
  'sales CRM India',
  'customer management software',
  'CRM for SMB India',
  'best CRM India',
  'NNC Digital CRM',
  'CRM software for small business India',
  'affordable CRM India',
  'lead management CRM India',
  'sales pipeline management software',
  'WhatsApp CRM India',
  'CRM with WhatsApp integration',
  'best CRM for retail India',
]
 
}

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