#!/usr/bin/env node
const fs = require( "fs" );
const kleur = require( "kleur" );
const path = require( "path" );
const prompts = require( "prompts" );
const { spawn } = require( "child_process" );
const create = require( 'create-svelte' );
const setupTailwind = require( "./modules/setup-tailwind" );

// specifying the correct path for package.json
const packageJsonPath = path.join( __dirname, '..', 'package.json' );
const { version } = JSON.parse( fs.readFileSync( packageJsonPath, 'utf-8' ) );

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

    //pass the user input to the create function
    await create( projectName, {
      name: projectName,
      template: 'skeleton',
      types: types,
      prettier: prettier,
      eslint: eslint,
      playwright: playwright,
      vitest: vitest
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
    setupTailwind( packageManager )
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
