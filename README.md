# ToDo It

## Background

ToDo It is a very simple to-do list web app that I built to try out:

- [VueJS](https://vuejs.org/)
- [Pinia](https://pinia.vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Vuetify](https://vuetifyjs.com/)
- [Typescript](https://www.typescriptlang.org/)
- [Convex](https://www.convex.dev/)

My goal was to demonstrate the basics of reactivity in Vue, as well as how a backend like Convex pairs really nicely with it, especially in terms of keeping data in sync. Vuetify offers some nice component-based styling, that is quite convenient and really speeds up development.

## Timer

I added a timer element to each task that displays how much time has passed since the to-do item was created. This is probably not super useful in a practical sense, however, it serves as a way to demonstrate something "dynamic" and independent like you might see in other, more complex apps. The color of the timer changes as the to-do item ages, changing from green to orange (1 minute) to red (3 minutes).

## Future Work

- **Auth**: It would be nice to add authentication as a next step - currently all tasks are visible to and editable by everyyone. Since this was just a demo/practice project, authentication wasn't a hard requirement, but going forward, I think it would be a good feature to have.

- **Pinia**: Also, I started the project using Pinia as a store for state management, along with Json-Server as a temporary backend. However, once I integrated Convex, I didn't need Pinia for state management as much. Going forward, I would look into whether or not it is truly needed, and if not, remove it.

- **Tests**: There are no tests at the moment, but I would love to add some end-to-end tests at a minimum. 
---

## Installing and running locally

This template should help get you started developing with Vue 3 in Vite.

### Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

### Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

### Project Setup

```sh
npm install
```

#### Compile and Hot-Reload for Development

```sh
npm run dev
```

#### Compile and Minify for Production

```sh
npm run build
```

#### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
