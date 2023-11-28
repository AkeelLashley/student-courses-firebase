import firebase from "firebase/compat/app";

export type UserType = {
  uid: string;
  displayName: string;
  email: string;
  createdAt: firebase.firestore.Timestamp;
};
