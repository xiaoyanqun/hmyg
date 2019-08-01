import {
  request
} from "../../request/request";
import regeneratorRuntime from '../../lib/runtime/runtime'
Page({
  data: {
    CategoriesList: [],
    ChildList: [],
    activeIndex: 0,
    scrollTop: 0
  },
  AllCategoriesList: [],
  //获取大分类数据
  async getAllCategoriesList(){
    const res =  await request({url: "/categories"}) 
    this.AllCategoriesList = res;
    wx.setStorageSync("cates", {
              time: Date.now(),
              data: this.AllCategoriesList
            });
    const arr = this.AllCategoriesList.map(v => {
      const obj = {
        cat_id: v.cat_id,
        cat_name: v.cat_name
      };
      return obj;
    });
    this.setData({
      CategoriesList: arr,
      ChildList: this.AllCategoriesList[0].children
    })
  },
  // 点击分类
  handleIndex(e) {
    const arr = this.AllCategoriesList[e.currentTarget.dataset.index].children;
    this.setData({
      ChildList: arr,
      activeIndex: e.currentTarget.dataset.index,
      scrollTop: 0
    });
    // this.getAllCategoriesList();
  },
  //options(Object)
  onLoad: function (options) {
    // 获取本地缓存数据
    let cates = wx.getStorageSync("cates");
    if (!cates) {
      this.getAllCategoriesList();
    } else {
      if (Date.now() - cates.time > 1000 * 10) {
        this.getAllCategoriesList();
      } else {
        this.AllCategoriesList = cates.data;
        const arr = this.AllCategoriesList.map(v => {
          const obj = {
            cat_id: v.cat_id,
            cat_name: v.cat_name
          };
          return obj;
        });
        this.setData({
          CategoriesList: arr,
          ChildList: this.AllCategoriesList[0].children
        })
      }
    }
  },
});