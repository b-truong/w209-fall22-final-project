# -*- coding: utf-8 -*-
import pickle

import numpy as np
import pandas as pd
from flask import Flask, jsonify, request

# Read saved fighter data
fighter_df = pd.read_csv(
    "api/data/fighters_stats.csv", index_col="index")

# Open saved model files
with open("api/data/model.sav", "rb") as mdl:
    model = pickle.load(mdl)

with open("api/data/cols.list", "rb") as c:
    cols = pickle.load(c)

with open("api/data/standard.scaler", "rb") as ss:
    scaler = pickle.load(ss)

# Weight class string mapping
df_weight_classes = {
    "Bantamweight": "weight_class_Bantamweight",
    "CatchWeight": "weight_class_Catch Weight",
    "Featherweight": "weight_class_Featherweight",
    "Flyweight": "weight_class_Flyweight",
    "Heavyweight": "weight_class_Heavyweight",
    "LightHeavyweight": "weight_class_Light Heavyweight",
    "Lightweight": "weight_class_Lightweight",
    "Middleweight": "weight_class_Middleweight",
    "OpenWeight": "weight_class_Open Weight",
    "Welterweight": "weight_class_Welterweight",
    "WomenBantamweight": "weight_class_Women's Bantamweight",
    "WomenFeatherweight": "weight_class_Women's Featherweight",
    "WomenFlyweight": "weight_class_Women's Flyweight",
    "WomenStrawweight": "weight_class_Women's Strawweight",
}

# Title bout field mapping
title_bout = {"Non Title": False, "Title": True}


# Normalization function
def normalize(df: pd.DataFrame, scaler) -> pd.DataFrame:
    df_num = df.select_dtypes(include=[np.float, np.int])
    df[list(df_num.columns)] = scaler.transform(df[list(df_num.columns)])
    return df


# Set up Flask REST API
app = Flask(__name__)


def run_model(red, blue, weight_class, rounds, bout_type):
    '''
    Run the saved model with the given parameters.

    @param red          : The name of the red fighter
    @param blue         : The name of the red fighter
    @param weight_class : A key from the df_weight_classes map
    @param rounds       : Either 3 or 5
    @param bout_type    : Either "Non Title" or "Title"
    '''
    # Run model
    df = fighter_df.copy()

    # Hot-encode weight classes
    cols_dict = {
        df_weight_classes[k]: (1 if weight_class == k else 0)
        for k in df_weight_classes.keys()
    }

    # Set other fields
    cols_dict.update(
        {
            "title_bout": title_bout[bout_type],
            "no_of_rounds": rounds
        }
    )
    extra_cols = pd.DataFrame(
        [list(cols_dict.values())], columns=cols_dict.keys())

    # Read fighter stats
    r = df.loc[[red]].add_prefix("R_").reset_index(drop=True)
    b = df.loc[[blue]].add_prefix("B_").reset_index(drop=True)

    # Combine input values and run model
    final = pd.concat([r, b, extra_cols], axis=1)[cols]
    [blue_proba, red_proba] = model.predict_proba(
        np.array(normalize(final, scaler))
    )[0]

    return blue_proba, red_proba


@app.route('/predict', methods=['GET'])
def predict():
    '''
    Predict probability of a fighter winning
    '''
    payload = request.get_json()

    # The name of the fighters
    red = payload['red']
    blue = payload['blue']
    if red == blue:
        raise Exception(f"Invalid fighters: {red} and {blue} are the same")

    # A key from the df_weight_classes map
    weight_class = payload['class']
    if weight_class not in df_weight_classes.keys():
        raise Exception(
            f"Invalid class: {weight_class}; must be one of {df_weight_classes.keys()}")

    # Either 3 or 5
    rounds = payload['rounds']
    if rounds not in (3, 5):
        raise Exception(
            f"Invalid rounds: {rounds}; must be 3 or 5")

    # Either "Non Title" or "Title"
    bout_type = payload['boutType']
    if bout_type not in ('Title', 'Non Title'):
        raise Exception(
            f"Invalid boutType: {bout_type}; must be 'Title' or 'Non Title'")

    # Run model
    red_proba, blue_proba = run_model(
        red, blue, weight_class, rounds, bout_type)

    return jsonify(red=str(red_proba), blue=str(blue_proba))


@app.errorhandler(Exception)
def handle_error(e):
    '''
    Handle any exceptions raised by the API
    '''
    return jsonify(error=str(e)), 400


if __name__ == "__main__":
    app.run()
