// Importamos React y varios hooks de React:
// - useState: Para manejar el estado local del componente.
// - useEffect: Para realizar efectos secundarios, como cargar datos cuando el componente se monta.
// - useContext: Para usar el contexto de autenticación.
import React, {useState, useEffect} from "react";
import ReservationsTable from "./ReservationsTable"

// Importamos AuthContext para obtener datos del usuario autenticado y la función de logout.
import { useAuth } from '../../context/AuthContext';

// Importamos useNavigate para redirigir programáticamente a otras rutas.
import { useNavigate }  from 'react-router-dom';
import { useReservations } from "../../hooks/useReservations";

import { reservationService } from "../../api/reservationService";
 // Declaramos el componente funcional `Reservations`.
function Reservations(props){
    // Estado `search` para almacenar resultados de búsqueda.
    const [search, setSearch] = useState([])

     // Estado `records` para almacenar todos los registros obtenidos del servidor.
    const {records:fetchedRecords, loading, error} = useReservations()
    const [records, setrecords] = useState([]);



    // Estado `add` para mostrar u ocultar el formulario de adición de registros.
    const [add, setadd] = useState(false)

     // Estado `addRecord` para almacenar los datos del nuevo registro a añadir.
    const [addRecord, setaddRecord] = useState({email:"", day:"", month:"", year:"", hour:"", cost:"", done:""})

    // Estado `select` para almacenar el registro seleccionado que se va a editar.
    const [select, setSelect] = useState({email:"", day:"", month:"", year:"", hour:"",cost:"", done:""})
    //const [selectIndex, setSelectIndex] = useState()

     // Estado `newRecord` para almacenar los nuevos valores cuando se edita un registro.
    const [newRecord, setnewRecord] = useState({email_user:"", day:"", month:"", year:"", hour:"",cost:"", done:""})

    // Extraemos el email del usuario y la función de logout del contexto de autenticación.
    const {logout } = useAuth();;
    
  // Hook para redireccionar a otra página.
    const navigate = useNavigate()

    // useEffect para cargar registros desde el servidor cuando el componente se monta.
   useEffect(() => {
      setrecords(fetchedRecords)
  }, [fetchedRecords, loading]);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  
  
   // Función para cerrar sesión.
    function logOut(){
       // Llamamos a la función `logout` del contexto.
      logout();
      // Redirigimos a la página de inicio.
      navigate("/")
    }

     // Maneja cambios en los inputs del formulario de edición.
    function handleChange (e){
      // Desestructuramos `name` y `value` del evento `e`
      const { name, value } = e.target;
      setnewRecord(prevnewRecord => ({
        // Mantenemos los valores previos del registro.
        ...prevnewRecord,
        // Actualizamos el campo específico con el nuevo valor
        [name]: value
      }));
    };

    // Maneja cambios en los inputs del formulario de adición.
    function handleChangeadd (e){
      const { name, value } = e.target;
      setaddRecord(prevaddRecord => ({
        ...prevaddRecord,
        [name]: value
      }));
    };

    // Función para eliminar un registro.
   async function deleteData (id){
    console.log(records[id])

    // Extraemos los datos necesarios del registro que queremos eliminar.
    const {email_user:email , day , month, year, hour} = records[id]
    const data = {email: email, day:day, month:month, year:year, hour:hour}
    try{
      const delete_data = await reservationService.deleteReservation(data)
      // Actualizamos el estado `records` eliminando el registro.
        /*prevRecords: Es el estado actual de los registros antes de que se realice cualquier cambio. Es una versión anterior 
        del arreglo de registros, obtenida al usar la función setRecords con el valor de los registros anteriores.
        filter(): filter() es un método de los arreglos en JavaScript que crea un nuevo arreglo con todos los elementos que 
        pasen una prueba (la prueba es la función de callback que se pasa como argumento). */
      setrecords(prevRecords=>{
        return prevRecords.filter((record, index)=>{
          return id !== index //Retorna un nuevo array con aquellos que cumplen que id !== index
        }
        )
      })
      console.log(delete_data)
    }
    catch{console.error('Delete failed:', error)}
          
    }
    
   //Función para enviar un nuevo registro al servidor. 
   async function sendData(){
        try{
          await reservationService.sendData(addRecord)
          const addNewRecord = {email_user:addRecord.email, day:addRecord.day, month:addRecord.month, year:addRecord.year, hour:addRecord.hour,cost:addRecord.cost, done:addRecord.done}
          setrecords(prevRecords => [...prevRecords, addNewRecord]);
            
        }
        catch {console.error('Adding Data Faild:', error)}
        setaddRecord({ email: "", day: "", month: "", year: "", hour: "",cost:"", done: "" });
        setadd(false);// Ocultamos el formulario de adición.
        setSearch([]);
    }
   

    // Muestra el formulario para agregar un nuevo registro.
   function addData (){
      setadd(true)
    }



    async function updateRecord() {
      // Función para actualizar un registro existente.
      // Si algún campo no fue modificado, usamos los valores previos.
      if (!newRecord.email) newRecord.email_user = select.email;
      if (!newRecord.day) newRecord.day = select.day;
      if (!newRecord.month) newRecord.month = select.month;
      if (!newRecord.year) newRecord.year = select.year;
      if (!newRecord.hour) newRecord.hour= select.hour;
      if (!newRecord.cost) newRecord.cost = select.cost;
      if (!newRecord.done) newRecord.done= select.done;
      try{
        await reservationService.updateData(newRecord, select)
        const id =  records.findIndex(item => item.email_user === select.email && item.day === select.day && item.month === select.month && select.year === item.year && item.hour === select.hour)
        setrecords(prevRecord => {
          return prevRecord.map((record, index) =>{
            if(id === index){
              console.log(id, index)
              return newRecord; 
            } 
            else return record
          })
        } )
        console.log(id, records)
        setSelect({ email: "", day: "", month: "", year: "", hour: "",cost:"", done: "" });
        setnewRecord({ email_user: "", day: "", month: "", year: "", hour: "",cost:"", done: "" });
      }
      catch{console.error('Update failed:', error)}
      setSearch([])
    }
     
    // Filtra los registros según el usuario.
   function filtrando(usuarioBusqueda){
      let items = records.map(item => item.email_user.toLowerCase().includes(usuarioBusqueda.toLowerCase()) ? item : null) //filter(item => item !== null);
         return items;
        }

// Función para manejar la búsqueda de registros.
      function funcFilterItems(busqueda_por_usuario){
        if(busqueda_por_usuario !==""){
            let nuevoItems = filtrando(busqueda_por_usuario)
            // Filtramos y actualizamos el estado `search`.
            setSearch(nuevoItems);
        }
        else{
          // Si no hay búsqueda, mostramos todos los registros.
          setSearch(records)
        }
    }

   
    
      return (
        <div>
      <div className="button-container">
        {/* Botón para cerrar sesión, llama a la función logOut cuando se hace clic */}
        <button className="logout-button" onClick={logOut}>LogOut</button>
      </div>
      <h2 className="reservations-h2">Registrations</h2>
       {/* Input para buscar por correo electrónico, actualiza el valor de búsqueda al cambiar
       e.target.value es el valor actual del campo de entrada, es decir, lo que el usuario ha escrito en el input. */}
      <input className="input-search" type="text" name="search" placeholder="Search by email" onChange={(e)=>funcFilterItems(e.target.value)}/>
      
      <ReservationsTable
      newRecord={newRecord} 
      handleChangeadd={handleChangeadd} 
      handleChange={handleChange} 
      records={records}
      add={add}
      addData={addData}
      search={search} 
      addRecord={addRecord} 
      select={select} 
      setSelect={setSelect}
      updateRecord={updateRecord} 
      sendData={sendData}
      deleteData={deleteData} 
    />
    </div>
  );
}
  
export default Reservations;
