import React from 'react';
import { useButton } from '@react-aria/button';
import { FocusScope } from '@react-aria/focus';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import './App.css';

// Locutor accesible usando SpeechSynthesis
function useAnnouncer() {
  const announce = (message) => {
    if ('speechSynthesis' in window) {
      const utter = new window.SpeechSynthesisUtterance(message);
      utter.lang = 'es-ES';
      window.speechSynthesis.cancel(); // Detener cualquier anuncio previo
      window.speechSynthesis.speak(utter);
    }
  };
  return announce;
}

function AccessibleButton(props) {
  let ref = React.useRef();
  let { buttonProps } = useButton(props, ref);
  const announce = useAnnouncer();

  return (
    <button
      {...buttonProps}
      ref={ref}
      className="AccessibleButton"
      aria-label={props['aria-label'] || props.children}
      style={{ fontSize: '1.2rem', padding: '0.5em 1em' }}
      onFocus={() => announce('Botón accesible enfocado. Presiona Enter para activar.')}
      onMouseEnter={() => announce('Botón accesible. Haz clic o presiona Enter para activar.')}
      onClick={e => {
        if (props.onPress) props.onPress(e);
        announce('Botón activado. Acción realizada.');
      }}
    >
      {props.children}
    </button>
  );
}

function SkipToContent() {
  return (
    <a
      href="#inicio"
      className="skip-link"
      tabIndex={0}
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        background: '#ffcc00',
        color: '#003366',
        padding: '0.7em 1.5em',
        zIndex: 1000,
        transform: 'translateY(-120%)',
        transition: 'transform 0.2s',
        fontWeight: 'bold',
        borderRadius: '0 0 8px 0',
      }}
      onFocus={e => (e.target.style.transform = 'translateY(0)')}
      onBlur={e => (e.target.style.transform = 'translateY(-120%)')}
    >
      Saltar al contenido principal
    </a>
  );
}

function App() {
  return (
    <FocusScope contain restoreFocus>
      <div className="App" style={{ fontFamily: 'sans-serif', background: '#f9f9f9', minHeight: '100vh' }}>
        <SkipToContent />
        <header style={{ background: '#003366', color: '#fff', padding: '1em' }}>
          <h1 tabIndex={0}>Web Accesible para Discapacidad Visual</h1>
          <VisuallyHidden>
            <p>Esta web es compatible con lectores de pantalla y navegación por teclado.</p>
          </VisuallyHidden>
        </header>
        <nav aria-label="Navegación principal" style={{ background: '#e5e5e5', padding: '1em' }}>
          <ul style={{ display: 'flex', gap: '1em', listStyle: 'none', margin: 0, padding: 0 }}>
            <li><a href="#inicio" tabIndex={0}>Inicio</a></li>
            <li><a href="#servicios" tabIndex={0}>Servicios</a></li>
            <li><a href="#contacto" tabIndex={0}>Contacto</a></li>
          </ul>
        </nav>
        <main id="inicio" tabIndex={-1} style={{ padding: '2em', maxWidth: 700, margin: 'auto' }}>
          <section aria-labelledby="bienvenida">
            <h2 id="bienvenida">Bienvenido</h2>
            <p>
              Esta aplicación está diseñada para ser totalmente accesible, cumpliendo con el nivel AA de WCAG 2.1 y mejores prácticas avanzadas. Puedes navegar usando el teclado y es compatible con lectores de pantalla.
            </p>
            <AccessibleButton
              onPress={() => alert('¡Botón accesible activado!')}
              aria-label="Activar función principal"
            >
              <span aria-hidden="true" style={{ fontWeight: 'bold', fontSize: '1.3em' }}>⏺</span> Botón Accesible
            </AccessibleButton>
            <VisuallyHidden>
              <p>
                Consejo: Para encontrar el botón principal, navega con la tecla Tab hasta escuchar "Botón Accesible". Al presionar Enter, se activa la función principal.
              </p>
            </VisuallyHidden>
          </section>
          <section id="servicios" aria-labelledby="servicios-title" style={{ marginTop: '2em' }}>
            <h2 id="servicios-title">Servicios</h2>
            <ul>
              <li>Diseño accesible y semántico</li>
              <li>Compatibilidad avanzada con lectores de pantalla</li>
              <li>Navegación por teclado y atajos rápidos</li>
              <li>Contraste alto y personalización visual</li>
              <li>Soporte para "Saltar al contenido principal"</li>
            </ul>
          </section>
          <section id="contacto" aria-labelledby="contacto-title" style={{ marginTop: '2em' }}>
            <h2 id="contacto-title">Contacto</h2>
            <form aria-label="Formulario de contacto" style={{ display: 'flex', flexDirection: 'column', gap: '1em', maxWidth: 400 }}>
              <label htmlFor="nombre">Nombre</label>
              <input id="nombre" name="nombre" type="text" required aria-required="true" autoComplete="name" />
              <label htmlFor="email">Correo electrónico</label>
              <input id="email" name="email" type="email" required aria-required="true" autoComplete="email" />
              <label htmlFor="mensaje">Mensaje</label>
              <textarea id="mensaje" name="mensaje" rows={4} required aria-required="true" />
              <AccessibleButton type="submit" aria-label="Enviar mensaje de contacto">Enviar</AccessibleButton>
            </form>
            <VisuallyHidden>
              <p>Todos los campos del formulario son obligatorios. Usa Tab para navegar entre los campos y Enter para enviar.</p>
            </VisuallyHidden>
          </section>
        </main>
        <footer style={{ background: '#003366', color: '#fff', padding: '1em', marginTop: '2em', textAlign: 'center' }}>
          <small>&copy; 2025 Web Accesible. Todos los derechos reservados.</small>
        </footer>
      </div>
    </FocusScope>
  );
}

export default App;
