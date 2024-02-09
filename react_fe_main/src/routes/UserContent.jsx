import React, { useEffect } from 'react';
import Editor from "../components/LexicalEditor";
import { useParams } from 'react-router-dom';


const UserContent = () => {
  
  const { id } = useParams();
  console.log('route user_id', { id });
  return (
    <div>
      <h2>User content</h2>
      <Editor user_id={id}></Editor>
    </div>
  );
};

export default UserContent;
