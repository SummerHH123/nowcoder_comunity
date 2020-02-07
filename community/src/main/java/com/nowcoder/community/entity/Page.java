package com.nowcoder.community.entity;

/**
 * 封装分页的相关信息
 *
 */
public class Page {

    //浏览器-》服务器
    //服务器-》浏览器
    //当前页码
    private int current=1;
    //显示上限
    private int limit=10;
    //数据的总数 （计算总的页数）
    private int rows;
    //查询路径 （复用分页链接）
    private String path;



    public int getCurrent() {
        return current;
    }

    public void setCurrent(int current) {
        if (current>=1){
            this.current = current;
        }
    }

    public int getLimit() {
        return limit;
    }

    public void setLimit(int limit) {
        if (limit>=1&&limit<=100){
            this.limit = limit;
        }
    }

    public int getRows() {
        return rows;
    }

    public void setRows(int rows) {
        if (rows>=0){
            this.rows = rows;
        }
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    /**
     * 获取当前页的起始行
     * @return
     */
    public int getoffset(){
        //current*limit-limit
        return (current-1)*limit;
    }

    /**
     * 获取总页数
     * @return
     */
    public int getTotal(){
        //rows/limit+[1]

        if (rows%limit==0){
            return rows/limit;
        }else {
            return rows/limit+1;
        }

    }

    /**
     * 获取起始页码
     * @return
     */
    public int getFrom(){
        int from=current-2;
        return from<1?1:from;
    }

    /**
     * 获取结束页码
     * @return
     */

    public int getTo(){
        int to;
        if (current==1){
            to=current+4;
        }
        else if (current==2){
            to=current+3;
        }else {
            to=current+2;
        }

        int total=getTotal();
        return to>total?total:to;

    }
}
