package sztu.second.dao.impl;

import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.BeanListHandler;
import sztu.second.dao.CategoryDao;
import sztu.second.pojo.Category;
import sztu.second.utils.DruidUtils;

import java.sql.SQLException;
import java.util.List;

public class CategoryDaoImpl implements CategoryDao {

    @Override
    public List<Category> findByProductid(int productid) {

        try {
            QueryRunner qr = new QueryRunner(DruidUtils.getDataSource());

            String sql = "SELECT * FROM category WHERE productid = ?";

            List<Category> categoryList = qr.query(sql, new BeanListHandler<Category>(Category.class), productid);
            return categoryList;
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public List<Category> findByCategoryName(String categoryname) {

        try {
            QueryRunner qr = new QueryRunner(DruidUtils.getDataSource());

            String sql = "SELECT * FROM category WHERE categoryname = ?";

            List<Category> categoryList = qr.query(sql, new BeanListHandler<Category>(Category.class), categoryname);
            System.out.println(categoryList);
            return categoryList;
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }
}
