let tet = [{id:1,name:'Aniket'},{id:2,name:'Dhulap'}];



const getName = tet.find((elem)=>{
    let name='Dhulap';
    return elem.name === name;
  })
  console.log(getName);

  
