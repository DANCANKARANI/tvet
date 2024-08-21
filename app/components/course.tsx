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
        <br />
        <div className="flex p-20px text-20">
            <div className="job-item">Artisan</div>
            <div className="job-item">Catering</div>
            <div className="job-item">D +</div>
        </div>
        <br />
        <div className="flex p-20px text-20">
            <div className="job-item">Certificate</div>
            <div className="job-item">Mechanical Engineering</div>
            <div className="job-item">C +</div>
        </div>
        <br />
        <div className="flex p-20px text-20">
    <div className="job-item">Certificate</div>
    <div className="job-item">Mechanical Engineering</div>
    <div className="job-item">C+</div>
</div>
<div className="flex p-20px text-20">
    <div className="job-item">Diploma</div>
    <div className="job-item">Electrical Engineering</div>
    <div className="job-item">C</div>
</div>
<div className="flex p-20px text-20">
    <div className="job-item">Advanced Diploma</div>
    <div className="job-item">Civil Engineering</div>
    <div className="job-item">B-</div>
</div>
<div className="flex p-20px text-20">
    <div className="job-item">Diploma</div>
    <div className="job-item">Automotive Engineering</div>
    <div className="job-item">C</div>
</div>
<div className="flex p-20px text-20">
    <div className="job-item">Certificate</div>
    <div className="job-item">Plumbing</div>
    <div className="job-item">D+</div>
</div>
<div className="flex p-20px text-20">
    <div className="job-item">Diploma</div>
    <div className="job-item">Information Technology</div>
    <div className="job-item">C</div>
</div>
<div className="flex p-20px text-20">
    <div className="job-item">Advanced Diploma</div>
    <div className="job-item">Telecommunication Engineering</div>
    <div className="job-item">B</div>
</div>
<div className="flex p-20px text-20">
    <div className="job-item">Certificate</div>
    <div className="job-item">Carpentry and Joinery</div>
    <div className="job-item">D+</div>
</div>
<div className="flex p-20px text-20">
    <div className="job-item">Diploma</div>
    <div className="job-item">Building and Construction</div>
    <div className="job-item">C-</div>
</div>
<div className="flex p-20px text-20">
    <div className="job-item">Certificate</div>
    <div className="job-item">Culinary Arts</div>
    <div className="job-item">C-</div>
</div>

    </div>
);

export default Job;