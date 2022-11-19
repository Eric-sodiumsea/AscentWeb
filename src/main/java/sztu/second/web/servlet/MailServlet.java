package sztu.second.web.servlet;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SimplePropertyPreFilter;
import org.apache.commons.beanutils.BeanUtils;
import sztu.second.base.BaseServlet;
import sztu.second.pojo.Mailtb;
import sztu.second.pojo.User;
import sztu.second.service.MailService;
import sztu.second.service.UserService;
import sztu.second.service.impl.MailServiceImpl;
import sztu.second.service.impl.UserServiceImpl;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;

@WebServlet("/mail")
public class MailServlet extends BaseServlet {

    public void findMail(HttpServletRequest req, HttpServletResponse resp) {

        try {
            // 业务处理
            MailService mailService = new MailServiceImpl();
            Mailtb mail = mailService.findMail();

            // 响应结果
            //SimplePropertyPreFilter 指定要转换的JSON字段
            SimplePropertyPreFilter filter = new SimplePropertyPreFilter(Mailtb.class, "fromaddress", "frompassword", "toaddress");

            String result = JSON.toJSONString(mail, filter);
            resp.getWriter().print(result);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void saveMail(HttpServletRequest req, HttpServletResponse resp) {

        try {
            // 1. 获取参数 从域对象中获取
            Map<String, Object> map = (Map) req.getAttribute("map");

            String fromaddress = map.get("fromaddress").toString();
            String frompassword = map.get("frompassword").toString();
            String toaddress = map.get("toaddress").toString();

            //2.创建Mailtb
            Mailtb mailtb = new Mailtb(fromaddress, frompassword, toaddress);

            //3.使用BeanUtils工具类,将map中的数据封装到 section
            BeanUtils.populate(mailtb, map);

            //4.业务处理
            MailService mailService = new MailServiceImpl();
            //修改操作
            String result = mailService.saveMail(mailtb);

            //5.响应结果
            resp.getWriter().print(result);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
