#!/usr/bin/env node
import { spawn } from "child_process";
import { openSync, writeFileSync, promises } from 'fs';
import path from 'path';

export async function setupTailwind( packageManager ) {
  console.log( packageManager );
  const dependencies = 'tailwindcss postcss autoprefixer';
  const installCommand = packageManager === 'pnpm' ? 'pnpm install' : packageManager === 'npm' ? 'npm install' : 'yarn add';
  try {
    spawn( installCommand, dependencies.split( ' ' ) );
  } catch ( error ) {
    console.error( `Error: Command failed with code ${ error.code }` );
  }
}

await setupTailwind();

await spawn( 'npx tailwindcss init tailwind.config.cjs -p' );
console.log( '' );

// Create the file if it does not exist
const fd1 = openSync( 'tailwind.config.cjs', 'w' );

// Write to the file
writeFileSync( fd1, `
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {}
  },
  plugins: []
};
`);

async function createFile( filePath, content ) {
  const dirname = path.dirname( filePath );
  try {
    await promises.mkdir( dirname, { recursive: true } );
  } catch ( error ) {
    if ( error.code !== 'EEXIST' ) {
      throw error;
    }
  }
  // Create the file if it does not exist
  await promises.writeFile( filePath, content );
}

await createFile( './src/app.css', `
@tailwind base;
@tailwind components;
@tailwind utilities;
`);

await createFile( './src/routes/+layout.svelte', `
<script>
  import '../app.css';
</script>
<div class="class="bg-gray-200">
  <slot />
</div>
`);

// Create the file if it does not exist
const fd4 = openSync( './src/routes/+page.svelte', 'w' );

// Write to the file
writeFileSync( fd4, `
<script>

</script>

<div class="flex h-screen justify-center items-center">
  <div class="w-64 bg-white rounded-lg p-4 shadow-lg text-slate-800">
    <img src="https://github.com/Christian-Rau/freshkit/blob/master/assets/bot.png?raw=true" alt="FreshKit Bot">
    <p class="text-xl font-bold  mb-4">Build something great!</p>
    <p class="text-sm font-bold">
    If you have any questions, or there is any issues you can visit <a href="https://github.com/Christian-Rau/freshkit/issues" class="underline">https://github.com/Christian-Rau/freshkit/issues</a> for more information. Thank you for using FreshKit, or check out the <a href="https://github.com/Christian-Rau/freshkit/issues">README</a> for more information.
    </p>
  </div>
</div>

<style>

</style>
`);




