import Main from './features/dashboard/main'
import Layout from './features/NavBar/layout'

function App() {
  return (
    <div className="flex flex-col h-screen">
     <Layout>
      <Main />
     </Layout>
    </div>
  )
}

export default App
