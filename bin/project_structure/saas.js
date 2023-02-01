#!/usr/bin/env node
import fs from 'fs';

export function layoutSaas() {
  const routesPath = "src/routes";
  const appPath = `${ routesPath }/(app)`;
  const appRoutes = [ "about", "contact", "dashboard" ];
  const adminPath = `${ routesPath }/admin`;
  const authPath = `${ routesPath }/(auth)`;
  const authRoutes = [ "auth/signin", "auth/signup" ];
  const pages = [ "page", "layout" ];
  const fileExt = ".svelte";

  console.log( "Setting up groups..." );

  // Create main routes
  fs.mkdirSync( appPath );
  fs.mkdirSync( adminPath );
  fs.mkdirSync( authPath );

  // Create sub routes
  appRoutes.forEach( createRoutesWithPages( appPath, pages, fileExt ) );
  authRoutes.forEach( createRoutesWithPages( authPath, pages, fileExt ) );

  // Create admin pages
  pages.forEach( createPage( adminPath, fileExt ) );
}

function createRoutesWithPages( path, pages, fileExt ) {
  return function ( route ) {
    const routePath = `${ path }/${ route }`;
    fs.mkdirSync( routePath );
    pages.forEach( createPage( routePath, fileExt ) );
  }
}

function createPage( path, fileExt ) {
  return function ( page ) {
    fs.writeFileSync( `${ path }/ +${ page }${ fileExt }`, "" );
  }
}


