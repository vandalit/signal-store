# 🚀 Guía de Despliegue en Heroku - Signal Store

Esta guía te ayudará a desplegar la aplicación Angular Signal Store en Heroku.

## 📋 Prerrequisitos

1. **Cuenta de Heroku**: Regístrate en [heroku.com](https://heroku.com)
2. **Heroku CLI**: Instala desde [devcenter.heroku.com/articles/heroku-cli](https://devcenter.heroku.com/articles/heroku-cli)
3. **Git**: Asegúrate de tener Git instalado

## 🛠️ Configuración Realizada

### Archivos Creados/Modificados:

- ✅ `server.js` - Servidor Express para servir la aplicación Angular
- ✅ `Procfile` - Comando de inicio para Heroku
- ✅ `package.json` - Scripts y dependencias actualizadas
- ✅ `.env.example` - Variables de entorno de ejemplo
- ✅ `.gitignore` - Archivos ignorados por Git

### Scripts de Package.json:

```json
{
  "start": "node server.js",           // Comando principal para Heroku
  "dev": "ng serve",                   // Desarrollo local
  "build": "ng build --configuration production",
  "postinstall": "ng build --configuration production"
}
```

## 🚀 Pasos para Desplegar

### 1. Preparar el Repositorio Git

```bash
# Si no tienes Git inicializado
git init
git add .
git commit -m "Initial commit - Ready for Heroku deployment"
```

### 2. Crear Aplicación en Heroku

```bash
# Instalar Heroku CLI y hacer login
heroku login

# Crear nueva aplicación (reemplaza 'tu-app-name' con un nombre único)
heroku create signal-store-ecommerce

# O usar un nombre específico
heroku create tu-nombre-unico-signal-store
```

### 3. Configurar Variables de Entorno (Opcional)

```bash
heroku config:set NODE_ENV=production
heroku config:set API_BASE_URL=https://fakestoreapi.com
```

### 4. Desplegar la Aplicación

```bash
# Conectar con el repositorio de Heroku
git remote add heroku https://git.heroku.com/tu-app-name.git

# Desplegar
git push heroku main
```

### 5. Abrir la Aplicación

```bash
heroku open
```

## 🔧 Comandos Útiles

```bash
# Ver logs de la aplicación
heroku logs --tail

# Reiniciar la aplicación
heroku restart

# Ver información de la aplicación
heroku info

# Escalar dynos (opcional)
heroku ps:scale web=1
```

## 📱 URLs de la Aplicación

Una vez desplegada, tu aplicación estará disponible en:
- **URL Principal**: `https://tu-app-name.herokuapp.com`
- **Rutas Disponibles**:
  - `/` - Página de inicio
  - `/products` - Catálogo de productos
  - `/products/:id` - Detalle de producto
  - `/cart` - Carrito de compras
  - `/checkout` - Proceso de checkout
  - `/checkout/payment` - Simulador de pago

## 🛡️ Características de Seguridad

- ✅ Servidor Express configurado para servir archivos estáticos
- ✅ Manejo de rutas SPA (Single Page Application)
- ✅ Variables de entorno para configuración
- ✅ Build de producción optimizado

## 🔄 Actualizaciones Futuras

Para actualizar la aplicación:

```bash
# Hacer cambios en el código
git add .
git commit -m "Descripción de los cambios"
git push heroku main
```

## 🐛 Solución de Problemas

### Error de Build
```bash
# Verificar logs de build
heroku logs --tail --dyno=build
```

### Error de Runtime
```bash
# Verificar logs de la aplicación
heroku logs --tail --dyno=web
```

### Limpiar Cache de Build
```bash
heroku plugins:install heroku-repo
heroku repo:purge_cache -a tu-app-name
```

## 📞 Soporte

Si encuentras problemas:
1. Revisa los logs con `heroku logs --tail`
2. Verifica que todas las dependencias estén en `package.json`
3. Asegúrate de que el build local funcione con `npm run build`

¡Tu aplicación Signal Store está lista para el mundo! 🌍
