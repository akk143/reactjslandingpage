import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { deletetodo } from "../../store/todoreducer";

export default function DeleteTodo(){

    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const deleteHandler = (e) => {

        e.preventDefault();

        dispatch(deletetodo(Number(id)))
        .unwrap()
        .then(() => {
            navigate('/');
        });
    }

    return(
        <div>
            <h3>Are you sure you want to delete this user?</h3>
            <button type="button" onClick={ deleteHandler }>Yes, Delete</button>
            <button type="button" onClick={() => navigate(-1)}>Cancel</button>
        </div>
    )
}
