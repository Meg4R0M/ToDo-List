import React from "react";
import ROUTES from "../router/Router";

const Menu = (props) => {
    return (
        <div className="header">
            <h2>{props.title}</h2>
            <h3>
                <a href={ROUTES.home}>All tasks</a> -
                <a href={ROUTES.completeTasks}>Complete tasks</a> -
                <a href={ROUTES.incompleteTasks}>Incomplete tasks</a>
            </h3>
        </div>
    )
};

export default Menu;