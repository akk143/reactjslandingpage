import React, { useEffect } from "react";
import { fetchtodo } from "../../store/todoreducer";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router';

const TodoList = () => {

    const { todos } = useSelector(state => state.todos);
    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(fetchtodo())
        .unwrap()
        .then(response => {
            console.log(response);
        })
        .catch(err => {
            console.log(err);
        });

    }, [dispatch]);

    return(
        <div>
            <h3>To Lists</h3>
            <Link to='/add'>Create New Todo</Link>
            <ul>
                { todos.map(todo => (
                    <li key={todo.id}>
                        { todo.name }, { todo.email }
                        <Link to={`/edit/${todo.id}`}>Edit</Link>
                        <Link to={`/delete/${todo.id}`}>Delete</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default TodoList