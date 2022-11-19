package sztu.second.base;

import com.alibaba.fastjson.JSONObject;


public enum StatusCode {

    SUCCESS(1, "success"), FAIL(0, "fail"), SUCCESS_USER(1, "success", "user"),
    SUCCESS_ADMIN(1, "success", "admin");
    //定义属性
    private int code;
    private String message;

    private String superuser;

    StatusCode() {
    }

    StatusCode(int code, String message) {
        this.code = code;
        this.message = message;
        this.superuser = "";
    }

    StatusCode(int code, String message, String superuser) {
        this.code = code;
        this.message = message;
        this.superuser = superuser;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getSuperuser() {
        return superuser;
    }

    public void setSuperuser(String superuser) {
        this.superuser = superuser;
    }

    //重写toString() 将枚举对象转换为 JSON
    @Override
    public String toString() {
        JSONObject object = new JSONObject();
        object.put("status", code);
        object.put("msg", message);
        if (!superuser.equals("")) {
            object.put("superuser", superuser);
        }
        return object.toString();
    }
}
