#!/usr/bin/env node
export async function setupTailwind( packageManager ) {

  const dependencies = "tailwindcss postcss autoprefixer";
  // const packageManager = "npm";

  async function installDependencies( packageManager, dependencies ) {
    const installCommand =
      packageManager === "pnpm"
        ? "pnpm install --save-dev "
        : packageManager === "npm"
          ? "npm install --save-dev "
          : "yarn add";

    await runCommand( `${ installCommand } ${ dependencies }` );
  }

  await installDependencies( packageManager, dependencies );


  const fs = require( 'fs' );
  const { spawn } = require( 'child_process' );

  async function installMdsvex() {
    console.log( `Installing mdsvex...` );
    await installDependencies( packageManager, dependencies );
    console.log( `mdsvex installed successfully.` );
  }

  async function modifyFiles() {
    console.log( `Modifying files to use mdsvex...` );

    // Add mdsvex to svelte.config.js
    let config = fs.readFileSync( 'svelte.config.js', 'utf-8' );
    config = config.replace(
      `// add your plugin`,
      `mdsvex({
        remarkPlugins: [],
        rehypePlugins: [],
        extension: '.md'
      }),`
    );
    fs.writeFileSync( 'svelte.config.js', config );
    console.log( `svelte.config.js modified successfully.` );

    // Modify src/routes/post/_post.svelte to use mdsvex
    let postLayout = fs.readFileSync( 'src/routes/post/_post.svelte', 'utf-8' );
    postLayout = postLayout.replace(
      `<!-- add mdsvex import here -->`,
      `<script context="module">
      import { mdsvex } from 'mdsvex';
      
      export async function preload({ params, query }) {
        const res = await this.fetch(`blog / posts / ${ params.slug }.md`);
        const text = await res.text();
        
        return {
          post: mdsvex(text)
        };
      }
      </script>`
    );
    fs.writeFileSync( 'src/routes/post/_post.svelte', postLayout );
    console.log( `src/routes/post/_post.svelte modified successfully.` );
  }

  async function main() {
    await installMdsvex();
    await modifyFiles();
    console.log( `Done! mdsvex is now set up and ready to use with SvelteKit.` );
  }

  main();

  function runCommand( command ) {
    return new Promise( ( resolve, reject ) => {
      const child = spawn( command, { shell: true, stdio: 'inherit' } );
      child.on( 'close', code => {
        if ( code === 0 ) {
          resolve();
        } else {
          reject( code );
        }
      } );
    } );
  }


}