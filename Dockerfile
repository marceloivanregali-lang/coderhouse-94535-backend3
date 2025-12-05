# Imagen base de Node
FROM node:20

# Crear directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del proyecto dentro del contenedor
COPY . .

# Exponer puerto de tu servidor
EXPOSE 8080

# Comando para iniciar la app
CMD ["npm", "start"]
