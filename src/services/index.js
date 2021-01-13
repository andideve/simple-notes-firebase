import { database, auth, storage } from "../config/firebase";

export const fstorage = {
  upload: (ref, name, data, cb) => {
    name = `${new Date().getTime()}_${name}`;

    const uploadTask = storage.ref(`${ref}/${name}`).put(data);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log(`upload progress: ${progress}%`);
      },
      (err) => {
        console.error(`failed to upload ${name} `, err);
        cb(false);
      },
      () => {
        storage
          .ref(ref)
          .child(name)
          .getDownloadURL()
          .then((url) => cb({ image_name: name, image_url: url }));
      }
    );
  },
  del: (ref, name, cb) => {
    storage
      .ref(ref)
      .child(name)
      .delete()
      .then(() => cb(true))
      .catch((err) => {
        console.error(`failed to delete ${name} `, err);
        cb(false);
      });
  },
  list: (ref, cb) => {
    storage
      .ref(`${ref}/`)
      .listAll()
      .then((res) => cb(res))
      .catch((err) => {
        console.error(err);
        cb(false);
      });
  },
};

export const get = (ref, cb) => {
  database
    .ref(`/${ref}/`)
    .once("value")
    .then((snapshot) => cb(snapshot.val()))
    .catch((err) => {
      console.error(`retrieve failed ${ref} data `, err);
    });
};

export const post = (ref, index, data, cb) => {
  database
    .ref(`${ref}/`)
    .child(index)
    .set(data)
    .then(() => cb(true))
    .catch((err) => {
      console.error(`failed to post ${ref} `, err);
      cb(false);
    });
};

export const put = (ref, data, cb) => {
  database
    .ref(`${ref}/`)
    .set(data)
    .then(() => cb(true))
    .catch((err) => {
      console.error(`failed to put ${ref} `, err);
      cb(false);
    });
};

// export const del = async (ref, index, cb) => {
// 	try {
//   	await database.ref(`${ref}/${index}`).remove();
//   	cb(true);
// 	} catch(err) {
// 		console.error(err);
// 		cb(false);
// 	}
// }

export const register = (email, pass, cb) => {
  auth
    .createUserWithEmailAndPassword(email, pass)
    .then((result) => {
      cb(false, result);
    })
    .catch((err) => {
      console.error(err);
      cb(err, null);
    });
}

export const login = (email, pass, cb) => {
  auth
    .signInWithEmailAndPassword(email, pass)
    .then((result) => {
      cb(false, result);
    })
    .catch((err) => {
      console.error(err);
      cb(err, null);
    });
};

export const getLogin = (cb) => {
  auth.onAuthStateChanged((user) => cb(user));
};

export const signOut = async (cb) => {
  try {
    await auth.signOut();
    if (!cb) return;
    cb(true);
  } catch (err) {
    console.error(err);
    if (!cb) return;
    cb(false);
  }
};
