npm i kleur prompts path

if ( layoutGroups ) {
console.log( ``);
    console.log( kleur.yellow( 'Setting up groups...' ) );
    // await runCommand(`${ packageManager } install svelte-group` );
fs.mkdirSync( 'src/routes/(app)' );
fs.mkdirSync( 'src/routes/(app)/about' );
fs.mkdirSync( 'src/routes/(app)/contact' );
fs.mkdirSync( 'src/routes/(app)/dashboard' );
fs.writeFileSync( 'src/routes/(app)/dashboard/+page.svelte', '' );
fs.mkdirSync( 'src/routes/admin' );
fs.mkdirSync( 'src/routes/admin/admin' );
fs.writeFileSync( 'src/routes/admin/admin/+page@.svelte', '' );
fs.writeFileSync( 'src/routes/admin/+layout.svelte', '' );
fs.writeFileSync( 'src/routes/+layout.svelte', '' );
fs.mkdirSync( 'src/routes/(auth)' );
fs.mkdirSync( 'src/routes/(auth)/auth' );
fs.mkdirSync( 'src/routes/(auth)/auth/signin' );
fs.mkdirSync( 'src/routes/(auth)/auth/signup' );
fs.writeFileSync( 'src/routes/(app)/about/+page.svelte', '' );
fs.writeFileSync( 'src/routes/(app)/contact/+page.svelte', '' );
fs.writeFileSync( 'src/routes/(app)/dashboard/+page.svelte', '' );
fs.writeFileSync( 'src/routes/(auth)/auth/signin/+page.svelte', '' );
fs.writeFileSync( 'src/routes/(auth)/auth/signup/+page.svelte', '' );
fs.writeFileSync( 'src/routes/(auth)/auth/+layout.svelte', '' );
fs.writeFileSync( 'src/routes/(auth)/+layout.svelte', '' );

    console.log( `Moving +page.svelte to( app ) group...` );
    fs.renameSync( 'src/routes/+page.svelte', 'src/routes/(app)/+page.svelte' );
    console.log( `` );

}
