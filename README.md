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

[Live build available here](https://groups.ischool.berkeley.edu/fightclub/).

Final project for the Data Visualization course.

The Ultimate Fighting Championship (UFC) is a mixed martial arts
organization that arranges and presents fights between different martial artists across the world.

This project provides visualizations for the [Kaggle UFC historical fight data](https://www.kaggle.com/datasets/rajeevw/ufcdata?select=preprocessed_data.csv) with these two business purposes in mind:

- **Marketing**: enhance UFC’s reach to countries where it is less widely known
- **Business Development**: expand the avenues in which a fan interacts with the UFC brand

More project documentation can be found at [this Google Drive folder](https://drive.google.com/drive/folders/1ujbsqWG2VutODLRt32spW-fatCEhLKwO?usp=sharing).

# Prerequisites

Before running the project, install these dependencies:

- Node.js (16.17.1+): https://nodejs.org/en/
- Yarn (1.22.19+): https://yarnpkg.com/getting-started/install
- Python (3.9+): https://www.python.org/downloads/

# Commands

### `yarn install`

- Install the web app project packages

### `yarn install:pydeps`

- Install the Python pre-processing packages

### `yarn install:api`

- Install the Python api packages

### `yarn start`

- Run the project in development mode
- Access the project at http://localhost:3000/
- The project will automatically reload whenever changes are made to the files

### `yarn start:api`

- Run the API on a local server
- Note that the app currently points to the production server

### `yarn start:api:prod`

- Run the API for production

### `yarn build`

- Create a production ready build
- Build output is located in the generated `build/` directory

# Prediction API

A live build of the prediction API is hosted at http://api.mma.arcane-arts.net/predict

The API supports the following commands:

### `GET /predict`

- Payload:

  ```json
  {
    "red": "Matt Hughes",          // Name of red fighter
    "blue": "Kenny Robertson",     // Name of blue fighter
    "weightclass": "Welterweight", // Common weight class of the two fighters
    "no_of_rounds": 3,             // Number of rounds, either 3 or 5
    "fight_type": "Non Title"      // Type of fight, either "Title" or "Non Title"
  }
  ```

- Responses:

  - `200`:

    ```json
    {
      "blue": "0.5842115", // Chance of blue fighter winning
      "red": "0.41578847"  // Chance of red fighter winning
    }
    ```

  - `400`:
    ```json
    {
      "error": "Error description"
    }
    ```

# Developing

The project web app is built with:

- Typescript: https://www.typescriptlang.org/
- React: https://reactjs.org/
  - Create React App: https://create-react-app.dev/
  - Material UI: https://mui.com/
  - Emotion: https://emotion.sh/

The data pre-processing is done in [Python](https://www.python.org/) with a [Jupyter](https://jupyter.org/) notebook.

The prediction API is done in Python with [Flask](https://flask.palletsprojects.com/), based on work from [this project](https://github.com/WarrierRajeev/UFC-Predictions).

## File structure

The repository is organized as follows:

| Directory Entries | Purpose                            |
| ----------------- | ---------------------------------- |
| `api`             | Prediction API Flask server        |
| `pre-processing`  | Raw data and preprocessing scripts |
| `public`          | Files to be served unmodified      |
| `src`             | Source code of the app             |
| `src/assets`      | Images and other static files      |
| `src/data`        | Processed data files               |
| `src/components`  | Components used by the app         |

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

# Credits

Media:

- [Logo](https://icons8.com/icons/set/fight)
- [Boxing video](https://www.pexels.com/video/two-men-spars-in-a-boxing-match-4761711/)

Prediction Model:

- [UFC Predictions by Rajeev Warrier](https://github.com/WarrierRajeev/UFC-Predictions)
