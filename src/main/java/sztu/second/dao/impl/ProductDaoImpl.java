package sztu.second.dao.impl;

import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.BeanHandler;
import org.apache.commons.dbutils.handlers.BeanListHandler;
import sztu.second.dao.CategoryDao;
import sztu.second.dao.ProductDao;
import sztu.second.pojo.Category;
import sztu.second.pojo.Product;
import sztu.second.utils.DruidUtils;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class ProductDaoImpl implements ProductDao {

    @Override
    public List<Product> findProductList() {

        try {
            // 1. 创建QueryRunner
            QueryRunner qr = new QueryRunner(DruidUtils.getDataSource());

            // 2. 编写SQL 判断是否删除 取出delsoft = 0 的数据，即未删除的数据
            String sql = "SELECT id, image, productname, price, stock, description FROM product WHERE delsoft = 0";

            // 3. 执行查询
            List<Product> productList = null;
            productList = qr.query(sql, new BeanListHandler<Product>(Product.class));
            return productList;
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public Product findProductById(int id) {

        try {
            // 1. 创建QueryRunner
            QueryRunner qr = new QueryRunner(DruidUtils.getDataSource());

            // 2. 编写SQL
            String sql = "SELECT id, image, productname, price, stock, description FROM product WHERE delsoft = 0 AND id = ?";

            Product product = qr.query(sql, new BeanHandler<Product>(Product.class), id);

            CategoryDao categoryDao = new CategoryDaoImpl();
            List<Category> categoryList = categoryDao.findByProductid(id);
            product.setCategoryList(categoryList);
            return product;
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public List<Product> findProductByName(String productname) {

        try {
            QueryRunner qr = new QueryRunner(DruidUtils.getDataSource());

            String sql = "SELECT id, image, productname, price, description FROM product WHERE delsoft = 0 AND productname LIKE ?";

            productname = "%" + productname + "%";
            List<Product> productList = null;
            productList = qr.query(sql, new BeanListHandler<Product>(Product.class), productname);
            return productList;

        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public List<Product> findProductByCategoryName(String categoryname) {
        try {
            QueryRunner qr = new QueryRunner(DruidUtils.getDataSource());

            CategoryDao categoryDao = new CategoryDaoImpl();
            List<Category> categoryList = categoryDao.findByCategoryName(categoryname);

            List<Product> productList = new ArrayList<Product>();

            for (Category category : categoryList) {
                String sql = "SELECT id, image, productname, price, description FROM product WHERE delsoft = 0 AND id = ?";

                Product product = qr.query(sql, new BeanHandler<Product>(Product.class), category.getProductid());
                productList.add(product);
            }
            return productList;
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }
}
