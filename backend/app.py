from flask import Flask,request,jsonify
from webdb import *

app = Flask(__name__)
def after_request(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'PUT,GET,POST,DELETE'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type,Authorization'
    return response
app.after_request(after_request)

@app.route('/')
def hello_world():
    return "hello,ruirui"

# 登录
@app.route('/login', methods=['POST'])
def login():
    req = request.json
    user = req['user']
    password = req['password']

    try:
        db = SQLManager()
        resdb = db.get_list('select * from users where user_name=%s and user_pwd=%s',(user,password))
        db.close()
        if resdb:
            test = {'status': True}
            return jsonify(test)
        else: 
            test = {'status': False,'msg':'用户名或密码错误'}
            return jsonify(test)
    except Exception as e:
        print("登录失败！错误信息: {}".format(e))
        return {'status': False, 'msg': '{}'.format(e)}

# 注册
@app.route('/register', methods=['POST'])
def register():
    req = request.json
    user = req['user']
    password = req['password']
    table_tail = '(\'' + user + '\',' + password+ ');'

    try:
        db = SQLManager()
        db.moddify("INSERT INTO users VALUES {}".format(table_tail))
        db.close()
       
        test = {'status': True,'msg':'注册成功'}
        return jsonify(test)
        # else: 
        #     test = {'status': False,'msg':'用户名或密码错误'}
        #     return jsonify(test)
    except Exception as e:
        print("注册失败！错误信息: {}".format(e))
        tmp = {'status': False, 'msg': '{}'.format(e)}
        return jsonify(tmp)