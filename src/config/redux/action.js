import { store } from "./store";
import { database } from "../firebase";

export const getNotes = (uid) => {
    database
        .ref("notes/")
        .child(uid)
        .on("value", (snapshot) => {
            const data = snapshot.val();
            store.dispatch({ type: "SET_NOTES", data });
        });
}
