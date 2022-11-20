const lispokes=async()=>{
    let url=" https://pokeapi.co/api/v2/pokemon/";
    const api= await fetch(url);
const data= await api.json();
console.log(data);
const combo=document.querySelector("#listpok")
const namepoke=document.querySelector("#nombrepoke")
data.results.map(id=>{
    combo.innerHTML+=` 
    <option value="${id}">${id.name}</option>
        `
        
    }); 
    
}

const mostpoke=async(id)=>{
    const api= await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    const response= await api.json();
}