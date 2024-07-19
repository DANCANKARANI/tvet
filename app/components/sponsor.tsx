import Link from "next/link";

interface SponsorProps {
    name: string;
    description: string;
    application: string;
}
let application_link = "apply"


const Sponsor: React.FC<SponsorProps> = ({ name, description, application }) => (
    <div>
        <div className="flex p-20px text-20">
            <div className="job-item">{name}</div>
            <div className="job-item">{description}</div>
            <div className="job-item" style={{ color: "blue" }}><Link href={application}>apply here</Link></div>
        </div>
        <br />
    </div>
);

export default Sponsor;