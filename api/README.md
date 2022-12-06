## UFC predictions

### Details

- Scraped fight stats data from 1993 to present date
- Cleaned and feature engineered the data to each row being a historical representation of both fighters and their fight stats
- Created and tested predictive models using XGBoostClassifier

### Results

- Accuracy (valid): 71%
- AUC Score (valid): 73%

- Generally the underdog is in the blue corner and favourite fighter is in the red corner.

#### Context

This is a list of every UFC fight in the history of the organisation.
Every row contains information about both fighters, fight details and the winner.
The data was scraped from ufcstats website.

### Credits

Code and model in this folder is based on:
https://github.com/WarrierRajeev/UFC-Predictions
