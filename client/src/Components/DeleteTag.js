import React from 'react'

function DeleteTag({index,setTags,tag}) {

    const deleteTag = (index) => {
        setTags((prevState) => prevState.filter((tag, i) => i !== index));
      };
    return (
        <>
            {tag}
            <button onClick={() => deleteTag(index)}>x</button> 
        </>
    )
}

export default DeleteTag
