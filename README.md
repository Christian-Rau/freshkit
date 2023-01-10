# FreshKit

### An install CLI for SvelteKit with TailwindCSS

This command-line tool automates the setup process for a new SvelteKit
project, including the installation of Tailwind CSS and the creation of
a basic file structure necessary for using SvelteKit's "Advanced routing and layouts"

**What is it?**
FreshKit is a command-line tool that helps you quickly set up a new
SvelteKit project with everything you need to get started. SvelteKit is
a framework for building web applications that utilizes the Svelte
component framework, and FreshKit can install the latest version of
Svelte for you. In addition to setting up Svelte, FreshKit can also
install TailwindCSS, a popular CSS framework that provides a set of
utility classes for quickly styling your application. With FreshKit,
you can get a new SvelteKit project up and running in no time,
complete with TailwindCSS and a basic file structure for using
SvelteKit's advanced routing and layouts feature. FreshKit also creates
a lib folder for you to store any custom code or utilities you might
want to use in your project.

**Usage**
To create a new SvelteKit project, run the following command:

`npx Christian-Rau/FreshKit`

This will prompt you to enter a name for your project and ask if you want to include tailwindcss in your project. The script will then create a new SvelteKit project with the specified name, install the project dependencies, and set up the project with tailwindcss if desired.

**Advanced Layouts**
If you want to use advanced layouts, you can choose to do so when prompted during the installation process. This will create a file structure with additional routes and layouts for your project.

The file structure will look like this:

```bash
src
└── routes
    ├── (app)
    |   ├── about
    |   |   └── +page.svelte
    |   ├── contact
    |   |   └── +page.svelte
    |   ├── dashboard
    |   |   └── +page.svelte
    ├── admin
    |   ├── admin
    |   |   └── +page@.svelte
    |   └── +layout.svelte
    ├── +layout.svelte
    └── (auth)
        ├── auth
        |   ├── signin
        |   |   └── +page.svelte
        |   ├── signup
        |   |   └── +page.svelte
        |   └── +layout.svelte
        └── +layout.svelte

```

**License**
This package is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

In near future:

- MDSvex
- Supabase

**NPM Description**
FreshKit for SvelteKit with TailwindCSS automates setup for a new SvelteKit project, including installing Tailwind CSS and creating a basic file structure for using SvelteKit's "Advanced routing and layouts"

Key Words
svelte, sveltekit, tailwindcss, advanced-layouts, cli
Author Christian Rau
