Storybook guideline

## Folder structure

```text
storybook
├─ stories
│  └─ sample  // official storybook samples
│  └─ screen  // components of screen
│  └─ shared  // components of shared
├─ utils    // utility functions
├─ addons.js    // web-based addons
├─ decorators.js  // global decorators
├─ index.js   // initialization
├─ rn-addons.js   // on-device addons
```

## Adding stories

Whenever you add stories, you might want to use `screen` or `shared` folders corresponding to your purpose. if any components that doesn't fit here, you can make a folder and edit structure at (Folder Structure)[#folder-structure] in this file

### Fake Navigator

you can use the `FakeNavigator` from `utils` to fake the Navigator UI
