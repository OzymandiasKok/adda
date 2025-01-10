import { useState, useEffect } from 'react'

interface Estado {
  id: number
  nome: string
  sigla: string
}

interface Municipio {
  id: number
  nome: string
}

const useEstadoMunicipio = () => {
  const [estados, setEstados] = useState<Estado[]>([])
  const [municipios, setMunicipios] = useState<Municipio[]>([])
  const [selectedEstado, setSelectedEstado] = useState<string>('')

  useEffect(() => {
    const fetchEstados = async () => {
      try {
        const response = await fetch(
          'https://servicodados.ibge.gov.br/api/v1/localidades/estados',
        )
        const data: Estado[] = await response.json()
        setEstados(data.sort((a, b) => a.nome.localeCompare(b.nome)))
      } catch {}
    }

    fetchEstados()
  }, [])

  useEffect(() => {
    const fetchMunicipios = async () => {
      if (selectedEstado) {
        try {
          const response = await fetch(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedEstado}/municipios`,
          )
          const data: Municipio[] = await response.json()
          setMunicipios(data.sort((a, b) => a.nome.localeCompare(b.nome)))
        } catch {}
      } else {
        setMunicipios([])
      }
    }

    fetchMunicipios()
  }, [selectedEstado])

  return { estados, municipios, selectedEstado, setSelectedEstado }
}

export default useEstadoMunicipio
