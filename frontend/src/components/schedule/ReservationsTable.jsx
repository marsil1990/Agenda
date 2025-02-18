import React from "react";


function ReservationsTable ({ newRecord, handleChangeadd, handleChange , records, add,addData,search, addRecord, select, setSelect, updateRecord, sendData, deleteData}) {

    return(
    <div>
        <table className="reservations-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Day</th>
            <th>Month</th>
            <th>Year</th>
            <th>Hour</th>
            <th>Cost</th>
            <th>Done</th>
          </tr>
        </thead>
        <tbody>
          {/* Condicional para mostrar el formulario de agregar nuevo registro. si add es true se muestra */}
          {add ? (
            <>
            <tr key={newRecord.email_user + newRecord.day + newRecord.month + newRecord.year + newRecord.hour}>
                <td><input type="text" name="email"  value={addRecord.email} onChange={handleChangeadd} /></td>
                <td><input type="text" name="day"  value={addRecord.day} onChange={handleChangeadd} /></td>
                <td><input type="text" name="month"   value={addRecord.month} onChange={handleChangeadd} /></td>
                <td><input type="text" name="year"   value={addRecord.year} onChange={handleChangeadd} /></td>
                <td><input type="text" name="hour"  value={addRecord.hour} onChange={handleChangeadd} /></td>
                <td><input type="text" name="cost"  value={addRecord.cost} onChange={handleChangeadd} /></td>
                <td><input type="text" name="done"  value={addRecord.done} onChange={handleChangeadd} /></td>
              </tr>
            </>
          ): <></> }
          {/* Condicional para mostrar el formulario de edición si hay un registro seleccionado */}
          {select.email !== "" ? (
            <>
              <tr key={select.email + select.day + select.month + select.year + select.hour}>
                <td><input type="text" name="email" placeholder={select.email} value={newRecord.email_user} onChange={handleChange} /></td>
                <td><input type="text" name="day" placeholder={select.day} value={newRecord.day} onChange={handleChange} /></td>
                <td><input type="text" name="month" placeholder={select.month}  value={newRecord.month} onChange={handleChange} /></td>
                <td><input type="text" name="year" placeholder={select.year}  value={newRecord.year} onChange={handleChange} /></td>
                <td><input type="text" name="hour" placeholder={select.hour}  value={newRecord.hour} onChange={handleChange} /></td>
                <td><input type="text" name="cost" placeholder={select.cost}  value={newRecord.cost} onChange={handleChange} /></td>
                <td><input type="text" name="done" placeholder={select.done?'yes':'no'}  value={newRecord.done} onChange={handleChange} /></td>
              </tr>
              <tr>
                <td colSpan="6">
                  <div className="container-edit-button">
                    <button className="edit-button" onClick={()=>setSelect({ email: "", day: "", month: "", year: "", hour: "",cost:"", done: "" })}>Cancel</button>
                    <button className="edit-button" onClick={updateRecord}>Accept</button>
                  </div>
                </td>
              </tr>
            </>
          ) : (
             /* Muestra todos los registros que coinciden con la búsqueda o si no hay búsqueda */
            records.map((task, index) => (
              search.includes(task) || search.length===0 ? 
              (
              <>
              <tr key={index}>
                <td>{task.email_user}</td>
                <td>{task.day}</td>
                <td>{task.month}</td>
                <td>{task.year}</td>
                <td>{task.hour}</td>
                <td>{task.cost}</td>
                <td>{task.done ? 'yes' : 'No'}</td>
                <td>
                  {/* Botones para editar o eliminar el registro */}
                  <div>
                    <button className="sendData-button" onClick={()=>setSelect({email:task.email_user, day:task.day, month:task.month, year:task.year, hour:task.hour, cost:task.cost, done:task.done})}>Edit</button>
                    <button className="sendData-button" onClick={()=>deleteData(index)}>Delete</button>
                  </div>
                </td>
               
              </tr>
              </> ) : <> </> 
            ))
          )}
        </tbody>
      </table>
      {/* Botones para enviar datos o agregar nuevo registro si no hay selección */}
      {select.email === "" && add ? (
        <>
          <button className="sendData-button" onClick={sendData}>Send Data</button>
          <button className="sendData-button" onClick={()=>addData()}>Add</button>
          {/*()=>addData() Se utiliza cuando la función necesita argumentos o cuando quieres asegurarte de}
          que la función no se ejecute al renderizar, sino solo al hacer clic.*/}
        </>
      ):(
        <>
        <button className="sendData-button" onClick={()=>addData()}>Add</button>
        </>
      )}
    </div>
    )
}export default ReservationsTable;