export const FORM_CONFIG = {
  login: {
    title: "Login to",
    description: null,
    buttonText: "Login",
    switchText: "Sign Up",
    switchLabel: "Don't have an account?",
    fields: [
      {
        name: 'email',
        type: 'email',
        placeholder: 'Email',
        autoComplete: 'email',
        validation: {
          required: 'Email es requerido',
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: 'Email inválido'
          }
        }
      },
      {
        name: 'password',
        type: 'password',
        placeholder: 'Password',
        autoComplete: 'current-password',
        validation: {
          required: 'Contraseña es requerida'
        }
      }
    ]
  },
  signup: {
    title: "Welcome to",
    description: "Create an account to access all features",
    buttonText: "Sign Up",
    switchText: "Login",
    switchLabel: "Already have an account?",
    fields: [
      {
        name: 'username',
        type: 'text',
        placeholder: 'Username',
        autoComplete: 'username',
        validation: {
          required: 'Nombre de usuario es requerido',
          minLength: {
            value: 3,
            message: 'Mínimo 3 caracteres'
          }
        }
      },
      {
        name: 'email',
        type: 'email',
        placeholder: 'Email',
        autoComplete: 'email',
        validation: {
          required: 'Email es requerido',
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: 'Email inválido'
          }
        }
      },
      {
        name: 'password',
        type: 'password',
        placeholder: 'Password',
        autoComplete: 'new-password',
        validation: {
          required: 'Contraseña es requerida',
          minLength: {
            value: 6,
            message: 'Mínimo 6 caracteres'
          }
        }
      }
    ]
  }
};
