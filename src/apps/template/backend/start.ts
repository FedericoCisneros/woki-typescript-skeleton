import { TemplateBackendApp } from './TemplateBackendApp';

try {
  /**
   * Definir las variables de entorno necesarias para ejecutar en los scripts dev:backend:
   */
  process.env.VERSION = process.env.VERSION ?? '/api/v1';
  new TemplateBackendApp().start();
} catch (e) {
  console.log(e);
  process.exit(1);
}

process.on('uncaughtException', err => {
  console.log('uncaughtException', err);
  process.exit(1);
});
