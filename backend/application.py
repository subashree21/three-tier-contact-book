from flask import Flask, request, jsonify
from flask_cors import CORS
import pymysql
import os

application = Flask(__name__)
CORS(application)

def get_connection():
    return pymysql.connect(
        host=os.getenv("DB_HOST"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        database=os.getenv("DB_NAME"),
        cursorclass=pymysql.cursors.DictCursor
    )

@application.route("/")
def home():
    return "Contact Book API Running"

# CREATE CONTACT
@application.route("/contacts", methods=["POST"])
def add_contact():
    data = request.json

    conn = get_connection()
    cursor = conn.cursor()

    sql = "INSERT INTO contacts(name, phone, email) VALUES(%s,%s,%s)"
    cursor.execute(sql, (data["name"], data["phone"], data["email"]))
    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({"message": "Contact added successfully"})

# READ CONTACTS
@application.route("/contacts", methods=["GET"])
def get_contacts():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM contacts")
    result = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify(result)

# UPDATE CONTACT
@application.route("/contacts/<int:id>", methods=["PUT"])
def update_contact(id):
    data = request.json

    conn = get_connection()
    cursor = conn.cursor()

    sql = "UPDATE contacts SET name=%s, phone=%s, email=%s WHERE id=%s"
    cursor.execute(sql, (data["name"], data["phone"], data["email"], id))
    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({"message": "Contact updated successfully"})

# DELETE CONTACT
@application.route("/contacts/<int:id>", methods=["DELETE"])
def delete_contact(id):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("DELETE FROM contacts WHERE id=%s", (id,))
    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({"message": "Contact deleted successfully"})

if __name__ == "__main__":
    application.run(host="0.0.0.0", port=5000)
