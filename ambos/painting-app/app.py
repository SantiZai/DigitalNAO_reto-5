from flask import Flask, render_template, request, jsonify
import os
import base64

app = Flask(__name__)
SAVE_FOLDER = "saved_drawings"

# Crear la carpeta para guardar dibujos si no existe
if not os.path.exists(SAVE_FOLDER):
    os.makedirs(SAVE_FOLDER)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/save', methods=['POST'])
def save():
    data = request.json
    image_data = data['image'].split(',')[1]
    filename = os.path.join(SAVE_FOLDER, f"{data['name']}.png")

    with open(filename, "wb") as f:
        f.write(base64.b64decode(image_data))
    
    return jsonify({"message": "Drawing saved successfully!"})

@app.route('/load/<name>', methods=['GET'])
def load(name):
    filename = os.path.join(SAVE_FOLDER, f"{name}.png")
    if os.path.exists(filename):
        with open(filename, "rb") as f:
            encoded_image = base64.b64encode(f.read()).decode('utf-8')
        return jsonify({"image": f"data:image/png;base64,{encoded_image}"})
    return jsonify({"error": "File not found"}), 404

if __name__ == '__main__':
    app.run(debug=True, port=8080)
