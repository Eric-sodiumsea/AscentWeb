package sztu.second.dao.impl;

import java.sql.*;
import java.util.List;

import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.BeanHandler;
import org.apache.commons.dbutils.handlers.BeanListHandler;
import sztu.second.dao.UserDao;
import sztu.second.pojo.Product;
import sztu.second.pojo.User;
import sztu.second.utils.DruidUtils;

public class UserDaoImpl implements UserDao {
    /**
     * 用户登录，根据用户名查找usr
     *
     * @param username
     * @return user
     */

    // 登录
    @Override
    public User login(String username) {

        // 1.创建QueryRunner
        QueryRunner qr = new QueryRunner(DruidUtils.getDataSource());

        // 编写SQL 判断是否删除， 取出delsoft = 0 的数据，即未删除的数据
        String sql = "SELECT * FROM user WHERE delsoft = 0 AND username = ?";

        // 3. 执行查询
        try {
            User user = qr.query(sql, new BeanHandler<>(User.class), username);
            return user;
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    // 注册
    @Override
    public int register(User user) {

        // 执行sql，如果成功添加数据，row > 0
        try {
            // 0. 判断该用户的用户名是否已被注册
            if (!isValid(user.getUsername())) {
                return 0;
            }

            // 1. 创建QueryRunner
            QueryRunner qr = new QueryRunner(DruidUtils.getDataSource());

            // 2. 补全参数
            user.setDelsoft("0");
            user.setSuperuser("1");
            Object[] param = {
                    user.getUsername(), user.getPassword(), user.getNickname(), user.getTel(), user.getEmail(),
                    user.getAddress(), user.getSuperuser(), user.getDelsoft()
            };

            // 3. 编写SQL
            String sql = "INSERT INTO user (username, password, nickname, tel, email, address, superuser, delsoft) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

            // 4. 执行SQL
            int row = qr.update(sql, param);

            return row;
        } catch (SQLException e) {
            e.printStackTrace();
            return 0;
        }
    }

    // 判断该用户的用户名是否已被注册
    @Override
    public boolean isValid(String username) {

        try {
            //1.创建QueryRunner
            QueryRunner qr = new QueryRunner(DruidUtils.getDataSource());

            //2.编写SQL
            String sql = "SELECT\n" +
                    "*\n" +
                    "FROM USER WHERE delsoft = ? AND username = ?";

            //3.执行查询
            User user = qr.query(sql, new BeanHandler<User>(User.class), 0, username);

            if (user != null) {
                return false;
            } else {
                return true;
            }

        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    // 查询用户信息列表
    @Override
    public List<User> findUserList() {

        try {
            //1.创建QueryRunner
            QueryRunner qr = new QueryRunner(DruidUtils.getDataSource());

            //2.编写SQL
            String sql = "SELECT\n" +
                    "id,\n" +
                    "username,\n" +
                    "nickname,\n" +
                    "tel,\n" +
                    "email,\n" +
                    "address,\n" +
                    "superuser,\n" +
                    "delsoft\n" +
                    "FROM USER WHERE delsoft = ?";

            //3.执行查询
            List<User> userList = qr.query(sql, new BeanListHandler<User>(User.class), 0);

            //4.根据用户ID查询商品信息
            for (User user : userList) {

                //调用方法 获取用户对应的商品
                List<Product> productList = findProductByUserId(user.getId());

                //将商品封装到 对象对象中
                user.setProductList(productList);
            }

            return userList;
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    // 根据用户ID 查询用户管理的商品信息
    @Override
    public List<Product> findProductByUserId(int userId) {
        try {
            QueryRunner qr = new QueryRunner(DruidUtils.getDataSource());

            String sql = "SELECT\n" +
                    "product.`id`,\n" +
                    "productname\n" +
                    "FROM product, user_product\n" +
                    "WHERE product.`id` = user_product.`productid` AND userid = ?";

            List<Product> productList = qr.query(sql, new BeanListHandler<Product>(Product.class), userId);
            return productList;
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    // 根据用户ID 查询用户信息
    @Override
    public User findUserById(int userId) {

        try {
            // 1. QueryRunner
            QueryRunner qr = new QueryRunner(DruidUtils.getDataSource());

            // 2. 编写sql
            String sql = "SELECT\n" +
                    "username,\n" +
                    "PASSWORD,\n" +
                    "nickname,\n" +
                    "tel,\n" +
                    "email,\n" +
                    "address,\n" +
                    "superuser\n" +
                    "FROM USER WHERE id = ?";

            //3.执行查询
            User user = qr.query(sql, new BeanHandler<User>(User.class), userId);

            // 4. 根据用户ID查询用户信息
            // 调用方法 获取用户对应的商品
            List<Product> productList = findProductByUserId(userId); // bug???
            // 将商品封装到 用户对象中
            user.setProductList(productList);
            return user;

        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    // 根据用户名 查询用户ID
    @Override
    public User findUserByUsername(String userName) {
        try {
            // 1. QueryRunner
            QueryRunner qr = new QueryRunner(DruidUtils.getDataSource());

            // 2. 编写sql
            String sql = "SELECT\n" +
                    "*\n" +
                    "FROM USER WHERE username = ?";

            //3.执行查询
            User user = qr.query(sql, new BeanHandler<User>(User.class), userName);
            return user;

        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    // 根据商品名 查询商品信息
    @Override
    public Product findProductByProductName(String productName) {

        try {
            // 1. QueryRunner
            QueryRunner qr = new QueryRunner(DruidUtils.getDataSource());

            // 2. 编写sql
            String sql = "SELECT\n" +
                    "*\n" +
                    "FROM PRODUCT WHERE productname = ?";

            //3.执行查询
            Product product = qr.query(sql, new BeanHandler<Product>(Product.class), productName);
            return product;

        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    // 新增用户
    @Override
    public int addUser(User user) {

        try {
            // 判断该用户的用户名是否已被注册
            if (!isValid(user.getUsername())) {
                return 0;
            }

            // 新增用户信息 user表
            QueryRunner qr1 = new QueryRunner(DruidUtils.getDataSource());

            String sql1 = "INSERT INTO USER (\n" +
                    "username,\n" +
                    "PASSWORD,\n" +
                    "nickname,\n" +
                    "tel,\n" +
                    "email,\n" +
                    "address,\n" +
                    "superuser,\n" +
                    "delsoft)\n" +
                    "VALUES(?,?,?,?,?,?,?,?)";

            Object[] param1 = {user.getUsername(), user.getPassword(), user.getNickname(), user.getTel(), user.getEmail(), user.getAddress(), user.getSuperuser(), user.getDelsoft()};

            int row1 = qr1.update(sql1, param1);

            // 新增用户管理商品 user_product表
            Boolean flag = true;
            user.setId(findUserByUsername(user.getUsername()).getId());
            for (Product product : user.getProductList()) {
                QueryRunner qr2 = new QueryRunner(DruidUtils.getDataSource());

                String sql2 = "INSERT INTO USER_PRODUCT (\n" +
                        "userid,\n" +
                        "productid)\n" +
                        "VALUES(?,?)";

                Object[] param2 = {user.getId(), product.getId()};

                int row2 = qr2.update(sql2, param2);
                if (row2 == 0) {
                    flag = false;
                }
            }

            if (row1 > 0 && flag) {
                return 1;
            } else {
                return 0;
            }
        } catch (SQLException e) {
            e.printStackTrace();
            return 0;
        }
    }

    // 管理员修改用户信息
    @Override
    public int updateUserByAdmin(User user) {

        try {
            // 判断该用户的用户名是否已被注册
            if (findUserById(user.getId()).getUsername() != user.getUsername() && !isValid(user.getUsername())) {
                return 0;
            }

            // 修改用户信息 user表
            QueryRunner qr1 = new QueryRunner(DruidUtils.getDataSource());

            String sql1 = "UPDATE USER SET\n" +
                    "username = ?,\n" +
                    "PASSWORD = ?,\n" +
                    "nickname = ?,\n" +
                    "tel = ?,\n" +
                    "email = ?,\n" +
                    "address = ?,\n" +
                    "superuser = ?\n" +
                    "WHERE id = ?";

            Object[] param = {user.getUsername(), user.getPassword(), user.getNickname(), user.getTel(), user.getEmail(), user.getAddress(), user.getSuperuser(), user.getId()};

            int row1 = qr1.update(sql1, param);

            // 修改用户管理商品 user_product

            // 1. 先将该用户对应的product删除
            QueryRunner qr2 = new QueryRunner(DruidUtils.getDataSource());

            String sql2 = "DELETE FROM user_product WHERE userid = ?";

            int row2 = qr2.update(sql2, user.getId());

            // 2. 再新增用户管理商品 user_product表
            Boolean flag3 = true;
            for (Product product : user.getProductList()) {
                QueryRunner qr3 = new QueryRunner(DruidUtils.getDataSource());

                String sql3 = "INSERT INTO USER_PRODUCT (\n" +
                        "userid,\n" +
                        "productid)\n" +
                        "VALUES(?,?)";

                Object[] param3 = {user.getId(), product.getId()};

                int row3 = qr3.update(sql3, param3);
                if (row3 == 0) {
                    flag3 = false;
                }
            }

            return 1;
        } catch (SQLException e) {
            e.printStackTrace();
            return 0;
        }
    }

    // 普通用户修改用户信息
    @Override
    public int updateUser(User user) {

        try {
            // 判断该用户的用户名是否已被注册
            if (findUserById(user.getId()).getUsername() == user.getUsername() && !isValid(user.getUsername())) {
                return 0;
            }

            // 修改用户信息 user表
            QueryRunner qr1 = new QueryRunner(DruidUtils.getDataSource());

            String sql1 = "UPDATE USER SET\n" +
                    "username = ?,\n" +
                    "PASSWORD = ?,\n" +
                    "nickname = ?,\n" +
                    "tel = ?,\n" +
                    "email = ?,\n" +
                    "address = ?\n" +
                    "WHERE id = ?";

            Object[] param = {user.getUsername(), user.getPassword(), user.getNickname(), user.getTel(), user.getEmail(), user.getAddress(), user.getId()};

            int row1 = qr1.update(sql1, param);

            // 修改用户管理商品 user_product

            // 1. 先将该用户对应的product删除
            QueryRunner qr2 = new QueryRunner(DruidUtils.getDataSource());

            String sql2 = "DELETE FROM user_product WHERE userid = ?";

            int row2 = qr2.update(sql2, user.getId());

            // 2. 再新增用户管理商品 user_product表
            Boolean flag3 = true;
            for (Product product : user.getProductList()) {
                QueryRunner qr3 = new QueryRunner(DruidUtils.getDataSource());

                String sql3 = "INSERT INTO USER_PRODUCT (\n" +
                        "userid,\n" +
                        "productid)\n" +
                        "VALUES(?,?)";

                Object[] param3 = {user.getId(), product.getId()};

                int row3 = qr3.update(sql3, param3);
                if (row3 == 0) {
                    flag3 = false;
                }
            }

            return 1;
        } catch (SQLException e) {
            e.printStackTrace();
            return 0;
        }
    }

    // 删除用户
    @Override
    public int deleteUser(int userId) {

        try {
            // 修改用户信息 user表
            QueryRunner qr = new QueryRunner(DruidUtils.getDataSource());

            String sql = "UPDATE USER SET\n" +
                    "delsoft = ?\n" +
                    "WHERE id = ?";

            int row = qr.update(sql, 1, userId);
            return row;
        } catch (SQLException e) {
            e.printStackTrace();
            return 0;
        }
    }
}
