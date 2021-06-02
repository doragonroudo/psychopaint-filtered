from dotenv import load_dotenv
import os
from flask import Flask
from flask import request
from flask import jsonify
from flask_cors import CORS
import re
import base64
import time
from mimetypes import guess_extension, guess_type

# My files
import main

load_dotenv()
AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")
PORT = os.getenv("PORT")

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

main.load_all_model()

@app.route("/predict", methods=['POST'])
def predict_endpoint():
    content = request.get_json()
    res = main.predict(content)

    return jsonify ({
        'result': res
    })

if __name__ == "__main__":
    # app.run(host='127.0.0.1', port=PORT) # for running on localhost
    app.run(host='0.0.0.0', port=PORT) # for running on gateway
    # app.run(ssl_context=('cert.pem', 'key.pem'), host='0.0.0.0', port=PORT) # for deployment w/ ssl cert
