package sztu.second.dao;

import sztu.second.pojo.Product;

import java.util.List;

public interface ProductDao {

    public List<Product> findProductList();

    public Product findProductById(int id);

    public List<Product> findProductByName(String productname);

    public List<Product> findProductByCategoryName(String categoryname);
}