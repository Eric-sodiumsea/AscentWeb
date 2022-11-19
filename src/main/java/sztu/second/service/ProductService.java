package sztu.second.service;

import sztu.second.pojo.Product;

import java.util.List;

public interface ProductService {
    public List<Product> findProductList();

    public Product findProductById(int id);

    public List<Product> findProductByName(String productname);

    public List<Product> findProductByCategoryName(String categoryname);
}
