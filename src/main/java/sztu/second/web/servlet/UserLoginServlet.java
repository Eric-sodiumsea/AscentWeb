package sztu.second.web.servlet;

import com.alibaba.fastjson.JSONObject;
import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.io.IOUtils;
import sztu.second.base.BaseServlet;
import sztu.second.base.Constants;
import sztu.second.base.StatusCode;
import sztu.second.pojo.User;
import sztu.second.service.UserService;
import sztu.second.service.impl.UserServiceImpl;
import sztu.second.utils.DateUtils;
import sztu.second.utils.UUIDUtils;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@WebServlet("/usrlogin")
public class UserLoginServlet extends BaseServlet {

    // 用户登录
    public void login(HttpServletRequest req, HttpServletResponse resp) {

        //1.获取参数  从域对象中获取
        Map<String, Object> map = (Map) req.getAttribute("map");

        // 1. 获取参数
        String username = map.get("username").toString();
        String password = map.get("password").toString();

        // 2. 业务处理
        UserService userService = new UserServiceImpl();

        // 3.调用Service层login方法验证登录用户
        User user = userService.login(username, password);

        try {
            String result;
            JSONObject object = new JSONObject();
            if (user != null) {
                // 用户不为空，代表用户存在，成功登录
                if (user.getSuperuser().equals("2") || user.getSuperuser().equals("3")) {
                    object.put("superuser", "admin");
                    object.put("userId", user.getId());
                    System.out.println("登录成功！");
                } else if (user.getSuperuser().equals("1")) {
                    object.put("superuser", "user");
                    object.put("userId", user.getId());
                    System.out.println("登录成功！");
                } else {
                    object.put("superuser", "fail");
                    System.out.println("登录失败！");
                }
                HttpSession session = req.getSession();
                session.setAttribute("username", username);
            } else {
                object.put("superuser", "fail");
                System.out.println("登录失败！");
            }
            resp.getWriter().println(object.toString());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    // 用户注册
    public void register(HttpServletRequest req, HttpServletResponse resp) {

        // 1. 创建Usr对象，用于封装参数
        User user = new User();

        // 2. 获取参数 从域对象中获取
        Map<String, Object> map = (Map) req.getAttribute("map");
        String username = map.get("username").toString();
        String password = map.get("password").toString();
        String nickname = map.get("nickname").toString();
        String tel = map.get("tel").toString();
        String email = map.get("email").toString();
        String address = map.get("address").toString();

        // 3. 将参数保存到usr中
        user.setUsername(username);
        user.setPassword(password);
        user.setNickname(nickname);
        user.setTel(tel);
        user.setEmail(email);
        user.setAddress(address);

        // 4.业务处理
        UserService userService = new UserServiceImpl();
        String result = userService.register(user);

        try {
            resp.getWriter().println(result);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    // 退出登录
    public void logout(HttpServletRequest req, HttpServletResponse resp) {
        HttpSession session = req.getSession();
        session.removeAttribute("username");
        session.invalidate();
    }
}
