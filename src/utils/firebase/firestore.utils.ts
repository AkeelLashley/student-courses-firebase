import { UserAuthType } from "../../types/userAuth.types";
import {
  doc,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { firestore } from "./firebase.config";
import { CourseType } from "../../types/course.types";

export const createUserProfileDocument = async (user: UserAuthType | null) => {
  if (!user) return undefined;

  const userRef = doc(firestore, `users/${user.uid}`);
  const snapShot = await getDoc(userRef);

  if (!snapShot.exists()) {
    const { displayName, email } = user;
    const createdAt = new Date();
    try {
      await setDoc(userRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.error("Error creating user", error);
    }
  }

  return userRef;
};


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
