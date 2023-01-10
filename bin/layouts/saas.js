const fs = require("fs");

const createDirectory = (path) => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
};

const createFile = (path, contents) => {
  fs.writeFileSync(path, contents);
};

const routes = [
  {
    name: "(app)",
    children: [
      {
        name: "dashboard",
        children: [],
      },
      {
        name: "billing",
        children: [],
      },
      {
        name: "account",
        children: [],
      },
      {
        name: "about",
        children: [],
      },
      {
        name: "contact",
        children: [],
      },
      {
        name: "settings",
        children: [],
      },
    ],
  },
  {
    name: "(auth)",
    children: [
      {
        name: "auth",
        children: [
          {
            name: "signin",
            children: [],
          },
          {
            name: "signup",
            children: [],
          },
        ],
      },
      {
        name: "forgot-password",
        children: [],
      },
    ],
  },
  {
    name: "(admin)",
    children: [
      {
        name: "admin",
        children: [
          {
            name: "users",
            children: [],
          },
          {
            name: "roles",
            children: [],
          },
          {
            name: "permissions",
            children: [],
          },
        ],
      },
      {
        name: "settings",
        children: [],
      },
    ],
  },
];

const createFolders = (route) => {
  const { name, children } = route;
  const path = `src/routes/${name}`;

  createDirectory(path);

  children.forEach((child) => {
    createFolders({
      name: `${name}/${child.name}`,
      children: child.children,
    });
  });
};

const createFiles = (route) => {
  const { name, children } = route;
  const path = `src/routes/${name}`;

  createFile(`${path}/+layout.svelte`, "");
  createFile(`${path}/+page.svelte`, "");

  children.forEach((child) => {
    createFiles({
      name: `${name}/${child.name}`,
      children: child.children,
    });
  });
};

createDirectory("src");
createDirectory("src/routes");
routes.forEach((route) => {
  createFolders(route);
});
routes.forEach((route) => {
  createFiles(route);
});
