import Link from "next/link";

interface CourseProps {
    Level: string;
    CourseName: string;
    KcseGrade: string;
}
let application_link = "apply"


const Job: React.FC<CourseProps> = ({ Level:level, CourseName:course_name, KcseGrade:kcse_grade}) => (
    <div>
        <div className="flex p-20px text-20">
            <div className="job-item">Diploma</div>
            <div className="job-item">software engineering</div>
            <div className="job-item">C +</div>
        </div>
        <br />
        <div className="flex p-20px text-20">
            <div className="job-item">Diploma</div>
            <div className="job-item">Business Administration</div>
            <div className="job-item">C plain</div>
        </div>
    </div>
);

export default Job;