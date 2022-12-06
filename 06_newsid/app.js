import {app} from './firebase.js '

import { getAuth, 
  createUserWithEmailAndPassword, 
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithPopup 
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
 
let user=null;
const auth = getAuth(app);




onAuthStateChanged(auth, (user) =>{
  const containe=document.querySelector("#container");
  checarEstado(user);
  if(user){
    containe.innerHTML=`<h1>BIENVENIDO: ${user.email}</h1>
    <button  type="button" data-bs-toggle="modal" data-bs-target="#addModal"  class="btn btn-primary btn-lg">Agregar Alumno   <i class="bi bi-person-plus"></i></button>
<br>
<br>
    <table id="container2">
            <thead>
              <tr>
                <th><h1>No.Control</h1></th>
                <th><h1>Nombre</h1></th>
                <th><h1>Apellido P</h1></th>
                <th><h1>Apellido M</h1></th>
                <th><h1>Carrrera</h1></th>
                <th><h1>Editar</h1></th>
                <th><h1>Eliminar</h1></th>
              </tr>
            </thead>
      
          </table>
    
    
    `
    const uid= user.uid;
  } else{
    containe.innerHTML=`<h1>No hay usuarios  <i class="bi bi-person-exclamation"></i></h1>`
  }
})



const btngogle  =document.querySelector("#btngo")
btngogle.addEventListener('click', async(e)=>{
e.preventDefault();
const provider = new GoogleAuthProvider();
try{
  const credentials= await signInWithPopup(auth, provider)
  user=credentials.user;
  const modalInstance = bootstrap.Modal.getInstance(btngogle.closest('.modal'));
  modalInstance.hide();
  checarEstado(user)
} catch(error){
  console.log(error);
}

});



const checarEstado=(user=null)=>{
  console.log(user);
  if(user== null){
  document.querySelector("#crear").style.display="block";
  document.querySelector("#iniciar").style.display="block";
  document.querySelector("#cerrar").style.display="none";
  
  }else{
document.querySelector("#crear").style.display="none";
document.querySelector("#iniciar").style.display="none";
document.querySelector("#cerrar").style.display="block";

  }
}



const btncr=document.querySelector("#cerrar");
btncr.addEventListener('click', async(e)=>{
  e.preventDefault();
  try{
    await signOut(auth)
    checarEstado()
  } catch(error){
    console.log(error)
  }
});



const btnini=document.querySelector("#btniniciar");
btnini.addEventListener('click', async(e)=>{
  e.preventDefault();
  
  const email=document.querySelector("#iniciaremail");
  const password=document.querySelector("#iniciarcontra");
try{
  const res= await signInWithEmailAndPassword(auth, email.value, password.value)
user=res.user;
Swal.fire('Bienvenido <i class="bi bi-person-check-fill"></i>')
var myModalEl = document.getElementById('iniciarModal');
var modal=bootstrap.Modal.getInstance(myModalEl)
modal.hide();

}
catch(error){
  Swal.fire('Usuario y o contraseña incorrecto')
}
});


const btncrearcuenta=document.querySelector("#btncrear");
btncrearcuenta.addEventListener('click', async(e)=>{
  e.preventDefault();
const email=document.querySelector("#crearemail");
const password=document.querySelector("#crearcontra");
//console.log(email.value,password.value);
var myModalEl=document.getElementById('crearModal');
var modal=bootstrap.Modal.getInstance(myModalEl)

try{
  const respuesta=await createUserWithEmailAndPassword (auth, email.value, password.value)
//console.log(respuesta.user);
Swal.fire({
  icon: 'success',
  title: 'exito',
  text: 'la cuenta se registro correctamente',
})
email.value='';
password.value=''
modal.hide();
}catch (error){
console.log(error.code);
const code=error.code;
if (code==='auth/invalid-email'){
  Swal.fire({
      icon: 'error',

      text: 'correo electronico invalido',
        })
}
if (code==='auth/weak-password'){
  Swal.fire({
      icon: 'error',
  
      text: 'contraseña invalida',
        })
}
if (code==='auth/email-already-in-user'){
  Swal.fire({
      icon: 'error',
    
      text: 'correo electronico ya en uso',
        })
}
}});
checarEstado();



