import React, { useState, useEffect } from 'react'
import "./style.css"
const Todo = () => {

    //adding local storage

    const getLocalStorageData = () => {
        const list = localStorage.getItem("myTodolist")
        if (list) {
            //list is in string so we have to convert it into array
            return JSON.parse(list)

        }
        else { return [] }
    }

    const [inputData, setInputData] = useState("")
    const [item, setitem] = useState(getLocalStorageData())
    const [isEditedItem, setIsEditedItem] = useState("")
    const [toggleBtn, setToggleBtn] = useState(false)

    useEffect(
        () => {
            localStorage.setItem("myTodolist", JSON.stringify(item))
        }, [item]

    )
    //Adding Item Functions

    const AddItem = () => {
        if (!inputData) {
            alert("please fill the ")
        }
        else if(inputData && toggleBtn) {
            
            setitem(
                item.map(
                (curEle)=>{
                    if ( curEle.id===isEditedItem){
                        return {...curEle,name:inputData}
                    }
                    return curEle
                    
                }

            ))
       setToggleBtn(false)
      
        }
        else {
            const newInputData = {

                id: new Date().getTime().toString(),
                name: inputData


            }
            setitem([...item, newInputData]);
         
        }
        setInputData("")
    }
    // how to delete items section
    const deleteItem = (index) => {
        const updatedItems = item.filter((curElem) => {
            return curElem.id !== index;
        });
        setitem(updatedItems);
    };
    //removing all
    const removeAll = () => {
        setitem([])
    }
    //Eddit items
    const editItems = (index) => {
        const item_todo_edited = item.find(
            (curEle) => {
                return curEle.id === index;
            }

        )
        setInputData(item_todo_edited.name)
        setIsEditedItem(index)
        setToggleBtn(true)
    }
    return (
        <div>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src="./images/todo.svg" alt="todologo" srcSet="" />
                        <figcaption>Add Your List here 🤞</figcaption>
                    </figure>
                    <div className="addItems">
                        <input
                            type="text"
                            placeholder="✍ Add Item"
                            className="form-control"

                            value={inputData}
                            onChange={(event) => setInputData(event.target.value)}
                        />
                        {toggleBtn ? (<i className="far fa-edit add-btn" onClick={() => AddItem()}></i>
                        ):(<i className="fa fa-plus add-btn" onClick={() => AddItem()}></i>
                        )}
                         
                    </div>
                    {/* showing items */}
                    <div className="showItems">

                        {
                            item.map(
                                (curEle) => {
                                    return (
                                        <>
                                            <div key={curEle.id} className="eachItem">
                                                <h3>{curEle.name}</h3>
                                                <div className="todo-btn">
                                                    <i className="far fa-edit add-btn" onClick={() => { editItems(curEle.id) }}></i>
                                                    <i className="far fa-trash-alt add-btn" onClick={() => deleteItem(curEle.id)}></i>
                                                </div>
                                            </div>
                                        </>
                                    )
                                }
                            )
                        }

                    </div>
                    {/* {removing btns} */}
                    <div className="showItems">
                        <button className="btn effect04" data-sm-link-text="Remove All" onClick={() => removeAll()}>
                            <span>Check List</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Todo
