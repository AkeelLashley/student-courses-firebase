import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { CourseType } from "../types/course.types";
import { firestore } from "../utils/firebase/firebase.config";

export const addCourse = async (userId: string, courseData: CourseType) => {
  const userCoursesRef = collection(firestore, `users/${userId}/courses`);
  try {
    const docRef = await addDoc(userCoursesRef, courseData);
    return docRef;
  } catch (error) {
    console.error("Error adding course", error);
  }
};

export const getCourses = async (userId: string) => {
  const userCoursesRef = collection(firestore, `users/${userId}/courses`);
  try {
    const snapshot = await getDocs(userCoursesRef);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching courses", error);
  }
};

export const updateCourse = async (
  userId: string,
  courseId: string,
  courseData: CourseType
) => {
  const courseRef = doc(firestore, `users/${userId}/courses/${courseId}`);
  try {
    await updateDoc(courseRef, courseData);
  } catch (error) {
    console.error("Error updating course", error);
  }
};

export const deleteCourse = async (userId: string, courseId: string) => {
  const courseRef = doc(firestore, `users/${userId}/courses/${courseId}`);
  try {
    await deleteDoc(courseRef);
  } catch (error) {
    console.error("Error deleting course", error);
  }
};

export const getCourse = async (userId: string, courseId: string) => {
  const courseRef = doc(firestore, `users/${userId}/courses/${courseId}`);
  try {
    const snapshot = await getDoc(courseRef);
    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() } as CourseType;
    } else {
      console.log("No such course!");
    }
  } catch (error) {
    console.error("Error fetching course", error);
  }
};
