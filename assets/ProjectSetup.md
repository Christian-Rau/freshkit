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

## SvelteKit with Layout Grouping blog example

´´´
├── src
│ ├── routes
│ │ ├── (app)
│ │ │ ├── +layout.svelte
│ │ │ ├── +page.svelte
│ │ │ ├── about
│ │ │ │ ├── +layout.svelte
│ │ │ │ └── +page.svelte
│ │ │ └── contact
│ │ │ ├── +layout.svelte
│ │ │ └── +page.svelte
│ │ ├── (blog)
│ │ │ ├── blog
│ │ │ │ ├── +layout.svelte
│ │ │ │ ├── +page.svelte
│ │ │ │ ├── 2020-01-01-post-title.md
│ │ │ │ ├── 2020-02-01-another-post-title.md
│ │ │ │ └── 2020-03-01-yet-another-post-title.md
│ └── app.css
´´´

´´´
├── src
│ ├── routes
│ │ ├── (app)
│ │ │ ├── +layout.svelte
│ │ │ ├── +page.svelte
│ │ │ ├── dashboard
│ │ │ │ ├── +layout.svelte
│ │ │ │ └── +page.svelte
│ │ │ ├── billing
│ │ │ │ ├── +layout.svelte
│ │ │ │ └── +page.svelte
│ │ │ ├── account
│ │ │ │ ├── +layout.svelte
│ │ │ │ └── +page.svelte
│ │ │ ├── about
│ │ │ │ ├── +layout.svelte
│ │ │ │ └── +page.svelte
│ │ │ ├── contact
│ │ │ │ ├── +layout.svelte
│ │ │ │ └── +page.svelte
│ │ │ └── settings
│ │ │ ├── +layout.svelte
│ │ │ └── +page.svelte
│ │ ├── (auth)
│ │ │ ├── +layout.svelte
│ │ │ ├── +page.svelte
│ │ │ ├── auth
│ │ │ │ ├── +layout.svelte
│ │ │ │ ├── +page.svelte
│ │ │ │ ├── signin
│ │ │ │ │ ├── +layout.svelte
│ │ │ │ │ └── +page.svelte
│ │ │ │ └── signup
│ │ │ │ ├── +layout.svelte
│ │ │ │ └── +page.svelte
│ │ │ └── forgot-password
│ │ │ ├── +layout.svelte
│ │ │ └── +page.svelte
│ │ └── (admin)
│ │ ├── +layout.svelte
│ │ ├── +page.svelte
│ │ ├── admin
│ │ │ ├── +layout.svelte
│ │ │ ├── +page.svelte
│ │ │ ├── users
│ │ │ │ ├── +layout.svelte
│ │ │ │ └── +page.svelte
│ │ │ ├── roles
│ │ │ │ ├── +layout.svelte
│ │ │ │ └── +page.svelte
│ │ │ └── permissions
│ │ │ ├── +layout.svelte
│ │ │ └── +page.svelte
│ │ └── settings
│ │ ├── +layout.svelte
│ │ └── +page.svelte
´´´
