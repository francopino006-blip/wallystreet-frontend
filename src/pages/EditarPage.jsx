import { useState, useEffect } from 'react'
import api from '../utils/api'
import './EditarPage.css'

function EditarPage() {
  const [nombre, setNombre] = useState('')
  const [password, setPassword] = useState('')
  const [repetirPassword, setRepetirPassword] = useState('')
  const [errores, setErrores] = useState([])
  const [mensajeExito, setMensajeExito] = useState('')

  // Simulamos obtener el ID del usuario logueado (Ajustá esto según cómo guarden el user en tu grupo)
  const userId = localStorage.getItem('user_id'); 

  const validar = () => {
    const nuevosErrores = []

    // Validación del nombre (no vacío y maximo 30 caracteres)
    if (!nombre || nombre.length > 30) {
      nuevosErrores.push('El nombre no puede estar vacío y debe tener máximo 30 caracteres.')
    }

    // Validación de la contraseña (minimo de 8 caracteres, mayúscula, minúscula, número, especial)
    // Solo la validamos si el usuario escribió algo (En caso de que solo quiera cambiar el nombre)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&#]).{8,}$/
    if (password && !passwordRegex.test(password)) {
      nuevosErrores.push('La contraseña debe tener al menos 8 caracteres, mayúsculas, minúsculas, números y caracteres especiales.')
    }

    // Validar que las contraseñas coincidan
    if (password && password !== repetirPassword) {
      nuevosErrores.push('Las contraseñas no coinciden.')
    }

    return nuevosErrores
  }

  const handleEditar = async (e) => {
    e.preventDefault()
    setErrores([])
    setMensajeExito('')

    // Validación en el frontend antes de llamar al backend
    const erroresValidacion = validar()
    if (erroresValidacion.length > 0) {
      setErrores(erroresValidacion)
      return
    }

    try {
      // Armamos el objeto dinámicamente, de modo que si no puso pássword, no debemos enviarla
      const dataToUpdate = { name: nombre }
      if (password) {
        dataToUpdate.password = password
      }

      await api.put(`/users/${userId}`, dataToUpdate)
      setMensajeExito('Perfil actualizado con éxito.')
      setPassword('')
      setRepetirPassword('')
      
    } catch (error) {
      setErrores([error.response?.data?.error || 'Error al actualizar el usuario.'])
    }
  }

  return (
    <div className="editar-container">
      <h2>Editar Usuario</h2>

      {errores.length > 0 && (
        <ul className="errores-lista">
          {errores.map((error, index) => (
            <li key={index} className="error-item">{error}</li>
          ))}
        </ul>
      )}

      {mensajeExito && <p className="exito-mensaje">{mensajeExito}</p>}

      <form onSubmit={handleEditar} className="editar-form">
        <div className="form-group">
          <label>Nombre del usuario</label>
          <input
            type="text"
            placeholder="Nuevo nombre"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Nueva contraseña (opcional)"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Repetir Password</label>
          <input
            type="password"
            placeholder="Repetir nueva contraseña"
            value={repetirPassword}
            onChange={e => setRepetirPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn-guardar">Guardar Cambios</button>
      </form>
    </div>
  )
}

export default EditarPage