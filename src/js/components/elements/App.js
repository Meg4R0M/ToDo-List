import React from "react";
import Task from "./Task"

const App = (props) => (
    <div>
        <h1>{props.title}</h1>
        { props.tasks.map(task => <Task key={task.id} task={task} />) }
    </div>
);

export default App;