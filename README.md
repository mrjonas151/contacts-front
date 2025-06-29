# 📱 Contatos - App Mobile

Um aplicativo moderno de gerenciamento de contatos desenvolvido em **React Native** com autenticação JWT e funcionalidades completas de CRUD.

## 🚀 Funcionalidades

### ✨ **Autenticação Segura**
- Login e registro de usuários
- Autenticação JWT com refresh automático
- Proteção de rotas privadas

### 👥 **Gerenciamento de Contatos**
- ➕ **Criar** novos contatos
- 📋 **Listar** todos os contatos
- ✏️ **Editar** informações existentes
- 🗑️ **Excluir** contatos
- ⭐ **Marcar como favorito**

### 📧 **Sistema de Email**
- Envio de emails personalizados
- Interface intuitiva para composição
- Integração com API de email

### 🎨 **Interface Moderna**
- Design responsivo e elegante
- Animações suaves nativas
- Dark theme com cores vibrantes
- Componentes reutilizáveis

## 🛠️ Tecnologias Utilizadas

- **React Native** 0.72+
- **TypeScript** para tipagem estática
- **React Navigation** para navegação
- **Axios** para requisições HTTP
- **Context API** para gerenciamento de estado
- **React Hooks** para lógica de componentes

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **Java JDK** 17 ([Download](https://adoptium.net/))
- **Android Studio** ([Download](https://developer.android.com/studio))
- **Git** ([Download](https://git-scm.com/))

```

## 🚀 Instalação e Execução

### 1️⃣ **Clone o repositório**
```bash
git clone git clone https://mrjonas151/contacts-front.git
cd projeto3_mobile_jonas/ContactApp
```

### 2️⃣ **Instale as dependências**
```bash
npm install

```

### 3️⃣ **Configure a API**
Edite o arquivo `src/api/api.ts` com a URL da sua API:

```typescript
const BASE_URL = 'http://10.0.2.2:3333';

```

### 4️⃣ **Inicie o Metro Bundler**
```bash
npx react-native start --reset-cache
```

### 5️⃣ **Execute o aplicativo**

**Android:**
```bash
npx react-native run-android
```

### **Erro de conexão com API**
- ✅ Verifique se a API está rodando
- ✅ Confirme o IP correto no `api.ts`
- ✅ Para emulador: use `10.0.2.2`
- ✅ Para dispositivo: use IP da máquina

## 📦 Dependências Principais

```json
{
  "@react-navigation/native": "^6.1.7",
  "@react-navigation/native-stack": "^6.9.13",
  "react": "18.2.0",
  "react-native": "0.72.4",
  "react-native-safe-area-context": "^4.7.2",
  "react-native-screens": "^3.25.0",
  "axios": "^1.5.0"
}
```

## 🔄 Scripts Disponíveis em desenvolvimento

```bash
npm start                    
npm run android            
npm run ios                

npm run clean               
```

