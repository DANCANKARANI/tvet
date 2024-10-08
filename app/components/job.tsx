import Link from "next/link";

interface JobProps {
    title: string;
    role: string;
    application: string;
}
let application_link = "apply"


const Job: React.FC<JobProps> = ({ title, role, application }) => (
    <div>
        <div className="flex p-20px text-20">
            <div className="job-item">{title}</div>
            <div className="job-item">{role}</div>
            <div className="job-item" style={{ color: "blue" }}><Link href={application}>apply here</Link></div>
        </div>
        <br />
    </div>
);

export default Job;