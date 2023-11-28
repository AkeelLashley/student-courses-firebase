import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCourse } from "../api/user.firestore";
import { useAuth } from "../context/AuthContext";
import { CourseType } from "../types/course.types";

const CourseDetail = () => {
  const [course, setCourse] = useState<CourseType | null>(null);
  const { courseId } = useParams();
  const { authUser } = useAuth();

  useEffect(() => {
    if (!authUser || !courseId) return;

    const fetchCourse = async () => {
      const fetchedCourse = await getCourse(authUser.uid, courseId);
      if (fetchedCourse) {
        setCourse(fetchedCourse);
      }
    };

    fetchCourse();
  }, [authUser, courseId]);
  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Course Detail</h2>
      <p>Title: {course.title}</p>
    </div>
  );
};

export default CourseDetail;
