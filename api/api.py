# -*- coding: utf-8 -*-
import math
import pickle

import numpy as np
import pandas as pd
from flask import Flask, jsonify, request

# Read saved fighter data
fighter_df = pd.read_csv(
    "data/fighters_list.csv", index_col="index")

# Open saved model files
with open("data/model.sav", "rb") as mdl:
    model = pickle.load(mdl)

with open("data/cols.list", "rb") as c:
    cols = pickle.load(c)

with open("data/standard.scaler", "rb") as ss:
    scaler = pickle.load(ss)

# Weight class string mapping
df_weight_classes = {
    "Flyweight": "weight_class_Flyweight",
    "Bantamweight": "weight_class_Bantamweight",
    "Featherweight": "weight_class_Featherweight",
    "Lightweight": "weight_class_Lightweight",
    "Welterweight": "weight_class_Welterweight",
    "Middleweight": "weight_class_Middleweight",
    "Light Heavyweight": "weight_class_Light Heavyweight",
    "Heavyweight": "weight_class_Heavyweight",
    "Women's Strawweight": "weight_class_Women's Strawweight",
    "Women's Flyweight": "weight_class_Women's Flyweight",
    "Women's Bantamweight": "weight_class_Women's Bantamweight",
    "Women's Featherweight": "weight_class_Women's Featherweight",
    "Catch Weight": "weight_class_Catch Weight",
    "Open Weight": "weight_class_Open Weight",
}


# Normalization function
def normalize(df: pd.DataFrame, scaler) -> pd.DataFrame:
    df_num = df.select_dtypes(include=[np.float, np.int])
    df[list(df_num.columns)] = scaler.transform(df[list(df_num.columns)])
    return df


# Set up Flask REST API
app = Flask(__name__)


def run_model(red, blue, weightclass, no_of_rounds, fight_type):
    '''
    Run the saved model with the given parameters.

    @param red          : The name of the red fighter
    @param blue         : The name of the red fighter
    @param weightclass  : A key from the df_weight_classes map
    @param no_of_rounds : Either 3 or 5
    @param fight_type   : Either "Non Title" or "Title"
    '''
    # Run model
    df = fighter_df.copy()

    title_bout = {"Non Title": False, "Title": True}

    cols_dict = {
        df_weight_classes[k]: (1 if weightclass == k else 0)
        for k in df_weight_classes.keys()
    }
    cols_dict.update(
        {"title_bout": title_bout[fight_type],
            "no_of_rounds": no_of_rounds}
    )
    extra_cols = pd.DataFrame(
        [list(cols_dict.values())], columns=cols_dict.keys())
    r = df.loc[[red]].add_prefix("R_").reset_index(drop=True)
    b = df.loc[[blue]].add_prefix("B_").reset_index(drop=True)
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
    weightclass = payload['weightclass']
    if weightclass not in df_weight_classes.keys():
        raise Exception(
            f"Invalid weightclass: {weightclass}; must be one of {df_weight_classes.keys()}")

    # Either 3 or 5
    no_of_rounds = payload['no_of_rounds']
    if no_of_rounds not in (3, 5):
        raise Exception(
            f"Invalid no_of_rounds: {no_of_rounds}; must be 3 or 5")

    # Either "Non Title" or "Title"
    fight_type = payload['fight_type']
    if fight_type not in ('Title', 'Non Title'):
        raise Exception(
            f"Invalid fight_type: {no_of_rounds}; must be 'Title' or 'Non Title'")

    # Run model
    red_proba, blue_proba = run_model(
        red, blue, weightclass, no_of_rounds, fight_type)

    return jsonify(red=str(red_proba), blue=str(blue_proba))


@app.errorhandler(Exception)
def handle_error(e):
    '''
    Handle any exceptions raised by the API
    '''
    return jsonify(error=str(e)), 400


if __name__ == "__main__":
    app.run()
