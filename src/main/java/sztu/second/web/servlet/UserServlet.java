package sztu.second.web.servlet;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.serializer.SimplePropertyPreFilter;
import org.apache.commons.beanutils.BeanUtils;
import sztu.second.base.BaseServlet;
import sztu.second.pojo.Product;
import sztu.second.pojo.User;
import sztu.second.service.UserService;
import sztu.second.service.impl.UserServiceImpl;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@WebServlet("/user")
public class UserServlet extends BaseServlet {

    // 查询用户信息列表
    public void findUserList(HttpServletRequest request, HttpServletResponse response) {

        try {
            //1.获取参数

            //2.业务处理
            UserService userService = new UserServiceImpl();
            List<User> list = userService.findUserList();

            //3.返回结果
            String result = JSON.toJSONString(list);
            response.getWriter().print(result);

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    // 根据用户ID 查询用户信息
    public void findUserById(HttpServletRequest request, HttpServletResponse response) {

        try {
            // 1. 接受参数
            String id = request.getParameter("id");

            // 2. 业务处理
            UserService userService = new UserServiceImpl();
            User user = userService.findUserById(Integer.parseInt(id));

            // 3. 返回结果
            SimplePropertyPreFilter filter = new SimplePropertyPreFilter(User.class, "username", "password", "nickname", "tel", "email", "address", "superuser", "productList");

            String result = JSON.toJSONString(user, filter);
            response.getWriter().print(result);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    // 根据商品名 查询商品信息
    public void findProductByProductName(HttpServletRequest request, HttpServletResponse response) {

        try {
            // 1. 接受参数
            String productName = request.getParameter("productName");

            // 2. 业务处理
            UserService userService = new UserServiceImpl();
            Product product = userService.findProductByProductName(productName);

            // 3. 返回结果
            String result = JSON.toJSONString(product);
            response.getWriter().print(result);

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    // 新增用户
    public void addUser(HttpServletRequest request, HttpServletResponse response) {
        try {
            //1.获取参数  从域对象中获取
            Map<String, Object> map = (Map) request.getAttribute("map");

            UserService userService = new UserServiceImpl();
            JSONArray productsName = (JSONArray) map.get("products");
            List<Product> productList = new ArrayList<>();
            for (Object productName : productsName) {
                Product product = userService.findProductByProductName(productName.toString());
                productList.add(product);
            }

            // 2. 创建User
            User user = new User();

            // 3. 封装user
            // 使用BeanUtils工具类,将map中的数据封装到user
            BeanUtils.populate(user, map);
            // 将productList封装到user
            user.setProductList(productList);

            System.out.println(user.toString());

            //4.业务处理
            //新增操作
            String result = userService.addUser(user);

            //5.响应结果
            response.getWriter().print(result);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // 管理员修改用户信息
    public void updateUserByAdmin(HttpServletRequest request, HttpServletResponse response) {
        try {
            //1.获取参数  从域对象中获取
            Map<String, Object> map = (Map) request.getAttribute("map");

            UserService userService = new UserServiceImpl();
            JSONArray productsName = (JSONArray) map.get("products");
            List<Product> productList = new ArrayList<>();
            for (Object productName : productsName) {
                Product product = userService.findProductByProductName(productName.toString());
                productList.add(product);
            }

            // 2. 创建User
            User user = new User();

            // 3. 封装user
            // 使用BeanUtils工具类,将map中的数据封装到user
            BeanUtils.populate(user, map);
            // 将productList封装到user
            user.setProductList(productList);

            System.out.println(user.toString());

            //4.业务处理
            //新增操作
            String result = userService.updateUserByAdmin(user);

            //5.响应结果
            response.getWriter().print(result);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // 普通用户修改用户信息
    public void updateUser(HttpServletRequest request, HttpServletResponse response) {
        try {
            //1.获取参数  从域对象中获取
            Map<String, Object> map = (Map) request.getAttribute("map");

            //2.创建User
            User user = new User();

            //3.使用BeanUtils工具类,将map中的数据封装到 section
            BeanUtils.populate(user, map);

            //4.业务处理
            UserService userService = new UserServiceImpl();
            //修改操作
            String result = userService.updateUser(user);

            //5.响应结果
            response.getWriter().print(result);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // 删除用户
    public void deleteUser(HttpServletRequest request, HttpServletResponse response) {

        try {
            // 1. 接受参数
            String userId = request.getParameter("id");

            // 2. 业务处理
            UserService userService = new UserServiceImpl();
            String result = userService.deleteUser(Integer.parseInt(userId));

            // 3. 返回结果
            response.getWriter().print(result);

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
