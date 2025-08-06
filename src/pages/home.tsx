import AuthCard from '../components/auth-card'
import Container from '../components/container'

function Home() {
  return (
    <Container>
      <main className='min-h-dvh grid md:grid-cols-2 gap-12 items-center content-center'>
        <section className='space-y-3 text-center md:text-left'>
          <h1 className='text-2xl xs:text-4xl font-bold text-balance'>
            Organize sua vida com o{' '}
            <span className='text-violet-500'>My Tasks</span>
          </h1>
          <p className='xs:text-xl text-neutral-600 text-balance'>
            Um aplicativo de to-do list intuitivo para aumentar sua
            produtividade e manter suas tarefas sempre organizadas.
          </p>
        </section>
        <section>
          <AuthCard />
        </section>
      </main>
    </Container>
  )
}

export default Home
