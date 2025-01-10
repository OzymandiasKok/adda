'use client'
import type { HeaderSuperiorProps, TableProps } from '@/components/table'
import { useSearchParams } from 'next/navigation'
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

interface TablePropsContent {
  headerSuperior?: HeaderSuperiorProps[][]
  tables: TableProps[]
}

interface TableGrouProps {
  empresaID: string
  userID: string
  agricultura: TablePropsContent
  pecuaria: TablePropsContent
  estruturaFisicaPatrimonio: TablePropsContent
  fazendas: TablePropsContent
  vendas: TablePropsContent
  fornecedores: TablePropsContent
  dividas: TablePropsContent
}

interface TablesContextType {
  tableGroup: TableGrouProps[]
  idEmpresaParam: string | null
  isTableGroupLoading: boolean
  handleTableGroupChange: (table: TablePropsContent, tableName: string) => void
}

const TablesContext = createContext({} as TablesContextType)

export function TablesProvider({ children }: { children: ReactNode }) {
  const [tableGroup, setTableGroup] = useState<TableGrouProps[]>([])
  const [isInitialized, setIsInitialized] = useState(false)
  const [isTableGroupLoading, setTableGroupIsLoading] = useState(false)
  const searchParams = useSearchParams()
  const idEmpresaParam = searchParams.get('empresaId')
  const idUserParam = searchParams.get('userId')
  const cnpj = searchParams.get('cnpj')

  // console.log(
  //   'context',
  //   tableGroup[0] &&
  //     tableGroup[0].estruturaFisicaPatrimonio.tables[0].rows[0].inputs[0],
  // )

  useEffect(() => {
    const savedData = localStorage.getItem('@adda-partners:tables')

    // localStorage nao ta funcionando, na hr de setar aq, vem os campos vazios
    if (savedData) {
      // setTableGroup(JSON.parse(savedData))
    } else if (idEmpresaParam && idUserParam) {
      // Chama a API se não houver dados no localStorage
      fetch(`https://palpiteiro.pro/tabelas/empresa/${cnpj}/`)
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            // significa que nao existe registro no banco, portanto inicializa
            const newGroup = {
              empresaID: idEmpresaParam,
              userID: idUserParam,
              agricultura: { headerSuperior: [], tables: [] },
              pecuaria: { headerSuperior: [], tables: [] },
              estruturaFisicaPatrimonio: { tables: [] },
              fazendas: { tables: [] },
              vendas: { tables: [] },
              fornecedores: { tables: [] },
              dividas: { tables: [] },
            }
            setTableGroup([newGroup])
          } else {
            // console.log(data)
            setTableGroup([data])
          }
          setTableGroupIsLoading(true)
        })
        .catch((error) => console.error('Erro ao buscar dados da API:', error))
    }
    setIsInitialized(true)
  }, [idEmpresaParam])

  // useEffect(() => {
  //   if (isInitialized) {
  //     const tablesDataJSON = JSON.stringify(tableGroup)
  //     localStorage.setItem('@adda-partners:tables', tablesDataJSON)
  //   }
  // }, [isInitialized, tableGroup])

  function handleTableGroupChange(table: TablePropsContent, tableName: string) {
    if (!idEmpresaParam) return

    setTableGroup((prevState) => {
      // Verifica se existe um grupo correspondente ao id
      const groupIndex = prevState.findIndex((group) => {
        return String(group.empresaID) === idEmpresaParam
      })

      if (groupIndex === -1) {
        return prevState
      }

      // Atualiza a tabela específica dentro do grupo
      const updatedGroup = {
        ...prevState[groupIndex],
        [tableName]: table,
      }

      // Cria uma cópia do estado e substitui o grupo atualizado
      const updatedState = [...prevState]
      updatedState[groupIndex] = updatedGroup

      return updatedState
    })
  }

  return (
    <TablesContext.Provider
      value={{
        tableGroup,
        idEmpresaParam,
        isTableGroupLoading,
        handleTableGroupChange,
      }}
    >
      {children}
    </TablesContext.Provider>
  )
}

// Hook para acessar o contexto
export const useTablesContext = () => useContext(TablesContext)
