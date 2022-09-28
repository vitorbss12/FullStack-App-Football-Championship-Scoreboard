import { App } from './app';
import 'dotenv/config';

// PR

const PORT = process.env.APP_PORT || 3001;

new App().start(PORT);
