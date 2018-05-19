const ROUTES = {
    home: '#all',
    completeTasks: '#complete-tasks',
    incompleteTasks: '#incomplete-tasks',
}

class TaskApp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentRoute: ROUTES.home,
            tasks: [
                {
                    id: 1,
                    description: 'Go to bed',
                    complete: true
                },
                {
                    id: 2,
                    description: 'Record a tutorial',
                    complete: false
                },
                {
                    id: 3,
                    description: 'Watch a movie',
                    complete: false
                },
            ]
        };

        this.addTask = this.addTask.bind(this);
    }

    componentDidMount() {
        window.onhashchange = (e) => {
            this.setState({ currentRoute: window.location.hash })
        }
    }

    allTasks() {
        return this.state.tasks;
    }

    completeTasks() {
        return this.state.tasks.filter(task => task.complete);
    }

    incompleteTasks() {
        return this.state.tasks.filter(task => !task.complete);
    }

    renderRoute() {
        switch(this.state.currentRoute) {
            case ROUTES.home: return <App tasks={this.allTasks()} title="All tasks" />;
    case ROUTES.completeTasks: return <App tasks={this.completeTasks()} title="Complete tasks" />;
    case ROUTES.incompleteTasks: return <App tasks={this.incompleteTasks()} title="Incomplete tasks" />;
    default: return <NotFound />;
    }
    }

    addTask(e) {
        e.preventDefault();

        this.setState((prevState) => {
            const newTask = {
                id: prevState.tasks.length + 1,
                description: this.newTaskDescription.value,
                complete: false
            }

            this.addTaskForm.reset();

            return {
                tasks: [...prevState.tasks, newTask]
            }
        })
    }

    render() {
        return (
            <div>
            <ul>
            <li><a href={ROUTES.home}>All tasks</a></li>
        <li><a href={ROUTES.completeTasks}>Complete tasks</a></li>
        <li><a href={ROUTES.incompleteTasks}>Incomplete tasks</a></li>
        </ul>

        <form onSubmit={this.addTask} ref={ input => this.addTaskForm = input }>
    <input type="text"
        defaultValue="Enter a new task"
        ref={ input => this.newTaskDescription = input }
        required
        placeholder="Enter a description"/>
            <input type="submit" value="Add Task"/>
            </form>

        {this.renderRoute()}
    </div>
    )
    }
}

const App = (props) => (
    <div>
    <h1>{props.title}</h1>
{ props.tasks.map(task => <Task key={task.id} task={task} />) }
</div>
);

    const Task = (props) => {
        const placeholder = props.task.complete
            ? <strike>#{props.task.id} - {props.task.description}</strike>
    : <span>#{props.task.id} - {props.task.description}</span>;

        return <article><h1>{placeholder}</h1></article>
    };

    const NotFound = () => <h1>Page not found</h1>;

    ReactDOM.render(<TaskApp />, document.getElementById('tasklist'));