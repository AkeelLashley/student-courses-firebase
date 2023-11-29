import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { addCourse, getCourses, deleteCourse } from "../api/course.firestore";
import { useAuth } from "../context/AuthContext";
import { CourseType } from "../types/course.types";

const Dashboard = () => {
  const { authUser } = useAuth();
  const userId = authUser ? authUser.uid : null;

  const [courses, setCourses] = useState<CourseType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) return;

    const fetchCourses = async () => {
      const fetchedCourses = await getCourses(userId);
      setCourses(fetchedCourses || []);
    };

    fetchCourses();
  }, [userId]);

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      if (!userId) return;

      await addCourse(userId, { title: values.title });
      resetForm();
      const fetchedCourses = await getCourses(userId);
      setCourses(fetchedCourses || []);
    },
  });

  const handleDelete = async (courseId: string) => {
    if (!userId) return;

    await deleteCourse(userId, courseId);
    const fetchedCourses = await getCourses(userId);
    setCourses(fetchedCourses || []);
  };

  const handleCourseClick = (courseId: string) => {
    navigate(`/courses/${courseId}`);
  };

  if (!userId) {
    return <div>Loading or not authenticated...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Dashboard</h2>
      <form onSubmit={formik.handleSubmit} className="mb-4">
        <input
          id="title"
          name="title"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.title}
          placeholder="Course Title"
          className="p-2 border border-gray-300 rounded mr-2"
        />
        {formik.touched.title && formik.errors.title ? (
          <div className="text-red-500 text-sm">{formik.errors.title}</div>
        ) : null}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Course
        </button>
      </form>

      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Course Title</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td className="border px-4 py-2">{course.title}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleCourseClick(course.id)}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2"
                >
                  View
                </button>
                <button
                  onClick={() => handleDelete(course.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
