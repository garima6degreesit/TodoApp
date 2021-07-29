import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { DataTable, DataTableContent, DataTableHead, DataTableHeadCell, DataTableRow, DataTableBody, DataTableCell } from "@rmwc/data-table";
import { Checkbox } from "@rmwc/checkbox";
import { Button } from "@rmwc/button";
import '@rmwc/checkbox/styles';
import '@material/button/dist/mdc.button.css';
import '@rmwc/data-table/styles';


function TodoList(props: any) {
  const [todos, setTodos] = useState<Array<any>>([]);
  const [checked, setChecked] = useState<any>({});

  useEffect(() => {
    if (props?.currentUser) {
      getTodo();
    }
  }, [])

  function getTodo() {
    db.collection("todo").where("owner", "==", props?.currentUser?.uid).orderBy("createdAt", "asc").onSnapshot(function (querySnapshot) {
      let newState: { id: any; title: any; isComplete: any; }[] = [];
      querySnapshot.docs.map((doc) => {
        let data = doc.data();
        newState.push({
          id: doc.id,
          title: data.title,
          isComplete: data.isComplete
        })
      })
      setTodos(newState);
    })
  }

  function updateTodo(e: any, v: any) {
    console.log(e, v)
    db.collection("todo").doc(v?.id).update({
      isComplete: !v?.isComplete
    })
  }

  function deleteTodo(v: any) {
    console.log(v)
    db.collection("todo").doc(v?.id).delete();
  }

  return (
    <>
      {todos && todos?.length > 0 && (
        <DataTable style={{ width: '100%' }}>
          <DataTableContent>
            <DataTableHead>
              <DataTableRow>
                <DataTableHeadCell hasFormControl>
                </DataTableHeadCell>
                <DataTableHeadCell>Title</DataTableHeadCell>
                <DataTableHeadCell>Status</DataTableHeadCell>
                <DataTableHeadCell>Delete</DataTableHeadCell>
              </DataTableRow>
            </DataTableHead>
            <DataTableBody>
              {todos.map((v, i) => (
                <DataTableRow key={i} >
                  <DataTableCell hasFormControl>
                    <Checkbox
                      checked={checked[i]}
                      onChange={evt => {
                        updateTodo(evt, v);
                        checked[i] = evt.currentTarget.checked;
                        setChecked({ ...checked });
                      }}
                    />
                  </DataTableCell>
                  <DataTableCell>{v?.title}</DataTableCell>
                  <DataTableCell>
                    <DataTableCell>{v?.isComplete === true ? "Completed" : "Incomplete"}</DataTableCell>
                  </DataTableCell>
                  <DataTableCell>
                    <Button onClick={() => deleteTodo(v)} label="Delete" raised />
                  </DataTableCell>
                </DataTableRow>
              ))}
            </DataTableBody>
          </DataTableContent>
        </DataTable>
      )}
    </>
  );
}
export default TodoList;