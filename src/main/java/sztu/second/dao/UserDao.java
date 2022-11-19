package sztu.second.dao;

import sztu.second.pojo.Product;
import sztu.second.pojo.User;

import java.util.List;

/**
 * 登录模块 DAO层接口
 */

public interface UserDao {

    // 用户登录
    public User login(String username);

    // 用户注册
    public int register(User user);

    // 判断该用户的用户名是否已被注册
    public boolean isValid(String username);

    // 查询用户信息列表
    public List<User> findUserList();

    // 根据用户ID 查询用户管理的商品信息
    public List<Product> findProductByUserId(int userId);

    // 根据用户ID 查询用户信息
    public User findUserById(int userId);

    // 根据用户名 查询用户ID
    public User findUserByUsername(String userName);

    // 根据商品名 查询商品信息
    public Product findProductByProductName(String productName);

    // 新增用户
    public int addUser(User user);

    // 管理员修改用户信息
    public int updateUserByAdmin(User user);

    // 普通用户修改用户信息
    public int updateUser(User user);

    // 删除用户
    public int deleteUser(int userId);

}
