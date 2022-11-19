package sztu.second.dao;

import sztu.second.pojo.Category;

import java.util.List;

public interface CategoryDao {

    public List<Category> findByProductid(int productid);

    public List<Category> findByCategoryName(String categoryname);
}
