#!/usr/bin/env node
import fs from "fs";
import kleur from "kleur";
import path from "path";
import prompts from "prompts";
import { spawn } from "child_process";

const { version } = JSON.parse(
  fs.readFileSync( new URL( "../package.json", import.meta.url ), "utf-8" )
);

( async () => {
  console.log( kleur.gray( `\nFreshKit version ${ version }` ) );
  console.log( kleur.yellow( `` ) );
  console.log( kleur.cyan( `*** a fresh start on something new ***` ) );
  console.log( kleur.yellow( `` ) );
  const { projectName } = await prompts( {
    type: "text",
    name: "projectName",
    message: "What is the name of your project?",
  } );

  await runCommand( `npm create svelte@latest ${ projectName }` );

  console.log( kleur.cyan( `` ) );
  console.log( kleur.green( "√ FreshKit continue installing dependencies" ) );
  console.log( "" );
  process.chdir( path.resolve( process.cwd(), projectName ) );

  const { packageManager } = await prompts( {
    type: "select",
    name: "packageManager",
    message: "Which package manager do you want to use?",
    choices: [
      { title: "npm", value: "npm" },
      { title: "pnpm", value: "pnpm" },
      { title: "Yarn", value: "yarn" },
    ],
  } );

  console.log( kleur.cyan( `` ) );
  console.log(
    kleur.yellow( `Installing dependencies with ${ packageManager }...` )
  );
  await runCommand(
    packageManager === "pnpm"
      ? "pnpm install"
      : packageManager === "npm"
        ? "npm install"
        : "yarn"
  );

  console.log( "" );

  const { setupTailwind } = await prompts( {
    type: "confirm",
    name: "setupTailwind",
    message: "Do you want to set up Tailwind CSS for this project?",
    initial: true,
  } );

  if ( setupTailwind ) {
    console.log( `` );
    console.log(
      ` `,
      kleur.green( "√" ),
      kleur.yellow( "Setting up Tailwind CSS..." )
    );
    await runCommand(
      `${ packageManager } install tailwindcss postcss autoprefixer`
    );
    await runCommand( `npx tailwindcss init tailwind.config.cjs -p` );
    console.log( "" );

    // TODO: Add code to modify tailwind.config.cjs file here.
    fs.writeFileSync(
      "tailwind.config.cjs",
      `
              /** @type {import('tailwindcss').Config} */
              module.exports = {
                content: [ './src/**/*.{html,js,svelte,ts}' ],
                theme: {
                  extend: {}
                },
                plugins: []
              };
              `
    );

    // console.log( `Creating src/app.css file and adding @tailwind directives...` );
    // TODO: Add code to create src/app.css file and add @tailwind directives here.
    fs.writeFileSync( "./src/app.css", "" );

    fs.writeFileSync(
      "./src/app.css",

      `
        @tailwind base;
        @tailwind components;
        @tailwind utilities;
      `
    );

    // console.log( ` Creating src/routes/+layout.svelte file and importing app.css...` );

    fs.writeFileSync(
      "./src/routes/+layout.svelte",
      `
        <script>
          import '../app.css';
        </script>
        <div class="class="bg-gray-200">
          <slot />
        </div>
      `
    );

    fs.writeFileSync(
      "src/routes/+page.svelte",
      ` <div class="flex h-screen justify-center items-center">
    <div class="w-64 bg-white rounded-lg p-4 shadow-lg text-slate-800">
      <img src="https://github.com/Christian-Rau/freshkit/blob/master/assets/bot.png?raw=true" alt="FreshKit Bot">
      <p class="text-xl font-bold  mb-4">Build something great!</p>
      <p class="text-sm font-bold">If you have any questions, or there is any issues you can visit <a
          href="https://github.com/Christian-Rau/freshkit/issues"
          class="underline">https://github.com/Christian-Rau/freshkit/issues</a> for more information. Thank you for
        using FreshKit, or check out the <a href="https://github.com/Christian-Rau/freshkit/issues">README</a> for
        more information.</p>
    </div>
  </div> `
    );
  }
  console.log( "" );
  const { layoutGroups } = await prompts( {
    type: "confirm",
    name: "layoutGroups",
    message: "Do you want to set up groups for advanced layouts?",
    initial: true,
  } );

  if ( layoutGroups ) {
    console.log( `` );
    console.log( kleur.yellow( "Setting up groups..." ) );
    // await runCommand( `${ packageManager } install svelte-group` );
    fs.mkdirSync( "src/routes/(app)" );
    fs.mkdirSync( "src/routes/(app)/about" );
    fs.mkdirSync( "src/routes/(app)/contact" );
    fs.mkdirSync( "src/routes/(app)/dashboard" );
    fs.writeFileSync( "src/routes/(app)/dashboard/+page.svelte", "" );
    fs.mkdirSync( "src/routes/admin" );
    fs.writeFileSync( "src/routes/admin/+page@.svelte", "" );
    fs.writeFileSync( "src/routes/admin/+layout.svelte", "" );
    fs.writeFileSync( "src/routes/+layout.svelte", "" );
    fs.mkdirSync( "src/routes/(auth)" );
    fs.mkdirSync( "src/routes/(auth)/auth" );
    fs.mkdirSync( "src/routes/(auth)/auth/signin" );
    fs.mkdirSync( "src/routes/(auth)/auth/signup" );
    fs.writeFileSync( "src/routes/(app)/about/+page.svelte", "" );
    fs.writeFileSync( "src/routes/(app)/contact/+page.svelte", "" );
    fs.writeFileSync( "src/routes/(app)/dashboard/+page.svelte", "" );
    fs.writeFileSync( "src/routes/(auth)/auth/signin/+page.svelte", "" );
    fs.writeFileSync( "src/routes/(auth)/auth/signup/+page.svelte", "" );
    fs.writeFileSync( "src/routes/(auth)/auth/+layout.svelte", "" );
    fs.writeFileSync( "src/routes/(auth)/+layout.svelte", "" );

    console.log( `Moving +page.svelte to( app ) group...` );
    fs.renameSync( "src/routes/+page.svelte", "src/routes/(app)/+page.svelte" );
    console.log( `` );
  }

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

runPrettier();
