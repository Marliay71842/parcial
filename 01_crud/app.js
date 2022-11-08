const cargarPosts=async()=>{
let url="https://jsonplaceholder.typicode.com/posts";
const api=await fetch(url);
const data=await api.json();
console.log(data);
tabla=document.querySelector("#lista");
data.map(item=>{ 
tabla.innerHTML+=`
<tr>
                <td scope="row">${item.id}</td>
                <td>${item.title}</td>
                <td>${item.body}</td>
                <td><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#Sexoo"><i class="bi bi-pencil-square"></i>editar</button></td>
                <td><button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#Sexoo2"><i class="bi bi-trash"></i>eliminar</button></td>
    </tr>


`})
}


const guardardata=async ()=>{
let titulo=document.querySelector("#title").value;
let body=document.querySelector("#body").value;
const post={title:titulo,body:body,userId:1};


    const api= await  fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify (post),
        headers: {
        'Content-type': 'application/json; charset=UTF-8',
        },
        });
const respuesta=await api.json();
console.log(respuesta)
tabla=document.querySelector("#lista");
tr=document.createElement("tr");

tr.innerHTML=`
<tr>
                <td scope="row">${respuesta.id}</td>
                <td>${respuesta.title}</td>
                <td>${respuesta.body}</td>
                <td><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#Sexoo"><i class="bi bi-pencil-square"></i>editar</button></td>
                <td><button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#Sexoo2"><i class="bi bi-trash"></i>eliminar</button></td>
    </tr>
`
tabla.appendChild(tr);

if (respuesta!=null){
    Swal.fire({
        icon: 'success',
        title: 'Insertar',
        text: 'Se inserto correctamente',

      })
}
else{
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'no se inserto algo fallo',

      })
}
    

}
const eliminarpost=async ()=>{
    
tr.innerHTML="";

}