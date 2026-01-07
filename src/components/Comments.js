import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "https://jsonplaceholder.typicode.com/comments";

function Comments() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios.get(API).then((res) => {
      setComments(res.data.slice(0, 10));
    });
  }, []);


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");

const add = () => {
    if(!name || !email || !body)
    {
        alert("please fill the all fields properly");
        return;
    }
    axios.post(API,{
        name,
        email,
        body,
        postId:1
    })
    .then(res => {
        setComments([...comments, res.data]);
        setName("");
        setEmail("");
        setBody("");
        alert("comment added successfully");
    });
};

const undo = () => {
    setComments(comments.slice(0,-1));
};




  return (
    <>
    <h2 className="bg-info py-3" style={{color:"white", fontWeight:"500"}}>THIS IS COMMENTS TABLE</h2>
    <div className="container mt-4 border p-3 bg-light">
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>S.No</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>COMMENTS</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {comments.map((comment) => (
            <tr key={comment.id}>
              <td>{comment.id}</td>
              <td>{comment.name} </td>
              <td> {comment.email} </td>
              <td> {comment.body} </td>
              <td>-</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
            <tr >
                <td className="bg-primary" style={{color:"white", fontWeight:"500"}}>EDIT</td>
                <td className="bg-primary">
                    <input type="text" className="form-control" placeholder="enter the name" value={name} onChange={(e) => setName(e.target.value)}/>
                </td>
                <td className="bg-primary">
                    <input type="email" className="form-control" placeholder="enter the email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </td>
                <td className="bg-primary">
                    <input type="text" className="form-control" placeholder="enter the comment" value={body} onChange={(e) => setBody(e.target.value)}/>
                </td>
                <td className="bg-primary">
                    <button className="btn btn-success px-3 mb-2" onClick={add}>ADD</button>
                    <button className="btn btn-danger" onClick={undo}>UNDO</button>
                </td>


            </tr>
        </tfoot>
      </table>
    </div>
    </>
  );
}

export default Comments;
