const swaggerOptions = (port) => ({
  definition: {
    openapi: '3.0.0',
    info: {
      title: "API de Wallpapers - VividWalls",
      version: "1.0.1",
      description: "Api utilizada no website [VividWalls](https://vividwalls.vercel.app/), para a comunidade divulgar, postar e baixar wallpapers de outros usuários.\n\n Links para a API:\n- [Repositório da API](https://github.com/JPCRibeiro/VividWalls/tree/master/backend)\n\n- [Documentação da API](https://github.com/swagger-api/swagger-petstore)",
      contact: {
        name: "jopedroribeiro9@gmail.com",
        email: "jopedroribeiro9@gmail.com"
      }
    },
    servers: [
      {
        url: `http://localhost:${port}`, 
        description: "Local", 
      },
      {
        url: 'http://vividwalls-api.sa-east-1.elasticbeanstalk.com',
        description: "Produção", 
      }
    ],
    tags: [
      {
        name: 'user',
        description: 'Tudo sobre os usuários'
      },
      {
        name: 'wallpaper',
        description: 'Tudo sobre os wallpapers'
      },
    ],
    components: {
      schemas: {
        User: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              example: 1
            },
            username: {
              type: "string",
              example: "john"
            },
            email: {
              type: "string",
              example: "john@email.com"
            },
            password: {
              type: "string",
              example: "123456"
            },
          }
        }
      }
    }
  },
  apis: ["./src/routes/*.js"],
});

export default swaggerOptions;