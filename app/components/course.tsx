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
            <div className="job-item">{level}</div>
            <div className="job-item">{course_name}</div>
            <div className="job-item">{kcse_grade}</div>
        </div>
        <br />
    </div>
);

export default Job;