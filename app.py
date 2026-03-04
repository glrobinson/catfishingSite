from flask import Flask, render_template

app = Flask(__name__)

@app.get("/")
def home():
    return render_template("index.html", page="home")

@app.get("/find")
def find_bin():
    return render_template("find.html", page="find")

@app.get("/resources")
def resources():
    return render_template("resources.html", page="resources")

@app.get("/about")
def about():
    return render_template("about.html", page="about")

if __name__ == "__main__":
    app.run(debug=True)
