import React, { useState, useEffect } from "react";
import Todo from "./Todo";
// import { todosRef } from "./firebase";
import {
  TopAppBar,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarNavigationIcon,
  TopAppBarActionItem,
  TopAppBarTitle,
  TopAppBarFixedAdjust,
  SimpleTopAppBar
} from "@rmwc/top-app-bar";
// import '@rmwc/top-app-bar/styles';
// import '@rmwc/icon/styles';
// import '@rmwc/icon/icon.css';
import '@rmwc/top-app-bar/styles';
// import '@rmwc/icon/styles';
// import '@rmwc/icon/icon.css';
import '@rmwc/data-table/styles';
import { DataTable, DataTableContent, DataTableHead, DataTableHeadCell, DataTableRow, DataTableBody, DataTableCell } from "@rmwc/data-table";
// import "@material/top-app-bar/dist/mdc.top-app-bar.css";


function TodoList() {
  const [todos, setTodos] = useState<any>([]);
  useEffect(() => {
    // todosRef.on('value', (snapshot) => {
    //   let items = snapshot.val();
    //   let newState = [];
    //   for (let item in items) {
    //     newState.push({
    //       id: item,
    //       task: items[item].task,
    //       done: items[item].done
    //     });
    //   }
    //   setTodos(newState)
    // });
  }, [])
  const [checked, setChecked] = React.useState({});
  const sampleRows = new Array(5).fill(undefined);
  return (
    <div>

      <SimpleTopAppBar
        title="test"
        navigationIcon
        onNav={() => console.log('Navigate')}
        actionItems={[
          {
            icon: 'logout',
            onClick: () => console.log('Do Something')
          }
        ]}
      />
      <TopAppBarFixedAdjust />
      <DataTable>
        <DataTableContent>
          <DataTableHead>
            <DataTableRow>
              <DataTableHeadCell hasFormControl>
                {/* <Checkbox /> */}
              </DataTableHeadCell>
              <DataTableHeadCell>Label</DataTableHeadCell>
              <DataTableHeadCell>Header</DataTableHeadCell>
              <DataTableHeadCell>Header</DataTableHeadCell>
              <DataTableHeadCell>Toggle</DataTableHeadCell>
            </DataTableRow>
          </DataTableHead>
          <DataTableBody>
            {sampleRows.map((v, i) => (
              <DataTableRow key={i} >
                <DataTableCell hasFormControl>
                  {/* <Checkbox
                  checked={checked[i]}
                  onChange={evt => {
                    checked[i] = evt.currentTarget.checked;
                    setChecked({ ...checked });
                  }}
                /> */}
                </DataTableCell>
                <DataTableCell>Label</DataTableCell>
                <DataTableCell>
                  {/* <Select
                  placeholder="--Select--"
                  options={['Cookies', 'Pizza', 'Icecream']}
                /> */}
                </DataTableCell>
                <DataTableCell>R{i} C3</DataTableCell>
                <DataTableCell>
                  {/* <Switch /> */}
                </DataTableCell>
              </DataTableRow>
            ))}
          </DataTableBody>
        </DataTableContent>
      </DataTable>
      {todos.map((todo: any, i: number) => (
        <React.Fragment key={todo.id}>
          <Todo todo={todo} />
          {i < todos.length - 1}
        </React.Fragment>
      ))}
    </div>
  );
}
export default TodoList;