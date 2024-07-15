import Link from "next/link";

interface JobProps {
    title: string;
    description: string;
    application: string;
}
let application_link = "apply"

const Job: React.FC<JobProps> = ({ title, description, application }) => (
    <div>
        <section className="section flex  p-20px text-20">
            <div className="header-item">Title</div>
            <div className="header-item">Description</div>
            <div className="header-item">Application</div>
        </section>
        <div className="flex p-20px text-20">
            <div className="job-item">{title}</div>
            <div className="job-item">{description}</div>
            <div className="job-item" style={{ color: "blue" }}><Link href={application}>apply here</Link></div>
        </div>
    </div>
);

export default Job;