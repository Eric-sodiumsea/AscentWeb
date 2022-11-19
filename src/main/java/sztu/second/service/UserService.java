package sztu.second.service;

import sztu.second.pojo.Product;
import sztu.second.pojo.User;

import java.util.List;

public interface UserService {

    // 登录
    public User login(String username, String password);

    // 注册
    public String register(User user);

    // 查询用户信息列表
    public List<User> findUserList();

    // 根据用户ID 查询用户信息
    public User findUserById(int userId);

    // 根据商品名 查询商品信息
    public Product findProductByProductName(String productName);

    // 新增用户
    public String addUser(User user);

    // 管理员修改用户信息
    public String updateUserByAdmin(User user);

    // 普通用户修改用户信息
    public String updateUser(User user);

    // 删除用户
    public String deleteUser(int userId);
}
