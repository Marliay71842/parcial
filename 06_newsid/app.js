import {app} from './firebase.js '

import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider,signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";

const auth = getAuth(app);
const provier = new GoogleAuthProvider();
const btncrearcuenta=document.querySelector("#btncrear")
const btngogle=document.querySelector("#btngo")
const btnini=document.querySelector("#btniniciar")

btnini.addEventListener('click', async(e)=>{
  e.preventDefault();
  const email=document.querySelector("#iniciaremail");
  const password=document.querySelector("#iniciarcontra");
  console.log(email.value,password.value);

try{
  const res= await signInWithEmailAndPassword(auth, email.value, password.value)
   console.log(res);
Swal.fire('SI esta el usuario <i class="bi bi-person-check-fill"></i>')
}
catch(error){
 
  Swal.fire('Error')
}
});

btngogle.addEventListener('click', async(e)=>{

});

















btncrearcuenta.addEventListener('click', async(e)=>{
    e.preventDefault();
const email=document.querySelector("#crearemail");
const password=document.querySelector("#crearcontra");
console.log(email.value,password.value);
var myModalEl=document.getElementById('crearModal');
var modal=bootstrap.Modal.getInstance(myModalEl)

try{
    const respuesta=await createUserWithEmailAndPassword (auth, email.value, password.value)
console.log(respuesta.user);
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
else if (code==='auth/weak-password'){
    Swal.fire({
        icon: 'error',
       
        text: 'contraseña invalida',
          })
}
 else if (code==='auth/email-already-in-user'){
    Swal.fire({
        icon: 'error',
       
        text: 'correo electronico ya en uso',
          })
}
}

});