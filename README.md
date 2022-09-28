# Fight Club

University of California Berkeley  
w209: Data Visualization  
Fall 2022

Authors:

- Brian Truong (brian.h.t@berkeley.edu)
- Francis Lee (francis.j.lee@berkeley.edu)
- Shrey Singhal (shrey.singhal@berkeley.edu)
- Tausif Islam (tausif.islam@berkeley.edu)

# About

Final project for the Data Visualization course.

The Ultimate Fighting Championship (UFC) is a mixed martial arts
organization that arranges and presents fights between different martial artists across the world.

This project provides visualizations for the [Kaggle UFC historical fight data](https://www.kaggle.com/datasets/rajeevw/ufcdata?select=preprocessed_data.csv) with these two business purposes in mind:

- **Marketing**: enhance UFC’s reach to countries where it is less widely known
- **Business Development**: expand the avenues in which a fan interacts with the UFC brand

# Prerequisites

Before running the project, install these dependencies:

- Node.js: https://nodejs.org/en/
- Yarn: https://yarnpkg.com/getting-started/install

# Commands

### `yarn install`

- Install the project packages

### `yarn start`

- Run the project in development mode
- Access the project at http://localhost:3000/
- The project will automatically reload whenever changes are made to the files

### `yarn build`

- Create a production ready build
- Build output is located in the `build/` directory

# Developing

The project web app is built with:

- Typescript: https://www.typescriptlang.org/
- React: https://reactjs.org/
  - Create React App: https://create-react-app.dev/
  - Material UI: https://mui.com/
  - Emotion: https://emotion.sh/

## File structure

The repository is organized as follows:

| Directory Entries | Purpose                         |
| ----------------- | ------------------------------- |
| `public`          | Files to be served unmodified   |
| `src`             | Source code of the app          |
| `src/assets`      | Images and other non-code files |
| `src/components`  | Components used by the app      |

## Notes

Due to [this issue with CRA](https://github.com/facebook/create-react-app/issues/9847) `.tsx` files should have this pragma at the top of the file:

```tsx
/** @jsxImportSource @emotion/react */
```

This allows the Emotion `css` attribute to be used correctly, e.g. in:

```tsx
<Typography variant="h3" css={styles.header}>
  Fight Club
</Typography>
```

# Links

- [Project documents](https://drive.google.com/drive/folders/1ujbsqWG2VutODLRt32spW-fatCEhLKwO?usp=sharing)
