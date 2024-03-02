import { Helmet } from 'react-helmet-async'

export function Dashboard() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Helmet title="Dashboard" />
      <h1>Dashboard</h1>
    </div>
  )
}
