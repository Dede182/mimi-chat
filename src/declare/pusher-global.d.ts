// pusher-global.d.ts
declare module 'pusher-js' {
  export = Pusher;
}

declare global {
  interface Window {
    Pusher: typeof import('pusher-js');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Echo: any;
  }
}

export {};
