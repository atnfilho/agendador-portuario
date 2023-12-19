// without a defined matcher, this one line applies next-auth to the entire project
export { default } from 'next-auth/middleware';


// applies next-auth only to matching routes
// export const config = { matcher: ['/agendamento/cadastro', '/patio/cadastro']}