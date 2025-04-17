import axios from 'axios';
import { INVALID_TOKEN } from '@server/utils/genericError';

// Esta es la función que maneja la respuesta de los errores
const errorResponseHandler = (error) => {
  try {
    const code = error?.response?.data?.code;
    const invalidTokenResponseMessages = error?.response?.data?.messages?.find(
      (x) => typeof x === 'string' && x.includes(INVALID_TOKEN)
    );
    const invalidTokenResponseCode = code === INVALID_TOKEN;
    const status = error?.response?.status;
    if (status === 403 || invalidTokenResponseMessages || invalidTokenResponseCode) {
      window.location.replace('/session-expired'); // Redirige a una página de sesión expirada
    }
    return Promise.reject(error); // Si no es un error que manejes, lo rechazas para que se maneje en otro lado
  } catch (e) {
    return Promise.reject(error); // Si ocurre un error en el manejo, lo rechazas igualmente
  }
};

// Crea la instancia de axios y aplica el interceptor global de errores
let instance = null;

const applyInterceptor = (axiosInstance) => {
  axiosInstance.interceptors.response.use(
    (response) => response, // Responde directamente si no hay error
    errorResponseHandler // Si hay error, pasa por el manejador
  );
};

// Inicializa la instancia de Axios
export const initialize = (props) => {
  instance = axios.create(props || {}); // Si no se pasa props, usa la configuración por defecto

  instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'; // Definir los headers si es necesario
  instance.defaults.withCredentials = true; // Asegúrate de enviar cookies (si usas autenticación de sesión)
  
  // Aquí puedes agregar cualquier otra configuración global para las solicitudes
  applyInterceptor(instance); // Aplica el interceptor global para manejar los errores
  return instance;
};

// Esta función garantiza que siempre devuelvas la misma instancia de Axios
export default () => instance || initialize();