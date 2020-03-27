from flask import Flask, send_from_directory, session, request
from flask_restful import Resource, Api
from flask_api.Handler import ServerHandler
from flask_api.Secret import SecretKey
import requests


server_handler = ServerHandler()
app = Flask(__name__)
secret = SecretKey()
app.secret_key = secret.random_key()
api = Api(app)


class Init(Resource):
    def post(self):
        print("Init Post Accepted")
        session.clear()
        json_data = request.get_json()
        print(json_data)
        if json_data is not None:
            sec_data = {
                "secret": "6Lczmr8UAAAAAFFoVGm2aINOy5-YSxfPd8IrUcd_",
                "response": json_data["g-recaptcha-response"]
            }
            r = requests.post("https://www.google.com/recaptcha/api/siteverify", data=sec_data)
            print(r.json())
        else:
            print("wrong connect")

        if r.json()["success"]:
            # useID
            session['uid'] = secret.random_uid()
            print('user init: ' + session['uid'])
            # 使用者資料
            user = json_data["information"]
            gender = json_data["information"]['Gender']
            height = int(json_data["information"]['height'])
            weight = int(json_data["information"]['weight'])
            age = int(json_data["information"]['age'])
            category = json_data["information"]['category']
            situation = json_data["information"]['situation']

            print(user)
            # print(meal)
            # print(meal_protein)

            server_handler.user_register(session['uid'], json_data["information"]['category'], int(json_data["information"]['height']), int(json_data["information"]['weight']),
                                         int(json_data["information"]['age']), json_data["information"]['Gender'], json_data["information"]['situation'])

            return {"success": True}
        else:

            return {"success": False}


class Update(Resource):
    def post(self):
        json_data = request.get_json()
        print(json_data)
        if json_data is None:
            json_data = []
        else:
            json_data = json_data['choice']  # 查看使用者行為

        if 'uid' in session and server_handler.user_verify(session['uid']):
            back_array = server_handler.phase_i(session['uid'], json_data)
            print(back_array)
            print(len(back_array))
            if len(back_array) > 0:
                toReturn = {'mode': 'training', 'urls': back_array}

            # else:
            #     test_array = server_handler.request_ranking(session['uid'], json_data)
            #     toReturn = {'mode': 'testing'}
            #     toReturn['urls'] = test_array
            return toReturn


class Result(Resource):
    def post(self):
        json_data = request.get_json()
        # server_handler.write_to_disk(session['uid'], json_data)


api.add_resource(Init, '/init')
api.add_resource(Update, '/update')
api.add_resource(Result, '/result')


# static
@app.route('/')
def root():
    return send_from_directory('../public', 'index.html')


@app.route('/<path:path>')
def static_proxy(path):
    # send_static_file will guess the correct MIME type
    print('static: ' + path)
    return send_from_directory('../public', path)


if __name__ == "__main__":
    app.run(host="0.0.0.0", threaded=True, debug=True)
