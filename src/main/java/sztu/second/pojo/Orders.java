package sztu.second.pojo;

import java.util.Date;

/**
 * 订单基础层
 * @author sztu_second
 *
 */

public class Orders implements java.io.Serializable{
	private Integer id; //ID

	private Integer usrid;//用户ID
	
	private String ordernumber;//订单数量
	
	private Date createtime; //创建时间
	
	private String delsoft; //软删除 

	public Orders() {
	}

	public Orders(Integer id, Integer usrid, String ordernumber,
			Date createtime, String delsoft) {
		super();
		this.id = id;
		this.usrid = usrid;
		this.ordernumber = ordernumber;
		this.createtime = createtime;
		this.delsoft = delsoft;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getUsrid() {
		return usrid;
	}

	public void setUsrid(Integer usrid) {
		this.usrid = usrid;
	}

	public String getOrdernumber() {
		return ordernumber;
	}

	public void setOrdernumber(String ordernumber) {
		this.ordernumber = ordernumber;
	}

	public Date getCreatetime() {
		return createtime;
	}

	public void setCreatetime(Date createtime) {
		this.createtime = createtime;
	}

	public String getDelsoft() {
		return delsoft;
	}

	public void setDelsoft(String delsoft) {
		this.delsoft = delsoft;
	}
	
	
	
}
