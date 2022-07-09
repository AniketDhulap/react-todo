import React,{useEffect, useState, useRef} from 'react'

const getLocalItems = ()=>{
  let list = localStorage.getItem('lists');
  if(list){
    return JSON.parse(localStorage.getItem('lists'));
  }else{
    return [];
  }
}

const Todos = ()=> {
  const [inputData, setInputData]=useState('');
  const [inlineInput, setInlineInput] = useState('');
  const [items, setItems]=useState(getLocalItems());
  const [toggleSumbit, setToggleSubmit] = useState(false)
  const [isEditItem, setIsEditItem] =useState(null);

  const descRef = useRef();
  

  const add = (event)=>{
    if(event.key === 'Enter'){
      addItem()
  }
  }

  const addItem = ()=>{
    if(!inputData){
      let emptyBox = document.getElementById('messageBox');
      emptyBox.innerHTML=`<p>Please write something..<p/>`;
      emptyBox.style.display="";
      emptyBox.style.color="red"
      setTimeout(()=>{
        emptyBox.innerHTML="";
        emptyBox.style.display="none";
      },3000)
    }
    else{
      const allInputData = {id: new Date().getTime().toString(), name:inputData}
    setItems([...items, allInputData]);
    setInputData('');
    let emptyBox = document.getElementById('messageBox');
      emptyBox.innerHTML=`<p>Add Successfully !<p/>`;
      emptyBox.style.display="";
      emptyBox.style.color="green"
      setTimeout(()=>{
        emptyBox.innerHTML="";
        emptyBox.style.display="none";
        
      },3000)
    }
  }

  const deleteItem = (index)=>{
    const updateditems = items.filter((elem)=>{
      return index !== elem.id;
    })
    setInputData('');
    setItems(updateditems);
    let emptyBox = document.getElementById('messageBox');
      emptyBox.innerHTML=`<p>Deleted Successfully !<p/>`;
      emptyBox.style.display="";
      emptyBox.style.color="green"
      setTimeout(()=>{
        emptyBox.innerHTML="";
        emptyBox.style.display="none";
        
      },3000)
  }

  const setInlineId = (id,e)=>{
    setIsEditItem(id);
    setInlineInput(e.target.value)
  }
  const inlineUpdate = (event)=>{
    console.log('blur')
    if(event.key === 'Enter'){
      setItems(
        items.map((elem)=>{

          if(elem.id===isEditItem && inlineInput){ 
            return{...elem, name:inlineInput}
          }
          return elem;
        })
        )
        setToggleSubmit(true);
        // descRef.current.blur();
        setInlineInput('')
        setIsEditItem(null);
        setTimeout(()=>{
          setToggleSubmit(false);
        },2000)
        
  }
  }

  const removeAll = ()=>{
    setItems([]); 
  }

  useEffect(()=>{
    localStorage.setItem('lists',JSON.stringify(items))

  },[items]);

  useEffect(()=>{
    document.getElementById('messageBox').style.display="none";
  },[])

  const arrowUp = ()=>{
    document.querySelector('.reverseArray').style.flexDirection ='column-reverse'
  }
  const arrowDown = ()=>{
    document.querySelector('.reverseArray').style.flexDirection ='column'
  }

  return (
    <>
      <div className='mainParent'>
       <div className='main-left'>
       <div className='heading'>
         <h3 className='mainHeading'>toDo</h3>
         <div className='hidden'>
           <button className='btn effect' title='New > Old' onClick={arrowUp}><i className="fa-solid fa-arrow-up" ></i></button>
           <button className='btn effect' title='Old > New' onClick={arrowDown}><i className="fa-solid fa-arrow-down" ></i></button>
           <button className='btn effect' title='Remove All' onClick={removeAll}><span>X</span></button>
           </div>
         </div>
       <input type='text' className='input' placeholder='Write something here...' onBlur={(e)=>{e.target.placeholder="Write something here..."}} onFocus={(e)=>{e.target.placeholder=""}} id='listInput' onChange={(e)=>setInputData(e.target.value)} onKeyUp={add} value={inputData}/>
       <div className='BtnBox'>
       <div className='btnAddUp'>
      <input type="button" className='saveBtn' onClick={addItem} value="ADD" />
       </div>
       </div>
       <div id='messageBox'>
       </div>
       <div className='roundedMobile'>
             {
        toggleSumbit ? <div className='updatedMobile'><label className='editbtn deleteBtn' ><i className="fa-solid fa-check"></i><span className="success"> Update Successfully</span></label></div> :
        ''
      }
             </div>
       </div>
       <div className='main-right'>
           <div className='allNotes'>
             <div className='allNotes-inner'>
             <span></span>
           <h4>All Notes</h4>
           <div>
           <button className='btn effect' title='New > Old' onClick={arrowUp}><i className="fa-solid fa-arrow-up" ></i></button>
           <button className='btn effect' title='Old > New' onClick={arrowDown}><i className="fa-solid fa-arrow-down" ></i></button>
           <button className='btn effect' title='Remove All' onClick={removeAll}><span>X</span></button>
           </div>
            </div>
             <div className='rounded'>
             {
        toggleSumbit ? <div className='updated'><label className='editbtn deleteBtn' ><i className="fa-solid fa-check"></i><span className="success"> Update Successfully</span></label></div> :
        ''
      }
             </div>
             </div>
       <div className='reverse'>
         <div className='reverseArray'>
         {items.map((elem)=>{
         return <>
         <div className='list'>
         {/* <p><span><b>Note:- </b></span><input ref={descRef} className='inlineInput' defaultValue={elem.name} onClick={()=>{setInlineId(elem.id)}} onKeyUp={inlineUpdate} onChange={(e)=>{setInlineInput(e.target.value)}}/></p> */}
         <p><span  key={elem.id}><b>Note:- </b></span><input ref={descRef} className='inlineInput' defaultValue={elem.name} onKeyUp={inlineUpdate} onChange={(e)=>{setInlineId(elem.id ,e)}}/></p>
         <div>
         <button className='deleteBtn' onClick={()=>{deleteItem(elem.id)}}><i className="fa-solid fa-trash-can"></i></button>
         </div>
       </div>   
         </>
         }
         )}
         </div>
         </div>
       </div>
       </div>
    </>
  )
}

export default Todos;