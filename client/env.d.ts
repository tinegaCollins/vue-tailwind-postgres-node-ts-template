/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENVIROMENT: 'DEV' | 'PROD' | string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
