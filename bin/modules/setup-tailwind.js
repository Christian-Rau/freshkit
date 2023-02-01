#!/usr/bin/env node
import fs from 'fs';
import { promisify } from 'util';
import { spawn } from 'child_process';

const open = promisify( fs.open );
const close = promisify( fs.close );
const writeFile = promisify( fs.writeFile );

const dependencies = 'tailwindcss postcss autoprefixer';

export async function setupTailwind( packageManager ) {
  let command;
  switch ( packageManager ) {
    case "pnpm":
      command = "pnpm install --save-dev";
      break;
    case "npm":
      command = "npm install --save-dev";
      break;
    case "yarn":
      command = "yarn add --dev";
      break;
    default:
      throw new Error( "Invalid package manager" );
  }

  await runCommand( `${ command } ${ dependencies }` );

  await spawn( "npx tailwindcss init tailwind.config.cjs -p" );
  console.log( "" );

  try {
    // Create the file if it does not exist
    const fd1 = await open( "tailwind.config.cjs", "w" );

    // Write to the file
    await writeFile( fd1, `
    /** @type {import('tailwindcss').Config} */
    module.exports = {
      content: ['./src/**/*.{html,js,svelte,ts}'],
      theme: {
        extend: {}
      },
      variants: {},
      plugins: []
    };
    ` );
    // create a ./src/app.css file
    const fd2 = await open( 'src/app.css', 'w' );
    // Write to the file
    await writeFile( fd2, `
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    ` );

    // Create a ./src/routes/+layout.svelte file and import the newly-created app.css file.
    const fd3 = await open( 'src/routes/+layout.svelte', 'w' );
    // Write to the file
    await writeFile( fd3, `
    <script>
      import '../app.css';
    </script>
    
    <slot />
    ` );
    // Edit the +page.svelte with new tailwind classes
    const fd4 = await open( 'src/routes/+page.svelte', 'w' );
    // Write to the file
    await writeFile( fd4, `
    <div class="flex h-screen justify-center items-center">
      <div class="w-64 bg-white rounded-lg p-4 shadow-lg text-slate-800">
        <img
          src="https://github.com/Christian-Rau/freshkit/blob/master/assets/bot.png?raw=true"
          alt="FreshKit Bot"
        />
        <p class="text-xl font-bold mb-4">Build something great!</p>
        <p class="text-sm font-bold">
          If you have any questions, or there is any issues you can visit
          <a
            href="https://github.com/Christian-Rau/freshkit/issues"
            class="underline"
            >https://github.com/Christian-Rau/freshkit/issues</a
            >
            for more information. Thank you for using FreshKit, or check out the
            <a href="https://github.com/Christian-Rau/freshkit/issues">README</a>
            for more information.
        </p>
      </div>
    </div>
    ` );
    await close( fd1 );
    await close( fd2 );
    await close( fd3 );
    await close( fd4 );

  } catch ( error ) {
    console.error( error );
  }

  async function runCommand( command ) {
    return new Promise( ( resolve, reject ) => {
      const child = spawn( command, {
        shell: true,
        stdio: 'inherit',
      } );

      child.on( 'close', ( code ) => {
        if ( code === 0 ) {
          resolve();
        } else {
          reject();
        }
      } );
    } );
  }
}
