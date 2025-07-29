/// <reference types="react-native" />

// This file contains custom type definitions for the application

// Extend the process.env type with our environment variables
declare module 'process' {
  namespace NodeJS {
    interface ProcessEnv {
      APP_NAME: string;
      APP_VERSION: string;
      ENABLE_ANALYTICS: string;
      ENABLE_PUSH_NOTIFICATIONS: string;
    }
  }
}

// Declare SVG module for importing SVG files
declare module '*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}

// Declare module for importing static images
declare module '*.png' {
  const value: any;
  export default value;
}

declare module '*.jpg' {
  const value: any;
  export default value;
}

declare module '*.gif' {
  const value: any;
  export default value;
}

// Declare module for importing Lottie animations (for future use)
declare module '*.json' {
  const value: any;
  export default value;
}