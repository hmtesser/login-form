Olá, Muito obrigado por vir aqui na minha página do github

Esse form de login com tela de login + cadastro foi feito em React Typescript V18, utilizando TAILWINDCSS e vite para ambiente.

Utilizei Vitest, que é praticamente um JEST só que do vite para realizar os testes unitários

O Input de texto fiz ele componentizado para poder utilizar ele em todo o projeto(No caso, na tela de Login e de Signup)

Na tela de LOGIN, fiz a validação utilizando useState
Na tela de formulário, criei meu próprio hook e utilizando useReducer para validar diversos campos, alem de ter feito a validação de forma genérica para que possa ser utilizado em outros formulários e lugares

Para Rodar o código utilize NPM "https://nodejs.org/en/download/package-manager"

```bash
# Instalar dependências
npm install 

# Rodar o servidor de desenvolvimento
npm run dev
