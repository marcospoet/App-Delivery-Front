FROM node:20-alpine3.21

COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build
# Instalar un servidor HTTP simple para servir los archivos estáticos
RUN npm install -g serve

# Exponer el puerto en el que se ejecutará la aplicación
EXPOSE 3000

# Comando para servir los archivos estáticos
CMD ["serve", "-s", "dist"]