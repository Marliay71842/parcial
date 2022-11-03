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
                <td><button type="button" class="btn btn-primary"><i class="bi bi-pencil-square"></i>editar</button></td>
                <td><button type="button" class="btn btn-danger"><i class="bi bi-trash"></i>eliminar</button></td>
    </tr>


`})
}