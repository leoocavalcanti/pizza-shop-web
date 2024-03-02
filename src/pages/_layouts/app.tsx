import { Outlet } from 'react-router-dom'

export function AppLayoyut() {
  return (
    <div>
      <h1>Header</h1>

      <div>Conteudo</div>

      <div>
        <Outlet />
      </div>
    </div>
  )
}
