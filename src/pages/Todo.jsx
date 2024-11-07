import { doc, getDoc, updateDoc, deleteDoc, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { auth, db } from '../config/firebase/firebaseconfig';
import { collection, addDoc } from "firebase/firestore";

const Todo = () => {
    const todo = useRef();
    const [todos, setTodos] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [editText, setEditText] = useState('');



    const deleteTodo = async (index) => {
        const itemToDelete = todos[index];

        if (!itemToDelete || !itemToDelete.docid) {
            console.error("Error: itemToDelete or docid is undefined.");
            return;
        }

        todos.splice(index, 1);
        setTodos([...todos]);

        try {
            await deleteDoc(doc(db, "users", itemToDelete.docid));
            console.log("Document deleted successfully.");
        } catch (error) {
            console.error("Error deleting document: ", error);
        }
    };


const startEditTodo = (index) => {
    setEditIndex(index); 
    setEditText(todos[index].todo); 
}

const saveTodo = async (index) => {
    todos[index].todo = editText;
    setTodos([...todos]);
    setEditIndex(null); 

    try {
        const todoRef = doc(db, "users", todos[index].docid);

        await updateDoc(todoRef, {
            todo: editText
        });
        console.log("Todo updated successfully in Firebase.");
    } catch (error) {
        console.error("Error updating todo in Firebase: ", error);
    }

    setEditText(''); 
};

    useEffect(() => {
        const getdbFromFirebase = async () => {
            const q = query(collection(db, "users"), where("uid", "==", auth.currentUser.uid));
            const querySnapshot = await getDocs(q);

            const fetchedTodos = [];
            querySnapshot.forEach((doc) => {
                fetchedTodos.push({
                    ...doc.data(),
                    docid: doc.id
                });
            });

            setTodos(fetchedTodos);
        };
        getdbFromFirebase();
    }, []);

    const addTodo = async (event) => {
        event.preventDefault();
        const newTodo = todo.current.value;

        setTodos([...todos, { todo: newTodo }]);

        try {
            const docRef = await addDoc(collection(db, "users"), {
                todo: newTodo,
                uid: auth.currentUser.uid
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        todo.current.value = '';
    };

    return (
        <>
            <div className="container shadow d-flex flex-column align-items-center mt-5">
                <form className="d-flex gap-3 mb-5 mt-5" onSubmit={addTodo}>
                    <input
                        type="text"
                        ref={todo}
                        className="form-control border border-black"
                        placeholder="Enter a task"
                        style={{ width: '250px' }}
                    />
                    <button className="btn btn-info border border-white text-white border-2" type="submit" style={{ backgroundColor: "#113065" }}>Add Todo</button>
                </form>
                <ol className="list-group mt-3 mb-5" style={{ width: '800px' }}>
                    {todos.map((item, index) => (
                        <li key={index} className="mt-1 mb-1 list-group-item d-flex justify-content-between align-items-center">
                            {editIndex === index ? (
                                // Inline editing input when editing
                                <input
                                    type="text"
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                />
                            ) : (
                                // Display the todo text when not editing
                                item.todo
                            )}
                            <div>
                                {editIndex === index ? (
                                    // Save button when editing
                                    <button className="rounded btn btn-sm btn-success me-1" onClick={() => saveTodo(index)}>Save</button>
                                ) : (
                                    // Edit button when not editing
                                    <button className="rounded btn btn-sm btn-primary me-1" onClick={() => startEditTodo(index)}>Edit</button>
                                )}
                                <button className="rounded btn btn-sm btn-danger" onClick={() => deleteTodo(index)}>Delete</button>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        </>
    );
};

export default Todo;
