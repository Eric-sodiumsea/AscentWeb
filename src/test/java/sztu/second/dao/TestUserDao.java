package sztu.second.dao;

import org.junit.Test;
import sztu.second.dao.impl.UserDaoImpl;
import sztu.second.pojo.Product;
import sztu.second.pojo.User;
import sztu.second.service.UserService;
import sztu.second.service.impl.UserServiceImpl;

import java.util.List;

public class TestUserDao {

    private UserDao userDao = new UserDaoImpl();

    // 测试 登录
    @Test
    public void testLogin() {

        // 用户存在
        User user = userDao.login("shang");
        UserService userService = new UserServiceImpl();
        User result = userService.login("shang", "shang");
        System.out.println(result);
        System.out.println(user.getId() + " " + user.getUsername() + " " + user.getPassword());

        // 用户不存在 null
//        Usr usr1 = usrDao.login("abc");
//        System.out.println(usr.getId() + " " + usr1.getUsername() + " " + usr1.getPassword());

    }

    // 测试 查询用户信息列表
    @Test
    public void testFindUserList() {
        List<User> userList = userDao.findUserList();

        for (User user : userList) {
            System.out.println(user.getId() + " = " + user.getUsername());

            List<Product> productList = user.getProductList();
            for (Product product : productList) {
                System.out.print(product.getProductname() + " ");
            }

            System.out.println();
        }
    }

    // 新增用户
    @Test
    public void testAddUser() {

        User user = new User();
        // user.setId(8);
        user.setUsername("whhhhh");
        user.setPassword("456");
        user.setNickname("jay");
        user.setTel("135123456");
        user.setEmail("789@qq.com");
        user.setAddress("sztu");
        user.setSuperuser("3");
        user.setDelsoft("0");

        int row = userDao.addUser(user);
        System.out.println(row);
    }

    // 管理员修改用户信息
    @Test
    public void testUpdateUserByAdmin() {
        User user = new User();
        user.setId(7);
        user.setUsername("whh");
        user.setPassword("456");
        user.setNickname("jay");
        user.setTel("135123456");
        user.setEmail("789@qq.com");
        user.setAddress("sztu");
        user.setSuperuser("3");

        int row = userDao.updateUser(user);
        System.out.println(row);
    }
}
