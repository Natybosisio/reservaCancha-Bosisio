
function cargarDias() {
    diasHabilitados.innerHTML = ""
    for (const dia of semanaHabil) {
        const option = document.createElement("option")
        option.innerText = dia
        option.id = dia + "dia"
        diasHabilitados.append(option)
    }
}
cargarDias()


function cargarHorario() {
    horasHabilitadas.innerHTML = ""
    for (const hora of horariosDisponibles) {
        const option = document.createElement("option")
        option.innerText = hora
        option.id = hora + "horas"
        horasHabilitadas.append(option)
    }
}
cargarHorario()


//con esta funcion el usuario confirma la reserva y es cargada en mi array de reservas
function mostrarReserva() {
    dia = diasHabilitados.value;
    hora = horasHabilitadas.value;
    nombre = nombreUsuario.value;
    dni = dniUsuario.value;
    
    if (nombre !== "" && dni !== "" ) {
        resultadoUs.innerHTML =
        "<tr>"+
        "<td>"+diasHabilitados.value+"</td>"+
        "<td>"+horasHabilitadas.value+ "hs","</td>"+
        "</tr>"
        registrarReserva()

    }

    else {
            Swal.fire({
                title: 'Complete todos los campos',
                icon: 'error',
                confirmButtonText: 'error'
              })
        }
    }


function registrarReserva() {

    let nuevaReserva = new Reserva(dia, hora, nombre, dni)
    let esValidoRegistrarReserva = compararReserva()
    if(esValidoRegistrarReserva){
        reservas.push(nuevaReserva)
    }
    Swal.fire({
        title: "para registrar su reserva deberá abonar",
        text: "el total a pagar es $1200",
        toast: false,
        allowEnterKey: true,

    })


}

//con esta funcion informo al usuario si fue reservada previamente
function compararReserva() {

    let existeReserva = buscarCoincidencia(dia, hora)
    if (existeReserva) {
        Swal.fire({
            title: 'Lo siento',
            text: 'ese dia y horario ya fue reservado',
            icon: 'warning',
            confirmButtonText: 'vuelve a intentar'
          })
       
    }
   return existeReserva
 
}

//Con esta funcion verificaremos si el dia y la hora dados por el usuario ya que sencuentran reservados.
function buscarCoincidencia(dia, hora) {
    let existeCita = false

    for (let citaAux of reservas) {
        citaAux.informacion()
        existeCita = citaAux.verificarExistencia(dia, hora)
        if (existeCita) {
            break
        }
    }
    return existeCita
}




// PARA INCLUIR EL PRECIO
function cajaReservas() {
const importeAbonar = Swal.fire({
    title: "el total a pagar es: $1200",
        })
 }
 

function alertPago(){
 
 const acepto = Swal.fire({
        title: 'Esta a punto de confirmar su pago',
        showConfirmButton: true,
        confirmButtonText: 'aceptar',
        showCancelButton: true,
        cancelButtonText: 'cancelar', });

 } 


 //ENCONTRAR LA FORMA QUE AL FINALIZAR SE REALICE ESTE PASO
//  if(showConfirmButton){
//     localStorage.setItem("reservas", JSON.stringify(reservas))
//     console.log("Se agregó una reserva nueva.")
// }

 
  