import { useState, useEffect } from 'react'
import api from '../utils/api'
import { REFRESH_INTERVAL } from '../utils/constants'

function StatPage() {
  const [assets, setAssets] = useState([])

  const obtenerAssets = async () => {
    try {
      const response = await api.get('/assets')
      setAssets(response.data)
      console.log('Assets actualizados:', new Date().toLocaleTimeString())
    } catch (error) {
      console.error('Error al obtener assets:', error)
    }
  }

  useEffect(() => {
    obtenerAssets() // carga inicial

    const intervalo = setInterval(() => { //funcion nativa de JS que ejecuta la funcion cada cierto tiempo (REFRESH_INTERVAL) para mantener los precios actualizados
      obtenerAssets() //se mantiene en segundo plano y cada REFRESH_INTERVAL hace una nueva consulta para actualizar los precios 
    }, REFRESH_INTERVAL)

    return () => clearInterval(intervalo) // limpia el timer al salir de la página
  }, [])

  return (
    <div>
      <h2>Listado de Assets</h2>
      {assets.map(asset => (
        <p key={asset.id}>
          {asset.name} - ${asset.current_price}
        </p>
      ))}
    </div>
  )
}

export default StatPage