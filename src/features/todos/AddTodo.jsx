import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addtodo } from "../../store/todoreducer";

export default function AddTodo(){

    const [title, setTitle] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const submitHandler = async (e) => {
        e.preventDefault();
        // navigate('/');

        try {
            await dispatch(addtodo({ title })).unwrap();
            navigate('/');
        } catch (err) {
            console.log("Failed To Add New User:", err);
        }
    }


    return(
        <div>
            <h3>Add New Todo</h3>
            <form onSubmit={  submitHandler } >
                <input type="text" placeholder="Enter your name"  onChange={(e) => setTitle(e.target.value)} style={{ backgroundColor: "skyblue", color: "darkblue", width: '30vw', height: "3rem", borderRadius: "10px", display: 'flex', padding: "10px"}} />
                <button type="submit" style={{marginTop: "2rem", width: "33vw", height: "3rem", color: "skyblue", backgroundColor: "darkblue"}}>Submit</button>
            </form>
        </div>
    )
}