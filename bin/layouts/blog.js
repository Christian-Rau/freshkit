const fs = require( "fs" );

const createDirectory = ( path ) => {
  if ( !fs.existsSync( path ) ) {
    fs.mkdirSync( path );
  }
};

const createFile = ( path, contents ) => {
  fs.writeFileSync( path, contents );
};

// routes
createDirectory( "src" );
createDirectory( "src/routes" );
createDirectory( "src/routes/(app)" );
createDirectory( "src/routes/(app)/about" );
createDirectory( "src/routes/(app)/contact" );
createDirectory( "src/routes/(blog)" );

// files
createFile( "src/routes/(app)/about/+page.svelte", "" );
createFile( "src/routes/(app)/contact/+page.svelte", "" );
createFile( "src/routes/(blog)/blog/+layout.svelte", "" );
createFile( "src/routes/(blog)/blog/+page.svelte", "" );
createFile( "src/routes/(post)/post/2020-01-01-post-title.svelte", "" );
createFile( "src/routes/(post)/post/2020-02-01-another-post-title.svelte", "" );
createFile(
  "src/routes/(post)/post/2020-03-01-yet-another-post-title.svelte",
  ""
);
