import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";
import {
  TopAppBarFixedAdjust,
  SimpleTopAppBar
} from "@rmwc/top-app-bar";
import '@rmwc/top-app-bar/styles';
import '@rmwc/menu/styles';
import { auth, db } from "./firebase";
import firebase from "firebase/app";
import TodoList from "./TodoList";
import { MenuSurface, MenuSurfaceAnchor, SimpleMenu } from "@rmwc/menu";


function TodoForm() {
  const [value, setValue] = useState("");
  const [currentUser, setCurrentUser] = useState<any>();
  const [open, setOpen] = useState(false);

  let history = useHistory();

  useEffect(() => {
    auth.onAuthStateChanged(userAuth => {
      setCurrentUser(userAuth);
      if (userAuth) {
      } else {
        history.push("/")
      }
    })
  }, [])


  const create = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    db.collection("todo").add({
      isComplete: false,
      title: value,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      owner: currentUser?.uid
    })
    setValue("");
  };

  const logout = () => {
    setOpen(false)
    auth.signOut();
    history.push("/");
  }

  return (
    <>
      {currentUser && (
        <>
          <SimpleTopAppBar
            title="Todos"
            navigationIcon
            onNav={() => console.log('Navigate')}
            actionItems={[
              {
                icon: 'logout',
                onClick: () => setOpen(!open)
              }
            ]}
          />
          <MenuSurfaceAnchor>
            <MenuSurface open={open} onClose={() => logout()}>
              <div style={{ padding: '1rem', width: '8rem' }}>Logout</div>
            </MenuSurface>
          </MenuSurfaceAnchor>
          <TopAppBarFixedAdjust />
          <form onSubmit={create}>
            <TextField
              style={{ width: "100%", marginTop: "10px", marginBottom: "10px" }}
              id="outlined-basic"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              label="Add Todo"
              variant="outlined"
            />
          </form>
          <TodoList currentUser={currentUser} />
        </>
      )}
    </>
  );
}
export default TodoForm;