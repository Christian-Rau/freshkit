#!/usr/bin/env node
import fs from "fs";
import { openSync, writeFileSync, promises } from 'fs';
import kleur from "kleur";
import path from "path";
import prompts from "prompts";
import { spawn } from "child_process";
import { create } from 'create-svelte';
// import { setupTailwind } from "./modules/setup-tailwind.js";
import { layoutSaas } from './layout/saas.js';

const { version } = JSON.parse(
  fs.readFileSync( new URL( "../package.json", import.meta.url ), "utf-8" )
);

( async () => {
  console.log( kleur.gray( `\nFreshKit version ${ version }` ) );
  console.log( kleur.yellow( `` ) );
  console.log( kleur.cyan( `*** a fresh start on something new ***` ) );
  console.log( kleur.yellow( `` ) );

  async function promptOptions() {
    const { projectName } = await prompts( {
      type: "text",
      name: "projectName",
      message: "What is the name/directory of your project?\n  (leave blank to use current directory)",
    }, {
      onCancel: () => process.exit()
    } );

    const { types } = await prompts( {
      type: "select",
      name: "types",
      message: "Add type checking with TypeScript?",
      initial: false,
      choices: [
        {
          title: "Yes, using JavaScript with JSDoc comments",
          value: "checkjs"
        },
        {
          title: "Yes, using TypeScript syntax",
          value: "typescript"
        },
        { title: "No", value: null }
      ]
    }, {
      onCancel: () => process.exit()
    } );

    const { prettier } = await prompts( {
      type: "toggle",
      name: "prettier",
      message: "Would you like to use Prettier?",
      initial: false,
      active: "Yes",
      inactive: "No"
    }, {
      onCancel: () => process.exit()
    } );

    const { eslint } = await prompts( {
      type: "toggle",
      name: "eslint",
      message: "Would you like to use ESLint?",
      initial: false,
      active: "Yes",
      inactive: "No"
    }, {
      onCancel: () => process.exit()
    } );

    const { playwright } = await prompts( {
      type: "toggle",
      name: "playwright",
      message: "Would you like to use Playwright?",
      initial: false,
      active: "Yes",
      inactive: "No"
    }, {
      onCancel: () => process.exit()
    } );

    const { vitest } = await prompts( {
      type: "toggle",
      name: "vitest",
      message: "Would you like to use Vitest?",
      initial: false,
      active: "Yes",
      inactive: "No"
    }, {
      onCancel: () => process.exit()
    } );

    await create( projectName, {
      name: projectName,
      template: 'skeleton', // or 'skeleton' or 'skeletonlib'
      types: types,
      prettier: false,
      eslint: false,
      playwright: false,
      vitest: false
    } );

  }

  process.on( 'SIGINT', () => {
    console.log( '\nCancelled' );
    process.exit();
  } );


  await promptOptions();

  const { packageManager } = await prompts( {
    type: "select",
    name: "packageManager",
    message: "Which package manager do you want to use?",
    choices: [
      { title: "npm", value: "npm" },
      { title: "pnpm", value: "pnpm" },
      { title: "Yarn", value: "yarn" },
    ],
    initial: 0
  } );

  // cd into the project directory
  process.chdir( path.resolve( process.cwd(), projectName ) );

  console.log( kleur.green( "√ FreshKit continues installing dependencies" ) );
  console.log( kleur.cyan( `` ) );
  console.log(
    kleur.yellow( `Installing dependencies with ${ packageManager }...` )
  );

  await runCommand(
    packageManager === "pnpm"
      ? "pnpm install"
      : packageManager === "npm"
        ? "npm install"
        : "yarn add"
  );

  // Install tailwindcss if the user wants to
  const { useTailwind } = await prompts( {
    type: "toggle",
    name: "useTailwind",
    message: "Would you like to use Tailwind CSS?",
    initial: false,
    active: "Yes",
    inactive: "No"
  } );

  // useTailwind = true; run the command with the chosen package manager to install the packages

  if ( useTailwind ) {
    const dependencies = 'tailwindcss postcss autoprefixer';

    await runCommand(
      `${ packageManager === "pnpm" ? "pnpm install --save-dev" : packageManager === "npm" ? "npm install --save-dev" : "yarn add --dev" } ${ dependencies }`
    );

    runCommand();

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
      variants: {},
      plugins: []
    };
    ` );

    // Close the file
    closeSync( fd1 );

    // create a ./src/app.css file
    const fd2 = openSync( 'src/app.css', 'w' );

    // Write to the file
    writeFileSync( fd2, `
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    ` );

    // Close the file
    closeSync( fd2 );

    // Create a ./src/routes/+layout.svelte file and import the newly-created app.css file.
    const fd3 = openSync( 'src/routes/+layout.svelte', 'w' );

    // Write to the file
    writeFileSync( fd3, `
    <script>
      import '../app.css';
    </script>

    <slot />
    ` );

    // Close the file
    closeSync( fd3 );

    // Edit the +page.svelte with new tailwind classes
    const fd4 = openSync( 'src/routes/+page.svelte', 'w' );

    // Write to the file
    writeFileSync( fd4, `
    <script>
    </script>

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

    // Close the file
    closeSync( fd4 );
  }


  console.log( kleur.green( "√" ), kleur.yellow( "Tailwind CSS is installed and setup!" ) );

  const { layoutSaas } = await prompts( {
    type: "confirm",
    name: "layoutSaas",
    message: "Do you want to set up groups for advanced layouts?",
    initial: true,
  } );

  if ( layoutSaas ) {
    layoutSaas();
  }

  console.log( kleur.green( "√" ), kleur.yellow( "Setting up groups..." ) );

  console.log( `This is it! I had great fun giving you a fresh start` );

  let i = 1;

  console.log( "\nFinal steps:" );
  console.log( `  ${ i++ }: ${ kleur.bold( kleur.cyan( `cd ${ projectName }` ) ) }` );
  console.log(
    `  ${ i++ }: ${ kleur.bold(
      kleur.cyan( 'git init && git add -A && git commit -m "Initial commit"' )
    ) } (optional)`
  );
  console.log( `  ${ i++ }: ${ kleur.bold( kleur.cyan( "npm run dev -- --open" ) ) }` );

  console.log(
    `\nTo close the dev server, hit ${ kleur.bold( kleur.cyan( "Ctrl-C" ) ) }`
  );
  console.log(
    `\nFeedback or issues? go to ${ kleur.cyan(
      "https://github.com/christian-rau/freshkit"
    ) }`
  );

  console.log( kleur.magenta( "\nThank you for using FreshKit!" ) );
  console.log( kleur.cyan( "" ) );
} )();

async function runCommand( command ) {
  return new Promise( ( resolve, reject ) => {
    const child = spawn( command, { shell: true, stdio: "inherit" } );
    child.on( "exit", ( code ) => {
      if ( code === 0 ) {
        resolve();
      } else {
        reject( new Error( `Command failed with code ${ code }` ) );
      }
    } );
  } );
}

async function runPrettier() {
  try {
    require.resolve( "prettier" );
  } catch ( error ) {
    console.error(
      kleur.red(
        "Prettier is not installed. Install it with `npm install --save-dev prettier` or `yarn add --dev prettier`."
      )
    );
    process.exit( 1 );
  }

  await runCommand( `${ packageManager } run prettier --write .` );
}

// runPrettier();
