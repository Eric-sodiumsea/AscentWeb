package sztu.second.service.impl;

import sztu.second.base.StatusCode;
import sztu.second.dao.UserDao;
import sztu.second.dao.impl.UserDaoImpl;
import sztu.second.pojo.Product;
import sztu.second.pojo.User;
import sztu.second.service.UserService;

import java.util.List;

public class UserServiceImpl implements UserService {

    // 创建UsrDao对象
    private UserDao userDao = new UserDaoImpl();

    // 登录
    @Override
    public User login(String username, String password) {

        // 调用usrDao中方法，根据用户名查询是否存在该用户
        User user = userDao.login(username);

        if (user != null) {
            if (!user.getPassword().equals(password)) {
                System.out.println("用户密码错误" + " " + "输入密码为：" + password + "数据库密码为：" + user.getPassword());
                user = null;
            }
        }
        return user;
    }

    // 注册
    @Override
    public String register(User user) {
        int row = userDao.register(user);

        String result;
        if (row > 0) {
            result = StatusCode.SUCCESS.toString();
        } else {
            result = StatusCode.FAIL.toString();
        }
        return result;
    }

    // 查询用户信息列表
    @Override
    public List<User> findUserList() {
        List<User> userList = userDao.findUserList();
        return userList;
    }

    // 根据用户ID 查询用户信息
    @Override
    public User findUserById(int userId) {
        User user = userDao.findUserById(userId);
        return user;
    }

    // 根据商品名 查询商品信息
    @Override
    public Product findProductByProductName(String productName) {
        Product product = userDao.findProductByProductName(productName);
        return product;
    }

    // 新增用户
    @Override
    public String addUser(User user) {

        // 1. 补全用户信息
        user.setDelsoft("0");

        // 2. 调用dao
        int row = userDao.addUser(user);

        // 3. 根据是否新增成功，封装对应信息
        if (row > 0) {
            // 新增成功
            String result = StatusCode.SUCCESS_ADMIN.toString();
            return result;
        } else {
            // 新增失败
            String result = StatusCode.FAIL.toString();
            return result;
        }
    }

    // 管理员修改用户信息
    @Override
    public String updateUserByAdmin(User user) {

        // 1. 补全用户信息

        // 2. 调用dao
        int flag = userDao.updateUserByAdmin(user);

        // 3. 根据是否新增成功，封装对应信息
        if (flag > 0) {
            // 新增成功
            String result = StatusCode.SUCCESS_ADMIN.toString();
            return result;
        } else {
            // 新增失败
            String result = StatusCode.FAIL.toString();
            return result;
        }
    }

    // 普通用户修改用户信息
    @Override
    public String updateUser(User user) {

        // 1. 补全用户信息

        // 2. 调用dao
        int flag = userDao.updateUser(user);

        // 3. 根据是否新增成功，封装对应信息
        if (flag > 0) {
            // 新增成功
            String result = StatusCode.SUCCESS_USER.toString();
            return result;
        } else {
            // 新增失败
            String result = StatusCode.FAIL.toString();
            return result;
        }
    }

    // 删除用户
    @Override
    public String deleteUser(int userId) {
        int row = userDao.deleteUser(userId);
        if (row > 0) {
            // 删除成功
            String result = StatusCode.SUCCESS.toString();
            return result;
        } else {
            // 删除失败
            String result = StatusCode.FAIL.toString();
            return result;
        }
    }
}
