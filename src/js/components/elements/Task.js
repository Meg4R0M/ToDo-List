import React from "react";

const Task = (props) => {
    const placeholder = props.task.complete
        ? <strike>#{props.task.id} - {props.task.description}</strike>
        : <span>#{props.task.id} - {props.task.description}</span>;

    return <article><h1>{placeholder}</h1></article>
};

export default Task;